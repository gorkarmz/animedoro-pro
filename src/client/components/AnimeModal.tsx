import React from 'react';
import { X, Star, Tv, Calendar, ExternalLink, Play, Check, Target } from 'lucide-react';
import { AnimeItem } from '../types/anime';

interface AnimeModalProps {
  anime: AnimeItem | null;
  onClose: () => void;
  isSelected: boolean;
  onSelectAnime: (anime: AnimeItem) => void;
}

export const AnimeModal: React.FC<AnimeModalProps> = ({
  anime,
  onClose,
  isSelected,
  onSelectAnime
}) => {
  if (!anime) return null;

  const displayTitle = anime.title.english || anime.title.romaji;
  const score = anime.averageScore ? (anime.averageScore / 10).toFixed(1) : null;
  const animedatosUrl = `https://www.animedatos.com/search?q=${encodeURIComponent(anime.title.romaji)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zenith-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-zenith-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          <img
            src={anime.coverImage.large}
            alt={displayTitle}
            className="w-32 h-44 sm:w-36 sm:h-52 object-cover rounded-2xl shadow-md shrink-0"
          />

          <div className="flex-1 space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {displayTitle}
            </h2>
            {anime.title.english && (
              <p className="text-xs text-gray-400 dark:text-gray-500 italic">
                Romaji: {anime.title.romaji}
              </p>
            )}

            {/* Quick Badges (Lucide Star, Tv, Calendar) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {score && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{score} / 10</span>
                </span>
              )}

              {anime.episodes && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-medium">
                  <Tv className="w-3.5 h-3.5" />
                  <span>{anime.episodes} episodios</span>
                </span>
              )}

              {anime.seasonYear && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-zenith-800 text-gray-600 dark:text-gray-300 text-xs font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{anime.seasonYear}</span>
                </span>
              )}

              <span className="text-xs px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-medium">
                {anime.status === 'FINISHED' ? 'Finalizado' : 'En emisión'}
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {anime.genres.map((genre) => (
                <span
                  key={genre}
                  className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-zenith-800 text-gray-700 dark:text-gray-300 font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Synopsis */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Sinopsis
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-h-48 overflow-y-auto pr-2">
            {anime.description?.replace(/<[^>]*>?/gm, '') || 'Sin sinopsis disponible.'}
          </p>
        </div>

        {/* Actions / External links */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          
          {/* Select Button */}
          <button
            onClick={() => {
              onSelectAnime(anime);
              onClose();
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm shadow-md transition-all ${
              isSelected
                ? 'bg-emerald-500 text-white'
                : 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/20'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4" />
                <span>Anime Seleccionado</span>
              </>
            ) : (
              <>
                <Target className="w-4 h-4" />
                <span>Elegir para descanso Animedoro</span>
              </>
            )}
          </button>

          {/* Animedatos Link */}
          <a
            href={animedatosUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-medium text-xs bg-gray-100 dark:bg-zenith-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-zenith-700 transition-colors"
          >
            <span>Ver relleno en Animedatos</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Trailer Link */}
          {anime.trailer?.site === 'youtube' && (
            <a
              href={`https://www.youtube.com/watch?v=${anime.trailer.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-2xl font-medium text-xs bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Trailer</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
};
