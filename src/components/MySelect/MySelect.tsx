import React, {useEffect, useRef, useState} from 'react';
import {TOption} from "../../app/types/utils/utils.types";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid";

interface MySelectProps {
    options: TOption[];
    defaultValue: string;
    onChange: (input: string) => void;
}

const MySelect = ({defaultValue, options, onChange}: MySelectProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isDropUp, setIsDropUp] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {

        const handleScroll = () => {
            const dropdownRect = dropdownRef.current?.getBoundingClientRect();
            const spaceBelow = window.innerHeight - (dropdownRect?.bottom || 0);
            const spaceAbove = dropdownRect?.top || 0;
            const check: boolean = spaceAbove > spaceBelow;
            if (check !== isDropUp) {
                setIsDropUp(check);
            }
        }

        handleScroll();

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);

        };

    }, [isDropUp]);

    return (
        <div
            className="relative"
            onClick={toggleOpen}
            ref={dropdownRef}
        >
            <div
                className="flex justify-between bg-primary900 items-center text-label cursor-pointer border-label border-2 px-2 py-1  rounded-md">
                <input
                    value={options.find(item => item.value === defaultValue)?.label || options[0].label}
                    className="bg-transparent cursor-pointer border-transparent outline-none ring-0"
                    readOnly={true}
                />
                {isDropUp ? <ChevronUpIcon className="text-label w-5 h-5"/> :
                    <ChevronDownIcon className="text-label w-5 h-5"/>}

            </div>
            {isOpen && (
                <div
                    ref={menuRef}
                    className={`absolute w-full text-white bg-primary900 rounded-md z-50 ${
                        isDropUp ? `translate-y-[-100%] -mt-11` : `mt-2`
                    }`}
                    // style={{
                    //     marginTop: isDropUp ? `-${options.length * 46}px` : undefined, // Inline style cho margin-top
                    // }}
                    onMouseLeave={toggleOpen}
                >
                    {options.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => onChange(item.value)}
                            className="bg-transparent p-2 border-l-4 border-transparent hover:bg-textPrimary/20 hover:border-textPrimary cursor-pointer"
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MySelect;