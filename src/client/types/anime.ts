export interface AnimeTitle {
  romaji: string;
  english: string | null;
  native?: string | null;
}

export interface AnimeCoverImage {
  extraLarge?: string;
  large: string;
  medium?: string;
  color?: string | null;
}

export interface AnimeTrailer {
  id: string;
  site: string;
  thumbnail?: string;
}

export interface AnimeItem {
  id: number;
  title: AnimeTitle;
  description: string | null;
  genres: string[];
  averageScore: number | null;
  popularity: number;
  episodes: number | null;
  status: string;
  seasonYear?: number | null;
  format?: string | null;
  coverImage: AnimeCoverImage;
  bannerImage?: string | null;
  trailer?: AnimeTrailer | null;
  siteUrl?: string;
}

export type AnimeSort = 'POPULARITY_DESC' | 'SCORE_DESC' | 'TRENDING_DESC';

export interface AnimeFilters {
  genre?: string | null;
  search?: string;
  sort: AnimeSort;
  page: number;
}

export interface LofiTrack {
  id: string;
  name: string;
  subtitle: string;
  url: string;
  type: 'stream' | 'audio';
  author: string;
}

export type TimerMode = 'work' | 'break';

export interface TimerSettings {
  workMinutes: number;
  breakMinutes: number;
  lofiAutoplay: boolean;
  lofiVolume: number; // 0 to 1
  selectedTrackId: string;
}
