import { IMovie } from '../../domain/models/Movie'
import { ITunesMovieDTO } from '../dtos/ITunesMovieDTO'
import CollectionMapper from './Mapper'

export default class ITunesMoviesMapper implements CollectionMapper<IMovie> {
  mapToCollection<T>(input: T): IMovie[] {
    if (!Array.isArray(input)) throw new Error('Input must be an array')
    return input.map((movie: unknown) => this.mapToMovie(movie))
  }

  private mapToMovie(raw: unknown): IMovie {
    const {
      artworkUrl,
      longDescription,
      releaseDate,
      trackCensoredName,
      trackId,
      trackName,
      ...rest
    } = raw as ITunesMovieDTO
    return {
      source: 'itunes',
      id: trackId,
      title: trackName,
      originalTitle: trackCensoredName,
      description: longDescription,
      backdropImageUrl: artworkUrl, // handle different sizes
      posterImageUrl: artworkUrl, // handle different sizes
      releaseDate: new Date(releaseDate),
      details: {
        ...rest,
      },
    }
  }
}
