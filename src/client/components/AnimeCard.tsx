import React from 'react';
import { Star, Tv, Check } from 'lucide-react';
import { AnimeItem } from '../types/anime';

interface AnimeCardProps {
  anime: AnimeItem;
  isSelected: boolean;
  onSelectAnime: (anime: AnimeItem) => void;
  onOpenDetails: (anime: AnimeItem) => void;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({
  anime,
  isSelected,
  onSelectAnime,
  onOpenDetails
}) => {
  const displayTitle = anime.title.english || anime.title.romaji;
  const score = anime.averageScore ? (anime.averageScore / 10).toFixed(1) : null;

  return (
    <div className="group relative bg-white dark:bg-zenith-900 rounded-2xl overflow-hidden border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1">
      {/* Cover Image Container */}
      <div 
        onClick={() => onOpenDetails(anime)}
        className="relative aspect-[3/4] w-full overflow-hidden cursor-pointer bg-gray-100 dark:bg-zenith-800"
      >
        <img
          src={anime.coverImage.large}
          alt={displayTitle}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges: Score & Episodes */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {score ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-400 text-xs font-bold shadow">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{score}</span>
            </span>
          ) : <span />}

          {anime.episodes && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium shadow">
              <Tv className="w-3 h-3" />
              <span>{anime.episodes} eps</span>
            </span>
          )}
        </div>

        {/* Selected Ribbon if currently chosen */}
        {isSelected && (
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg bg-emerald-500/90 text-white text-xs font-bold backdrop-blur-md shadow-lg">
            <Check className="w-3.5 h-3.5" />
            <span>Seleccionado para Animedoro</span>
          </div>
        )}
      </div>

      {/* Anime Info */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          <h3 
            onClick={() => onOpenDetails(anime)}
            className="font-bold text-sm text-gray-900 dark:text-white line-clamp-1 group-hover:text-rose-500 transition-colors cursor-pointer"
            title={displayTitle}
          >
            {displayTitle}
          </h3>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 truncate mt-0.5">
            {anime.title.romaji}
          </p>

          {/* Genre Badges */}
          <div className="flex flex-wrap gap-1 mt-2">
            {anime.genres.slice(0, 3).map((genre) => (
              <span
                key={genre}
                className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-zenith-800 text-gray-600 dark:text-gray-400 font-medium"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-800/80">
          <button
            onClick={() => onOpenDetails(anime)}
            className="flex-1 py-1.5 px-2 rounded-xl text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-zenith-800 hover:bg-gray-200 dark:hover:bg-zenith-700 transition-colors"
          >
            Detalles
          </button>
          <button
            onClick={() => onSelectAnime(anime)}
            title="Elegir para mi descanso"
            className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition-all ${
              isSelected
                ? 'bg-emerald-500 text-white'
                : 'bg-rose-500 text-white hover:bg-rose-600 shadow-sm shadow-rose-500/20'
            }`}
          >
            {isSelected ? 'Elegido' : 'Elegir'}
          </button>
        </div>
      </div>
    </div>
  );
};
