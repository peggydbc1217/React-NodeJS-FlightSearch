import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import styles from "./RealTimeMap.module.scss";
import { useUrlPosition } from "../../CustomHook/useUrlPosition";
import "leaflet-rotatedmarker";
import { useEffect } from "react";
import { useRef } from "react";
import L from "leaflet";

const customAirportIcon = new L.icon({
  iconUrl: "/images/realTimeFlight_Icon.png", // URL to your custom icon image
  iconSize: [64, 64], // Size of the icon [width, height]
  iconAnchor: [32, 0], // Anchor point of the icon relative to its size [x, y]
});

function RealTimeMap() {
  const [
    mapLat,
    mapLng,
    distance,
    speed,
    elevation,
    flight_iata,
    airline_iata,
    dep_iata,
    arr_iata,
    status,
    dir,
    alt,
  ] = useUrlPosition();

  // const [searchParams] = useSearchParams();
  // const [mapPosition, setMapPosition] = useState([mapLat, mapLng]);

  const mapRef = useRef();

  useEffect(() => {
    if (!mapLat && !mapLng) return;
    if (!mapRef.current) return;

    mapRef.current.setView([mapLat, mapLng], 7);
  }, [mapLat, mapLng, dir]);

  return (
    <div className={`${styles.mapContainer} mt-3 `}>
      <MapContainer
        center={[mapLat, mapLng]}
        scrollWheelZoom={false}
        zoom={7}
        className={styles.map}
        zIndex={-1}
        ref={mapRef}
      >
        <TileLayer
          maxZoom={20}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
          setZIndex={-1}
        />
        <Marker
          key={dir}
          position={[mapLat, mapLng]}
          icon={customAirportIcon}
          rotationAngle={dir} // Rotate the icon by 45 degrees
          rotationOrigin="center center"
        >
          {" "}
          {/* // Set the rotation origin */}
          {flight_iata && (
            <Popup autoPan={true} autoClose={true}>
              {/* {position.lat} {position.lng} */}

              <h4 className="text-secondary">
                {dep_iata} → {arr_iata}
              </h4>
              <div
                className="d-flex flex-column justify-content-between"
                style={{ height: "200px", width: "200px" }}
              >
                <div className="d-flex">
                  <h5 className="text-secondary">
                    Flight:{" "}
                    <span className="text-primary  me-1">{flight_iata}</span>
                  </h5>
                  <img
                    className="ms-1"
                    src={`https://www.gstatic.com/flights/airline_logos/70px/${airline_iata}.png`}
                    alt="flightCompany"
                    height="30px"
                  />
                </div>
                <h5 className="text-secondary">
                  LatLng:{" "}
                  <span className="text-primary  me-1">
                    {" "}
                    {parseFloat(mapLat).toFixed(2)},{" "}
                    {parseFloat(mapLng).toFixed(2)}
                  </span>
                </h5>
                <h5 className="text-secondary">
                  Speed: <span className="text-primary  me-1">{speed}</span>km
                </h5>
                <h5 className="text-secondary">
                  Elevation: <span className="text-primary  me-1">{alt}</span>m
                </h5>
                <h5 className="text-secondary">
                  Status: <span className="text-primary  me-1">{status}</span>
                </h5>
              </div>
            </Popup>
          )}
        </Marker>
      </MapContainer>
    </div>
  );
}

export default RealTimeMap;
