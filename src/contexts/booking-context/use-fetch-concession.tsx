import { useQuery } from '@tanstack/react-query';
import concessionService from "../../app/services/concession.service";

export const useFetchConcessionByCinema = (cinemaId: string | undefined) => {
    return useQuery({
        queryKey: ['concession', cinemaId],
        queryFn: () => concessionService.fetchConcessionByCinema(cinemaId!),
        enabled: !!cinemaId,
        staleTime: 10 * 60 * 1000 // cache lâu hơn nếu cần
    });
};
