//Creamos un componente 

import React, { Component } from 'react';


class App extends Component {

//Obtener los datos creando un contructor .. utilizando toda la aplicacion creada en react
constructor(){
        super();
        this.state = {
            Titulo:'',
            Claves:'',
            Descripcion:'',
            Fuente:'',
            Tipo_Recurso:'',
            Fecha_Creacion_R:'',
            Fecha_Subida_R:'',
            Ubicacion:'',
            _id:'',                        
            tasks23:[]
        };
        this.handleChange = this.handleChange.bind(this);
        this.AgregarDato = this.AgregarDato.bind(this);
}

AgregarDato(e){
    
        if(this.state._id){
            //actualizando los datos
            fetch(`/api/tasks/${this.state._id}`,{
                method: 'PUT',
                body: JSON.stringify({
                        Titulo: this.state.Titulo,
                        Claves: this.state.Claves,
                        Descripcion: this.state.Descripcion,
                        Fuente: this.state.Fuente,
                        Tipo_Recurso: this.state.Tipo_Recurso,
                        Fecha_Creacion_R: this.state.Fecha_Creacion_R,
                        Fecha_Subida_R: this.state.Fecha_Subida_R,
                        Ubicacion:this.state.Ubicacion
                }),
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                    console.log(data);
                    M.toast({ html : 'Hemos actualizado los datos'});
                    this.setState ({
                        Titulo:'',Claves:'',Descripcion:'',Fuente:'',Tipo_Recurso:'',
                        Fecha_Creacion_R:'',Fecha_Subida_R:'',Ubicacion:'',_id:''            
                    });
                    this.ObtenerDatos();
                });

        } else {

        //   Registro Nuevo
        //console.log(this.state);
        fetch('/api/tasks', {
            method : 'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
            .then(res => res.json())
            //.then(data => console.log(data))
            .then(data => {
                console.log(data);
                M.toast({ html : 'Hemos guardado los datos'});
                this.setState ({
                    Titulo:'',Claves:'',Descripcion:'',Fuente:'',Tipo_Recurso:'',
                    Fecha_Creacion_R:'',Fecha_Subida_R:'',Ubicacion:''            
                });
                this.ObtenerDatos();
            })
            .catch(err => console.error(err));
        }

   e.preventDefault();
}

EliminarDato1(_id){
    if(confirm('Esta seguro de Eliminar?')){
        //console.log('Borrando Dato', id);
        fetch(`/api/tasks/${_id}` ,{
        method: 'DELETE',
        headers:{
            'Accept':'application/(json',
            'Content-Type':'application/json',
        }
    })
    .then(res => res.json())
    .then(data => {
         console.log(data);
            M.toast({html:'Informacion Eliminada'});
            this.ObtenerDatos();
        });
    }
}

EditarDato1(id){
//fetch('/api/tasks' + _id)
    fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
                console.log(data);
                this.setState({
                    Titulo: data.Titulo,
                    Claves: data.Claves,
                    Descripcion: data.Descripcion,
                    Fuente: data.Fuente,
                    Tipo_Recurso: data.Tipo_Recurso,
                    Fecha_Creacion_R: data.Fecha_Creacion_R,
                    Fecha_Subida_R: data.Fecha_Subida_R,
                    Ubicacion:data.Ubicacion,
                    _id: data._id   
            });
        });
}

//Capturo los datos cada vez que un usuario tipee algo
handleChange(e){
   // console.log(e.target); //mustra lo que escribe con codigo fuente
 //      console.log(e.target.value); //Muestra los datos escritos
 //       console.log(e.target.name); //muestra el contenido de un control

        const { name, value} = e.target;
        this.setState({
            [name] : value
        });

}

componentDidMount(){  //utilice evento para obtener las tares
    //console.log('Componente fue montado')
    this.ObtenerDatos();
}

ObtenerDatos(){
    fetch('/api/tasks')
            .then(res => res.json())
            .then(data =>{
            //console.log(data);  Aqui los datos a recoger para la tabla
            this.setState({tasks23:data});
            console.log(this.state.tasks23);
        });
}




