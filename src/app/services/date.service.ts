import {TOption} from "../types/utils/utils.types";

class DateService {

    getToday = (): string => {
        const today = new Date();
        today.setDate(today.getDate())
        return today.toISOString().split('T')[0];
    }

    getRemainingDaysOfWeek = (): TOption[] => {
        const today = new Date();
        today.setDate(today.getDate())
        const dateArray: {value: string, label: string}[] = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const formattedDate = date.toISOString().split('T')[0];
            dateArray.push({
                value: formattedDate,
                label: this.formatDate(formattedDate),
            });
        }
        return dateArray;
    };

    formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const daysOfWeek = [ 'Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
        const dayName = daysOfWeek[date.getDay()]; // Lấy thứ trong tuần
        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần +1

        return `${dayName} ${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`;
    };

    convertMinutesToHours(minutes: number) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        return `${hours} giờ ${mins} phút`
    }

    cutFromLastColon(input: string) {
        const lastIndex = input.lastIndexOf(':');
        if (lastIndex === -1) {
            return input;
        }
        return input.substring(0, lastIndex);
    }
}

const dateService: DateService = new DateService();

export default dateService;

