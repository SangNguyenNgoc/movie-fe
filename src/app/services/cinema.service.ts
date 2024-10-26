import {ListResponse} from "../types/utils/utils.types";
import {TCinemaInfo} from "../types/cinema/CinemaInfo.types";
import axios from "axios";
import {TCinemaData} from "../types/cinema/CinemasMoviesShows.types";

const cinemaService = {
    fetchAllCinemas: async (): Promise<ListResponse<TCinemaInfo>> => {
        const { data } = await axios.get('http://localhost:8080/api/v1/cinemas/home');
        return data;
    },
    fetchAllCinemasMoviesShows: async (): Promise<ListResponse<TCinemaData>> => {
        const { data } = await axios.get('http://localhost:8080/api/v1/cinemas/shows');
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