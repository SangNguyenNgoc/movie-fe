import {useQuery} from "@tanstack/react-query";
import movieService from "../../app/services/movie.service";
import Loading from "../../components/Loading";
import ListMovie from "../../components/ListMovie";
import React, {useState} from "react";
import {useSearchParams} from "react-router-dom";
import Pagination from "../../components/Pagination";

const MoviePage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("s") || 'showing-now';
    const [page, setPage] = useState<number>(1)

    const handleSubmit = (key: string) => {
        if (key !== query) {
            setSearchParams({s: key});
        }
    };

    const {data, isLoading, error} = useQuery({
        queryKey: [query, page],
        queryFn: () => movieService.fetchMovieByStatus(query, page),
    });

    const getStateButton = (status: string) => {
        return `flex flex-col items-center gap-y-1 ${
            status === query ? 'text-textPrimary' : 'text-label'
        }`;
    };

    const getUnderlineButton = (status: string) => {
        return `h-1 rounded w-1/3 ${
            status === query ? 'bg-textPrimary' : 'bg-transparent'
        }`;
    };

    const onPageChange = (currPage: number) => setPage(currPage);

    if (error) return <div>Error: {(error as Error).message}</div>;

    return (
        <div className="bg-primary950 mt-10 px-[90px] pt-14">
            <div className="flex justify-items-start items-start gap-x-10">
                <div className="uppercase font-comfortaa text-[24px] text-label border-l-4 border-textPrimary ps-2">
                    PHIM
                </div>
                <nav
                    className="flex items-center justify-items-start gap-x-8 font-comfortaa text-[18px]">
                    <button
                        className={getStateButton('showing-now')}
                        onClick={() => handleSubmit('showing-now')}
                    >
                        <p>Đang chiếu</p>
                        <div className={getUnderlineButton('showing-now')}></div>
                    </button>
                    <button
                        className={getStateButton('coming-soon')}
                        onClick={() => handleSubmit('coming-soon')}
                    >
                        <p>Sắp chiếu</p>
                        <div className={getUnderlineButton('coming-soon')}></div>
                    </button>
                </nav>
            </div>

            <div className="mt-10 mb-5">
                {isLoading && <Loading/>}
                {data && <ListMovie movies={data.data}/>}
            </div>
            {data &&
                <Pagination
                    totalPage={data.totalPages}
                    onPageChange={onPageChange}
                    currPage={page} size={5}
                />
            }
        </div>
    );
};

export default MoviePage;