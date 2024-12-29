import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TStatusMovie} from "../../types/movie/RowMovie.types";
import {RootState} from "../store";

interface MovieStatusState {
    movies: TStatusMovie[]
}

const initialState: MovieStatusState = {
    movies: []
}

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        createMovies: (state, action: PayloadAction<TStatusMovie[]>) => {
            if (state.movies.length === 0) {
                state.movies = action.payload
            }
        }
    }
})

export const {createMovies} = movieSlice.actions;
export const selectAllMovies = (state: RootState) => state.movieState.movies;
export default movieSlice.reducer;

export const selectMoviesByStatus = createSelector(
    [selectAllMovies, (_, statusFilter: string) => statusFilter],
    (movieState, statusFilter) => {
        return movieState.find(item => item.slug === statusFilter);
    }
);