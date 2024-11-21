import { forwardRef } from "react";
import { Movie } from "../hooks/useMovies";

type MoviePosterProps = {
  movie: Movie;
  backgroundColor?: string;
  onOpenDetails: () => void;
};

const MoviePoster = forwardRef<HTMLDivElement, MoviePosterProps>(
  ({ movie, onOpenDetails, backgroundColor = "#000000" }, ref) => {
    return (
      <div
        onClick={onOpenDetails}
        ref={ref}
        className="movie-poster"
        key={movie.id}
      >
        <div className="movie-poster__img">
          <img src={movie.poster_path} />
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
