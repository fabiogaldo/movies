/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import MovieItem from "./MovieItem";
import MovieModal from "./MovieModal";
import { useSnackbar } from "./components/SnackbarProvider";

const MoviesList = ({ movies }: { movies: any[] }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [open, setOpen] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleOpen = (movie: any) => {
    setSelectedMovie(movie);
    setOpen(true);
    showSnackbar("Movie selected: " + movie.title, "success");
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMovie(null);
  };

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];
  return (
    <>
      <Grid container spacing={1} className="movies-list" sx={{ mt: 10 }}>
        {movies?.map((movie) => (
          <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <MovieItem movie={movie} onClick={handleOpen} />
          </Grid>
        ))}
      </Grid>
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          open={open}
          handleClose={handleClose}
          genres={genres}
        />
      )}
    </>
  );
};

export default MoviesList;
