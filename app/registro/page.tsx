"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  BsCalendar2Day,
  BsCardHeading,
  BsEye,
  BsMailbox,
  BsPerson,
  BsReverseLayoutTextWindowReverse,
} from "react-icons/bs";
import imagenClientes from "../../public/imagenes/imagenClientes.svg";
import ResponsivoNav from "../componentes/navegacion/ResponsivoNav";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <ResponsivoNav />
      <div
        className="h-[calc(100vh-7rem)]"
        style={{
          backgroundImage: 'url("/imagenes/fondo.svg")',
          minHeight: "calc(88vh)",
        }}
      >
        <div className="w-full grid grid-cols-5">
          {/* Parte izquierda */}
          <div className="flex justify-center items-center col-span-3 row-start-1 mt-[5%] ">
            <div>
              <Image
                src={imagenClientes}
                alt="Descripción de la imagen"
                className="w-[80%]"
              />
            </div>
          </div>
          {/* Parte derecha */}
          <div className="col-start-4 col-span-2 mr-[10%] mt-[5%]">
            <form className=" w-full  grid grid-cols-2 gap-4">
              <h1 className="text-black font-bold text-4xl mb-4 col-span-2 text-center">
                Registro de Clientes
              </h1>
              {/* Campo para la cedula */}
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
                        message: "Cedula is required",
                      },
                    })}
                    className="p-3 rounded block mb-2 text-black border border-black w-full"
                    placeholder="1802154687"
                  />
                  <BsCardHeading
                    className="w-6 h-6 absolute right-2 top-3 pointer-events-none"
                  />
                </div>
              </div>
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
                        message: "Nombre is required",
                      },
                    })}
                    className="p-3 rounded block mb-2 text-black border border-black w-full"
                    placeholder="Juan"
                  />
                  <BsPerson className="w-6 h-6 absolute right-2 top-3 pointer-events-none" />
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
                        message: "Apellido is required",
                      },
                    })}
                    className="p-3 rounded block mb-2 text-black border border-black w-full"
                    placeholder="Perez"
                  />
                  <BsPerson className="w-6 h-6 absolute right-2 top-3 pointer-events-none" />
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
                  <BsCalendar2Day className="w-6 h-6 absolute right-2 top-3 pointer-events-none" />
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
                  <BsMailbox className="w-6 h-6 absolute right-2 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Campo para la contraseña */}
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

              {/* Campo para el nombre del restaurante */}
              <div className="col-span-2">
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
                  <BsReverseLayoutTextWindowReverse className="w-6 h-6 absolute right-2 top-3 pointer-events-none" />
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
    </>
  );
}
export default RegisterPage;
