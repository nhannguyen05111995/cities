"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Form from "@/components/Form";
import classes from "./home.module.scss";
import TableColumnsControl from "./TableColumnsControl";
import Modal from "./UI/Modal";
import dynamic from "next/dynamic";
import { Position } from "./Map";
import Table from "./Table";
import { sortBy } from "./utils";
import { Column, GeoDBAPI, SortCondition } from "@/configuration/Type";
import {
  defaulPosition,
  defaulSortCondition,
  initialColumns,
} from "@/configuration/Constant";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function Home() {
  const [cities, setCities] = useState<GeoDBAPI.City[]>([]);
  const [page, setPage] = useState<number>(10);
  const [links, setLinks] = useState<GeoDBAPI.ResponseLink[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortCondition, setSortCondition] =
    useState<SortCondition>(defaulSortCondition);
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [query, setQuery] = useState<string>("");
  const [focusLocation, setFocusLocation] = useState<Position>(defaulPosition);

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      const url = `/api/cities/?offset=${page}&limit=10&query=${query}`;
      const response = await fetch(url);
      const json = await response.json();
      setLoading(false);

      if (!Object.keys(json).length || "errors" in json) {
        alert("Something went wrong, try again!");
        return;
      }
      const sortedArray = sortBy({
        ...sortCondition,
        array: [...cities, ...json.data],
      });
      setCities([...sortedArray]);
      setLinks(json.links);
    };
    fetchdata();
  }, [page, query]);

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
      <Table
        props={{
          sortCondition,
          setSortCondition,
          sortBy,
          cities,
          columns,
          focusLocation,
          setFocusLocation,
          loading,
        }}
      />
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
      <Modal
        openModal={focusLocation.lat != 0}
        closeModal={() => setFocusLocation(defaulPosition)}
      >
        <Map open={focusLocation.lat != 0} location={focusLocation}></Map>
      </Modal>
    </div>
  );
}
