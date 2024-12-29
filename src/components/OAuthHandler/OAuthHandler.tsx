import React from 'react';
import {login} from "../../app/services/auth.service";
import Loading from "../Loading";

const OAuthHandler = () => {

    login()

    return (
        <Loading/>
    );
};

export default OAuthHandler;