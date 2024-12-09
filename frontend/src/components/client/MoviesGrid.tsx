import React from "react";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

type MovieCardProps = {
  movie: Movie;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="bg-beige border border-gray-300 rounded-lg shadow-md max-w-lg mx-auto p-6 flex flex-col items-center">
      {/* Centered Poster */}
      <div className="w-full h-72 flex justify-center items-center overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} Poster`}
          className="h-full object-cover"
        />
      </div>

      {/* Movie Details */}
      <div className="text-center mt-6">
        <h2 className="text-2xl font-extrabold text-gray-800">{movie.title}</h2>
        <p className="text-gray-600 text-sm mb-4">{movie.release_date}</p>

        {/* Metadata (Optional: Add if required) */}
        {/* <div className="text-sm text-gray-700 space-y-2">
          <p><span className="font-bold">Running Time:</span> 97 minutes</p>
          <p><span className="font-bold">Directed By:</span> Gil Junger</p>
          <p><span className="font-bold">Produced By:</span> Andrew Lazar</p>
          <p><span className="font-bold">Starring:</span> Heath Ledger, Julia Stiles</p>
        </div> */}

        {/* Rating */}
        <div className="mt-4 text-yellow-500 font-bold text-lg">
          ⭐ {movie.vote_average.toFixed(1)}/10
        </div>
      </div>
    </div>
  );
};


type MoviesGridProps = {
  movies: Movie[];
};

const MoviesGrid: React.FC<MoviesGridProps> = ({ movies }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Top Trending Movies
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviesGrid;


