import React from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Outlet, useLocation} from "react-router-dom";
import Cookies from "js-cookie";
import {Toaster} from "./components/ui/toaster";

function App() {
    const location = useLocation();
    const recentUrl = Cookies.get('recent_url')?.split('?')[0]
    if (recentUrl !== undefined && !location.pathname.endsWith(recentUrl)) {
        window.scrollTo(0, 0);
    }
    Cookies.set('recent_url', location.pathname + location.search)
    return (
        <div className="relative pt-8 bg-primary950 w-full">
            <Header/>
            <Outlet/>
            <Footer/>
            <Toaster/>
        </div>
    );
}

export default App;
