import React from "react";
import type { City, Column } from "../type/Type";

const TableBody = ({ props }: { props: { cities: City[], columns: Column[] } }) => {
  const { cities, columns } = props;
  return (
    <>
      {cities.map((city) => (
          <tr key={`table-row-${city.id}`}>
            {columns
              .filter((c) => c.open)
              .map((column, i) => (
                <td key={i}>{city[column.type]}</td>
              ))}
          </tr>
        ))}
    </>
  );
};

export default TableBody;
