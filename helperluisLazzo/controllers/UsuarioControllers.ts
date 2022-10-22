import { Response, Request } from 'express'
import { mongo } from 'mongoose';
import DetalladoCierreDiario from '../models/CierreDiarioModels';
import { deleteAllService } from '../services/DeleteServices';



export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const { empresas_id, consecutivo_combustible } = req.body
        let query: any = {}
        if (empresas_id) query.empresas_id = empresas_id
        if (consecutivo_combustible) query["data.ventas_combustible.consecutivo"] = consecutivo_combustible
        console.log(query)
        const detalladoCierre = await DetalladoCierreDiario.aggregate()
            .match(query)
        res.send(detalladoCierre)
    } catch (error: any) {
        res.json({ error: error.message });
    }

}
export const deleteDuplicados = async (req: Request, res: Response) => {
    try {
        const { empresas_id, consecutivo_combustible } = req.body
        const detalladoCierre = await DetalladoCierreDiario.aggregate()
            .match({ empresas_id: empresas_id, "data.ventas_combustible.consecutivo": consecutivo_combustible })
        // res.send(detalladoCierre)
        console.log(empresas_id, consecutivo_combustible)



        if (detalladoCierre.length > 1) {
            let duplocadasABorrar: any[] = [];
            detalladoCierre.map((detalladoItem: any, index: number) => {

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
export const deleteAllDuplicados = async (req: Request, res: Response) => {
    try {
        const { empresas_id, jornadaInicial, jonadaFinal } = req.body
        const respuesta = await deleteAllService(empresas_id, jornadaInicial, jonadaFinal)
        if (respuesta?.length === 0) return res.json({ msg: `No hay consecutivos duplicados para la empresa_id ${empresas_id} en las jornadas inicial:${jornadaInicial} y final ${jonadaFinal}` })
        res.send(respuesta)
    } catch (error: any) {
        res.json({ error: error.message });
    }

}

