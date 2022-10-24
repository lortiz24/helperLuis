"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllService = void 0;
const CierreDiarioModels_1 = __importDefault(require("../models/CierreDiarioModels"));
const deleteAllService = (empresas_id, jornadaInicial, jonadaFinal) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let borradas = [];
    const detalladoCierre = yield CierreDiarioModels_1.default.aggregate().match({ empresas_id: empresas_id, jornada_id: { $gte: jornadaInicial, $lte: jonadaFinal } });
    let ventasDuplicadas = [];
    let unicas = {};
    for (const detalladoItem of detalladoCierre) {
        let consecutivoOriginal = ((_a = detalladoItem.data.ventas_combustible[0]) === null || _a === void 0 ? void 0 : _a.consecutivo) || 'undefined';
        ventasDuplicadas = detalladoCierre.filter((item) => {
            var _a, _b;
            const consecutivoActual = (_b = (_a = item.data.ventas_combustible[0]) === null || _a === void 0 ? void 0 : _a.consecutivo) !== null && _b !== void 0 ? _b : 'undefined';
            /*  console.log({
                 consecutivoOriginal,
                 consecutivoActual,
                 validacion:consecutivoActual === consecutivoOriginal
             }) */
            return consecutivoActual === consecutivoOriginal;
        });
    }
    console.log(ventasDuplicadas);
    if (ventasDuplicadas.length > 1) {
        ventasDuplicadas.forEach((detalladoItem, index) => {
            var _a, _b;
            if (!unicas[(_a = detalladoItem.data.ventas_combustible[0]) === null || _a === void 0 ? void 0 : _a.consecutivo]) {
                unicas[(_b = detalladoItem.data.ventas_combustible[0]) === null || _b === void 0 ? void 0 : _b.consecutivo] = true;
                return;
            }
            borradas.push(CierreDiarioModels_1.default.findByIdAndDelete(detalladoItem._id));
        });
    }
    const respuesta = yield Promise.all(borradas);
    return respuesta;
});
exports.deleteAllService = deleteAllService;
//# sourceMappingURL=DeleteServices.js.map