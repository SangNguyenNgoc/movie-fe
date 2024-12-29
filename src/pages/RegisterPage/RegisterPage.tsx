import React, {useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import {DoorOpen} from "lucide-react";
import {SubmitHandler, useForm} from "react-hook-form";
import {TRegister} from "../../app/types/user/UserRegister.types";
import {login} from "../../app/services/auth.service";
import userService from "../../app/services/user.service";
import Logo from "../../components/Logo";
import useTitle from "../../hooks/use-title";

interface FormValues {
    email: string
    password: string
    confirmPassword: string
    fullname: string
    agreeTerms: boolean
}


const RegisterPage = () => {

    useTitle("Đăng ký tài khoản")

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
        setError
    } = useForm<FormValues>();

    const [submitted, setSubmitted] = useState(false);

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-start h-screen bg-loginBackground w-full relative">
                <div className="flex flex-col justify-center items-center w-3/4 sm:w-1/3 space-y-4 top-1/4 absolute">
                    <div className="size-20 text-sky-500 bg-tick bg-cover"></div>
                    <p className="text-center font-comfortaa font-bold text-primary text-xl">Đăng ký thành công!</p>
                    <p className="text-center font-comfortaa text-label text-[14px]">
                        Cảm ơn bạn đã đăng ký tài khoản.
                        Hãy kiểm tra email và tiến hành xác minh tài khoản để có thể sử dụng những dịch vụ của chúng
                        mình nhé!
                    </p>
                    <Link
                        className="mt-4 mb-3 text-white text-center text-[15px] w-[160px] horizontal-line rounded-3xl font-comfortaa font-semibold py-2 focus:outline-none"
                        to={'/'}
                        style={{backgroundImage: 'linear-gradient(to right, #FF4343 0%, #AA52A1 46%, #002DBB 100%)'}}
                    >Trang chủ</Link>
                </div>
            </div>
        );
    }

    const onSubmit: SubmitHandler<FormValues> = async (data: TRegister) => {
        try {
            await userService.registerUser(data);
            setSubmitted(true);
        } catch (error) {
            if (error instanceof Error && error.message === 'Email đã được sử dụng') {
                console.error('Lỗi đăng ký: ', error.message);
                setError('email', {
                    type: 'conflict',
                    message: 'Email đã được sử dụng',
                });
            } else {
                console.error('Lỗi đăng ký không xác định:', error);
                alert('Đã có lỗi xảy ra, vui lòng thử lại sau.');
            }
        }
    };

    const password = watch("password");

    return (
        <div
            className="flex flex-col items-center justify-center h-screen bg-loginBackground w-full relative space-y-10">
            <div
                className="w-[500px] rounded bg-formBackground flex flex-col justify-center items-center py-5 shadow-xl">
                <div className="w-[400px] flex flex-col justify-center items-center">
                    <p className="font-bold text-[16px] text-primary font-comfortaa">Welcome to</p>
                    <NavLink to={'/'} className="cursor-pointer">
                        <Logo w={264} h={70}/>
                    </NavLink>
                </div>
                <form
                    className="w-[400px] mt-4 flex flex-col justify-center items-center"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="mt-4 w-full">
                        <label className="block text-[13px] text-label font-medium font-comfortaa uppercase mb-1">
                            Tên người dùng <span
                            className="text-[13px] text-red-800 font-medium font-comfortaa">*</span>
                        </label>
                        <input
                            className="w-full bg-transparent placeholder-placeholder text-label font-medium font-comfortaa border-0 h-8 focus:border-0 focus:ring-0 focus:outline-none"
                            placeholder="Tên nguời dùng"
                            {...register("fullname", {required: "Vui lòng nhập tên người dùng."})}
                        />
                        <div className="w-full h-[1px] bg-placeholder"></div>
                        {errors.fullname &&
                            <p className="mt-1 font-comfortaa text-[12px] text-red-800">{errors.fullname.message}</p>}
                    </div>

                    <div className="mt-6 w-full">
                        <label className="block text-[13px] text-label font-medium font-comfortaa uppercase mb-1">
                            Email <span className="text-[13px] text-red-800 font-medium font-comfortaa">*</span>
                        </label>
                        <input
                            className="w-full bg-transparent text-label placeholder-placeholder font-medium font-comfortaa border-0 h-8 focus:border-0 focus:ring-0 focus:outline-none"
                            placeholder="yourmail@gmail.com"
                            type="email"
                            {...register("email", {
                                required: "Vui lòng nhập email.",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Email không hợp lệ."
                                }
                            })}
                        />
                        <div className="w-full h-[1px] bg-placeholder"></div>
                        {errors.email &&
                            <p className="mt-1 font-comfortaa text-[12px] text-red-800">{errors.email.message}</p>}
                    </div>

                    <div className="mt-6 w-full">
                        <label
                            className="block text-[13px] text-label placeholder-placeholder font-medium font-comfortaa uppercase mb-1">
                            Mật khẩu <span className="text-[13px] text-red-800 font-medium font-comfortaa">*</span>
                        </label>
                        <input
                            className="w-full bg-transparent text-label placeholder-placeholder font-medium font-comfortaa border-0 h-8 focus:border-0 focus:ring-0 focus:outline-none"
                            placeholder="Mật khẩu"
                            type="password"
                            {...register("password", {required: "Vui lòng nhập mật khẩu."})}
                        />
                        <div className="w-full h-[1px] bg-placeholder"></div>
                        {errors.password &&
                            <p className="mt-1 font-comfortaa text-[12px] text-red-800">{errors.password.message}</p>}
                    </div>

                    <div className="mt-6 w-full">
                        <label className="block text-[13px] text-label font-medium font-comfortaa uppercase mb-1">
                            Nhập lại mật khẩu <span
                            className="text-[13px] text-red-800 font-medium font-comfortaa">*</span>
                        </label>
                        <input
                            className="w-full bg-transparent text-label placeholder-placeholder font-medium font-comfortaa border-0 h-8 focus:border-0 focus:ring-0 focus:outline-none"
                            placeholder="Nhập lại mật khẩu"
                            type="password"
                            {...register("confirmPassword", {
                                required: "Vui lòng xác nhận lại mật khẩu.",
                                validate: (value) => value === password || "Mật khẩu không trùng khớp."
                            })}
                        />
                        <div className="w-full h-[1px] bg-placeholder"></div>
                        {errors.confirmPassword &&
                            <p className="mt-1 font-comfortaa text-[12px] text-red-800">{errors.confirmPassword.message}</p>}
                    </div>

                    <div className="mt-4 w-full flex justify-start items-start">
                        <input
                            className="appearance-none w-4 h-4 mr-2 bg-gray-500 rounded-full checked:bg-primary checked:shadow-[inset_0_0_0_2px_rgba(107,114,128)] cursor-pointer"
                            type="checkbox"
                            {...register("agreeTerms", {required: "Bạn phải đồng ý với các điều khoản."})}
                        />
                        <label className="block text-[13px] text-label font-bold font-comfortaa mb-3">
                            I agree to the <span className="text-primary font-bold font-comfortaa">Terms</span>,
                            <span className="text-primary font-bold font-comfortaa">  Privacy Policy</span> and
                            <span className="text-primary font-bold font-comfortaa">  Fees</span>
                        </label>
                    </div>
                    {errors.agreeTerms &&
                        <p className="mt-1 font-comfortaa text-[12px] text-red-800">{errors.agreeTerms.message}</p>}

                    <button
                        className="mt-4 mb-3 text-white text-[15px] w-[160px] horizontal-line rounded-3xl font-comfortaa font-semibold py-2"
                        type="submit"
                        style={{backgroundImage: 'linear-gradient(to right, #FF4343 0%, #AA52A1 46%, #002DBB 100%)'}}
                    >
                        Đăng ký
                    </button>
                    <div className="w-full flex justify-center items-center space-x-2">
                        <p className="block text-[12px] text-white font-comfortaa mb-4 font-semibold">Bạn đã có tài
                            khoản?</p>
                        <p
                            className="block text-[12px] text-primary font-comfortaa mb-4 cursor-pointer font-semibold"
                            onClick={() => login()}
                        >
                            Đăng nhập
                        </p>
                    </div>
                </form>
                <div className="mt-4 w-[400px] flex justify-center items-center space-x-3">
                    <div className="w-full h-[1px] bg-placeholder"></div>
                    <label className="block text-[16px] text-label font-bold font-comfortaa uppercase">hoặc </label>
                    <div className="w-full h-[1px] bg-placeholder"></div>
                </div>
                <div className="mt-4 w-[400px] flex justify-center items-center space-x-4">
                    <button className="bg-cover w-9 h-9 bg-center bg-iconFacebook"></button>
                    <Link to={"http://localhost:8080/oauth2/authorization/google"}
                          className="bg-cover w-9 h-9 bg-center bg-iconGoogle">
                    </Link>
                    <button className="bg-cover w-9 h-9 bg-center bg-iconTwitter"></button>
                </div>
            </div>
            <div className="absolute left-7 -top-3">
                <Link className="font-comfortaa text-primary text-[16px] flex space-x-3" to={'/'}>
                    <DoorOpen></DoorOpen> <i className="fa-solid fa-door-open text-primary text-[16px]"></i> Trang chủ
                </Link>
            </div>
        </div>
    );
};

export default RegisterPage;