import React from "react";
import type { CityKey, SortBy, SortCondition } from "~/type/Type";
import classes from "./sortButtons.module.scss"
const SortButtons = ({
  props,
}: {
  props: {
    sortCondition: SortCondition;
    type: CityKey;
    sortBy: (params: SortBy) => void;
  };
}) => {
  const { sortCondition, type } = props;

  return (
    <>
      <button
        className={`btn btn-sm mx-1 ${
          sortCondition.type == type && sortCondition.down
            ? "btn-primary"
            : "btn-outline-secondary"
        } ` + classes.btn_xs}
        onClick={() => props.sortBy({ type, down: true })}
      >
        <i className="bi bi-caret-up-fill" />
      </button>
      <button
        className={`btn btn-sm ${
          sortCondition.type == type && sortCondition.down == false
            ? "btn-primary"
            : "btn-outline-secondary"
        } ` + classes.btn_xs}
        onClick={() => props.sortBy({ type, down: false })}
      >
        <i className="bi bi-caret-down-fill" />
      </button>
    </>
  );
};

export default SortButtons;
