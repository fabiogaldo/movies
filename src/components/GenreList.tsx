import React from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { Genre } from "../types";

interface GenresListProps {
  selectedGenre: number | null;
  onGenreChange: (genre: number | null) => void;
  genres: Genre[];
}

const GenresList: React.FC<GenresListProps> = ({
  selectedGenre,
  onGenreChange,
  genres,
}) => {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: "90%" }}>
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
        {genres?.map((genre) => (
          <MenuItem key={genre.genre_id} value={genre.genre_id}>
            {genre.genre_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default GenresList;
