import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Radio, ChevronUp, Music, Headphones } from 'lucide-react';
import { LOFI_TRACKS } from '../constants/lofiTracks';
import { LofiTrack } from '../types/anime';

interface LofiPlayerProps {
  currentTrack: LofiTrack;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  onTogglePlay: () => void;
  onChangeTrack: (trackId: string) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
}

export const LofiPlayer: React.FC<LofiPlayerProps> = ({
  currentTrack,
  isPlaying,
  volume,
  isMuted,
  onTogglePlay,
  onChangeTrack,
  onVolumeChange,
  onToggleMute
}) => {
  const [showStations, setShowStations] = useState(false);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-full max-w-xl px-4">
      {/* Station Dropup */}
      {showStations && (
        <div className="mb-2 p-3 bg-white/95 dark:bg-zenith-900/95 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl transition-all">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <Radio className="w-3.5 h-3.5 text-rose-500" />
              <span>Estaciones de Música Lo-Fi</span>
            </div>
            <button
              onClick={() => setShowStations(false)}
              className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 px-1"
            >
              Cerrar
            </button>
          </div>
          <div className="space-y-1.5">
            {LOFI_TRACKS.map((track) => (
              <button
                key={track.id}
                onClick={() => {
                  onChangeTrack(track.id);
                  setShowStations(false);
                }}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors ${
                  currentTrack.id === track.id
                    ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 font-medium'
                    : 'hover:bg-gray-50 dark:hover:bg-zenith-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div>
                  <div className="font-semibold">{track.name}</div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400">{track.subtitle}</div>
                </div>
                {currentTrack.id === track.id && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Floating Bar */}
      <div className="flex items-center justify-between gap-3 p-2.5 sm:px-4 bg-white/90 dark:bg-zenith-900/90 backdrop-blur-xl rounded-2xl border border-gray-200/90 dark:border-gray-800/90 shadow-xl shadow-gray-900/5 dark:shadow-black/40">
        
        {/* Play/Pause & Equalizer */}
        <div className="flex items-center gap-3">
          <button
            onClick={onTogglePlay}
            title={isPlaying ? 'Pausar Lo-Fi' : 'Reproducir Lo-Fi'}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isPlaying
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                : 'bg-gray-100 dark:bg-zenith-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-zenith-700'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          {/* Equalizer animation bars */}
          <div className="flex items-end gap-1 h-5 w-4" title={isPlaying ? 'Música activa' : 'En pausa'}>
            <span className={`w-1 bg-rose-500 rounded-full transition-all duration-300 ${isPlaying ? 'h-5 animate-pulse' : 'h-1.5 opacity-40'}`} />
            <span className={`w-1 bg-rose-500 rounded-full transition-all duration-500 ${isPlaying ? 'h-3 animate-bounce' : 'h-1.5 opacity-40'}`} />
            <span className={`w-1 bg-rose-500 rounded-full transition-all duration-200 ${isPlaying ? 'h-4 animate-pulse' : 'h-1.5 opacity-40'}`} />
          </div>
        </div>

        {/* Track Title & Station Switcher Button */}
        <div 
          onClick={() => setShowStations(prev => !prev)}
          className="flex-1 min-w-0 cursor-pointer group px-1"
          title="Cambiar emisora Lo-Fi"
        >
          <div className="flex items-center gap-1.5">
            <Headphones className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="text-xs font-semibold text-gray-900 dark:text-white truncate group-hover:text-rose-500 transition-colors">
              {currentTrack.name}
            </span>
            <ChevronUp className={`w-3.5 h-3.5 text-gray-400 group-hover:text-rose-500 transition-transform ${showStations ? 'rotate-180' : ''}`} />
          </div>
          <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate flex items-center gap-1">
            <Music className="w-2.5 h-2.5" />
            <span>{isPlaying ? 'Reproduciendo en directo' : 'Haz clic en Iniciar para escuchar'}</span>
          </div>
        </div>

        {/* Volume controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Activar sonido' : 'Silenciar'}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            title={`Volumen: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
            className="w-16 sm:w-20 h-1.5 bg-gray-200 dark:bg-zenith-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
        </div>
      </div>
    </div>
  );
};
