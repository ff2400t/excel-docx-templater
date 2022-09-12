import { useReducer } from 'react';
import { Select, Center } from '@mantine/core';
import ExcelFileInput from './ExcelFileInput';
import reducer from './Reducer'

function App() {
  const [state, dispatch] = useReducer(reducer, {});
  return (
    <Center style={{
      width: "min(100%, 400px)",
      padding: "1rem",
      display: 'grid',
      marginInline: 'auto'
    }}>
      <ExcelFileInput dispatch={dispatch} />
      {
        state?.workbook?.SheetNames &&
        < Select
          label="Select Sheet to generate template from"
          placeholder="Sheet Names"
          data={state.workbook.SheetNames}
          value={state.sheetName}
          onChange={(value) => dispatch({ type: 'sheetName', value })}
        />
      }
      {
        state?.allFields &&
        < Select
          label="Select the FieldName to save the file as"
          placeholder="Field Name"
          data={state.allFields}
          value={state.fieldName}
          onChange={(value) => dispatch({ type: 'fieldName', value })}
        />
      }
    </Center>
  );
}

export default App
