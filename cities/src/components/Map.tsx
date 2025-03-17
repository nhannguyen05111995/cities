import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import { useEffect, useMemo, useRef, useState } from "react";

const center = {
    lat: 51.505,
    lng: -0.09,
}
interface MapProps {
    open: boolean;
    onDragEnd: (coordinates: string) => void;
}

interface Position {
    lat: number;
    lng: number;
}

export default function Map(props: MapProps) {
    const [position, setPosition] = useState<Position>(center);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (props.open)
            setIsModalOpen(true);
    }, [props.open]);

    const markerRef = useRef<L.Marker | null>(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    setPosition(marker.getLatLng());
                    const { lat, lng } = marker.getLatLng();
                    props.onDragEnd(`${lat}${Number(lng) > 0 ? ("%2B" + lng) : lng}`);
                }
            },
        }),
        [],
    );

    if (isModalOpen)
        return (
            <MapContainer center={[51.505, -0.09]} zoom={8} scrollWheelZoom={true} style={{ height: "700px", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    draggable={true}
                    eventHandlers={eventHandlers}
                    position={position}
                    ref={markerRef}>
                    <Tooltip direction="bottom" offset={[-15, 30]} opacity={1} permanent>
                        Drag the marker to a location <br />
                        Lat: {position.lng}, Lng: {position.lat}
                    </Tooltip>
                </Marker>
            </MapContainer>
        );
    else
        return "";
}