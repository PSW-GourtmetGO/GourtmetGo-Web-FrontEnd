"use client";
import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { BiPencil, BiPlus } from 'react-icons/bi';
import { FaRegTrashAlt } from 'react-icons/fa';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}
//

const ModalC: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [showInput, setShowInput] = useState(false);

    const handleAddCategory = () => {
        setShowInput(true);
    };

    const handleCloseAddCategory = () => {
        setShowInput(false);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-white w-[60%] h-[60%] 2xl:w-[60%] 2xl:h-[60%] rounded-lg p-10">
                        <div className='grid grid-rows-3 w-full'>
                            <div className='row-start-1 grid grid-cols-3'>
                                <div className='col-start-1'>
                                    <button type="button" onClick={() => {
                                        onClose();
                                        handleCloseAddCategory()
                                    }} className="hover:bg-gray-400 font-bold py-2 px-4 rounded-md ml-2 inline-block">🡠</button>
                                </div>
                                <div className='col-start-2'>
                                    <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">Editar Categorias</h2>
                                </div>
                                <div className='col-start-3 flex items-center justify-end'>
                                    <button className="bg-[#5cb793] text-white p-2 ml-5 rounded-full" onClick={handleAddCategory}>
                                        <BiPlus className="left-3 top-4 text-white text-xl 2xl:text-2xl" />
                                    </button>
                                </div>
                            </div>
                            {showInput ? (
                                <div className='row-start-2 items-center grid gris-rows-2'>
                                    <div className='row-start-1 flex items-center'>
                                        <input type="text" placeholder="Nueva Categoría" className="rounded border w-full border-black mr-2 placeholder-black" />
                                        <button className="bg-[#274C5B] text-white p-2 rounded-full  ml-5 mr-5" onClick={handleCloseAddCategory}>Guardar</button>
                                        <button className="bg-[#B80808] text-white p-2 rounded-full ml-5" onClick={handleCloseAddCategory}>Cancelar</button>
                                    </div>
                                    <div className='row-start-2'>
                                        <table className="w-full border-collapse">
                                            <thead className="border-b border-black">
                                                <tr>
                                                    <th className="py-2 px-4 bg-transparent text-gray-800">
                                                        Categoria
                                                    </th>
                                                    <th className="py-2 px-4 bg-transparent text-gray-800">
                                                        Acciones
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody className="text-center">
                                                <tr className="bg-transparent text-gray-800">
                                                    <td className="py-2 px-4">
                                                        <div className="flex items-center justify-center">
                                                            <span>Platos Calientes</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        <button className="bg-[#274C5B] text-white p-2 rounded-full" onClick={handleAddCategory}>
                                                            <BiPencil className="left-3 top-4 text-white text-xl 2xl:text-2xl " />
                                                        </button>
                                                        <button className="bg-[#B80808] text-white p-2 ml-5 rounded-full">
                                                            <FaRegTrashAlt className="left-3 top-4 text-white text-xl 2xl:text-2xl" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div className='row-start-2'>
                                    <table className="w-full border-collapse">
                                        <thead className="border-b border-black">
                                            <tr>
                                                <th className="py-2 px-4 bg-transparent text-gray-800">
                                                    Categoria
                                                </th>
                                                <th className="py-2 px-4 bg-transparent text-gray-800">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="text-center">
                                            <tr className="bg-transparent text-gray-800">
                                                <td className="py-2 px-4">
                                                    <div className="flex items-center justify-center">
                                                        <span>Platos Calientes</span>
                                                    </div>
                                                </td>
                                                <td className="py-2 px-4">
                                                    <button className="bg-[#274C5B] text-white p-2 rounded-full" onClick={handleAddCategory}>
                                                        <BiPencil className="left-3 top-4 text-white text-xl 2xl:text-2xl " />
                                                    </button>
                                                    <button className="bg-[#B80808] text-white p-2 ml-5 rounded-full" >
                                                        <FaRegTrashAlt className="left-3 top-4 text-white text-xl 2xl:text-2xl" />
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalC;
