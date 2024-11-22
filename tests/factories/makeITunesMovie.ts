import { faker } from '@faker-js/faker'
import { ITunesMovieDTO } from '../../src/infra/dtos/ITunesMovieDTO'

export const makeITunesMovie = (override?: Partial<ITunesMovieDTO>): ITunesMovieDTO => ({
  trackId: faker.string.uuid(),
  trackName: faker.lorem.words(2),
  trackCensoredName: faker.lorem.words(2) + " (Censored)",
  artworkUrl: faker.image.url(),
  releaseDate: faker.date.past().toISOString().split('T')[0],
  longDescription: faker.lorem.paragraphs(2), 
  ...override,
})