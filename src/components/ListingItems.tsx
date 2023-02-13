import React from "react";
import { DataFromDBType } from "../types/CreateListingFormData";

interface Props {
  listing: DataFromDBType;
  id: string | undefined;
  onEdit?: () => {};
  onDelete?: () => {};
}

export default function ListingItems({ listing, id, onEdit, onDelete }: Props) {
  return (
    <div>
      {listing.imageURLs?.map((imgUrl) => (
        <img src={imgUrl} alt="" />
      ))}
    </div>
  );
}
