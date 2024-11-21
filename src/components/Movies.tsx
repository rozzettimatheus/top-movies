import { useCallback, useRef, useState } from "react";
import MoviePoster from "./MoviePoster";
import useMovies, { Movie } from "../hooks/useMovies";
import { hexAlgorithms } from "../utils/generateHex";
import MovieDetails from "./MovieDetails";

type Rules = "odd/even" | "fib";

type Genre = "top_rated" | "upcoming" | "now_playing" | "popular";

export default function Movies() {
  const [language, setLanguage] = useState("en");
  const [algorithm, setAlgorithm] = useState<Rules>("odd/even");
  const [genre, setGenre] = useState<Genre>("popular");
  const [page, setPage] = useState(1);
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const { movies, loading, hasMore, error } = useMovies(page, genre, language);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const generatedBg = useCallback(
    (index: number) => {
      if (!algorithm) return "#000000";
      return algorithm === "fib"
        ? hexAlgorithms.fib(index)
        : hexAlgorithms.oddEven(index);
    },
    [algorithm]
  );

  function handleOpenDetails(movie: Movie) {
    setCurrentMovie(movie);
    setIsOpenDetails(true);
  }

  function handleCloseDetails() {
    setIsOpenDetails(false);
    setCurrentMovie(null);
  }

  if (error) {
    return <div>Error fetching the current movies</div>;
  }

  return (
    <div className="container">
      <div className="config">
        <div className="config__category">
          Category:
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value as Genre)}
          >
            <option value="popular">Popular</option>
            <option value="top_rated">Top Rated</option>
            <option value="upcoming">Upcoming</option>
            <option value="now_playing">Now Playing</option>
          </select>
        </div>
        <div className="config__settings">
          <div className="config__settings--selector">
            Language:
            <select
              onChange={(e) => setLanguage(e.target.value)}
              className="select"
            >
              <option value="en">English</option>
              <option value="pt-br">Portuguese</option>
            </select>
          </div>
          <div className="config__settings--selector">
            Rule:
            <select
              onChange={(e) => setAlgorithm(e.target.value as Rules)}
              className="select"
            >
              <option selected value="">
                Select
              </option>
              <option value="odd/even">Odd/Even</option>
              <option value="fib">Fibonacci</option>
            </select>
          </div>
        </div>
      </div>
      <div className="movies-grid">
        {movies?.map((movie, idx) =>
          movies.length === idx + 1 ? (
            <MoviePoster
              key={movie.id}
              backgroundColor={generatedBg(idx)}
              movie={movie}
              ref={lastMovieRef}
              onOpenDetails={() => handleOpenDetails(movie)}
            />
          ) : (
            <MoviePoster
              key={movie.id}
              backgroundColor={generatedBg(idx)}
              movie={movie}
              onOpenDetails={() => handleOpenDetails(movie)}
            />
          )
        )}
        {loading && <div>Loading...</div>}
      </div>
      <MovieDetails
        movie={currentMovie}
        isOpen={isOpenDetails}
        requestClose={handleCloseDetails}
      />
    </div>
  );
}
