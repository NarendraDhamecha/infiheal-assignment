import React from "react";
import type { Photo } from "../types/photo";
import { LazyImage } from "./LazyImage";

type Props = {
  p: Photo;
};

function PhotosTableRowImpl({ p }: Props) {
  return (
    <tr>
      <td>{p.albumId}</td>
      <td>{p.id}</td>
      <td className="title-cell">{p.title}</td>
      <td>
        <LazyImage src={p.thumbnailUrl} alt={p.title} width={50} height={50} />
      </td>
      <td>
        <a href={p.url} target="_blank" rel="noreferrer noopener">
          Open
        </a>
      </td>
    </tr>
  );
}

export const PhotosTableRow = React.memo(PhotosTableRowImpl);
