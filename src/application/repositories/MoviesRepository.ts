import { IMovie } from "../../domain/models/Movie";

export interface GetMoviesResult {
  movies: IMovie[]
}

export interface GetMoviesParams {
  language: string
  search?: string
  page?: number
  genre?: string
}

export interface MoviesRepository {
  getMovies(params: GetMoviesParams): Promise<GetMoviesResult>
}