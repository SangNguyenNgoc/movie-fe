import React from 'react';
import Logo from "../Logo";
import {NavItemModel} from "../Navbar/Navbar.types";

const Footer = () => {

    const navBarModels: NavItemModel[] = [
        {key: 'about', text: 'About', dropdown: false},
        {key: 'teamOfUs', text: 'Team Of Us', dropdown: false},
        {key: 'contact', text: 'Contact', dropdown: false},
        {key: 'feedback', text: 'Feedback', dropdown: false}
    ]

    return (
        <div className="bg-primary1000 h-[150px] flex flex-col px-[90px] pt-8 space-y-3">
            <div className="flex justify-between items-center">
                <Logo/>
                <div className="flex justify-center items-center space-x-4">
                    <button className="bg-cover w-9 h-9 bg-center bg-iconFacebook"></button>
                    <button className="bg-cover w-9 h-9 bg-center bg-iconGoogle"></button>
                    <button className="bg-cover w-9 h-9 bg-center bg-iconTwitter"></button>
                </div>
            </div>
            <div className="bg-customBlack w-full h-[1px]"></div>
            <div className="flex justify-between items-center text-label">
                <div className="flex justify-items-start space-x-2">
                    <p>Copyright © 2024.All Rights Reserved By</p>
                    <p className="text-textPrimary">DevsPhere - Team</p>
                </div>
                <div className="flex justify-center gap-7 cursor-pointer">
                    {navBarModels.map(item => {
                        return (<div key={item.key}>{item.text}</div>)
                    })}
                </div>
            </div>
        </div>
    );
};

export default Footer;