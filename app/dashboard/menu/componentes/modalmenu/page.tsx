"use client";
import Image from 'next/image';
import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from 'react';
import axios from 'axios';
import NoImagen from '../../../../../public/imagenes/noimagen.svg'
import ActualizarImgane from '../../../../../public/imagenes/actualizarImagen.svg'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    Datos: {
        platoID: number;
        platoNombre: string;
        precio: number;
        visible: string;
        categoria: number;
        accion: string;
    };
    setData: React.Dispatch<React.SetStateAction<{
        platoID: number;
        platoNombre: string;
        precio: number;
        visible: string;
        categoria: number;
        accion: string;
    }>>;
}
interface Categoria {
    id: number;
    nombre: string;
    ver: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose,Datos,setData}) => {
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const [formData, setFormData] = useState({
        id:0,
        nombre: '',
        precio: 0,
        visible: "true",
        categoria:1
    });

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

    const guardarPlato = async () =>{
        try {
            const response = await axios.post(`http://localhost:4500/api/Web/plato/${formData.categoria}`, {
                nombre: formData.nombre,
                precio: formData.precio,
                ver: formData.visible,
                imagen: null
            });
            alert("plato creado de manera exitosa")            
        } catch (error) {
            alert("Hubo un problema con el servidor")
        }
    }

    const actualizarPlato = async (plato:any) =>{
        try {
            const response = await axios.put(`http://localhost:4500/api/Web/plato/${Datos.platoID}`, {
                nombre: Datos.platoNombre,
                precio: Datos.precio,
                ver: Datos.visible,
                imagen: null,
                categoria:Datos.categoria
            });
            alert("plato actualizado de manera exitosa")            
        } catch (error) {
            alert("Hubo un problema con el servidor")
        }

    }

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSelectChangeEdit = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData({
            ...Datos,
            [name]: value
        });
    };
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleInputChangeEdit = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({
            ...Datos,
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
            {(isOpen && Datos.accion === "crear") ? (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-white w-[45%] h-[60%] 2xl:w-[45%] 2xl:h-[60%] rounded-lg p-10">
                        <div className='grid grid-cols-2 w-full gap-x-6'>
                            <div className='col-start-1'>
                                <h2 className="text-2xl font-bold mb-4">Crear Platos</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">Nombre:</label>
                                        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} className="w-full rounded block mb-2 text-black border border-black" required />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="costo" className="block text-gray-700 font-bold mb-2">Costo:</label>
                                        <input type="number" id="precio" name="precio" value={formData.precio} onChange={handleInputChange} className="w-full rounded block mb-2 text-black border border-black" required />
                                    </div>
                                    <div className='"mb-4'>
                                        <label htmlFor="costo" className="block text-gray-700 font-bold mb-2">Estado:</label>
                                        <select className="w-full rounded block mb-2 text-black border border-black" name="visible" value={formData.visible.toString()} onChange={handleSelectChange}>
                                            <option value="true" selected>Visible</option>
                                            <option value="false">No Visible</option>
                                        </select>
                                    </div>
                                    <div className='"mb-4'>
                                        <label htmlFor="costo" className="block text-gray-700 font-bold mb-2">Categoria</label>
                                        <select className="w-full rounded block mb-2 text-black border border-black" name="categoria" value={formData.categoria.toString()} onChange={handleSelectChange}>
                                        {categorias.map((categoria: Categoria, index: number) => (
                                            <option value={categoria.id}>{categoria.nombre}</option>
                                            ))};

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
                                <button type="submit" onClick={guardarPlato} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md">Guardar</button>
                                <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-md ml-2">Cerrar</button>
                            </div>

                        </div>

                    </div>
                </div>
            ) : (isOpen) ? (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                <div className="bg-white w-[45%] h-[60%] 2xl:w-[45%] 2xl:h-[60%] rounded-lg p-10">
                    <div className='grid grid-cols-2 w-full gap-x-6'>
                        <div className='col-start-1'>
                            <h2 className="text-2xl font-bold mb-4">Editar Plato</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">Nombre:</label>
                                    <input type="text" id="platoNombre" name="platoNombre" value={Datos.platoNombre} onChange={handleInputChangeEdit} className="w-full rounded block mb-2 text-black border border-black" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="costo" className="block text-gray-700 font-bold mb-2">Costo:</label>
                                    <input type="number" id="precio" name="precio" value={Datos.precio} onChange={handleInputChangeEdit} className="w-full rounded block mb-2 text-black border border-black" required />
                                </div>
                                <div className='"mb-4'>
                                    <label htmlFor="costo" className="block text-gray-700 font-bold mb-2">Estado:</label>
                                    <select className="w-full rounded block mb-2 text-black border border-black" name="visible" value={Datos.visible.toString()} onChange={handleSelectChangeEdit}>
                                        <option value="true" selected={Datos.visible === "true"}>Visible</option>
                                        <option value="false" selected={Datos.visible === "false"}>No Visible</option>
                                    </select>
                                </div>
                                <div className='"mb-4'>
                                    <label htmlFor="costo" className="block text-gray-700 font-bold mb-2">Categoria</label>
                                    <select className="w-full rounded block mb-2 text-black border border-black" name="categoria" value={Datos.categoria.toString()} onChange={handleSelectChangeEdit}>
                                    {categorias.map((categoria: Categoria, index: number) => (
                                        <option value={categoria.id} selected={Datos.categoria === categoria.id}>{categoria.nombre}</option>
                                        ))};

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
                            <button type="submit" onClick={()=>actualizarPlato(1)} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md">Actualizar</button>
                            <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-md ml-2">Cerrar</button>
                        </div>

                    </div>

                </div>
            </div>
              ) : (
                <h1>.</h1>
              )}
        </>
    );
};

export default Modal;
