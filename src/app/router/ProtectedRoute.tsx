import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
} from "../../components/ui/AlertDialog";
import {login} from "../services/auth.service";
import userService from "../services/user.service";
import Loading from "../../components/Loading";
import {useNavigate} from "react-router-dom";

const ProtectedRoute = ({children}: { children: React.ReactNode }) => {
    const token: string | undefined = Cookies.get('access_token');
    const [messageDialog, setMessageDialog] = useState<string | undefined>(undefined);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                await userService.getProfileUser();
            } catch (error) {
                setMessageDialog('Phiên làm việc của bạn đã hết hạn, vui lòng đăng nhập lại để tiếp tục!');
                Cookies.remove('access_token')
            }
        }
        if (token) {
            fetchProfile()
        } else {
            setMessageDialog('Vui lòng đăng nhập để tiêp tục!')
        }
    }, [token]);

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
