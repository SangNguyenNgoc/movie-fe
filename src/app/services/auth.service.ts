import {UserManager, WebStorageStateStore} from "oidc-client-ts";
import {APP_URL, AUTH_URL, BASE_URL, END_POINTS} from "../constants/endpoints";
import Cookies from "js-cookie";
import axios from "axios";


const config = {
    authority: AUTH_URL,
    client_id: 'web-client',
    redirect_uri: `${APP_URL}/${END_POINTS.AUTH.REDIRECT}`,
    response_type: "code",
    scope: "openid",
    userStore: new WebStorageStateStore({store: window.localStorage}),
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
    try {
        const user = await userManager.signinRedirectCallback(); // Nhận thông tin user
        if (user && user.access_token) {
            Cookies.set('access_token', user.access_token)
        } else {
            console.error("No access token found in user object:", user);
        }
        return user;
    } catch (err) {
        console.error("Callback error:", err);
    }
};

export const logOut = async () => {
    try {
        const url = `${BASE_URL}/${END_POINTS.USER.URL}/${END_POINTS.USER.CHILD.LOGOUT}`
        const response = await axios.get(url, {
            headers: getAuthHeader()
        })
        Cookies.remove('access_token');
    } catch (error) {
        console.error('Error logout user:', error);
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data);
        }
        throw error
    }
}

export const getAuthHeader = () => {
    const token = Cookies.get('access_token')
    return {
        'Authorization': `Bearer ${token}`,
    }
}