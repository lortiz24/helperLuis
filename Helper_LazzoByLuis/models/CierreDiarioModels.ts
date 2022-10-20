const { Schema, model } = require('mongoose')


const Detallado_cierre_diario = Schema({
    empresas_id: {
        type: Number,
    },
    jornada_id: {
        type: Number,
        required: [true, "email es requerido"],


    },
    equipos_id: {
        type: Number,
        required: [true, "tipo es requerido"],
        enum: ['ADMIN_ROLE', 'USER_ROLE']

    },
    data: {
        type: JSON,
    }

},
    {
        collection: 'detallado_cierre_diario'
    }
)
export default model('detallado_cierre_diario', Detallado_cierre_diario);