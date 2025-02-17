const assetsUrl = "https://www.themoviedb.org/t/p/w220_and_h330_face/";

export default function MovieItem({ movie }) {
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
