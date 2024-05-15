"use client";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import pagosImagen from "../../../public/imagenes/PagosImagen.svg";
import paypal from "../../../public/imagenes/paypal.svg";
const PagosPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
            <form className=" w-full grid grid-cols-2 gap-4 mt-16">
              <div>
                <label
                  htmlFor="ID"
                  className="text-slate-500 mb-2 block text-sm"
                >
                  Empresa:
                </label>
                <div className="flex relative">
                  <input
                    type="text"
                    {...register("ID", {
                      required: {
                        value: true,
                        message: "ID is required",
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
                    {...register("contrasenia", {
                      required: {
                        value: true,
                        message: "contrasenia is required",
                      },
                    })}
                    className="p-3 rounded block mb-2 text-black border border-black w-full"
                    placeholder="********"
                  />
                </div>
              </div>

              <button className="col-span-2 bg-[#6ca77d] hover:bg-[#274C5B] text-white font-sans p-3 rounded-lg mt-2  text-xl">
                <Image
                  src={paypal}
                  alt=""
                  className="w-[25px] inline-block"
                ></Image>
                PayPal
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagosPage;
