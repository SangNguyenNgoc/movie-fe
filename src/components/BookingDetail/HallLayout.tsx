import React from 'react';
import {TRowSeat, TSeat} from "../../app/types/show/ShowDetail.types";
import {useBooking} from "../../contexts/booking-context/booking-context";

interface HallLayoutProp {
    rows: TRowSeat[]
}

const getSeatBorder = (id: number): string => {
    if (id === 2) {
        return 'vipSeat'
    }
    return 'placeholder'
}

const HallLayout = ({rows}: HallLayoutProp) => {

    const {bookingState, handleSelectSeat} = useBooking()

    const selectedSeats = bookingState.selectedSeats

    const renderSeat = (seat: TSeat) => {
        if (seat.isReserved) {
            return (
                <div
                    key={seat.id}
                    className="text-label text-xs bg-slate-700 border border-slate-700 flex justify-center items-center w-6 py-0.5 rounded cursor-default"
                >
                    {seat.name.slice(1)}
                </div>
            );
        }

        if (selectedSeats.some(selected => selected.id === seat.id)) {
            return (
                <div
                    key={seat.id}
                    onClick={() => handleSelectSeat(seat.id, seat.name, seat.type)}
                    className="text-label text-xs bg-primary700 border border-primary700 flex justify-center items-center rounded w-6 py-0.5 cursor-pointer"
                >
                    {seat.name.slice(1)}
                </div>
            );
        }

        return seat.name ? (
            <div
                key={seat.id}
                onClick={() => handleSelectSeat(seat.id, seat.name, seat.type)}
                className={`text-label text-xs border border-${getSeatBorder(
                    seat.type.id
                )} flex justify-center items-center w-6 py-0.5 rounded cursor-pointer hover:bg-placeholder hover:bg-opacity-50`}
            >
                {seat.name.slice(1)}
            </div>
        ) : (
            <div className="w-6" key={seat.id}></div>
        );
    };

    return (
        <div className="w-full rounded-md bg-hallPrimary px-3 py-8 space-y-2 shadow-md">
            {rows.map(row => {
                return (
                    <div className="flex justify-between items-center" key={row.row}>
                        <div className="text-label w-3 text-sm text-center">{row.rowName}</div>
                        <div className="max-w-3/4 flex justify-center items-center space-x-2">
                            {row.seats.map(renderSeat)}
                        </div>
                        <div className="text-label w-3 text-sm text-center">{row.rowName}</div>
                    </div>
                )
            })}
            <div className="w-full pt-10">
                <p className="text-placeholder text-sm w-full text-center font-inter">Màn hình</p>
                <div className="w-full mt-2 bg-primary700 h-1 rounded"></div>
            </div>
            <div className="w-full pt-3 flex justify-between items-center text-label font-inter text-xs">
                <div className="flex justify-start items-center gap-x-5">
                    <div className="flex justify-center items-center gap-x-2">
                        <div className="w-5 h-5 bg-slate-700 rounded"></div>
                        <p>Ghế đã bán</p>
                    </div>
                    <div className="flex justify-center items-center gap-x-2">
                        <div className="w-5 h-5 bg-primary700 rounded"></div>
                        <p>Ghế đang chọn</p>
                    </div>
                </div>
                <div className="flex justify-start items-center gap-x-5">
                    <div className="flex justify-center items-center gap-x-2">
                        <div className="w-5 h-5 border border-vipSeat rounded"></div>
                        <p>Ghế VIP</p>
                    </div>
                    <div className="flex justify-center items-center gap-x-2">
                        <div className="w-5 h-5 border border-placeholder  rounded"></div>
                        <p>Ghế thường</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HallLayout;