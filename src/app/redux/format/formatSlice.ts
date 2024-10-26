import {TFormat} from "../../types/cinema/CinemasMoviesShows.types";
import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface FormatState {
    formats: TFormat[]
}

const initialState: FormatState = {
    formats: []
}

const formatSlice = createSlice({
    name: 'formats',
    initialState,
    reducers: {
        createFormats:  (state, action: PayloadAction<TFormat[]>) => {
            if(state.formats.length === 0) {
                state.formats = [...state.formats, ...action.payload];
            }
        },
    }
})
export const { createFormats } = formatSlice.actions;
export const selectFormats = (state: RootState) => state.formatState.formats;
export default formatSlice.reducer;

