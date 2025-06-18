export const BASE_URL = process.env.REACT_APP_BASE_URL || ''
export const AUTH_URL = process.env.REACT_APP_AUTH_URL || ''
export const APP_URL = process.env.REACT_APP_APP_URL ||  ''

export const END_POINTS = {
    AUTH: {
        AUTHORIZE: 'authorize',
        TOKEN: 'token',
        REDIRECT: 'authorized',
        LOGOUT: 'logout',
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
            SEARCH: 'search',
            RATING: (movieId: string, rating: number, key: string) => `${movieId}/rating?rating=${rating}&key=${key}`
        }
    },
    USER: {
        URL: 'users',
        CHILD: {
            REGISTER: 'register',
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
            CURR_USER: 'user',
            ADD_CONCESSIONS: 'concessions'
        }
    },
    SHOW: {
        URL: 'shows'
    },
    CONCESSION: {
        URL: 'concessions',
    },
    PAYMENT: {
        URL: 'payments',
        CHILD: {
            PAY: 'redirect-url'
        }
    }
}

export const authRoute = ['/profile']