import React from 'react';
import { Timer, Film, Sun, Moon, Settings as SettingsIcon, Flame, Award } from 'lucide-react';

interface NavbarProps {
  activeTab: 'timer' | 'catalog';
  setActiveTab: (tab: 'timer' | 'catalog') => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  openSettings: () => void;
  episodesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  toggleDarkMode,
  openSettings,
  episodesCount
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-zenith-950/80 border-b border-gray-200/80 dark:border-gray-800/80 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo (No emojis, using Lucide Flame) */}
        <div 
          onClick={() => setActiveTab('timer')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-red-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">
                Animedoro
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
                PRO
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
              30m Enfoque & 1 Ep Anime
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-gray-100 dark:bg-zenith-900 p-1 rounded-xl border border-gray-200/60 dark:border-gray-800">
          <button
            onClick={() => setActiveTab('timer')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'timer'
                ? 'bg-white dark:bg-zenith-800 text-rose-600 dark:text-rose-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Timer className="w-4 h-4" />
            <span>Temporizador</span>
          </button>
          
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'catalog'
                ? 'bg-white dark:bg-zenith-800 text-rose-600 dark:text-rose-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Explorar Anime</span>
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Episode Counter Badge (Using Lucide Award icon) */}
          <div 
            title="Episodios de anime ganados en la sesión"
            className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold border border-amber-500/20"
          >
            <Award className="w-3.5 h-3.5" />
            <span>{episodesCount} {episodesCount === 1 ? 'ep ganado' : 'eps ganados'}</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label="Cambiar tema de color"
            className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zenith-900 border border-transparent hover:border-gray-200 dark:hover:border-gray-800 transition-all"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Settings Button */}
          <button
            onClick={openSettings}
            title="Ajustes de tiempo y audio"
            aria-label="Abrir ajustes"
            className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zenith-900 border border-transparent hover:border-gray-200 dark:hover:border-gray-800 transition-all"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
