import React from 'react';
import {Link} from "react-router-dom";
import dateService from "../../app/services/date.service";

interface ShowItemProps {
    url: string
    time: string
}

const ShowItem = ({url, time}: ShowItemProps) => {
    return (
        <Link
            className="hover:bg-placeholder cursor-pointer text-label border-label border rounded-md flex items-center justify-center w-[75px] h-[30px] text-sm"
            to={url}
        >
            {dateService.cutFromLastColon(time)}
        </Link>
    )
};

export default ShowItem;