import React from 'react';
import QuantitySelector from "../ui/QuantitySelector";
import {TConcessionInfo} from "../../app/types/concession/ConcessionInfo.types";
import {useBooking} from "../../contexts/booking-context/booking-context";

interface ConcessionItemProps {
    product: TConcessionInfo
}

const ConcessionItem = ({product}: ConcessionItemProps) => {

    const {handleSelectConcession, bookingState} = useBooking()

    const handleMinus = () => {
        handleSelectConcession(product.id, product.name, product.price, false)
    }

    const handlePlus = () => {
        handleSelectConcession(product.id, product.name, product.price, true)
    }

    const quantity = bookingState.selectedConcessions.find(s => s.id === product.id)?.amount

    return (
        <div className="flex justify-start h-20 items-center">
            <div className="relative w-32 flex-shrink-0 -ms-4">
                <img src={product.image || "/placeholder.svg"} alt={product.name}
                     className="object-contain"/>
            </div>
            <div className="flex-1 text-label text-sm">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{product.description}</p>
                <div className="mt-2 font-medium">Giá: {product.price.toLocaleString()} đ</div>
            </div>
            <QuantitySelector currQuantity={quantity} handleMinus={handleMinus} handlePlus={handlePlus} maxQuantity={product.maxQuantity}/>
        </div>
    );
};

export default ConcessionItem;