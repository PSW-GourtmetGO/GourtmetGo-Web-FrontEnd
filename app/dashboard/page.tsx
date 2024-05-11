"use client";
import Image from "next/image";
import React, { useState } from "react";
import filtro from "../../public/imagenes/IconoFiltro.svg";
import negocioSf from "../../public/imagenes/negocioSF.svg";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import empleado1 from "../../public/imagenes/mujer2.svg";
import ModalPedidos from "./administrador/componentes/modalPedidos/page";

function PedidosPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const registros = [
    {
      cliente: "Juan Alban",
      menu: "Beef dumpling in hot and sour soup",
      total: "$105",
      estado: "Pendiente",
    },
    {
      cliente: "Juan Alban",
      menu: "Beef dumpling in hot and sour soup",
      total: "$105",
      estado: "Completo",
    },
    {
      cliente: "Juan Alban",
      menu: "Beef dumpling in hot and sour soup",
      total: "$105",
      estado: "Preparado",
    },
  ];
  // Función para obtener el color según el estado
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

  // Función para abrir el modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalOpen(false);
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
          <h1>Papi Pollos</h1>
          <Image src={negocioSf} alt=""></Image>
        </div>
        <div className="row-start-2 relative ">
          <input
            className="w-[320px] 2xl:w-[320px] text-white font-bold bg-[#274C5B] py-3 pl-12 rounded-lg"
            placeholder="Buscar nombre del empleado"
          ></input>
          <BiSearch className="absolute left-3 top-4 text-white" />
        </div>
        <div className="row-start-2 col-start-5 relative ml-[20%]">
          <button className="w-[150px] bg-[#393C49]  hover:bg-teal-700 text-white font-bold py-3  rounded-lg ">
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
                <th className="py-2 px-4 bg-transparent text-gray-800">Menu</th>
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
              {registros.map((registro, index) => (
                <tr
                  key={index}
                  onClick={openModal}
                  className="bg-transparent text-gray-800 hover:bg-slate-400 cursor-pointer"
                >
                  <td className="py-2 px-4">
                    <div className="flex items-center justify-start ml-[23%] 2xl:ml-[29%]">
                      <div className="mr-4">
                        <Image
                          className="rounded-full w-10"
                          src={empleado1}
                          alt=""
                        ></Image>
                      </div>
                      <span>{registro.cliente}</span>
                    </div>
                  </td>

                  <td className="py-2 px-4">{registro.menu}</td>
                  <td className="py-2 px-4">{registro.total}</td>
                  <td className="py-2 px-4">
                    <div
                      className="p-1 text-white rounded-xl"
                      style={{
                        backgroundColor: getColorByEstado(registro.estado),
                      }}
                    >
                      {registro.estado}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Abre el modal */}
          <ModalPedidos isOpen={modalOpen} onClose={closeModal}></ModalPedidos>
        </div>
      </div>
    </div>
  );
}

export default PedidosPage;
