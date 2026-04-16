import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

import { Circle, MapContainer, TileLayer, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import AutoZoom from "../helpers/zooming.helper";

function MapView({ state, district, river }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!state || !district) return;

    let url = `/api/rivers?state=${state}&districts=${district}`;
    if (river) url += `&river=${river}`;

    fetch(url)
      .then(res => res.json())
      .then(res =>
        {
          setData(res),
          console.log("Api Call", res);
        })
      .catch(console.error);

  }, [state, district, river]);

  return (
    <MapContainer
      key={`${state}-${district}-${river}`}
      center={[19.0760, 72.8777]}
      zoom={2}
      style={{ height: "1000px", width: "1000px" }}
    >
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <AutoZoom data={data} />

      {data.map((item, i) => {
        if (!item.lattitude || !item.longitude) return null;

        return (
          <Circle
            key={i}
            center={[Number(item.lattitude), Number(item.longitude)]}
            radius={5000}
            pathOptions={{
              color: "red",
              fillColor: "red",
              fillOpacity: 0.5
            }}
          >
            <Popup>
              <strong>{item["Monitoring Location"]}</strong><br />
              {item["District"]}<br />
              {item["State Name"]}
            </Popup>
          </Circle>
        );
      })}
    </MapContainer>
  );
}

export default MapView;