import axios from "axios";
import {BASE_URL, END_POINTS} from "../constants/endpoints";
import {getAuthHeader} from "./auth.service";
import {TConcessionInfo} from "../types/concession/ConcessionInfo.types";

const concessionService = {
    fetchConcessionByCinema: async (cinemaId: string): Promise<TConcessionInfo[]> => {
        try {
            const {data} = await axios.get(`${BASE_URL}/${END_POINTS.CONCESSION.URL}?cinemaId=${cinemaId}`, {
                headers: await getAuthHeader()
            })
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default concessionService