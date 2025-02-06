import React from 'react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "../ui/Carousel";
import {TOption} from "../../app/types/utils/utils.types";

interface DateOptionProps {
    date: string
    dates: TOption[]
    handleChangeDate: (input: string) => void
}

const DateOption = ({date, dates, handleChangeDate}: DateOptionProps) => {

    const getBgDateItem = (value: string) => {
        return date === value ? 'bg-primary700' : ''
    }

    return (
        <div className="w-4/5 flex justify-start items-start ms-5">
            <Carousel className="w-[90%]" opts={{
                align: "center",
            }}>
                <CarouselContent className="text-label">
                    <CarouselItem key={dates[0].value} className="basis-1/5">
                        <div
                            className={`p-1 ${getBgDateItem(dates[0].value)} rounded-md text-center cursor-pointer`}
                            onClick={() => handleChangeDate(dates[0].value)}
                        >
                            <p>Hôm nay</p>
                            <p>{dates[0].label.split('-')[1]}</p>
                        </div>
                    </CarouselItem>
                    {dates.slice(1).map(option => {
                        return (
                            <CarouselItem key={option.value} className="lg:basis-1/5">
                                <div
                                    className={`p-1 ${getBgDateItem(option.value)} rounded-md text-center cursor-pointer`}
                                    onClick={() => handleChangeDate(option.value)}
                                >
                                    <p>{option.label.split('-')[0]}</p>
                                    <p>{option.label.split('-')[1]}</p>
                                </div>
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
                <CarouselPrevious className="text-label border-none -left-8"/>
                <CarouselNext className="text-label border-none -right-8"/>
            </Carousel>
        </div>
    );
};

export default DateOption;