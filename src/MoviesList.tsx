import MovieItem from "./MovieItem";

interface MovieListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  movies: any[];
}

export default function MoviesList({ movies }: MovieListProps) {
  const moviesItems = movies.map((movie) => (
    <MovieItem key={movie.id} movie={movie} />
  ));

  return <div className="movies-list">{moviesItems}</div>;
}
