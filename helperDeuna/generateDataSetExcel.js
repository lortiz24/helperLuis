const exl = require("excel4node");
const path = require("path");
const { generarDatosJuego } = require("./generateDataSet");
const wb = new exl.Workbook();
const arrayData = generarDatosJuego(2000);
console.log(arrayData);
const ws = wb.addWorksheet(`Ahi vemos`);
ws.cell(1, 1).string("Ratio de bajas/muertes");
ws.cell(1, 2).string("Nivel de habilidad");
ws.cell(1, 2).string("Tiempo de juego (en horas)");
ws.cell(1, 3).string("Modo de juego preferido");
ws.cell(1, 4).string("Nivel de conexión");
ws.cell(1, 5).string("Región geográfica");
ws.cell(1, 6).string("Cantidad de abandono");
ws.cell(1, 7).string("Dispositivo de juego");
ws.cell(1, 8).string("Cantidad partidas juagas");
ws.cell(1, 9).string("Cantidad de victorias");
ws.cell(1, 10).string("Cantidad de derrotas");

arrayData.map((item, index) => {
  ws.cell(index + 2, 1).number(Number(item.ratioBajasMuertes));
  ws.cell(index + 2, 2).number(Number(item.tiempoJuego));
  ws.cell(index + 2, 3).string("" + item.modoJuego);
  ws.cell(index + 2, 4).number(Number(item.nivelConexion));
  ws.cell(index + 2, 5).string("" + item.regionGeografica);
  ws.cell(index + 2, 6).number(Number(item.cantidadAbandono));
  ws.cell(index + 2, 7).string("" + item.dispositivoJuego);
  ws.cell(index + 2, 8).number(Number(item.cantidadPartidas));
  ws.cell(index + 2, 9).number(Number(item.cantidadVictorias));
  ws.cell(index + 2, 10).number(Number(item.cantidadDerrotas));
});

const pathExcel = path.join(__dirname, "excel", "dataSetMatchMacking.xlsx");
wb.write(pathExcel, (err, stats) => {
  if (err) {
    console.log(err);
  }
});
