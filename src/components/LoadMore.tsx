"use client";
import { GeoDBAPI } from "@/configuration/Type";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { next, prev } from "../app/store/features/page";

export default function LoadMore({
  props,
}: {
  props: {
    links: GeoDBAPI.ResponseLink[];
  };
}) {
  const loading = useAppSelector((state: { loading: { value: boolean } }) => state.loading.value);

  const { links } = props;
  const dispatch = useAppDispatch();

  return (
    <div className="text-center d-flex justify-content-between mb-5">
      {links && links.find((link) => link.rel == "prev") && (
        <button
          disabled={loading}
          className="btn btn-outline-primary btn-sm"
          onClick={() => {
            dispatch(prev());
          }}
        >
          {" "}
          <i className={`bi bi-chevron-left`}></i>
          {!loading ? "Previous page" : "🌀 Loading..."}
        </button>
      )}
      {links && links.find((link) => link.rel == "next") && (
        <button
          disabled={loading}
          className="btn btn-outline-primary btn-sm"
          onClick={() => {
            dispatch(next());
          }}
        >
          {!loading ? "Next page" : "🌀 Loading..."}
          <i className={`bi bi-chevron-right`}></i>
        </button>
      )}
    </div>
  );
}
