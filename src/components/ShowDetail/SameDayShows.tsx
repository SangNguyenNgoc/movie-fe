import React from 'react';
import {Link} from "react-router-dom";
import {TShowInfo} from "../../app/types/show/ShowDetail.types";
import dateService from "../../app/services/date.service";

export interface ISameDayShowsProp {
    shows: TShowInfo[]
    currShowId: string
}

const SameDayShows = ({shows, currShowId}: ISameDayShowsProp) => {
    return (
        <div className="bg-primary800 w-full flex justify-between items-center py-3 px-4 rounded-md space-x-8">
            <p className="text-md text-label font-inter">Suất cùng ngày</p>
            <div className="flex w-4/5 space-x-3 overflow-x-auto no-scrollbar">
                {shows.map(show => {
                    if (currShowId === show.id) {
                        return (
                            <div
                                key={show.id}
                                className="flex-shrink-0 bg-primary500 hover:border-primary500 cursor-pointer text-label text-md rounded-md flex items-center justify-center w-20 h-[35px]"
                            >
                                {dateService.cutFromLastColon(show.startTime)}
                            </div>
                        )
                    }
                    return (
                        <Link
                            key={show.id}
                            className="flex-shrink-0 hover:bg-primary500 hover:border-primary500 cursor-pointer text-label border-label border text-md rounded-md flex items-center justify-center w-20 h-[35px]"
                            to={`/show/${show.id}`}
                        >
                            {dateService.cutFromLastColon(show.startTime)}
                        </Link>
                    )
                })}

            </div>
        </div>
    );
};

export default SameDayShows;