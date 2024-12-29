import {TOption} from "../types/utils/utils.types";

class DateService {

    getToday = (): string => {
        const today = new Date();
        return today.toLocaleDateString('en-CA').split('T')[0];
    }

    getRemainingDaysOfWeek = (): TOption[] => {
        const today = new Date();
        const dateArray: { value: string, label: string }[] = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            const formattedDate = date.toLocaleDateString('en-CA').split('T')[0];
            dateArray.push({
                value: formattedDate,
                label: this.formatDate(formattedDate),
            });
        }
        return dateArray;
    };

    formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
        const dayName = daysOfWeek[date.getDay()]; // Lấy thứ trong tuần
        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần +1

        return `${dayName}-${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`;
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

    formatDateIncludeYear = (input: string): string => {
        const daysOfWeek = [
            'Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư',
            'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'
        ];

        // Tách các phần của chuỗi
        const [year, month, day] = input.split('-').map(Number);

        // Tạo đối tượng Date
        const date = new Date(year, month - 1, day);

        const dayOfWeek = daysOfWeek[date.getDay()];
        const formattedDate = `${day.toString().padStart(2, '0')}/${month
            .toString()
            .padStart(2, '0')}/${year}`;

        return `${dayOfWeek}, ${formattedDate}`;
    }

    addMinutesToTime(time: string, minutesToAdd: number): string {
        // Chia chuỗi giờ thành giờ, phút, giây
        const [hours, minutes, seconds] = time.split(":").map(Number);

        // Tạo đối tượng Date với giờ, phút và giây
        const date = new Date();
        date.setHours(hours, minutes, seconds);

        // Thêm số phút
        date.setMinutes(date.getMinutes() + minutesToAdd);

        // Trả về chuỗi giờ mới với định dạng HH:mm:ss
        return date.toTimeString().split(" ")[0]; // Lấy phần HH:mm:ss từ toTimeString
    }

}

const dateService: DateService = new DateService();

export default dateService;

