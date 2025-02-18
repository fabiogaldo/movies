import React, { useState, useEffect } from "react";
import moviesData from "./data/popular.json";

interface Movie {
  id: number;
  title: string;
  genreId: number;
  featured: boolean;
}

const FeaturedList: React.FC = () => {
  // const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState<boolean>(false);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  useEffect(() => {
    let results = moviesData.map((movie) => ({
      ...movie,
      genreId: movie.genre_ids[0], // Assuming the first genre id is the main genre
      featured: movie.featured ?? false, // Ensure featured is always a boolean
    }));

    // Filter by featured flag
    if (showFeaturedOnly) {
      results = results.filter((movie) => movie.featured);
    }

    setFilteredMovies(results);
  }, [showFeaturedOnly]);

  const handleToggleFeatured = () => {
    setShowFeaturedOnly((prev) => !prev);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={showFeaturedOnly}
          onChange={handleToggleFeatured}
        />
        Show Featured Only
      </label>
      <ul>
        {filteredMovies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturedList;
