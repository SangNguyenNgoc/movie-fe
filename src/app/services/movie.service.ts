import {TMovie, TStatusMovie} from "../types/movie/RowMovie.types";
import axios from "axios";
import {ListResponse, PageResponse} from "../types/utils/utils.types";
import {TMovieDetail} from "../types/movie/MovieDetail.types";
import {BASE_URL, END_POINTS} from "../constants/endpoints";

const movieService = {
    fetchMovieToLandingPage: async (): Promise<ListResponse<TStatusMovie>> => {
        const {data} = await axios.get(`${BASE_URL}/${END_POINTS.MOVIE.URL}/${END_POINTS.MOVIE.CHILD.HOME}`);
        return data;
    },
    fetchMovieByStatus: async (status: string, page: number): Promise<PageResponse<TMovie>> => {
        const {data} = await axios.get(`${BASE_URL}/${END_POINTS.MOVIE.URL}/${status}?page=${page}&size=12`)
        return data;
    },
    fetchMovieDetailBySlug: async (slug: string): Promise<TMovieDetail> => {
        const {data} = await axios.get(`${BASE_URL}/${END_POINTS.MOVIE.URL}/${slug}/shows`)
        return data;
    },
    searchMoviesBySlug: async (slug: string): Promise<TMovie[]> => {
        const {data} = await axios.get(`${BASE_URL}/${END_POINTS.MOVIE.URL}/${END_POINTS.MOVIE.CHILD.SEARCH}?search=${slug}`)
        return data;
    },
    ratingMovie: async (slug: string, rating: number) => {
        let key = localStorage.getItem('rating-key')
        if (key == null) {
            key = crypto.randomUUID()
            localStorage.setItem('rating-key', key)
        }
        const {data} = await axios.post(`${BASE_URL}/${END_POINTS.MOVIE.URL}/${END_POINTS.MOVIE.CHILD.RATING(slug, rating, key)}`)
        return data
    },
    getRating: (sum: number, num: number) => {
        return Math.round((sum / num) * 10) / 10
    }
}

export default movieService;