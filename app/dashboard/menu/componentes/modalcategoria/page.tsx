"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiPencil, BiPlus } from 'react-icons/bi';
import { FaRegTrashAlt } from 'react-icons/fa';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}
interface Categoria {
    id: number;
    nombre: string;
    ver: string;
}

const ModalC: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [nombreCategoria, setNombreCategoria] = useState("");
    const [categoriaActualizar, setCategoriaActualizar] = useState("");
    const [actualizarID, setActualizarID] = useState(Number);

    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const response = await axios.get(`http://localhost:4500/api/Web/categoria/${localStorage.getItem('restauranteID')}`);
                console.log(response.data)
                setCategorias(response.data);
            } catch (error) {
                console.error('Error al obtener las caracteristicas:', error);
            }
        };
        obtenerCategorias();
    }, []);

    const handleSelectChange = async (event: any, categoriaId: any) => {
        const nuevaSeleccion = event.target.value;

        try {
            const response = await axios.put(`http://localhost:4500/api/Web/categoria/ver/${categoriaId}`, {
                ver: nuevaSeleccion,
            });
            console.log(response.data);

            // Actualiza el estado de categorias con el nuevo valor de ver
            setCategorias((prevCategorias) =>
                prevCategorias.map((categoria) =>
                    categoria.id === categoriaId ? { ...categoria, ver: nuevaSeleccion } : categoria
                )
            );
        } catch (error) {
            console.error('Error al obtener las características:', error);
        }
    };

    const handleDeleteCategory = async (eliminarID: number) => {
        try {
            const response = await axios.delete(`http://localhost:4500/api/Web/categoria/${eliminarID}`, {});

            setCategorias((prevCategorias) =>
                prevCategorias.filter((categoria) => categoria.id !== eliminarID)
            );
        } catch (error) {
            console.error('Error al obtener las características:', error);
        }
    };

    const handleAddCategory = () => {
        setShowAdd(true);
    };

    const handleCloseAddCategory = async (ejecutar: number) => {
        if (ejecutar === 0) {
            setShowAdd(false);
            return;
        }
        if (nombreCategoria === "") {
            return;
        }

        try {
            const response = await axios.post(`http://localhost:4500/api/Web/categoria/${localStorage.getItem('restauranteID')}`, {
                nombre: nombreCategoria,
            });
            console.log(response.data);

            const nuevaCategoria = response.data;

            setCategorias((prevCategorias) => [...prevCategorias, { id: nuevaCategoria, nombre: nombreCategoria, ver: "true" }]);
            setNombreCategoria("");
            setShowAdd(false);
        } catch (error) {
            console.error('Error al obtener las características:', error);
        }
    };

    const handleEditCategory = (nombre: string, categoriaID: number) => {
        setCategoriaActualizar(nombre);
        setActualizarID(categoriaID);
        setShowEdit(true);
    };

    const handleCloseEditCategory = async (ejecutar: number) => {
        if (ejecutar === 0) {
            setShowEdit(false);
            return;
        }
        if (categoriaActualizar === "") {
            return;
        }

        try {
            const response = await axios.put(`http://localhost:4500/api/Web/categoria/${actualizarID}`, {
                nombre: categoriaActualizar,
            });
            console.log(response.data);
            const nuevaCategoria = response.data;

            setCategorias((prevCategorias) =>
                prevCategorias.map((categoria) =>
                    categoria.id === actualizarID ? { ...categoria, nombre: categoriaActualizar } : categoria
                )
            );
            setShowEdit(false);
        } catch (error) {
            console.error('Error al obtener las características:', error);
        }
        //setShowEdit(false);
    };

    const handleNombreCategoriaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const lettersOnly = inputValue.replace(/[^a-zA-Z\s]/g, '');
        setNombreCategoria(lettersOnly);
    };

    const handleUpdateNombreCategoriaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const lettersOnly = inputValue.replace(/[^a-zA-Z\s]/g, '');
        setCategoriaActualizar(lettersOnly);
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
                                        handleCloseAddCategory(0)
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
                            {showAdd ? (
                                <div className='row-start-2 items-center grid gris-rows-2'>
                                    <div className='row-start-1 flex items-center'>
                                        <input type="text" placeholder="Nueva Categoría" className="rounded border w-full border-black mr-2 placeholder-black" value={nombreCategoria} onChange={handleNombreCategoriaChange} maxLength={25} minLength={4} />
                                        <button className="bg-[#274C5B] text-white p-2 rounded-full  ml-5 mr-5" onClick={() => handleCloseAddCategory(1)}>Guardar</button>
                                        <button className="bg-[#B80808] text-white p-2 rounded-full ml-5" onClick={() => handleCloseAddCategory(0)}>Cerrar</button>
                                    </div>
                                </div>
                            ) : showEdit ? (
                                <div className='row-start-2 items-center grid gris-rows-2'>
                                    <div className='row-start-1 flex items-center'>
                                        <input type="text" placeholder="Editar Categoría" className="rounded border w-full border-black mr-2 placeholder-black" value={categoriaActualizar} onChange={handleUpdateNombreCategoriaChange} maxLength={25} minLength={4} />
                                        <button className="bg-[#274C5B] text-white p-2 rounded-full  ml-5 mr-5" onClick={() => handleCloseEditCategory(1)}>Guardar</button>
                                        <button className="bg-[#B80808] text-white p-2 rounded-full ml-5" onClick={() => handleCloseEditCategory(0)}>Cerrar</button>
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
                                            {categorias.map((categoria: Categoria, index: number) => (
                                                <tr className="bg-transparent text-gray-800" key={index}>
                                                    <td className="py-2 px-4">
                                                        <div className="flex items-center justify-center">
                                                            <span>{categoria.nombre}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        <button className="bg-[#274C5B] text-white p-2 rounded-full" onClick={() => handleEditCategory(categoria.nombre, categoria.id)}>
                                                            <BiPencil className="left-3 top-4 text-white text-xl 2xl:text-2xl " />
                                                        </button>
                                                        <button className="bg-[#B80808] text-white p-2 ml-5 rounded-full" onClick={() => handleDeleteCategory(categoria.id)}>
                                                            <FaRegTrashAlt className="left-3 top-4 text-white text-xl 2xl:text-2xl" />
                                                        </button>
                                                        <select
                                                            className="border border-black p-2 ml-5 rounded-full"
                                                            onChange={(event) => handleSelectChange(event, categoria.id)}
                                                            value={categoria.ver}
                                                        >
                                                            <option value="true" selected={categoria.ver === "true"}>Visible</option>
                                                            <option value="false" selected={categoria.ver === "false"}>No Visible</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
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
