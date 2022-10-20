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
exports.deleteDuplicados = exports.deleteDuplicadosAll = exports.getUsuarios = void 0;
const CierreDiarioModels_1 = __importDefault(require("../models/CierreDiarioModels"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { empresas_id } = req.body;
        const detalladoCierre = yield CierreDiarioModels_1.default.find({ empresas_id: empresas_id /* , jornada_id: jornada_id */ });
        let actualizaciones = [];
        detalladoCierre.map((detalladoItem) => {
            var _a, _b, _c, _d, _e, _f;
            let hashCombustibles = {};
            let hashCanastilla = {};
            let hashKisco = {};
            const ventas_combustible_unicas = (_b = (_a = detalladoItem.data.ventas_combustible) === null || _a === void 0 ? void 0 : _a.filter((ventaCombustible) => hashCombustibles[ventaCombustible.venta] ? false : hashCombustibles[ventaCombustible.venta] = true)) !== null && _b !== void 0 ? _b : [];
            const ventas_canastilla_unicas = (_d = (_c = detalladoItem.data.ventas_canastilla) === null || _c === void 0 ? void 0 : _c.filter((ventaCanastilla) => hashCanastilla[ventaCanastilla.venta] ? false : hashCanastilla[ventaCanastilla.venta] = true)) !== null && _d !== void 0 ? _d : [];
            const ventas_kiosco_unicas = (_f = (_e = detalladoItem.data.ventas_kiosco) === null || _e === void 0 ? void 0 : _e.filter((ventaKiosco) => hashKisco[ventaKiosco.venta] ? false : hashKisco[ventaKiosco.venta] = true)) !== null && _f !== void 0 ? _f : [];
            if (!!detalladoItem.data.ventas_combustible /* && ventas_combustible_unicas?.length !== detalladoItem.data.ventas_combustible?.length */)
                detalladoItem.data.ventas_combustible = ventas_combustible_unicas;
            if (!!detalladoItem.data.ventas_canastilla /* && ventas_canastilla_unicas?.length !== detalladoItem.data.ventas_canastilla?.length */)
                detalladoItem.data.ventas_canastilla = ventas_canastilla_unicas;
            if (!!detalladoItem.data.ventas_kiosco /* && ventas_kiosco_unicas?.length !== detalladoItem.data.ventas_kiosco?.length */)
                detalladoItem.data.ventas_kiosco = ventas_kiosco_unicas;
            actualizaciones.push(CierreDiarioModels_1.default.findByIdAndUpdate(detalladoItem._id, { data: detalladoItem.data }));
        });
        const backup = yield Promise.all(actualizaciones);
        res.send({
            backup,
            cierres_modificados: detalladoCierre
        });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getUsuarios = getUsuarios;
const deleteDuplicadosAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const detalladas_by_combustible = yield CierreDiarioModels_1.default.find({});
        if (detalladas_by_combustible.length > 1) {
            let duplocadasABorrar = [];
            let hashCombustibles = {};
            const registrosDuplicados = (_a = detalladas_by_combustible.filter((ventaCombustible) => { var _a, _b; return hashCombustibles[ventaCombustible.data.ventas_combustible && ((_a = ventaCombustible.data.ventas_combustible[0]) === null || _a === void 0 ? void 0 : _a.venta)] ? true : hashCombustibles[ventaCombustible.data.ventas_combustible && ((_b = ventaCombustible.data.ventas_combustible[0]) === null || _b === void 0 ? void 0 : _b.venta)] = true; })) !== null && _a !== void 0 ? _a : [];
            registrosDuplicados.map((registro) => {
                duplocadasABorrar.push(CierreDiarioModels_1.default.findByIdAndDelete(registro._id));
            });
            const backup = yield Promise.all(duplocadasABorrar);
            return res.send({
                backup
            });
        }
        res.send({
            msg: "No hay registros duplicados"
        });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.deleteDuplicadosAll = deleteDuplicadosAll;
const deleteDuplicados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { consecutivo_combustible, consecutivo_kisco, consecutivo_canastilla } = req.body;
        const detalladas_by_combustible = yield CierreDiarioModels_1.default.find({ "data.ventas_combustible.venta": consecutivo_combustible });
        console.log(detalladas_by_combustible.length);
        if (detalladas_by_combustible.length > 1) {
            let duplocadasABorrar = [];
            detalladas_by_combustible.map((detalladoItem, index) => {
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
//# sourceMappingURL=UsuarioControllers.js.map