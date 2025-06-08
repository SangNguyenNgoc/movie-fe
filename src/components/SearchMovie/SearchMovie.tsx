import React, {useCallback, useState} from 'react';
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import appUtils from "../../app/services/utils.service";
import {TMovie} from "../../app/types/movie/RowMovie.types";
import movieService from "../../app/services/movie.service";
import {StarIcon, TicketIcon} from "@heroicons/react/16/solid";
import {useNavigate} from "react-router-dom";
import {Button} from "../ui/Button";
import dateService from "../../app/services/date.service";


const SearchMovie = () => {

    const [val, setVal] = useState('')
    const [movies, setMovies] = useState<TMovie[]>([])

    const navigate = useNavigate()

    const handleSearch = async (input: string) => {
        if (input.length >= 2) {
            const data = await movieService.searchMoviesBySlug(input)
            setMovies(data)
        } else {
            setMovies([])
        }
    }

    const debounceHandleSearch = useCallback(
        appUtils.debounce((value: string) => handleSearch(value), 500), []
    );

    const handleChange = (input: string) => {
        setVal(input)
        debounceHandleSearch(input)
    }

    const handleClear = () => {
        setMovies([])
        setVal('')
    }

    const handleSelectMovie = (slug: string) => {
        handleClear()
        navigate(`/movie/${slug}?c=all&d=${dateService.getToday()}`)
    }

    return (
        <div className="w-2/5 relative">
            <label
                htmlFor="search-input"
                className="flex border border-transparent rounded-md px-4 py-1 gap-4 items-center bg-searchText"
            >
                <input
                    value={val}
                    onChange={(e) => handleChange(e.target.value)}
                    id="search-input"
                    name="search-input"
                    type="text"
                    placeholder="Tìm kiếm phim..."
                    className="border-none w-full bg-transparent focus:outline-none font-comfortaa text-label placeholder-placeholder text-sm py-1"
                />
                <div>
                    <MagnifyingGlassIcon className="h-5 w-5 cursor-pointer text-placeholder"/>
                </div>
            </label>
            {movies.length !== 0 &&
                <div
                    className="absolute bg-searchText w-full rounded-md mt-3 py-4 px-6 max-h-[560px] overflow-y-auto no-scrollbar">
                    <div className="fixed h-screen w-screen top-0 left-0 z-10" onClick={handleClear}></div>
                    <div className="relative z-20">
                        <div className="grid grid-cols-3 w-full gap-5">
                            {movies.map(movie => {
                                return (
                                    <div key={movie.id} className="flex flex-col cursor-pointer">
                                        <div
                                            style={{
                                                backgroundImage: `url(${movie.poster})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                height: '220px',
                                                width: '135px',
                                            }}
                                            className="flex-shrink-0 rounded-xl relative group/movie"
                                        >
                                            <div
                                                className="flex justify-between items-center space-x-1 absolute bottom-10 right-0 bg-black bg-opacity-40 ps-1 pe-2 rounded-s">
                                                <StarIcon className="w-4 h-4 text-yellow-300"/>
                                                <p className="font-bold text-white text-xs">{movieService.getRating(movie.sumOfRatings, movie.numberOfRatings).toString()}</p>
                                            </div>
                                            <div
                                                className="absolute bottom-2 right-2 bg-primary500 bg-opacity-70 px-1.5 py-0.5 rounded">
                                                <p className="font-inter font-bold text-label text-xs">T{movie.ageRestriction}</p>
                                            </div>
                                            <div
                                                className="flex flex-col gap-3 justify-center items-center bg-black bg-opacity-60 absolute w-full h-full opacity-0 group-hover/movie:opacity-100 transition-opacity duration-500 ease-in-out">
                                                <Button
                                                    onClick={() => handleSelectMovie(movie.slug)}
                                                    className="gap-1 text-label font-inter bg-textPrimary rounded-lg hover:bg-primary500 text-xs h-8">
                                                    <TicketIcon className="w-5 h-5"/>
                                                    Đặt vé
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="text-label text-sm mt-1">
                                            {movie.name}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default SearchMovie;