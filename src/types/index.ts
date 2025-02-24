export interface Movie {
  id: number;
  title: string;
  featured: boolean;
  genre_ids: number[];
  poster_path: string;
  backdrop_path: string;
  backdrop_color: string;
  overview: string;
  release_date: string;
}

export interface Genre {
  genre_id: number;
  genre_name: string;
}
