/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import GenresList from "./GenreList";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Typography,
} from "@mui/material";

const fetchMovies = async (): Promise<any[]> => {
  const { data } = await axios.get<any[]>(`http://localhost:8001/movies`);
  return data;
};

const Header = ({ setMovies }: { setMovies: (movies: any[]) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [allMovies, setAllMovies] = useState<any[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  useEffect(() => {
    if (data) {
      setAllMovies(data);
      setMovies(data);
    }
  }, [data, setMovies]);

  useEffect(() => {
    let filteredMovies = allMovies;

    if (searchTerm) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (isFeatured) {
      filteredMovies = filteredMovies.filter((movie) => movie.featured);
    }

    if (selectedGenre !== null) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genre_ids.includes(selectedGenre)
      );
    }

    setMovies(filteredMovies);
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
      <TextField
        label="Search by title"
        value={searchTerm}
        onChange={handleSearchChange}
        variant="outlined"
        style={{ marginRight: "10px" }}
      />
      <FormControlLabel
        control={
          <Checkbox checked={isFeatured} onChange={handleFeaturedChange} />
        }
        label="Featured"
      />
      <GenresList
        selectedGenre={selectedGenre}
        onGenreChange={handleGenreChange}
      />
      {isLoading && <CircularProgress />}
      {error && <Typography color="error">Error loading movies</Typography>}
    </header>
  );
};

export default Header;
