import React, { useState } from "react";
import GenresList from "./GenreList";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFeaturedChange = () => {
    setIsFeatured(!isFeatured);
  };

  return (
    <header className="header">
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ padding: "5px", marginRight: "10px" }}
      />
      <label>
        Featured:
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={handleFeaturedChange}
          style={{ marginLeft: "5px" }}
        />
      </label>
      <GenresList></GenresList>
    </header>
  );
};

export default Header;
