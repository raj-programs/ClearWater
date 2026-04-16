import supabase from "../database/supabaseConfig.js";
import { checkWaterQuality } from "../utils/waterQualityChecker.js";
import { getPrecautions } from "../utils/getPrecautions.js";

const VALID_CLASSES = ["A", "B", "C", "D", "E"];

const waterQuality = async (req, res) => {
  let { state, district, river, usage } = req.query;
  state = decodeURIComponent(state || "").trim();
  district = decodeURIComponent(district || "").trim();
  river = decodeURIComponent(river || "").trim();
  usage = (usage || "").trim().toUpperCase();

  if (!state || !district || !river) {
    return res.status(400).json({ error: "state, district, and river are required" });
  }

  if (!usage || !VALID_CLASSES.includes(usage)) {
    return res.status(400).json({ error: "usage must be one of: A, B, C, D, E" });
  }

  const { data, error } = await supabase
    .from("water_quality_data")
    .select("*")
    .ilike('"State Name"', `%${state}%`)
    .ilike("District", district)
    .ilike('"Monitoring Location"', `%${river}%`)
    .limit(1);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: "No water quality data found for this location" });
  }

  const row = data[0];

  // Map actual DB columns to checker params.
  // For pollutants (BOD, TC) use Max (worst case).
  // For beneficial params (DO) use Min (worst case).
  // For range params (pH, Conductivity) pass both min and max.
  const params = {
    TC: row["Total Coliform (MPN/100ml) Max"] ?? null,
    pH_min: row["pH Min"] ?? null,
    pH_max: row["pH Max"] ?? null,
    DO: row["Dissolved\nOxygen (mg/L) Min"] ?? null,
    BOD: row["BOD\n(mg/L) Max"] ?? null,
    EC: row["Conductivity (µmho/cm) Max"] ?? null,
    // These columns don't exist in the current DB — pass null
    FA: null,
    SAR: null,
    B: null,
  };

  const qualityResult = checkWaterQuality(params);
  const classResult = qualityResult.classes[usage];

  const precautions = await getPrecautions(usage, classResult, river);

  return res.json({
    selectedClass: usage,
    label: classResult.label,
    pass: classResult.pass,
    failures: classResult.failures,
    precautions: precautions || null,
  });
};

export default waterQuality;
