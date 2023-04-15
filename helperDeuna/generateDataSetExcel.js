const exl = require("excel4node");
const path = require("path");
const { generarDatosJuego } = require("./generateDataSet");
const wb = new exl.Workbook();
const arrayData = generarDatosJuego(2000);
console.log(arrayData)
const ws = wb.addWorksheet(`Ahi vemos`);
ws.cell(1, 1).string("Ratio de bajas/muertes");
ws.cell(1, 2).string("Nivel de habilidad");
ws.cell(1, 3).string("Tiempo de juego (en horas)");
ws.cell(1, 4).string("Modo de juego preferido");
ws.cell(1, 5).string("Nivel de conexión");
ws.cell(1, 6).string("Región geográfica");
ws.cell(1, 7).string("Cantidad de abandono");
ws.cell(1, 8).string("Dispositivo de juego");
ws.cell(1, 9).string("Cantidad partidas juagas");
ws.cell(1, 10).string("Cantidad de victorias");
ws.cell(1, 11).string("Cantidad de derrotas");
/* ws.cell(1, 12).string("subtotal_calulada");
  ws.cell(1, 13).string("valor_iva");
  ws.cell(1, 14).string("valor_iva_calculado");
  ws.cell(1, 15).string("hipoconsumo");
  ws.cell(1, 16).string("hipoconsumo_calculado"); */
arrayData.map((item, index) => {
  ws.cell(index + 2, 1).string("" + item.ratioBajasMuertes);
  ws.cell(index + 2, 2).string("" + item.nivelHabilidad);
  ws.cell(index + 2, 3).string("" + item.tiempoJuego);
  ws.cell(index + 2, 4).string("" + item.modoJuego);
  ws.cell(index + 2, 5).string("" + item.nivelConexion);
  ws.cell(index + 2, 6).string("" + item.regionGeografica);
  ws.cell(index + 2, 7).string("" + item.cantidadAbandono);
  ws.cell(index + 2, 8).string("" + item.dispositivoJuego);
  ws.cell(index + 2, 9).string("" + item.cantidadPartidas);
  ws.cell(index + 2, 10).number(Number(item.cantidadVictorias));
  ws.cell(index + 2, 11).number(Number(item.cantidadDerrotas));
  /* ws.cell(index + 2, 12).number(Number(item.venta_neta_calulada));
  ws.cell(index + 2, 13).number(Number(item.valor_iva));
  ws.cell(index + 2, 14).number(Number(item.valor_iva_calculado));
  ws.cell(index + 2, 15).number(Number(item.valor_no_gravable));
  ws.cell(index + 2, 16).number(Number(item.valor_no_gravable_calculado)); */
});

const pathExcel = path.join(__dirname, "excel", "dataSetMatchMacking.xlsx");
wb.write(pathExcel, (err, stats) => {
  if (err) {
    console.log(err);
  }
});
