const XLSX = require("xlsx");
const fs = require('fs');

const workbook = XLSX.readFile(
  "./ExcelEntrada/Asignador-masivo-de-productos.xlsx"
);

const workbookSheets = workbook.SheetNames;
const sheet = workbookSheets[0];

const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

console.log(dataExcel);




fs.writeFileSync( './tiendas.json', JSON.stringify({tiendas:dataExcel}) );