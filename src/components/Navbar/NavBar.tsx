import React from 'react';
import {NavItemModel} from "./Navbar.types";
import {ChevronDownIcon} from "@heroicons/react/16/solid";
import {NavLink, useLocation} from "react-router-dom";

interface NavBarProps {
    data: NavItemModel[]
}

const NavBar = ({data}: NavBarProps) => {

    const location = useLocation()

    return (
        <>
            {data.map(item => {
                return (
                    <div key={item.key} className="group/button relative">
                        {item.dropdown ? (
                            <div
                                className={`flex justify-center items-center ${location.pathname.startsWith(item.path || '')  ? ' text-textPrimary' : ' text-label'}`}
                            >
                                {item.text}
                                <ChevronDownIcon className="w-5 h-5" />
                            </div> ): (
                                <NavLink
                                    to={item.path ? item.path : '/'}
                                    className={({ isActive }) => isActive ? "text-textPrimary" : "text-label"}>
                                    {item.text}
                                </NavLink>
                            )
                        }
                        {item.dropdown && (
                            <div className="-left-2/3 origin-top-right hidden group-hover/button:block absolute z-10 divide-y divide-gray-100 shadow focus:outline-none">
                                <div className="font-comfortaa w-full overflow-y-auto no-scrollbar max-h-[200px] text-nowrap flex flex-col items-center text-label bg-primary950 mt-4 rounded-sm" >
                                    {item.children?.map(item => (
                                        <NavLink
                                            key={item.key}
                                            to={item.path ? item.path : '/'}
                                            className="block w-full text-center px-8 py-2 border-l-4 border-transparent hover:bg-textPrimary/20 hover:border-textPrimary transition-all duration-300"
                                        >
                                            {item.text}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </>
    );
};

export default NavBar;