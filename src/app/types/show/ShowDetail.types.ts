export type TMovieInShowDetail = {
    id: string
    name: string
    subName: string
    releaseDate: string
    runningTime: number
    poster: string
    ageRestriction: number
    slug: string
}

export type TSeatType = {
    id: number
    name: string
    price: number
}

export type TSeat = {
    id: number
    name: string
    currRow: number
    currCol: number
    type: TSeatType
    isReserved: boolean
}

export type TRowSeat = {
    row: number
    rowName: string
    seats: TSeat[]
}

export type THallInShowDetail = {
    id: number
    name: string
    totalSeats: number
    availableSeats: number
    numberOfRows: number
    colsPerWow: number
    cinema: {
        id: string
        name: string
        slug: string
    }
    rows: TRowSeat[]
}

export type TFormatInShowDetail = {
    id: number
    caption: string
    version: string
    slug: string
}

export type TShowDetail = {
    id: string
    startDate: string
    startTime: string
    runningTime: number
    status: boolean
    movie: TMovieInShowDetail
    format: TFormatInShowDetail
    hall: THallInShowDetail
    sameShows: TShowInfo[]
}

export type TBillCreate = {
    showId: string,
    seatIds: number[]
}

export type TShowInfo = {
    id: string
    startDate: string
    startTime: string
    runningTime: number
}