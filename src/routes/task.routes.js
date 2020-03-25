const express = require('express');
const router = express.Router(); //Metodo devuelve un objeto que puedo ingresar rutas

//llamo el modelo de la base de datos
const Tarea1 = require('../models/task');

//defino rutas de mi servidor

router.get('/', async (req, res) =>{
        const tareas = await Tarea1.find();
        console.log(tareas);
        //res.json('Recibido consulta');
        res.json(tareas);
});

//Solo ejecutar una unica tarea
router.get('/', async (req, res) =>{
    const only_tarea = await Tarea1.findById(req.params.id);
    res.json(only_tarea);
});

//metodo para agregar datos
router.post('/', async (req, res) =>{
    const{Titulo,Claves,Descripcion,Fuente,Tipo_Recurso,Fecha_Creacion_R,Fecha_Subida_R,Ubicacion} = req.body;
    const tar_enviar = new Tarea1({
        Titulo,
        Claves,
        Descripcion,
        Fuente,
        Tipo_Recurso,
        Fecha_Creacion_R,
        Fecha_Subida_R,
        Ubicacion
    });
    
    
    console.log(tar_enviar);

    await tar_enviar.save();
    res.json({status: 'Tarea Guardada'})
    //res.json('Terminado Peticion')
    //const tareas = await Tarea1.find();
    
});

//Metodo para actualizar
router.put('/:id', async (req, res) =>{
    const{Titulo,Claves,Descripcion,Fuente,Tipo_Recurso,Fecha_Creacion_R,Fecha_Subida_R,Ubicacion} = req.body;
    const tar_actualizar = {
        Titulo,
        Claves,
        Descripcion,
        Fuente,
        Tipo_Recurso,
        Fecha_Creacion_R,
        Fecha_Subida_R,
        Ubicacion
    };
    
    await Tarea1.findByIdAndUpdate(req.params.id, tar_actualizar);
        
    console.log(req.params.id);
    res.json({status: 'Tarea Actualizada'})
    //res.json('Terminado Peticion')
    //const tareas = await Tarea1.find();
    
});

//Metodo Eliminar
router.delete('/:id', async (req, res) =>{
        
    await Tarea1.findByIdAndRemove(req.params.id);
        
    //console.log(req.params.id);
    res.json({status: 'Tarea Eliminada'})
    
});

module.exports = router;


/*
router.get('/', (req, res) =>{
//Consulta
    recurso.find(function(err, task) =>{
        console.log(task);
    });
//res.send('Hello Word');
    res.json({
        status:'API Works'
    });

}); */


