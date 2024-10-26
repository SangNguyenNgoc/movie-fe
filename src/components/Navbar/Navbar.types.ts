export type NavItemModel = {
    key: string;
    path?: string;
    text: string;
    dropdown: boolean
    children?: NavItemModel[]
}