import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import HomePage from "../../pages/HomePage";
import MoviePage from "../../pages/MoviePage";
import React from "react";
import CinemaPage from "../../pages/CinemaPage";
import MovieDetail from "../../pages/MovieDetailPage";

const AllRoutes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: 'movie/',
                element: <MoviePage />,
            },
            {
                path: 'cinema/',
                element: <CinemaPage />,
            },
            {
                path: '/movie/:movieSlug',
                element: <MovieDetail />
            }
        ]
    }
]);
export default AllRoutes