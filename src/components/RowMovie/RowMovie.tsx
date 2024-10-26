import {TStatusMovie} from "../../app/types/movie/RowMovie.types";
import MovieItem from "../MovieItem";
import {ForwardIcon} from "@heroicons/react/16/solid";
import {Link} from "react-router-dom";

interface IRowMovieProps {
    statusMovie: TStatusMovie
}

const RowMovie = ({statusMovie} : IRowMovieProps) => {
    return (
        <div className="bg-primary950 flex flex-col px-[90px]">
            <div className="flex justify-between mt-16 items-center w-full">
                <p className="text-textPrimary text-[25px] font-comfortaa">
                    {statusMovie.description}
                </p>
                <Link to={`/movie/?s=${statusMovie.slug}`} className="flex justify-items-start items-center gap-3 text-label font-comfortaa hover:text-textPrimary" >
                    <p>Xem tất cả</p>
                    <ForwardIcon className="h-5 w-5"/>
                </Link>
            </div>
            <div className="flex w-full gap-11 overflow-x-auto no-scrollbar mt-6">
                {statusMovie.movies.map(movieItem => {
                    return (<MovieItem key={movieItem.slug} movie={movieItem} x={false} />)
                })}
            </div>
        </div>
    );
};

export default RowMovie;