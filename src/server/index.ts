import express, { Request, Response } from 'express';
import cors from 'cors';
import { ANIME_LEGENDS } from '../client/constants/featuredLegends';
import { LOFI_TRACKS } from '../client/constants/lofiTracks';
import { FALLBACK_ANIMES } from '../client/services/anilist';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'animedoro-server',
    timestamp: new Date().toISOString()
  });
});

// Featured Legends endpoint (Luffy, Asta, Naruto, Meliodas, Ippo)
app.get('/api/legends', (_req: Request, res: Response) => {
  res.json({
    total: ANIME_LEGENDS.length,
    data: ANIME_LEGENDS
  });
});

// Lo-Fi tracks and live stream radio directory
app.get('/api/lofi/tracks', (_req: Request, res: Response) => {
  res.json({
    total: LOFI_TRACKS.length,
    data: LOFI_TRACKS
  });
});

// Popular curated anime list
app.get('/api/anime/popular', (_req: Request, res: Response) => {
  res.json({
    total: FALLBACK_ANIMES.length,
    data: FALLBACK_ANIMES
  });
});

app.listen(PORT, () => {
  console.log(`Animedoro backend server running on http://localhost:${PORT}`);
});

export default app;
