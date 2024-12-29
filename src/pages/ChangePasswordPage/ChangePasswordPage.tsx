import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {TChangePasswordRequest} from "../../app/types/user/UserProfile.types";
import {Input} from "../../components/ui/Input";
import {Button} from "../../components/ui/Button";
import {Link, useNavigate} from "react-router-dom";
import {CircleChevronLeftIcon} from "lucide-react";
import Logo from "../../components/Logo";
import OtpHandler from "../../components/ChangePassword/OTPHandler";
import userService from "../../app/services/user.service";
import useTitle from "../../hooks/use-title";

interface FormValues {
    oldPassword: string
    newPassword: string
    confirmPassword: string
}

const ChangePasswordPage = () => {

    useTitle('Đổi mật khẩu')

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
        setError
    } = useForm<FormValues>()

    const [step, setStep] = useState<'enterPass' | 'enterOtp' | 'success'>('enterPass')

    if (step === 'success') {
        return (
            <div className="flex flex-col items-center justify-start h-screen bg-loginBackground w-full relative">
                <div className="flex flex-col justify-center items-center w-3/4 sm:w-1/3 space-y-4 top-1/4 absolute">
                    <div className="size-20 text-sky-500 bg-tick bg-cover"></div>
                    <p className="text-center font-comfortaa font-bold text-primary text-xl">Đổi mật khẩu thành
                        công!</p>
                    <p className="text-center font-comfortaa text-label text-[14px]">
                        Bạn đã cập nhật mật khẩu thành công, từ giờ bạn có thể đăng nhập với mật khẩu mới.
                    </p>
                    <Button
                        onClick={() => navigate('/')}
                        type="submit"
                        className="bg-primary700 hover:bg-opacity-80 w-1/3 text-md mt-3 rounded-3xl text-white"
                    >
                        Trang chủ
                    </Button>
                </div>
            </div>
        )
    }

    if (step === 'enterOtp') {

        const handleOTP = async (otp: string) => {
            if (otp.length === 6) {
                console.log(otp)
                try {
                    await userService.enterOtpChangePassword(otp)
                    setStep('success')
                } catch (error) {
                    alert('OTP không hợp lệ.');
                }
            }
        }

        const handleResendOTP = async () => {
            try {
                await userService.changePassword(undefined)
            } catch (error) {
                console.error('Lỗi đăng ký không xác định:', error);
                alert('Đã có lỗi xảy ra, vui lòng thử lại sau.');
            }
        }

        return (
            <OtpHandler handleOTP={handleOTP} handleResendOTP={handleResendOTP}></OtpHandler>
        )
    }

    const onSubmit: SubmitHandler<FormValues> = async (data: TChangePasswordRequest) => {
        try {
            await userService.changePassword(data)
            setStep('enterOtp')
        } catch (error) {
            if (error instanceof Error && error.message === 'Invalid old password') {
                setError('oldPassword', {
                    type: 'conflict',
                    message: 'Mật khẩu cũ không hợp lệ ',
                });
            } else {
                console.error('Lỗi đăng ký không xác định:', error);
                alert('Đã có lỗi xảy ra, vui lòng thử lại sau.');
            }
        }
    }

    const confirm = watch("confirmPassword")

    return (
        <div className="bg-loginBackground flex justify-center items-start pt-32 h-screen relative">
            <div className="absolute left-7 top-5">
                <Link className="font-comfortaa text-primary text-[16px] flex space-x-3" to={'/profile'}>
                    <CircleChevronLeftIcon></CircleChevronLeftIcon>
                    <p className="fa-solid fa-door-open text-primary text-[16px]"></p> Quay lại
                </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}
                  className="bg-primary1000 p-6 w-1/3 text-label rounded-lg space-y-6">
                <div className="w-full flex justify-center items-center">
                    <Link to={'/'} className="cursor-pointer">
                        <Logo/>
                    </Link>
                </div>
                <div className="space-y-1">
                    <label>Mật khẩu hiện tại <span className="text-red-800">*</span></label>
                    <Input
                        className="bg-searchText border-placeholder text-placeholder"
                        type="password"
                        placeholder="Nhập mật khẩu hiện tại"
                        {...register("oldPassword", {required: "Vui lòng nhập mật khẩu hiện tại."})}
                    ></Input>
                    {errors.oldPassword &&
                        <p className="text-red-800 mt-1 text-sm">{errors.oldPassword.message}</p>}
                </div>
                <div className="space-y-1">
                    <label>Mật khẩu mới <span className="text-red-800">*</span></label>
                    <Input
                        className="bg-searchText border-placeholder text-placeholder"
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        {...register("newPassword", {required: "Vui lòng nhập mật khẩu mới."})}
                    ></Input>
                    {errors.newPassword &&
                        <p className="text-red-800 mt-1 text-sm">{errors.newPassword.message}</p>}
                </div>
                <div className="space-y-1">
                    <label>Xác nhận mật khẩu <span className="text-red-800">*</span></label>
                    <Input
                        className="bg-searchText border-placeholder text-placeholder"
                        type="password"
                        placeholder="Xác nhận lại mật khẩu mới "
                        {...register("confirmPassword", {
                            required: "Vui lòng xác nhận lại mật khẩu.",
                            validate: value => value === confirm || "Mật khẩu không trùng khớp"
                        })}
                    ></Input>
                    {errors.confirmPassword &&
                        <p className="text-red-800 mt-1 text-sm">{errors.confirmPassword.message}</p>}
                </div>
                <div className="w-full flex justify-center items-center">
                    <Button type="submit" className="bg-primary700 hover:bg-opacity-80 w-1/3 text-md mt-3 text-white">Tiếp
                        tục</Button>
                </div>
            </form>
        </div>
    );
};

export default ChangePasswordPage;