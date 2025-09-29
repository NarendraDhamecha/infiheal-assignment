import { useEffect, useState } from 'react'

type Props = {
  onQueryChange: (q: string) => void
}

export function SearchBar({ onQueryChange }: Props) {
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    const t = setTimeout(() => onQueryChange(query.trim().toLowerCase()), 250)
    return () => clearTimeout(t)
  }, [query, onQueryChange])

  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Search by title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search by title"
      />
    </div>
  )
}


