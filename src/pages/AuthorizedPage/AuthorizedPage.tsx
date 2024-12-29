import React, {useEffect} from 'react';
import {handleCallback} from "../../app/services/auth.service";
import Loading from "../../components/Loading";
import Cookies from "js-cookie";
import useTitle from "../../hooks/use-title";

const AuthorizedPage = () => {

    useTitle('Đang xác thực...')

    useEffect(() => {
        const handle = async () => {
            await handleCallback()
            window.location.href = Cookies.get('recent_url') ?? '/'
        }
        handle()
    }, []);

    return (
        <Loading/>
    );
};

export default AuthorizedPage;