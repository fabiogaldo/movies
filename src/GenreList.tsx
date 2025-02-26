import React from "react";
import { FormControl, MenuItem, Select, Skeleton } from "@mui/material";
import { useGenres } from "./contexts/GenresContext";

interface GenresListProps {
  selectedGenre: number | null;
  onGenreChange: (genre: number | null) => void;
}

const GenreList: React.FC<GenresListProps> = ({
  selectedGenre,
  onGenreChange,
}) => {
  const { genres, isLoading, error } = useGenres();

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
        {genres?.map((genre) => (
          <MenuItem key={genre.genre_id} value={genre.genre_id}>
            {genre.genre_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GenreList;
