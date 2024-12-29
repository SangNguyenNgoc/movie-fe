import React from 'react';
import {LogIn, LogOut, User, UserPlus} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '../ui/DropDownMenu';
import {login, logOut} from "../../app/services/auth.service";
import {UserCircleIcon} from "@heroicons/react/16/solid";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

interface MenuItem {
    label: string;
    icon: React.ReactNode;
    action: () => void;
}

const AuthControl = () => {

    const token: string | undefined = Cookies.get('access_token');
    const navigate = useNavigate();


    const redirect = (url: string) => {
        navigate(url)
    }

    const menuItems: MenuItem[] = [
        {
            label: "Thông tin",
            icon: <User/>,
            action: () => redirect('/profile')
        },
        {
            label: "Đăng xuất",
            icon: <LogOut/>,
            action: async () => {
                await logOut()
                redirect('/')
            }
        },
    ];

    const logInMenu: MenuItem[] = [
        {
            label: "Đăng nhập",
            icon: <LogIn/>,
            action: () => login()
        },
        {
            label: "Đăng ký",
            icon: <UserPlus/>,
            action: () => redirect('/register')
        },
    ]

    return (
        <>
            {token ?
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus-visible:outline-none">
                        <UserCircleIcon className="h-8 w-8 cursor-pointer text-placeholder"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-36 mt-2 bg-primary900 text-label border-none outline-none"
                                         align={"end"}>
                        <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            {menuItems.map((item, index) => (
                                <DropdownMenuItem
                                    key={index}
                                    className="hover:bg-textPrimary/20 hover:border-textPrimary hover:border-l-4 transition-all duration-300 py-2"
                                    onSelect={item.action}
                                >
                                    <div className="flex items-center gap-3 cursor-pointer">
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                :
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus-visible:outline-none">
                        <UserCircleIcon className="h-8 w-8 cursor-pointer text-placeholder"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-36 mt-2 bg-primary900 text-label border-none outline-none"
                                         align={"end"}>
                        <DropdownMenuGroup>
                            {logInMenu.map((item, index) => (
                                <DropdownMenuItem
                                    key={index}
                                    className="hover:bg-textPrimary/20 hover:border-textPrimary hover:border-l-4 transition-all duration-300 py-2"
                                    onSelect={item.action}
                                >
                                    <div className="flex items-center font-comfortaa gap-3 cursor-pointer"
                                         onClick={item.action}>
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            }
        </>

    );
};

export default AuthControl;