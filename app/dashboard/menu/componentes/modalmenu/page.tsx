"use client";
import Image from 'next/image';
import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';

import NoImagen from '../../../../../public/imagenes/noimagen.svg'
import ActualizarImgane from '../../../../../public/imagenes/actualizarImagen.svg'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}
//

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        costo: ''
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
                    <div className="bg-white w-[45%] h-[60%] 2xl:w-[45%] 2xl:h-[60%] rounded-lg p-10">
                        <div className='grid grid-cols-2 w-full gap-x-6'>
                            <div className='col-start-1'>
                                <h2 className="text-2xl font-bold mb-4">Editar Plato</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">Nombre:</label>
                                        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} className="w-full rounded block mb-2 text-black border border-black" required />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="costo" className="block text-gray-700 font-bold mb-2">Costo:</label>
                                        <input type="number" id="costo" name="costo" value={formData.costo} onChange={handleInputChange} className="w-full rounded block mb-2 text-black border border-black" required />
                                    </div>
                                    <div className='"mb-4'>
                                        <label htmlFor="costo" className="block text-gray-700 font-bold mb-2">Estado:</label>
                                        <select className="w-full rounded block mb-2 text-black border border-black">
                                            <option value="option1" selected>Visible</option>
                                            <option value="option2">No Visible</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="mx-auto w-64 text-center col-start-2 mt-[10%] 2xl:mt-[5%]">
                                <div className="card">
                                    <label htmlFor="foto" className="block text-gray-700 font-bold mb-2">Seleccione su Imagen:</label>
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

                            <div className="col-start-1 text-left">
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
