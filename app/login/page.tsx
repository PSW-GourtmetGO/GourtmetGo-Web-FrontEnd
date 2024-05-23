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
import "./page.scss"

function Login() {

  localStorage.clear();

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
        localStorage.setItem('rolID', userData.p_rol);
        localStorage.setItem('restauranteID', userData.r_id);
        localStorage.setItem('restauranteNOMBRE', userData.r_nombre);
        localStorage.setItem('persona', userData.p_id);
        localStorage.setItem('restauranteImagen', userData.r_imagen_base64);
        if (userData.rol_id == 1){
            localStorage.setItem('plan', userData.plan);
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
 //<TfiEmail className="w-4 h-4 absolute right-2 top-3 pointer-events-none" />
  return (
    <div className="contenedorPrincipal">
      <ResponsivoNav />
      <div className="contenedorLoguin">
        <div className="portadasLoguin">
          <div className="porta">

          </div>
        </div>
        <div className="formularioLoguin">
          <div className="encabezadoLoguin">
            <img src="/imagenes/logoBlanco.svg" alt="" />
              <h1 className="">
                Bienvenido a GourmetGo
              </h1>
          </div>
          <div className="formulario">
          <form className="" onSubmit={handleSubmit}>
                  <div className="contenedorIngreso">
                    <input
                      type="email"
                      id="correo"
                      name="correo"
                      className="ingreso"
                      placeholder="Correo"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      maxLength={50}
                      minLength={4}
                    />
                    <svg className="iconoIngreso" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h14.77q.69 0 1.152.463T21 6.616v10.769q0 .69-.463 1.153T19.385 19zM20 6.885l-7.552 4.944q-.106.055-.214.093q-.109.037-.234.037t-.234-.037t-.214-.093L4 6.884v10.5q0 .27.173.443t.443.173h14.769q.269 0 .442-.173t.173-.443zM12 11l7.692-5H4.308zM4 6.885v.211v-.811v.034V6v.32v-.052v.828zV18z"/></svg>              
                  </div>
                  <div className="contenedorIngreso">
                    <input
                      type="password"
                      id="contrasenia"
                      name="contrasenia"
                      className="ingreso"
                      placeholder="Contraseña"
                      value={contrasenia}
                      onChange={(e) => setContrasenia(e.target.value)}
                      maxLength={25}
                      minLength={4}
                    />
                  </div>
                  <p className="">
                    <Link href="/restablecerClave">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </p>
                  <button
                    type="submit"
                    className="botonVerde"
                  >
                    Iniciar sesión
                  </button>
                </form>
                <div className="registrate">
                  <p>
                  No tienes cuenta?{" "}
                  </p>
                  <p className="palabra">
                    <Link href="/registro" className="">
                      Regístrate!!
                    </Link>
                  </p>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
