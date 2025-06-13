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
        <div className="bg-primary800 w-full flex justify-between items-start py-3 px-4 rounded-md">
            <p className="text-sm text-label font-comfortaa font-semibold mt-2">Đổi suất chiếu</p>
            <div className="grid grid-cols-8 gap-y-3 w-4/5">
                {shows.map(show => {
                    if (currShowId === show.id) {
                        return (
                            <div
                                key={show.id}
                                className="bg-primary500 hover:border-primary500 cursor-pointer text-label rounded-md flex items-center justify-center w-16 h-9 text-sm"
                            >
                                {dateService.cutFromLastColon(show.startTime)}
                            </div>
                        )
                    }
                    return (
                        <Link
                            key={show.id}
                            className="hover:bg-primary500 hover:border-primary500 cursor-pointer text-label border-label border rounded-md flex items-center justify-center w-16 h-9 text-sm"
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