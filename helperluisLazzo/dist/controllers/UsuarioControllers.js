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
exports.deleteAllDuplicados = exports.deleteDuplicados = exports.getUsuarios = void 0;
const CierreDiarioModels_1 = __importDefault(require("../models/CierreDiarioModels"));
const DeleteServices_1 = require("../services/DeleteServices");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { empresas_id, consecutivo_combustible } = req.body;
        let query = {};
        if (empresas_id)
            query.empresas_id = empresas_id;
        if (consecutivo_combustible)
            query["data.ventas_combustible.consecutivo"] = consecutivo_combustible;
        console.log(query);
        const detalladoCierre = yield CierreDiarioModels_1.default.aggregate()
            .match(query);
        res.send(detalladoCierre);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getUsuarios = getUsuarios;
const deleteDuplicados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { empresas_id, consecutivo_combustible } = req.body;
        const detalladoCierre = yield CierreDiarioModels_1.default.aggregate()
            .match({ empresas_id: empresas_id, "data.ventas_combustible.consecutivo": consecutivo_combustible });
        // res.send(detalladoCierre)
        console.log(empresas_id, consecutivo_combustible);
        if (detalladoCierre.length > 1) {
            let duplocadasABorrar = [];
            detalladoCierre.map((detalladoItem, index) => {
                if (index === 0)
                    return;
                duplocadasABorrar.push(CierreDiarioModels_1.default.findByIdAndDelete(detalladoItem._id));
            });
            const backup = yield Promise.all(duplocadasABorrar);
            return res.send({
                backup
            });
        }
        res.send({
            msg: "No hay registros duplicados con ese consecutivo"
        });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.deleteDuplicados = deleteDuplicados;
const deleteAllDuplicados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { empresas_id, jornadaInicial, jonadaFinal } = req.body;
        const respuesta = yield (0, DeleteServices_1.deleteAllService)(empresas_id, jornadaInicial, jonadaFinal);
        if ((respuesta === null || respuesta === void 0 ? void 0 : respuesta.length) === 0)
            return res.json({ msg: `No hay consecutivos duplicados para la empresa_id ${empresas_id} en las jornadas inicial:${jornadaInicial} y final ${jonadaFinal}` });
        res.send(respuesta);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.deleteAllDuplicados = deleteAllDuplicados;
//# sourceMappingURL=UsuarioControllers.js.map