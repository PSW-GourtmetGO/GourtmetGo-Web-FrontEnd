import React from "react";
import ResponsivoNav from "../componentes/navegacion/ResponsivoNav";
import RestablecerImagen from "../../public/imagenes/imgLogin.svg";
import Image from "next/image";
import { TfiEmail } from "react-icons/tfi";

const RestablecerClavePage = () => {
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
                <form className="mt-6">
                  <div className="flex items-center  border-b border-black py-2">
                    <input
                      type="email"
                      name="email"
                      id="email"
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
