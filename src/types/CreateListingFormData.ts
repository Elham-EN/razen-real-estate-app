import { FieldValue } from "firebase/firestore";

export interface FormDataType {
  type: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  furnished: boolean;
  address: string;
  description: string;
  offer: boolean;
  regularPrice: number;
  discountedPrice: number;
  /**
   * The type FileList | null is used because when the user selects
   * images from their computer, the input element will return a FileList
   * object representing the selected files. However, if the user doesn't
   * select any files or cancels the file selection, the value of the input
   * element will be null
   */
  images: FileList | null;
}

export interface GeolocationType {
  lat: number;
  lng: number;
}

/**
 * Form Data: type, name, bedrooms, bathrooms, parking, furnished
 *  address, description, offer, regularPrice discountedPrice
 *
 * Geolocation: lat & lng
 *
 * Image URLs(Array): imageURLs
 *
 * ServerTimeStamp:
 *
 * Current Authenticated user Reference
 */
export interface saveFormDataToDB {
  type: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  furnished: boolean;
  address: string;
  description: string;
  offer?: boolean;
  regularPrice: number;
  discountedPrice?: number;
  images?: FileList | null;
  geolocation: GeolocationType;
  imageURLs: string[];
}

export interface DataFromDBType {
  type?: string;
  name?: string;
  bedrooms?: number;
  bathrooms?: number;
  parking?: boolean;
  furnished?: boolean;
  address?: string;
  description?: string;
  offer?: boolean;
  regularPrice?: number;
  discountedPrice?: number;
  images?: FileList | null;
  geolocation?: GeolocationType;
  imageURLs?: string[];
  userRef?: string;
  timestamp?: FieldValue;
  listingDocId?: string;
}
