import Papa from "papaparse";

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

export async function parseCSVtoJSON(file) {
  const data = await new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true, // If you want to use the first row as keys
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
  return data;
}

export function getRandomLightColor() {
  const randomChannel = () => Math.floor(180 + Math.random() * 75);
  // 180-255 range to keep it light

  const r = randomChannel();
  const g = randomChannel();
  const b = randomChannel();

  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}
