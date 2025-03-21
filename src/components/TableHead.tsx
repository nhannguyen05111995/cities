import { Column } from "@/configuration/Type";
import SortButtons from "./SortButtons";

type TableHeadProps = {
  columns: Column[];
};
export default function TableHead({ props }: { props: TableHeadProps }) {
  const { columns } = props;
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
                }}
              />
            </th>
          ))}
      </tr>
    </thead>
  );
}
