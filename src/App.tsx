import React, { useState } from "react";
import "./styles.css";
import MoviesList from "./MoviesList";
import Header from "./Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Container } from "@mui/material";
interface Movie {
  id: number;
  title: string;
  isFeatured: boolean;
  genre_ids: number[];
}

const queryClient = new QueryClient();

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Header setMovies={setMovies} />
        <MoviesList movies={movies} />
      </Container>
    </QueryClientProvider>
  );
}
