/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Movie, Genre } from "../types";

const ACCESS_TOKEN = process.env.REACT_APP_API_ACCESS_TOKEN;
const API_URL = process.env.REACT_APP_API_URL;

export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${API_URL}/movies`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    const fixedMovies = response.data.data.map((movie: any) => {
      const genreIds = (() => {
        if (!movie.genre_ids) {
          return [];
        } else if (Array.isArray(movie.genre_ids)) {
          return movie.genre_ids;
        } else {
          return [];
        }
      })();

      return {
        ...movie,
        genre_ids: genreIds,
      };
    });
    return fixedMovies as Movie[];
  } catch (error: any) {
    throw new Error("Error loading movies.");
  }
};

export const fetchGenres = async (): Promise<Genre[]> => {
  try {
    const response = await axios.get(`${API_URL}/genres`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return response.data.data as Genre[];
  } catch (error: any) {
    throw new Error("Error loading genres.");
  }
};
