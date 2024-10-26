import {TShowData} from "../cinema/CinemasMoviesShows.types";

export type TFormat = {
    id: number;
    caption: string;
    version: string;
    slug: string;
}

export type TGenre = {
    id: number;
    name: string;
}

export type TCinema = {
    id: string;
    name: string;
    slug: string;
    shows: TShowData[];
}

export type TImage = {
    path: string
}

export type TMovieDetail = {
    id: string;
    name: string;
    subName: string;
    director: string;
    performers: string;
    releaseDate: string;
    runningTime: number;
    language: string;
    numberOfRatings: number;
    sumOfRatings: number;
    description: string;
    poster: string;
    horizontalPoster: string;
    trailer: string;
    ageRestriction: number;
    producer: string;
    slug: string;
    formats: TFormat[];
    genres: TGenre[];
    images: TImage[];
    status: {
        id: number;
        description: string;
        slug: string;
    };
    cinemas: TCinema[];
}
