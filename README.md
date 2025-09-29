## Task 2 — React Assignment: Data Fetching & Large List Rendering

### Setup & Run
- Node 18+

```bash
cd task-2
npm install
npm run dev   # for local dev (Vite)
# or
npm run build && npm run preview
```

### Approach & Component Structure
- `src/types/photo.ts` — shared `Photo` type
- `src/hooks/useFetch.ts` — reusable generic data fetching hook returning `{ data, loading, error }`
- `src/components/SearchBar.tsx` — debounced query input (250ms)
- `src/components/LazyImage.tsx` — IntersectionObserver-based lazy image loading
- `src/components/PhotosTableRow.tsx` — memoized row (`React.memo`)
- `src/components/PhotosTable.tsx` — table rendering
- `src/components/Spinner.tsx` — loader indicator
- `src/App.tsx` — composition, filtering via `useMemo`, loader & error UI

### State & Error Handling
- `loading`: true during fetch; a full-screen overlay with spinner is shown.
- `error`: non-OK response/network failure → "Failed to load data. Please try again.".
- Derived state: filtering via `useMemo` to avoid duplicate state.

### Performance Observations
- 5,000 rows render in a single table; header is sticky and container scrolls.
- Lazy image loading with IntersectionObserver; `loading="lazy"` and async decoding.
- Search is debounced (300ms); rows and images memoized to reduce re-renders.
- Stable `key` by `id`.

#### Potential optimizations (not required by spec)
- Virtualization (`react-window`/`react-virtualized`) for smoother scroll on low-end devices.
- Split table rows into memoized row components with `React.memo`.
- Windowing images or deferring image decoding.

### Bonus Features Included
- Debounced search by title.
- Viewport-aware lazy image loading.
- Memoized rows (`React.memo`) and images.
