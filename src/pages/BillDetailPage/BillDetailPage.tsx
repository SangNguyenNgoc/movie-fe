import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {TBillDetail} from "../../app/types/bill/BillDetail.types";
import billService from "../../app/services/bill.service";
import Loading from "../../components/Loading";
import dateService from "../../app/services/date.service";
import appUtils from "../../app/services/utils.service";
import {QRCodeCanvas} from "qrcode.react";
import {CheckCircleIcon, DoorOpen} from "lucide-react";
import {format} from "date-fns";
import useTitle from "../../hooks/use-title";

const BillDetailPage = () => {

    useTitle('Chi tiết hóa đơn')

    const {billId} = useParams<string>();

    const [data, setData] = useState<TBillDetail | undefined>(undefined)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await billService.fetchOneBillById(billId ?? '');
                console.log(data)
                setData(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [billId]);

    return (
        <div className="relative w-screen min-h-screen bg-loginBackground flex justify-center items-start pt-6">
            <div className="absolute left-7 top-5">
                <Link className="font-comfortaa text-primary text-[16px] flex space-x-3" to={'/'}>
                    <DoorOpen></DoorOpen> <i className="fa-solid fa-door-open text-primary text-[16px]"></i> Trang chủ
                </Link>
            </div>
            {data ?
                <div className="w-1/3 space-y-3 max-w-[500px]">
                    <div className="flex flex-col justify-center items-center space-y-2">
                        <CheckCircleIcon className="text-primary h-10 w-10"/>
                        <p className="text-primary font-comfortaa text-center text-lg">
                            Đặt vé thành công !!!
                        </p>
                        <p className="text-label font-comfortaa text-center">
                            Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi, chúc bạn có những phút giây xem phim thật thư
                            giãn.
                        </p>
                    </div>
                    <div className="bg-primary950 bg-opacity-80 w-full pt-3 pb-6 rounded-lg space-y-3">
                        <div className="flex justify-start items-start w-full gap-x-6 px-6">
                            <div className="-ms-3">
                                <div
                                    style={{
                                        backgroundImage: `url(${data.show.movie.poster})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        height: '150px',
                                        width: '120px',
                                    }}
                                    className="rounded-md"
                                >
                                </div>
                            </div>
                            <div className="flex-col space-y-3 mt-4">
                                <p className="font-inter capitalize text-label text-lg font-medium drop-shadow-lg">{data.show.movie.subName}</p>
                                <div className="flex justify-items-start space-x-2 items-center">
                                    <p className="font-inter text-placeholder text-md drop-shadow-lg">{data.show.format.version} {data.show.format.caption} - </p>
                                    <div className="bg-primary500 bg-opacity-70 w-fit px-1.5 py-0.5 rounded">
                                        <p className="font-inter text-label text-xs">T{data.show.movie.ageRestriction}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-label text-md font-inter space-y-1 px-6">
                            <p className="text-placeholder">Rạp phim</p>
                            <p className="font-inter capitalize text-label text-md drop-shadow-lg font-bold">
                                {data.show.hall.cinema.name} - {data.show.hall.name.split("-")[0]}
                            </p>
                        </div>
                        <div className="w-full flex justify-start items-start font-inter text-sm space-x-4 px-6">
                            <div className="w-2/5 space-y-1">
                                <p className="text-placeholder">Suất</p>
                                <p className="text-label text-md">{dateService.formatDateIncludeYear(data.show.startDate)}</p>
                            </div>
                            <div className="w-1/3 space-y-1">
                                <p className="text-placeholder">Thời gian</p>
                                <p className="text-label">{dateService.cutFromLastColon(data.show.startTime) + ' '}
                                    ~
                                    {' ' + dateService.cutFromLastColon(
                                        dateService.addMinutesToTime(data.show.startTime, data.show.runningTime)
                                    )}
                                </p>
                            </div>
                            <div className="w-1/4 space-y-1">
                                <p className="text-placeholder">Ghế</p>
                                <p className="text-label">
                                    {data.tickets
                                        .sort((a, b) => a.seat.id - b.seat.id)
                                        .map(ticket => ticket.seat.name)
                                        .join(', ')
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="relative w-full h-1 flex justify-center items-center px-6">
                            <div className="w-full border-2 border-dashed border-placeholder"></div>
                        </div>
                        <div className="flex justify-center items-center w-full">
                            <div style={{textAlign: 'center'}} className="bg-white p-2">
                                <QRCodeCanvas
                                    value={data.id}
                                    size={100}
                                    bgColor="#ffffff"
                                    fgColor="#000000"
                                    level="H"
                                />
                            </div>
                        </div>
                        <div className="relative w-full h-1 flex justify-center items-center px-6">
                            <div className="w-full border-2 border-dashed border-placeholder"></div>
                        </div>
                        <div className="w-full flex justify-between items-start font-inter text-md space-x-4 px-6">
                            <div className="space-y-1">
                                <p className="text-placeholder">Ngày đặt</p>
                                <p className="text-label">{format(data.createDate, 'dd/MM/yyyy')}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-placeholder">Mã vé</p>
                                <p className="text-label">{data.id}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-placeholder">Thành tiền</p>
                                <p className="text-primary">
                                    {appUtils.formatVND(data.total)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                : <Loading/>
            }
        </div>
    );
};

export default BillDetailPage;