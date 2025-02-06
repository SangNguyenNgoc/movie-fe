import React, {useState} from 'react';
import {TProfile} from "../../app/types/user/UserProfile.types";
import {Label} from "../ui/Label";
import {Cake, Dna, Phone, User} from "lucide-react";
import {Input} from "../ui/Input";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/Popover";
import {Button} from "../ui/Button";
import {cn} from "../../lib/utils";
import {format} from "date-fns";
import {Calendar} from "../ui/Calendar";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../ui/Select";
import userService from "../../app/services/user.service";

interface UserInfoProps {
    info: TProfile
    toggle: () => void
    handleUpdateProfile: (newProfile: TProfile) => void
}

const UserInfo = ({info, toggle, handleUpdateProfile}: UserInfoProps) => {

    const yearOfInfo: string = info.dateOfBirth?.split('-')[0] ?? '2024'

    const [year, setYear] = useState<number>(parseInt(yearOfInfo));
    const [inputYear, setInputYear] = useState<string>(yearOfInfo);
    const [profile, setProfile] = useState<TProfile>(info)
    const [error, setError] = useState<{ fullName?: string, phoneNumber?: string }>({}); // State lưu lỗi


    const handleInputChange = (field: keyof typeof profile, value: string) => {
        setProfile((prev) => ({...prev, [field]: value}));
        if (field === "fullName" && value.trim().length > 0) {
            setError((prev) => ({...prev, fullName: undefined}));
        }
        if (field === "phoneNumber" && value.trim().length > 0) {
            setError((prev) => ({...prev, phoneNumber: undefined}));
        }
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputYear(value);

        if (/^\d{4}$/.test(value)) {
            setYear(Number(value));
        }
    };

    const isValidVietnamesePhoneNumber = (phone: string): boolean => {
        const vietnamesePhoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
        return vietnamesePhoneRegex.test(phone);
    }

    const handleSubmit = async () => {
        const newErrors: { fullName?: string, phoneNumber?: string } = {};
        if (!profile.fullName.trim()) {
            newErrors.fullName = "Tên không được để trống!";
        }
        if (profile.phoneNumber.trim()) {
            if (!isValidVietnamesePhoneNumber(profile.phoneNumber)) {
                newErrors.phoneNumber = "Số điện thoại sai định dạng"
            }
        }
        setError(newErrors)
        if (Object.keys(newErrors).length === 0) {
            console.log("Submit profile data:", profile);
            try {
                const newProfile = await userService.updateProfileUser(profile);
                handleUpdateProfile(newProfile)
            } catch (error) {
                console.log("Error while update")
            }
        }
    };

    console.log(error)

    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <div className="w-full flex items-center space-x-3">
                    <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-5 w-5 text-label"/>
                    </Label>
                    <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full h-8 outline-none text-label bg-transparent focus:outline-none focus:outline-sky-600"
                        defaultValue={profile.fullName}
                        autoFocus={true}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                    />
                </div>
                {error.fullName && (
                    <p className="text-red-500 text-xs ms-8">* {error.fullName}</p>
                )}
            </div>
            <div className="space-y-1">
                <div className="flex items-center space-x-3">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-label"/>
                    </Label>
                    <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="h-8 w-full bg-transparent text-label"
                        value={profile.phoneNumber ?? ''}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    />
                </div>
                {error.phoneNumber && (
                    <p className="text-red-500 text-xs ms-8">* {error.phoneNumber}</p>
                )}
            </div>
            <div className="flex items-center text-white space-x-3">
                <Label htmlFor="phone" className="flex items-center gap-2">
                    <Cake className="h-5 w-5 text-label"/>
                </Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full h-8 font-normal justify-start px-3 py-2",
                                !profile.dateOfBirth && "text-muted-foreground"
                            )}
                        >
                            {profile.dateOfBirth ? format(profile.dateOfBirth, "dd/MM/yyyy") : "Pick a date"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-primary1000">
                        <Input
                            id="dateOfBirth"
                            type="number"
                            placeholder="Enter a year"
                            className="h-8 m-4 w-[88%] max-w-full bg-transparent text-label"
                            value={inputYear}
                            onChange={handleYearChange}
                        />
                        <Calendar
                            key={year}
                            mode="single"
                            selected={new Date(profile.dateOfBirth ? profile.dateOfBirth : '')}
                            onSelect={(d) => handleInputChange('dateOfBirth', format(d ? d : new Date(), 'yyyy-MM-dd'))}
                            initialFocus
                            className={"text-white border-0"}
                            fromYear={year}
                            toYear={year}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex items-center space-x-3">
                <Label htmlFor="phone" className="flex items-center gap-2">
                    <Dna className="h-5 w-5 text-label"/>
                </Label>
                <Select value={profile.gender}
                        onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger className="w-full h-8 text-label">
                        <SelectValue placeholder="Giới tính"/>
                    </SelectTrigger>
                    <SelectContent className="bg-primary1000 text-label">
                        <SelectGroup>
                            <SelectItem value="MALE">Nam</SelectItem>
                            <SelectItem value="FEMALE">Nữ</SelectItem>
                            <SelectItem value="UNKNOWN">Khác</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex w-full gap-2 text-white text-sm">
                <button
                    className="rounded-md px-4 py-1 bg-green-800 text-white hover:bg-green-700 border-green-700 border"
                    onClick={handleSubmit}
                >
                    Lưu
                </button>
                <button
                    className="rounded-md px-4 py-1 bg-gray-800 text-label hover:bg-gray-700 border-gray-600 border"
                    onClick={toggle}
                >
                    Hủy
                </button>
            </div>
        </div>
    );
};

export default UserInfo;