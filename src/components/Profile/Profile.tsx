import React, {useEffect, useState} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from '../ui/Avatar';
import {Mail, Settings} from "lucide-react";
import {Button} from "../ui/Button";
import {Label} from "../ui/Label";
import {TProfile} from "../../app/types/user/UserProfile.types";
import userService from "../../app/services/user.service";
import Loading from "../Loading";
import UserInfo from "./UserInfo";
import {Input} from "../ui/Input";
import VerificationEmailDialog from "./VerificationEmailDialog";
import {format} from "date-fns";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const [editProfile, setEditProfile] = useState(false)
    const [profile, setProfile] = useState<TProfile>()
    const navigate = useNavigate();

    const toggleEditProfile = () => {
        if (editProfile) {
            fetchData()
        }
        setEditProfile(!editProfile)
    }

    const fetchData = async () => {
        try {
            const data: TProfile = await userService.getProfileUser()
            if (data) {
                setProfile(data)
            }
        } catch (error) {
            console.log('Invalid token')
        }

    }

    useEffect(() => {
        fetchData()
    }, []);

    const handleSetProfile = (newProfile: TProfile) => {
        setProfile(newProfile)
    }

    const handleChangeAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const p: TProfile = await userService.uploadAvatar(file)
            setProfile(p)
        }
    }

    console.log(profile)


    return (
        profile ?
            <div className="space-y-4 w-[22%]">
                <div
                    className="flex items-center border-b border-label pb-3 flex-col space-x-0 space-y-4">
                    <div className="rounded-full flex justify-center items-center w-full relative max-w-80">
                        <Avatar className="h-fit w-full max-w-80">
                            <AvatarImage src={profile.avatar} alt="@shadcn"/>
                            <AvatarFallback>User</AvatarFallback>
                        </Avatar>
                        <label htmlFor="avatar"
                               className="absolute flex justify-center items-center h-10 w-10 bottom-10 right-0 border border-placeholder rounded-full bg-primary950 cursor-pointer hover:bg-gray-700">
                            <Settings className="h-6 w-6 text-label"></Settings>
                        </label>
                        <Input id="avatar" type="file" className="hidden" accept="image/*"
                               onChange={handleChangeAvatar}/>
                    </div>
                    <div className="text-label md:w-full md:space-y-2">
                        <h2 className="font-inter text-2xl">{profile.fullName}</h2>
                        <p className="font-inter text-md text-label">Là thành viên
                            từ: {format(profile.createDate, "dd/MM/yyyy")}</p>
                    </div>
                    <div className="flex justify-between items-center space-x-3 w-full">
                        <div className="flex justify-start items-center space-x-4">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="h-5 w-5 text-label"/>
                            </Label>
                            <p className="text-label text-sm">{profile.email}</p>
                        </div>
                        <VerificationEmailDialog defaultValue={profile.email}/>
                    </div>
                </div>
                {editProfile || (
                    <div className="space-y-2">
                        <Button
                            className="h-8 w-full bg-gray-900 text-label hover:bg-gray-800 border-gray-700 border"
                            onClick={toggleEditProfile}
                        >
                            Chỉnh sửa thông tin
                        </Button>

                        <Button
                            className="h-8 w-full bg-gray-900 text-label hover:bg-gray-800 border-gray-700 border"
                            onClick={() => navigate('/change-password')}
                        >
                            Đổi mật khẩu
                        </Button>
                    </div>
                )}
                {editProfile && (
                    <UserInfo info={profile} toggle={toggleEditProfile} handleUpdateProfile={handleSetProfile}/>
                )}
            </div> :
            <div className="h-screen w-1/4">
                <Loading/>
            </div>
    )
}

export default Profile;