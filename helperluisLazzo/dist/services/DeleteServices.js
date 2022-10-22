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
    let borradas = [];
    const detalladoCierre = yield CierreDiarioModels_1.default.aggregate().match({ empresas_id: empresas_id, jornada_id: { $gte: jornadaInicial, $lte: jonadaFinal } });
    for (const detalladoItem of detalladoCierre) {
        let parar = false;
        for (const item of detalladoItem.data.ventas_combustible) {
            if (parar)
                break;
            const detalladoCierre = yield CierreDiarioModels_1.default.aggregate()
                .match({ empresas_id: empresas_id, "data.ventas_combustible.consecutivo": item.consecutivo });
            if (detalladoCierre.length > 1) {
                console.log(detalladoCierre);
                parar = true;
                let index = 0;
                for (const detalladoItem of detalladoCierre) {
                    if (index === 0)
                        return;
                    const res = yield CierreDiarioModels_1.default.findByIdAndDelete(detalladoItem._id);
                    borradas.push({ res });
                    index = index + 1;
                }
            }
            else {
                parar = true;
            }
        }
    }
    return borradas;
});
exports.deleteAllService = deleteAllService;
//# sourceMappingURL=DeleteServices.js.map