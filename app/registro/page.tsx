"use client";
import axios from 'axios';
import React from 'react';
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    BsCalendar2Day,
    BsCardHeading,
    BsEye,
    BsMailbox,
    BsPerson,
    BsReverseLayoutTextWindowReverse,
} from "react-icons/bs";
import imagenClientes from "../../public/imagenes/imagenClientes.svg";
import ResponsivoNav from "../componentes/navegacion/ResponsivoNav";

function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onSubmit: SubmitHandler<any> = (data) => {
        axios.post('http://localhost:4500/api/Web/clientes/register', data)
            .then(response => {
                alert("Usuario creado");
                window.location.href = "/login"
            })
            .catch(error => {
                alert("Hubo un problema al procesar la información. Intente más tarde");
                console.error('Error submitting data:', error);
            });
    };
    const renderError = (error: any) => {
        if (error && typeof error.message === 'string') {
            return <p className="text-red-500 text-lg">{error.message}</p>;
        }
        return null;
    };
    const validarFechaNacimiento = (value: any) => {
        // Convertir la fecha de nacimiento a un objeto Date
        const fechaNacimiento = new Date(value);
        // Calcular la fecha actual
        const fechaActual = new Date();
        // Calcular la edad restando los años de la fecha de nacimiento de la fecha actual
        const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

        // Verificar si la edad es menor de 18 años
        if (edad < 18) {
            return "Debes ser mayor de 18 años";
        }

        return undefined; // Devuelve undefined si el usuario es mayor de 18 años
    };


    return (
        <>
            <ResponsivoNav />
            <div
                className="h-[calc(100vh-7rem)]"
                style={{
                    backgroundImage: 'url("/imagenes/fondo.svg")',
                    minHeight: "calc(88vh)",
                }}
            >
                <div className="w-full grid grid-cols-5">
                    {/* Parte izquierda */}
                    <div className="flex justify-center items-center col-span-3 row-start-1 mt-[5%] ">
                        <div>
                            <Image
                                src={imagenClientes}
                                alt="Descripción de la imagen"
                                className="w-[80%]"
                            />
                        </div>
                    </div>
                    {/* Parte derecha */}
                    <div className="col-start-4 col-span-2 mr-[10%] mt-[5%]">
                        <form className="w-full grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
                            <h1 className="text-black font-bold text-4xl mb-4 col-span-2 text-center">
                                Registro de Clientes
                            </h1>

                            {/* Campo para la cédula */}
                            <div>
                                <label htmlFor="cedula" className="text-slate-500 mb-2 block text-sm">Cédula:</label>
                                <div className="flex relative">
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        {...register("cedula", {
                                            required: { value: true, message: "La cédula es obligatoria" },
                                            pattern: { value: /^[0-9]{10}$/, message: "La cédula debe tener 10 dígitos" }
                                        })}
                                        className="p-3 rounded block mb-2 text-black border border-black w-full"
                                        placeholder="1802154687"
                                        onKeyPress={(event) => {
                                            const charCode = event.which ? event.which : event.keyCode;
                                            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                    <BsCardHeading className="w-6 h-6 absolute right-2 top-3 pointer-events-none" />
                                </div>
                                {renderError(errors.cedula)}
                            </div>



                            {/* Campo para el nombre */}
                            <div>
                                <label htmlFor="nombre" className="text-slate-500 mb-2 block text-sm">Nombre:</label>
                                <div className="flex relative">
                                    <input
                                        type="text"
                                        {...register("nombre", {
                                            required: { value: true, message: "El nombre es obligatorio" },
                                            minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" }
                                        })}
                                        className="p-3 rounded block mb-2 text-black border border-black w-full"
                                        placeholder="Juan"
                                    />
                                    <BsPerson className="w-6 h-6 absolute right-2 top-3 pointer-events-none" />
                                </div>
                                {renderError(errors.nombre)}
                            </div>

                            {/* Campo para el apellido */}
                            <div>
                                <label htmlFor="apellido" className="text-slate-500 mb-2 block text-sm">Apellido:</label>
                                <div className="flex relative">
                                    <input
                                        type="text"
                                        {...register("apellido", {
                                            required: { value: true, message: "El apellido es obligatorio" },
                                            minLength: { value: 2, message: "El apellido debe tener al menos 2 caracteres" }
                                        })}
                                        className="p-3 rounded block mb-2 text-black border border-black w-full"
                                        placeholder="Pérez"
                                    />
                                    <BsPerson className="w-6 h-6 absolute right-2 top-3 pointer-events-none" />
                                </div>
                                {renderError(errors.apellido)}
                            </div>

                            {/* Campo para la fecha de nacimiento */}
                            <div>
                                <label htmlFor="fechaNacimiento" className="text-slate-500 mb-2 block text-sm">Fecha de Nacimiento:</label>
                                <input
                                    type="date"
                                    {...register("fechaNacimiento", {
                                        required: "La fecha de nacimiento es obligatoria",
                                        pattern: { value: /^\d{4}-\d{2}-\d{2}$/, message: "La fecha de nacimiento debe tener el formato YYYY-MM-DD" },
                                        validate: validarFechaNacimiento // Usar la función de validación personalizada
                                    })}
                                    className="p-3 rounded block mb-2 text-black border border-black w-full"
                                    placeholder="1999-12-12"
                                />
                                {renderError(errors.fechaNacimiento)}


                            </div>

                            {/* Campo para el correo */}
                            <div>
                                <label htmlFor="correo" className="text-slate-500 mb-2 block text-sm">Correo:</label>
                                <div className="flex relative">
                                    <input
                                        type="email"
                                        {...register("correo", {
                                            required: { value: true, message: "El correo es obligatorio" },
                                            pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "El correo debe ser una dirección válida" }
                                        })}
                                        className="p-3 rounded block mb-2 text-black border border-black w-full"
                                        placeholder="Correo"
                                    />
                                    <BsMailbox className="w-6 h-6 absolute right-2 top-3 pointer-events-none" />
                                </div>
                                {renderError(errors.correo)}
                            </div>

                            {/* Campo para la contraseña */}
                            <div>
                                <label htmlFor="contrasenia" className="text-slate-500 mb-2 block text-sm">Contraseña:</label>
                                <div className="flex relative">
                                    <input
                                        type="password"
                                        {...register("contrasenia", {
                                            required: { value: true, message: "La contraseña es obligatoria" },
                                            minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" }
                                        })}
                                        className="p-3 rounded block mb-2 text-black border border-black w-full"
                                        placeholder="********"
                                    />
                                    <BsEye className="w-6 h-6 absolute right-2 top-3 pointer-events-none" />
                                </div>
                                {renderError(errors.contrasenia)}
                            </div>

                            {/* Campo para el nombre del restaurante */}
                            <div className="col-span-2">
                                <label htmlFor="nombreRestaurante" className="text-slate-500 mb-2 block text-sm">Nombre del Restaurante:</label>
                                <div className="flex relative">
                                    <input
                                        type="text"
                                        {...register("nombreRestaurante", {
                                            required: { value: true, message: "El nombre del restaurante es obligatorio" },
                                            minLength: { value: 2, message: "El nombre del restaurante debe tener al menos 2 caracteres" }
                                        })}
                                        className="p-3 rounded block mb-2 text-black border border-black w-full"
                                        placeholder="Pikos"
                                    />
                                    <BsReverseLayoutTextWindowReverse className="w-6 h-6 absolute right-2 top-3 pointer-events-none" />
                                </div>
                                {renderError(errors.nombreRestaurante)}
                            </div>

                            {/* Botón de submit */}
                            <button type="submit" className="col-span-2 bg-[#01AE67] hover:bg-teal-700 text-white font-bold p-3 rounded-lg mt-2">
                                Guardar información
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default RegisterPage;
