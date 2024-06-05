"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ResponsivoNav from "../componentes/navegacion/ResponsivoNav";
import RestablecerImagen from "../../public/imagenes/imgLogin.svg";
import Image from "next/image";
import { TfiEmail } from "react-icons/tfi";
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./page.scss";

const RestablecerClavePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      const response = await axios.post('http://localhost:4500/api/Web/clientes/recuperar', data);
      toast.success("Se le ha enviado un correo con una contraseña temporal de acceso", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      window.location.href = "/login";
    } catch (error) {
      toast.error(
        "No se ha podido encontrar el correo proporcionado en nuestro sistema",
        {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        }
      );
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="contenedorPrincipal">
      <ResponsivoNav />
      <div className="contenedorRestablecer">
        <div className="portadasRestablecer">
          <div className="porta">
          </div>
        </div>
        <div className="formularioRestablecer">
          <div className="encabezadoRestablecer">
            <img src="/imagenes/logoBlanco.svg" alt="" />
            <h1 className="">
              Restablecer Contraseña
            </h1>
          </div>
          <div className="formulario">
            <p className="">
              Ingrese su correo electrónico para restablecer su contraseña.
            </p>
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <div className="contenedorIngreso">
                <input
                  type="email"
                  {...register("destinatario", {
                    required: {
                      value: true,
                      message: "Correo is required",
                    },
                  })}
                  placeholder="Correo Electrónico"
                  className="ingreso"
                />
                <svg className="iconoIngreso" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h14.77q.69 0 1.152.463T21 6.616v10.769q0 .69-.463 1.153T19.385 19zM20 6.885l-7.552 4.944q-.106.055-.214.093q-.109.037-.234.037t-.234-.037t-.214-.093L4 6.884v10.5q0 .27.173.443t.443.173h14.769q.269 0 .442-.173t.173-.443zM12 11l7.692-5H4.308zM4 6.885v.211v-.811v.034V6v.32v-.052v.828zV18z"/></svg>              
              </div>
              <div>
                <button
                  type="submit"
                  className="botonVerde"
                >
                  Restablecer Contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RestablecerClavePage;
