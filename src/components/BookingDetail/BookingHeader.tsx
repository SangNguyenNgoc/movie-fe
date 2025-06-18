import React, {useState} from 'react';
import {useBooking} from "../../contexts/booking-context/booking-context";
import Header from "../Header";
import Logo from "../Logo";
import {X} from "lucide-react";
import Loading from "../Loading";

const BookingHeader = () => {

    const {step, handleDestroySession} = useBooking()
    const [isLoading, setIsLoading] = useState(false)

    const destroy = async () => {
        setIsLoading(true)
        await handleDestroySession()
        setIsLoading(false)
    }

    return (
        <>
            {step === 1 ? <Header/> :
                <header
                    className="fixed z-20 box-border bg-primary1000 h-20 w-screen top-0 flex justify-center items-center">
                    <div className="flex justify-between mx-16 items-center h-full w-full max-w-[1440px] md:px-16 2xl:px-20">
                        <Logo/>
                        <button
                            className="flex justify-start items-center space-x-2 text-label font-medium text-xs font-comfortaa me-3"
                            onClick={destroy}
                        >
                            <X size={20}/>
                            <p>Hủy giao dịch</p>
                        </button>
                    </div>
                </header>
            }
            {isLoading && <Loading/>}
        </>
    );
};

export default BookingHeader;