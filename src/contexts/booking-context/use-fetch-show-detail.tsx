import { useQuery } from '@tanstack/react-query';
import showService from "../../app/services/show.service";

export const useFetchShowDetail = (showId: string | undefined) => {
    return useQuery({
        queryKey: ['showDetail', showId],
        queryFn: () => showService.fetchShowDetail(showId!),
        enabled: !!showId, // Chỉ gọi khi showId có giá trị
        staleTime: 0
    });
};
