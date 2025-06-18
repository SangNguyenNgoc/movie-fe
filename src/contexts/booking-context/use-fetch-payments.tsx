import {useQuery} from "@tanstack/react-query";
import paymentService from "../../app/services/payment.service";

export const useFetchPayments = () => {
    return useQuery({
        queryKey: ['payments'],
        queryFn: () => paymentService.fetchAll(),
        staleTime: 10 * 60 * 1000 // cache lâu hơn nếu cần
    });
};