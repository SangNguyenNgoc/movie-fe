import {TMovie, TStatusMovie} from "../types/movie/RowMovie.types";
import axios from "axios";
import {ListResponse, PageResponse} from "../types/utils/utils.types";
import {TMovieDetail} from "../types/movie/MovieDetail.types";

const movieService = {
    fetchMovieToLandingPage : async () : Promise<ListResponse<TStatusMovie>> => {
        const { data } = await axios.get('http://localhost:8080/api/v1/movies/home');
        return data;
    },
    fetchMovieByStatus:  async (status: string, page: number) : Promise<PageResponse<TMovie>> => {
        const { data } = await axios.get(`http://localhost:8080/api/v1/movies/${status}?page=${page}&size=12`)
        return data;
    },
    fetchMovieDetailBySlug:  async (slug: string) : Promise<TMovieDetail> => {
        const { data } = await axios.get(`http://localhost:8080/api/v1/movies/${slug}/shows`)
        return data;
    },
}

export default movieService;