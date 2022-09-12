import { useState, useEffect } from 'react';
import { FileInput } from '@mantine/core';
import { read as readXLSX } from 'xlsx/xlsx.mjs';

export default function ExcelFileInput(props) {
	const [excelFile, setExcelFile] = useState(null);
 
	useEffect(() => {
		excelFile && excelFile.arrayBuffer()
			.then((buf) =>
				props.dispatch({
					type: 'setData',
					value: readXLSX(buf)
				})
			)
	}, [excelFile])

	return <FileInput
		placeholder="Excel File"
		label="Excel File"
		description="Excel file from which we have to extract the data"
		withAsterisk
		value={excelFile}
		onChange={setExcelFile}
		accept='.xlsx'
	/>
}
