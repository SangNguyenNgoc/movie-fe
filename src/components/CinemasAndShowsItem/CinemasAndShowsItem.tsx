import React from 'react';
import {TCinema} from "../../app/types/movie/MovieDetail.types";
import showService from "../../app/services/show.service";
import ShowItem from "../ShowItem";

interface CinemasAndShowsItemProps {
    date: string,
    cinema: TCinema
}

const CinemasAndShowsItem = ({date, cinema}: CinemasAndShowsItemProps) => {

    const showsRender = showService.classifyShowsByUniqueValues(
        cinema.shows.filter(show => date === show.startDate)
    );

    return (
        <>
            {showsRender.size !== 0 &&
                <div className="border-b-2 border-placeholder pb-14 pt-10 w-full">
                    <div key={cinema.slug} className="flex justify-items-start space-x-5">
                        <div className="mt-2 space-y-4 w-full pe-8">
                            <p className="text-label caption text-sm font-comfortaa font-semibold">{cinema.name}</p>
                            <div className="flex flex-col w-full space-y-3">
                                {Array.from(showsRender.entries()).map(([format, shows]) => (
                                    <div key={format}
                                         className="mt-1 flex justify-items-start items-start space-x-16">
                                        <div className="h-[35px] w-28 flex justify-items-start items-center">
                                            <p className="text-label font-comfortaa text-xs">{format}</p>
                                        </div>
                                        <div className="grid grid-cols-6 gap-y-3 gap-x-3">
                                            {shows.map(show => {
                                                return (
                                                    <ShowItem
                                                        key={show.id}
                                                        url={`/booking/${show.id}`}
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
                </div>
            }
        </>
    );
};

export default CinemasAndShowsItem;