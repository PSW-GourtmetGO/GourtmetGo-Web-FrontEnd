"use client";
import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent, useRef } from "react";

import NoImagen from "../../../../../public/imagenes/noimagen.svg";
import ActualizarImgane from "../../../../../public/imagenes/actualizarImagen.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
//

const ModalPedidos: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
    fecha_Nacimiento: "",
    direccion: "",
    telefono: "",
    correo: "",
    contrasenia: "",
  });
  const detallesPedido = [
    { articulo: "PapiPollo", cantidad: 2, total: "$3" },
    { articulo: "Encebollado", cantidad: 1, total: "$3.5" },
    { articulo: "Coca Cola", cantidad: 3, total: "$2.25" },
    { articulo: "Coca Cola", cantidad: 3, total: "$2.25" },
    { articulo: "Coca Cola", cantidad: 3, total: "$2.25" },
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
          <div className="bg-white w-[45%] h-auto 2xl:w-[45%] 2xl:h-auto rounded-lg p-10">
            <div className="grid grid-cols-4 w-full gap-x-6">
              <div className="col-start-1 col-span-4">
                <h2 className="text-2xl font-bold mb-4">
                  Información del Pedido
                </h2>
              </div>
              <div className="col-start-1">
                <span className="font-bold">Cliente</span>
                <p>Juan Alban</p>
                <span className="font-bold">Estado</span>
                <p className="p-1 bg-[#FFB572] w-fit rounded-md text-white">
                  Pendiente
                </p>
                <span className="font-bold">Codigo de validación</span>
                <p>X1S-7522</p>
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
                        {detallesPedido.map((detalle, index) => (
                          <tr key={index}>
                            <td className="p-2">{detalle.articulo}</td>
                            <td className="p-2">{detalle.cantidad}</td>
                            <td className="p-2">{detalle.total}</td>
                          </tr>
                        ))}
                      </tbody>
                      {/* Agrega una fila adicional para mostrar la suma de la columna Pvp */}
                      <tfoot className="bg-gray-200 sticky bottom-0 z-10">
                        <tr>
                          <td className="p-2"></td>
                          <td className="p-2 font-bold">Total:</td>
                          <td className="p-2 font-bold ">
                            {/* Calcula la suma de los valores en la columna Pvp */}
                            {detallesPedido.reduce(
                              (acc, curr) =>
                                acc + parseFloat(curr.total.slice(1)),
                              0
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
                  className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md"
                >
                  Guardar
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
