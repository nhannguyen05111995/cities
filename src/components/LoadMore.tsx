import { GeoDBAPI } from "@/configuration/Type";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { goToNextPage, goToPrevPage } from "../app/store/features/paging";
import classes from "./loadMore.module.scss";
export default function LoadMore({
  props,
}: {
  props: {
    links: GeoDBAPI.ResponseLink[];
  };
}) {
  const loading = useAppSelector(
    (state: { loading: { value: boolean } }) => state.loading.value
  );

  const { links } = props;
  const dispatch = useAppDispatch();

  return (
    <div className={classes.load_more}>
      {links && links.find((link) => link.rel == "prev") && (
        <button
          disabled={loading}
          className={classes.prev + " btn btn-outline-primary btn-sm"}
          onClick={() => {
            dispatch(goToPrevPage());
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
          className={classes.next + " btn btn-outline-primary btn-sm"}
          onClick={() => {
            dispatch(goToNextPage());
          }}
        >
          {!loading ? "Next page" : "🌀 Loading..."}
          <i className={`bi bi-chevron-right`}></i>
        </button>
      )}
    </div>
  );
}
