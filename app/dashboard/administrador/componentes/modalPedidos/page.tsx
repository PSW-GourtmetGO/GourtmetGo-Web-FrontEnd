"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Pedido {
  pID: number;
  pCODIGO: string;
  pTOTAL: string;
  pESTADO: string;
  cCLIENTE: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  pedidoDatos: Pedido | null;
  setPedidoDatos: React.Dispatch<React.SetStateAction<Pedido | null>>;
}

interface detallePedido {
  pltNOMBRE: string;
  pdCANTIDAD: number;
  pdPRECIO: number;
}
const ModalPedidos: React.FC<ModalProps> = ({ isOpen, onClose,pedidoDatos,setPedidoDatos }) => {
  const [detallePedidos, setDetallePedidos] = useState<detallePedido[]>([]);
  useEffect(() => {
    const obtenerDetallePedidos = async () => {
      if (pedidoDatos) {
        try {
          const response = await axios.get(`http://localhost:4500/api/Web/pedidos/detalle/${pedidoDatos.pID}`);
          setDetallePedidos(response.data);
        } catch (error) {
          console.error('Error al obtener los pedidos:', error);
        }
      }
    };
    obtenerDetallePedidos();
  }, [pedidoDatos]);

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

  const actualizarEstado = async () => {
    if (pedidoDatos){
      let newEstado = pedidoDatos.pESTADO;
      if (newEstado === 'Pendiente'){
        newEstado = 'Preparado'
      }else{
        newEstado = 'Completo'
      }
      try {
        const response = await axios.put(`http://localhost:4500/api/Web/pedidos?id=${pedidoDatos.pID}&estado=${newEstado}`);
        setPedidoDatos((prevState: Pedido | null) => ({ ...prevState!, pESTADO: newEstado }));
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
        alert("Hubo un problema al conectarse al servidor")
      }
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white w-[45%] h-auto 2xl:w-[45%] 2xl:h-auto rounded-lg p-10">
            <div className="grid grid-cols-4 w-full gap-x-6">
              <div className="col-start-1 col-span-4">
                <h2 className="text-2xl font-bold mb-4">
                  Información del Pedido
                </h2>
              </div>
              <div className="col-start-1">
                <span className="font-bold">Cliente</span>
                <p>{pedidoDatos?.cCLIENTE}</p>
                <span className="font-bold">Estado</span>
                <div
                      className="p-1 text-white rounded-xl"
                      style={{
                        backgroundColor: getColorByEstado(pedidoDatos?.pESTADO),
                      }}
                    >
                      {pedidoDatos?.pESTADO}
                    </div>
                <span className="font-bold">Codigo de validación</span>
                <p>{pedidoDatos?.pCODIGO}</p>
              </div>
              <div className="col-start-2 col-span-4">
                <span className="font-bold">Detalle del Pedido</span>
                <div
                  className="grid grid-cols-2 w-full"
                  style={{ overflowY: "auto" }}
                >
                  {/* Establece el scroll vertical */}
                  <div className="col-span-2" style={{ maxHeight: "200px" }}>
                    {/* Establece la altura máxima del contenedor */}
                    <table className=" w-full text-center">
                      <thead className="bg-gray-200 sticky top-0 z-10">
                        <tr>
                          <th className="p-2">Artículo</th>
                          <th className="p-2">Cantidad</th>
                          <th className="p-2">Pvp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detallePedidos.map((detalle, index) => (
                          <tr key={index}>
                            <td className="p-2">{detalle.pltNOMBRE}</td>
                            <td className="p-2">{detalle.pdCANTIDAD}</td>
                            <td className="p-2">{detalle.pdPRECIO}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-200 sticky bottom-0 z-10">
                        <tr>
                          <td className="p-2"></td>
                          <td className="p-2 font-bold">Total:</td>
                          <td className="p-2 font-bold ">
                            {  detallePedidos.reduce(
                              (acc, curr) => acc + curr.pdPRECIO,0
                            )}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-span-4 text-right mt-[25px]">
                <button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md" onClick={actualizarEstado}
                >
                  Cambiar Siguiente Estado
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-md ml-2"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalPedidos;
