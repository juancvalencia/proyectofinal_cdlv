//Como se mostraran los datos mediante un esquema

const mongoose = require('mongoose');
const { Schema } = mongoose;

const TablaRecurso = new Schema({
    Titulo:{ type: String, required:true },
    Claves:{ type: String, required:true },
    Descripcion:{ type: String, required:true },
    Fuente:{ type: String, required:true },
    Tipo_Recurso:{ type: String, required:true },
    Fecha_Creacion_R:{ type: String, required:true },
    Fecha_Subida_R:{ type: String, required:true },
    Ubicacion:{ type: String, required:true }
});

//Modelo de Datos y Exportacion de los datos
module.exports = mongoose.model('Task1',TablaRecurso);