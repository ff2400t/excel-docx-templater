import { useReducer } from "react";
import { Button, Center, Select } from "@mantine/core";
import ExcelFileInput from "./ExcelFileInput";
import TemplateFileInput from "./TemplateFileInput";
import GenerateButton from "./GenerateButton";
import reducer from "./Reducer";
import { download } from "./util";

function App() {
  const [state, dispatch] = useReducer(reducer, {});
  return (
    <Center
      style={{
        width: "min(100%, 400px)",
        padding: "1rem",
        display: "grid",
        marginInline: "auto",
        "> button": {
          paddingTop: "1rem",
        },
      }}
    >
      <ExcelFileInput dispatch={dispatch} />
      {
        !state?.workbook?.SheetNames && (
          <Select
            label="Select Sheet to generate template from"
            placeholder="Sheet Names"
            data={state.workbook.SheetNames}
            value={state.sheetName}
            onChange={(value) => dispatch({ type: "sheetName", value })}
          />
        )}

      {state?.allFields &&
        (
          <Select
            label="Select the FieldName to save the file as"
            placeholder="Field Name"
            data={state.allFields}
            value={state.fieldName}
            onChange={(value) => dispatch({ type: "fieldName", value })}
          />
        )}
      {state?.fieldName && <TemplateFileInput dispatch={dispatch} />}
      {state?.templateBinaryString && (
        <GenerateButton state={state} dispatch={dispatch} />
      )}
      {state?.result && (
        <Button onClick={download(state.result, "documents.zip")}>
          Download Button
        </Button>
      )}
    </Center>
  );
}

export default App;
