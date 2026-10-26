import React from 'react';
import { Play, Pause, RotateCcw, SkipForward, ExternalLink, Laptop, Tv, Target, Award, Shield } from 'lucide-react';
import { AnimeItem, TimerMode } from '../types/anime';
import { AnimeLegend } from '../constants/featuredLegends';

interface TimerProps {
  mode: TimerMode;
  timeLeft: number;
  totalDuration: number;
  isRunning: boolean;
  onToggleStart: () => void;
  onReset: () => void;
  onSkip: () => void;
  onSwitchMode: (mode: TimerMode) => void;
  episodesCount: number;
  onAdjustEpisodes: (delta: number) => void;
  selectedAnime: AnimeItem | null;
  onOpenCatalog: () => void;
  selectedLegend: AnimeLegend;
}

export const Timer: React.FC<TimerProps> = ({
  mode,
  timeLeft,
  totalDuration,
  isRunning,
  onToggleStart,
  onReset,
  onSkip,
  onSwitchMode,
  episodesCount,
  onAdjustEpisodes,
  selectedAnime,
  onOpenCatalog,
  selectedLegend
}) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Progress calculations
  const progressRatio = totalDuration > 0 ? (totalDuration - timeLeft) / totalDuration : 0;
  const radius = 125;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-6 pb-24">
      
      {/* Active Focus Companion Bar (Luffy, Asta, Naruto, Meliodas, Ippo) */}
      <div className="w-full bg-white dark:bg-zenith-900 rounded-2xl p-3 border border-gray-200/80 dark:border-gray-800 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={selectedLegend.coverImage}
            alt={selectedLegend.character}
            className="w-10 h-10 rounded-xl object-cover border border-rose-300 dark:border-rose-900 shadow-sm shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span className="text-xs font-bold text-gray-900 dark:text-white truncate">
                Compañero: {selectedLegend.character}
              </span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 hidden sm:inline truncate">
                ({selectedLegend.anime})
              </span>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 italic truncate">
              "{selectedLegend.mantra}"
            </p>
          </div>
        </div>
      </div>

      {/* Mode Selector Tabs (No emojis, using Lucide Laptop & Tv) */}
      <div className="flex p-1 bg-gray-200/70 dark:bg-zenith-900/90 rounded-2xl border border-gray-200 dark:border-gray-800 backdrop-blur-md">
        <button
          onClick={() => onSwitchMode('work')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            mode === 'work'
              ? 'bg-white dark:bg-zenith-800 text-rose-600 dark:text-rose-400 shadow-md shadow-black/5'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Laptop className="w-4 h-4" />
          <span>Trabajo</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-500 font-normal">
            30m
          </span>
        </button>

        <button
          onClick={() => onSwitchMode('break')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            mode === 'break'
              ? 'bg-white dark:bg-zenith-800 text-indigo-600 dark:text-indigo-400 shadow-md shadow-black/5'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Tv className="w-4 h-4" />
          <span>Anime Break</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 font-normal">
            1 Ep (20m)
          </span>
        </button>
      </div>

      {/* Circular Timer Ring */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 280 280">
          {/* Background Ring */}
          <circle
            cx="140"
            cy="140"
            r={radius}
            strokeWidth="10"
            className="stroke-gray-200/80 dark:stroke-zenith-800/80 fill-none"
          />
          {/* Animated Progress Ring */}
          <circle
            cx="140"
            cy="140"
            r={radius}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`fill-none transition-all duration-1000 ease-linear ${
              mode === 'work' ? 'stroke-rose-500' : 'stroke-indigo-500'
            }`}
          />
        </svg>

        {/* Center Timer Information */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
            {mode === 'work' ? 'Sesión de concentración' : 'Episodio de descanso'}
          </span>
          <div className="text-5xl sm:text-6xl font-extrabold tracking-tight font-mono text-gray-900 dark:text-white tabular-nums">
            {timeFormatted}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1.5">
            {isRunning ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {mode === 'work' ? 'Música Lo-Fi activa' : 'Descanso en curso'}
              </>
            ) : (
              'Listo para comenzar'
            )}
          </span>
        </div>
      </div>

      {/* Main Controls (Reset / Start / Skip) */}
      <div className="flex items-center gap-4">
        {/* Reset button */}
        <button
          onClick={onReset}
          title="Reiniciar temporizador (R)"
          className="p-3.5 rounded-2xl bg-gray-100 dark:bg-zenith-900 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zenith-800 border border-gray-200/60 dark:border-gray-800 transition-all hover:scale-105 active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {/* Start / Pause button */}
        <button
          onClick={onToggleStart}
          title="Iniciar / Pausar (Espacio)"
          className={`flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95 ${
            mode === 'work'
              ? 'bg-gradient-to-r from-rose-500 to-rose-600 shadow-rose-500/25 hover:from-rose-600 hover:to-rose-700'
              : 'bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-indigo-500/25 hover:from-indigo-600 hover:to-indigo-700'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5 fill-current" />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current ml-0.5" />
              <span>Iniciar</span>
            </>
          )}
        </button>

        {/* Skip phase button */}
        <button
          onClick={onSkip}
          title="Saltar a la siguiente fase (S)"
          className="p-3.5 rounded-2xl bg-gray-100 dark:bg-zenith-900 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zenith-800 border border-gray-200/60 dark:border-gray-800 transition-all hover:scale-105 active:scale-95"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Episodes Earned Box (No emojis, using Lucide Award) */}
      <div className="w-full bg-white dark:bg-zenith-900 rounded-2xl p-4 border border-gray-200/80 dark:border-gray-800 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-sm text-gray-900 dark:text-white">
              Episodios de anime ganados
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Cada 30m de trabajo sumas 1 capítulo de descanso
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onAdjustEpisodes(-1)}
            disabled={episodesCount <= 0}
            className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-zenith-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zenith-700 disabled:opacity-40 flex items-center justify-center font-bold"
          >
            -
          </button>
          <span className="font-mono font-bold text-lg min-w-6 text-center text-gray-900 dark:text-white">
            {episodesCount}
          </span>
          <button
            onClick={() => onAdjustEpisodes(1)}
            className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-zenith-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zenith-700 flex items-center justify-center font-bold"
          >
            +
          </button>
        </div>
      </div>

      {/* Selected Anime for Break Widget */}
      <div className="w-full bg-gradient-to-br from-rose-50/70 to-indigo-50/70 dark:from-zenith-900 dark:to-zenith-900/60 rounded-2xl p-4 border border-rose-200/60 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Anime seleccionado para tu pausa
            </span>
          </div>
          <button
            onClick={onOpenCatalog}
            className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-medium"
          >
            {selectedAnime ? 'Cambiar anime' : 'Explorar catálogo'}
          </button>
        </div>

        {selectedAnime ? (
          <div className="flex items-center gap-3 bg-white dark:bg-zenith-800/80 p-3 rounded-xl border border-gray-200/60 dark:border-gray-700">
            <img
              src={selectedAnime.coverImage.large}
              alt={selectedAnime.title.romaji}
              className="w-12 h-16 object-cover rounded-lg shadow-sm"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                {selectedAnime.title.english || selectedAnime.title.romaji}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {selectedAnime.genres.slice(0, 3).join(' • ')}
              </p>
              <div className="flex items-center gap-3 mt-1.5">
                <a
                  href={`https://www.animedatos.com/search?q=${encodeURIComponent(selectedAnime.title.romaji)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-600 dark:text-rose-400 hover:underline"
                >
                  <span>Guía de relleno en Animedatos</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div 
            onClick={onOpenCatalog}
            className="cursor-pointer border border-dashed border-gray-300 dark:border-gray-700 hover:border-rose-400 dark:hover:border-rose-500 p-4 rounded-xl text-center transition-colors"
          >
            <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
              Aún no has seleccionado anime para ver en tu descanso.
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
              Haz clic aquí para filtrar por <strong className="text-rose-500">Popularidad</strong>, <strong className="text-rose-500">Acción</strong> o <strong className="text-rose-500">Romance</strong>.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
