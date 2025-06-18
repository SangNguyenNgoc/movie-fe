import React from 'react';
import Loading from "../../components/Loading";
import SameDayShows from "../../components/BookingDetail/SameDayShows";
import HallLayout from "../../components/BookingDetail/HallLayout";
import BillConfirm from "../../components/BookingDetail/BillConfirm";
import useTitle from "../../hooks/use-title";
import {useBooking} from "../../contexts/booking-context/booking-context";
import ConcessionsDisplay from "../../components/BookingDetail/ConcessionsDisplay";
import BookingSteps from "../../components/BookingDetail/BookingSteps";
import PaymentsDisplay from "../../components/BookingDetail/PaymentsDisplay";


const BookingPage = () => {

    const {showId, showData, step} = useBooking()

    let pageTitle = document.title;
    if (!pageTitle.startsWith('Đặt vé phim')) {
        pageTitle = showData ? `Đặt vé phim ${showData.movie.subName}` : "Loading...";
    }
    useTitle(pageTitle);

    if (showId === '' || showId === undefined || !showData) {
        return <Loading/>
    }

    const isLoadingNewShow = showId !== showData.id;

    return (
        <>
            <div className="mt-3 pt-10 pb-14">
                <BookingSteps currStep={step}/>
                <div className="w-full flex justify-center items-start mt-6">
                    <div className="container mx-auto flex justify-between items-start w-full md:px-16 2xl:px-36">
                        <div className="w-[68%] space-y-5">
                            {step === 1 && (
                                <>
                                    <SameDayShows shows={showData.sameShows}/>
                                    <HallLayout rows={showData.hall.rows}/>
                                </>
                            )}
                            {step === 2 && <ConcessionsDisplay/>}
                            {step === 3 && (
                                <div className="w-full rounded-lg shadow-md pe-2 space-y-6">
                                    {/*<DiscountsDisplay/>*/}
                                    <PaymentsDisplay/>
                                </div>
                            )}
                        </div>
                        <div className="ps-4 w-[32%]">
                            <BillConfirm data={showData}/>
                        </div>
                    </div>
                </div>
            </div>
            {isLoadingNewShow && <Loading/>}
        </>
    );
};

export default BookingPage;