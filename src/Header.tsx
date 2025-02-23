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
import { useSnackbar } from "./components/SnackbarProvider";

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

const ACCESS_TOKEN = process.env.REACT_APP_API_ACCESS_TOKEN;
const API_URL = process.env.REACT_APP_API_URL;

const Header = ({ setMovies }: { setMovies: (movies: any[]) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [allMovies, setAllMovies] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleError = (message: any) => {
    setOpen(true);
    showSnackbar(message, "error");
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${API_URL}/movies`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      return response.data.data;
    } catch (error) {
      setOpen(true);
      handleError("Error loading movies.");
    }
  };

  const { data } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  useEffect(() => {
    if (data) {
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
