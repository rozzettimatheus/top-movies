import { useCallback, useRef, useState } from "react";
import MoviePoster from "./MoviePoster";
import useMovies from "../hooks/useMovies";
import { hexAlgorithms } from "../utils/generateHex";

type Rules = "odd/even" | "fib";

export default function Movies() {
  const [language, setLanguage] = useState("en");
  const [algorithm, setAlgorithm] = useState<Rules>("odd/even");
  const [page, setPage] = useState(1);
  const { movies, loading, hasMore, error } = useMovies(page, language);

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

  if (error) {
    return <div>Error fetching the current movies</div>;
  }

  return (
    <div className="container">
      <div className="config">
        <span className="config__category">Category: Popular</span>
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
            />
          ) : (
            <MoviePoster
              key={movie.id}
              backgroundColor={generatedBg(idx)}
              movie={movie}
            />
          )
        )}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
}
