import React from 'react';
import Profile from "../../components/Profile";
import BillHistory from "../../components/BillHistory";
import useTitle from "../../hooks/use-title";

const ProfilePage = () => {

    useTitle("Thông tin cá nhân")

    return (
        <div className="flex h-full w-full justify-center bg-primary950 px-4 py-20 min-h-screen">
            <div className="container mx-auto flex flex-col items-start justify-center gap-24 space-y-4 md:flex-row">
                <Profile/>
                <BillHistory/>
            </div>
        </div>
    );
};

export default ProfilePage;