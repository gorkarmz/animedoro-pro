import React from 'react';
import { X, Clock, Music, Tv, Sliders } from 'lucide-react';
import { TimerSettings } from '../types/anime';
import { LOFI_TRACKS } from '../constants/lofiTracks';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: TimerSettings;
  onUpdateSettings: (newSettings: Partial<TimerSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white dark:bg-zenith-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <Sliders className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Ajustes de Animedoro
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zenith-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Durations */}
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              <Clock className="w-3.5 h-3.5 text-rose-500" />
              <span>Tiempo de Trabajo / Concentración</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[20, 25, 30, 45].map((mins) => (
                <button
                  key={mins}
                  onClick={() => onUpdateSettings({ workMinutes: mins })}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                    settings.workMinutes === mins
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                      : 'bg-gray-100 dark:bg-zenith-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zenith-700'
                  }`}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              <Tv className="w-3.5 h-3.5 text-indigo-500" />
              <span>Tiempo Anime Break (1 Episodio)</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[20, 22, 24].map((mins) => (
                <button
                  key={mins}
                  onClick={() => onUpdateSettings({ breakMinutes: mins })}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                    settings.breakMinutes === mins
                      ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                      : 'bg-gray-100 dark:bg-zenith-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zenith-700'
                  }`}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lo-Fi Autoplay Settings */}
        <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-rose-500" />
              <div>
                <div className="text-xs font-bold text-gray-900 dark:text-white">
                  Auto-reproducir Lo-Fi al Iniciar
                </div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400">
                  La música empieza al arrancar el temporizador
                </div>
              </div>
            </div>

            <button
              onClick={() => onUpdateSettings({ lofiAutoplay: !settings.lofiAutoplay })}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings.lofiAutoplay ? 'bg-rose-500' : 'bg-gray-300 dark:bg-zenith-700'
              }`}
            >
              <span
                className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                  settings.lofiAutoplay ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>

          {/* Default Station */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
              Estación Lo-Fi Predeterminada
            </label>
            <select
              value={settings.selectedTrackId}
              onChange={(e) => onUpdateSettings({ selectedTrackId: e.target.value })}
              className="w-full py-2.5 px-3 rounded-xl bg-gray-100 dark:bg-zenith-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            >
              {LOFI_TRACKS.map(track => (
                <option key={track.id} value={track.id}>
                  {track.name} ({track.author})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-xs hover:opacity-90 transition-opacity"
          >
            Guardar y Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
