import { ActividadId, Actividades, ActualizarActividad, GuardarActividad } from "./hooks/Conexion";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Input } from 'react-bootstrap';
import DataTable from "react-data-table-component";
import React, { useState } from 'react';
import mensajes from "../utilidades/Mensajes";
import { useNavigate } from "react-router";





const Listar = ({ elementos }) => {
    const [data, setData] = useState([]);
    const navegation = useNavigate();
    const [llactividad, setLlactividad] = useState(false);
    const [actividadEditando, setActividadEditando] = useState(null);
    const [tituloEditando, setTituloEditando] = useState('');
    const [fechaEditando, setFechaEditando] = useState('');
    const [completedEditando, setCompletedEditando] = useState(false);
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);

    const columns = [
        {
            name: 'Titulo',
            selector: row => row.title,
            sorteable: true,
        },
        {
            name: 'Fecha de vencimiento',
            selector: row => row.dueDate,
            sorteable: true,
        },
        {
            name: 'Completado',
            selector: row => String(row.completed),
            cell: row => (
                <div style={{
                    backgroundColor: row.completed ? 'green' : 'red',
                    width: '100px',
                    height: '50px',
                    padding: '5%',
                    textAlign: "center"
                }} >
                    {row.completed ? 'Si' : 'No'}
                </div>
            )
        },
        {
            name: 'Acciones',
            cell: (row, index) => (
                //<button onClick={() => handleEditar(row, index)}>Editar</button>
                <button type="button" onClick={() => handleEditar(row, index)} class="btn btn-warning">Editar</button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];


    const handleEditar = async (elemento) => {
        ActividadId(elemento.id).then((info) => {
            setActividadEditando(info);
            setTituloEditando(info.title || ''); // Asegurarse de que el valor sea una cadena
            setFechaEditando(info.dueDate ? new Date(elemento.dueDate).toISOString().slice(0, 16) : ''); // Asegurarse de que el valor sea una cadena
            setCompletedEditando(info.completed || false); // Asegurarse de que el valor sea un booleano
            setFilaSeleccionada(elemento.id);
        })

    };

    const handleGuardar = () => {
        var datos = {
            "id": data[filaSeleccionada].id,
            "title": tituloEditando,
            "dueDate": fechaEditando,
            "completed": completedEditando
        };

        ActualizarActividad(datos);

        setActividadEditando(null);
        setTituloEditando('');
        setFechaEditando('');
        setCompletedEditando(false);
        navegation('/listar')
    };


    const handleSalir = () => {
        // Limpiar el elemento en edición
        setActividadEditando(null);
        setTituloEditando('');
        setFechaEditando('');
        setCompletedEditando(false);
    };

    Actividades().then((info) => {
        var aux = info;

        if (!llactividad) {
            if (aux.error == true) {
                mensajes(aux.mensajes);
            } else {
                setData(aux);
            }
            setLlactividad(true);
        }
    })

    return (
        <div className="d-flex flex-column">
            {actividadEditando ? (
                // Mostrar pestaña de edición
                <div className='container-fluid'>
                    <div className="col-lg-10">
                        <div className="p-6">
                            <h1 className="h4 text-gray-900 mb-5">Editar Actividad</h1>
                            <label>
                                Titulo:
                                <input className="form-control form-control-user" placeholder="Ingrese el título"
                                    type="text"
                                    value={tituloEditando}
                                    onChange={(e) => setTituloEditando(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                Fecha de vencimiento:
                                <input
                                    className="form-control form-control-user" placeholder="Ingrese la fecha de vencimiento"
                                    type="datetime-local"
                                    value={fechaEditando}
                                    onChange={(e) => setFechaEditando(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                Completado:
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={completedEditando}
                                        onChange={(e) => setCompletedEditando(e.target.checked)}
                                    />
                                </div>
                            </label>
                            <br />
                            {/* Agregar botón de "Guardar" */}
                            <button className="btn btn-facebook btn-user btn-block" onClick={handleGuardar}>Guardar</button>
                            <button className="btn btn-google btn-user btn-block" onClick={handleSalir}>Salir</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <h1 className="h3 text-gray-800 mb-5">Actividades registradas</h1>
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                    />
                    <a href={"/"} type="button" class="btn btn-secondary">Regresar</a>
                </div>
            )}
        </div>
    );
}

export default Listar;