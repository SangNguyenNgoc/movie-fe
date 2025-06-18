import {BASE_URL, END_POINTS} from "../constants/endpoints";
import axios from "axios";
import {TBillDetail} from "../types/bill/BillDetail.types";
import {getAuthHeader} from "./auth.service";
import {format} from "date-fns";
import {TBillCreate} from "../types/show/ShowDetail.types";
import {TAddCessionToBill, TBillSession} from "../types/bill/BillInSession.types";

const billService = {
    fetchBillByCurrUser: async (page: number, status: string) => {
        const url = `${BASE_URL}/${END_POINTS.BILL.URL}/${END_POINTS.BILL.CHILD.CURR_USER}?status=${status}&page=${page}&size=20`
        try {
            const response = await axios.get(url, {
                headers: await getAuthHeader()
            })
            const billHistory: TBillDetail[] = response.data.data
            return billHistory
        } catch (error) {
            // console.log('Error fetching bill: ', error)
        }
    },

    fetchOneBillById: async (billId: string) => {
        const url = `${BASE_URL}/${END_POINTS.BILL.URL}/${billId}`
        try {
            const response = await axios.get(url, {
                headers: await getAuthHeader()
            })
            const bill: TBillDetail = response.data
            return bill
        } catch (error) {
            // console.log('Error fetching bill: ', error)
        }
    },

    groupingByDate: (data: TBillDetail[]): Map<string, TBillDetail[]> => {
        const groups = new Map<string, TBillDetail[]>()
        for (const el of data) {
            const key = format(el.createDate, 'MM/yyyy')
            if (!groups.has(key)) {
                groups.set(key, [])
            }
            groups.get(key)!.push(el)
        }
        return groups;
    },

    createSession: async (data: TBillCreate): Promise<TBillSession> => {
        const url = `${BASE_URL}/${END_POINTS.BILL.URL}`
        try {
            const response = await axios.post(
                url,
                data,
                {
                    headers: {
                        ...await getAuthHeader(),
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data
        } catch (error) {
            // console.error('Error create bill:', error);
            if (axios.isAxiosError(error)) {
                // console.error('Axios error:', error.response?.data);
            }
            throw error
        }
    },

    deleteSession: async (billId: string): Promise<void> => {
        const url = `${BASE_URL}/${END_POINTS.BILL.URL}/${billId}`
        try {
            const response = await axios.delete(
                url,
                {
                    headers: {
                        ...await getAuthHeader(),
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response.data)
        } catch (error) {
            // console.error('Error create bill:', error);
            if (axios.isAxiosError(error)) {
                // console.error('Axios error:', error.response?.data);
            }
            throw error
        }
    },

    addConcessionToBill: async (billId: string, data: TAddCessionToBill): Promise<string> => {
        const url = `${BASE_URL}/${END_POINTS.BILL.URL}/${billId}/${END_POINTS.BILL.CHILD.ADD_CONCESSIONS}`
        try {
            const response = await axios.post(
                url,
                data,
                {
                    headers: {
                        ...await getAuthHeader(),
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data
        } catch (error) {
            console.error('Error create bill:', error);
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data);
            }
            throw error
        }
    }
}

export default billService