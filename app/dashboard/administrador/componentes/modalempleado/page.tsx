"use client";
import Image from 'next/image';
import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';

import NoImagen from '../../../../../public/imagenes/noimagen.svg'
import ActualizarImgane from '../../../../../public/imagenes/actualizarImagen.svg'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        cedula: '',
        nombre: '',
        apellido: '',
        fecha_Nacimiento: '',
        direccion: '',
        telefono: '',
        correo: '',
        contrasenia: ''
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica para enviar el formulario
        console.log(formData);
        onClose();
    };

    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        inputFileRef.current?.click();
    };

    const handleFileChange = (e: any) => {
        // Aquí puedes manejar la lógica para cargar la imagen seleccionada
        console.log("Imagen seleccionada:", e.target.files[0]);
    };
    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-white w-[45%] h-[80%] rounded-lg p-10">
                        <div className='grid grid-cols-2 w-full gap-x-6'>
                            <div className='col-start-1'>
                                <h2 className="text-2xl font-bold mb-4">Registro Empleados</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="cedula" className="block text-gray-700 font-bold mb-2">Cédula:</label>
                                        <input type="text" id="cedula" name="cedula" value={formData.cedula} onChange={handleInputChange} className="w-full rounded block mb-2 text-black border border-black" required />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">Nombre:</label>
                                        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} className="w-full rounded block mb-2 text-black border border-black" required />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="apellido" className="block text-gray-700 font-bold mb-2">Apellido:</label>
                                        <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleInputChange} className="w-full rounded block mb-2 text-black border border-black" required />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="fecha_Nacimiento" className="block text-gray-700 font-bold mb-2">Fecha de Nacimiento:</label>
                                        <input type="date" id="fecha_Nacimiento" name="fecha_Nacimiento" value={formData.fecha_Nacimiento} onChange={handleInputChange} className="w-full rounded block mb-2 text-black border border-black" required />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="direccion" className="block text-gray-700 font-bold mb-2">Dirección:</label>
                                        <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleInputChange} className="w-full rounded block mb-2 text-black border border-black" required />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="telefono" className="block text-gray-700 font-bold mb-2">Teléfono:</label>
                                        <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleInputChange} className="w-full rounded block mb-2 text-black border border-black" required />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="correo" className="block text-gray-700 font-bold mb-2">Correo:</label>
                                        <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleInputChange} className="w-full rounded block mb-2 text-black border border-black" required />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="contrasenia" className="block text-gray-700 font-bold mb-2">Contraseña:</label>
                                        <input type="password" id="contrasenia" name="contrasenia" value={formData.contrasenia} onChange={handleInputChange} className="w-full rounded block mb-2 text-black border border-black" required />
                                    </div>
                                </form>
                            </div>
                            <div className="mx-auto w-64 text-center col-start-2 mt-[50%]">
                                <div className="card">
                                    <label htmlFor="foto" className="block text-gray-700 font-bold mb-2">Seleccionar Imagen:</label>
                                    <input
                                        type="file"
                                        id="foto"
                                        name="foto"
                                        className="w-full rounded block mb-2"
                                        required
                                        onChange={handleFileChange}
                                        ref={inputFileRef}
                                        style={{ display: 'none' }}
                                    />
                                    <div className="relative w-64 text-black border border-black">
                                        <Image className="w-64 h-64 rounded-full absolute" src={NoImagen} alt="" />
                                        <div className="w-64 h-64 group hover:bg-gray-200 opacity-60 absolute flex justify-center items-center cursor-pointer transition duration-500" onClick={handleImageClick}>
                                            <Image className="hidden group-hover:block w-12" src={ActualizarImgane} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-span-2 text-right">
                                <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md">Guardar</button>
                                <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-md ml-2">Cancelar</button>
                            </div>


                        </div>


                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
