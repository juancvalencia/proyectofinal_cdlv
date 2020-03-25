//Conexion de la base datos

const mongoose = require('mongoose');

const URI = 'mongodb://localhost/archivo';

mongoose.connect(URI)       //aqui se coloca la url de los proverdores de empresas
         .then(db => console.log('BD esta conectada'))
         .catch(err => console.error(err));  

//exportamos para que pueda ser utilizado por el servidor
module.exports = mongoose;