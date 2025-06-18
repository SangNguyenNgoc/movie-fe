import React from 'react';
import {useBooking} from "../../contexts/booking-context/booking-context";
import Loading from "../Loading";
import ConcessionItem from "./ConcessionItem";
import {useFetchConcessionByCinema} from "../../contexts/booking-context/use-fetch-concession";
import ProjectDisclaimer from "../ProjectDisclaimer";

const ConcessionsDisplay = () => {

    const {showData} = useBooking()

    const cinemaId = showData?.hall.cinema.id;
    const { data: concessionData } = useFetchConcessionByCinema(cinemaId);

    return (
        concessionData ?
            <>
                <div className="w-full bg-hallPrimary rounded-md shadow-md p-4">
                    <h2 className="text-label text-lg font-semibold mb-6 font-comfortaa">Chọn Combo / Sản phẩm</h2>
                    <div className="space-y-8">
                        {concessionData.map((product) => (
                            <ConcessionItem product={product} key={product.id}/>
                        ))}
                    </div>
                </div>
                <ProjectDisclaimer/>
            </>
            : <Loading/>
    );
};

export default ConcessionsDisplay;