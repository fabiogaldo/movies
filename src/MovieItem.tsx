import React from "react";
import { Card, CardMedia, CardContent, Typography, Badge } from "@mui/material";
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
        {movie.featured && <Badge badgeContent="Featured" color="primary" />}
        <Typography variant="h4" component="div" className="movie-item__title">
          {movie.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
