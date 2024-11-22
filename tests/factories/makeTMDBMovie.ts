import { faker } from '@faker-js/faker'
import { TMDBMovieDTO } from '../../src/infra/dtos/TMDBMovieDTO'

export const makeTMDBMovie = (override?: Partial<TMDBMovieDTO>): TMDBMovieDTO => ({
    adult: faker.datatype.boolean(),
    backdrop_path: faker.image.url(),
    genre_ids: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.number.int({ min: 1, max: 20 })),
    id: faker.number.int(10),
    original_language: faker.helpers.arrayElement(['en', 'es', 'fr', 'de', 'it', 'jp', 'ko']),
    original_title: faker.lorem.words(faker.number.int({ min: 2, max: 5 })),
    overview: faker.lorem.paragraph(),
    popularity: faker.number.float({ min: 0, max: 100 }),
    poster_path: faker.image.url(),
    release_date: faker.date.past().toISOString().split('T')[0],
    title: faker.lorem.words(faker.number.int({ min: 1, max: 4 })),
    video: faker.datatype.boolean(),
    vote_average: faker.number.float({ min: 0, max: 10, fractionDigits: 2 }),
    vote_count: faker.number.int({ min: 0, max: 10000 }),
    ...override,
})