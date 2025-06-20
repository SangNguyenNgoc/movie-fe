import {createBrowserRouter} from "react-router-dom";
import App from "../../App";
import HomePage from "../../pages/HomePage";
import MoviePage from "../../pages/MoviePage";
import React from "react";
import CinemaPage from "../../pages/CinemaPage";
import MovieDetail from "../../pages/MovieDetailPage";
import AuthorizedPage from "../../pages/AuthorizedPage";
import RegisterPage from "../../pages/RegisterPage";
import OAuthHandler from "../../components/OAuthHandler";
import ProfilePage from "../../pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import BookingPage from "../../pages/BookingPage";
import BillDetailPage from "../../pages/BillDetailPage";
import ChangePasswordPage from "../../pages/ChangePasswordPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
import SilentRenewPage from "../../pages/RenewRedirectPage";
import {BookingProvider} from "../../contexts/booking-context/booking-context";
import BookingHeader from "../../components/BookingDetail/BookingHeader";

const AllRoutes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/',
                element: <HomePage/>
            },
            {
                path: '/profile',
                element: (
                    <ProtectedRoute>
                        <ProfilePage/>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'movie/',
                element: <MoviePage/>,
            },
            {
                path: 'cinema/',
                element: <CinemaPage/>,
            },
            {
                path: '/movie/:movieSlug',
                element: <MovieDetail/>
            },
            {
                path: 'booking/:showId',
                element: (
                    <ProtectedRoute>
                        <BookingProvider>
                            <BookingHeader/>
                            <BookingPage/>
                        </BookingProvider>
                    </ProtectedRoute>
                )
            }
        ]
    },
    {
        path: '/authorized',
        element: <AuthorizedPage/>
    },
    {
        path: '/oidc-silent-redirect',
        element: <SilentRenewPage/>
    },
    {
        path: '/register',
        element: <RegisterPage/>
    },
    {
        path: '/oauth-handle',
        element: <OAuthHandler/>
    },
    {
        path: '/bill/:billId',
        element: (
            <ProtectedRoute>
                <BillDetailPage/>
            </ProtectedRoute>
        )
    },
    {
        path: '/change-password',
        element: (
            <ProtectedRoute>
                <ChangePasswordPage/>
            </ProtectedRoute>
        )
    },
    {
        path: '/forgot-password',
        element: <ForgotPasswordPage />
    }
]);
export default AllRoutes