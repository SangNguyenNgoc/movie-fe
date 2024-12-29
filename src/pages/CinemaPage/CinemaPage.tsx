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
import useTitle from "../../hooks/use-title";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "../../components/ui/Carousel";


const CinemaPage = () => {

    useTitle('Rạp/Vé')

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

    const getBgDateItem = (value: string) => {
        return date === value ? 'bg-primary700' : ''
    }

    if (cinemas.length <= 0 || cinemaMovieShows === undefined) return <Loading/>

    return (
        <div className="mt-10 min-h-screen pt-14 pb-14 flex justify-center items-start">
            <div className="px-24 w-full flex justify-between max-w-[1440px]">
                <div className="w-4/5 space-y-6">
                    <div className="font-comfortaa text-[24px] text-label border-l-4 border-textPrimary ps-2">
                        Lịch chiếu
                    </div>
                    <div className="flex justify-between items-center border-b-2 border-primary700 pb-4 w-[95%]">
                        <div className="w-2/3 flex justify-start items-start ms-5">
                            <Carousel className="w-[90%]" opts={{
                                align: "center",
                            }}>
                                <CarouselContent className="text-label">
                                    <CarouselItem key={dates[0].value} className="basis-1/5">
                                        <div
                                            className={`p-1 ${getBgDateItem(dates[0].value)} rounded-md text-center cursor-pointer`}
                                            onClick={() => handleChangeDate(dates[0].value)}
                                        >
                                            <p>Hôm nay</p>
                                            <p>{dates[0].label.split('-')[1]}</p>
                                        </div>
                                    </CarouselItem>
                                    {dates.slice(1).map(option => {
                                        return (
                                            <CarouselItem key={option.value} className="lg:basis-1/5">
                                                <div
                                                    className={`p-1 ${getBgDateItem(option.value)} rounded-md text-center cursor-pointer`}
                                                    onClick={() => handleChangeDate(option.value)}
                                                >
                                                    <p>{option.label.split('-')[0]}</p>
                                                    <p>{option.label.split('-')[1]}</p>
                                                </div>
                                            </CarouselItem>
                                        )
                                    })}
                                </CarouselContent>
                                <CarouselPrevious className="text-label border-none -left-8"/>
                                <CarouselNext className="text-label border-none -right-8"/>
                            </Carousel>
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
                </div>
                <div className="w-1/3 space-y-6 ps-4">
                    <div className="font-comfortaa text-[24px] text-label border-l-4 border-textPrimary ps-2">
                        Thông tin chi tiết
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
        </div>
    );
};

export default CinemaPage;