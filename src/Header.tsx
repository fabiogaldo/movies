/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import GenresList from "./GenreList";

const Header = ({ setMovies }: { setMovies: (movies: any[]) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const fetchMovies = async () => {
    const { data } = await axios.get(`http://localhost:8001/movies`);
    setMovies(data);
    return data;
  };

  const {
    data: allMovies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  useEffect(() => {
    if (allMovies) {
      let filteredMovies = allMovies;

      if (searchTerm) {
        filteredMovies = filteredMovies.filter((movie: { title: string }) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (isFeatured) {
        filteredMovies = filteredMovies.filter(
          (movie: { featured: boolean }) => movie.featured
        );
      }

      if (selectedGenre !== null) {
        filteredMovies = filteredMovies.filter(
          (movie: { genre_ids: number[] }) =>
            movie.genre_ids.includes(selectedGenre)
        );
      }

      setMovies(filteredMovies);
    }
  }, [searchTerm, isFeatured, selectedGenre, allMovies, setMovies]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFeaturedChange = () => {
    setIsFeatured(!isFeatured);
  };

  const handleGenreChange = (genre: number | null) => {
    setSelectedGenre(genre);
  };

  return (
    <header className="header">
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ padding: "5px", marginRight: "10px" }}
      />
      <label>
        Featured:
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={handleFeaturedChange}
          style={{ marginLeft: "5px" }}
        />
      </label>
      <GenresList
        selectedGenre={selectedGenre}
        onGenreChange={handleGenreChange}
      />
      {isLoading && <p>Loading movies...</p>}
      {error && <p>Error loading movies</p>}
    </header>
  );
};

export default Header;
