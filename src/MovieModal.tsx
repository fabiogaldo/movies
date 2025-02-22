import React from "react";
import { Modal, Box, Typography, Grid } from "@mui/material";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  poster_path: string;
  featured?: boolean;
  title: string;
  overview: string;
  genre_ids?: number[];
}

interface MovieModalProps {
  movie?: Movie;
  open: boolean;
  handleClose: () => void;
  genres: Genre[];
}

const assetsUrl = "https://media.themoviedb.org/t/p/w1066_and_h600_bestv2";

const MovieModal: React.FC<MovieModalProps> = ({
  movie,
  open,
  handleClose,
  genres,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    height: "80vh",
    bgcolor: "#1976d2",
    border: "2px solid #000",
    boxShadow: 24,
    backgroundPosition: "center",
    backgroundSize: "cover",
    mixBlendMode: "luminosity",
    p: 4,
    display: "flex",
    flexDirection: "column",
  };

  const getGenreNames = (genreIds: number[], genres: Genre[]) => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter((name) => name)
      .join(", ");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="movie-modal-title"
      aria-describedby="movie-modal-description">
      <Box
        sx={style}
        style={{
          backgroundImage: `url(${assetsUrl + (movie?.poster_path || "")})`,
        }}>
        {movie && (
          <Grid container spacing={2} sx={{ color: "white", height: "100%" }}>
            <Grid item xs={12}>
              <Typography id="movie-modal-title" variant="h4" component="h2">
                {movie.title}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ flexGrow: 1, overflowY: "auto" }}>
              <Typography id="movie-modal-description" variant="body1">
                {movie.overview}
              </Typography>
            </Grid>
            {movie.genre_ids && (
              <Grid item xs={12} sx={{ mt: "auto" }}>
                <Typography variant="body2">
                  Genres: {getGenreNames(movie.genre_ids, genres)}
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </Modal>
  );
};

export default MovieModal;
