import * as React from "react";
import { useState, useEffect } from "react";
import Form from "@/components/Form";
import classes from "./home.module.scss";
import TableColumnsControl from "./TableColumnsControl";
import Modal from "./UI/Modal";
import dynamic from "next/dynamic";
import Table from "./Table";
import { Column, GeoDBAPI, SortCondition } from "@/configuration/Type";
import { initialColumns } from "@/configuration/Constant";
import LoadMore from "./LoadMore";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { setCity } from "@/app/store/features/city";
import { setLoading } from "@/app/store/features/loading";
import { setFocusCity } from "@/app/store/features/focusCity";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function Home() {
  const dispatch = useAppDispatch();
  const query = useAppSelector(
    (state: { query: { value: Record<string, string> } }) => state.query.value
  );
  const page = useAppSelector(
    (state: { page: { value: number } }) => state.page.value
  );
  const focusCity = useAppSelector(
    (state: { focusCity: { value: GeoDBAPI.City | null } }) =>
      state.focusCity.value
  );
  const sort = useAppSelector(
    (state: { sort: { value: SortCondition } }) => state.sort.value
  );

  const [links, setLinks] = useState<GeoDBAPI.ResponseLink[]>([]);
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  useEffect(() => {
    const fetchdata = async () => {
      dispatch(setLoading(true));
      setLinks([]);
      const sortQuery = `${!sort.down ? "-" : ""}${sort.type}`;
      const url = `/api/cities/`;
      const body = {
        offset: page,
        limit: 10,
        sort: sortQuery,
      }
      const response = await fetch(url, { method: "POST", body: JSON.stringify({...body, ...query} )});
      const json = await response.json();
      dispatch(setLoading(false));
      if (!Object.keys(json).length) {
        return;
      }

      setLinks(json.links);
      dispatch(setCity([...json.data]));
    };
    fetchdata();
  }, [page, query, sort]);

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
      <div className={classes.banner}>
        <Image src="/global.jpg" alt="Global" layout="fill" objectFit="cover" />
      </div>
      <div className="container-xxl">
        <h1 className="text-center mb-5">World cities</h1>
        <Form />
        <TableColumnsControl props={{ columns, checkBoxClicked }} />
        <Table props={{ columns }} />
        <LoadMore
          props={{
            links,
          }}
        />
        <Modal
          openModal={focusCity != null}
          closeModal={() => dispatch(setFocusCity(null))}
        >
          <Map open={focusCity != null} />
        </Modal>
      </div>
    </>
  );
}
