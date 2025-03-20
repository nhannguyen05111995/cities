import { GeoDBAPI } from "@/configuration/Type";

export default function LoadMore({
  props,
}: {
  props: {
    setPage: React.Dispatch<React.SetStateAction<number>>
    links: GeoDBAPI.ResponseLink[];
    loading: boolean;
  };
}) {
  const { links, loading } = props;

  return (
    <div className="text-center d-flex justify-content-between mb-5">
      {links && links.find((link) => link.rel == "prev") && (
        <button
          disabled={loading}
          className="btn btn-outline-primary btn-sm"
          onClick={() => {
            props.setPage((prev: number) => prev - 10);
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
            props.setPage((prev: number) => prev + 10);
          }}
        >
          {!loading ? "Next page" : "🌀 Loading..."}
          <i className={`bi bi-chevron-right`}></i>
        </button>
      )}
    </div>
  );
}
