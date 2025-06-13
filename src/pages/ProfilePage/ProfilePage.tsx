import React from 'react';
import Profile from "../../components/Profile";
import BillHistory from "../../components/BillHistory";
import useTitle from "../../hooks/use-title";

const ProfilePage = () => {

    useTitle("Thông tin tài khoản")

    return (
        <div className="flex h-full w-full justify-center bg-primary950 px-4 py-20">
            <div className="container mx-auto flex flex-col items-start justify-center gap-16 space-y-4 md:flex-row 2xl:px-16">
                <Profile/>
                <BillHistory/>
            </div>
        </div>
    );
};

export default ProfilePage;