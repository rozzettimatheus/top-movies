import { IMovie } from "../../domain/models/Movie";
import { TMDBMovieDTO } from "../dtos/TMDBMovieDTO";
import CollectionMapper from "./Mapper";

export default class TMDBMoviesMapper implements CollectionMapper<IMovie> {
  private readonly BASE_IMG_URL = "https://image.tmdb.org/t/p/w780";

  mapToCollection<T>(input: T): IMovie[] {
    if (!Array.isArray(input)) throw new Error("Input must be an array");
    return input.map((movie: unknown) => this.mapToMovie(movie));
  }

  private mapToMovie(raw: unknown): IMovie {
    const {
      id,
      title,
      original_title,
      overview,
      backdrop_path,
      poster_path,
      release_date,
      ...rest
    } = raw as TMDBMovieDTO;
    return {
      title,
      source: 'tmdb',
      id: String(id),
      originalTitle: original_title,
      description: overview,
      backdropImageUrl: `${this.BASE_IMG_URL}${backdrop_path}`,
      posterImageUrl: `${this.BASE_IMG_URL}${poster_path}`,
      releaseDate: new Date(release_date),
      details: {
        ...rest,
      },
    };
  }
}
