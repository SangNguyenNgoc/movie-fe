import {TSeatType} from "../../app/types/show/ShowDetail.types";

export interface ISelectedSeat {
    id: number
    name: string
    type: TSeatType
}

export interface ISelectedConcession {
    id: string
    name: string
    amount: number
    price: number
}

export interface BookingState {
    billId?: string
    expireTime?: string
    selectedSeats: ISelectedSeat[]
    selectedConcessions: ISelectedConcession[]
    paymentMethod?: string
}

export interface ILocalBookingState {
    showId: string
    step: number
    detail: BookingState
}
