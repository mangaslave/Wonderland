import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/client/MainNav";
import { Movie } from "@/components/client/MoviesGrid";

const MovieDetailPage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
//   const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(`/api/movie/${movieId}`);
        // const recommendedResponse = await axios.get(`/api/movie/${movieId}/recommendations`);

  
        // const recommendedMovies = recommendedResponse.data.map((movie: Movie) => ({
        //   ...movie,
        //   isSaved: fetchSavedStatus(movie), 
        // }));
  
        setMovie(movieResponse.data);
        // setRecommendedMovies(recommendedMovies);
      } catch (err) {
        console.error("Error loading movie details:", err);
        setError("Failed to load movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchMovieDetails();
  }, [movieId]);
  
  

//   const fetchSavedStatus = async (movie: Movie) => {
//     try {
//       const response = await axios.post("/api/is-movie-saved", {
//         movieId: movie.id,
//       });
//       return response.data.isSaved;
//     } catch (err) {
//       console.error(`Error checking saved status for movie ${movie.id}:`, err);
//       return false;
//     }
//   };

//   const handleButtonAction = async (movie: Movie) => {
//     try {
//       if (movie.isSaved) {
//         // Remove from favorites
//         await axios.post("/api/remove-movie", {
//           movieId: movie.id,
//         });
//         setRecommendedMovies((prevMovies) =>
//           prevMovies.map((m) =>
//             m.id === movie.id ? { ...m, isSaved: false } : m
//           )
//         );
//       } else {
//         await axios.post("/api/save-movie", {
//           movieId: movie.id,
//           title: movie.title,
//           poster_path: movie.poster_path,
//           rating: movie.vote_average,
//           release_date: movie.release_date,
//         });
//         setRecommendedMovies((prevMovies) =>
//           prevMovies.map((m) =>
//             m.id === movie.id ? { ...m, isSaved: true } : m
//           )
//         );
//       }
//     } catch (err) {
//       console.error(
//         `Error ${movie.isSaved ? "removing" : "saving"} movie ${movie.id}:`,
//         err
//       );
//     }
//   };

  if (loading) return <p className="text-center">Loading movie details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!movie) return <p className="text-center">Movie not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-shrink-0 w-full lg:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
            alt={movie.title}
            className="rounded-lg"
          />
        </div>

        <div className="flex-grow text-left">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-gray-500 mt-2">{movie.release_date}</p>
          <p className="text-yellow-500 font-bold text-lg mt-4">
            ⭐ {movie.rating}/10
          </p>
          <p className="text-gray-700 mt-4">{movie.overview}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {movie.genres?.map((genre) => (
              <span
                key={genre}
                className="px-4 py-2 bg-gray-200 rounded-full text-sm text-gray-800"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        {/* <h2 className="text-3xl font-bold mb-6">Recommended Movies</h2>
        <MoviesGrid
          movies={recommendedMovies}
          buttonText={(movie) =>
            movie.isSaved ? "Remove from Favorites" : "Save to Favorites"
          }
          buttonAction={(movie) => handleButtonAction(movie)}
        /> */}
      </div>
    </div>
  );
};

export default MovieDetailPage;

