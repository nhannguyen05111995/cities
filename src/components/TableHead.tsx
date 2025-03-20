import { Column, GeoDBAPI, SortCondition } from "@/configuration/Type";
import SortButtons from "./SortButtons";

type TableHeadProps = {
  cities: GeoDBAPI.City[];
  columns: Column[];
  setSortCondition: (e: SortCondition) => void;
  sortCondition: SortCondition;
};
export default function TableHead({ props }: { props: TableHeadProps }) {
  const { columns, sortCondition, cities, setSortCondition } = props;
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
