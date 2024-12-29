export type TProfile = {
    id: string
    createDate: string
    fullName: string
    email: string
    dateOfBirth?: string
    avatar: string
    phoneNumber: string
    gender: string
}

export type TChangePasswordRequest = {
    oldPassword: string
    newPassword: string
    confirmPassword: string
}