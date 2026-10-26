import { useState, useEffect, useCallback } from 'react';
import { audioManager } from '../services/audio';
import { LOFI_TRACKS } from '../constants/lofiTracks';
import { LofiTrack } from '../types/anime';

export function useLofiAudio(defaultTrackId: string, initialVolume: number = 0.5) {
  const [currentTrack, setCurrentTrack] = useState<LofiTrack>(() => {
    return LOFI_TRACKS.find(t => t.id === defaultTrackId) || LOFI_TRACKS[0];
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(initialVolume);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [previousVolume, setPreviousVolume] = useState<number>(initialVolume);

  // Initialize track on mount
  useEffect(() => {
    audioManager.setTrack(currentTrack.url);
    audioManager.setVolume(initialVolume);
  }, [currentTrack.url, initialVolume]);

  // Subscribe to audioManager events
  useEffect(() => {
    const unsubscribe = audioManager.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const changeTrack = useCallback((trackId: string) => {
    const track = LOFI_TRACKS.find(t => t.id === trackId);
    if (track) {
      setCurrentTrack(track);
      audioManager.setTrack(track.url);
    }
  }, []);

  const togglePlay = useCallback(() => {
    audioManager.toggle(currentTrack.url);
  }, [currentTrack.url]);

  const setVolume = useCallback((newVol: number) => {
    setVolumeState(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
    audioManager.setVolume(newVol);
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      setVolumeState(previousVolume);
      audioManager.setVolume(previousVolume);
    } else {
      setPreviousVolume(volume);
      setIsMuted(true);
      setVolumeState(0);
      audioManager.setVolume(0);
    }
  }, [isMuted, volume, previousVolume]);

  return {
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    changeTrack,
    togglePlay,
    setVolume,
    toggleMute
  };
}
