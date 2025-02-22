import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import "./styles.css"; // Certifique-se de importar o arquivo CSS

const assetsUrl = "https://www.themoviedb.org/t/p/w220_and_h330_face/";

interface MovieItemProps {
  movie: {
    id: number;
    poster_path: string;
    featured?: boolean;
    title: string;
    genre_ids?: number[];
  };
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

const MoviePosterWrapper = styled("div")(() => ({
  width: "220px",
  height: "330px",
}));

export default function MovieItem({ movie }: MovieItemProps) {
  return (
    <Card
      className="movie-item"
      data-genres={movie.genre_ids?.join(",")}
      data-featured={movie.featured?.toString()}>
      <MoviePosterWrapper>
        <CardMedia
          component="img"
          width="220"
          height={330}
          image={assetsUrl + movie.poster_path}
          alt={movie.title}
        />
      </MoviePosterWrapper>
      <CardContent>
        {movie.featured && (
          <FeaturedIconWrapper>
            <WorkspacePremiumOutlinedIcon />
          </FeaturedIconWrapper>
        )}
        <Typography variant="h6" component="div" className="movie-item__title">
          {movie.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
