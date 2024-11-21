import { Movie } from "../hooks/useMovies";

const baseImgUrl = "https://image.tmdb.org/t/p/w780" as const

export const moviesMapper = (movieList: Movie[]) => movieList.map((movie) => ({
  ...movie,
  backdrop_path: baseImgUrl + movie.backdrop_path,
  poster_path: baseImgUrl + movie.poster_path,
  release_date: new Date(movie.release_date)
    .getFullYear()
    .toString(),
}))