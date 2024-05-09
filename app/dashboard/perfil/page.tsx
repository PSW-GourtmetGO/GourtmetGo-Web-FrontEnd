"use client";
import Image from "next/image";
import React from "react";
import ventas from "../../../public/imagenes/VentasRealizadas.svg";
import platos from "../../../public/imagenes/PlatosRegistrados.svg";
import empleados from "../../../public/imagenes/EmpleadosRegistrados.svg";
import negocio from "../../../public/imagenes/negocio.svg";
import { useForm } from "react-hook-form";
import { BsEye } from "react-icons/bs";
const PerfilPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
          <h1>Perfil</h1>
        </div>

        <div className="row-start-2 col-start-1 col-span-2 mt-5 ">
          <Image src={negocio} alt=""></Image>
          <div
            className=" text-[45px] ml-5  "
            style={{ fontFamily: "David Libre" }}
          >
            <h1>Papi Pollos</h1>
          </div>
          <div className="ml-5 flex mt-5">
            <Image src={ventas} alt="" className="w-[10%]"></Image>
            <div className="ml-3">
              <h1 className="text-xl font-bold">500</h1>
              <h1 className="text-[20px] ">Ventas realizadas</h1>
            </div>
          </div>
          <div className="ml-5 flex mt-5">
            <Image src={platos} alt="" className="w-[10%]"></Image>
            <div className="ml-3">
              <h1 className="text-xl font-bold">120</h1>
              <h1 className="text-[20px] ">Platos registrados</h1>
            </div>
          </div>
          <div className="ml-5 flex mt-5">
            <Image src={empleados} alt="" className="w-[10%]"></Image>
            <div className="ml-3">
              <h1 className="text-xl font-bold">10</h1>
              <h1 className="text-[20px] ">Empleados registrados</h1>
            </div>
          </div>
        </div>

        <div className="col-start-3 col-span-5 row-start-2 row-span-2 mr-[10%] ">
          <form className=" w-full  grid grid-cols-2 gap-4">
            {/* Campo para el nombre */}
            <div>
              <label
                htmlFor="nombre"
                className="text-slate-500 mb-2 block text-sm"
              >
                Nombre:
              </label>
              <div className="flex relative">
                <input
                  type="text"
                  {...register("nombre", {
                    required: {
                      value: true,
                      message: "nombre is required",
                    },
                  })}
                  className="p-3 rounded block mb-2 text-black border border-black w-full"
                  placeholder="1802154687"
                />
              </div>
            </div>
            {/* Campo para el apellido */}
            <div>
              <label
                htmlFor="apellido"
                className="text-slate-500 mb-2 block text-sm"
              >
                Apellido:
              </label>
              <div className="flex relative">
                <input
                  type="text"
                  {...register("apellido", {
                    required: {
                      value: true,
                      message: "apellido is required",
                    },
                  })}
                  className="p-3 rounded block mb-2 text-black border border-black w-full"
                  placeholder="Juan"
                />
              </div>
            </div>

            {/* Campo para el cedula */}
            <div>
              <label
                htmlFor="cedula"
                className="text-slate-500 mb-2 block text-sm"
              >
                Cedula:
              </label>
              <div className="flex relative">
                <input
                  type="text"
                  {...register("cedula", {
                    required: {
                      value: true,
                      message: "cedula is required",
                    },
                  })}
                  className="p-3 rounded block mb-2 text-black border border-black w-full"
                  placeholder="Perez"
                />
              </div>
            </div>

            {/* Campo para la fecha de nacimiento */}
            <div>
              <label
                htmlFor="fechaNacimiento"
                className="text-slate-500 mb-2 block text-sm"
              >
                Fecha de Nacimiento:
              </label>
              <div className="flex relative">
                <input
                  type="text"
                  {...register("fechaNacimiento", {
                    required: {
                      value: true,
                      message: "Fecha de Nacimiento is required",
                    },
                  })}
                  className="p-3 rounded block mb-2 text-black border border-black w-full"
                  placeholder="1999-12-12"
                />
              </div>
            </div>

            {/* Campo para el nombre restaurante */}
            <div>
              <label
                htmlFor="NombreRestaurante"
                className="text-slate-500 mb-2 block text-sm "
              >
                Nombre del Restaurante:
              </label>
              <div className="flex relative">
                <input
                  type="text"
                  {...register("NombreRestaurante", {
                    required: {
                      value: true,
                      message: "Nombre del Restaurante is required",
                    },
                  })}
                  className="p-3 rounded block mb-2 text-black border border-black w-full"
                  placeholder="Pikos"
                />
              </div>
            </div>
            {/* Campo para la direccion */}
            <div>
              <label
                htmlFor="direccion"
                className="text-slate-500 mb-2 block text-sm"
              >
                Dirección:
              </label>
              <div className="flex relative">
                <input
                  type="text"
                  {...register("direccion", {
                    required: {
                      value: true,
                      message: "direccion is required",
                    },
                  })}
                  className="p-3 rounded block mb-2 text-black border border-black w-full"
                  placeholder="Dirección"
                />
              </div>
            </div>

            {/* Campo para el telefono */}
            <div>
              <label
                htmlFor="telefono"
                className="text-slate-500 mb-2 block text-sm"
              >
                Telefono:
              </label>
              <div className="flex relative">
                <input
                  type="text"
                  {...register("telefono", {
                    required: {
                      value: true,
                      message: "telefono is required",
                    },
                  })}
                  className="p-3 rounded block mb-2 text-black border border-black w-full"
                  placeholder="0999999999"
                />
              </div>
            </div>

            {/* Campo para el correo */}
            <div>
              <label
                htmlFor="correo"
                className="text-slate-500 mb-2 block text-sm"
              >
                Correo:
              </label>
              <div className="flex relative">
                <input
                  type="email"
                  {...register("correo", {
                    required: {
                      value: true,
                      message: "Correo is required",
                    },
                  })}
                  className="p-3 rounded block mb-2 text-black border border-black w-full"
                  placeholder="Correo"
                />
              </div>
            </div>
            {/*Campo para la contraseña */}
            <div>
              <label
                htmlFor="password"
                className="text-slate-500 mb-2 block text-sm"
              >
                Contraseña:
              </label>
              <div className="flex relative">
                <input
                  type="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Contraseña is required",
                    },
                  })}
                  className="p-3 rounded block mb-2 text-black border border-black w-full"
                  placeholder="********"
                />
                <BsEye className="w-6 h-6 absolute right-2 top-3 pointer-events-none" />
              </div>
            </div>
            {/*Campo para repita la contraseña */}
            <div>
              <label
                htmlFor="password"
                className="text-slate-500 mb-2 block text-sm"
              >
                Repita la Contraseña:
              </label>
              <div className="flex relative">
                <input
                  type="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Contraseña is required",
                    },
                  })}
                  className="p-3 rounded block mb-2 text-black border border-black w-full"
                  placeholder="********"
                />
                <BsEye className="w-6 h-6 absolute right-2 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Botón de submit */}
            <button className="col-span-2 bg-[#01AE67] hover:bg-teal-700 text-white font-bold p-3 rounded-lg mt-2">
              Guardar información
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;
