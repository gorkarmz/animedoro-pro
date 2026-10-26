import { LofiTrack } from '../types/anime';

export const LOFI_TRACKS: LofiTrack[] = [
  {
    id: 'lofi-chill',
    name: 'Chillhop Beats 24/7',
    subtitle: 'Ritmo instrumental relajante para concentración profunda',
    url: 'https://stream.zeno.fm/f3wvbbqmdg8uv',
    type: 'stream',
    author: 'Zeno FM Lo-Fi'
  },
  {
    id: 'anime-lofi',
    name: 'Anime Aesthetic Lo-Fi',
    subtitle: 'Melodías instrumentales inspiradas en bandas sonoras de anime',
    url: 'https://play.streamafrica.net/lofiradio',
    type: 'stream',
    author: 'Lo-Fi Radio Africa'
  },
  {
    id: 'chillout-hiphop',
    name: 'Deep Focus Lo-Fi Hip Hop',
    subtitle: 'Graves cálidos y textura vintage para sesiones extensas',
    url: 'https://streams.ilovemusic.de/iloveradio17.mp3',
    type: 'stream',
    author: 'I Love LoFi & Chillhop'
  }
];

export interface GenreItem {
  id: string;
  name: string;
  iconName: 'Sparkles' | 'Swords' | 'Heart' | 'Compass' | 'Smile' | 'Wand2' | 'Rocket' | 'HelpCircle' | 'Drama' | 'Coffee' | 'Ghost';
}

export const GENRES_LIST: GenreItem[] = [
  { id: 'all', name: 'Todos', iconName: 'Sparkles' },
  { id: 'Action', name: 'Acción', iconName: 'Swords' },
  { id: 'Romance', name: 'Romance', iconName: 'Heart' },
  { id: 'Adventure', name: 'Aventura', iconName: 'Compass' },
  { id: 'Comedy', name: 'Comedia', iconName: 'Smile' },
  { id: 'Fantasy', name: 'Fantasía', iconName: 'Wand2' },
  { id: 'Sci-Fi', name: 'Ciencia Ficción', iconName: 'Rocket' },
  { id: 'Mystery', name: 'Misterio', iconName: 'HelpCircle' },
  { id: 'Drama', name: 'Drama', iconName: 'Drama' },
  { id: 'Slice of Life', name: 'Vida Cotidiana', iconName: 'Coffee' },
  { id: 'Supernatural', name: 'Sobrenatural', iconName: 'Ghost' }
];
