import {configureStore} from "@reduxjs/toolkit";
import cinemaNamesReducer from "./cinema/cinemaSlice"
import formatReducer from "./format/formatSlice"
import movieReducer from "./movie/movieSlice"


export const store = configureStore({
    reducer: {
        cinemaState: cinemaNamesReducer,
        formatState: formatReducer,
        movieState: movieReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;