/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Grid } from "@mui/material";
import MovieItem from "./MovieItem";

const MoviesList = ({ movies }: { movies: any[] }) => {
  return (
    <Grid container spacing={4} className="movies-list">
      {movies.map((movie) => (
        <Grid item key={movie.id} xs={12} sm={6} md={4}>
          <MovieItem movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MoviesList;
2;
