import {
  MoviesRepository,
  GetMoviesResult,
  GetMoviesParams,
} from "../../application/repositories/MoviesRepository";
import { apiKey } from "../../constants/apiKey";
import { IMovie } from "../../domain/models/Movie";
import { TMDBMovieDTO } from "../dtos/TMDBMovieDTO";
import HttpClient from "../http/HttpClient";
import CollectionMapper from "../mappers/Mapper";

export type TMDBResponseData = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Array<TMDBMovieDTO>;
};

export default class TMDBMoviesRepository implements MoviesRepository {
  private readonly BASE_URL: string = "https://api.themoviedb.org/3/movie";
  private readonly API_KEY: string = apiKey; // move to .env

  constructor(
    private readonly httpClient: HttpClient,
    private readonly mapper: CollectionMapper<IMovie>
  ) {}

  async getMovies(params: GetMoviesParams): Promise<GetMoviesResult> {
    const response = await this.httpClient.makeRequest<TMDBResponseData>({
      url: `${this.BASE_URL}/${params.genre}`,
      params: {
        api_key: this.API_KEY,
        language: params.language,
        ...(params.page && { page: String(params.page) }),
      },
    });
    return {
      movies: this.mapper.mapToCollection<TMDBResponseData["results"]>(
        response.results
      ),
    };
  }
}
