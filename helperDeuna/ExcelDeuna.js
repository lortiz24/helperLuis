const exl = require("excel4node");
const datos = require("./datos.json");
const path = require("path");
const wb = new exl.Workbook();
datos.byEmpresas.map((item, index) => {
  const ws = wb.addWorksheet(`${item.empresa_id}`);
  ws.cell(1, 1).string("id_detalle");
  ws.cell(1, 2).string("fecha");
  ws.cell(1, 3).string("movimientos_id");
  ws.cell(1, 4).string("plu");
  ws.cell(1, 5).string("Producto");
  ws.cell(1, 6).string("precio");
  ws.cell(1, 7).string("cantidad");
  ws.cell(1, 8).string("costo_venta");
  ws.cell(1, 9).string("venta_bruta");
  ws.cell(1, 10).string("valor_iva");
  ws.cell(1, 11).string("subtotal");
  ws.cell(1, 12).string("subtotal_calulada");
  ws.cell(1, 13).string("valor_iva");
  ws.cell(1, 14).string("valor_iva_calculado");
  ws.cell(1, 15).string("hipoconsumo");
  ws.cell(1, 16).string("hipoconsumo_calculado");
  item.ventasDetalladasAllMalas.map((item, index) => {
    ws.cell(index + 2, 1).string("" + item.id);
    ws.cell(index + 2, 2).string("" + item.fecha);
    ws.cell(index + 2, 3).string("" + item.movimientos_id);
    ws.cell(index + 2, 4).string("" + item.plu);
    ws.cell(index + 2, 5).string("" + item.descripcion);
    ws.cell(index + 2, 6).string("" + item.precio);
    ws.cell(index + 2, 7).string("" + item.cantidad);
    ws.cell(index + 2, 8).string("" + item.costo_venta);
    ws.cell(index + 2, 9).string("" + item.venta_bruta);
    ws.cell(index + 2, 10).number( Number(item.descripcion_iva));
    ws.cell(index + 2, 11).number( Number(item.venta_neta));
    ws.cell(index + 2, 12).number( Number(item.venta_neta_calulada));
    ws.cell(index + 2, 13).number( Number(item.valor_iva));
    ws.cell(index + 2, 14).number( Number(item.valor_iva_calculado));
    ws.cell(index + 2, 15).number( Number(item.valor_no_gravable));
    ws.cell(index + 2, 16).number( Number(item.valor_no_gravable_calculado));
  });
});

const pathExcel = path.join(__dirname, "excel", "ventas.xlsx");
wb.write(pathExcel, (err, stats) => {
  if (err) {
    console.log(err);
  }
});
