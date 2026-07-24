import Papa from "papaparse";

export async function loadCsv(path) {
  const response = await fetch(path);

  const text = await response.text();

  return Papa.parse(text, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  }).data;
}