/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import MovieItem from "./MovieItem";
import MovieModal from "./MovieModal";
import { Skeleton } from "@mui/material";

const MoviesList = ({ movies }: { movies: any[] }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (movie: any) => {
    setSelectedMovie(movie);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMovie(null);
  };

  const isLoading = !movies || movies.length === 0;
  return (
    <>
      <Grid container spacing={1} className="movies-list">
        {isLoading
          ? //Show skeleton items
            Array.from({ length: 20 }).map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={330}
                  sx={{ bgcolor: "grey.600" }}
                />
                <Skeleton
                  variant="rectangular"
                  height={100}
                  sx={{
                    fontSize: "1rem",
                    bgcolor: "grey.600",
                    marginTop: "5px",
                  }}
                />
              </Grid>
            ))
          : //Show movie items
            movies?.map((movie) => (
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
        />
      )}
    </>
  );
};

export default MoviesList;
