import React from "react";
import { Link } from "react-router-dom";

export interface Movie {
  id: number;
  movieId: number;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
  watched: boolean;
  isSaved?: boolean; 
  genres?: string[];
  posterPath?: string;
  rating?: number;
}

type MovieCardProps = {
  movie: Movie;
  buttonText: (movie: Movie) => string; 
  buttonAction: (movie: Movie) => Promise<void>;
};

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  buttonText,
  buttonAction,
}) => {
  return (
    <div className="bg-beige border border-gray-300 rounded-lg shadow-md max-w-lg mx-auto p-6 flex flex-col items-center">
      <div className="w-full h-72 flex justify-center items-center overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} Poster`}
          className="h-full object-cover"
        />
      </div>

      <div className="text-left mt-6">
      <Link to={`/movie/${movie.id}`} className="no-underline">
        <h2 className="text-2xl font-extrabold text-gray-800">{movie.title}</h2>
      </Link>

        <p className="text-gray-600 text-sm mb-4">{movie.release_date || " "}</p>

        <div className="mt-4 text-yellow-500 font-bold text-lg">
          ⭐ {movie.vote_average ? movie.vote_average : "N/A"}/10
        </div>

        <button
          onClick={() => buttonAction(movie)}
          className="px-4 py-2 mt-4 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          {buttonText(movie)} 
        </button>
      </div>
    </div>
  );
};


type MoviesGridProps = {
  movies: Movie[];
  buttonText: (movie: Movie) => string; 
  buttonAction: (movie: Movie) => Promise<void>;
};

const MoviesGrid: React.FC<MoviesGridProps> = ({
  movies,
  buttonText,
  buttonAction,
}) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            buttonText={buttonText}
            buttonAction={buttonAction}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviesGrid;
