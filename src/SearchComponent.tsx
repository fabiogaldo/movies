import React, { useState } from "react";
import rawData from "./data/popular.json";

interface MovieItem {
  id: number;
  original_title: string;
  release_date: string;
  // Add other properties as needed
}

const data: Person[] = rawData.map((item: MovieItem) => ({
  id: item.id,
  name: item.original_title,
  age: 0, // Provide a default value for age
}));

interface Person {
  id: number;
  name?: string;
  age: number;
}

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Person[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    const results = data.filter((person) =>
      person.name?.toLowerCase().includes(term.toLowerCase())
    );
    if (results.length) setSearchResults(results);
    else setSearchResults([]);
  };

  return (
    <div>
      <h1>Search</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {searchResults.map((person) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
