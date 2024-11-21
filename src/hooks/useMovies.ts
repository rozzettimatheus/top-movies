import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import apiService from "../services/api.service";
import { moviesMapper } from "../utils/moviesMapper";

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

export default function useMovies(
  page: number,
  genre = "popular",
  language: string = "en"
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const fetchMovies = useCallback(
    (pageNumber: number, lang: string, genre: string) =>
      apiService.getMovies({ language: lang, page: pageNumber, genre }),
    []
  );

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchMovies(page, language, genre)
      .then(({ data }) => {
        setMovies((prev) => {
          const updatedMovies = [
            ...prev,
            ...moviesMapper(data.results)
              
          ].filter(
            (current, index, self) =>
              index === self.findIndex((t) => t.id === current.id)
          )
          return updatedMovies;
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
    fetchMovies(page, language, genre).then(({ data }) => {
      setMovies(moviesMapper(data.results))
      setHasMore(page < data.total_pages);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, genre]);

  return { loading, error, movies, hasMore };
}
