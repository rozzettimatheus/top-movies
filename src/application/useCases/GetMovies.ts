import { IMovie } from '../../domain/models/Movie'
import { MoviesRepository } from '../repositories/MoviesRepository'
import AuthService from '../services/AuthService'

type Input = {
  language: string
  page?: number
  genre?: string
  search?: string
}

type Output = {
  movies: IMovie[]
}

export default class GetMoviesUseCase {
  constructor(
    private readonly movieRepository: MoviesRepository,
    private readonly authService: AuthService
  ) {}

  async getMovies(input: Input): Promise<Output> {
    if (!this.authService.isUserAuthenticated()) {
      throw new Error('Not authenticated')
    }
    return await this.movieRepository.getMovies(input)
  }
}
