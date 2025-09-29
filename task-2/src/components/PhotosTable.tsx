import type { Photo } from '../types/photo'
import { PhotosTableRow } from './PhotosTableRow'

type Props = {
  rows: Photo[]
}

export function PhotosTable({ rows }: Props) {
  return (
    <div className="table-wrapper">
      <table className="photos-table">
        <thead>
          <tr>
            <th>Album ID</th>
            <th>ID</th>
            <th>Title</th>
            <th>Thumbnail</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <PhotosTableRow key={p.id} p={p} />
          ))}
        </tbody>
      </table>
    </div>
  )
}


