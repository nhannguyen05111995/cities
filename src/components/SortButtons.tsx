import { useAppDispatch, useAppSelector } from "@/app/hook";
import { setSortValue } from "@/app/store/features/sort";
import { GeoDBAPI, SortCondition } from "@/configuration/Type";
import React from "react";
import classes from "./sortButtons.module.scss";

type SortButtonsProps = {
  type: GeoDBAPI.CityKey;
};
const SortButtons = ({ props }: { props: SortButtonsProps }) => {
  const dispatch = useAppDispatch();
  const sortCondition = useAppSelector(
    (state: { sort: { value: SortCondition } }) => state.sort.value
  );
  const { type } = props;

  return (
    <>
      <button
        className={
          `btn btn-sm mx-1 ${
            sortCondition.type == type && sortCondition.down
              ? "btn-primary"
              : "btn-outline-secondary"
          } ` + classes.btn_xs
        }
        onClick={() => dispatch(setSortValue({ type, down: true }))}
      >
        <i className="bi bi-caret-up-fill" />
      </button>
      <button
        className={
          `btn btn-sm ${
            sortCondition.type == type && sortCondition.down == false
              ? "btn-primary"
              : "btn-outline-secondary"
          } ` + classes.btn_xs
        }
        onClick={() => dispatch(setSortValue({ type, down: false }))}
      >
        <i className="bi bi-caret-down-fill" />
      </button>
    </>
  );
};

export default SortButtons;
