import { LatLngExpression } from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  MapContainerProps,
} from "react-leaflet";
import { LatLngTuple } from "leaflet";

interface MapProps extends MapContainerProps {
  center: LatLngTuple;
  zoom: number;
  scrollWheelZoom: boolean;
}

export default function Map({ center }: MapProps) {
  return <h1>Interactive Map</h1>;
}
