import { Response, Request } from 'express'
import { mongo } from 'mongoose';
import DetalladoCierreDiario from '../models/CierreDiarioModels';

export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const { empresas_id } = req.body

        const detalladoCierre = await DetalladoCierreDiario.find({ empresas_id: empresas_id/* , jornada_id: jornada_id */ })


        let actualizaciones: any[] = [];
        detalladoCierre.map((detalladoItem: any) => {
            let hashCombustibles: any = {};
            let hashCanastilla: any = {};
            let hashKisco: any = {};

            const ventas_combustible_unicas = detalladoItem.data.ventas_combustible?.filter((ventaCombustible: any) => hashCombustibles[ventaCombustible.venta] ? false : hashCombustibles[ventaCombustible.venta] = true) ?? []
            const ventas_canastilla_unicas = detalladoItem.data.ventas_canastilla?.filter((ventaCanastilla: any) => hashCanastilla[ventaCanastilla.venta] ? false : hashCanastilla[ventaCanastilla.venta] = true) ?? []
            const ventas_kiosco_unicas = detalladoItem.data.ventas_kiosco?.filter((ventaKiosco: any) => hashKisco[ventaKiosco.venta] ? false : hashKisco[ventaKiosco.venta] = true) ?? []


            if (!!detalladoItem.data.ventas_combustible /* && ventas_combustible_unicas?.length !== detalladoItem.data.ventas_combustible?.length */) detalladoItem.data.ventas_combustible = ventas_combustible_unicas


            if (!!detalladoItem.data.ventas_canastilla /* && ventas_canastilla_unicas?.length !== detalladoItem.data.ventas_canastilla?.length */) detalladoItem.data.ventas_canastilla = ventas_canastilla_unicas


            if (!!detalladoItem.data.ventas_kiosco /* && ventas_kiosco_unicas?.length !== detalladoItem.data.ventas_kiosco?.length */) detalladoItem.data.ventas_kiosco = ventas_kiosco_unicas

            actualizaciones.push(DetalladoCierreDiario.findByIdAndUpdate(detalladoItem._id, { data: detalladoItem.data }))

        })

        const backup = await Promise.all(actualizaciones);

        res.send({
            backup,
            cierres_modificados: detalladoCierre
        })
    } catch (error: any) {
        res.json({ error: error.message });
    }

}
export const deleteDuplicadosAll = async (req: Request, res: Response) => {
    try {


        const detalladas_by_combustible = await DetalladoCierreDiario.find({})

        if (detalladas_by_combustible.length > 1) {
            let duplocadasABorrar: any[] = [];
            let hashCombustibles: any = {};
            const registrosDuplicados = detalladas_by_combustible.filter((ventaCombustible: any) => {
                if
                hashCombustibles[ventaCombustible.data.ventas_combustible && ventaCombustible.data.ventas_combustible[0]?.venta] ? true : hashCombustibles[ventaCombustible.data.ventas_combustible && ventaCombustible.data.ventas_combustible[0]?.venta] = true
            }) ?? []

            registrosDuplicados.map((registro: any) => {
                duplocadasABorrar.push(DetalladoCierreDiario.findByIdAndDelete(registro._id))
            })
            const backup = await Promise.all(duplocadasABorrar);
            return res.send({
                backup
            })
        }

        res.send({
            msg: "No hay registros duplicados"
        })
    } catch (error: any) {
        res.json({ error: error.message });
    }

}

export const deleteDuplicados = async (req: Request, res: Response) => {
    try {
        const { consecutivo_combustible, consecutivo_kisco, consecutivo_canastilla } = req.body

        const detalladas_by_combustible = await DetalladoCierreDiario.find({ "data.ventas_combustible.venta": consecutivo_combustible })
        console.log(detalladas_by_combustible.length)
        if (detalladas_by_combustible.length > 1) {
            let duplocadasABorrar: any[] = [];
            detalladas_by_combustible.map((detalladoItem: any, index: number) => {

                if (index === 0) return
                duplocadasABorrar.push(DetalladoCierreDiario.findByIdAndDelete(detalladoItem._id))

            })

            const backup = await Promise.all(duplocadasABorrar);
            return res.send({
                backup
            })
        }

        res.send({
            msg: "No hay registros duplicados con ese consecutivo"
        })
    } catch (error: any) {
        res.json({ error: error.message });
    }

}

