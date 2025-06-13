import React from 'react';
import {TMovieData} from "../../app/types/cinema/CinemasMoviesShows.types";
import {ClockIcon} from "@heroicons/react/16/solid";
import dateService from "../../app/services/date.service";
import showService from "../../app/services/show.service";
import ShowItem from "../ShowItem";

interface MoviesAndShowsItemProps {
    date: string,
    movie: TMovieData
}

const MoviesAndShowsItem = ({date, movie}: MoviesAndShowsItemProps) => {

    const showsRender = showService.classifyShowsByUniqueValues(movie.shows.filter(show => date === show.startDate));

    if (showsRender.size <= 0) {
        return (
            <></>
        )
    }

    return (
        <div>
            <div key={movie.slug} className="flex justify-items-start space-x-5">
                <div
                    style={{
                        backgroundImage: `url(${movie.poster})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '350px',
                        width: '210px',
                    }}
                    className="flex-shrink-0 rounded-xl relative"
                ></div>
                <div className="space-y-1 w-full pe-8">
                    <p className="text-label caption text-lg font-comfortaa">{movie.subName}</p>
                    {/*<p className="text-placeholder text-sm font-comfortaa">{movie.subName}</p>*/}
                    <div className="flex justify-items-start space-x-2 items-center pb-3">
                        <ClockIcon className="w-4 h-4 text-textPrimary"/>
                        <p className="text-textPrimary text-[14px] ">{
                            dateService.convertMinutesToHours(movie.runningTime)}
                        </p>
                    </div>
                    <div className="flex flex-col w-full space-y-3">
                        {Array.from(showsRender.entries()).map(([format, shows]) => (
                            <div key={format} className="mt-1 space-y-1">
                                <p className="text-label font-comfortaa text-xs">{format}</p>
                                <div className="grid grid-cols-6 gap-y-3">
                                    {shows.map(show => {
                                        return (
                                            <ShowItem
                                                key={show.id}
                                                url={`/show/${show.id}`}
                                                time={show.startTime}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-[95%] bg-placeholder h-[1px] mt-4"></div>
        </div>
    );
};

export default MoviesAndShowsItem;