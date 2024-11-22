import {
  GetMoviesParams,
  MoviesRepository,
} from "../../application/repositories/MoviesRepository";
import { apiKey } from "../../constants/apiKey";
import { IMovie } from "../../domain/models/Movie";
import HttpClient from "../http/HttpClient";
import CollectionMapper from "../mappers/Mapper";

export type ITunesResponseData = {
  resultsCount: number;
  results: Array<{
    trackName: string;
  }>;
};

export default class ITunesMoviesRepository implements MoviesRepository {
  private readonly BASE_URL: string = "https://itunes.apple.com/search";
  private readonly API_KEY: string = apiKey; // move to .env
  private readonly MEDIA_TYPE: string = "movie"; // can be flexible

  constructor(
    private readonly httpClient: HttpClient,
    private readonly mapper: CollectionMapper<IMovie>
  ) {}

  async getMovies(params: GetMoviesParams) {
    const response = await this.httpClient.makeRequest<ITunesResponseData>({
      url: this.BASE_URL,
      params: {
        api_key: this.API_KEY,
        media: this.MEDIA_TYPE,
        lang: params.language,
        ...(params.search !== undefined && { term: params.search }),
      },
    });
    return {
      movies: this.mapper.mapToCollection<ITunesResponseData["results"]>(
        response.results
      ),
    };
  }
}