    render() {
        return(
            <div>
            {/* Sistema de Navegacion */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Ges-Documentos</a>
                    </div>
                </nav>
            {/* Organizando Contenido */}
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">

                                    <form onSubmit={this.AgregarDato}>
                                        <div className="row"><div className="input-field col s12">
                                            <input name="Titulo" onChange={this.handleChange} type="text" placeholder="Titulo" value={this.state.Titulo} />
                                        </div></div>
                                        <div className="row"><div className="input-field col s12">
                                            <input name="Claves" onChange={this.handleChange} type="text" placeholder="Claves" value={this.state.Claves} />
                                        </div></div>
                                        <div className="row"><div className="input-field col s12">
                                            <textarea name="Descripcion" onChange={this.handleChange} placeholder="Descripcion" className="materialize-textarea" value={this.state.Descripcion}></textarea>                                            
                                        </div></div>
                                        <div className="row"><div className="input-field col s12">
                                            <textarea name="Fuente" onChange={this.handleChange} placeholder="Fuente" className="materialize-textarea" value={this.state.Fuente}></textarea>                                            
                                        </div></div>
                                        <div className="row"><div className="input-field col s12">
                                            <select name="Tipo_Recurso" onChange={this.handleChange} class="browser-default" value={this.state.Tipo_Recurso}>
                                                <option value="" disabled selected>Tipo de Recurso</option>
                                                <option value="Testimonio">Testimonio</option>
                                                <option value="Informe">Informe</option>
                                                <option value="Caso">Caso</option>
                                          </select>
                                        </div></div>
                                        <div className="row"><div className="input-field col s12">
                                            <input name="Fecha_Creacion_R" onChange={this.handleChange} type="text" placeholder="Fecha Inicial" value={this.state.Fecha_Creacion_R} />
                                        </div></div>
                                        <div className="row"><div className="input-field col s12">
                                            <input name="Fecha_Subida_R" onChange={this.handleChange} type="text" placeholder="Fecha Final" value={this.state.Fecha_Subida_R} />
                                        </div></div>
                                        <div className="row"><div className="input-field col s12">
                                            <input name="Ubicacion" onChange={this.handleChange} type="text" placeholder="Ubicacion" value={this.state.Ubicacion} />
                                        </div></div>
                                      

                                        <button type="submit" className="btn light-blue darken-4"> 
                                            Enviar
                                        </button>
                                       
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col s7">
                           <table>
                                <thead>
                                  <tr>
                                   <th>Titulo</th>
                                   <th>Claves</th>
                                   <th>Descripcion</th>
                                   <th>Fuente</th>
                                   <th>Tipo_Recurso</th>
                                   <th>Fecha_Creacion_R</th>
                                   <th>Fecha_Subida_R</th>
                                   <th>Ubicacion</th>
                                   <th>Botones</th>
                                  </tr>
                                </thead>
                                <tbody>
                                        {
                                        this.state.tasks23.map(task => {
                                            return (
                                                    <tr key={task._id}>
                                                            <td> {task.Titulo} </td>
                                                            <td> {task.Claves} </td>
                                                            <td> {task.Descripcion} </td>
                                                            <td> {task.Fuente} </td>
                                                            <td> {task.Tipo_Recurso} </td>
                                                            <td> {task.Fecha_Creacion_R} </td>
                                                            <td> {task.Fecha_Subida_R} </td>
                                                            <td> {task.Ubicacion} </td>
                                                            <td>
                                                                <button className="btn light-blue darken-4" onClick={() => this.EliminarDato1(task._id)}>
                                                                    <i className="material-icons">delete</i>
                                                                </button>
                                                                <button className="btn light-blue darken-4" onClick={() => this.EditarDato1(task._id)} style={{margin:'4px'}}>
                                                                    <i className="material-icons">edit</i>
                                                                </button>


                                                            </td>
                                                            
                                                    </tr>
                                                   )
                                            }) 
                                        }
                                </tbody>
                           </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;