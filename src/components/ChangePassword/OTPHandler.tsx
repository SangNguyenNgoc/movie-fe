import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {CircleChevronLeftIcon, InboxIcon} from "lucide-react";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "../ui/InputOTP";
import {REGEXP_ONLY_DIGITS} from "input-otp";
import CountDownTimer from "../CountDownTimer";

interface OtpHandlerProp {
    handleOTP: (otp: string) => void
    handleResendOTP: () => Promise<void>
}

const OtpHandler = ({handleOTP, handleResendOTP}: OtpHandlerProp) => {

    const [allowReSend, setAllowReSend] = useState(false)

    const handleAllowReSend = () => {
        setAllowReSend(true)
    }

    const handleReSend = async () => {
        await handleResendOTP()
        setAllowReSend(false)
    }

    return (
        <div className="bg-loginBackground flex justify-center items-start pt-32 h-screen relative">
            <div className="absolute left-7 top-5">
                <Link className="font-comfortaa text-primary text-[16px] flex space-x-3" to={'/profile'}>
                    <CircleChevronLeftIcon></CircleChevronLeftIcon>
                    <p className="fa-solid fa-door-open text-primary text-[16px]"></p> Quay lại
                </Link>
            </div>

            <div className="w-1/3 space-y-5">
                <div
                    className="text-label font-comfortaa text-lg w-full text-center flex flex-col items-center gap-y-3">
                    <InboxIcon className="text-primary w-14 h-14"></InboxIcon>
                    <p>Chúng tôi đã gửi cho bạn một OTP qua email, hãy nhập nó để xác nhận đổi mật khẩu.</p>
                </div>
                <div className="w-full flex justify-center items-center">
                    <InputOTP
                        maxLength={6} pattern={REGEXP_ONLY_DIGITS} onChange={(e) => handleOTP(e)} autoFocus={true}
                    >
                        <InputOTPGroup className="text-label">
                            <InputOTPSlot index={0} className="w-16 h-16 text-3xl"/>
                            <InputOTPSlot index={1} className="w-16 h-16 text-3xl"/>
                            <InputOTPSlot index={2} className="w-16 h-16 text-3xl"/>
                            <InputOTPSlot index={3} className="w-16 h-16 text-3xl"/>
                            <InputOTPSlot index={4} className="w-16 h-16 text-3xl"/>
                            <InputOTPSlot index={5} className="w-16 h-16 text-3xl"/>
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <div
                    className="text-center font-comfortaa text-sm text-label w-full flex justify-center items-center space-x-1.5">
                    <p>Bạn chưa nhận được OTP?</p>
                    {allowReSend ?
                        <p className="text-primary cursor-pointer hover:underline" onClick={handleReSend}>Gửi
                            lại. </p> :
                        <div className="flex justify-center items-center space-x-1">
                            <p>Gửi lại trong</p>
                            <CountDownTimer durationInSeconds={120} handleTimeUp={handleAllowReSend}></CountDownTimer>
                        </div>
                    }
                </div>

            </div>

        </div>
    );
};

export default OtpHandler;