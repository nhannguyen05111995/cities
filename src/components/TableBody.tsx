import { useAppSelector, useAppDispatch } from "../app/hook";
import React from "react";
import { Column, GeoDBAPI } from "@/configuration/Type";
import { setFocusCity } from "@/app/store/features/focusCity";

type TableBodyProps = {
  columns: Column[];
};

const TableBody = ({ props }: { props: TableBodyProps }) => {
  const { columns } = props;
  const cities: GeoDBAPI.City[] = useAppSelector(
    (state: { city: { value: GeoDBAPI.City[] } }) => state.city.value
  );

  const dispatch = useAppDispatch();

  return (
    <>
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
                        dispatch(setFocusCity(city));
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
    </>
  );
};

export default TableBody;
