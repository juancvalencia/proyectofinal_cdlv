//Inicializa el servidor
 
const express = require('express');
const morgan = require('morgan');
const path= require('path');
const { mongoose } = require('./database');

const app = express(); 

/*
app.get('/',function(request, response){
    response.send('Prueba Comision de la Verdad -- Gestion Documental');
  });
*/
  
//Configuracion 
    //Configuracion para  la nube
    app.set('port', process.env.PORT || 3000)


//Middlewares -- Funciones que se ejecuten antes de las rutas
app.use(morgan('dev'));  //observo mensaje en modo texto
app.use(express.json()); // comprueba si el dato es un formato JSON


//Rutas
//app.use(require('./routes/task.routes'));
    //Con prefijo adicional
    app.use('/api/tasks',require('./routes/task.routes'));


//Archivos Staticos
        //console.log(path.join(__dirname, 'public'));
        //console.log(__dirname + '/public');
        //app.use(express.static());
        app.use(express.static(path.join(__dirname, 'public'))); //Codigo multiplataforma



//Inicializacion del Servidor
app.listen(app.get('port'), () => {
 console.log(`Servidor utilizando el puerto ${app.get('port')}`);
});