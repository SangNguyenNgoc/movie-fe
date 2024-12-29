import React from 'react';
import {TMovie} from "../../app/types/movie/RowMovie.types";
import MovieItem from "../MovieItem";

interface ListMovieProps {
    movies: TMovie[]
}

const ListMovie = ({movies}: ListMovieProps) => {
    return (
        <div className="bg-primary950 flex flex-col">
            <div className="grid grid-cols-4 w-full gap-8">
                {movies.map(movie => {
                    return <MovieItem key={movie.slug} movie={movie} x={false}/>
                })}
            </div>
        </div>

    );
};

export default ListMovie;