import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Timer } from './components/Timer';
import { AnimeCatalog } from './components/AnimeCatalog';
import { LofiPlayer } from './components/LofiPlayer';
import { SettingsModal } from './components/SettingsModal';
import { useTimer } from './hooks/useTimer';
import { useLofiAudio } from './hooks/useLofiAudio';
import { AnimeItem, TimerSettings } from './types/anime';
import { LOFI_TRACKS } from './constants/lofiTracks';
import { ANIME_LEGENDS, AnimeLegend } from './constants/featuredLegends';

export const App: React.FC = () => {
  // Navigation
  const [activeTab, setActiveTab] = useState<'timer' | 'catalog'>('timer');

  // Selected Focus Companion Legend (Luffy, Asta, Naruto, Meliodas, Ippo)
  const [selectedLegend, setSelectedLegend] = useState<AnimeLegend>(() => {
    try {
      const saved = localStorage.getItem('animedoro_selected_legend');
      if (saved) {
        const found = ANIME_LEGENDS.find(l => l.id === saved);
        if (found) return found;
      }
    } catch {
      // fallback
    }
    return ANIME_LEGENDS[0]; // Default: Luffy
  });

  const handleSelectLegend = (legend: AnimeLegend) => {
    setSelectedLegend(legend);
    try {
      localStorage.setItem('animedoro_selected_legend', legend.id);
    } catch {
      // ignore
    }
  };

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('animedoro_theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('animedoro_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('animedoro_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // Settings State
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<TimerSettings>(() => {
    try {
      const saved = localStorage.getItem('animedoro_settings');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      workMinutes: 30,
      breakMinutes: 20,
      lofiAutoplay: true,
      lofiVolume: 0.5,
      selectedTrackId: LOFI_TRACKS[0].id
    };
  });

  const updateSettings = (newSettings: Partial<TimerSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('animedoro_settings', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Selected Anime for Break
  const [selectedAnime, setSelectedAnime] = useState<AnimeItem | null>(() => {
    try {
      const saved = localStorage.getItem('animedoro_selected_anime');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleSelectAnime = (anime: AnimeItem) => {
    setSelectedAnime(anime);
    try {
      localStorage.setItem('animedoro_selected_anime', JSON.stringify(anime));
    } catch {
      // ignore
    }
  };

  // Lo-Fi Audio Hook
  const {
    currentTrack,
    isPlaying: isLofiPlaying,
    volume: lofiVolume,
    isMuted: isLofiMuted,
    changeTrack,
    togglePlay: toggleLofiPlay,
    setVolume: setLofiVolume,
    toggleMute: toggleLofiMute
  } = useLofiAudio(settings.selectedTrackId, settings.lofiVolume);

  // Timer Hook
  const {
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
  } = useTimer(settings);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in search input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        toggleStartPause();
      } else if (e.code === 'KeyR') {
        resetTimer();
      } else if (e.code === 'KeyS') {
        skipPhase();
      } else if (e.code === 'KeyM') {
        toggleLofiMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleStartPause, resetTimer, skipPhase, toggleLofiMute]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zenith-950 text-gray-800 dark:text-gray-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        openSettings={() => setIsSettingsOpen(true)}
        episodesCount={episodesCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {activeTab === 'timer' ? (
          <Timer
            mode={mode}
            timeLeft={timeLeft}
            totalDuration={totalDuration}
            isRunning={isRunning}
            onToggleStart={toggleStartPause}
            onReset={resetTimer}
            onSkip={skipPhase}
            onSwitchMode={switchMode}
            episodesCount={episodesCount}
            onAdjustEpisodes={adjustEpisodes}
            selectedAnime={selectedAnime}
            onOpenCatalog={() => setActiveTab('catalog')}
            selectedLegend={selectedLegend}
          />
        ) : (
          <AnimeCatalog
            selectedAnime={selectedAnime}
            onSelectAnime={handleSelectAnime}
            selectedLegend={selectedLegend}
            onSelectLegend={handleSelectLegend}
          />
        )}
      </main>

      {/* Bottom Floating Lo-Fi Audio Player */}
      <LofiPlayer
        currentTrack={currentTrack}
        isPlaying={isLofiPlaying}
        volume={lofiVolume}
        isMuted={isLofiMuted}
        onTogglePlay={toggleLofiPlay}
        onChangeTrack={changeTrack}
        onVolumeChange={setLofiVolume}
        onToggleMute={toggleLofiMute}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
      />

    </div>
  );
};

export default App;
