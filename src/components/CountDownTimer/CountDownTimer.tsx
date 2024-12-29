import React, {useEffect, useState} from 'react';

interface CountdownTimerProps {
    targetDate?: Date; // Mốc thời gian cần đếm ngược đến
    durationInSeconds?: number; // Khoảng thời gian đếm ngược (giây)
    handleTimeUp: () => void
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({targetDate, durationInSeconds, handleTimeUp}) => {
    const [timeLeft, setTimeLeft] = useState<number>(0);

    useEffect(() => {
        let endTime: number;

        // Xác định mốc thời gian kết thúc
        if (targetDate) {
            endTime = targetDate.getTime();
        } else if (durationInSeconds) {
            endTime = Date.now() + durationInSeconds * 1000;
        } else {
            console.error('Either targetDate or durationInSeconds must be provided');
            return;
        }

        // Cập nhật trạng thái ngay lập tức
        const updateTimeLeft = () => {
            const now = Date.now();
            const remaining = endTime - now;

            const calculatedTimeLeft = Math.max(0, Math.ceil(remaining / 1000)); // Không cho giá trị âm
            setTimeLeft(calculatedTimeLeft);

            if (calculatedTimeLeft === 0) {
                handleTimeUp(); // Gọi hàm khi hết thời gian
            }
        };

        updateTimeLeft(); // Tính toán ngay lập tức khi component mount

        const intervalId = setInterval(updateTimeLeft, 1000); // Cập nhật mỗi giây

        return () => clearInterval(intervalId); // Xóa interval khi component bị hủy
    }, [targetDate, durationInSeconds]);

    // Format timeLeft thành HH:mm:ss
    const formatTime = (seconds: number) => {
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            <p>{timeLeft > 0 ? formatTime(timeLeft) : ''}</p>
        </div>
    );
};

export default CountdownTimer;
