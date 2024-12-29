import {TOption} from "../types/utils/utils.types";
import {TCinemaInfo} from "../types/cinema/CinemaInfo.types";

class AppUtils {
    mapDataToOptions = (data: TCinemaInfo[]): TOption[] => {
        return data.map(item => {
            return {
                value: item.slug,
                label: item.name
            }
        })
    }

    formatVND = (amount: number): string => {
        return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
    }

    debounce<T extends (...args: any[]) => void>(func: T, timeout: number): (...args: Parameters<T>) => void {
        let timer: ReturnType<typeof setTimeout>;

        return (...args: Parameters<T>): void => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), timeout);
        };
    }

}

const appUtils: AppUtils = new AppUtils();

export default appUtils;