/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from 'vitest'

import { makeTMDBMovie } from '../../../tests/factories/makeTMDBMovie'
import { makeITunesMovie } from '../../../tests/factories/makeITunesMovie'

import GetMoviesUseCase from './GetMovies'
import ITunesMoviesMapper from '../../infra/mappers/ITunesMoviesMapper'
import ITunesMoviesRepository, {
  ITunesResponseData,
} from '../../infra/repositories/iTunesMoviesRepository'
import TMDBMoviesMapper from '../../infra/mappers/TMDBMoviesMapper'
import TMDBMoviesRepository from '../../infra/repositories/TMDBMoviesRepository'
import HttpClient from '../../infra/http/HttpClient'
import { TMDBResponseData } from '../../infra/repositories/TMDBMoviesRepository'
import AuthService from '../services/AuthService'
import { MoviesRepository } from '../repositories/MoviesRepository'

describe('GetMovies [Use Case]', () => {
  it('should be able to get movies using the TMDB API', async () => {
    const mapper = new TMDBMoviesMapper()
    const title = 'Test title'
    const httpClient: HttpClient = {
      makeRequest: async function (_: unknown): Promise<TMDBResponseData> {
        return {
          page: 1,
          total_pages: 1,
          total_results: 2,
          results: [makeTMDBMovie({ title })],
        }
      },
    }
    const repository = new TMDBMoviesRepository(httpClient, mapper)
    const authService: AuthService = {
      isUserAuthenticated() {
        return true
      },
    }
    const sut = new GetMoviesUseCase(repository, authService)
    const data = await sut.getMovies({ language: 'en' })
    expect(data.movies).toHaveLength(1)
    expect(data.movies[0].title).toEqual(title)
  })

  it('should be able to get movies using the iTunes API', async () => {
    const mapper = new ITunesMoviesMapper()
    const id = '123456789'
    const httpClient: HttpClient = {
      makeRequest: async function (_: unknown): Promise<ITunesResponseData> {
        return {
          resultsCount: 1,
          results: [makeITunesMovie({ trackId: id })],
        }
      },
    }
    const repository = new ITunesMoviesRepository(httpClient, mapper)
    const authService: AuthService = {
      isUserAuthenticated() {
        return true
      },
    }
    const sut = new GetMoviesUseCase(repository, authService)
    const data = await sut.getMovies({ language: 'en' })
    expect(data.movies).toHaveLength(1)
    expect(data.movies[0].id).toEqual(id)
  })

  it('should fail fetching movies if user is not authenticated', async () => {
    const repository = {} as MoviesRepository
    const authService: AuthService = {
      isUserAuthenticated() {
        return false
      },
    }
    const sut = new GetMoviesUseCase(repository, authService)
    await expect(sut.getMovies({ language: 'en' })).rejects.toEqual(
      new Error('Not authenticated')
    )
  })
})
