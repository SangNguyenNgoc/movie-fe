import React from 'react';
import {TCinema} from "../../app/types/movie/MovieDetail.types";
import CinemasAndShowsItem from "../CinemasAndShowsItem";

interface CinemasAndShowsListProps {
    date: string,
    data: TCinema[]
}

const CinemasAndShowsList = ({date, data}: CinemasAndShowsListProps) => {

    const showRender = data
        .flatMap(item => item.shows)
        .filter(show => show.startDate === date)

    if (!showRender || showRender.length <= 0) {
        return (
            <div className="text-placeholder pt-10">Chưa có suất chiếu vào thời gian này !!!</div>
        )
    }

    return (
        <div className="">
            {data.map(item => <CinemasAndShowsItem key={item.slug} date={date} cinema={item} />)}
        </div>
    );
};

export default CinemasAndShowsList;