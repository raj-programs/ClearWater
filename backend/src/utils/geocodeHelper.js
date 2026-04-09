const cache = {};

export async function fetchGeocode(place) {
  if (cache[place]) {
    return cache[place];
  }

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`,
    {
      headers: {
        "User-Agent": "ClearWaterApp/1.0"
      }
    }
  );

  const data = await response.json();

  if (!data || data.length === 0) {
    throw new Error("No result found");
  }

  const result = {
    lat: data[0].lat,
    lon: data[0].lon,
    name: data[0].display_name
  };

  cache[place] = result;

  return result;
}