import React, {useEffect} from 'react';
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import {UserCircleIcon} from "@heroicons/react/16/solid";
import Logo from "../Logo";
import {NavItemModel} from "../Navbar/Navbar.types";
import NavBar from "../Navbar/NavBar";
import {NavLink} from "react-router-dom";
import cinemaService from "../../app/services/cinema.service";
import dateService from "../../app/services/date.service";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/redux/store";
import {createCinemaNames, selectCinemasNames} from "../../app/redux/cinema/cinemaSlice";


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
            ]},
        {key: 'cinema', path: '/cinema', text: 'Rạp/Vé', dropdown: true, children: renderCinemas()}
    ]


    return (
        <div className="fixed z-20 bg-primary1000 h-[72px] w-full top-0 flex justify-between px-16 items-center">
            <NavLink to={'/'} className="cursor-pointer">
                <Logo/>
            </NavLink>
            <div className="flex justify-center gap-12 font-comfortaa cursor-pointer">
                <NavBar key={"key"} data={navBarModels} />
            </div>
            <label
                htmlFor="search-input"
                className="flex border border-transparent rounded-[8px] px-[16px] py-1 gap-4 items-center bg-searchText w-2/5"
            >
                <input
                    id="search-input"
                    name="search-input"
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="border-none w-full bg-transparent focus:outline-none font-comfortaa text-label placeholder-placeholder"
                />
                <div>
                    <MagnifyingGlassIcon className="h-5 w-5 cursor-pointer text-placeholder"/>
                </div>
            </label>
            <button className="flex justify-items-start items-center gap-x-3 me-3">
                <p className="text-label">Đăng nhập</p>
                <UserCircleIcon className="h-8 w-8 cursor-pointer text-placeholder"/>
            </button>
        </div>
    );
};

export default Header;