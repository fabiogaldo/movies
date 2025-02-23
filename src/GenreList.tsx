/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  MenuItem,
  CircularProgress,
  Typography,
  Box,
  Snackbar,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Genre {
  genre_id: number;
  genre_name: string;
}

const accessToken =
  "f6b1cfb3bce0b0946626f644710e4506a06c0cafb4f6d1dc48d6d4ce78d49a6ba84a6716a4f6e639dd8e2f3bf0eed45025ab6cd685c5e3de701282bd7edcb5a85c950c2a7d1bb623bc5eac99e9bf7e035b12ae636acb32af4b36f47408b045474d6abbd21a81db31ed98162b942a864e483b9bc41f678af55a4fb64db941ac11";

const fetchGenres = async () => {
  try {
    const response = await axios.get(
      "https://splendid-excellence-23a4c4c895.strapiapp.com/api/genres",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${(error as Error).message}`);
  }
};

const GenresList = ({
  selectedGenre,
  onGenreChange,
}: {
  selectedGenre: number | null;
  onGenreChange: (genre: number | null) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: genres,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  if (isLoading) return <CircularProgress />;
  if (error) {
    setIsOpen(true);
    return (
      <Box sx={{ width: 500 }}>
        <Snackbar
          open={isOpen}
          autoHideDuration={6000}
          message={`Error loading genres: ${error.message}`}
        />
      </Box>
    );
  }

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: "90%" }}>
      <Select
        value={selectedGenre !== null ? selectedGenre : ""}
        onChange={(e) =>
          onGenreChange(e.target.value ? Number(e.target.value) : null)
        }
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderRadius: "4px",
          padding: "4px 8px",
          color: "#fff",
        }}>
        <MenuItem value="">All Genres</MenuItem>
        {genres.map((genre: Genre) => (
          <MenuItem key={genre.genre_id} value={genre.genre_id}>
            {genre.genre_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GenresList;
