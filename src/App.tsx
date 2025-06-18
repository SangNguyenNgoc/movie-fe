import React, {useEffect, useRef} from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Outlet, useLocation} from "react-router-dom";
import Cookies from "js-cookie";
import {Toaster} from "./components/ui/toaster";

function App() {
    const location = useLocation();
    const containerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const recentUrl = Cookies.get("recent_url")?.split("?")[0];
        if (recentUrl !== undefined && !location.pathname.endsWith(recentUrl)) {
            containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        }
        Cookies.set("recent_url", location.pathname + location.search);
    }, [location]);

    return (
        <div
            ref={containerRef}
            className="relative pt-8 bg-primary950 w-full h-screen overflow-y-auto custom-scrollbar flex flex-col"
        >
            {!location.pathname.startsWith('/show') && <Header />}
            <div className="flex-1 pb-12">
                <Outlet />
            </div>
            <Footer />
            <Toaster />
        </div>
    );
}

export default App;
