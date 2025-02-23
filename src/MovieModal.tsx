/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Modal, Box, Typography, Grid, Paper, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
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

const assetsUrl = "https://image.tmdb.org/t/p/w1066_and_h600_bestv2";

const MovieModal: React.FC<MovieModalProps> = ({
  movie,
  open,
  handleClose,
  genres,
}) => {
  const getGenreNames = (genreIds: any, genres: Genre[]) => {
    //let a = "[27, 9648]";
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90vw",
    aspectRatio: "16 / 9",
    bgcolor: "#1976d2",
    boxShadow: 24,
    backgroundPosition: "center",
    backgroundSize: "cover",
    mixBlendMode: "screen",
    p: 4,
    display: "flex",
    flexDirection: "column",
  };

  const StyledPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    textAlign: "right",
    color: theme.palette.text.secondary,
    minHeight: "100px",
    padding: "20px",
    backgroundBlendMode: "screen",
  }));

  return (
    console.log(movie?.backdrop_color),
    (
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="movie-modal-title"
          aria-describedby="movie-modal-description">
          <Box
            sx={style}
            style={{
              backgroundColor: imageColor,
              backgroundImage: `url(${assetsUrl + (movie?.poster_path || "")})`,
              backgroundBlendMode: "multiply",
            }}>
            {movie && (
              <Grid
                container
                spacing={2}
                sx={{ color: "white", height: "100%" }}>
                <Grid item xs={12}>
                  <Typography
                    id="movie-modal-title"
                    variant="h4"
                    component="h2">
                    <strong>{movie.title}</strong>{" "}
                    <span style={{ fontSize: "0.5em" }}>(2020)</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ flexGrow: 1, overflowY: "auto" }}>
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
          </Box>
        </Modal>
      </>
    )
  );
};

export default MovieModal;
