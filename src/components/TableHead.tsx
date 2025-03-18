import { Column, GeoDBAPI, SortBy, SortCondition } from "@/configuration/Type";
import { Position } from "./Map";
import SortButtons from "./SortButtons";

type TableHeadProps = {
  cities: GeoDBAPI.City[];
  columns: Column[];
  setFocusLocation: (e: Position) => void;
  setSortCondition: (e: SortCondition) => void;
  sortBy: (params: SortBy) => GeoDBAPI.City[];
  sortCondition: SortCondition;
};
export default function TableHead({ props }: { props: TableHeadProps }) {
  const { columns, sortCondition, sortBy, cities, setSortCondition } = props;
  return (
    <thead style={{ position: "sticky", top: 0 }}>
      <tr>
        {columns
          .filter((column) => column.open)
          .map(({ name, type }) => (
            <th scope="col" key={`table-column-${type}`}>
              {name}{" "}
              <SortButtons
                props={{
                  type,
                  sortCondition,
                  sortBy,
                  cities,
                  setSortCondition,
                }}
              />
            </th>
          ))}
      </tr>
    </thead>
  );
}
