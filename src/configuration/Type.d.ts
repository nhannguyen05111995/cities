
export interface FilterFormDataBody {
    [key: string]: string;
}
export type Column = {
    open: boolean;
    name: string;
    type: CityKey;
    map: boolean
};
export type SortCondition = {
    type: CityKey;
    down: boolean;
};
export type SortBy = SortCondition & {
    array: City[];
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
    type CityKey = "city" | 'country' | "name" | "countryCode" | "region" | 'regionCode' | 'regionWdId' | 'wikiDataId' | 'latitude' | 'longitude' | 'population' | 'type'

    interface ResponseLink {
        rel: string;
        href: string;
    };
    interface Metadata { currentOffset: number, totalCount: number }
}