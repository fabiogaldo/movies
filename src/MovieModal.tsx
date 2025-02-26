/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Grid2 as Grid,
  Paper,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGenres } from "./contexts/GenresContext";
interface Genre {
  genre_id: number;
  genre_name: string;
}

interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  backdrop_color: string;
  featured?: boolean;
  title: string;
  overview: string;
  genre_ids?: number[];
  release_date: string;
}

interface MovieModalProps {
  movie?: Movie;
  open: boolean;
  handleClose: () => void;
}

const IMG_POSTER_URL = process.env.REACT_APP_API_POSTER_URL || "";
const IMG_BACKDROP_URL = process.env.REACT_APP_API_BACKDROP_URL || "";

const MovieModal: React.FC<MovieModalProps> = ({
  movie,
  open,
  handleClose,
}) => {
  const { genres } = useGenres();

  const getGenreNames = (genreIds: number[], genres: Genre[]) => {
    return JSON.parse(genreIds.toString().replace(/'/g, '"'))
      .map((id: number): Genre | undefined =>
        genres.find((genre: Genre) => genre.genre_id === id)
      )
      .filter(
        (genre: Genre | undefined): genre is Genre => genre !== undefined
      );
  };

  const StyledBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "5%",
    left: "5%",
    transform: "translateX(-5%, -5%)",
    width: "90vw",
    aspectRatio: "9 / 16",
    backgroundColor: movie?.backdrop_color,
    backgroundImage: `url(${IMG_POSTER_URL + (movie?.poster_path || "")})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundBlendMode: "multiply",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "90vw",
      aspectRatio: "16 / 9",
      backgroundImage: `url(${
        IMG_BACKDROP_URL + (movie?.backdrop_path || "")
      })`,
    },
  }));

  const StyledPaper = styled(Paper)(({ theme }) => ({
    fontSize: "1rem!important",
    textAlign: "right",
    color: theme.palette.text.secondary,
    minHeight: "100px",
    maxHeight: "30vh",
    overflow: "auto",
    padding: "20px",
    backgroundBlendMode: "multiply",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    [theme.breakpoints.up("sm")]: {
      ...theme.typography.body1,
    },
  }));

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        aria-labelledby="movie-modal-title"
        aria-describedby="movie-modal-description"
        sx={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}>
        <StyledBox>
          {movie && (
            <Grid container spacing={0} sx={{ color: "white", height: "100%" }}>
              <Grid size={{ xs: 12 }}>
                <Typography id="movie-modal-title" variant="h4" component="h2">
                  <strong>{movie.title}</strong>{" "}
                  <span style={{ fontSize: "0.7em" }}>
                    ({new Date(movie.release_date).getFullYear()})
                  </span>
                </Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <StyledPaper elevation={3}>
                  <em>{movie.overview}</em>
                </StyledPaper>
              </Grid>
              {movie.genre_ids && (
                <Grid size={{ xs: 12 }} sx={{ mt: "auto" }}>
                  {getGenreNames(movie.genre_ids as number[], genres).map(
                    (genre: Genre) => (
                      <Chip
                        key={genre.genre_id}
                        label={genre.genre_name}
                        sx={{
                          margin: "2px",
                          backgroundColor: (theme) =>
                            theme.palette.primary.main,
                          color: (theme) => theme.palette.common.white,
                        }}
                      />
                    )
                  )}
                </Grid>
              )}
            </Grid>
          )}
        </StyledBox>
      </Modal>
    </>
  );
};

export default MovieModal;
