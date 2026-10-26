import React, { useState, useEffect } from 'react';
import { 
  Search, Flame, Star, TrendingUp, RefreshCw, X, Film,
  Sparkles, Swords, Heart, Compass, Smile, Wand2, Rocket, HelpCircle, Drama, Coffee, Ghost 
} from 'lucide-react';
import { AnimeItem, AnimeSort } from '../types/anime';
import { fetchAnimes } from '../services/anilist';
import { GENRES_LIST } from '../constants/lofiTracks';
import { AnimeCard } from './AnimeCard';
import { AnimeModal } from './AnimeModal';
import { AnimeLegendsBanner } from './AnimeLegendsBanner';
import { AnimeLegend } from '../constants/featuredLegends';

interface AnimeCatalogProps {
  selectedAnime: AnimeItem | null;
  onSelectAnime: (anime: AnimeItem) => void;
  selectedLegend: AnimeLegend;
  onSelectLegend: (legend: AnimeLegend) => void;
}

const renderGenreIcon = (iconName: string) => {
  switch (iconName) {
    case 'Swords': return <Swords className="w-3.5 h-3.5" />;
    case 'Heart': return <Heart className="w-3.5 h-3.5" />;
    case 'Compass': return <Compass className="w-3.5 h-3.5" />;
    case 'Smile': return <Smile className="w-3.5 h-3.5" />;
    case 'Wand2': return <Wand2 className="w-3.5 h-3.5" />;
    case 'Rocket': return <Rocket className="w-3.5 h-3.5" />;
    case 'HelpCircle': return <HelpCircle className="w-3.5 h-3.5" />;
    case 'Drama': return <Drama className="w-3.5 h-3.5" />;
    case 'Coffee': return <Coffee className="w-3.5 h-3.5" />;
    case 'Ghost': return <Ghost className="w-3.5 h-3.5" />;
    default: return <Sparkles className="w-3.5 h-3.5" />;
  }
};

export const AnimeCatalog: React.FC<AnimeCatalogProps> = ({
  selectedAnime,
  onSelectAnime,
  selectedLegend,
  onSelectLegend
}) => {
  const [animes, setAnimes] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [sortOption, setSortOption] = useState<AnimeSort>('POPULARITY_DESC');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [activeModalAnime, setActiveModalAnime] = useState<AnimeItem | null>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 450);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load animes when filters change
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    fetchAnimes({
      genre: selectedGenre,
      search: debouncedSearch,
      sort: sortOption,
      page: 1
    }).then(results => {
      if (!isCancelled) {
        setAnimes(results);
        setLoading(false);
      }
    }).catch(err => {
      console.error('Error fetching animes:', err);
      if (!isCancelled) {
        setLoading(false);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [selectedGenre, debouncedSearch, sortOption]);

  const handleExploreLegend = (animeTitle: string) => {
    setSearchQuery(animeTitle);
    setSelectedGenre('all');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 pb-28">
      
      {/* Featured Anime Legends Showcase (Luffy, Asta, Naruto, Meliodas, Ippo) */}
      <AnimeLegendsBanner
        selectedLegend={selectedLegend}
        onSelectLegend={onSelectLegend}
        onExploreAnime={handleExploreLegend}
      />

      {/* Header and Controls */}
      <div className="bg-white dark:bg-zenith-900 rounded-3xl p-5 sm:p-6 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Film className="w-6 h-6 text-rose-500" />
              <span>Explorador de Anime</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Filtra por popularidad, acción, romance o busca tu serie favorita para tu descanso
            </p>
          </div>

          {/* Sort Selector (No emojis, using Lucide Flame, Star, TrendingUp) */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <span className="text-xs font-semibold text-gray-400 hidden sm:inline">Ordenar:</span>
            <div className="flex bg-gray-100 dark:bg-zenith-800 p-1 rounded-xl border border-gray-200/60 dark:border-gray-700 w-full sm:w-auto">
              <button
                onClick={() => setSortOption('POPULARITY_DESC')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  sortOption === 'POPULARITY_DESC'
                    ? 'bg-white dark:bg-zenith-900 text-rose-600 dark:text-rose-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Popularidad</span>
              </button>

              <button
                onClick={() => setSortOption('SCORE_DESC')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  sortOption === 'SCORE_DESC'
                    ? 'bg-white dark:bg-zenith-900 text-amber-500 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
                <Star className="w-3.5 h-3.5" />
                <span>Mejor Puntuados</span>
              </button>

              <button
                onClick={() => setSortOption('TRENDING_DESC')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  sortOption === 'TRENDING_DESC'
                    ? 'bg-white dark:bg-zenith-900 text-indigo-500 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Tendencia</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por título (One Piece, Black Clover, Naruto, Nanatsu, Hajime no Ippo...)"
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-50 dark:bg-zenith-800/80 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Genre Filter Chips with Lucide Icons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {GENRES_LIST.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelectedGenre(genre.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedGenre === genre.id
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 font-semibold'
                  : 'bg-gray-100 dark:bg-zenith-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zenith-700'
              }`}
            >
              {renderGenreIcon(genre.iconName)}
              <span>{genre.name}</span>
            </button>
          ))}
        </div>

      </div>

      {/* Grid Results */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zenith-900 rounded-2xl overflow-hidden border border-gray-200/60 dark:border-gray-800 animate-pulse flex flex-col"
            >
              <div className="aspect-[3/4] bg-gray-200 dark:bg-zenith-800" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-zenith-800 rounded w-3/4" />
                <div className="h-3 bg-gray-200 dark:bg-zenith-800 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : animes.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {animes.map((anime) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              isSelected={selectedAnime?.id === anime.id}
              onSelectAnime={onSelectAnime}
              onOpenDetails={(item) => setActiveModalAnime(item)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-zenith-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-zenith-800 text-gray-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-gray-900 dark:text-white">
            No se encontraron animes
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            Prueba a buscar otro término o limpia los filtros de género para ver más títulos.
          </p>
          <button
            onClick={() => {
              setSelectedGenre('all');
              setSearchQuery('');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500 text-white hover:bg-rose-600 transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restablecer filtros</span>
          </button>
        </div>
      )}

      {/* Anime Detail Modal */}
      <AnimeModal
        anime={activeModalAnime}
        onClose={() => setActiveModalAnime(null)}
        isSelected={selectedAnime?.id === activeModalAnime?.id}
        onSelectAnime={onSelectAnime}
      />

    </div>
  );
};
