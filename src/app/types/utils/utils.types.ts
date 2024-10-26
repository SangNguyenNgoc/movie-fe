export type ListResponse<T> = {
    size: number,
    data: T[]
}

export type PageResponse<T> = {
    size: number,
    totalPages: number,
    data: T[]
}

export type TOption = {
    value: string,
    label: string
}