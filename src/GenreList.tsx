/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  MenuItem,
  CircularProgress,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// const StyledInputBase = styled(Select)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

interface Genre {
  id: number;
  name: string;
}

const fetchGenres = async () => {
  const { data } = await axios.get("http://localhost:8000/genres");
  return data;
};

const GenresList = ({
  selectedGenre,
  onGenreChange,
}: {
  selectedGenre: number | null;
  onGenreChange: (genre: number | null) => void;
}) => {
  const {
    data: genres,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading genres</Typography>;

  return (
    <FormControl fullWidth>
      <InputLabel>Genre</InputLabel>
      <Select
        variant="filled"
        value={selectedGenre !== null ? selectedGenre : ""}
        onChange={(e) =>
          onGenreChange(e.target.value ? Number(e.target.value) : null)
        }
        label="Genre">
        <MenuItem value="">All Genres</MenuItem>
        {genres.map((genre: Genre) => (
          <MenuItem key={genre.id} value={genre.id}>
            {genre.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GenresList;
