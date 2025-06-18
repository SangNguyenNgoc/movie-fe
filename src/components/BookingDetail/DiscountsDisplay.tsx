import React from 'react';
import {ChevronDown} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from '../ui/Card';
import {Label} from "../ui/Label";
import {Input} from "../ui/Input";
import {Button} from "../ui/Button";

const DiscountsDisplay = () => {
    return (
        <Card className="border-none bg-hallPrimary rounded-md">
            <CardHeader className="-mb-3">
                <CardTitle className="text-lg font-semibold text-label font-comfortaa">Khuyến mãi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="promo-code" className="text-sm font-medium text-label">
                        Mã khuyến mãi
                    </Label>
                    <div className="flex gap-4 text-label">
                        <Input id="promo-code" placeholder="Nhập mã khuyến mãi" className="flex-1 bg-transparent border-placeholder"/>
                        <Button className="bg-primary bg-opacity-80 hover:bg-opacity-60 px-6">Áp Dụng</Button>
                    </div>
                    <p className="text-xs text-placeholder">Lưu ý: Có thể áp dụng nhiều vouchers vào 1 lần thanh
                        toán</p>
                </div>

                <div className="space-y-6 text-label">
                    <button
                        className="flex items-center justify-between w-full text-left text-sm font-medium ">
                        Khuyến mãi của bạn
                        <ChevronDown className="h-4 w-4"/>
                    </button>

                    <button
                        className="flex items-center justify-between w-full text-left text-sm font-medium">
                        Áp dụng điểm Stars
                        <ChevronDown className="h-4 w-4"/>
                    </button>
                </div>
            </CardContent>
        </Card>
    )
};

export default DiscountsDisplay;