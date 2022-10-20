const exl = require("excel4node");
const datos = require("./datos.json");
const path = require("path");
const wb = new exl.Workbook();

const ws = wb.addWorksheet(`ventas`);
ws.cell(1, 1).string("empresa_id");
ws.cell(1, 2).string("id_detalle");
ws.cell(1, 3).string("fecha");
ws.cell(1, 4).string("movimientos_id");
ws.cell(1, 5).string("plu");
ws.cell(1, 6).string("Producto");
ws.cell(1, 7).string("precio");
ws.cell(1, 8).string("cantidad");
ws.cell(1, 9).string("costo_venta");
ws.cell(1, 10).string("venta_bruta");
ws.cell(1, 11).string("valor_iva");
ws.cell(1, 12).string("subtotal");
ws.cell(1, 13).string("subtotal_calulada");
ws.cell(1, 14).string("valor_iva");
ws.cell(1, 15).string("valor_iva_calculado");
ws.cell(1, 16).string("hipoconsumo");
ws.cell(1, 17).string("hipoconsumo_calculado");
let contador = 1;
datos.byEmpresas.map((item1, index) => {
  item1.ventasDetalladasAllMalas.map((item2, index) => {
    contador = contador + 1;
    ws.cell(contador, 1).string("" + item1.empresa_id);
    ws.cell(contador, 2).string("" + item2.id);
    ws.cell(contador, 3).string("" + item2.fecha);
    ws.cell(contador, 4).string("" + item2.movimientos_id);
    ws.cell(contador, 5).string("" + item2.plu);
    ws.cell(contador, 6).string("" + item2.descripcion);
    ws.cell(contador, 7).number(Number(item2.precio));
    ws.cell(contador, 8).number(Number(item2.cantidad));
    ws.cell(contador, 9).number(Number(item2.costo_venta));
    ws.cell(contador, 10).number(Number(item2.venta_bruta));
    ws.cell(contador, 11).number(Number(item2.descripcion_iva));
    ws.cell(contador, 12).number(Number(item2.venta_neta));
    ws.cell(contador, 13).number(Number(item2.venta_neta_calulada));
    ws.cell(contador, 14).number(Number(item2.valor_iva));
    ws.cell(contador, 15).number(Number(item2.valor_iva_calculado));
    ws.cell(contador, 16).number(Number(item2.valor_no_gravable));
    ws.cell(contador, 17).number(Number(item2.valor_no_gravable_calculado));
  });
});

const pathExcel = path.join(__dirname, "excel", "ventas.xlsx");
wb.write(pathExcel, (err, stats) => {
  if (err) {
    console.log(err);
  }
});
