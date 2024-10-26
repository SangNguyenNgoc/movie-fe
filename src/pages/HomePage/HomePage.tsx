import React, {useEffect, useState} from 'react';
import movieService from "../../app/services/movie.service";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/redux/store";
import {createMovies, selectAllMovies} from "../../app/redux/movie/movieSlice";
import Loading from "../../components/Loading";
import RowMovie from "../../components/RowMovie";
import axios from "axios";

interface EmptySeat {
    floorNo: number;
    rowNo: number;
    colNo: number;
}

interface VehicleTypeCreate {
    name: string;
    description: string;
    numberOfSeats: number;
    numberOfRows: number;
    seatsPerRow: number;
    numberOfFloors: number;
    emptySeats: EmptySeat[];
}

const HomePage = () => {

    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const postData = async () => {
        try {
            const dataToSend: VehicleTypeCreate = {
                name: "Example",
                description: "This is a sample",
                numberOfSeats: 20,
                numberOfRows: 5,
                seatsPerRow: 4,
                numberOfFloors: 2,
                emptySeats: [],
            };

            const res = await axios.post<VehicleTypeCreate>('http://167.71.192.132:8084/vehicles', dataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setResponse(res.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data);
            } else {
                setError('Đã xảy ra lỗi không xác định.');
            }
        }
    };

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
        postData()
    }, [statusAndMovies, dispatch]);

    if(statusAndMovies.length === 0) return <Loading />

    return (
        <>
            {/*<MovieSliders />*/}
            <div className="bg-homeImage h-[600px] bg-center bg-repeat mt-10"></div>
            <div className="bg-primary950 pb-16">
                {statusAndMovies.map(statusItem => {
                    return (<RowMovie key={statusItem.slug} statusMovie={statusItem}/>);
                })}
            </div>
        </>
    )
};

export default HomePage;