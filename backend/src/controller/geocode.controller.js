import { fetchGeocode } from "../utils/geocodeHelper.js";

 const getGeocode = async (req, res) => {
  try {
    const place = req.query.place;

    const result = await fetchGeocode(place);

    return res.json(result);

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

export default getGeocode;

