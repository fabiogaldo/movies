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
  Grid2 as Grid,
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    margin: 0,
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = ({ setMovies }: { setMovies: (movies: any[]) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [allMovies, setAllMovies] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { showSnackbar } = useSnackbar();

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/movies",
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      showSnackbar("Error loading videos.", "error");
      return null;
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
    <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
      <Box sx={{ flexGrow: 1, width: "100%", padding: 0 }}>
        <AppBar position="static" sx={{ backgroundColor: "#021920" }}>
          <Toolbar
            sx={{
              zIndex: 100,
              backgroundColor: "#000",
              width: "100%",
              left: 0,
              padding: "5px 0!important",
              mixBlendMode: "luminosity",
            }}>
            <Grid
              container
              spacing={1}
              className="movies-list"
              sx={{
                margin: "auto",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "stretch",
              }}>
              <Grid
                size={{ xs: 12, sm: 12, md: 6 }}
                sx={{
                  marginLeft: "0",
                  width: "100%",
                }}>
                <Search
                  sx={{
                    marginLeft: "0!important",
                    width: "100%",
                  }}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search by title"
                    inputProps={{ "aria-label": "search" }}
                    sx={{ marginLeft: "0!important" }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </Search>
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                <GenresList
                  selectedGenre={selectedGenre}
                  onGenreChange={handleGenreChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 3 }}>
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
                    sx={{ paddingLeft: "10px" }}
                  />
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;
function err(reason: any): PromiseLike<never> {
  return Promise.reject(
    new Error(`Error fetching data: ${reason.message || reason}`)
  );
}
