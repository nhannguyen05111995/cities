import React from "react";
import { Position } from "./Map";
import { GeoDBAPI, Column } from "@/configuration/Type";

type TableBodyProps = {
  cities: GeoDBAPI.City[];
  columns: Column[];
  setFocusLocation: (e: Position) => void;
};

const TableBody = ({ props }: { props: TableBodyProps }) => {
  const { cities, columns } = props;

  return (
    <tbody>
      {cities.map((city) => (
        <tr key={`table-row-${city.id}`}>
          {columns
            .filter((c) => c.open)
            .map((column, i) => (
              <td key={i}>
                {!column.map ? (
                  <span>{city[column.type]}</span>
                ) : (
                  <button
                    className="btn btn-sm btn-link"
                    onClick={() => {
                      props.setFocusLocation({
                        lng: city.longitude,
                        lat: city.latitude,
                      });
                    }}
                  >
                    {" "}
                    <i className="bi bi-geo-alt-fill mr-2"></i>
                    {city[column.type]}
                  </button>
                )}
              </td>
            ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
