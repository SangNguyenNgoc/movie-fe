import React, {useEffect, useState} from 'react';
import {Link, useParams, useSearchParams} from "react-router-dom";
import movieService from "../../app/services/movie.service";
import {useQuery} from "@tanstack/react-query";
import Loading from "../../components/Loading";
import {CalendarIcon, ClockIcon, ForwardIcon, PlayCircleIcon, StarIcon, TicketIcon,} from "@heroicons/react/16/solid";
import YouTube from "react-youtube";
import dateService from "../../app/services/date.service";
import MySelect from "../../components/MySelect";
import appUtils from "../../app/services/utils.service";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/redux/store";
import {createCinemaNames, selectCinemasAndAll} from "../../app/redux/cinema/cinemaSlice";
import cinemaService from "../../app/services/cinema.service";
import CinemaAndShowsList from "../../components/CinemaAndShowsList";
import {createMovies, selectMoviesByStatus} from "../../app/redux/movie/movieSlice";
import MovieItem from "../../components/MovieItem";

const MovieDetail = () => {

    const {movieSlug} = useParams<string>();

    const dates = dateService.getRemainingDaysOfWeek();
    const cinemas = useSelector((state: RootState) => selectCinemasAndAll(state))

    const [filterParam, setFilterParam] = useSearchParams();
    const date = filterParam.get("d") || dateService.getToday();
    const cinemaSlug = filterParam.get("c") || "all";

    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();
    const showingNowMovies = useSelector((state: RootState) => selectMoviesByStatus(state, 'showing-now'))

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (cinemas.length === 0) {
                    const cinemaNames = await cinemaService.fetchAllCinemas();
                    dispatch(createCinemaNames(cinemaNames.data));
                }
                if (showingNowMovies === undefined) {
                    const movies = await movieService.fetchMovieToLandingPage();
                    dispatch(createMovies(movies.data));
                }
            } catch (error) {
                console.error("Error fetching cinemas:", error);
            }
        };
        fetchData();
    }, [cinemas, showingNowMovies, dispatch]);

    const {data: movieDetail, isLoading} = useQuery({
        queryKey: ['movieDetail', movieSlug],
        queryFn: () => movieService.fetchMovieDetailBySlug(movieSlug || ''),
        enabled: !!movieSlug
    })

    const handleModal = () => {
        setIsModalOpen(prevState => !prevState);
    };

    const handleChangeCinema = (input: string) => {
        if (input && input !== filterParam.get("c")) {
            setFilterParam({c: input, d: date});
        }
    }

    const handleChangeDate = (input: string) => {
        if (input && input !== filterParam.get("d")) {
            setFilterParam({c: cinemaSlug, d: input});
        }
    }

    if (isLoading || showingNowMovies === undefined) return <Loading/>

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <div className="mt-10 pt-10 px-[90px] pb-14">
            {movieDetail &&
                <div className="flex justify-items-start">
                    <div className=" w-3/4">
                        <div
                            style={{
                                backgroundImage: `url(${movieDetail.horizontalPoster})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'left',
                                backgroundRepeat: 'no-repeat',
                                height: '525px',
                                width: '95%',
                            }}
                            className="flex-shrink-0 rounded-xl relative w-full"
                        >
                            <div
                                className="absolute flex justify-center items-center rounded-xl h-full w-full bg-gradient-to-t from-black to-transparent">
                                <PlayCircleIcon
                                    className="text-label opacity-40 h-20 w-20 cursor-pointer hover:opacity-100 transition-opacity duration-500 ease-in-out"
                                    onClick={handleModal}
                                />
                            </div>
                        </div>
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
                                <div className="flex justify-items-start space-x-4 items-center">
                                    <h1 className="text-3xl uppercase max-w-[80%] text-label mb-1">{movieDetail.subName}</h1>
                                    <div className="bg-primary500 bg-opacity-70 w-fit px-1.5 py-0.5 rounded">
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
                                <div className="flex justify-items-start mt-3">
                                    <div className="flex justify-items-start items-center space-x-1 pe-2">
                                        <StarIcon className="w-8 h-8 text-yellow-300 text-opacity-60"/>
                                        <p className="font-bold text-label text-2xl">{Math.floor(movieDetail.sumOfRatings / movieDetail.numberOfRatings).toString()}</p>
                                    </div>
                                    <div className="flex justify-items-start items-end">
                                        <p className="text-placeholder">( {movieDetail.numberOfRatings} Votes )</p>
                                    </div>
                                </div>
                                <div className="space-y-4 text-label mt-3 text-md">
                                    <div className="flex">
                                        <span className="font-semibold w-1/6">Ngôn ngữ:</span>
                                        <span className="ml-2">{movieDetail.language}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="font-semibold w-1/5">Nhà sản xuất:</span>
                                        <span className="ml-2">{movieDetail.producer}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="font-semibold whitespace-nowrap w-20 min-w-20">Thể loại:</span>
                                        <div className="ml-2 flex flex-wrap gap-2">
                                            {movieDetail.genres.map(gen =>
                                                <span
                                                    key={gen.id}
                                                    className="inline-block border-2 border-placeholder bg-transparent text-label px-2 py-0.5 rounded-md">
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
                                        <span
                                            className="font-semibold whitespace-nowrap w-20 min-w-20">Diễn viên:</span>
                                        <div className="ml-2 flex flex-wrap gap-2">
                                            {movieDetail.performers.split(", ").map(item =>
                                                <span
                                                    key={item}
                                                    className="inline-block border-2 border-placeholder bg-transparent text-label px-2 py-0.5 rounded-md">
                                                    {item}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 ms-5">
                            <div className="font-comfortaa text-[18px] text-label border-l-4 border-textPrimary ps-2">
                                Nội dung phim
                            </div>
                            <div className="text-label me-16 mt-5">
                                <p className="text-base leading-relaxed text-label opacity-60 mb-6">
                                    {movieDetail.description}
                                </p>
                            </div>
                        </div>
                        <div className="mt-10 ms-5">
                            <div className="font-comfortaa text-[18px] text-label border-l-4 border-textPrimary ps-2">
                                Lịch chiếu
                            </div>
                            <div className="flex flex-col w-full mt-5">
                                <div className="flex justify-items-start space-x-6">
                                    <div className="w-1/3">
                                        <MySelect
                                            defaultValue={date}
                                            options={dates}
                                            onChange={handleChangeDate}/>
                                    </div>
                                    <div className="w-1/3">
                                        {cinemas.length > 0 && <MySelect
                                            defaultValue={cinemaSlug}
                                            options={appUtils.mapDataToOptions(cinemas)}
                                            onChange={handleChangeCinema}/>}
                                    </div>
                                </div>
                                <CinemaAndShowsList
                                    date={date}
                                    data={cinemaSlug === 'all'
                                        ? movieDetail.cinemas
                                        : movieDetail.cinemas.filter(item => cinemaSlug === item.slug)}/>
                            </div>
                        </div>
                    </div>
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
                             onClick={handleModal}>
                            <div className="relative w-5/6 h-3/4 bg-black flex justify-center items-center">
                                <YouTube opts={opts} videoId={movieDetail.trailer.split('?v=')[1]}
                                         className="w-full h-full"/>
                            </div>
                        </div>
                    )}
                    <div className="w-1/4">
                        <div className="font-comfortaa uppercase text-[18px] text-label border-l-4 border-textPrimary ps-2">
                            Phim đang chiếu
                        </div>
                        <div className="space-y-5 mt-5">
                            {showingNowMovies.movies.map(movie => {
                                return (
                                    <MovieItem movie={movie} x={true} />
                                )
                            })}
                            <Link to={`/movie/?s=${showingNowMovies.slug}`}
                                  className="flex justify-end items-center gap-3 w-[310px] text-label font-comfortaa hover:text-textPrimary">
                                <p>Xem tất cả</p>
                                <ForwardIcon className="h-5 w-5"/>
                            </Link>
                        </div>

                    </div>
                </div>
            }
        </div>
    );
}
export default MovieDetail