import { Position } from "@/components/Map";
import { Column, SortCondition } from "./Type";

export const initialColumns: Column[] = [
    { map: true, open: true, name: "City", type: "city" },
    { map: false, open: true, name: "Country", type: "country" },
    { map: false, open: true, name: "Country code", type: "countryCode" },
    { map: false, open: true, name: "Population", type: "population" },
    { map: false, open: true, name: "Region", type: "region" },
    { map: false, open: true, name: "Region code", type: "regionCode" },
    { map: false, open: false, name: "RegionWdId", type: "regionWdId" },
];

export const defaulPosition: Position = {
    lat: 0,
    lng: 0
}

export const defaulSortCondition: SortCondition = {
    down: true,
    type: "city"
}