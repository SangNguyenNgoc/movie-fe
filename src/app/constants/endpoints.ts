export const BASE_URL = `http://localhost:8080/api/v1`
export const AUTH_URL = `http://localhost:8080`
export const APP_URL = `http://localhost:3000`

export const END_POINTS = {
    AUTH: {
        AUTHORIZE: 'authorize',
        TOKEN: 'token',
        REDIRECT: 'authorized'
    },
    CINEMA: {
        URL: 'cinemas',
        CHILD: {
            HOME: 'home',
            SHOWS: 'shows'
        }
    },
    FORMAT: {
        URL: 'formats',
    },
    MOVIE: {
        URL: 'movies',
        CHILD: {
            HOME: 'home',
            SEARCH: 'search'
        }
    },
    USER: {
        URL: 'users',
        CHILD: {
            REGISTER: 'register',
            LOGOUT: 'logout',
            PROFILE: 'profile',
            UPDATE: 'information',
            UPDATE_AVATAR: 'avatar',
            UPDATE_EMAIL: 'email',
            UPDATE_PASS: 'change-password',
            CONFIRM_OTP_UPDATE_PASS: 'password'
        }
    },
    BILL: {
        URL: 'bills',
        CHILD: {
            CURR_USER: 'user'
        }
    },
    SHOW: {
        URL: 'shows'
    }
}

export const authRoute = ['/profile']