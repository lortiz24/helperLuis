
import DetalladoCierreDiario from '../models/CierreDiarioModels';

export const deleteAllService = async (empresas_id: any, jornadaInicial: any, jonadaFinal: any) => {
    let borradas: any[] = []
    const detalladoCierre = await DetalladoCierreDiario.aggregate().match({ empresas_id: empresas_id, jornada_id: { $gte: jornadaInicial, $lte: jonadaFinal } })
    let ventasDuplicadas: any[] = []
    let unicas: any = {}
    for (const detalladoItem of detalladoCierre) {

        let consecutivoOriginal = detalladoItem.data.ventas_combustible[0]?.consecutivo || 'undefined'
        ventasDuplicadas = detalladoCierre.filter((item: any) => {
            const consecutivoActual = item.data.ventas_combustible[0]?.consecutivo ?? 'undefined'
           /*  console.log({
                consecutivoOriginal,
                consecutivoActual,
                validacion:consecutivoActual === consecutivoOriginal
            }) */
            return consecutivoActual === consecutivoOriginal
        })

    }
    console.log(ventasDuplicadas)
    if (ventasDuplicadas.length > 1) {
        ventasDuplicadas.forEach((detalladoItem: any, index: number) => {
            if (!unicas[detalladoItem.data.ventas_combustible[0]?.consecutivo]) {
                unicas[detalladoItem.data.ventas_combustible[0]?.consecutivo] = true;
                return
            }
            borradas.push(DetalladoCierreDiario.findByIdAndDelete(detalladoItem._id))
        })


    }
    const respuesta = await Promise.all(borradas)
    return respuesta


}