import axios from 'axios';

import { Movie } from '../hooks/useMovies';
import { apiKey } from '../constants/apiKey';

interface GetMoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

interface GetMoviesRequest {
  language: string; 
  page: number
  genre: string
}

class ApiService {
  getMovies({ language, genre, page }: GetMoviesRequest) {
    const url = `https://api.themoviedb.org/3/movie/${genre}`;
    return axios.get<GetMoviesResponse>(url, {
      params: {
        language,
        page,
        api_key: apiKey,
      }
    });
  }
}

export default new ApiService();
