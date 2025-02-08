import React from 'react';
import {TCinemaData} from "../../app/types/cinema/CinemasMoviesShows.types";
import MoviesAndShowsItem from "../MoviesAndShowsItem";

interface MoviesAndShowsListProps {
    date: string,
    data: TCinemaData
}

const MoviesAndShowsList = ({date, data}: MoviesAndShowsListProps) => {

    const moviesRender = data?.movies
        .flatMap(movie => movie.shows)
        .filter(show => show.startDate === date)

    if (!moviesRender || moviesRender.length <= 0) {
        return (
            <div className="text-placeholder">Chưa có suất chiếu vào thời gian này !!!</div>
        )
    }

    return (
        <div className="space-y-6 pt-3">
            {data.movies.map(movie => {
                return (
                    <div key={movie.slug}>
                        <MoviesAndShowsItem date={date} movie={movie}/>
                    </div>
                )
            })}
        </div>
    );
};

export default MoviesAndShowsList;