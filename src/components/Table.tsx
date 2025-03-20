"use client";
import { Column, SortCondition } from "@/configuration/Type";
import React from "react";
import TableBody from "./TableBody";
import classes from "./home.module.scss";
import TableHead from "./TableHead";
import { useSelector } from "react-redux";

type TableProps = {
  sortCondition: SortCondition;
  columns: Column[];
  setSortCondition: (p: SortCondition) => void;
};
const Table = ({ props }: { props: TableProps }) => {
  const loading = useSelector((state) => state.loading.value);

  const { sortCondition, columns, setSortCondition } = props;

  return (
    <div className={classes.table_container}>
      {loading ? (
        <div className={classes.loading}>Loading...</div>
      ) : (
        <table className="table w-100 table-striped border">
          <TableHead
            props={{
              columns,
              setSortCondition,
              sortCondition,
            }}
          />
          <TableBody props={{ columns }} />
        </table>
      )}
    </div>
  );
};

export default Table;
