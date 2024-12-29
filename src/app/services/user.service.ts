import {TRegister} from "../types/user/UserRegister.types";
import {BASE_URL, END_POINTS} from "../constants/endpoints";
import axios from "axios";
import {TChangePasswordRequest, TProfile} from "../types/user/UserProfile.types";
import {getAuthHeader} from "./auth.service";

const userService = {

    registerUser: async (userData: TRegister) => {
        const url = `${BASE_URL}/${END_POINTS.USER.URL}/${END_POINTS.USER.CHILD.REGISTER}`;
        try {
            await axios.post(url, {
                fullName: userData.fullname,
                email: userData.email,
                password: userData.password,
                confirmPassword: userData.confirmPassword,
            });
            return 'success';
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 409) {
                    throw new Error('Email đã được sử dụng');
                }

                throw new Error(error.response?.data?.error || 'Đã có lỗi không xác định, hãy thử lại sau');
            } else {
                console.error('Error during registration:', error);
                throw new Error('Đã có lỗi xảy ra trong quá trình đăng ký');
            }
        }
    },

    getProfileUser: async () => {
        const url = `${BASE_URL}/${END_POINTS.USER.URL}/${END_POINTS.USER.CHILD.PROFILE}`
        try {
            const response = await axios.get(url, {
                headers: getAuthHeader()
            });
            const profile: TProfile = response.data
            return profile
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error
        }
    },

    updateProfileUser: async (userData: TProfile) => {
        const url = `${BASE_URL}/${END_POINTS.USER.URL}/${END_POINTS.USER.CHILD.UPDATE}`
        try {
            const response = await axios.put(
                url,
                {
                    fullName: userData.fullName,
                    phoneNumber: userData.phoneNumber,
                    dateOfBirth: userData.dateOfBirth,
                    gender: userData.gender
                },
                {
                    headers: getAuthHeader()
                }
            );
            const profile: TProfile = response.data
            return profile
        } catch (error) {
            console.error('Error updating profile:', error);
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data);
            }
            throw error
        }
    },

    uploadAvatar: async (avatar: File) => {
        const url = `${BASE_URL}/${END_POINTS.USER.URL}/${END_POINTS.USER.CHILD.UPDATE_AVATAR}`
        try {
            const formData = new FormData();
            formData.append("avatar", avatar);
            const response = await axios.put(
                url,
                formData,
                {
                    headers: getAuthHeader()
                }
            )
            const profile: TProfile = response.data
            return profile
        } catch (error) {
            console.error('Error updating avatar:', error);
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data);
            }
            throw error
        }
    },

    updateEmail: async (newEmail: string) => {
        const url = `${BASE_URL}/${END_POINTS.USER.URL}/${END_POINTS.USER.CHILD.UPDATE_EMAIL}?email=${newEmail}`
        try {
            const response = await axios.get(url, {
                headers: getAuthHeader()
            })
            console.log(response)
        } catch (error) {
            console.error('Error updating avatar:', error);
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data);
            }
            throw error
        }
    },

    changePassword: async (request: TChangePasswordRequest | undefined) => {
        const url = `${BASE_URL}/${END_POINTS.USER.URL}/${END_POINTS.USER.CHILD.UPDATE_PASS}`
        try {
            const response = await axios.put(
                url,
                request,
                {
                    headers: getAuthHeader()
                }
            );
            return response.status
        } catch (error) {
            console.error('Error updating password:', error);
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data);
            }
            throw error
        }
    },

    enterOtpChangePassword: async (otp: string) => {
        const url = `${BASE_URL}/${END_POINTS.USER.URL}/${END_POINTS.USER.CHILD.CONFIRM_OTP_UPDATE_PASS}`
        try {
            const formData = new FormData();
            formData.append("otp", otp);
            const response = await axios.put(
                url,
                formData,
                {
                    headers: getAuthHeader()
                }
            )
            const profile: TProfile = response.data
            return profile
        } catch (error) {
            console.error('Error updating avatar:', error);
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data);
            }
            throw error
        }
    }
}

export default userService;