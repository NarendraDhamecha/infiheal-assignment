import { useMemo, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { PhotosTable } from "./components/PhotosTable";
import { SearchBar } from "./components/SearchBar";
import { Spinner } from "./components/Spinner";
import type { Photo } from "./types/photo";
import "./App.css";

const PHOTOS_URL = "https://jsonplaceholder.typicode.com/photos";

function App() {
  const { data: photos, loading, error } = useFetch<Photo[]>(PHOTOS_URL);
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  const filtered = useMemo(() => {
    if (!debouncedQuery) return photos;
    return photos?.filter((p) =>
      p.title.toLowerCase().includes(debouncedQuery)
    );
  }, [photos, debouncedQuery]);

  return (
    <div className="container">
      <h1>Photos</h1>

      <div className="controls">
        <SearchBar onQueryChange={setDebouncedQuery} />
        <span className="count">{filtered?.length ?? 0} results</span>
      </div>

      {loading && (
        <div className="loading-overlay">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <Spinner />
            <span>Loading...</span>
          </div>
        </div>
      )}

      {error && !loading && <div className="status error">{error}</div>}

      {!loading && !error && <PhotosTable rows={filtered ?? []} />}
    </div>
  );
}

export default App;
