"use client";
import Image from "next/image";
import React, { useEffect , useState} from "react";
import axios from 'axios';
import { useForm, SubmitHandler } from "react-hook-form";
import pagosImagen from "../../../public/imagenes/PagosImagen.svg";
import paypal from "../../../public/imagenes/paypal.svg";
const PagosPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const onSubmit: SubmitHandler<any> = (data) => { 
    axios.put(`http://localhost:4500/api/Web/propietario/paypal/${localStorage.getItem('restauranteID')}`, data)
        .then(response => {
            alert("información almacenada");
        })
        .catch(error => {
            alert("Hubo un problema al procesar la información. Intente más tarde");
        });
  };

  useEffect(() => {
    const obtenerDatosRestaurante = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/api/Web/propietario/paypal/${localStorage.getItem('restauranteID')}`);
        const datosPaypal = response.data[0];
        setValue('empresa', datosPaypal.nombre_tienda);
        setValue('token', datosPaypal.token);
      } catch (error) {
        console.error('Error al obtener los datos del restaurante:', error);
      }
    };
    obtenerDatosRestaurante();
  }, [setValue]);
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
          className="col-start-1 col-span-2 text-[45px] border-b border-black"
          style={{ fontFamily: "David Libre", height: "70px" }}
        >
          <h1>Métodos de pago</h1>
        </div>

        <div className="row-start-3 col-start-1 col-span-2 mt-[70px] ">
          <Image src={pagosImagen} alt="" className="w-[80%]"></Image>
          <div
            className=" text-[45px] ml-5  "
            style={{ fontFamily: "David Libre" }}
          >
            <h1></h1>
          </div>
        </div>

        <div className="col-start-3 col-span-5 row-start-2 row-span-2 mr-[10%] flex items-center ">
          <div>
            <h1 className="flex text-4xl justify-end text-right mb-4">
              Todas tus transacciones se realizan a través de paypal
            </h1>
            <h1 className="flex font-bold text-4xl justify-end">
              Ingresa la información de PayPal
            </h1>
            <form className=" w-full grid grid-cols-2 gap-4 mt-16" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="ID"
                  className="text-slate-500 mb-2 block text-sm">
                  Empresa:
                </label>
                <div className="flex relative">
                  <input
                    type="text"
                    {...register("empresa", {
                      required: {
                        value: true,
                        message: "empresa is required",
                      },
                    })}
                    className="p-3 rounded block mb-2 text-black border border-black w-full"
                    placeholder="********"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contrasenia"
                  className="text-slate-500 mb-2 block text-sm"
                >
                  Token:
                </label>
                <div className="flex relative">
                  <input
                    type="text"
                    {...register("token", {
                      required: {
                        value: true,
                        message: "token is required",
                      },
                    })}
                    className="p-3 rounded block mb-2 text-black border border-black w-full"
                    placeholder="********"
                  />
                </div>
              </div>

              <button className="col-span-2 bg-[#6ca77d] hover:bg-[#274C5B] text-white font-sans p-3 rounded-lg mt-2  text-xl">
                Guardar Información
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagosPage;
