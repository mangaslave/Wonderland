const API_KEY = process.env.TMDB_API_KEY;
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";


export default async function fetchTop10Movies() {
    const TMDB_URL = "https://api.themoviedb.org/3/trending/movie/day";
  
    try {
      const response = await fetch(`${TMDB_URL}?api_key=${API_KEY}`);
      const data = await response.json();
      const top10 = data.results.slice(0, 10);

      return new Response(JSON.stringify(top10), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch Top 10 movies" }),
        { headers: { "Content-Type": "application/json" }, status: 500 }
      );
    }
  }

export async function fetchMovieDetails(movieId: any) {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    const data = await response.json();

    return {
      id: data.id,
      title: data.title,
      posterPath: data.poster_path,
      rating: data.vote_average,
      release_date: data.release_date,
      overview: data.overview,
      genres: data.genres.map((genre: any) => genre.name),
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw new Error("Failed to fetch movie details");
  }
}

export async function fetchRecommendedMovies(movieId: any) {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US`);
    if (!response.ok) {
      throw new Error("Failed to fetch recommended movies");
    }
    const data = await response.json();

    return data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      rating: movie.vote_average,
      release_date: movie.release_date,
    }));
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    throw new Error("Failed to fetch recommended movies");
  }
}

