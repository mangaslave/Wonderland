import { Hono } from 'hono';
import axios from 'axios';

const router = new Hono();

const API_KEY = process.env.TMDB_API_KEY;
const TMDB_URL = 'https://api.themoviedb.org/3';

router.get('/top10', async (c) => {
  try {
    const response = await axios.get(`${TMDB_URL}/trending/movie/day`, {
      params: { api_key: API_KEY },
    });
    const top10 = response.data.results.slice(0, 10);
    return c.json(top10);
  } catch (err) {
    return c.json({ error: 'Failed to fetch data' }, 500);
  }
});

export default router;
