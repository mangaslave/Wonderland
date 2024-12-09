import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { createUser } from "./routes/users";
import { isMovieSaved, removeFavorite, saveFavorite } from "./routes/movies";
import { fetchWatchlist, updateWatchlist } from "./routes/watchlist";
import fetchTop10Movies, { fetchMovieDetails, fetchRecommendedMovies } from './routes/tmdb';

const sqlite = new Database('wonderland.sqlite');
const db = drizzle(sqlite);


Bun.serve({
    async fetch(req) {
      const url = new URL(req.url);
  
      // Home Page
      if (url.pathname === "/") {
        return new Response("Welcome to Wonderland! Your go-to movie mood explorer.");
      }
  
      // Top 10 Movies
      if (url.pathname === "/api/top10") {
        return fetchTop10Movies();
      }

      // Add new users
      if (url.pathname === "/api/users/sync" && req.method === "POST") {
        try {
          const userData = await req.json();
          const newUser = await createUser(db, userData);
          return new Response(JSON.stringify(newUser), {
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error: any) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }

    //   if (url.pathname === "/api/upload-image") {
    //     return uploadImage(req);
    //   }

      // Save movie
      if (url.pathname === "/api/save-movie" && req.method === "POST") {
        return saveFavorite(db, req);
      }

      if (url.pathname === "/api/is-movie-saved" && req.method === "POST") {
        return isMovieSaved(db, req);
      }
      
      if (url.pathname === "/api/remove-movie" && req.method === "POST") {
        return removeFavorite(db, req);
      }

      if (url.pathname === "/api/saved" && req.method === "GET") {
        const userId = url.searchParams.get("userId");
      
        if (!userId) {
          return new Response("Missing user ID", { status: 400 });
        }
      
        return fetchWatchlist(db, userId);
      }
      

      if (url.pathname === "/api/update-movie" && req.method === "POST") {
        return updateWatchlist(db, req);
      }

      if (url.pathname.startsWith("/api/movie/") && req.method === "GET") {
        const movieId = url.pathname.split("/")[3];
        try {
          const movieDetails = await fetchMovieDetails(movieId);
          return new Response(JSON.stringify(movieDetails), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          return new Response("Failed to fetch movie details", { status: 500 });
        }
      }
      
      if (url.pathname.startsWith("/api/movie/") && url.pathname.endsWith("/recommendations") && req.method === "GET") {
        const movieId = url.pathname.split("/")[3];
        try {
          const recommendations = await fetchRecommendedMovies(movieId);
          return new Response(JSON.stringify(recommendations), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          return new Response("Failed to fetch recommendations", { status: 500 });
        }
      }
      
      
      
  
      // 404 
      return new Response("404 - Not Found", { status: 404 });
    },
    port: 3000,
  });
  
  console.log("Server running on http://localhost:3000");
  

