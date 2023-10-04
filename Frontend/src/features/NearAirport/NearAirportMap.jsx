import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  LayerGroup,
  Circle,
  Tooltip,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import styles from "./NearAirportMap.module.scss";
import { useSearchParams } from "react-router-dom";
import { useUrlPosition } from "../../CustomHook/useUrlPosition";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { FETCH_CITY_URL } from "../../services/constant";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setNearAirports } from "./NearAirportsSlice";
import { fetchNearAirports } from "./NearAirportsSlice";
import L from "leaflet";
import { loadingStart, loadingComplete } from "../Loading/loadingSlice";

const customAirportIcon = new L.icon({
  iconUrl: "/images/Nearairport/airport.png", // URL to your custom icon image
  iconSize: [64, 64], // Size of the icon [width, height]
  iconAnchor: [32, 0], // Anchor point of the icon relative to its size [x, y]
});

function NearAirportMap() {
  const airports = useSelector((state) => state.nearAirports?.airports) || [];

  const [mapLat, mapLng, distance] = useUrlPosition();
  const [cityData, setCityData] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const distpatch = useDispatch();

  //when searchparams change,
  //(1)fetch city data and set to local state "cityData"
  //(2)fetch near airports and set to redux store
  useEffect(() => {
    if (!mapLat && !mapLng) return;

    const fetchCityData = async () => {
      try {
        distpatch(loadingStart());
        const res = await axios.get(
          `${FETCH_CITY_URL}latitude=${mapLat}&longitude=${mapLng}`
        );
        if (!res.data.city) {
          //if no city data, clear redux store and local state
          distpatch(setNearAirports([]));
          setCityData({});
          throw new Error(
            "This doesn't seem to be a city. Please select a city."
          );
        } else {
          setCityData(res.data);
          //(2) fetch near airports and set to redux store
          distpatch(
            fetchNearAirports({
              lat: mapLat,
              lng: mapLng,
              distance: distance / 2,
            })
          );
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        distpatch(loadingComplete());
      }
    };

    //(1) fetch city data
    fetchCityData();
  }, [mapLat, mapLng, distpatch, distance, searchParams, setSearchParams]);

  return (
    <Col lg={9} xs={12}>
      <div className={`${styles.mapContainer} mt-3 `}>
        <MapContainer
          // center={[position.lat, position.lng]}
          center={[mapLat, mapLng]}
          scrollWheelZoom={false}
          zoom={8}
          className={styles.map}
          zIndex={-1}
        >
          <TileLayer
            maxZoom={20}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
            setZIndex={-1}
          />
          <Marker position={[mapLat, mapLng]}>
            <Popup>
              {/* {position.lat} {position.lng} */}
              {mapLat} {mapLng}
            </Popup>
          </Marker>

          {airports.map((airport, i) => {
            const id = uuidv4();
            return (
              <Marker
                position={[airport.lat, airport.lng]}
                key={id}
                icon={customAirportIcon}
              >
                <Popup>
                  <span
                    className={`fi fi-${airport.country_code.toLowerCase()} border `}
                  ></span>{" "}
                  {/* {airport.iata_code} */}
                  {airport.name}
                </Popup>
              </Marker>
            );
          })}
          {/* CIRCLE */}
          <LayerGroup>
            <Circle
              // center={[position.lat, position.lng]}
              center={[mapLat, mapLng]}
              pathOptions={{
                color: "blue", // Stroke color
                fillColor: "lightblue", // Fill color
                fillOpacity: 0.6, // Fill opacity (0 to 1)
                weight: 2,
              }}
              radius={(distance * 1000) / 2}
            >
              <Marker position={[mapLat, mapLng]}></Marker>

              <Tooltip direction="bottom" offset={[0, 0]} opacity={1}>
                You Selected here<br></br>
                {cityData.city && (
                  <>
                    <span
                      className={`fi fi-${cityData?.countryCode?.toLowerCase()} border `}
                    ></span>{" "}
                    <span className="h6 text-secondary">{cityData.city}</span>
                    <br />
                  </>
                )}
                Lat: <span>{(+mapLat).toFixed(2)}</span>
                <br></br>
                Lng: <span>{(+mapLng).toFixed(2)}</span>
              </Tooltip>
            </Circle>
          </LayerGroup>

          <SetViewOnClick
            searchParams={searchParams}
            onSetSearchParams={setSearchParams}
          />
        </MapContainer>
      </div>
    </Col>
  );
}

// Leaflet Animated panning
function SetViewOnClick({ searchParams, onSetSearchParams }) {
  const map = useMapEvent("click", (e) => {
    searchParams.set("lat", e.latlng.lat);
    searchParams.set("lng", e.latlng.lng);
    onSetSearchParams(searchParams.toString());
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });

  //when searchparams change, set map view
  useEffect(() => {
    if (!searchParams.get("lat") || !searchParams.get("lng")) return;
    map.setView(
      [searchParams.get("lat"), searchParams.get("lng")],
      map.getZoom(),
      {
        animate: true,
      }
    );
  }, [map, searchParams]);

  return null;
}

export default NearAirportMap;
