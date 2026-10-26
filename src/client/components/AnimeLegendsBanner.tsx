import React from 'react';
import { ANIME_LEGENDS, AnimeLegend } from '../constants/featuredLegends';
import { Shield, Sparkles, Check, ExternalLink } from 'lucide-react';

interface AnimeLegendsBannerProps {
  selectedLegend: AnimeLegend;
  onSelectLegend: (legend: AnimeLegend) => void;
  onExploreAnime?: (animeTitle: string) => void;
}

export const AnimeLegendsBanner: React.FC<AnimeLegendsBannerProps> = ({
  selectedLegend,
  onSelectLegend,
  onExploreAnime
}) => {
  return (
    <div className="w-full bg-white dark:bg-zenith-900 rounded-3xl p-5 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
              <span>Sagas Legendarias & Compañeros de Enfoque</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
                Oficial
              </span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Luffy, Asta, Naruto, Meliodas e Ippo. Elige a tu mentor para acompañarte en tu sesión de trabajo.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Activo: <strong>{selectedLegend.character}</strong></span>
        </div>
      </div>

      {/* Grid of 5 Anime Legends */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {ANIME_LEGENDS.map((legend) => {
          const isCurrent = selectedLegend.id === legend.id;

          return (
            <div
              key={legend.id}
              onClick={() => onSelectLegend(legend)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 flex flex-col ${
                isCurrent
                  ? 'border-rose-500 ring-2 ring-rose-500/30 shadow-lg scale-[1.02]'
                  : 'border-gray-200/70 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:-translate-y-0.5'
              }`}
            >
              {/* Cover with Banner backdrop */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-zenith-800">
                <img
                  src={legend.bannerImage || legend.coverImage}
                  alt={legend.character}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Character Avatar Portrait */}
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <img
                    src={legend.coverImage}
                    alt={legend.character}
                    className="w-9 h-9 rounded-xl object-cover border-2 border-white dark:border-zenith-900 shadow-md"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate drop-shadow-sm">
                      {legend.character}
                    </h4>
                    <p className="text-[10px] text-gray-300 truncate">
                      {legend.anime}
                    </p>
                  </div>
                </div>

                {isCurrent && (
                  <span className="absolute top-2 right-2 p-1 rounded-full bg-rose-500 text-white shadow-md">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>

              {/* Action pill footer */}
              <div className="p-2.5 bg-gray-50/80 dark:bg-zenith-800/80 flex items-center justify-between text-xs">
                <span className={`text-[11px] font-semibold truncate ${isCurrent ? 'text-rose-600 dark:text-rose-400' : 'text-gray-600 dark:text-gray-300'}`}>
                  {isCurrent ? 'Compañero Activo' : 'Elegir Compañero'}
                </span>
                
                {onExploreAnime && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onExploreAnime(legend.anime);
                    }}
                    title={`Ver episodios de ${legend.anime}`}
                    className="p-1 rounded-md text-gray-400 hover:text-rose-500 hover:bg-gray-200 dark:hover:bg-zenith-700 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Mentor Mantra Box */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-500/5 via-amber-500/5 to-transparent border border-rose-200/50 dark:border-rose-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-3">
          <img
            src={selectedLegend.coverImage}
            alt={selectedLegend.character}
            className="w-10 h-10 rounded-xl object-cover border border-rose-300/40 dark:border-rose-900/60 shadow-sm shrink-0"
          />
          <div>
            <div className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span>Mantra de {selectedLegend.character}</span>
              <span className="text-[11px] font-normal text-gray-500 dark:text-gray-400">({selectedLegend.anime})</span>
            </div>
            <p className="text-xs text-rose-600 dark:text-rose-400 font-medium italic mt-0.5">
              "{selectedLegend.mantra}"
            </p>
          </div>
        </div>

        <a
          href={`https://www.animedatos.com/search?q=${encodeURIComponent(selectedLegend.animedatosQuery)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-zenith-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-rose-400 dark:hover:border-rose-500 transition-colors shrink-0"
        >
          <span>Guía de relleno de {selectedLegend.anime}</span>
          <ExternalLink className="w-3 h-3 text-rose-500" />
        </a>
      </div>
    </div>
  );
};
