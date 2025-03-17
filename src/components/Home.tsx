"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Form from "@/components/Form";
import SortButtons from "@/components/SortButtons";
import TableBody from "@/components/TableBody";
import type {
  City,
  Column,
  ResponseLink,
  SortBy,
  SortCondition,
} from "@/type/Type";
import classes from "./home.module.scss";
import TableColumnsControl from "./TableColumnsControl";

const initialColumns: Column[] = [
  { open: true, name: "City", type: "city" },
  { open: true, name: "Country", type: "country" },
  { open: true, name: "Country code", type: "countryCode" },
  { open: true, name: "Population", type: "population" },
  { open: true, name: "Region", type: "region" },
  { open: true, name: "Region code", type: "regionCode" },
  { open: false, name: "RegionWdId", type: "regionWdId" },
];
function Loading() {
  return <div className={classes.loading}>Loading...</div>;
}
export default function Home() {
  const [cities, setCities] = useState<City[]>([]);
  const [page, setPage] = useState<number>(10);
  const [links, setLinks] = useState<ResponseLink[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortCondition, setSortCondition] = useState<SortCondition>({
    type: "city",
    down: true,
  });
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [query, setQuery] = useState<string>("");
  const fetchdata = async () => {
    setLoading(true);

    const url = `/api/cities/?offset=${page}&limit=10&query=${query}`;
    const response = await fetch(url);
    const json = await response.json();
    setLoading(false);

    if (!Object.keys(json).length) return;
    sortBy({ ...sortCondition, array: [...cities, ...json.data] });
    setLinks(json.links);
  };

  useEffect(() => {
    fetchdata();
  }, [page, query]);

  function sortBy(params: SortBy) {
    const { type, down, array = cities } = params;
    const sortedArray = array.sort((a, b) => {
      if (down == false) {
        try {
          if (typeof a[type] === "string" && typeof b[type] === "string") {
            return a[type].localeCompare(b[type]);
          }
          return (a[type] as number) - (b[type] as number);
        } catch (error) {
          return (Number(a[type]) || 0) - (Number(b[type]) || 0);
        }
      } else {
        try {
          if (typeof b[type] === "string" && typeof a[type] === "string") {
            return b[type].localeCompare(a[type]);
          }
          return (b[type] as number) - (a[type] as number);
        } catch (error) {
          return (Number(b[type]) || 0) - (Number(a[type]) || 0);
        }
      }
    });

    setCities([...sortedArray]);
    setSortCondition({ type, down });
  }

  function checkBoxClicked(event: React.ChangeEvent<HTMLInputElement>) {
    const newColumns = columns.map((column) => {
      if (column.type === event.target.id) {
        return { ...column, open: !column.open };
      } else {
        return column;
      }
    });
    setColumns([...newColumns]);
  }

  return (
    <div className="container">
      <h1>Cities</h1>
      <Form props={{ setQuery, setCities }} />
      <TableColumnsControl props={{ columns, checkBoxClicked }} />
      <div className={classes.table_container}>
        {loading && <Loading />}
        <table className="table w-100 table-striped border">
          <thead style={{ position: "sticky", top: 0 }}>
            <tr>
              {columns
                .filter((column) => column.open)
                .map(({ name, type }) => (
                  <th scope="col" key={`table-column-${type}`}>
                    {name}{" "}
                    <SortButtons props={{ type, sortCondition, sortBy }} />
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            <TableBody props={{ cities, columns }} />
          </tbody>
        </table>
      </div>
      <div className={classes.control}>
        {links && links.find((link) => link.rel == "next") && (
          <button
            disabled={loading}
            className="btn btn-outline-primary btn-sm ml-3"
            onClick={() => {
              setPage((prev) => (prev = prev + 10));
            }}
          >
            {!loading ? "Load more" : "🌀 Loading..."}
          </button>
        )}
      </div>
    </div>
  );
}
