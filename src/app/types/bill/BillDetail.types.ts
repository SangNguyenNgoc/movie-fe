export type TBillDetail = {
    id: string
    createDate: string
    paymentAt: string
    expireAt: string
    total: number
    paymentUrl: string
    failureResponse: string
    failureAt: string
    failure: boolean
    status: TBillStatus
    show: TShowInBillDetail
    tickets: TTicketInBillDetail[]
    concessions: TConcessionInBillDetail[]
}

export type TBillStatus = {
    id: number
    name: string
}

export type TShowInBillDetail = {
    id: string
    startDate: string
    startTime: string
    runningTime: number
    status: boolean
    movie: TMovieInBillDetail
    hall: THallInBillDetail
    format: TFormatInBillDetail
}

export type TMovieInBillDetail = {
    id: string
    name: string
    subName: string
    poster: string
    ageRestriction: number
    releaseDate: string
    endDate: string
    slug: string
}

export type THallInBillDetail = {
    id: number
    name: string
    cinema: TCinemaInBillDetail
}

export type TCinemaInBillDetail = {
    id: string,
    name: string
}

export type TFormatInBillDetail = {
    id: string,
    caption: string
    version: string
}

export type TTicketInBillDetail = {
    id: string
    seat: TSeatInBillDetail
}

export type TSeatInBillDetail = {
    id: number,
    name: string
    currRow: number
    currCol: number
    type: TSeatTypeInBillDetail
}

export type TSeatTypeInBillDetail = {
    id: number,
    name: string,
    price: number
}

export type TConcessionInBillDetail = {
    name: string
    amount: number
}

