import React from 'react';
import {TImage} from "../../app/types/movie/MovieDetail.types";
import {Dialog, DialogContent, DialogTrigger} from "../ui/Dialog";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "../ui/Carousel";
import Autoplay from "embla-carousel-autoplay";

interface ListImageProps {
    images: TImage[]
}

const ListImage = ({images} : ListImageProps) => {
    return (
        <div className="mt-10 ms-5">
            <div
                className="font-comfortaa text-[18px] text-label border-l-4 border-textPrimary ps-2">
                Một số hình ảnh
            </div>
            <div className="mt-5">
                <Dialog>
                    <DialogTrigger asChild>
                        <Carousel
                            className=""
                            opts={{
                                align: "center",
                                loop: true,
                            }}
                            plugins={[
                                Autoplay({
                                    delay: 4000
                                }),
                            ]}
                        >
                            <CarouselContent className="text-label cursor-pointer">
                                {images.map((item, index) => {
                                    return (
                                        <CarouselItem key={index}
                                                      className="basis-1/3 flex justify-start items-center">
                                            <img src={item.path} alt={''} className="h-48"/>
                                        </CarouselItem>
                                    )
                                })}
                            </CarouselContent>
                        </Carousel>
                    </DialogTrigger>
                    <DialogContent
                        className="max-w-full w-3/4 h-5/6 border-none text-label flex justify-center items-center">
                        <Carousel
                            className="w-[90%]"
                            opts={{
                                align: "center",
                                loop: true,
                            }}
                        >
                            <CarouselContent className="text-label">
                                {images.map((item, index) => {
                                    return (
                                        <CarouselItem key={index} className="flex justify-center items-center">
                                            <img src={item.path} alt={''}/>
                                        </CarouselItem>
                                    )
                                })}
                            </CarouselContent>
                            <CarouselPrevious className="border-none bg-placeholder hover:bg-gray-500"/>
                            <CarouselNext className="border-none bg-placeholder hover:bg-gray-500"/>
                        </Carousel>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default ListImage;