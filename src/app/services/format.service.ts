import {ListResponse} from "../types/utils/utils.types";
import axios from "axios";
import {TFormat} from "../types/cinema/CinemasMoviesShows.types";
import {BASE_URL, END_POINTS} from "../constants/endpoints";

const formatService = {
    fetchAllFormats: async (): Promise<ListResponse<TFormat>> => {
        const {data} = await axios.get(`${BASE_URL}/${END_POINTS.FORMAT.URL}`);
        return data;
    },
}

export default formatService