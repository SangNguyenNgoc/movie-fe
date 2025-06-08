import React, {useState} from 'react';
import {TBillDetail} from "../../app/types/bill/BillDetail.types";
import dateService from "../../app/services/date.service";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "../ui/Dialog";
import {QRCodeCanvas} from "qrcode.react";
import appUtils from "../../app/services/utils.service";
import {Button} from "../ui/Button";
import CountDownTimer from "../CountDownTimer";
import {format} from "date-fns";

interface BillItemProps {
    item: TBillDetail
}

const BillItem = ({item}: BillItemProps) => {

    const [isExpired, setIsExpired] = useState(false)

    const handleTimeUp = () => {
        setIsExpired(true)
    }

    return (
        <div
            className="relative bg-primary900 bg-opacity-75 w-full h-fit ps-8 pe-2 flex">
            <div
                className="absolute h-full left-0 top-0 items-center flex justify-center">
                <div className="bg-primary950 rounded-r-full w-3 h-1/4"></div>
            </div>
            <div
                className="absolute h-full right-0 top-0 items-center flex justify-center">
                <div className="bg-primary950 rounded-l-full w-3 h-1/4"></div>
            </div>
            <div
                className="h-[100px] flex justify-between items-center w-full space-x-5">
                <div className="flex justify-start items-center space-x-5 w-1/2">
                    <div
                        style={{
                            backgroundImage: `url(${item.show.movie.poster})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '80px',
                            width: '60px',
                        }}
                        className="top-3 left-2 flex-shrink-0 rounded-md bg-black"
                    >
                    </div>
                    <div>
                        <div className="space-y-2 h-fit">
                            <p className="font-comfortaa capitalize text-label text-sm t font-medium drop-shadow-lg text-left">{item.show.movie.subName}</p>
                            <div
                                className="flex justify-start space-x-4 items-center">
                                <p className="font-inter text-placeholder text-xs">{item.show.format.version} - {item.show.format.caption}</p>
                                <div
                                    className="bg-primary500 bg-opacity-70 px-1.5 py-0.5 rounded w-fit h-fit">
                                    <p className="font-comfortaa font-bold text-xs text-label">T{item.show.movie.ageRestriction}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-2 h-fit pe-5 text-left text-xs">
                    <p className="font-comfortaa capitalize text-label font-medium drop-shadow-lg">
                        {item.show.hall.cinema.name} - {item.show.hall.name.split("-")[0]}
                    </p>
                    <p className="font-comfortaa capitalize text-label font-medium drop-shadow-lg">
                        {dateService.cutFromLastColon(item.show.startTime)} - {dateService.formatDateIncludeYear(item.show.startDate)}
                    </p>
                </div>
                <div
                    className="w-[15%] h-5/6 border-l-4 border-dashed border-primary950 flex justify-center items-center">
                    <Dialog>
                        <DialogTrigger>
                            <div
                                className="text-textPrimary font-comfortaa text-xs font-semibold hover:underline">
                                Chi tiết
                            </div>
                        </DialogTrigger>
                        <DialogContent className="border-none p-0 text-label w-80">
                            <DialogHeader>
                                <div className="bg-primary950 bg-opacity-80 pt-3 pb-3 rounded-lg">
                                    <div className="flex justify-center items-start w-full gap-x-6 px-6">
                                        <div className="">
                                            <div
                                                style={{
                                                    backgroundImage: `url(${item.show.movie.poster})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    height: '180px',
                                                    width: '120px',
                                                }}
                                                className="rounded-md"
                                            >
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-col space-y-3 mt-1 w-full">
                                        <p className="w-full font-inter capitalize text-label text-lg text-center font-medium drop-shadow-lg">{item.show.movie.subName}</p>
                                        <div className="w-full flex justify-center space-x-2 items-center">
                                            <p className="text-center font-inter text-placeholder text-md drop-shadow-lg">{item.show.format.version} {item.show.format.caption} - </p>
                                            <div
                                                className=" bg-primary500 bg-opacity-70 w-fit px-1.5 py-0.5 rounded">
                                                <p className="font-inter text-label text-xs">T{item.show.movie.ageRestriction}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative w-full h-1 flex justify-center items-center px-6 mt-3">
                                        <div className="w-full border border-dashed border-placeholder"></div>
                                    </div>
                                    <div className="space-y-2 h-fit px-6 pe-5 text-left mt-3">
                                        <p className="font-inter capitalize text-label text-sm font-medium drop-shadow-lg">
                                            {item.show.hall.cinema.name} - {item.show.hall.name.split("-")[0]}
                                        </p>
                                        <p className="font-inter capitalize text-label text-sm font-medium drop-shadow-lg">
                                            Suất: {dateService.cutFromLastColon(item.show.startTime)} - {dateService.formatDateIncludeYear(item.show.startDate)}
                                        </p>
                                    </div>
                                    <div className="flex justify-center items-center w-full mt-3">
                                        <div style={{textAlign: 'center'}} className="bg-white p-2">
                                            <QRCodeCanvas
                                                value={item.id}
                                                size={100}
                                                bgColor="rgba(255,255,255,0.7)"
                                                fgColor="#000000"
                                                level="H"
                                            />
                                        </div>
                                    </div>
                                    <div className="relative w-full h-1 flex justify-center items-center px-6 mt-3">
                                        <div className="w-full border border-dashed border-placeholder"></div>
                                    </div>
                                    <div className="flex font-inter justify-start items-center px-6 space-x-2 mt-3">
                                        <p className="text-placeholder text-sm">Ghế</p>
                                        <p className="text-placeholder">-</p>
                                        <p className="text-label">
                                            {item.tickets
                                                .sort((a, b) => a.seat.id - b.seat.id)
                                                .map(ticket => ticket.seat.name)
                                                .join(', ')
                                            }
                                        </p>
                                    </div>
                                    <div className="relative w-full h-6 flex justify-center items-center px-6">
                                        <div className="w-full border border-dashed border-placeholder"></div>
                                        <div
                                            className="absolute h-full left-0 top-0 items-center flex justify-center">
                                            <div className="bg-black rounded-r-full w-3 h-full"></div>
                                        </div>
                                        <div
                                            className="absolute h-full right-0 top-0 items-center flex justify-center">
                                            <div className="bg-black rounded-l-full w-3 h-full"></div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-full font-inter text-md px-6 space-y-2">
                                        <div className="flex justify-between items-center">
                                            <p className="text-placeholder">Ngày đặt</p>
                                            <p className="text-label">{format(item.createDate, 'dd/MM/yyyy')}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-placeholder">Mã vé</p>
                                            <p className="text-label">{item.id}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-placeholder">Thành tiền</p>
                                            <p className="text-primary">
                                                {appUtils.formatVND(item.total)}
                                            </p>
                                        </div>
                                    </div>
                                    {item.status.name === 'Unpaid' &&
                                        <div className="w-full px-6 mt-2 space-y-2">
                                            {isExpired ?
                                                <div
                                                    className="flex justify-center items-center space-x-1 text-placeholder underline font-inter text-xs">
                                                    <p>Đã hết thời gian thanh toán</p>
                                                </div>
                                                :
                                                <>
                                                    <div
                                                        className="flex justify-center items-center space-x-1 text-placeholder underline font-inter text-xs">
                                                        <p>Vui lòng thanh toán trong</p>
                                                        <CountDownTimer targetDate={new Date(item.expireAt)}
                                                                        handleTimeUp={handleTimeUp}></CountDownTimer>
                                                    </div>
                                                    <Button
                                                        onClick={() => window.location.href = item.paymentUrl}
                                                        className="w-full bg-primary700 font-inter text-md text-label hover:bg-primary500">
                                                        Thanh toán ngay
                                                    </Button>
                                                </>
                                            }

                                        </div>

                                    }
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default BillItem;