import cinemaService from "../../app/services/cinema.service";
import MySelect from "../../components/MySelect";
import dateService from "../../app/services/date.service";
import {useSearchParams} from "react-router-dom";
import React, {useEffect} from "react";
import appUtils from "../../app/services/utils.service";
import MoviesAndShowsList from "../../components/MoviesAndShowsList";
import {useDispatch, useSelector} from "react-redux";
import {
    createCinemaDetails,
    createCinemaNames,
    selectCinemaAndShowsByFilter,
    selectCinemasNames,
} from "../../app/redux/cinema/cinemaSlice";
import Loading from "../../components/Loading";
import {RootState} from "../../app/redux/store";


const CinemaPage = () => {

    const [filterParam, setFilterParam] = useSearchParams();

    const cinemaSlug = filterParam.get("c") || "Unavailable";

    const dispatch = useDispatch();
    const cinemas = useSelector((state: RootState) => selectCinemasNames(state))
    const cinemaMovieShows = useSelector(state => selectCinemaAndShowsByFilter(state, cinemaSlug));

    const date = filterParam.get("d") || dateService.getToday();
    const dates = dateService.getRemainingDaysOfWeek();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (cinemas.length === 0) {
                    const cinemaNames = await cinemaService.fetchAllCinemas();
                    dispatch(createCinemaNames(cinemaNames.data));
                }
                if (cinemaMovieShows === undefined) {
                    const cinemasDetails = await cinemaService.fetchAllCinemasMoviesShows();
                    dispatch(createCinemaDetails(cinemasDetails.data));
                }
            } catch (error) {
                console.error("Error fetching cinemas:", error);
            }
        };
        fetchData();
    }, [cinemas, cinemaMovieShows, dispatch]);

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

    if (cinemas.length <= 0 || cinemaMovieShows === undefined) return <Loading/>

    return (
        <div className="bg-primary950 mt-10 px-[90px] min-h-screen min-w-full pt-14 pb-14 flex justify-between">
            <div className="w-3/5 space-y-6">
                <div className="uppercase font-comfortaa text-[24px] text-label border-l-4 border-textPrimary ps-2">
                    lịch chiếu
                </div>
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
                {cinemaMovieShows && <MoviesAndShowsList
                    date={date}
                    data={cinemaMovieShows}/>}
                <div className="w-full bg-placeholder h-[1px]"></div>
            </div>
            <div className="w-1/3 space-y-6 ps-4">
                <div className="uppercase font-comfortaa text-[24px] text-label border-l-4 border-textPrimary ps-2">
                    thông tin chi tiết
                </div>
                <div className="text-label space-y-3">
                    <div className="flex justify-start items-start space-x-3">
                        <p className="text-textPrimary text-nowrap">Địa chỉ:</p>
                        <p> {cinemaMovieShows?.address}</p>
                    </div>
                    <div className="flex justify-start items-start space-x-3">
                        <p className="text-textPrimary">Hotline:</p>
                        <p> {cinemaMovieShows?.phoneNumber}</p>
                    </div>
                    <p>{cinemaMovieShows?.description}</p>
                </div>
            </div>
        </div>
    );
};

export default CinemaPage;