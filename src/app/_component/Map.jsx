import React from "react";
import { TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const Map = () => {
  const [center, setCentre] = useState({ lat: 28.6139, lng: 77.2088 });
  const ZOOM_LEVEL = 9;

  return (
    <>
      <div className="row">
        <div className="col text-center">
          <div className="col">
            <Map center={center} zoom={ZOOM_LEVEL} style={{ height: 400 }}>
              <TileLayer
                url="https://api.maptiler.com/maps/basic-v2/256/%7Bz%7D/%7Bx%7D/%7By%7D.png?key=srkydpHIV9LM8c40Fa7e"
                attribute="https://api.maptiler.com/maps/basic-v2/256/tiles.json?key=srkydpHIV9LM8c40Fa7e"
              />
            </Map>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
