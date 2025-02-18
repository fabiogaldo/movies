import React, { useState, useEffect } from "react";
import moviesData from "./data/popular.json";
import genresData from "./data/genres.json";

interface Movie {
  id: number;
  title: string;
  genreId: number;
}

const GenreList: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (selectedGenre !== null) {
      const results = moviesData
        .filter((movie) => movie.genre_ids.includes(selectedGenre))
        .map((movie) => ({
          id: movie.id,
          title: movie.title,
          genreId: selectedGenre,
        }));
      setFilteredMovies(results);
    } else {
      setFilteredMovies([]);
    }
  }, [selectedGenre]);

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = parseInt(event.target.value, 10);
    setSelectedGenre(genreId);
  };
  {
    children;
  }
  return (
    <div>
      <h1>Movie Search by Genre</h1>
      <div>
        <label htmlFor="genre-select">Select a Genre: </label>
        <select id="genre-select" onChange={handleGenreChange}>
          <option value="">--Choose a Genre--</option>
          {genresData.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2>Movies:</h2>
        <ul>
          {filteredMovies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GenreList;
