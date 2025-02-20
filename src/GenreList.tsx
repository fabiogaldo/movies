import React, { useState } from "react";
import genres from "./data/genres.json";

export default function GenresList() {
  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };
  const [selectedGenre, setSelectedGenre] = useState("");
  const genresItems = genres.map((genre) => (
    <option key={genre.id} value={genre.id}>
      {genre.name}
    </option>
  ));

  return (
    <select
      value={selectedGenre}
      onChange={handleGenreChange}
      style={{ padding: "5px", marginLeft: "10px" }}>
      <option value="">All</option>
      {genresItems}
    </select>
  );
}
