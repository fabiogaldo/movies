/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Genre {
  id: number;
  name: string;
}

const fetchGenres = async () => {
  const { data } = await axios.get("http://localhost:8000/genres");
  return data; // Ajuste conforme a estrutura dos dados retornados
};

const GenresList = ({
  selectedGenre,
  onGenreChange,
}: {
  selectedGenre: number | null;
  onGenreChange: (genre: number | null) => void;
}) => {
  const {
    data: genres,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  if (isLoading) return <p>Loading genres...</p>;
  if (error) return <p>Error loading genres</p>;

  return (
    <div>
      <select
        value={selectedGenre !== null ? selectedGenre : ""}
        onChange={(e) =>
          onGenreChange(e.target.value ? Number(e.target.value) : null)
        }>
        <option value="">All Genres</option>
        {(genres as Genre[]).map((genre: Genre) => {
          return (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default GenresList;
