import React from 'react';
import {Link} from "react-router-dom";
import {CircleChevronLeftIcon, DoorOpen} from "lucide-react";
import Logo from "../../components/Logo";
import {Input} from "../../components/ui/Input";
import {Button} from "../../components/ui/Button";

const ForgotPasswordPage = () => {
    return (
        <div className="bg-loginBackground flex justify-center items-start pt-32 h-screen relative">
            <div className="absolute left-7 top-5">
                <Link className="font-comfortaa text-primary text-[16px] flex space-x-3" to={'/'}>
                    <DoorOpen></DoorOpen>
                    <p className="fa-solid fa-door-open text-primary text-[16px]"></p> Trang chủ
                </Link>
            </div>
            <form
                className="bg-primary1000 p-6 w-1/3 text-label rounded-lg space-y-6">
                <div className="w-full flex justify-center items-center">
                    <Link to={'/'} className="cursor-pointer">
                        <Logo/>
                    </Link>
                </div>
                <div className="space-y-1">
                    <label>Nhập email của bạn: <span className="text-red-800">*</span></label>
                    <Input
                        className="bg-searchText border-placeholder text-placeholder"
                        type="email"
                        placeholder="Nhập email của bạn"
                    ></Input>
                </div>
                <div className="w-full flex justify-center items-center">
                    <Button type="submit" className="bg-primary700 hover:bg-opacity-80 w-1/3 text-md mt-3 text-white">
                        Xác nhận
                    </Button>
                </div>
                <div className="text-label w-full text-center">Chúng tôi sẽ gửi tới email của bạn một đường liên kết để tiến hành đặt lại mật
                    khẩu.
                </div>
            </form>

        </div>
    );
};

export default ForgotPasswordPage;