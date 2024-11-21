import { Movie } from "../hooks/useMovies";
import Modal from "./Modal";

type MovieDetailsProps = {
  movie: Movie | null;
  isOpen: boolean;
  requestClose: () => void;
};

export default function MovieDetails({
  movie,
  isOpen,
  requestClose,
}: MovieDetailsProps) {
  if (!movie) return null;
  return (
    <Modal isOpen={isOpen} requestClose={requestClose}>
      <div
        className="movie-details__backdrop"
        style={{ backgroundImage: `url(${movie.backdrop_path})` }}
      />
      <div className="movie-details__info">
        <img className="movie-details__info--poster" src={movie.poster_path} />
        <div className="movie-details__info--title">
          <span className="movie">{movie.title}</span>
          <span>({movie.original_title})</span>
        </div>
      </div>
      <div className="movie-details__main">
        <span>Overview: </span>
        <p>{movie.overview}</p>
      </div>
      <div className="movie-details__main">
        <span>Release Date: </span>
        <p>{movie.release_date}</p>
      </div>
      <div className="movie-details__main">
        <span>Rating: </span>
        <p>{movie.vote_average.toPrecision(2)}</p>
      </div>
    </Modal>
  );
}
