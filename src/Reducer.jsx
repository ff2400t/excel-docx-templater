import { keysToSnakeCase } from './util'
import * as XLSX from "xlsx/xlsx.mjs";

export default function reducer(state, action) {
	console.log(action)
	switch (action.type) {
		case "setData":
			return { ...state, workbook: action.value }
		case "sheetName":
			const sheetName = action.value;
			const table = XLSX.utils.sheet_to_json(state.workbook.Sheets[sheetName])
				.map(keysToSnakeCase);
			const allFields = Object.keys(table[0]);
			return {
				...state,
				sheetName,
				table,
				allFields,
			}
		case "fieldName":
			return { ...state, fieldName: action.value }
	}
}
