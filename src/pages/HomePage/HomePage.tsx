import React, {useEffect} from 'react';
import movieService from "../../app/services/movie.service";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/redux/store";
import {createMovies, selectAllMovies} from "../../app/redux/movie/movieSlice";
import Loading from "../../components/Loading";
import RowMovie from "../../components/RowMovie";
import useTitle from "../../hooks/use-title";


const HomePage = () => {

    useTitle('Trang chủ ')

    const dispatch = useDispatch();

    const statusAndMovies = useSelector((state: RootState) => selectAllMovies(state))

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (statusAndMovies.length === 0) {
                    const movies = await movieService.fetchMovieToLandingPage();
                    dispatch(createMovies(movies.data));
                }
            } catch (error) {
                console.error("Error fetching cinemas:", error);
            }
        };
        fetchData();
    }, [statusAndMovies, dispatch]);

    return (
        <>
            {/*<MovieSliders />*/}
            <div className="bg-homeImage h-[600px] bg-center bg-repeat mt-10"></div>
            {statusAndMovies.length === 0 ? <Loading/> :
                <div className="bg-primary950 pb-16 flex justify-center items-start">
                    <div className="px-36 max-w-[1440px] w-full">
                        {statusAndMovies.map(statusItem => {
                            return (<RowMovie key={statusItem.slug} statusMovie={statusItem}/>);
                        })}
                    </div>
                </div>
            }
        </>
    )
};

export default HomePage;