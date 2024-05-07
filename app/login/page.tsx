"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useState, FormEvent, } from "react";
import { BsEye } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imgLogin from "../../public/imagenes/imgLogin.svg"

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4500/api/Web/clientes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: correo, contrasenia: contrasenia }),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("Información del usuario:", userData);
        alert("Inicio de sesión exitoso");
        window.location.href = "/dashboard"
      } else {
        console.error("Error al iniciar sesión");
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error de red:", error);
      toast.error("Error al conectar con el servidor");
    }
  };

  return (
    <div className="bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url("/imagenes/fondo.svg")', minHeight: 'calc(88vh)' }}>
      <div className="w-auto grid grid-cols-2">
        <div className="col-start-1">
          <Image className="w-[65%] ml-[15%]" src={imgLogin} alt="" />
        </div>
        <div className="col-start-2 m-20">
          <div className="text-center">
            <Image width={25} height={25} src="/imagenes/logoBlanco.svg" alt="Logo" className="w-24 h-auto mx-auto" />
            <h1 className="text-4xl mt-4 font-extrabold">Bienvenido a GourmetGo</h1>
          </div>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="flex relative items-center mt-8 pl-1 pr-1">
              <input
                type="email" id="correo" name="correo"
                className="border-b w-full"
                placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} maxLength={25} minLength={4}
              />
              <TfiEmail className="absolute right-2 top-1 pointer-events-none ml-2 text-slate-950" />
            </div>
            <div className="flex relative items-center mt-4 pl-1 pr-1">
              <input type="password" id="contrasenia" name="contrasenia" className="border-b w-full" placeholder="Contraseña" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} maxLength={25} minLength={4} />
              <BsEye className="absolute right-2 top-1 w-5 h-5 pointer-events-none ml-2 text-slate-950" />
            </div>
            <p className="mt-4 ml-8 text-green-600 text-right"><Link href="/restablecer">¿Olvidaste tu contraseña?</Link></p>
            <button type="submit" className="bg-green-600 text-white py-2 px-6 rounded-lg mt-4 focus:outline-none hover:bg-green-700 w-full pl-1 pr-1">Iniciar sesión</button>
          </form>
          <p className="mt-2 text-center">No tienes cuenta? <Link href="/registro" className="text-green-600">Regístrate!!</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
