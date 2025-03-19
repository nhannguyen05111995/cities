import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import { GeoDBAPI } from "@/configuration/Type";
import { defaulPosition } from "@/configuration/Constant";

interface MapProps {
  open: boolean;
  onDragEnd?: (coordinates: string) => void;
  setShownLocation?: (p: Position) => void;
  focusCity?: GeoDBAPI.City;
}

export type Position = {
  lat: number;
  lng: number;
};

export default function Map(props: MapProps) {
  const [position, setPosition] = useState<Position>(defaulPosition);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { focusCity } = props;
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
    console.log(props.open, focusCity);

    toggleModal();
  }, [props.open]);

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
              <div>
                City: {focusCity?.city}, Country: {focusCity?.country},
                Popolation: {focusCity?.population}
              </div>
            ) : (
              "Drag me!"
            )}
          </Tooltip>
        </Marker>
      </MapContainer>
    );
  else return "";
}
