import React from 'react';
import MySelect from "../MySelect";
import appUtils from "../../app/services/utils.service";
import CinemaAndShowsList from "../CinemaAndShowsList";
import dateService from "../../app/services/date.service";
import {useSearchParams} from "react-router-dom";
import {TCinemaInfo} from "../../app/types/cinema/CinemaInfo.types";
import {TMovieDetail} from "../../app/types/movie/MovieDetail.types";
import DateOption from "../DateOption";

interface ShowScheduleProps {
    cinemas: TCinemaInfo[]
    movieDetail: TMovieDetail
}

const ShowSchedule = ({cinemas, movieDetail}: ShowScheduleProps) => {

    const dates = dateService.getRemainingDaysOfWeek();

    const [filterParam, setFilterParam] = useSearchParams();
    const cinemaSlug = filterParam.get("c") || "all";
    const date = filterParam.get("d") || dateService.getToday();

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

    return (
        <div className="mt-10 ms-5">
            <div
                className="font-comfortaa text-[18px] text-label border-l-4 border-textPrimary ps-2">
                Lịch chiếu
            </div>
            <div className="flex flex-col w-full mt-5">
                <div className="flex justify-between items-center border-primary700 border-b-2 pb-4">
                    <DateOption date={date} dates={dates} handleChangeDate={handleChangeDate} />
                    <div className="w-1/3">
                        {cinemas.length > 0 &&
                            <MySelect
                                defaultValue={cinemaSlug}
                                options={appUtils.mapDataToOptions(cinemas)}
                                onChange={handleChangeCinema}
                            />
                        }
                    </div>
                </div>
                <CinemaAndShowsList
                    date={date}
                    data={cinemaSlug === 'all'
                        ? movieDetail.cinemas
                        : movieDetail.cinemas.filter(item => cinemaSlug === item.slug)}/>
            </div>
        </div>
    );
};

export default ShowSchedule;