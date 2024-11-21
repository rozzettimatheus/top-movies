import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import apiService from "../services/api.service";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const apiKey = "1b501bbda107113acc653f328a2e935d";

export default function useMovies(page: number, language: string = "en") {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const fetchMovies = useCallback((pageNumber: number, lang: string) => apiService
  .getMovies({ language: lang, apiKey, page: pageNumber }), [])

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchMovies(page, language)
      .then(({ data }) => {
        setMovies((prev) => {
          return [
            ...prev,
            ...data.results
              .filter(
                (current, index, self) =>
                  index ===
                  self.findIndex((t) => t.id === current.id)
              )
              .map((movie) => ({
                ...movie,
                release_date: new Date(movie.release_date)
                  .getFullYear()
                  .toString(),
              })),
          ];
        });
        setHasMore(page < data.total_pages);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchMovies(page, language)
      .then(({ data }) => {
        setMovies((prev) => {
          return [
            ...prev,
            ...data.results
              .filter(
                (current, index, self) =>
                  index ===
                  self.findIndex((t) => t.id === current.id)
              )
              .map((movie) => ({
                ...movie,
                release_date: new Date(movie.release_date)
                  .getFullYear()
                  .toString(),
              })),
          ];
        });
        setHasMore(page < data.total_pages);
        setLoading(false);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  return { loading, error, movies, hasMore };
}
