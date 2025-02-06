import React, {useEffect} from 'react';
import Logo from "../Logo";
import {NavItemModel} from "../Navbar/Navbar.types";
import NavBar from "../Navbar/NavBar";
import {NavLink} from "react-router-dom";
import cinemaService from "../../app/services/cinema.service";
import dateService from "../../app/services/date.service";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/redux/store";
import {createCinemaNames, selectCinemasNames} from "../../app/redux/cinema/cinemaSlice";
import AuthControl from "../AuthControl";
import SearchMovie from "../SearchMovie";
import Loading from "../Loading";


const Header = () => {

    const dispatch = useDispatch();
    const cinemas = useSelector((state: RootState) => selectCinemasNames(state));
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (cinemas.length === 0) {
                    const initialCinema = await cinemaService.fetchAllCinemas();
                    dispatch(createCinemaNames(initialCinema.data));
                }
            } catch (error) {
                console.error("Error fetching cinemas:", error);
            }
        };
        fetchData();
    }, [cinemas, dispatch]);

    const renderCinemas = (): NavItemModel[] | undefined => {
        return cinemas?.map(item => {
            return {
                key: item.slug,
                text: item.name,
                path: `/cinema?c=${item.slug}&d=${dateService.getToday()}`,
                dropdown: false
            };
        })
    }

    const navBarModels: NavItemModel[] = [
        {key: 'home', path: '/', text: 'Trang Chủ', dropdown: false},
        {
            key: 'movie',
            path: '/movie',
            text: 'Phim',
            dropdown: true,
            children: [
                {key: 'showing-now', path: `/movie?s=showing-now`, text: 'Đang chiếu', dropdown: false},
                {key: 'coming-soon', path: `/movie?s=coming-soon`, text: 'Sắp chiếu', dropdown: false}
            ]
        },
        {key: 'cinema', path: '/cinema', text: 'Rạp/Vé', dropdown: true, children: renderCinemas()}
    ]


    return (
        <header className="fixed z-20 box-border bg-primary1000 h-20 w-screen top-0 flex justify-center items-center">
            <div className="flex justify-between mx-16 items-center h-full w-full max-w-[1440px]">
                <NavLink to={'/'} className="cursor-pointer">
                    <Logo/>
                </NavLink>
                <div className="flex justify-center gap-12 font-inter cursor-pointer">
                    <NavBar key={"key"} data={navBarModels}/>
                </div>
                <SearchMovie/>
                <AuthControl/>
            </div>
        </header>
    );
};

export default Header;