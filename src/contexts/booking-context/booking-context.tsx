import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {TBillCreate, TSeatType, TShowDetail} from "../../app/types/show/ShowDetail.types";
import {useParams} from "react-router-dom";
import {ToastAction} from "../../components/ui/toast";
import {useToast} from "../../hooks/use-toast";
import {BookingState, ILocalBookingState} from "./type";
import {useFetchShowDetail} from "./use-fetch-show-detail";
import billService from "../../app/services/bill.service";
import {TAddCessionToBill} from "../../app/types/bill/BillInSession.types";
import paymentService from "../../app/services/payment.service";

interface IBookingContextType {
    showId: string | undefined
    step: number
    showData: TShowDetail | undefined
    bookingState: BookingState
    handleSelectSeat: (id: number, name: string, type: TSeatType) => void
    handleSelectConcession: (id: string, name: string, price: number, plus: boolean) => void
    handleChangePaymentMethod: (paymentMethod: string) => void
    handleResetSeat: () => void
    nextStep: () => void
    preStep: () => Promise<void>
    handleSubmit: () => Promise<void>
    handleDestroySession: () => Promise<void>
}

const loadBookingDetailFromLocal = (showId: string): ILocalBookingState | undefined => {
    const jsonData = localStorage.getItem('booking')
    if (!jsonData) {
        return undefined
    }
    const data: ILocalBookingState = JSON.parse(jsonData)
    if (data.showId !== showId) {
        localStorage.removeItem('booking')
        return undefined
    }
    return data
}

const BookingContext = createContext<IBookingContextType | undefined>(undefined)

export function BookingProvider({children}: {children: ReactNode}) {

    const { showId } = useParams<string>();
    const { toast } = useToast();

    const defaultBookingState: BookingState = {
        selectedSeats: [],
        selectedConcessions: [],
        expireTime: undefined,
        billId: undefined,
        paymentMethod: undefined,
    };

    const localBookingState = showId ? loadBookingDetailFromLocal(showId) : undefined

    const [step, setStep] = useState(() => localBookingState?.step ?? 1);
    const [bookingState, setBookingState] = useState<BookingState>(
        localBookingState?.detail ?? defaultBookingState
    );

    useEffect(() => {
        const local = showId ?  loadBookingDetailFromLocal(showId) : undefined;
        setBookingState(local?.detail ?? defaultBookingState);
    }, [showId]);

    useEffect(() => {
        if (!showId) return;
        const bookingDetail: ILocalBookingState = {
            showId,
            step,
            detail: bookingState,
        };
        localStorage.setItem('booking', JSON.stringify(bookingDetail));
    }, [step, bookingState]);


    const handleSelectSeat = (id: number, name: string, type: TSeatType) => {
        const exists = bookingState.selectedSeats.some(seat => seat.id === id);

        if (bookingState.selectedSeats.length >= 6 && !exists) {
            toast({
                title: "Oops!!!",
                description: "Mỗi hóa đơn chỉ được đặt tối đa 6 vé!",
                action: <ToastAction altText="Goto schedule to undo">Đã hiểu</ToastAction>,
                className: "bg-primary1000 text-label border-label"
            });
            return;
        }

        setBookingState(prev => ({
            ...prev,
            selectedSeats: exists
                ? prev.selectedSeats.filter(seat => seat.id !== id)
                : [...prev.selectedSeats, { id, name, type }]
        }));
    };

    const handleSelectConcession = (id: string, name: string, price: number, plus: boolean) => {
        setBookingState(prev => {
            const concessions = [...prev.selectedConcessions];
            const index = concessions.findIndex(item => item.id === id);

            if (index !== -1) {
                const current = concessions[index];
                const newAmount = Math.max(current.amount + (plus ? 1 : -1), 0);

                if (newAmount === 0) {
                    concessions.splice(index, 1); // Xoá phần tử nếu còn 0
                } else {
                    concessions[index] = { ...current, amount: newAmount };
                }

                return { ...prev, selectedConcessions: concessions };
            }

            // Nếu chưa có và đang tăng thì thêm mới
            if (plus) {
                return {
                    ...prev,
                    selectedConcessions: [...concessions, { id, name, price, amount: 1 }]
                };
            }

            // Nếu chưa có và đang giảm thì không làm gì
            return prev;
        });
    };

    const handleSubmit = async () => {
        if (step === 1 && bookingState.selectedSeats.length > 0 && showId !== undefined) {
            if (bookingState.billId === undefined) {
                const bill: TBillCreate = {
                    showId: showId,
                    seatIds: bookingState.selectedSeats.map((item) => item.id),
                };
                const billSession = await billService.createSession(bill);
                setBookingState(prev => ({
                    ...prev,
                    billId: billSession.billId,
                    expireTime: billSession.expireTime
                }));
                nextStep();
                return
            }
        }
        if (step === 2 && bookingState.selectedConcessions.length > 0 && bookingState.billId !== undefined) {
            const concessionsOfBill: TAddCessionToBill = {
                concessionOfBills: bookingState.selectedConcessions.map(item => {
                    return {
                        concessionId: item.id,
                        amount: item.amount,
                        price: item.price
                    }
                })
            }
            const result = await billService.addConcessionToBill(bookingState.billId, concessionsOfBill)
            console.log(result)
            nextStep()
            return
        }
        if (step === 3 && bookingState.billId !== undefined && bookingState.paymentMethod !== undefined) {
            window.location.href = await paymentService.pay(bookingState.billId, bookingState.paymentMethod);
            return
        }
    }

    const handleChangePaymentMethod = (paymentMethod: string) => {
        setBookingState(prev => ({
            ...prev,
            paymentMethod: paymentMethod
        }))
    }

    const nextStep = () => {
        setStep(prevState => prevState + 1)
    }

    const preStep = async () => {
        if (step > 1) {
            setStep(prevState => prevState - 1)
            if (step === 2 && bookingState.billId !== undefined) {
                await billService.deleteSession(bookingState.billId);
                setBookingState(prevState => ({
                    ...prevState,
                    billId: undefined,
                    selectedConcessions: []
                }))
            }
        } else {
            window.location.href = `/movie/${showData?.movie.slug}?c=${showData?.hall.cinema.slug}&d=${showData?.startDate}`
        }
    }

    const handleResetSeat = () => {
        if (bookingState.selectedSeats.length > 0) {
            setBookingState(prev => ({
                ...prev,
                selectedSeats: []
            }))
        }
    }

    const handleDestroySession = async () => {
        if (bookingState.billId !== undefined) {
            await billService.deleteSession(bookingState.billId);
            setStep(1)
            setBookingState({
                selectedSeats: [],
                selectedConcessions: [],
                expireTime: undefined,
                billId: undefined,
                paymentMethod: undefined
            })
        }
    }


    const { data: showData } = useFetchShowDetail(showId);

    return (
        <BookingContext.Provider value={{
            showId,
            step,
            showData,
            bookingState,
            handleSelectSeat,
            handleSelectConcession,
            handleChangePaymentMethod,
            handleResetSeat,
            nextStep,
            preStep,
            handleSubmit,
            handleDestroySession
        }}>
            {children}
        </BookingContext.Provider>
    )

}

export const useBooking = () => {
    const context = useContext(BookingContext)
    if (!context)
        throw new Error('useBooking phải được sử dụng trong BookingProvider')
    return context
}