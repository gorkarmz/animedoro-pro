import { AnimeItem, AnimeFilters } from '../types/anime';

const ANILIST_GRAPHQL_URL = 'https://graphql.anilist.co';

const ANIME_QUERY = `
query ($page: Int, $perPage: Int, $genre: String, $search: String, $sort: [MediaSort]) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      hasNextPage
    }
    media(type: ANIME, genre: $genre, search: $search, sort: $sort, isAdult: false) {
      id
      title {
        romaji
        english
        native
      }
      description(asHtml: false)
      genres
      averageScore
      popularity
      episodes
      status
      seasonYear
      format
      coverImage {
        extraLarge
        large
        medium
        color
      }
      bannerImage
      trailer {
        id
        site
        thumbnail
      }
      siteUrl
    }
  }
}
`;

// Fallback anime data if offline or network error
export const FALLBACK_ANIMES: AnimeItem[] = [
  {
    id: 16498,
    title: { romaji: 'Shingeki no Kyojin', english: 'Attack on Titan' },
    description: 'Siglos atrás, la humanidad fue llevada al borde de la extinción por monstruosas criaturas humanoides llamadas Titanes. Ahora, tras altos muros, Eren Jaeger y sus amigos luchan por recuperar su libertad.',
    genres: ['Action', 'Drama', 'Fantasy', 'Mystery'],
    averageScore: 85,
    popularity: 580000,
    episodes: 25,
    status: 'FINISHED',
    seasonYear: 2013,
    format: 'TV',
    coverImage: {
      large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx16498-buvcRTBx4NSm.jpg',
      color: '#e45f5f'
    },
    siteUrl: 'https://anilist.co/anime/16498'
  },
  {
    id: 101922,
    title: { romaji: 'Kimetsu no Yaiba', english: 'Demon Slayer: Kimetsu no Yaiba' },
    description: 'Tanjiro Kamado vive pacíficamente en las montañas hasta que su familia es asesinada por demonios y su hermana Nezuko es transformada en uno.',
    genres: ['Action', 'Adventure', 'Fantasy', 'Supernatural'],
    averageScore: 82,
    popularity: 540000,
    episodes: 26,
    status: 'FINISHED',
    seasonYear: 2019,
    format: 'TV',
    coverImage: {
      large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx101922-WBsBl0ClmgYL.jpg',
      color: '#43a047'
    },
    siteUrl: 'https://anilist.co/anime/101922'
  },
  {
    id: 113415,
    title: { romaji: 'Jujutsu Kaisen', english: 'Jujutsu Kaisen' },
    description: 'Yuji Itadori es un estudiante de secundaria con extraordinarias habilidades atléticas que, para salvar a un compañero, come un dedo maldito de Ryomen Sukuna.',
    genres: ['Action', 'Fantasy', 'Supernatural'],
    averageScore: 85,
    popularity: 510000,
    episodes: 24,
    status: 'FINISHED',
    seasonYear: 2020,
    format: 'TV',
    coverImage: {
      large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx113415-bbBWj4pTvAqF.jpg',
      color: '#d32f2f'
    },
    siteUrl: 'https://anilist.co/anime/113415'
  },
  {
    id: 101921,
    title: { romaji: 'Kaguya-sama wa Kokurasetai: Tensai-tachi no Renai Zunousen', english: 'Kaguya-sama: Love is War' },
    description: 'En la prestigiosa Academia Shuchiin, Miyuki Shirogane y Kaguya Shinomiya son dos genios orgullosos que se niegan a confesar su amor primero, convirtiendo el romance en una batalla psicológica.',
    genres: ['Comedy', 'Romance', 'Slice of Life'],
    averageScore: 86,
    popularity: 420000,
    episodes: 12,
    status: 'FINISHED',
    seasonYear: 2019,
    format: 'TV',
    coverImage: {
      large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx101921-VvdGQyvGuSYf.jpg',
      color: '#e91e63'
    },
    siteUrl: 'https://anilist.co/anime/101921'
  },
  {
    id: 124080,
    title: { romaji: 'Horimiya', english: 'Horimiya' },
    description: 'Hori es una chica popular y brillante en la escuela, pero hogareña en secreto; Miyamura parece sombrío pero está lleno de piercings y tatuajes. Ambos descubren la verdadera faceta del otro.',
    genres: ['Comedy', 'Romance', 'Slice of Life'],
    averageScore: 81,
    popularity: 380000,
    episodes: 13,
    status: 'FINISHED',
    seasonYear: 2021,
    format: 'TV',
    coverImage: {
      large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx124080-h8olPXBcsbCi.jpg',
      color: '#ff9800'
    },
    siteUrl: 'https://anilist.co/anime/124080'
  },
  {
    id: 154587,
    title: { romaji: 'Sousou no Frieren', english: 'Frieren: Beyond Journey\'s End' },
    description: 'La maga elfa Frieren y sus valientes compañeros han derrotado al Rey Demonio y traído la paz. Pero como elfa, vivirá miles de años tras ver partir a sus amigos humanos.',
    genres: ['Adventure', 'Drama', 'Fantasy'],
    averageScore: 91,
    popularity: 390000,
    episodes: 28,
    status: 'FINISHED',
    seasonYear: 2023,
    format: 'TV',
    coverImage: {
      large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx154587-n1fmjvsNlzqi.jpg',
      color: '#00bcd4'
    },
    siteUrl: 'https://anilist.co/anime/154587'
  },
  {
    id: 21,
    title: { romaji: 'ONE PIECE', english: 'ONE PIECE' },
    description: 'Monkey D. Luffy emprende su aventura hacia el Grand Line con su tripulación de los Sombreros de Paja en busca del legendario tesoro ONE PIECE.',
    genres: ['Action', 'Adventure', 'Comedy', 'Fantasy'],
    averageScore: 88,
    popularity: 490000,
    episodes: null,
    status: 'RELEASING',
    seasonYear: 1999,
    format: 'TV',
    coverImage: {
      large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21-4w5qmsy02qP1.jpg',
      color: '#ffc107'
    },
    siteUrl: 'https://anilist.co/anime/21'
  },
  {
    id: 140960,
    title: { romaji: 'SPY×FAMILY', english: 'SPY x FAMILY' },
    description: 'Para cumplir su misión secreta, el maestro espía Twilight adopta la identidad de Loid Forger y forma una familia improvisada con una esposa asesina y una hija huérfana telépata.',
    genres: ['Action', 'Comedy', 'Supernatural'],
    averageScore: 84,
    popularity: 440000,
    episodes: 25,
    status: 'FINISHED',
    seasonYear: 2022,
    format: 'TV',
    coverImage: {
      large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx140960-v3cAua2rhslD.jpg',
      color: '#2e7d32'
    },
    siteUrl: 'https://anilist.co/anime/140960'
  }
];

