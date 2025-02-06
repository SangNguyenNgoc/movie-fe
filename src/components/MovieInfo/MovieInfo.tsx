import React from 'react';
import {CalendarIcon, ClockIcon} from "@heroicons/react/16/solid";
import {TMovieDetail} from "../../app/types/movie/MovieDetail.types";
import Rating from "./Rating";

interface MovieInfoProps {
    movieDetail: TMovieDetail
}

const MovieInfo = ({movieDetail}: MovieInfoProps) => {

    return (
        <>
            <div className="flex justify-items-start -mt-[7%] ms-5">
                <div
                    style={{
                        backgroundImage: `url(${movieDetail.poster})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '440px',
                        width: '275px',
                    }}
                    className="flex-shrink-0 rounded-xl relative"
                ></div>
                <div className="text-white w-full px-8 pt-20">
                    <div className="flex justify-items-start space-x-4 items-start">
                        <h1 className="text-3xl capitalize max-w-[80%] text-label mb-1">{movieDetail.subName}</h1>
                        <div className="bg-primary500 bg-opacity-70 w-fit px-1.5 py-0.5 rounded mt-2">
                            <p className="font-comfortaa font-bold text-label">T{movieDetail.ageRestriction}</p>
                        </div>
                    </div>
                    <div className="flex justify-items-start space-x-2 items-center pt-1 pb-0.5">
                        <ClockIcon className="w-4 h-4 text-textPrimary"/>
                        <p className=" text-[14px] text-label">
                            {movieDetail.runningTime} phút
                        </p>
                        <div className=" text-[16px] text-placeholder mb-1">
                            |
                        </div>
                        <CalendarIcon className="w-4 h-4 text-textPrimary"/>
                        <p className=" text-[14px] text-label">
                            {movieDetail.releaseDate}
                        </p>
                    </div>
                    <Rating movieDetail={movieDetail} />
                    <div className="space-y-4 text-label mt-3 text-md">
                        <div className="flex">
                            <p className="font-semibold">Ngôn ngữ:</p>
                            <p className="ml-2">{movieDetail.language}</p>
                        </div>
                        <div className="flex">
                            <p className="font-semibold">Nhà sản xuất:</p>
                            <p className="ml-2">{movieDetail.producer}</p>
                        </div>
                        <div className="flex">
                            <span className="font-semibold whitespace-nowrap w-20 min-w-20">Thể loại:</span>
                            <div className="ml-2 flex flex-wrap gap-2">
                                {movieDetail.genres.map(gen =>
                                        <span
                                            key={gen.id}
                                            className="inline-block border-2 border-placeholder bg-transparent text-label px-2 py-0.5 rounded-md"
                                        >
                                    {gen.name}
                                </span>
                                )}
                            </div>
                        </div>
                        <div className="flex">
                            <span className="font-semibold whitespace-nowrap w-20 min-w-20">Đạo diễn:</span>
                            <div className="ml-2 flex flex-wrap gap-2">
                            <span
                                className="inline-block border-2 border-placeholder bg-transparent text-label px-2 py-0.5 rounded-md">
                                {movieDetail.director}
                            </span>
                            </div>
                        </div>
                        <div className="flex justify-items-start">
                            <span className="font-semibold whitespace-nowrap w-20 min-w-20">Diễn viên:</span>
                            <div className="ml-2 flex flex-wrap gap-2">
                                {movieDetail.performers.split(", ").map(item =>
                                        <span
                                            key={item}
                                            className="inline-block border-2 border-placeholder bg-transparent text-label px-2 py-0.5 rounded-md"
                                        >
                                    {item}
                                </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10 ms-5">
                <div
                    className="font-comfortaa text-[18px] text-label border-l-4 border-textPrimary ps-2">
                    Nội dung phim
                </div>
                <div className="text-label me-4 mt-5">
                    <p className="text-base leading-relaxed text-label opacity-60 mb-6">
                        {movieDetail.description}
                    </p>
                </div>
            </div>
        </>
    );
};

export default MovieInfo;