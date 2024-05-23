"use client";
import Image from 'next/image';
import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import axios from 'axios';
import "./page.scss";

import NoImagen from '../../../../../public/imagenes/noimagen.svg'
import ActualizarImgane from '../../../../../public/imagenes/actualizarImagen.svg'

interface ModalUpdate {
    isOpen: boolean;
    onClose: () => void;
    Datos: {
        id: number;
        cedula: string;
        nombre: string;
        apellido: string;
        fecha_Nacimiento:string;
        correo: string;
        contrasenia: string;
        telefono: string;
        direccion: string;
        estado:number;
    };
    setDatos: React.Dispatch<React.SetStateAction<{
        id: number;
        cedula: string;
        nombre: string;
        apellido: string;
        fecha_Nacimiento:string;
        correo: string;
        contrasenia: string;
        telefono: string;
        direccion: string;
        estado:number;
    }>>;
}
//

const ModalUpdate: React.FC<ModalUpdate> = ({ isOpen, onClose,Datos,setDatos }) => {

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDatos({
            ...Datos,
            [name]: value
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onClose();
    };

    const actualizarEmpleado = async () =>{
        try {
            const response = await axios.put(`http://localhost:4500/api/Web/empleado`, Datos);
            alert("empleado actualizado de manera exitosa")  
            onClose();          
        } catch (error) {
            alert("Hubo un problema con el servidor")
        }
    }

    return (
        <>
            {isOpen && (
                <div className="contenedorPrincipal">
                    <div className="contenedorTarjeta">
                        <div className="tarjeta">
                            <div className="encabezado">
                                <h1>Actualizar Empleados</h1>
                            </div>
                            <div className="contenido">
                                <div className='formulario'>
                                    <form onSubmit={handleSubmit}>
                                        <div className="ingresos">
                                            <label htmlFor="cedula" className="label">Cédula:</label>
                                            <div className="contenedorIngreso">
                                                <input type="text" id="cedula" name="cedula" value={Datos.cedula} onChange={handleInputChange} className="ingreso" required />
                                                <svg className='iconoIngreso' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M17.73 12.462q.214 0 .358-.144t.143-.356t-.144-.357t-.356-.143h-3.077q-.213 0-.357.143q-.143.143-.143.357t.143.356t.357.144zm0-2.77q.214 0 .358-.143t.143-.357t-.144-.356t-.356-.144h-3.077q-.213 0-.357.143q-.143.144-.143.357t.143.357t.357.143zm-8.653 3.616q-.823 0-1.394.114q-.572.114-1.025.368q-.39.21-.589.459t-.198.532q0 .223.177.375t.444.152h5.17q.267 0 .444-.165t.177-.393q0-.252-.189-.489t-.598-.47q-.454-.255-1.025-.369t-1.394-.114m0-1.616q.633 0 1.066-.433q.434-.434.434-1.067t-.434-1.066t-1.066-.434t-1.066.434t-.434 1.066t.434 1.067t1.066.433M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h14.77q.69 0 1.152.463T21 6.616v10.769q0 .69-.463 1.153T19.385 19zm0-1h14.769q.23 0 .423-.192t.192-.424V6.616q0-.231-.192-.424T19.385 6H4.615q-.23 0-.423.192T4 6.616v10.769q0 .23.192.423t.423.192M4 18V6z"/></svg>
                                            </div>
                                        </div>
                                        <div className="ingresos">
                                            <label htmlFor="nombre" className="label">Nombre:</label>
                                            <div className="contenedorIngreso">
                                                <input type="text" id="nombre" name="nombre" value={Datos.nombre} onChange={handleInputChange} className="ingreso" required />
                                                <svg className='iconoIngreso' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 26 26"><path fill="currentColor" d="M16.563 15.9c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07c0-4.107-2.731-6.26-5.905-6.26c-3.176 0-5.892 2.152-5.892 6.26c0 2.682 1.244 5.406 2.891 7.088c.642 1.684-.506 2.309-.746 2.397c-3.324 1.202-7.224 3.393-7.224 5.556v.811c0 2.947 5.714 3.617 11.002 3.617c5.296 0 10.938-.67 10.938-3.617v-.811c0-2.228-3.919-4.402-7.407-5.557"/></svg>
                                            </div>
                                        </div>
                                        <div className="ingresos">
                                            <label htmlFor="apellido" className="label">Apellido:</label>
                                            <div className="contenedorIngreso">
                                                <input type="text" id="apellido" name="apellido" value={Datos.apellido} onChange={handleInputChange} className="ingreso" required />
                                                <svg className='iconoIngreso' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6.196 17.485q1.275-.918 2.706-1.451Q10.332 15.5 12 15.5t3.098.534t2.706 1.45q.99-1.025 1.593-2.42Q20 13.667 20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.667.603 3.064q.603 1.396 1.593 2.42M12 12.5q-1.263 0-2.132-.868T9 9.5t.868-2.132T12 6.5t2.132.868T15 9.5t-.868 2.132T12 12.5m0 8.5q-1.883 0-3.525-.701t-2.858-1.916t-1.916-2.858T3 12t.701-3.525t1.916-2.858q1.216-1.215 2.858-1.916T12 3t3.525.701t2.858 1.916t1.916 2.858T21 12t-.701 3.525t-1.916 2.858q-1.216 1.215-2.858 1.916T12 21"/></svg>
                                            </div>
                                        </div>
                                        <div className="ingresos">
                                            <label htmlFor="fecha_Nacimiento" className="label">Fecha de Nacimiento:</label>
                                            <div className="contenedorIngreso contenedorIngresoCalendario">
                                                <input type="date" id="fecha_Nacimiento" name="fecha_Nacimiento" value={Datos.fecha_Nacimiento} onChange={handleInputChange} className="ingreso" required />
                                            </div>
                                        </div>
                                        <div className="ingresos">
                                            <label htmlFor="direccion" className="label">Dirección:</label>
                                            <div className="contenedorIngreso">
                                            <input type="text" id="direccion" name="direccion" value={Datos.direccion} onChange={handleInputChange} className="ingreso" required />
                                            <svg className='iconoIngreso' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.5 7A2.5 2.5 0 0 1 14 9.5a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 9 9.5A2.5 2.5 0 0 1 11.5 7m0 1A1.5 1.5 0 0 0 10 9.5a1.5 1.5 0 0 0 1.5 1.5A1.5 1.5 0 0 0 13 9.5A1.5 1.5 0 0 0 11.5 8m-4.7 4.36l4.7 7.73l4.7-7.73c.51-.86.8-1.81.8-2.86A5.5 5.5 0 0 0 11.5 4A5.5 5.5 0 0 0 6 9.5c0 1.05.29 2 .8 2.86m10.25.52L11.5 22l-5.55-9.12C5.35 11.89 5 10.74 5 9.5A6.5 6.5 0 0 1 11.5 3A6.5 6.5 0 0 1 18 9.5c0 1.24-.35 2.39-.95 3.38"/></svg>

                                            </div>
                                        </div>
                                        <div className="ingresos">
                                            <label htmlFor="telefono" className="label">Teléfono:</label>
                                            <div className="contenedorIngreso">
                                                <input type="text" id="telefono" name="telefono" value={Datos.telefono} onChange={handleInputChange} className="ingreso" required />
                                                <svg className='iconoIngreso' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19.077 11.462q-.173-2.83-2.153-4.809T12.116 4.5v-1q1.625.077 3.04.722q1.417.645 2.485 1.713t1.714 2.485q.645 1.416.722 3.041zm-4 0q-.173-1.154-.99-1.981T12.116 8.5v-1q1.575.154 2.681 1.27t1.28 2.692zM18.931 20q-2.529 0-5.185-1.266t-4.944-3.555q-2.27-2.288-3.536-4.935T4 5.07q0-.45.3-.76T5.05 4h2.473q.408 0 .712.257t.411.659L9.142 7.3q.07.42-.025.733t-.333.513L6.59 10.592q.616 1.117 1.361 2.076t1.59 1.817q.87.87 1.874 1.62q1.004.749 2.204 1.414l2.139-2.177q.244-.263.549-.347q.304-.083.674-.033l2.103.43q.408.1.662.411t.254.712v2.435q0 .45-.31.75t-.76.3M6.122 9.654l1.92-1.765q.095-.077.124-.212q.03-.135-.01-.25l-.443-2.12q-.039-.153-.135-.23T7.327 5H5.275q-.115 0-.192.077t-.077.192q.029 1.025.321 2.14t.794 2.245m8.45 8.334q1.014.502 2.16.743q1.148.24 2 .257q.115 0 .192-.077T19 18.72v-2.008q0-.153-.077-.25q-.077-.096-.23-.134l-1.85-.379q-.116-.039-.203-.01q-.086.03-.182.125zm0 0"/></svg>
                                            </div>
                                        </div>
                                        <div className="ingresos">
                                            <label htmlFor="correo" className="label">Correo:</label>
                                            <div className="contenedorIngreso">
                                                <input type="email" id="correo" name="correo" value={Datos.correo} onChange={handleInputChange} className="ingreso" required />
                                                <svg className='iconoIngreso' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h14.77q.69 0 1.152.463T21 6.616v10.769q0 .69-.463 1.153T19.385 19zM20 6.885l-7.552 4.944q-.106.055-.214.093q-.109.037-.234.037t-.234-.037t-.214-.093L4 6.884v10.5q0 .27.173.443t.443.173h14.769q.269 0 .442-.173t.173-.443zM12 11l7.692-5H4.308zM4 6.885v.211v-.811v.034V6v.32v-.052v.828zV18z"/></svg>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                                <div className="botones">
                                    <button type="submit" onClick={actualizarEmpleado} className="boton boton1">Guardar</button>
                                    <button type="button" onClick={onClose} className="boton boton2">Cancelar</button>
                                </div>


                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalUpdate;