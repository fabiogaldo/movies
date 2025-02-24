/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import "./styles.css";
import MoviesList from "./components/MoviesList";
import Header from "./components/Header";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./themes/theme";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Container, CircularProgress, Typography } from "@mui/material";
import { SnackbarProvider, useSnackbar } from "./components/SnackbarProvider";
import { fetchMovies } from "./services/api";
import { Movie } from "./types";

const queryClient = new QueryClient();

export default function App() {
  //const { showSnackbar } = useSnackbar();
  const {
    data: movies,
    isLoading: moviesLoading,
    isError: moviesIsError,
    error: moviesError,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  if (moviesLoading) return <CircularProgress />;

  if (moviesIsError) {
    return (
      <Typography variant="body1" color="error">
        {moviesError instanceof Error
          ? moviesError.message
          : "Error loading movies data"}
      </Typography>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Container>
            <Header setMovies={setFilteredMovies} movies={movies || []} />
            <MoviesList movies={filteredMovies} />
          </Container>
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
