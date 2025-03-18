import { GeoDBAPI, SortBy } from "@/configuration/Type";

export function sortBy(params: SortBy): GeoDBAPI.City[] {
    const { type, down, array } = params;
    const sortedArray = array.sort((a, b) => {
        if (down == false) {
            try {
                if (typeof a[type] === "string" && typeof b[type] === "string") {
                    return a[type].localeCompare(b[type]);
                }
                return (a[type] as number) - (b[type] as number);
            } catch (error) {
                console.log(error);
                return (Number(a[type]) || 0) - (Number(b[type]) || 0);
            }
        } else {
            try {
                if (typeof b[type] === "string" && typeof a[type] === "string") {
                    return b[type].localeCompare(a[type]);
                }
                return (b[type] as number) - (a[type] as number);
            } catch (error) {
                console.log(error);
                return (Number(b[type]) || 0) - (Number(a[type]) || 0);
            }
        }
    });
    return sortedArray
}