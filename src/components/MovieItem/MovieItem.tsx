import {TMovie} from "../../app/types/movie/RowMovie.types";
import {PlayCircleIcon, StarIcon, TicketIcon} from "@heroicons/react/16/solid";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import YouTube from "react-youtube";
import dateService from "../../app/services/date.service";

interface IMovieItemProps {
    movie: TMovie
    x: boolean
}

const MovieItem = ({movie, x}: IMovieItemProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModal = () => {
        setIsModalOpen(prevState => !prevState);
    };

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };
    x ? console.log() : console.log()
    return (
        <>
            {x ?
                <div
                    style={{
                        backgroundImage: `url(${movie.horizontalPoster})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '200px',
                        width: '310px',
                    }}
                    className="flex-shrink-0 rounded-md relative bg-black"
                >
                    <div className="bg-black bg-opacity-75 absolute rounded-md w-full h-full">
                        <div className="relative w-full h-full">
                            <div
                                style={{
                                    backgroundImage: `url(${movie.poster})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '180px',
                                    width: '112px',
                                }}
                                className="top-3 left-4 flex-shrink-0 rounded-md relative bg-black"
                            >
                            </div>
                            <p className="absolute capitalize text-label text-[18px] top-3 font-inter right-1 w-[55%] font-medium drop-shadow-lg">{movie.subName}</p>
                            <Link to={`/movie/${movie.slug}?c=all&d=${dateService.getToday()}`}
                                  className="right-3 bottom-3 gap-1 absolute flex justify-center items-center text-label text-sm font-comfortaa bg-placeholder backdrop-blur-sm rounded-md w-2/6 h-8 hover:bg-primary500">
                                <TicketIcon className="w-4 h-4"/>
                                Đặt vé
                            </Link>
                        </div>
                    </div>
                </div>
                :
                <div className="flex flex-col cursor-pointer">
                    <div
                        style={{
                            backgroundImage: `url(${movie.poster})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '440px',
                            width: '275px',
                        }}
                        className="flex-shrink-0 rounded-xl relative group/movie"
                    >
                        <div
                            className="flex justify-between items-center space-x-1 w-1/5 absolute bottom-14 right-0 bg-black bg-opacity-40 ps-1 pe-2 rounded-s">
                            <StarIcon className="w-5 h-5 text-yellow-300"/>
                            <p className="font-bold text-white">{Math.floor(movie.sumOfRatings / movie.numberOfRatings).toString()}</p>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-primary500 bg-opacity-70 px-1.5 py-0.5 rounded">
                            <p className="font-comfortaa font-bold text-label">T{movie.ageRestriction}</p>
                        </div>
                        <div
                            className="flex flex-col gap-3 justify-center items-center bg-black bg-opacity-60 absolute w-full h-full opacity-0 group-hover/movie:opacity-100 transition-opacity duration-500 ease-in-out">
                            <Link to={`/movie/${movie.slug}?c=all&d=${dateService.getToday()}`}
                                  className="flex justify-center gap-2 items-center text-label font-comfortaa bg-textPrimary border-textPrimary border-2 rounded-lg w-2/5 h-10 hover:bg-primary500 hover:border-primary500">
                                <TicketIcon className="w-5 h-5"/>
                                Đặt vé
                            </Link>
                            <button onClick={handleModal}
                                    className="flex justify-center gap-2 items-center text-white font-comfortaa border-label border-2 rounded-lg w-2/5 h-10 hover:bg-primary500 hover:border-primary500">
                                <PlayCircleIcon className="w-5 h-5"/>
                                Trailer
                            </button>
                        </div>
                    </div>
                    <div className="text-white uppercase mt-3">
                        {movie.subName}
                    </div>
                    <div className="text-placeholder uppercase mt-1">
                        {movie.name}
                    </div>
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
                             onClick={handleModal}>
                            <div className="relative w-5/6 h-3/4 bg-black flex justify-center items-center">
                                <YouTube opts={opts} videoId={movie.trailer.split('?v=')[1]} className="w-full h-full"/>
                            </div>
                        </div>
                    )}
                </div>
            }
        </>

    );
};

export default MovieItem;