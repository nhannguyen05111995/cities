import { Column } from "@/configuration/Type";
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

  return (
    <div className={classes.table_container}>
      {loading ? (
        <div className={classes.loading}>Loading...</div>
      ) : (
        <table className="table w-100 table-striped border">
          <TableHead
            props={{
              columns,
            }}
          />
          <TableBody props={{ columns }} />
        </table>
      )}
    </div>
  );
};

export default Table;
