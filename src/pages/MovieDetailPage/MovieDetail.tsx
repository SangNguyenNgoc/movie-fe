import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import movieService from "../../app/services/movie.service";
import {useQuery} from "@tanstack/react-query";
import Loading from "../../components/Loading";
import {ForwardIcon, PlayCircleIcon} from "@heroicons/react/16/solid";
import YouTube from "react-youtube";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/redux/store";
import {createCinemaNames, selectCinemasAndAll} from "../../app/redux/cinema/cinemaSlice";
import cinemaService from "../../app/services/cinema.service";
import {createMovies, selectMoviesByStatus} from "../../app/redux/movie/movieSlice";
import MovieItem from "../../components/MovieItem";
import useTitle from "../../hooks/use-title";
import MovieInfo from "../../components/MovieInfo";
import ListImage from "../../components/ListImage";
import ShowSchedule from "../../components/ShowSchedule";


const MovieDetail = () => {

    const {movieSlug} = useParams<string>();

    const cinemas = useSelector((state: RootState) => selectCinemasAndAll(state))

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

    const pageTitle = movieDetail ? `Đặt vé phim ${movieDetail.subName}` : "Loading...";
    useTitle(pageTitle);

    const handleModal = () => {
        setIsModalOpen(prevState => !prevState);
    };

    if (isLoading || showingNowMovies === undefined) return <Loading/>

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <div className="pb-14 mt-10 pt-10 flex justify-center items-start">
            <div className="px-36 w-full max-w-[1440px]">
                {movieDetail &&
                    <div className="flex justify-evenly space-x-8">
                        <div className="w-5/6">
                            <div
                                style={{
                                    backgroundImage: `url(${movieDetail.horizontalPoster})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'left',
                                    backgroundRepeat: 'no-repeat',
                                }}
                                className="aspect-[16/9] w-full rounded-md flex-shrink-0 relative"
                            >
                                <div
                                    className="absolute flex justify-center items-center rounded-md h-full w-full bg-gradient-to-t from-black to-transparent">
                                    <PlayCircleIcon
                                        className="text-label opacity-40 h-20 w-20 cursor-pointer hover:opacity-100 transition-opacity duration-500 ease-in-out"
                                        onClick={handleModal}
                                    />
                                </div>
                            </div>
                            <MovieInfo movieDetail={movieDetail}/>
                            {movieDetail.images.length > 0 &&
                                <ListImage images={movieDetail.images}/>
                            }
                            <ShowSchedule cinemas={cinemas} movieDetail={movieDetail} />
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
                        <div className="">
                            <div
                                className="font-comfortaa text-[18px] text-label border-l-4 border-textPrimary ps-2">
                                Phim đang chiếu
                            </div>
                            <div className="space-y-5 mt-5">
                                {showingNowMovies.movies.map(movie => {
                                    return (
                                        <MovieItem movie={movie} x={true} key={movie.id}/>
                                    )
                                })}
                            </div>
                            <div className="flex justify-end items-center">
                                <Link to={`/movie/?s=${showingNowMovies.slug}`}
                                      className="flex justify-end items-center gap-3 text-label font-comfortaa hover:text-textPrimary text-sm mt-3 w-fit">
                                    <p>Xem thêm</p>
                                    <ForwardIcon className="h-4 w-4"/>
                                </Link>
                            </div>

                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
export default MovieDetail