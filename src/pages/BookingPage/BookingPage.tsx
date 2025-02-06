import React, {useEffect, useState} from 'react';
import showService from "../../app/services/show.service";
import {TSeatType, TShowDetail} from "../../app/types/show/ShowDetail.types";
import Loading from "../../components/Loading";
import SameDayShows from "../../components/ShowDetail/SameDayShows";
import HallLayout from "../../components/ShowDetail/HallLayout";
import BillConfirm from "../../components/ShowDetail/BillConfirm";
import {useParams} from "react-router-dom";
import {useToast} from "../../hooks/use-toast";
import {ToastAction} from "../../components/ui/toast";

export interface ISelectSeat {
    id: number
    name: string
    type: TSeatType
}

const BookingPage = () => {

    const {showId} = useParams<string>();

    const [data, setData] = useState<TShowDetail | undefined>(undefined)
    const [selectedSeats, setSelectSeats] = useState<ISelectSeat[]>([])

    const {toast} = useToast()

    const handleSelectSeat = (id: number, name: string, type: TSeatType) => {
        const exists = selectedSeats.some(seat => seat.id === id);
        if (selectedSeats.length >= 6 && !exists) {
            console.log('tooast')
            toast({
                title: "Oops!!!",
                description: "Mỗi hóa đơn chỉ được đặt tối đa 6 vé!",
                action: (
                    <ToastAction altText="Goto schedule to undo">Đã hiểu</ToastAction>
                ),
                className: "bg-primary1000 text-label border-label"
            })
            return
        }
        setSelectSeats(prevState => {
            if (exists) {
                return prevState.filter(seat => seat.id !== id);
            } else {
                return [...prevState, {id, name, type}];
            }
        });
    }

    const handleResetSeat = () => {
        if (selectedSeats.length > 0) {
            setSelectSeats([])
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await showService.fetchShowDetail(showId ?? '');
                setData(data)
                if (selectedSeats.length > 0) {
                    setSelectSeats([])
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [showId]);

    if (showId === '' || showId === undefined) {
        return <Loading/>
    }

    return (
        data ?
            <>
                <div className="mt-10 pt-10 pb-14 flex justify-center items-start">
                    <div className="px-24 flex justify-between items-start w-full max-w-[1440px]">
                        <div className="w-[70%] space-y-4">
                            <SameDayShows shows={data.sameShows} currShowId={showId}/>
                            <HallLayout rows={data.hall.rows} selectedSeats={selectedSeats}
                                        handleSelect={handleSelectSeat}/>
                        </div>
                        <div className="ps-4 w-[30%]">
                            <BillConfirm data={data} selectedSeats={selectedSeats} handleReset={handleResetSeat}/>
                        </div>
                    </div>
                </div>
                {showId !== data.id && <Loading/>}
            </>
            :
            <Loading/>
    );
};

export default BookingPage;