import React, {useState} from 'react';
import {TShowDetail} from "../../app/types/show/ShowDetail.types";
import dateService from "../../app/services/date.service";
import appUtils from "../../app/services/utils.service";
import {Button} from "../ui/Button";
import Loading from "../Loading";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader
} from "../ui/AlertDialog";
import {useBooking} from "../../contexts/booking-context/booking-context";
import CountDownTimer from "../CountDownTimer";
import {ISelectedSeat} from "../../contexts/booking-context/type";

interface BillConfirmProp {
    data: TShowDetail
}

const BillConfirm = ({data}: BillConfirmProp) => {

    const [isLoading, setIsLoading] = useState<'onSubmit' | 'normal' | 'failure'>('normal');
    const {bookingState,
        handleResetSeat,
        handleSubmit,
        step,
        preStep
    } = useBooking()

    const selectedSeats = bookingState.selectedSeats
    const selectedConcessions = bookingState.selectedConcessions
    const expireTime = bookingState.expireTime

    const totalValue = () => {
        const sumOfSeats = selectedSeats.reduce((sum, item) => sum + item.type.price, 0);
        const sumOfConcession = selectedConcessions.reduce((total, item) => {
            return total + item.price * item.amount;
        }, 0);
        return sumOfSeats + sumOfConcession
    }

    const seatData: Map<number, ISelectedSeat[]> = new Map<number, ISelectedSeat[]>()

    for (const item of selectedSeats) {
        const key = item.type.id
        if (!seatData.has(key)) {
            seatData.set(key, []);
        }
        seatData.get(key)!.push(item);
    }

    const submit = async () => {
        setIsLoading('onSubmit')
        try {
            await handleSubmit()
            setIsLoading('normal')
        } catch (e) {
            console.log("Submit failure")
            setIsLoading('failure')
        }
    }


    return (
        <>
            {expireTime &&
                <div className="flex justify-center items-end space-x-2 mb-2">
                    <p className="text-sm font-comfortaa text-label">Thời gian giữ ghế: </p>
                    <div className="text-primary text-sm font-comfortaa">
                        <CountDownTimer targetDate={new Date(expireTime)} handleTimeUp={() => (console.log("up"))} />
                    </div>
                </div>
            }
            <div className="bg-primary800 h-3 w-full rounded-t-md"></div>
            <div className="bg-hallPrimary w-full rounded-b-md p-3 pb-4 shadow-md">
                <div className="flex justify-start items-start w-full gap-x-3 py-3">
                    <div className="">
                        <div
                            style={{
                                backgroundImage: `url(${data.movie.poster})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '200px',
                                width: '120px',
                            }}
                            className="rounded-md"
                        >
                        </div>
                    </div>
                    <div className="flex-col space-y-3">
                        <p className="font-inter capitalize text-label text-md font-medium drop-shadow-lg">{data.movie.subName}</p>
                        <div className="flex justify-items-start space-x-2 items-center">
                            <p className="font-inter text-placeholder text-sm drop-shadow-lg">{data.format.version} {data.format.caption} - </p>
                            <div className="bg-primary500 bg-opacity-70 w-fit px-1.5 py-0.5 rounded">
                                <p className="font-inter text-label text-xs">T{data.movie.ageRestriction}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full text-label font-inter space-y-2 py-3">
                    <p className="font-inter capitalize text-label text-sm drop-shadow-lg">
                        {data.hall.cinema.name} - {data.hall.name.split("-")[0]}
                    </p>
                    <p className="font-inter capitalize text-label text-sm drop-shadow-lg">
                        Suất: {dateService.cutFromLastColon(data.startTime)} - {dateService.formatDateIncludeYear(data.startDate)}
                    </p>
                </div>
                <div className="w-full h-1 border-b-2 border-dashed border-placeholder mb-4"></div>
                {
                    selectedSeats.length !== 0 &&
                    <>
                        <div className="w-full text-label font-inter space-y-2 pb-3">
                            {Array.from(seatData.entries()).map(([type, seats]) => {
                                return (
                                    <div key={type}>
                                        <div className="flex justify-between items-center w-full">
                                            <p className="font-inter text-label text-sm drop-shadow-lg">
                                                {seats.length + 'x'} {type === 1 ? 'Ghế thường' : "Ghế VIP"}
                                            </p>
                                            <p className="font-inter capitalize text-label text-sm drop-shadow-lg">
                                                {appUtils.formatVND(seats.reduce((sum, item) => sum + item.type.price, 0))}
                                            </p>
                                        </div>
                                        <p className="font-inter capitalize text-label text-sm drop-shadow-lg">
                                            Ghế: {seats.map(seat => seat.name).join(", ")}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="w-full h-1 border-b-2 border-dashed border-placeholder mb-4"></div>
                    </>
                }
                {
                    selectedConcessions.length !== 0 &&
                    <>
                        <div className="w-full text-label font-inter space-y-2 pb-3">
                            {selectedConcessions.map(item => {
                                return (
                                    <div key={item.id}>
                                        <div className="flex justify-between items-center w-full">
                                            <p className="font-inter text-label text-sm drop-shadow-lg">
                                                {item.amount + 'x'} {item.name}
                                            </p>
                                            <p className="font-inter capitalize text-label text-sm drop-shadow-lg">
                                                {appUtils.formatVND(item.price * item.amount)}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="w-full h-1 border-b-2 border-dashed border-placeholder mb-4"></div>
                    </>
                }
                <div className="w-full text-label font-inter text-md flex justify-between items-center">
                    <p className=" drop-shadow-lg font-bold">
                        Tổng cộng
                    </p>
                    <p className="drop-shadow-lg text-primary">
                        {appUtils.formatVND(totalValue())}
                    </p>
                </div>
                <div className="flex justify-between items-center text-label text-md mt-8 gap-x-4">
                    <Button
                        className="w-1/2 border-placeholder border-2 hover:bg-placeholder"
                        size={"sm"}
                        onClick={preStep}
                    >
                        Quay lại
                    </Button>
                    <Button
                        className="w-1/2 bg-primary bg-opacity-80 hover:bg-opacity-60"
                        onClick={submit}
                        size={"sm"}
                    >
                        {step === 3 ? "Thanh toán" : "Tiếp theo"}
                    </Button>
                </div>
            </div>
            {isLoading === "onSubmit" && <Loading/>}
            <AlertDialog open={isLoading === "failure"}>
                <AlertDialogContent className="bg-primary1000 text-label border-label">
                    <AlertDialogHeader>
                        <AlertDialogDescription>
                            Oops, đã có người nhanh tay hơn bạn rồi, hãy chọn ghế khác nhé !
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction
                            onClick={() => {
                                handleResetSeat()
                                setIsLoading('normal')
                            }}
                            className="bg-primary500"
                        >
                            Đồng ý
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default BillConfirm;