import {TShowData} from "../types/cinema/CinemasMoviesShows.types";
import {TShowDetail} from "../types/show/ShowDetail.types";
import axios from "axios";
import {BASE_URL, END_POINTS} from "../constants/endpoints";
import {getAuthHeader} from "./auth.service";

const showService = {
    classifyShowsByUniqueValues: (arr: TShowData[]): Map<string, TShowData[]> => {
        const groups = new Map<string, TShowData[]>();
        for (const element of arr) {
            const formatKey = `${element.format.version} ${element.format.caption}`;
            if (!groups.has(formatKey)) {
                groups.set(formatKey, []);
            }
            groups.get(formatKey)!.push(element);
        }
        return groups;
    },

    fetchShowDetail: async (id: string): Promise<TShowDetail> => {
        try {
            const {data} = await axios.get(`${BASE_URL}/${END_POINTS.SHOW.URL}/${id}`, {
                headers: await getAuthHeader()
            })
            return data;
        } catch (error) {
            throw error;
        }

    }
}

export default showService;

