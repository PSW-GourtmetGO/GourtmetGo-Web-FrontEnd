"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, FormEvent } from "react";
import { BsEye } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imgLogin from "../../public/imagenes/imgLogin.svg";
import ResponsivoNav from "../componentes/navegacion/ResponsivoNav";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4500/api/Web/clientes/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: correo, contrasenia: contrasenia }),
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('rolID', userData.rol_id);
        localStorage.setItem('restauranteID', userData.restaurante_id);
        localStorage.setItem('restaurante', userData.restaurante);
        if (userData.rol_id == 1){
            localStorage.setItem('plan', userData.planDueño_id);
        }
        window.location.href = "/dashboard";
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error de red:", error);
      toast.error("Error al conectar con el servidor");
    }
  };

  return (
    <>
      <ResponsivoNav />
      <div
        className="bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: 'url("/imagenes/fondo.svg")',
          minHeight: "calc(88vh)",
        }}
      >
        <div className="w-full grid grid-cols-5">
          <div className="flex justify-center items-center col-span-3 row-start-1">
            <div>
              <Image
                src={imgLogin}
                alt="Descripción de la imagen"
                className="w-[80%]"
              />
            </div>
          </div>
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
                Bienvenido a GourmetGo
              </h1>
              <div>
                <form className="mt-6" onSubmit={handleSubmit}>
                  <div className="flex relative items-center mt-8 pl-1 pr-1 mb-10">
                    <input
                      type="email"
                      id="correo"
                      name="correo"
                      className="border-b w-full border-black p-1"
                      placeholder="Correo"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      maxLength={50}
                      minLength={4}
                    />
                    <TfiEmail className="w-4 h-4 absolute right-2 top-3 pointer-events-none" />
                  </div>
                  <div className="flex relative items-center mt-4 pl-1 pr-1">
                    <input
                      type="password"
                      id="contrasenia"
                      name="contrasenia"
                      className="border-b w-full border-black p-1"
                      placeholder="Contraseña"
                      value={contrasenia}
                      onChange={(e) => setContrasenia(e.target.value)}
                      maxLength={25}
                      minLength={4}
                    />
                    <BsEye className="w-5 h-5 absolute right-2 top-3 pointer-events-none" />
                  </div>
                  <p className="mt-4 ml-8 text-green-600 text-right">
                    <Link href="/restablecerClave">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </p>
                  <button
                    type="submit"
                    className="bg-green-600 text-white py-2 px-6 rounded-lg mt-4 focus:outline-none hover:bg-green-700 w-full pl-1 pr-1"
                  >
                    Iniciar sesión
                  </button>
                </form>
                <p className="mt-2 text-center">
                  No tienes cuenta?{" "}
                  <Link href="/registro" className="text-green-600">
                    Regístrate!!
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
