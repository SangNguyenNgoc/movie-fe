import React, {useState} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/16/solid";


const MovieSliders = () => {

    const images: string[] = [
        'https://cdn.galaxycine.vn/media/2024/8/30/the-crow-750_1725012333706.jpg',
        'https://wallpapers.com/images/high/dope-avengers-wallpaper-4i9b267346ucs17k.webp',
        'https://cdn.galaxycine.vn/media/2024/8/30/hellboy-2024-1_1725020558577.jpg'
    ]

    const [currentIndex, setCurrentIndex] = useState(0)

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    return (
        <div className="mt-[80px] w-full flex justify-center">
            <div className="w-[90%] relative overflow-hidden">
                <div
                    className="flex w-auto transition-transform ease-out duration-500"
                    style={{transform: `translateX(-${currentIndex * 100}%)`}}
                >
                    {images.map((img) => (
                        <div className="flex-shrink-0 w-full h-[500px] flex justify-center">
                            <div
                                style={{backgroundImage: `url(${img})`}}
                                className="w-full h-full bg-center bg-no-repeat relative">
                                <div className="absolute bg-black bg-opacity-30 w-screen h-full"></div>
                                {/*<div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-black opacity-75 pointer-events-none"></div>*/}
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70 pointer-events-none w-screen"></div>
                            </div>
                        </div>

                    ))}
                </div>
                <div
                    className='absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <ChevronLeftIcon onClick={prevSlide} className="w-10 h-10 text-placeholder"/>
                </div>
                {/* Right Arrow */}
                <div
                    className='absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <ChevronRightIcon onClick={nextSlide} className="w-10 h-10 text-placeholder"/>
                </div>
                <div className="h-4 w-full absolute flex justify-center gap-x-4 bottom-5 top-auto">
                    {images.map((image, slideIndex) => {
                        return (
                            <div
                                key={slideIndex}
                                className={"text-2xl w-4 h-4 cursor-pointer rounded-full border-2 border-white " + (slideIndex === currentIndex ? "bg-textPrimary " : "bg-transparent")}
                            >
                            </div>
                        );
                    })};
                </div>
            </div>
        </div>
    );
};

export default MovieSliders;