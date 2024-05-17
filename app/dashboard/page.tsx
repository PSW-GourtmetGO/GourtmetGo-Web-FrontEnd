"use client";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import filtro from "../../public/imagenes/IconoFiltro.svg";
import negocioSf from "../../public/imagenes/negocioSF.svg";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import empleado1 from "../../public/imagenes/mujer2.svg";
import ModalPedidos from "./administrador/componentes/modalPedidos/page";
import axios from 'axios';

interface Pedido {
  pID: number;
  pCODIGO: string;
  pTOTAL: string;
  pESTADO: string;
  cCLIENTE: string;
}

function PedidosPage() {
  const restaurante = localStorage.getItem('restauranteNOMBRE');
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [filtroo, setFiltro] = useState<string>('Pendiente');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/api/Web/pedidos/${localStorage.getItem('restauranteID')}`);
        setPedidos(response.data);
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
      }
    };
    obtenerPedidos();
  }, []);

  const getColorByEstado = (estado: any) => {
    switch (estado) {
      case "Pendiente":
        return "#FFB572";
      case "Completo":
        return "#6BE2BE";
      case "Preparado":
        return "#9290FE";
      default:
        return "#eb459f";
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (pedido:Pedido) => {
    setPedido(pedido)
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const FilterChange = async(event:any) =>{
    if (filtroo === 'Preparado'){
      try {
        const response = await axios.get(`http://localhost:4500/api/Web/pedidos/buscar/pedido?restaurante=${localStorage.getItem('restauranteID')}&filtro=${filtroo}`);
        setPedidos(response.data);
        setFiltro('');  
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
      }   
    } else if (filtroo === 'Pendiente'){
        try {
          const response = await axios.get(`http://localhost:4500/api/Web/pedidos/buscar/pedido?restaurante=${localStorage.getItem('restauranteID')}&filtro=${filtroo}`);
          setPedidos(response.data);
          setFiltro('Preparado');  
        } catch (error) {
          console.error('Error al obtener los pedidos:', error);
        }
    }else if (filtroo === ''){   
        try {
          const response = await axios.get(`http://localhost:4500/api/Web/pedidos/${localStorage.getItem('restauranteID')}`);
          setPedidos(response.data);
          setFiltro('Pendiente')
        } catch (error) {
          console.error('Error al obtener los pedidos:', error);
        }
    }
  }

  const InputChangeFind = async (event:any) => {
    const inputValue = event.target.value;
    try {
      const response = await axios.get(`http://localhost:4500/api/Web/pedidos?restaurante=${localStorage.getItem('restauranteID')}&codigo=${inputValue}`);
      setPedidos(response.data);
    } catch (error) {
      console.error('Error al obtener las estadísticas:', error);
    }
  };

  return (
    <div
      className="bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: 'url("/imagenes/fondo.svg")',
        minHeight: "calc(80vh)",
      }}
    >
      <div className="w-full grid grid-cols-5 grid-rows-auto">
        <div
          className="col-start-1 col-span-1 text-[45px] border-b border-black"
          style={{ fontFamily: "David Libre", height: "70px" }}
        >
          <h1>Pedidos</h1>
        </div>
        <div
          className="col-start-4 col-span-2 text-[45px] flex items-center justify-end "
          style={{ fontFamily: "David Libre" }}
        >
          <h1>{restaurante}</h1>
          <Image src={negocioSf} alt=""></Image>
        </div>
        <div className="row-start-2 relative ">
          <input
            className="w-[320px] 2xl:w-[320px] text-white font-bold bg-[#274C5B] py-3 pl-12 rounded-lg"
            placeholder="Buscar código" onChange={InputChangeFind}
          ></input>
          <BiSearch className="absolute left-3 top-4 text-white" />
        </div>
        <div className="row-start-2 col-start-5 relative ml-[20%]">
          <button className="w-[150px] bg-[#393C49]  hover:bg-teal-700 text-white font-bold py-3  rounded-lg " onClick={FilterChange}>
            Filtrar Orden
          </button>
          <Image
            src={filtro}
            alt=""
            className="absolute left-3 top-4 text-white"
          />
        </div>
        <div className="row-start-3 col-span-5 mt-10 mr-[5%]">
          <table className="w-full rounded-xl bg-[#FFFFFF] shadow-2xl">
            <thead className="border-b border-black">
              <tr>
                <th className="py-2 px-4 bg-transparent text-gray-800">
                  Cliente
                </th>
                <th className="py-2 px-4 bg-transparent text-gray-800">Código</th>
                <th className="py-2 px-4 bg-transparent text-gray-800">
                  Total a Pagar
                </th>
                <th className="py-2 px-4 bg-transparent text-gray-800">
                  Estado
                </th>
              </tr>
            </thead>

            <tbody className="text-center">
              {/* Aquí generamos las filas con un ciclo */}
              {pedidos.map((pedido, index) => (
                <tr
                  key={pedido.pID}
                  onClick={() => openModal(pedido)}
                  className="bg-transparent text-gray-800 hover:bg-slate-400 cursor-pointer"
                >
                  <td className="py-2 px-4">
                    <div className="flex items-center justify-start ml-[23%] 2xl:ml-[29%]">
                      <div className="mr-4">
                      </div>
                      <span>{pedido.cCLIENTE}</span>
                    </div>
                  </td>

                  <td className="py-2 px-4">{pedido.pCODIGO}</td>
                  <td className="py-2 px-4">{pedido.pTOTAL}</td>
                  <td className="py-2 px-4">
                    <div
                      className="p-1 text-white rounded-xl"
                      style={{
                        backgroundColor: getColorByEstado(pedido.pESTADO),
                      }}
                    >
                      {pedido.pESTADO}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ModalPedidos isOpen={modalOpen} onClose={closeModal} pedidoDatos={pedido} setPedidoDatos={setPedido}></ModalPedidos>
        </div>
      </div>
    </div>
  );
}

export default PedidosPage;
