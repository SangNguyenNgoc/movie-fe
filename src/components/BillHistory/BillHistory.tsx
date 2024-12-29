import React, {useEffect, useState} from 'react';
import {TBillDetail} from "../../app/types/bill/BillDetail.types";
import billService from "../../app/services/bill.service";
import Loading from "../Loading";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../ui/Select";
import BillItem from "./BillItem";

const BillHistory = () => {

    const [billStatus, setBillStatus] = useState('Paid');
    const [billList, setBillList] = useState<TBillDetail[] | undefined>()

    useEffect(() => {
        const fetchData = async () => {
            const data = await billService.fetchBillByCurrUser(1, billStatus)
            if (data) {
                setBillList(data)
            }
        }
        fetchData()
    }, [billStatus]);

    const checkBill = (data: TBillDetail[]) => {
        for (const item of data) {
            if (item.status.name === billStatus) {
                return true
            }
        }
        return false
    }

    const renderBill = () => {
        if (billList?.length === 0) {
            return <p className="text-label font-comfortaa text-sm w-full text-center mt-20">
                Không có hóa đơn được tìm thấy!
            </p>
        }
        const renderData = billService.groupingByDate(billList!)
        return Array.from(renderData.entries()).map(([date, bills]) => {
            if (!checkBill(bills)) {
                return null
            }
            return (
                <div key={date}
                     className="h-full text-lg text-center text-placeholder font-comfortaa space-y-1">
                    <div className="w-full flex justify-center items-center space-x-3">
                        <div className="w-full h-[1px] bg-placeholder"></div>
                        <p
                            className="text-placeholder font-comfortaa text-sm text-nowrap">{`Tháng ${date}`}</p>
                        <div className="w-full h-[1px] bg-placeholder"></div>
                    </div>
                    <div className="space-y-5">
                        {bills.map(item => {
                            return (
                                <BillItem item={item} key={item.id}/>
                            )
                        })}
                    </div>
                </div>
            )
        })
    }

    return (
        billList ?
            <div className="space-y-2 w-[65%]">
                <div className="flex justify-between items-center border-placeholder">
                    <h1 className="text-textPrimary text-2xl font-comfortaa">Lịch sử giao dịch</h1>
                    <Select value={billStatus} onValueChange={setBillStatus}>
                        <SelectTrigger className="w-[180px] text-label h-8 outline-none">
                            <SelectValue placeholder="Đã thanh toán"/>
                        </SelectTrigger>
                        <SelectContent className="text-label bg-primary950">
                            <SelectGroup>
                                <SelectItem value="Paid" className="cursor-pointer">Đã thanh toán</SelectItem>
                                <SelectItem value="Unpaid" className="cursor-pointer">Chưa thanh toán</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="h-full text-sm text-placeholder font-comfortaa">
                    <p>Lưu ý: Chỉ hiển thị 20 giao dịch gần nhất.</p>
                </div>
                <div className="w-full space-y-5">
                    {renderBill()}
                </div>
            </div> :
            <div className="h-screen w-[65%]">
                <Loading/>
            </div>

    );
};

export default BillHistory;