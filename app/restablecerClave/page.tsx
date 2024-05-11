"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ResponsivoNav from "../componentes/navegacion/ResponsivoNav";
import RestablecerImagen from "../../public/imagenes/imgLogin.svg";
import Image from "next/image";
import { TfiEmail } from "react-icons/tfi";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RestablecerClavePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      const response = await axios.post('http://localhost:4500/api/Web/clientes/recuperar', data);
      alert("Se le ha enviado un correo con una contraseña temporal de acceso")
      window.location.href = "/login";
    } catch (error) {
      alert("No se ha podido encontrar el correo proporcionado en nuestro sistema")
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div>
      <ResponsivoNav />
      <div
        className="bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: 'url("/imagenes/fondo.svg")',
          minHeight: "calc(88vh)",
        }}
      >
        <div className="w-full grid grid-cols-5 ">
          {/* Parte izquierda */}
          <div className="flex justify-center items-center col-span-3 row-start-1 ">
            <div>
              <Image
                src={RestablecerImagen}
                alt="Descripción de la imagen"
                className="w-[80%]"
              />
            </div>
          </div>
          {/* Parte derecha */}
          <div className="col-start-4 col-span-2 flex justify-center  mr-[15%] mt-[10%]">
            <div className="text-center">
              <Image
                width={25}
                height={25}
                src="/imagenes/logoBlanco.svg"
                alt="Logo"
                className="w-24 h-auto mx-auto"
              />
              <h1 className="text-4xl mt-4 font-bold">
                Restablecer Contraseña
              </h1>
              <div>
                <p className="text-gray-500 mt-4">
                  Ingrese su correo electrónico para restablecer su contraseña.
                </p>
                <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex items-center  border-b border-black py-2">
                    <input
                      type="email"
                      {...register("destinatario", {
                        required: {
                            value: true,
                            message: "Correo is required",
                        },
                      })}
                      placeholder="Correo Electrónico"
                      className="w-full bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                    <TfiEmail className="text-black" />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#01AE67] hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-10"
                  >
                    Restablecer Contraseña
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestablecerClavePage;
