"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Form from "@/components/Form";
import classes from "./home.module.scss";
import TableColumnsControl from "./TableColumnsControl";
import Modal from "./UI/Modal";
import dynamic from "next/dynamic";
import Table from "./Table";
import { sortBy } from "./utils";
import { Column, GeoDBAPI, SortCondition } from "@/configuration/Type";
import { defaulSortCondition, initialColumns } from "@/configuration/Constant";
import LoadMore from "./LoadMore";

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
  const [focusLocation, setFocusLocation] = useState<GeoDBAPI.City | undefined>();

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
    <>
      {" "}
      <img src="/global.jpg" alt="Global" className={classes.banner} />
      <div className="container-xxl">
        <h1 className="text-center mb-5">World cities</h1>
        <Form props={{ setQuery, setCities }} />
        <TableColumnsControl props={{ columns, checkBoxClicked }} />
        <Table
          props={{
            sortCondition,
            setSortCondition,
            sortBy,
            cities,
            columns,
            setFocusLocation,
            loading,
          }}
        />
        <LoadMore
          props={{
            loading,
            setPage: () => {
              setPage((prev) => prev + 10);
            },
            links,
          }}
        />
        <Modal
          openModal={focusLocation != null}
          closeModal={() => setFocusLocation(undefined)}
        >
          <Map
            open={focusLocation != null}
            focusCity={focusLocation}
          ></Map>
        </Modal>
      </div>
    </>
  );
}
