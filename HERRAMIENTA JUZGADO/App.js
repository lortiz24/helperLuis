const axios = require('axios');




const busquedaProceso = async (valorBusqueda = 0) => {
    try {
        const url = `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Procesos/Consulta/NumeroRadicacion?numero=080013103014201900447${valorBusqueda <10 ? `0${valorBusqueda}`:valorBusqueda }&SoloActivos=false&pagina=1`
        const { data } = await axios.get(url);
        
        return data
    } catch (error) {
        console.log(error)
    }
}



const repeticion = async () => {
    let seguir = true
    let numRepetitions = 0;
    do {
        const data = await busquedaProceso(numRepetitions)
        console.log(data.procesos.length)
        if(data.procesos.length > 0) seguir = false
        numRepetitions++;
        
    } while (seguir && numRepetitions < 100);
    console.log('llege al final')
};

repeticion()