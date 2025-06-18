import React from 'react';
import Stepper from "../ui/Stepper";

const steps = [
    { id: 1, title: "Chọn ghế" },
    { id: 2, title: "Chọn thức ăn" },
    { id: 3, title: "Xác nhận" },
    { id: 4, title: "Thanh toán" }
]

interface BookingStepsProps {
    currStep: number
}

const BookingSteps = ({currStep}: BookingStepsProps) => {

    return (
        <div className="container mx-auto w-full md:px-16 2xl:px-36 mt-4">
            <div className="bg-hallPrimary rounded-md py-3">
                <Stepper steps={steps} currentStep={currStep}/>
            </div>
        </div>
    );
};

export default BookingSteps;