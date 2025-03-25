import { Column, GeoDBAPI } from "@/configuration/Type";
import React from "react";
import TableBody from "./TableBody";
import classes from "./home.module.scss";
import TableHead from "./TableHead";
import { useAppSelector } from "../app/hook";

type TableProps = {
  columns: Column[];
};
const Table = ({ props }: { props: TableProps }) => {
  const loading = useAppSelector(
    (state: { loading: { value: boolean } }) => state.loading.value
  );
  const { columns } = props;
  const cities: GeoDBAPI.City[] = useAppSelector(
    (state: { city: { value: GeoDBAPI.City[] } }) => state.city.value
  );

  return (
    <div className={classes.table_container}>
      {loading && cities.length == 0 ? (
        <div className={classes.loading}>Loading...</div>
      ) : cities.length > 0 ? (
        <table className="table w-100 table-striped border">
          <TableHead
            props={{
              columns,
            }}
          />
          <TableBody props={{ columns }} />
        </table>
      ) : (
        <h4 className="my-4">No city found!</h4>
      )}
    </div>
  );
};

export default Table;
