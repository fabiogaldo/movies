import React, { useEffect, useRef } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import { extractColors } from "extract-colors";
import "./styles.css";

const assetsUrl = process.env.REACT_APP_API_POSTER_URL;

interface MovieItemProps {
  movie: {
    id: number;
    poster_path: string;
    backdrop_path: string;
    backdrop_color: string;
    featured?: boolean;
    title: string;
    genre_ids?: string;
    release_date: string;
  };
  onClick: (movie: MovieItemProps["movie"]) => void;
}

const FeaturedIconWrapper = styled("div")(({ theme }) => ({
  width: "2em",
  height: "2em",
  position: "absolute",
  pointerEvents: "none",
  top: "10px",
  right: "10px",
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  borderRadius: "50%",
  padding: "5px",
  textAlign: "center",
}));

const MoviePosterWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  overflow: "hidden",
  backgroundColor: theme.palette.primary.main,
  margin: "0 auto",
}));

export default function MovieItem({ movie, onClick }: MovieItemProps) {
  const movieImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (movieImageRef.current) {
      extractColors(movieImageRef.current.src, {})
        .then((colors) => {
          if (colors.length > 0) {
            movie.backdrop_color = colors[0].hex; // Cor dominante
            movie.backdrop_path = movie.poster_path;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [movie.poster_path]);

  console.log(movie);
  return (
    <Card
      className="movie-item"
      data-genres={movie.genre_ids}
      data-featured={movie.featured?.toString()}
      onClick={() => onClick(movie)}>
      <MoviePosterWrapper>
        <CardMedia
          component="img"
          width="220"
          height={330}
          image={assetsUrl + movie.poster_path}
          alt={movie.title}
          ref={movieImageRef}
        />
      </MoviePosterWrapper>
      <CardContent
        sx={{ backgroundColor: "#000", p: "0", paddingBottom: "0 !important" }}>
        {movie.featured && (
          <FeaturedIconWrapper>
            <WorkspacePremiumOutlinedIcon />
          </FeaturedIconWrapper>
        )}
        <CardActionArea sx={{ display: "flex" }}>
          <Typography
            variant="h6"
            component="div"
            className="movie-item__title">
            {movie.title}
          </Typography>
        </CardActionArea>
      </CardContent>
    </Card>
  );
}
