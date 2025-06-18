import React, {useEffect} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "../ui/Card";
import {RadioGroup, RadioGroupItem} from "../ui/RadioGroup";
import {Label} from "../ui/Label";
import {useFetchPayments} from "../../contexts/booking-context/use-fetch-payments";
import Loading from "../Loading";
import {useBooking} from "../../contexts/booking-context/booking-context";
import ProjectDisclaimer from "../ProjectDisclaimer";

const PaymentsDisplay = () => {

    const {data: payments} = useFetchPayments()
    const {handleChangePaymentMethod} = useBooking()

    useEffect(() => {
        if (payments) {
            handleChangePaymentMethod(payments[0].tag)
        }
    }, [payments]);

    return (
        payments ?
            <>
                <Card className="border-none bg-hallPrimary rounded-md">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-label font-comfortaa">Phương thức thanh toán</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup
                            defaultValue={payments[0].tag}
                            className="space-y-4"
                            onValueChange={handleChangePaymentMethod}

                        >
                            {payments.map(payment =>
                                <div key={payment.id} className="flex items-center space-x-3">
                                    <RadioGroupItem value={payment.tag} id={payment.tag} className="mt-1" disabled={!payment.enabled}/>
                                    <div className="flex items-center space-x-2">
                                        <div className="relative w-10 h-10 flex-shrink-0">
                                            <img src={payment.image || "/placeholder.svg"} alt={payment.name}
                                                 className="w-full h-full object-contain"/>
                                        </div>
                                        <Label htmlFor="vnpay" className="text-sm text-label">
                                            {payment.name} {payment.expand && `- ${payment.expand}`}
                                        </Label>
                                    </div>
                                </div>
                            )}
                        </RadioGroup>

                        <p className="text-xs text-label mt-6">
                            (*) Bằng việc click/chạm vào THANH TOÁN bên phải, bạn đã xác nhận hiểu rõ các Quy Định Giao
                            Dịch Trực
                            Tuyến của chúng tôi.
                        </p>
                    </CardContent>
                </Card>
                <ProjectDisclaimer/>
            </>
            : <Loading/>
    );
};

export default PaymentsDisplay;