import { useState, useEffect, useRef, useCallback } from 'react';
import { TimerMode, TimerSettings } from '../types/anime';
import { audioManager } from '../services/audio';

export function useTimer(settings: TimerSettings) {
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState<number>(settings.workMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [episodesCount, setEpisodesCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('animedoro_episodes');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const totalDuration = (mode === 'work' ? settings.workMinutes : settings.breakMinutes) * 60;
  const timerRef = useRef<number | null>(null);

  // Sync duration if user changes settings and timer isn't running
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(totalDuration);
    }
  }, [settings.workMinutes, settings.breakMinutes, mode, totalDuration, isRunning]);

  // Persist episodes count
  useEffect(() => {
    try {
      localStorage.setItem('animedoro_episodes', episodesCount.toString());
    } catch {
      // ignore
    }
  }, [episodesCount]);

  const handleSessionComplete = useCallback(() => {
    audioManager.playZenChime();

    if (mode === 'work') {
      setEpisodesCount(prev => prev + 1);
      setMode('break');
      setTimeLeft(settings.breakMinutes * 60);
      setIsRunning(false);
      // Pause work lofi beats on break if desired
      audioManager.pause();
    } else {
      setMode('work');
      setTimeLeft(settings.workMinutes * 60);
      setIsRunning(false);
    }
  }, [mode, settings.breakMinutes, settings.workMinutes]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, handleSessionComplete]);

  // Update browser tab title
  useEffect(() => {
    const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const secs = (timeLeft % 60).toString().padStart(2, '0');
    const label = mode === 'work' ? '💻 Trabajo' : '📺 Anime Break';
    document.title = `${mins}:${secs} - ${label} | Animedoro`;
  }, [timeLeft, mode]);

  const toggleStartPause = useCallback(() => {
    setIsRunning(prev => {
      const nextState = !prev;
      if (nextState) {
        // User clicked start! Trigger Lo-Fi music automatically if autoplay is on and in work mode
        if (settings.lofiAutoplay) {
          audioManager.play();
        }
      } else {
        // Paused!
        audioManager.pause();
      }
      return nextState;
    });
  }, [settings.lofiAutoplay]);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(totalDuration);
    audioManager.pause();
  }, [totalDuration]);

  const skipPhase = useCallback(() => {
    setIsRunning(false);
    audioManager.pause();
    if (mode === 'work') {
      setMode('break');
      setTimeLeft(settings.breakMinutes * 60);
    } else {
      setMode('work');
      setTimeLeft(settings.workMinutes * 60);
    }
  }, [mode, settings.breakMinutes, settings.workMinutes]);

  const switchMode = useCallback((targetMode: TimerMode) => {
    if (mode === targetMode) return;
    setIsRunning(false);
    audioManager.pause();
    setMode(targetMode);
    setTimeLeft((targetMode === 'work' ? settings.workMinutes : settings.breakMinutes) * 60);
  }, [mode, settings.workMinutes, settings.breakMinutes]);

  const adjustEpisodes = useCallback((delta: number) => {
    setEpisodesCount(prev => Math.max(0, prev + delta));
  }, []);

  return {
    mode,
    switchMode,
    timeLeft,
    totalDuration,
    isRunning,
    toggleStartPause,
    resetTimer,
    skipPhase,
    episodesCount,
    adjustEpisodes
  };
}
