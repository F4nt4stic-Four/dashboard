import Papa from 'papaparse';

export function getLabel(config, value) {
  // Get all keys and convert them to numbers
  const keys = Object.keys(config).map(Number);

  // Find the highest key that is <= value
  const validKeys = keys.filter((key) => key <= value);

  // If no valid key, return null
  if (validKeys.length === 0) return null;

  return config[Math.max(...validKeys)];
}

export function convertJSONtoCSV(...data) {
  const csv = Papa.unparse(data);
  return csv;
}