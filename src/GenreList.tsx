/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FormControl,
  MenuItem,
  CircularProgress,
  Select,
  Skeleton,
} from "@mui/material";
import { useSnackbar } from "./components/SnackbarProvider";

interface Genre {
  genre_id: number;
  genre_name: string;
}

interface GenresListProps {
  selectedGenre: number | null;
  onGenreChange: (genre: number | null) => void;
}

const GenreList: React.FC<GenresListProps> = ({
  selectedGenre,
  onGenreChange,
}) => {
  const { showSnackbar } = useSnackbar();

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/genres`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
          },
        }
      );
      return response.data.data as Genre[];
    } catch (error: any) {
      throw new Error("Error loading genres.");
    }
  };

  const {
    data: genres,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  if (isLoading)
    return (
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={48}
        sx={{ bgcolor: "#ffffff26", borderRadius: "4px" }}
      />
    );

  if (error) {
    showSnackbar((error as Error).message, "error");
    return null;
  }

  return (
    <FormControl variant="standard" sx={{ minWidth: "120px", width: "100%" }}>
      <Select
        value={selectedGenre !== null ? selectedGenre : ""}
        onChange={(e) => {
          onGenreChange(e.target.value === "" ? null : Number(e.target.value));
        }}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderRadius: "4px",
          padding: "4px 8px",
          color: "#fff",
        }}>
        <MenuItem value="">All Genres</MenuItem>
        {genres?.map((genre: Genre) => (
          <MenuItem key={genre.genre_id} value={genre.genre_id}>
            {genre.genre_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GenreList;
