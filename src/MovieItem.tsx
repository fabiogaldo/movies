import React from "react";
import { Card, CardMedia, CardContent, Typography, Badge } from "@mui/material";
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

export default function MovieItem({ movie }: MovieItemProps) {
  return (
    <Card
      className="movie-item"
      data-genres={movie.genre_ids?.join(",")}
      data-featured={movie.featured?.toString()}>
      <CardMedia
        component="img"
        height="330"
        image={assetsUrl + movie.poster_path}
        alt={movie.title}
      />
      <CardContent>
        {movie.featured && <Badge badgeContent="Em destaque" color="primary" />}
        <Typography variant="h5" component="div">
          {movie.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
