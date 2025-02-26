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
import { extractColors } from "extract-colors";
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

const IMG_POSTER_URL = process.env.REACT_APP_API_POSTER_URL || "";
const IMG_BACKDROP_URL = process.env.REACT_APP_API_BACKDROP_URL || "";

const MovieModal: React.FC<MovieModalProps> = ({
  movie,
  open,
  handleClose,
  genres,
}) => {
  const [bgColor, setBgColor] = useState("#055264");
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

  useEffect(() => {
    const imageSrc = `${IMG_POSTER_URL + movie?.poster_path}`;
    alert(imageSrc);
    if (imageSrc) {
      () =>
        extractColors(imageSrc, {
          pixels: 640,
          distance: 0.22,
          colorValidator: (red, green, blue, alpha = 255) => alpha > 250,
          saturationDistance: 0.5,
          lightnessDistance: 0.5,
          hueDistance: 0.05,
        })
          .then((colors) => {
            alert(colors);
            if (colors.length > 0) {
              setBgColor(colors[0].hex);
              alert(bgColor);
            }
          })
          .catch((error) => {
            console.error(error);
          });
    }
  }, [bgColor]);

  const StyledBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "5%",
    left: "5%",
    transform: "translateX(-5%, -5%)",
    width: "90vw",
    aspectRatio: "9 / 16",
    backgroundImage: `url(${IMG_POSTER_URL + (movie?.poster_path || "")})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    mixBlendMode: "screen",
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
  //alert(movie?.backdrop_color);
  //alert(imageColor);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        aria-labelledby="movie-modal-title"
        aria-describedby="movie-modal-description"
        sx={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}>
        <StyledBox
          style={{
            backgroundColor: bgColor,
            backgroundBlendMode: "lighten",
          }}>
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
                  {getGenreNames(movie.genre_ids, genres).map((name: any) => (
                    <Chip
                      key={name}
                      label={name}
                      sx={{
                        margin: "2px",
                        backgroundColor: (theme) => theme.palette.primary.main,
                        color: (theme) => theme.palette.common.white,
                      }}
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
