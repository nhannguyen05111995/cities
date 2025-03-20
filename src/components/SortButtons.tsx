import { GeoDBAPI, SortBy, SortCondition } from "@/configuration/Type";
import React from "react";
import classes from "./sortButtons.module.scss";

type SortButtonsProps = {
  sortCondition: SortCondition;
  setSortCondition: (p: SortCondition) => void;
  type: GeoDBAPI.CityKey;
  cities: GeoDBAPI.City[];
};
const SortButtons = ({ props }: { props: SortButtonsProps }) => {
  const { sortCondition, type, cities } = props;
  function sort(params: SortBy) {
    const { type, down } = params;
    props.setSortCondition({ type, down });
  }
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
        onClick={() => sort({ type, down: true, array: cities })}
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
        onClick={() => sort({ type, down: false, array: cities })}
      >
        <i className="bi bi-caret-down-fill" />
      </button>
    </>
  );
};

export default SortButtons;
