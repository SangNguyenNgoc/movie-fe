import {TShowData} from "../types/cinema/CinemasMoviesShows.types";

const showService = {
    classifyShowsByUniqueValues : (arr: TShowData[]) : Map<string, TShowData[]> => {
        const groups = new Map<string, TShowData[]>();
        for (const element of arr) {
            const formatKey = `${element.format.version} - ${element.format.caption}`;
            if (!groups.has(formatKey)) {
                groups.set(formatKey, []);
            }
            groups.get(formatKey)!.push(element);
        }
        return groups;
    }
}

export default showService;

