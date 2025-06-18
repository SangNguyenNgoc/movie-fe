import React from 'react';
import {Card, CardContent} from "../ui/Card";
import {AlertTriangle} from "lucide-react";

const ProjectDisclaimer = () => {
    return (
        <Card className="bg-yellow-100 border-yellow-300 text-yellow-900 shadow-md rounded-md mt-10 py-2">
            <CardContent className="flex items-start gap-3 px-4">
                <AlertTriangle className="mt-1 w-5 h-5 text-yellow-700 flex-shrink-0" />
                <div className="text-sm">
                    <strong>Lưu ý:</strong> Đây là <span className="font-medium">đồ án sinh viên</span> nhằm mục đích học tập.
                    Trang web <span className="italic">không</span> cung cấp chức năng thanh toán, mua bán thực tế.
                    Mọi thông tin và giao diện chỉ mang tính chất minh họa.
                </div>
            </CardContent>
        </Card>
    );
};

export default ProjectDisclaimer;