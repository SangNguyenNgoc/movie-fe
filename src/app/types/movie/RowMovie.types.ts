export type TMovie = {
    id: string;
    slug: string;
    name: string;
    subName: string;
    poster: string;
    horizontalPoster: string;
    ageRestriction: number;
    sumOfRatings: number;
    numberOfRatings: number;
    trailer: string;
}

export type TStatusMovie = {
    id: number;
    description: string;
    slug: string;
    movies: TMovie[]
}