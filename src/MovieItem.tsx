const assetsUrl = "https://www.themoviedb.org/t/p/w220_and_h330_face/";

interface MovieItemProps {
  movie: {
    poster_path: string;
    featured?: boolean;
    title: string;
  };
}

export default function MovieItem({ movie }: MovieItemProps) {
  return (
    <div className="movie-item">
      <header className="movie-item-header">
        <img
          className="movie-item__poster"
          src={assetsUrl + movie.poster_path}
          alt=""
          draggable={false}
        />
        {movie.featured && (
          <span className="movie-item__badge">Em destaque</span>
        )}
      </header>
      <h4 className="movie-item__title">{movie.title}</h4>
    </div>
  );
}
