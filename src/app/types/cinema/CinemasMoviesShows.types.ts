import {TCinemaInfo} from "./CinemaInfo.types";

export type TCinemaData = TCinemaInfo & {
    address: string,
    description: string,
    phoneNumber: string,
    movies: TMovieData[]
}

export type TMovieData = {
    name: string,
    subName: string,
    slug: string,
    poster: string,
    horizontalPoster: string,
    runningTime: number
    shows: TShowData[]
}

export type TShowData = {
    id: string,
    startDate: string,
    startTime: string,
    runningTime: number
    format: TFormat
}

export type TFormat = {
    id: number;
    caption: string;
    version: string;
    slug: string;
}