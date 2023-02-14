import { DataFromDBType } from "../types/CreateListingFormData";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import Moment from "react-moment";
import "moment-timezone";

interface Props {
  listing: DataFromDBType;
  id: string | undefined;
  onEdit?: () => {};
  onDelete?: () => {};
}

export default function ListingItems({ listing, id, onEdit, onDelete }: Props) {
  return (
    <li
      className="bg-white flex flex-col justify-between items-center shadow-lg 
      rounded-md overflow-hidden transition-shadow duration-150 hover:shadow-2xl 
      relative m-[10px] mt-10"
    >
      <Link
        className="contents"
        to={`/category/${listing.type}/${listing.listingDocId}`}
      >
        {listing.imageURLs && (
          <img
            className="h-[170px] w-full object-cover transition duration-200 
            ease-in hover:scale-105"
            loading="lazy"
            src={listing.imageURLs[3]}
          />
        )}
        <Moment
          className="absolute top-2 left-2 bg-[#3366cc] text-white text-xs 
            font-semibold rounded-md px-2 py-1 shadow-lg"
          fromNow
        >
          {listing.timestamp?.toDate()}
        </Moment>
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <MdLocationOn className="h-4 w-4 text-green-600" />
            <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">
              {listing.address}
            </p>
          </div>
          <p className="font-semibold mt-2 mb-2 text-xl">{listing.name}</p>
          <p className="text-[#457b9d]">
            ${listing.offer ? listing.discountedPrice : listing.regularPrice}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="flex items-center space-x-3 mt-[10px]">
            <div>
              <p className="font-bold text-xs">
                {listing.bedrooms && listing.bedrooms > 1
                  ? listing.bedrooms + " Beds"
                  : "1 Bed"}
              </p>
            </div>
            <div>
              <p className="font-bold text-xs">
                {listing.bathrooms && listing.bathrooms > 1
                  ? listing.bathrooms + " Baths"
                  : "1 Bath"}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
