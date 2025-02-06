import {ListResponse} from "../types/utils/utils.types";
import {TCinemaInfo} from "../types/cinema/CinemaInfo.types";
import axios from "axios";
import {TCinemaData} from "../types/cinema/CinemasMoviesShows.types";
import {BASE_URL, END_POINTS} from "../constants/endpoints";

const cinemaService = {
    fetchAllCinemas: async (): Promise<ListResponse<TCinemaInfo>> => {
        const {data} = await axios.get(`${BASE_URL}/${END_POINTS.CINEMA.URL}/${END_POINTS.CINEMA.CHILD.HOME}`);
        return data;
    },
    fetchAllCinemasMoviesShows: async (): Promise<ListResponse<TCinemaData>> => {
        const {data} = await axios.get(`${BASE_URL}/${END_POINTS.CINEMA.URL}/${END_POINTS.CINEMA.CHILD.SHOWS}`);
        return data;
    },
    fetchCinemaMoviesShows: async (cinemaSlug: string): Promise<TCinemaData> => {
        const {data} = await axios.get(`${BASE_URL}/${END_POINTS.CINEMA.URL}/${END_POINTS.CINEMA.CHILD.SHOWS}/${cinemaSlug}`);
        return data;
    },
    filterCinemas: (data: TCinemaData[], slug: string): TCinemaData | undefined => {
        const result = data.find(item => item.slug === slug);
        if (!result) {
            return undefined;
        }
        return result;
    }
}

export default cinemaService;