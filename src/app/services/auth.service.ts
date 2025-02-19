import {UserManager} from "oidc-client-ts";
import {APP_URL, AUTH_URL, END_POINTS} from "../constants/endpoints";
import Cookies from "js-cookie";
import axios from "axios";


const config = {
    authority: AUTH_URL,
    client_id: 'web-client',
    redirect_uri: `${APP_URL}/${END_POINTS.AUTH.REDIRECT}`,
    response_type: "code",
    scope: "openid",
};

const userManager = new UserManager(config);

export const login = async () => {
    try {
        await userManager.signinRedirect(); // Redirect to login page
    } catch (err) {
        console.error("Login error:", err);
    }
};

export const handleCallback = async () => {
    // try {
    //     const user = await userManager.signinRedirectCallback(); // Nhận thông tin user
    //     console.log(user)
    //     if (user && user.access_token) {
    //         Cookies.set('access_token', user.access_token)
    //     } else {
    //         console.error("No access token found in user object:", user);
    //     }
    //     return user;
    // } catch (err) {
    //     console.error("Callback error:", err);
    // }
    await userManager.signinRedirectCallback(); // Nhận thông tin user
};

export const logOut = async () => {
    try {
        const url = `${AUTH_URL}/${END_POINTS.AUTH.LOGOUT}`
        await axios.get(url, {
            headers: await getAuthHeader()
        })
        Cookies.remove('access_token');
        console.log("Successfully log out")
    } catch (error) {
        console.error('Error logout user:', error);
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data);
        }
    }
    await userManager.removeUser()
    await userManager.signoutRedirectCallback()
}

export const getAuthHeader = async () => {
    const user = await userManager.getUser()
    return {
        'Authorization': `Bearer ${user?.access_token}`,
    }
}

export const checkUser = async () => {
    const user = await userManager.getUser()
    return user !== null
}