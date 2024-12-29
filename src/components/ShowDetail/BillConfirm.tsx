import React, {useState} from 'react';
import {TBillCreate, TShowDetail} from "../../app/types/show/ShowDetail.types";
import dateService from "../../app/services/date.service";
import appUtils from "../../app/services/utils.service";
import {Button} from "../ui/Button";
import {ISelectSeat} from "../../pages/BookingPage/BookingPage";
import billService from "../../app/services/bill.service";
import Loading from "../Loading";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader
} from "../ui/AlertDialog";

interface BillConfirmProp {
    data: TShowDetail
    selectedSeats: ISelectSeat[]
    handleReset: () => void
}

const BillConfirm = ({data, selectedSeats, handleReset}: BillConfirmProp) => {

    const [isLoading, setIsLoading] = useState<'onSubmit' | 'beforeSubmit' | 'failure'>('beforeSubmit');

    const totalValue = selectedSeats.reduce((sum, item) => sum + item.type.price, 0);

    const seatData: Map<number, ISelectSeat[]> = new Map<number, ISelectSeat[]>()

    for (const item of selectedSeats) {
        const key = item.type.id
        if (!seatData.has(key)) {
            seatData.set(key, []);
        }
        seatData.get(key)!.push(item);
    }


    const handlePayment = async () => {
        if (selectedSeats.length !== 0) {
            setIsLoading('onSubmit'); // Bật trạng thái loading
            try {
                const bill: TBillCreate = {
                    showId: data.id,
                    seatIds: selectedSeats.map((item) => item.id),
                };
                window.location.href = await billService.submitBill(bill);
            } catch (error) {
                console.error("Payment failed:", error);
                setIsLoading('failure')
            }
        }
    }

    return (
        <>
            <div className="bg-primary800 h-3 w-full rounded-t-md"></div>
            <div className="bg-hallPrimary w-full rounded-b-md p-3 pb-4">
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
                                    <>
                                        <div key={type} className="flex justify-between items-center w-full">
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
                                    </>
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
                        {appUtils.formatVND(totalValue)}
                    </p>
                </div>
                <div className="flex justify-between items-center text-label text-md mt-8 gap-x-4">
                    <Button className="w-1/2 border-placeholder border-2 hover:bg-placeholder" onClick={() => {
                        window.location.href = `/movie/${data.movie.slug}?c=${data.hall.cinema.slug}&d=${data.startDate}`
                    }}>
                        Quay lại
                    </Button>
                    <Button className="w-1/2 bg-primary hover:bg-opacity-80" onClick={handlePayment}>Thanh toán</Button>
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
                                handleReset()
                                setIsLoading('beforeSubmit')
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