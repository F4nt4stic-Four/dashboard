import { INPUT_CONFIGS } from "../../input.config";

function evaluateAndSum(year, customInputValues, customEquations) {
  let sum = 0;

  for (const key in customEquations) {
    try {
      const equation = customEquations[key];
      const input_value = customInputValues[key];
      const fn = new Function("input_value", "year", `return ${equation};`);
      const result = fn(input_value, year);
      sum += Number(result) || 0; // Safely add numeric value, ignore NaN
    } catch (err) {
      console.error(`Error in equation for ${key}:`, err);
    }
  }

  return sum;
}

export function generateTemperaturePrediction(
  year,
  inputs,
  customEquations = {},
) {
  const {
    coal,
    renewabled,
    oil,
    nuclear,
    natural_gas,
    new_zero_carbon_breakthrough,
    bioenergy,
    carbon_price,
    enery_efficiency_transport,
    electrification_transport,
    enery_efficiency_building,
    electrification_building,
    population,
    economic_growth,
    nature_based,
    technological,
    agriculture_emission,
    waste_and_leakage,
    deforestation,
    ...customInputs
  } = inputs;

  // Normalize the year (2025 is 0, 2125 is 100)
  const t = year - 2025;

  const customValueResultValue = evaluateAndSum(
    year,
    customInputs,
    customEquations,
  );

  // Prevent invalid operations (e.g., log(0), sqrt(-x))
  const safeLog = (x) => (x > 0 ? Math.log(1 + x) : 0);
  const safeSqrt = (x) => (x >= 0 ? Math.sqrt(x) : 0);

  // Compute prediction using all factors
  const y =
    50 +
    0.5 * safeLog(Math.abs(coal + 15)) +
    0.3 * Math.sin(0.1 * t) * renewabled +
    0.4 * safeSqrt(oil) +
    0.3 * Math.exp(-0.05 * t) * nuclear +
    0.2 * natural_gas +
    2.5 * new_zero_carbon_breakthrough +
    0.3 * bioenergy +
    0.2 * safeLog(carbon_price) +
    0.4 * enery_efficiency_transport +
    0.5 * electrification_transport +
    0.4 * enery_efficiency_building +
    0.5 * electrification_building +
    0.3 * population +
    0.4 * economic_growth +
    0.6 * nature_based +
    0.6 * technological -
    0.5 * agriculture_emission -
    0.5 * waste_and_leakage -
    0.7 * deforestation +
    customValueResultValue;

  return y;
}

export function normalizeToOneDigit(value) {
  // Normalize the value to a range of 0 to 1
  const normalizedValue = (value - 50) / (150 - 50);

  // Scale to a 1-digit range (0 to 9)
  const scaledValue = normalizedValue.toFixed(2);

  return scaledValue;
}

export function generateData(TIME_SERIES, inputs, customEquations = {}) {
  return TIME_SERIES.map((year) =>
    generateTemperaturePrediction(year, inputs, customEquations),
  );
}

export const TIME_SERIES = [2025, 2050, 2075, 2100, 2125, 2150];

export const generateKeyIdPair = () => {
  const dictionary = {};
  INPUT_CONFIGS.forEach((config) => {
    const { heading } = config;
    config.sliders.forEach(({ id, label }) => {
      dictionary[`${heading}-${label}`] = id;
    });
  });
  return dictionary;
};
