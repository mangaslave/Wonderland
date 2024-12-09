import Navbar from "@/components/client/MainNav";
import MoviesGrid, { Movie } from "@/components/client/MoviesGrid";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";

const WatchlistPage = () => {
  const { user } = useUser();
  const [watchedMovies, setWatchedMovies] = useState<Movie[]>([]);
  const [notWatchedMovies, setNotWatchedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get(`/api/saved`, {
          params: { userId: user?.id },
        });
        const movies = response.data as Movie[];
        setWatchedMovies(movies.filter((movie) => movie.watched));
        console.log(setWatchedMovies, "not")
        setNotWatchedMovies(movies.filter((movie) => !movie.watched));
        console.log(setNotWatchedMovies, "not")
      } catch (err) {
        console.error("Error fetching watchlist:", err);
      }
    };

    if (user?.id) fetchWatchlist();
  }, [user]);

  const handleMovieAction = async (movie: Movie, watchedStatus: boolean) => {
    try {
      await axios.post("/api/update-movie", {
        movieId: movie.movieId,
        watched: watchedStatus,
      });
      if (watchedStatus) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setNotWatchedMovies((prev: any[]) =>
          prev.filter((m) => m.movieId !== movie.movieId)
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setWatchedMovies((prev: any[]) => [...prev, { ...movie, watched: true }]);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setWatchedMovies((prev: any[]) =>
          prev.filter((m: { movieId: number; }) => m.movieId !== movie.movieId)
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setNotWatchedMovies((prev: any) => [...prev, { ...movie, watched: false }]);
      }

      console.log(watchedMovies, "not")
    } catch (err) {
      console.error(
        `Error marking movie as ${watchedStatus ? "watched" : "not watched"}:`,
        err
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mb-6">My Watchlist</h1>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Not Watched
      </h2>
      <MoviesGrid
        movies={notWatchedMovies}
        buttonText={(movie) => (movie.watched ? "Error" : "Mark as Watched")}
        buttonAction={(movie) => handleMovieAction(movie, true)}
        />

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Watched
        </h2>
        <MoviesGrid
        movies={watchedMovies}
        buttonText={(movie) => (movie.watched ? "Mark as Not Watched" : "Error")}
        buttonAction={(movie) => handleMovieAction(movie, false)}
        />
    </div>
  );
};

export default WatchlistPage;



