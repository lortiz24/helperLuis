
import DetalladoCierreDiario from '../models/CierreDiarioModels';

export const deleteAllService = async (empresas_id: any, jornadaInicial: any, jonadaFinal: any) => {
    let borradas: any[] = []
    const detalladoCierre = await DetalladoCierreDiario.aggregate().match({ empresas_id: empresas_id, jornada_id: { $gte: jornadaInicial, $lte: jonadaFinal } })

    for (const detalladoItem of detalladoCierre) {
        let parar = false
        for (const item of detalladoItem.data.ventas_combustible) {

            if (parar) break

            const detalladoCierre = await DetalladoCierreDiario.aggregate()
                .match({ empresas_id: empresas_id, "data.ventas_combustible.consecutivo": item.consecutivo })
                
            if (detalladoCierre.length > 1) {
                console.log(detalladoCierre)
                parar = true
                let index = 0
                for (const detalladoItem of detalladoCierre) {
                    if (index === 0) return
                     const res = await DetalladoCierreDiario.findByIdAndDelete(detalladoItem._id)
                    borradas.push({res})
                    index = index + 1
                }

            } else {
                parar = true
            }
        }

    }

    return borradas
}