import axios from "axios";
import {BASE_URL, END_POINTS} from "../constants/endpoints";
import {getAuthHeader} from "./auth.service";
import {TPaymentInfo} from "../types/payment/PaymentInfo.types.ts";

const paymentService = {
    fetchAll: async (): Promise<TPaymentInfo[]> => {
        try {
            const {data} = await axios.get(`${BASE_URL}/${END_POINTS.PAYMENT.URL}`, {
                headers: await getAuthHeader()
            })
            return data;
        } catch (error) {
            throw error;
        }
    },
    pay: async (billId: string, method: string): Promise<string> => {
        const url = `${BASE_URL}/${END_POINTS.PAYMENT.URL}/${END_POINTS.PAYMENT.CHILD.PAY}?billId=${billId}&method=${method}`
        try {
            const response = await axios.get(
                url,
                {
                    headers: {
                        ...await getAuthHeader(),
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data
        } catch (error) {
            console.error('Error pay:', error);
            if (axios.isAxiosError(error)) {
                // console.error('Axios error:', error.response?.data);
            }
            throw error
        }
    }
}

export default paymentService