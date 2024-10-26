import {TCinemaInfo} from "../../types/cinema/CinemaInfo.types";
import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TCinemaData} from "../../types/cinema/CinemasMoviesShows.types";
import {RootState} from "../store";

interface CinemaNamesState {
    cinemaNames: TCinemaInfo[]
    cinemaDetails: TCinemaData[]
}

const initialState: CinemaNamesState = {
    cinemaNames: [],
    cinemaDetails: []
}

const cinemaSlice = createSlice({
    name: 'cinemas',
    initialState,
    reducers: {
        createCinemaNames: (state, action: PayloadAction<TCinemaInfo[]>) => {
            if(state.cinemaNames.length === 0) {
                state.cinemaNames = action.payload;
            }
        },
        createCinemaDetails: (state, action: PayloadAction<TCinemaData[]>) => {
            if(state.cinemaDetails.length === 0) {
                state.cinemaDetails = action.payload;
            }
        }
    }
})

export const { createCinemaNames, createCinemaDetails } = cinemaSlice.actions;

export default cinemaSlice.reducer;

export const selectCinemasNames = (state: RootState) => state.cinemaState.cinemaNames;
export const selectCinemasMoviesShows = (state: RootState) => state.cinemaState.cinemaDetails;

export const selectCinemaAndShowsByFilter = createSelector(
    [selectCinemasMoviesShows, (_, filter: string) => filter],
    (cinemasMoviesShows, filter) => {
        if (cinemasMoviesShows.length === 0) {
            return undefined
        }
        return cinemasMoviesShows.find(cinema => cinema.slug === filter)

    }
);

export const selectCinemasAndAll = createSelector(
    [selectCinemasNames],
    (cinemasState) => {
        return [{
            name: 'Tất cả rạp',
            slug: 'all',
        }, ...cinemasState];
    }
);