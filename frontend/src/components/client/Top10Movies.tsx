import { useEffect, useState } from "react";
import MoviesGrid, { Movie } from "./MoviesGrid";
import axios from "axios";

const Top10Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSavedStatus = async (movie: Movie) => {
    try {
      const response = await axios.post("/api/is-movie-saved", {
        movieId: movie.id,
      });
      return response.data.isSaved;
    } catch (err) {
      console.error(`Error checking saved status for movie ${movie.id}:`, err);
      return false;
    }
  };

  useEffect(() => {
    const fetchTop10Movies = async () => {
      try {
        const response = await fetch("/api/top10");
        if (!response.ok) {
          throw new Error("Failed to fetch top 10 movies");
        }
        const data = await response.json();

        const moviesWithStatus = await Promise.all(
          data.map(async (movie: Movie) => ({
            ...movie,
            isSaved: await fetchSavedStatus(movie),
          }))
        );
        setMovies(moviesWithStatus);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTop10Movies();
  }, []);

  const handleButtonAction = async (movie: Movie) => {
    try {
      if (movie.isSaved) {
        await axios.post("/api/remove-movie", {
          movieId: movie.id,
        });
        setMovies((prevMovies) =>
          prevMovies.map((m) =>
            m.id === movie.id ? { ...m, isSaved: false } : m
          )
        );
      } else {
        await axios.post("/api/save-movie", {
          movieId: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          rating: movie.vote_average,
        });
        setMovies((prevMovies) =>
          prevMovies.map((m) =>
            m.id === movie.id ? { ...m, isSaved: true } : m
          )
        );
      }
    } catch (err) {
      console.error(
        `Error ${
          movie.isSaved ? "removing" : "saving"
        } movie ${movie.id}:`,
        err
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Top 10 Trending Movies</h1>
      <MoviesGrid
        movies={movies}
        buttonText={(movie) => (movie.isSaved ? "Remove from Favorites" : "Save to Favorites")}
        buttonAction={handleButtonAction}
      />
    </div>
  );
};

export default Top10Movies;



