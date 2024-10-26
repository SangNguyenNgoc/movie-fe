import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Outlet, useLocation} from "react-router-dom";

function App() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
  return (
      <div className="relative pt-8 bg-primary950">
          <Header/>
          <Outlet/>
          <Footer />
      </div>
  );
}

export default App;
