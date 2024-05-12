"use client";
import Image from "next/image";
import React, { useEffect , useState} from "react";
import axios from "axios";
import ventas from "../../../public/imagenes/VentasRealizadas.svg";
import platos from "../../../public/imagenes/PlatosRegistrados.svg";
import empleados from "../../../public/imagenes/EmpleadosRegistrados.svg";
import { useForm, SubmitHandler  } from "react-hook-form";
import negocioSf from "../../../public/imagenes/negocioSF.svg";
const PerfilPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const [total_pedidos, setTotalPedidos] = useState(null);
  const [total_empleados, setTotalEmpleados] = useState(null);
  const [total_platos, setTotalPlatos] = useState(null);

  useEffect(() => {
    const obtenerEstadisticasRestaurantes = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/api/Web/propietario/estadisticas/${localStorage.getItem('restauranteID')}`);
        setTotalPedidos(response.data.total_pedidos);
        setTotalEmpleados(response.data.total_empleados);
        setTotalPlatos(response.data.total_platos);
        console.log(response.data);
      } catch (error) {
        console.error('Error al obtener las estadísticas:', error);
      }
    };

    obtenerEstadisticasRestaurantes();
  }, []);
  
  useEffect(() => {
    const obtenerDatosRestaurante = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/api/Web/propietario/${localStorage.getItem('persona')}`);
        const datosRestaurante = response.data[0];
        setValue('cedula', datosRestaurante.cedula_p);
        setValue('nombre', datosRestaurante.nombre_p);
        setValue('apellido', datosRestaurante.apellido_p);
        const fechaNacimientoFormatted = new Date(datosRestaurante.fecha_nacimiento_p).toISOString().substr(0, 10);
        setValue('fechaNacimiento', fechaNacimientoFormatted);
        setValue('correo', datosRestaurante.correo_p);
        setValue('direccion', datosRestaurante.direccion_r);
        setValue('NombreRestaurante', datosRestaurante.nombre_r);
      } catch (error) {
        console.error('Error al obtener los datos del restaurante:', error);
      }
    };
    obtenerDatosRestaurante();
  }, [setValue]);
  const restaurante = localStorage.getItem('restauranteNOMBRE');
  const onSubmit: SubmitHandler<any> = async (data) => {
    const base64Image = await convertImageToBase64(data.imagen[0]);
    console.log(base64Image);
    const datosEnviar = {
      ...data,
      imagen: base64Image,
    };

    axios.put(`http://localhost:4500/api/Web/propietario/${localStorage.getItem('persona')}`, datosEnviar)
    .then(response => {
        alert("Información actualizada correctamente");
    })
    .catch(error => {
        alert("Hubo un problema al procesar la información. Intente más tarde");
        console.error('Error submitting data:', error);
    });
  };

  const convertImageToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read the file as base64.'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

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
          <Image src={negocioSf} alt="" className="w-[50%]"></Image>
          <div
            className=" text-[45px] ml-5  "
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
          <form className=" w-full  grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder="0502634967"
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
                      message: "nombre is required",
                    },
                  })}
                  className="p-3 rounded block mb-2 text-black border border-black w-full"
                  placeholder="Alex"
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
                  placeholder="Jimenez"
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
                  type="date"
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
                  placeholder="alexJime@gmail.com"
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
                  placeholder="Ambato"
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
                />
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
