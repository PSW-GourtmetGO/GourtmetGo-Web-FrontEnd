"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ventas from "../../../public/imagenes/VentasRealizadas.svg";
import platos from "../../../public/imagenes/PlatosRegistrados.svg";
import empleados from "../../../public/imagenes/EmpleadosRegistrados.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import negocioSf from "../../../public/imagenes/negocioSF.svg";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadFile } from "../../firebase/config";
const PerfilPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [total_pedidos, setTotalPedidos] = useState(null);
  const [total_empleados, setTotalEmpleados] = useState(null);
  const [total_platos, setTotalPlatos] = useState(null);
  const [restaurante, setRestaurante] = useState("");
  const [imagenRestaurante, setImagenRestaurante] = useState<File | null>(null);
  const [img,setImg] = useState("")

  useEffect(() => {
    const obtenerEstadisticasRestaurantes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4500/api/Web/propietario/estadisticas/${localStorage.getItem(
            "restauranteID"
          )}`
        );
        setTotalPedidos(response.data.total_pedidos);
        setTotalEmpleados(response.data.total_empleados);
        setTotalPlatos(response.data.total_platos);
        console.log(response.data);
      } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
      }
    };

    const obtenerDatosRestaurante = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4500/api/Web/propietario/${localStorage.getItem(
            "persona"
          )}`
        );
        const datosRestaurante = response.data[0];
        setValue("cedula", datosRestaurante.cedula_p);
        setValue("nombre", datosRestaurante.nombre_p);
        setValue("apellido", datosRestaurante.apellido_p);
        const fechaNacimientoFormatted = new Date(
          datosRestaurante.fecha_nacimiento_p
        )
          .toISOString()
          .substr(0, 10);
        setValue("fechaNacimiento", fechaNacimientoFormatted);
        setValue("correo", datosRestaurante.correo_p);
        setValue("direccion", datosRestaurante.direccion_r);
        setValue("NombreRestaurante", datosRestaurante.nombre_r);
      } catch (error) {
        console.error("Error al obtener los datos del restaurante:", error);
      }
    };

    setRestaurante(localStorage.getItem("restauranteNOMBRE") || "");
    setImg(localStorage.getItem('restauranteImagen') || "")
    obtenerDatosRestaurante();
    obtenerEstadisticasRestaurantes();
  }, [setValue, restaurante]);

  const onSubmit: SubmitHandler<any> = async (data) => {

    const envioImagen = await uploadFile(
      imagenRestaurante,"logos",
      data.NombreRestaurante
    );

    const datosEnviar = {
      ...data,
      imagen: envioImagen,
    };

    axios
      .put(
        `http://localhost:4500/api/Web/propietario/${localStorage.getItem(
          "persona"
        )}`,
        datosEnviar
      )
      .then(async (response) => {
        localStorage.setItem("restauranteNOMBRE", data.NombreRestaurante);
        setRestaurante(localStorage.getItem("restauranteNOMBRE") || "");
        localStorage.setItem('restauranteImagen', envioImagen);
        setImg(envioImagen)
        toast.success("Información actualizada correctamente", {
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
      })
      .catch((error) => {
        toast.error(
          "Hubo un problema al procesar la información. Intentalo mas tarde.",
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
        console.error("Error submitting data:", error);
      });
  };

  const renderError = (error: any) => {
    if (error && typeof error.message === "string") {
      return <p className="text-red-500 text-lg">{error.message}</p>;
    }
    return null;
  };
  const validarFechaNacimiento = (value: any) => {
    // Convertir la fecha de nacimiento a un objeto Date
    const fechaNacimiento = new Date(value);
    // Calcular la fecha actual
    const fechaActual = new Date();
    // Calcular la edad restando los años de la fecha de nacimiento de la fecha actual
    const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

    // Verificar si la edad es menor de 18 años
    if (edad < 18) {
      return "Debes ser mayor de 18 años";
    }

    return undefined; // Devuelve undefined si el usuario es mayor de 18 años
  };
  return (
    <div
      className="bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: 'url("/imagenes/fondo.svg")',
      }}
    >
      <div className="w-full grid grid-cols-5 row-auto h-full">
        <div
          className="col-start-1 col-span-1 text-[45px] border-b border-black"
          style={{ fontFamily: "David Libre", height: "70px" }}
        >
          <h1>Perfil</h1>
        </div>

        <div className="row-start-2 col-start-1 col-span-2 mt-5 ">
        <Image src={img} alt="" width={20} height={20} className="w-[50%]" />
          <div
            className=" text-[30px] ml-5  "
            style={{ fontFamily: "David Libre" }}
          >
            <h1>{restaurante}</h1>
          </div>
          <div className="ml-5 flex mt-5">
            <Image src={ventas} alt="" className="w-[10%]"></Image>
            <div className="ml-3">
              {total_pedidos && (
                <h1 className="text-xl font-bold">{total_pedidos}</h1>
              )}
              <h1 className="text-[20px] ">Ventas realizadas</h1>
            </div>
          </div>
          <div className="ml-5 flex mt-5">
            <Image src={platos} alt="" className="w-[10%]"></Image>
            <div className="ml-3">
              {total_platos && (
                <h1 className="text-xl font-bold">{total_platos}</h1>
              )}
              <h1 className="text-[20px] ">Platos registrados</h1>
            </div>
          </div>
          <div className="ml-5 flex mt-5">
            <Image src={empleados} alt="" className="w-[10%]"></Image>
            <div className="ml-3">
              {total_empleados && (
                <h1 className="text-xl font-bold">{total_empleados}</h1>
              )}
              <h1 className="text-[20px] ">Empleados registrados</h1>
            </div>
          </div>
        </div>

        <div className="col-start-3 col-span-5 row-start-2 row-span-2 mr-[10%] flex items-center ">
          <form
            className=" w-full  grid grid-cols-2 gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                  inputMode="numeric"
                  {...register("cedula", {
                    required: {
                      value: true,
                      message: "La cédula es obligatoria",
                    },
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "La cédula debe tener 10 dígitos",
                    },
                  })}
                  className="p-3 rounded block mb-2 text-black border border-black w-full"
                  placeholder="0502634967"
                  onKeyPress={(event) => {
                    const charCode = event.which ? event.which : event.keyCode;
                    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                      event.preventDefault();
                    }
                  }}
                />
              </div>
              {renderError(errors.cedula)}
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
                      message: "El nombre es obligatorio",
                    },
                    minLength: {
                      value: 3,
                      message: "El nombre debe tener al menos 3 caracteres",
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Solo se permiten letras ",
                    },
                  })}
                  className="p-3 rounded block mb-2 text-black border border-black w-full"
                  placeholder="Alex"
                />
              </div>
              {renderError(errors.nombre)}
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
                      message: "El apellido es obligatorio",
                    },
                    minLength: {
                      value: 2,
                      message: "El apellido debe tener al menos 2 caracteres",
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Solo se permiten letras y espacios",
                    },
                  })}
                  className="p-3 rounded block mb-2 text-black border border-black w-full"
                  placeholder="Jimenez"
                />
              </div>
              {renderError(errors.apellido)}
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
                  type="date"
                  {...register("fechaNacimiento", {
                    required: {
                      value: true,
                      message: "La fecha de nacimiento es obligatoria",
                    },
                    pattern: {
                      value: /^\d{4}-\d{2}-\d{2}$/,
                      message:
                        "La fecha de nacimiento debe tener el formato YYYY-MM-DD",
                    },
                    validate: validarFechaNacimiento,
                  })}
                  className="p-3 rounded block mb-2 text-black border border-black w-full"
                  placeholder="1999-12-12"
                />
              </div>
              {renderError(errors.fechaNacimiento)}
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
                      message: "El correo es obligatorio",
                    },
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "El correo debe ser una dirección válida",
                    },
                  })}
                  className="p-3 rounded block mb-2 text-black border border-black w-full"
                  placeholder="alexJime@gmail.com"
                />
              </div>
              {renderError(errors.correo)}
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
                      message: "La dirección es obligatoria",
                    },
                    minLength: {
                      value: 8,
                      message: "La dirección debe tener al menos 8 caracteres",
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Solo se permiten letras y espacios",
                    },
                  })}
                  className="p-3 rounded block mb-2 text-black border border-black w-full"
                  placeholder="Ambato"
                />
              </div>
              {renderError(errors.direccion)}
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
                      message: "El nombre del restaurante es obligatorio",
                    },
                    minLength: {
                      value: 2,
                      message:
                        "El nombre del restaurante debe tener al menos 2 caracteres",
                    },
                  })}
                  className="p-3 rounded block mb-2 text-black border border-black w-full"
                  placeholder="Pikos"
                />
              </div>
              {renderError(errors.NombreRestaurante)}
            </div>

            {/* Campo para cargar la imagen del negocio */}
            <div>
              <label
                htmlFor="imagen"
                className="text-slate-500 mb-2 block text-sm"
              >
                Imagen del Negocio:
              </label>
              <div className="flex relative">
                <input
                  type="file"
                  {...register("imagen", {
                    required: {
                      value: true,
                      message: "Imagen is required",
                    },
                  })}
                  className="p-3 rounded block mb-2 text-black border border-black w-full"
                  placeholder="Imagen"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImagenRestaurante(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>

            {/* Botón de submit */}
            <button className="col-span-2 bg-[#01AE67] hover:bg-teal-700 text-white font-bold p-3 rounded-lg mt-2">
              Guardar información
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;