// In-memory cache for fast tab switching and avoiding rate limits
const cache = new Map<string, AnimeItem[]>();

export async function fetchAnimes(filters: AnimeFilters): Promise<AnimeItem[]> {
  const cacheKey = JSON.stringify(filters);
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  const variables: Record<string, unknown> = {
    page: filters.page || 1,
    perPage: 24,
    sort: [filters.sort || 'POPULARITY_DESC']
  };

  if (filters.genre && filters.genre !== 'all') {
    variables.genre = filters.genre;
  }

  if (filters.search && filters.search.trim().length > 0) {
    variables.search = filters.search.trim();
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const response = await fetch(ANILIST_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: ANIME_QUERY,
        variables
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    const media: AnimeItem[] = data?.data?.Page?.media || [];

    if (media.length > 0) {
      cache.set(cacheKey, media);
      return media;
    }
    return [];
  } catch (err) {
    console.warn('AniList fetch error, using local filtered fallback:', err);
    // Filter fallback according to genres / search
    return FALLBACK_ANIMES.filter(anime => {
      if (filters.genre && filters.genre !== 'all' && !anime.genres.includes(filters.genre)) {
        return false;
      }
      if (filters.search && filters.search.trim().length > 0) {
        const query = filters.search.toLowerCase();
        const romaji = anime.title.romaji.toLowerCase();
        const english = (anime.title.english || '').toLowerCase();
        return romaji.includes(query) || english.includes(query);
      }
      return true;
    });
  }
}
