import {ListResponse} from "../types/utils/utils.types";
import axios from "axios";
import {TFormat} from "../types/cinema/CinemasMoviesShows.types";

const formatService = {
    fetchAllFormats: async (): Promise<ListResponse<TFormat>> => {
        const { data } = await axios.get('http://localhost:8080/api/v1/formats');
        return data;
    },
}

export default formatService