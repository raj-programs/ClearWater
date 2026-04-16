import { useMap } from "react-leaflet";
import { useEffect } from "react";

function AutoZoom({ data }) {
  const map = useMap();

  useEffect(() => {
  if (!data || data.length === 0) return;

  const points = data
    .filter(d => d.lattitude && d.longitude)
    .map(d => [
      Number(d.lattitude),
      Number(d.longitude)
    ]);

    console.log(points);
    

  if (points.length === 0) return;

  setTimeout(() => {
    map.invalidateSize();

    if (points.length === 1) {
      map.setView(points[0], 10, { animate: true });
    } else {
      map.fitBounds(points, {
        padding: [50, 50],
        animate: true
      });
    }
  }, 100);
  
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [data]);

console.log("Effect Triggered");

  return null;
}

export default AutoZoom;