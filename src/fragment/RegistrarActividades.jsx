import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Actividades, ConseguirId, GuardarActividad } from "./hooks/Conexion";
import { useForm } from "react-hook-form";
import mensajes from "../utilidades/Mensajes";
import { useState } from "react";

const RegistrarActividades = () => {
    const navegation = useNavigate();
    const [llnro, setllnro] = useState(false);
    const {register, handleSubmit, formState:{errors}} = useForm();    
    //acciones
    //submit
    const onSubmit = (data) => {
        
        var datos = {
          "title": data.title,
          "dueDate":data.date,
          "completed": data.completed
        };
        GuardarActividad(datos).then((info) => {          
            if(info.error === true ){
            mensajes(info.message, 'error', 'Error');
            mensajes(info.message);            
          } else {            
            mensajes(info.message);
            navegation('/listar'); 
          }
        }
        );
    };
    
    return ( 
        <div className="wrapper">
            <div className="d-flex flex-column">
                <div className="content">

                    {/** DE AQUI CUERPO */}

                    <div className='container-fluid'>
                        <div className="col-lg-10">
                            <div className="p-6">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-5">Registro de Actividades</h1>
                                </div>
                                <form className="user" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="col-md-6 mb-5">
                                        <input type="text" {...register('title',{required:true})} className="form-control form-control-user" placeholder="Ingrese el título" />
                                        {errors.vane && errors.vane.type === 'required' && <div className='alert alert-danger'>Ingrese una id</div>}
                                    </div>
                                    <div className="col-md-6 mb-5">
                                        <input type="datetime-local" className="form-control form-control-user" placeholder="Ingrese la fecha de vencimiento" {...register('date',{required:true})} />
                                        {errors.anio && errors.anio.type === 'required' && <div className='alert alert-danger'>Ingrese la fecha de vencimiento</div>}
                                    </div>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" {...register('completed')}/>
                                        <label>Completo</label>
                                    </div>                                 
                                    
                                    <hr />
                                    
                                    <input className="btn btn-facebook btn-user btn-block" type='submit' value="Registrar"></input>
                                    <a href={"/listar"} className="btn btn-google btn-user btn-block">
                                        <i className="fab fa-google fa-fw"></i> Cancelar
                                    </a>
                                </form>
                                <hr />
                                <a href={"/"} type="button" class="btn btn-secondary">Regresar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default RegistrarActividades;