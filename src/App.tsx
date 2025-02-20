import "./styles.css";
import MoviesList from "./MoviesList";
import Header from "./Header";
import movies from "./data/popular.json";

export default function App() {
  return (
    <div className="App">
      <Header />
      <MoviesList movies={movies} />
    </div>
  );
}
