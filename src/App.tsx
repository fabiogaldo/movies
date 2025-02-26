import React, { useState } from "react";
import "./styles.css";
import MoviesList from "./MoviesList";
import Header from "./Header";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./themes/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Container } from "@mui/material";
import { SnackbarProvider } from "./components/SnackbarProvider";
import { GenresProvider } from "./contexts/GenresContext";

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
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <GenresProvider>
            <Container>
              <Header setMovies={setMovies} />
              <MoviesList movies={movies} />
            </Container>
          </GenresProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
