/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "../components/SnackbarProvider";

interface Genre {
  genre_id: number;
  genre_name: string;
}

interface GenresContextProps {
  genres: Genre[];
  isLoading: boolean;
  error: Error | null;
}

const GenresContext = createContext<GenresContextProps | undefined>(undefined);

export const GenresProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/genres`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
            },
          }
        );
        setGenres(response.data.data);
      } catch (error: any) {
        setError(error);
        showSnackbar("Error loading genres.", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, [showSnackbar]);

  return (
    <GenresContext.Provider value={{ genres, isLoading, error }}>
      {children}
    </GenresContext.Provider>
  );
};

export const useGenres = (): GenresContextProps => {
  const context = useContext(GenresContext);
  if (context === undefined) {
    throw new Error("useGenres must be used within a GenresProvider");
  }
  return context;
};
