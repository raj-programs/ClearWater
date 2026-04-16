const CLASS_DEFINITIONS = {
  A: {
    label: "Drinking Water (without treatment)",
    rules: {
      TC:  { max: 50 },
      pH:  { min: 6.5, max: 8.5, isRange: true },
      DO:  { min: 6 },
      BOD: { max: 2 },
    },
  },
  B: {
    label: "Outdoor Bathing",
    rules: {
      TC:  { max: 500 },
      pH:  { min: 6.5, max: 8.5, isRange: true },
      DO:  { min: 5 },
      BOD: { max: 3 },
    },
  },
  C: {
    label: "Drinking Water (after treatment)",
    rules: {
      TC:  { max: 5000 },
      pH:  { min: 6, max: 9, isRange: true },
      DO:  { min: 4 },
      BOD: { max: 3 },
    },
  },
  D: {
    label: "Wildlife & Fisheries",
    rules: {
      pH:  { min: 6.5, max: 8.5, isRange: true },
      DO:  { min: 4 },
      FA:  { max: 1.2 },
    },
  },
  E: {
    label: "Irrigation / Industrial / Waste Disposal",
    rules: {
      pH:  { min: 6.0, max: 8.5, isRange: true },
      EC:  { max: 2250 },
      SAR: { max: 26 },
      B:   { max: 2 },
    },
  },
};

function formatLimit(rule) {
  if (rule.min !== undefined && rule.max !== undefined) {
    return `${rule.min} ≤ value ≤ ${rule.max}`;
  }
  if (rule.min !== undefined) return `≥ ${rule.min}`;
  if (rule.max !== undefined) return `≤ ${rule.max}`;
  return "";
}

function evaluateClass(className, classDef, params) {
  const failures = [];

  for (const [param, rule] of Object.entries(classDef.rules)) {
    // pH is a range param — check pH_min and pH_max separately
    if (rule.isRange) {
      const minVal = params[`${param}_min`];
      const maxVal = params[`${param}_max`];
      if ((minVal === null || minVal === undefined) && (maxVal === null || maxVal === undefined)) continue;

      // The sample's min must be ≥ rule.min, and the sample's max must be ≤ rule.max
      let failed = false;
      let violatingValue = null;

      if (rule.min !== undefined && minVal != null && minVal < rule.min) {
        failed = true;
        violatingValue = minVal;
      }
      if (rule.max !== undefined && maxVal != null && maxVal > rule.max) {
        failed = true;
        violatingValue = violatingValue ?? maxVal;
      }

      if (failed) {
        const displayValue = (minVal != null && maxVal != null) ? `${minVal}–${maxVal}` : `${violatingValue}`;
        failures.push({
          parameter: param,
          value: displayValue,
          limit: formatLimit(rule),
          message: `${param} exceeds limit for Class ${className}`,
        });
      }
      continue;
    }

    // Standard single-value param
    const value = params[param];
    if (value === null || value === undefined) continue;

    let failed = false;
    if (rule.min !== undefined && value < rule.min) failed = true;
    if (rule.max !== undefined && value > rule.max) failed = true;

    if (failed) {
      failures.push({
        parameter: param,
        value,
        limit: formatLimit(rule),
        message: `${param} exceeds limit for Class ${className}`,
      });
    }
  }

  return {
    pass: failures.length === 0,
    label: classDef.label,
    failures,
  };
}

export function checkWaterQuality(params) {
  const classes = {};
  let bestClass = null;

  for (const [className, classDef] of Object.entries(CLASS_DEFINITIONS)) {
    classes[className] = evaluateClass(className, classDef, params);
    if (classes[className].pass && !bestClass) {
      bestClass = className;
    }
  }

  return { classes, bestClass };
}
