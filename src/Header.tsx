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
  Snackbar,
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

const accessToken =
  "f6b1cfb3bce0b0946626f644710e4506a06c0cafb4f6d1dc48d6d4ce78d49a6ba84a6716a4f6e639dd8e2f3bf0eed45025ab6cd685c5e3de701282bd7edcb5a85c950c2a7d1bb623bc5eac99e9bf7e035b12ae636acb32af4b36f47408b045474d6abbd21a81db31ed98162b942a864e483b9bc41f678af55a4fb64db941ac11";

const Header = ({ setMovies }: { setMovies: (movies: any[]) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [allMovies, setAllMovies] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://splendid-excellence-23a4c4c895.strapiapp.com/api/movies",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      setIsOpen(true);
      return (
        <Box sx={{ width: 500 }}>
          <Snackbar
            open={isOpen}
            autoHideDuration={6000}
            message={`Error fetching data: ${(error as Error).message}`}
          />
        </Box>
      );
    }
  };

  const { data } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setAllMovies(data);
      setMovies(data);
    }
  }, [data]);

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
      <AppBar position="static" sx={{ backgroundColor: "#021920" }}>
        <Toolbar
          sx={{
            position: "fixed",
            zIndex: 100,
            backgroundColor: "#000",
            width: "100%",
            left: 0,
            mixBlendMode: "luminosity",
          }}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ margin: "auto", width: "calc(100vw - 35%)" }}>
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
              <GenresList
                selectedGenre={selectedGenre}
                onGenreChange={handleGenreChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  borderRadius: "4px",
                  padding: "8px 8px",
                  color: "#fff",
                }}>
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={isFeatured}
                      onChange={handleFeaturedChange}
                    />
                  }
                  label="Featured"
                  sx={{ marginLeft: "10px" }}
                />
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
function err(reason: any): PromiseLike<never> {
  return Promise.reject(
    new Error(`Error fetching data: ${reason.message || reason}`)
  );
}
