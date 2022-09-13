import { useEffect, useRef, useState } from "react";
import { FileInput } from "@mantine/core";

export default function TemplateFileInput(props) {
  const [templateFile, setTemplateFile] = useState("");

  useEffect(() => {
    if (templateFile) {
      var reader = new FileReader();
      reader.readAsBinaryString(templateFile);

      reader.onload = function () {
        props.dispatch({
          type: "templateBinaryString",
          value: reader.result,
        });
      };
    }
  }, [templateFile]);

  return (
    <FileInput
      placeholder="Docx Template File"
      label="Template"
      withAsterisk
      value={templateFile}
      onChange={setTemplateFile}
      accept=".docx"
    />
  );
}
