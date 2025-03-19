import { GeoDBAPI } from "@/configuration/Type";

export default function LoadMore({
  props,
}: {
  props: {
    setPage: () => void;
    links: GeoDBAPI.ResponseLink[];
    loading: boolean;
  };
}) {
  const { links, loading } = props;
  return (
    <div className="text-center">
      {links && links.find((link) => link.rel == "next") && (
        <button
          disabled={loading}
          className="btn btn-outline-primary btn-sm ml-3 mb-5"
          onClick={() => {
            props.setPage();
          }}
        >
          {!loading ? "Load more" : "🌀 Loading..."}
        </button>
      )}
    </div>
  );
}
