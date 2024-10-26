import {TOption} from "../types/utils/utils.types";
import {TCinemaInfo} from "../types/cinema/CinemaInfo.types";

class AppUtils {
    mapDataToOptions = (data :TCinemaInfo[]): TOption[] => {
        return data.map(item => {
            return {
                value: item.slug,
                label: item.name
            }
        })
    }
}

const appUtils: AppUtils = new AppUtils();

export default appUtils;