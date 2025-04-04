
export interface FilterFormDataBody {
    [key: string]: string;
}
export type Column = {
    open: boolean;
    name: string;
    type: keyof GeoDBAPI.City;
    map: boolean
};
export type SortCondition = {
    type: keyof GeoDBAPI.City;
    down: boolean;
};
export type SortBy = SortCondition & {
    array?: City[];
};

export namespace GeoDBAPI {

    interface City {
        city: string;
        country: string;
        name: string;
        countryCode: string;
        region: string;
        regionCode: string;
        regionWdId: string;
        wikiDataId: string;
        id: number;
        latitude: number;
        longitude: number;
        population: number;
        type: string;
    };
    type CityKey = keyof City

    interface ResponseLink {
        rel: string;
        href: string;
    };
    interface Metadata { currentOffset: number, totalCount: number }
    interface Country {
        capital: string
        code: string
        callingCode: string
        currencyCodes: string[]
        flagImageUri: string;
        name: string
        numRegions: number
        wikiDataId: string
    }
}