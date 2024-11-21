import { forwardRef } from "react";
import { Movie } from "../hooks/useMovies";

type MoviePosterProps = {
  movie: Movie;
  backgroundColor?: string;
};

const MoviePoster = forwardRef<HTMLDivElement, MoviePosterProps>(
  ({ movie, backgroundColor = "#000000" }, ref) => {
    const _baseImgUrl = "https://image.tmdb.org/t/p/w780";
    return (
      <div ref={ref} className="movie-poster" key={movie.id}>
        <div className="movie-poster__img">
          <img src={_baseImgUrl + movie.poster_path} />
        </div>
        <div className="movie-poster__info" style={{ backgroundColor }}>
          <span className="movie-poster__info--title">{movie.title}</span>
          <span className="movie-poster__info--date">{movie.release_date}</span>
        </div>
      </div>
    );
  }
);

export default MoviePoster;
