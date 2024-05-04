"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { BsCalendar2Day, BsCardHeading, BsEye, BsHouseDoor, BsMailbox, BsPerson, BsReverseLayoutTextWindowReverse, BsWhatsapp } from "react-icons/bs";

function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    return (
        <div className="h-[calc(100vh-7rem)]" style={{ backgroundImage: 'url("/imagenes/fondo.svg")', minHeight: 'calc(88vh)' }}>
            <div className="w-full grid grid-cols-5">
                {/* Parte izquierda */}
                <div className="flex justify-center items-center col-span-3 ">
                    <div className="">
                        <Image src="/imagenes/imagenClientes.svg" alt="Descripción de la imagen" className="max-h-full" width={900} height={500} />
                    </div>
                </div>
                    {/* Parte derecha */}
                    <div className="col-start-4 col-span-2 flex justify-center mr-4 ">
                        <form className="p-4 w-full max-w-md">
                            <h1 className="text-black font-bold text-4xl mb-4 text-center">Registro de Clientes</h1>

                            <label htmlFor="cedula" className="text-slate-500 mb-2 block text-sm">
                                Cedula:
                            </label>
                            <div className="flex relative">
                                <input
                                    type="text"
                                    {...register("cedula", {
                                        required: {
                                            value: true,
                                            message: "Cedula is required",
                                        },
                                    })}
                                    className="p-3 rounded block mb-2 text-black w-full" // Establecer un ancho del 80% para el input
                                    placeholder="1802154687"
                                />
                                <BsCardHeading
                                    className="w-6 h-6 absolute right-2 top-3 pointer-events-none" // Añadí "absolute right-2 top-3" para posicionar la imagen
                                />
                            </div>

                            <label htmlFor="nombre" className="text-slate-500 mb-2 block text-sm">
                                Nombre:
                            </label>
                            <div className="flex relative">
                                <input
                                    type="text"
                                    {...register("nombre", {
                                        required: {
                                            value: true,
                                            message: "Nombre is required",

                                        },
                                    })}
                                    className="p-3 rounded block mb-2  text-black w-full"
                                    placeholder="Juan"
                                />
                                <BsPerson
                                    className="w-6 h-6 absolute right-2 top-3 pointer-events-none"
                                />
                            </div>

                            <label htmlFor="apellido" className="text-slate-500 mb-2 block text-sm">
                                Apellido:
                            </label>
                            <div className="flex relative">
                                <input
                                    type="text"
                                    {...register("apellido", {
                                        required: {
                                            value: true,
                                            message: "Apellido is required",

                                        },
                                    })}
                                    className="p-3 rounded block mb-2  text-black-300 w-full"
                                    placeholder="Perez"
                                />
                                <BsPerson
                                    className="w-6 h-6 absolute right-2 top-3 pointer-events-none"
                                />
                            </div>
                            <label htmlFor="fechaNacimiento" className="text-slate-500 mb-2 block text-sm">
                                Fecha de Nacimiento:
                            </label>
                            <div className="flex relative">
                                <input
                                    type="text"
                                    {...register("fechaNacimiento", {
                                        required: {
                                            value: true,
                                            message: "Fecha de Nacimiento is required",

                                        },
                                    })}
                                    className="p-3 rounded block mb-2  text-black w-full"
                                    placeholder="1999-12-12"
                                />
                                <BsCalendar2Day
                                    className="w-6 h-6 absolute right-2 top-3 pointer-events-none"
                                />
                            </div>
                            <label htmlFor="direccion" className="text-slate-500 mb-2 block text-sm">
                                Direccion:
                            </label>
                            <div className="flex relative">
                                <input
                                    type="text"
                                    {...register("direccion", {
                                        required: {
                                            value: true,
                                            message: "Direccion is required",
                                        },
                                    })}
                                    className="p-3 rounded block mb-2 text-black w-full"
                                    placeholder="Av. 12 de Octubre"
                                />
                                <BsHouseDoor
                                    className="w-6 h-6 absolute right-2 top-3 pointer-events-none"
                                />
                            </div>

                            <label htmlFor="telefono" className="text-slate-500 mb-2 block text-sm">
                                Telefono:
                            </label>
                            <div className="flex relative">
                                <input
                                    type="text"
                                    {...register("telefono", {
                                        required: {
                                            value: true,
                                            message: "Telefono is required",
                                        },
                                    })}
                                    className="p-3 rounded block mb-2  text-black w-full"
                                    placeholder="0987654321"
                                />
                                <BsWhatsapp
                                    className="w-6 h-6 absolute right-2 top-3 pointer-events-none"
                                />
                            </div>

                            <label htmlFor="correo" className="text-slate-500 mb-2 block text-sm">
                                Coreo:
                            </label>
                            <div className="flex relative">
                                <input
                                    type="text"
                                    {...register("correo", {
                                        required: {
                                            value: true,
                                            message: "Correo is required",
                                        },
                                    })}
                                    className="p-3 rounded block mb-2  text-black w-full"
                                    placeholder="juanperez@gmail.com"
                                />
                                <BsMailbox
                                    className="w-6 h-6 absolute right-2 top-3 pointer-events-none"
                                />
                            </div>

                            <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
                                Password:
                            </label>
                            <div className="flex relative">
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "Password is required",
                                        },
                                    })}
                                    className="p-3 rounded block mb-2 text-black w-full"
                                    placeholder="********"
                                />
                                <BsEye
                                    className="w-6 h-6 absolute right-2 top-3 pointer-events-none"
                                />
                            </div>

                            <label htmlFor="NombreRestaurante" className="text-slate-500 mb-2 block text-sm">
                                Nombre del Restaurante:
                            </label>
                            <div className="flex relative">
                                <input
                                    type="text"
                                    {...register("NombreRestaurante", {
                                        required: {
                                            value: true,
                                            message: "Nombre del Restaurante is required",
                                        },
                                    })}
                                    className="p-3 rounded block mb-2  text-black w-full"
                                    placeholder="Pikos"
                                />
                                <BsReverseLayoutTextWindowReverse
                                    className="w-6 h-6 absolute right-2 top-3 pointer-events-none"
                                />
                            </div>

                            <button className="w-full bg-[#7EB693] text-white p-3 rounded-lg mt-2">
                                Guardar informacion
                            </button>


                        </form>
                    </div>
                </div>
            </div>
            );
}
            export default RegisterPage;