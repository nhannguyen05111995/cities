import { GeoDBAPI, Column, SortBy, SortCondition } from "@/configuration/Type";
import React from "react";
import TableBody from "./TableBody";
import classes from "./home.module.scss";
import TableHead from "./TableHead";

type TableProps = {
  sortCondition: SortCondition;
  sortBy: (params: SortBy) => GeoDBAPI.City[];
  cities: GeoDBAPI.City[];
  columns: Column[];
  setFocusLocation: (p: GeoDBAPI.City) => void;
  loading: boolean;
  setSortCondition: (p: SortCondition) => void;
};
const Table = ({ props }: { props: TableProps }) => {
  const {
    sortCondition,
    cities,
    sortBy,
    columns,
    setFocusLocation,
    loading,
    setSortCondition,
  } = props;

  return (
    <div className={classes.table_container}>
      {loading ? (
        <div className={classes.loading}>Loading...</div>
      ) : (
        <table className="table w-100 table-striped border">
          <TableHead
            props={{
              cities,
              columns,
              setSortCondition,
              sortBy,
              sortCondition,
            }}
          />
          <TableBody props={{ cities, columns, setFocusLocation }} />
        </table>
      )}
    </div>
  );
};

export default Table;
