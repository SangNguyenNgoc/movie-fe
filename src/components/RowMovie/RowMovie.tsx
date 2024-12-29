import {TStatusMovie} from "../../app/types/movie/RowMovie.types";
import MovieItem from "../MovieItem";
import {ForwardIcon} from "@heroicons/react/16/solid";
import {Link} from "react-router-dom";
import {Carousel, CarouselContent, CarouselItem} from "../ui/Carousel";

interface IRowMovieProps {
    statusMovie: TStatusMovie
}

const RowMovie = ({statusMovie}: IRowMovieProps) => {
    return (
        <div className="bg-primary950 flex flex-col">
            <div className="flex justify-between mt-16 items-center w-full">
                <p className="text-textPrimary text-[25px] font-inter">
                    {statusMovie.description}
                </p>
                <Link to={`/movie/?s=${statusMovie.slug}`}
                      className="flex justify-items-start items-center gap-3 text-label font-comfortaa hover:text-textPrimary">
                    <p>Xem tất cả</p>
                    <ForwardIcon className="h-5 w-5"/>
                </Link>
            </div>
            <div className="w-full mt-6">
                <Carousel
                    className=""
                    opts={{
                        align: "start",
                        loop: true
                    }}
                >
                    <CarouselContent className="">
                        {statusMovie.movies.map(movieItem => {
                            return (
                                <CarouselItem className="basis-1/4">
                                    <MovieItem key={movieItem.slug} movie={movieItem} x={false}/>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
};

export default RowMovie;