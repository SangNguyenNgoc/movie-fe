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
            if (state.cinemaNames.length === 0) {
                state.cinemaNames = action.payload;
            }
        },
    }
})

export const {createCinemaNames} = cinemaSlice.actions;

export default cinemaSlice.reducer;

export const selectCinemasNames = (state: RootState) => state.cinemaState.cinemaNames;

export const selectCinemasAndAll = createSelector(
    [selectCinemasNames],
    (cinemasState) => {
        return [{
            name: 'Tất cả rạp',
            slug: 'all',
        }, ...cinemasState];
    }
);