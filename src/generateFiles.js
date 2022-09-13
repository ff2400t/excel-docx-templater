import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import filenamify from "filenamify/browser";

export default function generateFiles(dataArray, fieldName, templateBinary) {
  var zip = new PizZip();
  var documents = zip.folder("documents");
  dataArray.map((data) => {
    const doc = generateDocx(templateBinary, data);

    var blob = doc.getZip().generate({
      type: "base64",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      compression: "DEFLATE",
    });

    const fileName = filenamify(data[fieldName].toString()) + ".docx";
    documents.file(fileName, blob, { base64: true });
  });
  console.log(zip);
  let result = zip.generate({ type: "base64" });
  return "data:application/zip;base64," + result;
}

function generateDocx(content, data) {
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });
  return doc.render(data);
}
