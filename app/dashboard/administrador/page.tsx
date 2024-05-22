
"use client";
import React, { useState, useEffect } from 'react'
import { BiPencil, BiSearch } from 'react-icons/bi'
import { FaRegTrashAlt } from 'react-icons/fa'
import Modal from './componentes/modalempleado/page';
import ModalUpdate from './componentes/modalActualizarEmpleado/page';
import axios from 'axios';
import "./page.scss";

const AdministradorPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [data, setData] = useState({
    id : 0,
    cedula: '',
    nombre: '',
    apellido: '',
    fecha_Nacimiento: '',
    correo: '',
    contrasenia: '',
    telefono: '',
    direccion: '',
    estado: 0
  });

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
    const handleModalClose = () => {
      setIsModalOpen(false);
    };

  const handleModalUpdateOpen = (empleado:Empleado) => {
    setData({
      id: empleado.id,
      cedula: empleado.cedula,
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      fecha_Nacimiento:empleado.fecha_Nacimiento,
      correo: empleado.correo,
      contrasenia: empleado.contrasenia,
      telefono: empleado.telefono,
      direccion: empleado.direccion,
      estado:empleado.estado
    });
    setIsModalUpdateOpen(true);
  };

  const handleModalUpdateClose = () => {
    setIsModalUpdateOpen(false);
  }

  interface Empleado {
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
}

  useEffect(() => {
    const obtenerEmpleados = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/api/Web/empleado?restaurante_id=${localStorage.getItem('restauranteID')}`);
        console.log(response.data)
        setEmpleados(response.data);
      } catch (error) {
        console.error('Error al obtener las estadísticas:', error);
      }
    };
    obtenerEmpleados();
  }, [isModalOpen,isModalUpdateOpen]);
  
  const eliminarEmpleado = async (empleado:Empleado) => {
    try {
      const response = await axios.delete(`http://localhost:4500/api/Web/empleado?empleado_id=${empleado.id}`);
      setEmpleados(prevEmpleados => prevEmpleados.filter(e => e.id !== empleado.id));
      alert("Empleado eliminado de manera exitosa")
    } catch (error) {
      console.error('Error al obtener las estadísticas:', error);
    }
  }

  const restaurante = localStorage.getItem('restauranteNOMBRE');

  const InputChangeFind = async (event:any) => {
    const inputValue = event.target.value;
    try {
      const response = await axios.get(`http://localhost:4500/api/Web/empleado/get?restaurante=${localStorage.getItem('restauranteID')}&cedula=${inputValue}`);
      setEmpleados(response.data);
    } catch (error) {
      console.error('Error al obtener las estadísticas:', error);
    }
  };

  return (
    <div
      className="bg-cover bg-no-repeat bg-center "
      style={{
        backgroundImage: 'url("/imagenes/fondo.svg")',
        minHeight: "calc(80vh)",
      }}
    >
      <div className='contenedorEncabezado'>
        <div className="titulo">
          <div
            className="text-[45px] border-b border-black"
            style={{ fontFamily: "David Libre", height: "70px" }}
          >
            <h1>Empleados</h1>
          </div>

          <div
            className="text-[45px] flex justify-end "
            style={{ fontFamily: "David Libre" }}
          >
            <h1>{restaurante }</h1>
          </div>
        </div>
        <div className="buscador">
          <div className="relative ">
            <input
              className="w-[320px] 2xl:w-[320px] text-white font-bold bg-[#274C5B] py-3 pl-12 rounded-lg"
              placeholder="Buscar nombre del empleado"
              onChange={InputChangeFind}></input>
            <BiSearch className="absolute left-3 top-4 text-white" />
          </div>
          <div className="flex items-start justify-end mr-[5%] ">
            <button className="bg-[#01AE67] hover:bg-teal-700 text-white font-bold py-3 px-2 rounded-lg" onClick={handleModalOpen}>
              Añadir Empleado
            </button>
          </div>
        </div>
      </div>

      <div className="grid col-start-1 col-span-2 pr-[10%]">
        <div className="row-start-3 col-span-5 mt-5">
          <table className="w-full border-collapse">
            <thead className="border-b border-black">
              <tr>
                <th className="py-2 px-4 bg-transparent text-gray-800">
                  Nombre
                </th>
                <th className="py-2 px-4 bg-transparent text-gray-800">
                  Apellido
                </th>
                <th className="py-2 px-4 bg-transparent text-gray-800">
                  Correo
                </th>
                <th className="py-2 px-4 bg-transparent text-gray-800">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="text-center">
            {empleados.map((empleado: Empleado, index: number) => (
              <tr className="bg-transparent text-gray-800">
                <td className="py-2 px-4">
                    <span>{empleado.nombre}</span>
                </td>
                <td className="py-2 px-4">{empleado.apellido}</td>
                <td className="py-2 px-4">{empleado.correo}</td>
                <td className="py-2 px-4">
                  <button className="bg-[#274C5B] text-white p-2 rounded-full" onClick={()=>handleModalUpdateOpen(empleado)}>
                    <BiPencil className="left-3 top-4 text-white text-xl 2xl:text-2xl " />
                  </button>
                  <button className="bg-[#B80808] text-white p-2 ml-5 rounded-full" onClick={()=>eliminarEmpleado(empleado)}>
                    <FaRegTrashAlt className="left-3 top-4 text-white text-xl 2xl:text-2xl" />
                  </button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>



        <Modal isOpen={isModalOpen} onClose={handleModalClose} />
        <ModalUpdate isOpen={isModalUpdateOpen} onClose={handleModalUpdateClose} Datos ={data} setDatos={setData}/>


      </div>
    </div>
  );
};

export default AdministradorPage;
