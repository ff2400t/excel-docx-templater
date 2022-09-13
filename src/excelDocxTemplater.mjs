import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { readFileSync, writeFileSync } from "fs";
import * as XLSX from "xlsx/xlsx.mjs";
import snakecase from "snakecase";
import filenamify from "filenamify/browser";

const rawdata = getData(excelFileName, sheetIndex);
const data = rawdata.map(keysToSnakeCase);
const templateBuffer = readFileSync(templateFileName, "binary");

data.forEach((data) => {
  const doc = generateDocx(templateBuffer, data);
  try {
    saveDocx(doc, data[fieldNameToSaveAs] + ".docx");
  } catch (e) {
    console.log(e);
  }
});

export function getData(excelBuffer, sheetIndex) {
  // const excelBuffer = readFileSync(excelFileName);
  const dataFrame = XLSX.read(excelBuffer);
  const sheetName = dataFrame.SheetNames[sheetIndex];
  const data = XLSX.utils.sheet_to_json(dataFrame.Sheets[sheetName]);
  return data;
}

function generateDocx(content, data) {
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });
  return doc.render(data);
}

function saveDocx(doc, fileName) {
  const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
  });
  fileName = filenamify(fileName);
  writeFileSync(fileName, buf);
}

function keysToSnakeCase(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .map((kv) => [snakecase(kv[0]), kv[1]]),
  );
}
