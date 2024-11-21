import axios from 'axios';
import { Movie } from '../hooks/useMovies';

interface GetMoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

class ApiService {
  getMovies({ language, apiKey, page }: { language: string; apiKey: string, page: number }) {
    const category = 'popular'; // possible values: top_rated | upcoming | now_playing;
    const url = `https://api.themoviedb.org/3/movie/${category}?language=${language}&api_key=${apiKey}&page=${page}`;
    return axios.get<GetMoviesResponse>(url);
  }
}

export default new ApiService();
