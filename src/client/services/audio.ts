// Audio service for Lo-Fi streams and Zen bell completion chimes

class AudioManager {
  private audioElement: HTMLAudioElement | null = null;
  private audioContext: AudioContext | null = null;
  private currentTrackUrl: string = '';
  private isPlaying: boolean = false;
  private volume: number = 0.5;
  private listeners: Set<(playing: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioElement = new Audio();
      this.audioElement.preload = 'none';
      this.audioElement.crossOrigin = 'anonymous';

      this.audioElement.addEventListener('playing', () => {
        this.isPlaying = true;
        this.notifyListeners();
      });

      this.audioElement.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notifyListeners();
      });

      this.audioElement.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notifyListeners();
      });

      this.audioElement.addEventListener('error', (e) => {
        console.warn('Audio stream error, stream might be reconnecting:', e);
        this.isPlaying = false;
        this.notifyListeners();
      });
    }
  }

  public subscribe(cb: (playing: boolean) => void) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private notifyListeners() {
    this.listeners.forEach(cb => cb(this.isPlaying));
  }

  public setTrack(url: string) {
    if (!this.audioElement) return;
    if (this.currentTrackUrl !== url) {
      this.currentTrackUrl = url;
      const wasPlaying = this.isPlaying;
      this.audioElement.src = url;
      this.audioElement.volume = this.volume;
      if (wasPlaying) {
        this.play();
      }
    }
  }

  public async play(): Promise<boolean> {
    if (!this.audioElement) return false;
    try {
      if (!this.audioElement.src && this.currentTrackUrl) {
        this.audioElement.src = this.currentTrackUrl;
      }
      this.audioElement.volume = this.volume;
      await this.audioElement.play();
      this.isPlaying = true;
      this.notifyListeners();
      return true;
    } catch (err) {
      console.warn('Playback prevented or blocked by browser autoplay policy:', err);
      this.isPlaying = false;
      this.notifyListeners();
      return false;
    }
  }

  public pause() {
    if (!this.audioElement) return;
    this.audioElement.pause();
    this.isPlaying = false;
    this.notifyListeners();
  }

  public toggle(url?: string): Promise<boolean> | void {
    if (url && url !== this.currentTrackUrl) {
      this.setTrack(url);
      return this.play();
    }
    if (this.isPlaying) {
      this.pause();
    } else {
      return this.play();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Play a harmonic zen bell chord when a timer period finishes
  public playZenChime() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.audioContext) {
        this.audioContext = new AudioCtx();
      }

      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const ctx = this.audioContext;
      const now = ctx.currentTime;
      const frequencies = [528, 660, 792]; // Tibetan healing bell frequencies

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 2.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 3.0);
      });
    } catch (e) {
      console.warn('Web Audio chime not supported:', e);
    }
  }
}

export const audioManager = new AudioManager();
