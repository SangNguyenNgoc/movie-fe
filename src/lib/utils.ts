// Tạo file `utils.ts` trong thư mục `lib`
// lib/utils.ts

import {twMerge} from "tailwind-merge";
import {clsx} from "clsx";

export function cn(...classes: (string | undefined | null | boolean)[]) {
    return twMerge(clsx(...classes))
}
