import React, {useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../ui/Dialog";
import {Button} from "../ui/Button";
import {Pencil} from "lucide-react";
import {Label} from "../ui/Label";
import {Input} from "../ui/Input";
import userService from "../../app/services/user.service";
import {validateEmail} from "../../app/services/validation.service";
import Loading from "../Loading";

export interface VerificationEmailDialogProp {
    defaultValue: string
}

const VerificationEmailDialog = ({defaultValue}: VerificationEmailDialogProp) => {

    const [input, setInput] = useState<string>('')
    const [state, setState] = useState<'init' | 'loading' | 'success'>('init')

    const handleSubmit = async () => {
        if (state === 'success') {
            setState("init")
            return
        }
        if (input === '' || input === defaultValue) {
            return
        }
        if (!validateEmail(input)) {
            alert('Email sai định dạng')
            return
        }
        try {
            setState('loading')
            await userService.updateEmail(input)
            setState('success')
        } catch (error) {
            alert('Email đã được sử dụng.')
            setState('init')
        }
    }

    return (
        <>
            {state === "loading" && <Loading/>}
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="h-4 w-6 text-label hover:text-sky-600">
                        <Pencil className="w-4 h-4"></Pencil>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] text-label bg-primary1000">
                    {state === "success" ?
                        <DialogHeader>
                            <DialogTitle>Thay đổi email</DialogTitle>
                            <DialogDescription>
                                Chúng tôi đã gửi xác nhận tới email mới của bạn, hãy kiểm tra và xác minh nhé
                            </DialogDescription>
                        </DialogHeader>
                        :
                        <>
                            <DialogHeader>
                                <DialogTitle>Thay đổi email</DialogTitle>
                                <DialogDescription>
                                    Chúng tôi sẽ gửi xác nhận tới email mới của bạn.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-3">
                                <div className="grid grid-cols-5 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Email
                                    </Label>
                                    <Input
                                        id="name"
                                        defaultValue={defaultValue}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="col-span-4 text-label bg-transparent"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handleSubmit}
                                        className="bg-primary500 text-white hover:bg-sky-700">
                                    Đồng ý
                                </Button>
                            </DialogFooter>
                        </>
                    }
                </DialogContent>
            </Dialog>
        </>

    );
};

export default VerificationEmailDialog;