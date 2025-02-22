/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import GenresList from "./GenreList";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Typography,
  AppBar,
  Box,
  Switch,
  Toolbar,
  InputBase,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./styles.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: "10px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const fetchMovies = async () => {
  const { data } = await axios.get(`http://localhost:8001/movies`);
  return data;
};

const Header = ({ setMovies }: { setMovies: (movies: any[]) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [allMovies, setAllMovies] = useState<any[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  useEffect(() => {
    if (data) {
      setAllMovies(data);
      setMovies(data);
    }
  }, [data, setMovies]);

  useEffect(() => {
    let filteredMovies = allMovies;

    if (searchTerm) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (isFeatured) {
      filteredMovies = filteredMovies.filter((movie) => movie.featured);
    }

    if (selectedGenre !== null) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genre_ids.includes(selectedGenre)
      );
    }

    setMovies(filteredMovies);
  }, [searchTerm, isFeatured, selectedGenre, allMovies, setMovies]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFeaturedChange = () => {
    setIsFeatured(!isFeatured);
  };

  const handleGenreChange = (genre: number | null) => {
    setSelectedGenre(genre);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search by title"
                  inputProps={{ "aria-label": "search" }}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Search>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    size="small"
                    checked={isFeatured}
                    onChange={handleFeaturedChange}
                  />
                }
                label="Featured"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <GenresList
                selectedGenre={selectedGenre}
                onGenreChange={handleGenreChange}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
