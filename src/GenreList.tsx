/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  CircularProgress,
  Typography,
  TextField,
  Autocomplete,
  AutocompleteProps,
  colors,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const fetchGenres = async () => {
  const { data } = await axios.get("http://localhost:8000/genres");
  return data; // Ajuste conforme a estrutura dos dados retornados
};

const StyledAutocomplete = styled(Autocomplete)<
  AutocompleteProps<Genre, false, false, false>
>(({ theme }) => ({
  color: theme.palette.common.white,
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
  "& .MuiOutlinedInput-root": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: theme.palette.common.white,
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  "& .MuiOutlinedInput .MuiAutocomplete-listbox": {
    // backgroundColor: theme.palette.primary.main,
    // padding: theme.spacing(1, 1, 1, 0),
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create("width"),
    // width: "100%",
    // color: theme.palette.common.white,
    // [theme.breakpoints.up("md")]: {
    //   width: "20ch",
    // },
    backgroundColor: "red",
  },
  "& .MuiAutocomplete-listbox li": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

interface Genre {
  id: number;
  label: string;
}

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
  } = useQuery<Genre[]>({ queryKey: ["genres"], queryFn: fetchGenres });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading genres</Typography>;

  return (
    <StyledAutocomplete
      options={genres || []}
      getOptionLabel={(option) => (option as Genre).label}
      value={genres?.find((genre: Genre) => genre.id === selectedGenre) || null}
      renderInput={(params) => <TextField {...params} label="Genres" />}
    />
  );
};

export default GenresList;
