import { useEffect, useState } from "react";
import MoviesGrid from "./MoviesGrid";

const Top10Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchTop10Movies = async () => {
      try {
        const response = await fetch("/api/top10");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovies(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load movies."); 
      } finally {
        setLoading(false);
      }
    };

    fetchTop10Movies();
  }, []);

  if (loading) return <p className="text-center">Loading movies...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return <MoviesGrid movies={movies} />;
};

export default Top10Movies;

