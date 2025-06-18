import React, {useState} from 'react';
import {Minus, Plus} from "lucide-react";

interface QuantitySelectorProps {
    currQuantity?: number
    handleMinus: () => void
    handlePlus: () => void
    maxQuantity: number
}

const QuantitySelector = ({currQuantity, handleMinus, handlePlus, maxQuantity}: QuantitySelectorProps) => {

    const [quantity, setQuantity] = useState(currQuantity ?? 0)

    const minus = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
            handleMinus();
        }
    };

    const plus = () => {
        if (quantity < maxQuantity) {
            setQuantity(quantity + 1);
            handlePlus();
        }
    };



    return (
        <div className="flex justify-end items-end h-full shadow-md">
            <div className="flex justify-center items-center text-label bg-primary800 rounded-md py-1 px-2 space-x-1">
                <button
                    className="h-4 w-4"
                    onClick={minus}
                >
                    <Minus className="h-4 w-4"/>
                </button>
                <span className="w-6 text-xs text-center">{quantity}</span>
                <button
                    className="h-4 w-4"
                    onClick={plus}
                >
                    <Plus className="h-4 w-4"/>
                </button>
            </div>
        </div>
    );
};

export default QuantitySelector;