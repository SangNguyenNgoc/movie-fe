import React, {useEffect, useState} from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
} from "../../components/ui/AlertDialog";
import {checkUser, login} from "../services/auth.service";
import userService from "../services/user.service";
import Loading from "../../components/Loading";
import {useNavigate} from "react-router-dom";

const ProtectedRoute = ({children}: { children: React.ReactNode }) => {

    const [messageDialog, setMessageDialog] = useState<string | undefined>(undefined);
    const navigate = useNavigate()

    const check = async () => {
        return await checkUser()
    }

    useEffect(() => {
        const fetchProfile = async () => {
            if (await check()) {
                try {
                    await userService.getProfileUser();
                } catch (error) {
                    setMessageDialog('Phiên làm việc của bạn đã hết hạn, vui lòng đăng nhập lại để tiếp tục!');
                }
            } else {
                setMessageDialog('Vui lòng đăng nhập để tiêp tục!')
            }
        }
        fetchProfile()
    }, []);

    const goBackOrHome = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    return (
        <>
            {messageDialog === undefined ? children :
                <>
                    <Loading/>
                    <AlertDialog open={true}>
                        <AlertDialogContent className="bg-primary1000 text-label border-label">
                            <AlertDialogHeader>
                                <AlertDialogDescription>
                                    {messageDialog}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={goBackOrHome} className="border-label outline-none">
                                    Hủy
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={login} className="bg-primary500">
                                    Đăng nhập
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            }
        </>
    )
};

export default ProtectedRoute;
