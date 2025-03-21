import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import { defaulPosition } from "@/configuration/Constant";
import CityDetail from "./CityDetail";
import { useAppSelector } from "../app/hook";
import { GeoDBAPI } from "@/configuration/Type";

interface MapProps {
  open: boolean;
  onDragEnd?: (coordinates: string) => void;
  setShownLocation?: (p: Position) => void;
}

export type Position = {
  lat: number;
  lng: number;
};

export default function Map(props: MapProps) {
  const [position, setPosition] = useState<Position>(defaulPosition);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const focusCity = useAppSelector(
    (state: { focusCity: { value: GeoDBAPI.City | null } }) =>
      state.focusCity.value
  );

  useEffect(() => {
    function toggleModal() {
      if (props.open) {
        setIsModalOpen(true);
        if (focusCity)
          setPosition({ lat: focusCity.latitude, lng: focusCity.longitude });
      } else {
        setIsModalOpen(false);
      }
    }
    toggleModal();
  }, [props.open, focusCity]);

  const markerRef = useRef<L.Marker | null>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker) {
          setPosition(marker.getLatLng());
          const { lat, lng } = marker.getLatLng();
          if (props.onDragEnd && props.setShownLocation) {
            props.onDragEnd(`${lat}${Number(lng) > 0 ? "%2B" + lng : lng}`);
            props.setShownLocation({ lat, lng });
          }
        }
      },
    }),
    []
  );

  if (isModalOpen)
    return (
      <MapContainer
        center={position}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: "50vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          draggable={!focusCity}
          position={position}
          ref={markerRef}
          eventHandlers={eventHandlers}
        >
          <Tooltip direction="bottom" offset={[-15, 30]} opacity={1} permanent>
            {focusCity ? (
              <CityDetail/>
            ) : (
              "Drag me!"
            )}
          </Tooltip>
        </Marker>
      </MapContainer>
    );
  else return "";
}
