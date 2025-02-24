/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Modal, Box, Typography, Grid, Paper, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Height } from "@mui/icons-material";
interface Genre {
  id: number;
  name: string;
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
  genres: Genre[];
}

const IMG_BACKDROP_URL = process.env.REACT_APP_API_BACKDROP_URL;

const MovieModal: React.FC<MovieModalProps> = ({
  movie,
  open,
  handleClose,
  genres,
}) => {
  const getGenreNames = (genreIds: any, genres: Genre[]) => {
    genreIds = genreIds.replace(/'/g, '"');
    genreIds = JSON.parse(genreIds);
    return genreIds
      .map(
        (id: number): string | undefined =>
          genres.find((genre: Genre) => genre.id === id)?.name
      )
      .filter((name: string | undefined): name is string => name !== undefined);
  };

  const imageColor = movie?.backdrop_color || "#1976d2";

  const StyledBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    height: "90%",
    width: "95vw",
    aspectRatio: "9 / 16",
    backgroundcolor: "#1976d2",
    backgroundPosition: "center",
    backgroundSize: "cover",
    mixBlendMode: "screen",

    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "90vw",
      aspectRatio: "9 / 16",
    },
  }));

  const StyledPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    textAlign: "right",
    color: theme.palette.text.secondary,
    minHeight: "100px",
    padding: "20px",
    backgroundBlendMode: "multiply",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  }));

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="movie-modal-title"
        aria-describedby="movie-modal-description">
        <StyledBox
          style={{
            backgroundColor: imageColor,
            backgroundImage: `url(${
              IMG_BACKDROP_URL + (movie?.poster_path || "")
            })`,
            backgroundBlendMode: "multiply",
          }}>
          {movie && (
            <Grid container spacing={2} sx={{ color: "white", height: "100%" }}>
              <Grid item xs={12}>
                <Typography id="movie-modal-title" variant="h4" component="h2">
                  <strong>{movie.title}</strong>{" "}
                  <span style={{ fontSize: "0.7em" }}>
                    ({new Date(movie.release_date).getFullYear()})
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <StyledPaper elevation={3}>
                  <Typography id="movie-modal-description" variant="h6">
                    <em>{movie.overview}</em>
                  </Typography>
                </StyledPaper>
              </Grid>
              {movie.genre_ids && (
                <Grid item xs={12} sx={{ mt: "auto" }}>
                  {getGenreNames(movie.genre_ids, genres).map((name: any) => (
                    <Chip
                      key={name}
                      label={name}
                      sx={{ margin: "2px" }}
                      color={"warning"}
                    />
                  ))}
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
