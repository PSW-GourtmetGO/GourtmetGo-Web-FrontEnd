'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import Modal from './componentes/modalmenu/page';
import ModalC from './componentes/modalcategoria/page';
import Link from 'next/link';
import axios from 'axios';
import { PiAlignTop } from 'react-icons/pi';

const MenuPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({
    platoID: 0,
    platoNombre: '',
    precio: 0,
    visible: '',
    categoria: 0,
    accion: ''
  });
  const [CategoriaAbierta, setCategoriaAbierta] = useState(false)
  const restaurante = localStorage.getItem('restauranteNOMBRE');
  const [categorias, setCategorias] = useState([]);
  const [platos, setPlatos] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/api/Web/categoria/${localStorage.getItem('restauranteID')}`);
        console.log(response.data)
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener las estadísticas:', error);
      }
    };
    const handleObtenerPlatosTodos = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/api/Web/plato/duenio/restaurante/${localStorage.getItem('restauranteID')}`);
        console.log(response.data);
        setPlatos(response.data);
      } catch (error) {
        console.error('Error al obtener los platos:', error);
      }
    };
    obtenerCategorias();
    handleObtenerPlatosTodos();
  }, [isModalOpen,CategoriaAbierta]);

  const handleObtenerPlatosCategoria = async (categoriaId:number) => {
    try {
      const response = await axios.get(`http://localhost:4500/api/Web/plato/duenio/categoria/${categoriaId}`);
      console.log(categoriaId);
      console.log(response.data);
      setPlatos(response.data);
    } catch (error) {
      console.error('Error al obtener los platos:', error);
    }
  };

  const handleObtenerPlatosTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:4500/api/Web/plato/duenio/restaurante/${localStorage.getItem('restauranteID')}`);
      console.log(response.data);
      setPlatos(response.data);
    } catch (error) {
      console.error('Error al obtener los platos:', error);
    }
  };

  useEffect(() => {
    const obtenerPlatos = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/api/Web/categoria/${localStorage.getItem('restauranteID')}`);
        console.log(response.data)
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener las estadísticas:', error);
      }
    };

    obtenerPlatos();
  }, []);

  const handleModalOpen = (platoID:number,platoNombre:string,precio:number,visible:string,categoria:number,accion:string) => {
    if (accion == "crear"){
      setData({
        platoID: 0,
        platoNombre: '',
        precio: 0,
        visible: "true",
        categoria: 1,
        accion: accion
      });  
    }else{
      setData({
        platoID: platoID,
        platoNombre: platoNombre,
        precio: precio,
        visible: visible,
        categoria: categoria,
        accion: accion
      });
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCategoriaOpen = () => {
    setCategoriaAbierta(true);
  };

  const handleCategoriaClose = () => {
    setCategoriaAbierta(false);
  };

  const InputChangeFind = async (event:any) => {
    const inputValue = event.target.value;
    try {
      const response = await axios.get(`http://localhost:4500/api/Web/plato/duenio?restaurante=${localStorage.getItem('restauranteID')}&plato=${inputValue}`);
      setPlatos(response.data);
    } catch (error) {
      console.error('Error al obtener las estadísticas:', error);
    }
  };

  return (
    <div className="bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: 'url("/imagenes/fondo.svg")',
        minHeight: "calc(80vh)",
      }}>

      <div className='max-h-[80vh] grid grid-cols-5 grid-rows-5 gap-y-12' >

        <div className='row-start-1 col-span-6 grid grid-cols-4 grid-rows-2 gap-y-24'>

          <div className='col-start-1' style={{ fontFamily: "David Libre" }}>
            <h1 className='text-[45px]'>{restaurante} </h1>
          </div>

          <div className='col-start-4 relative'>
            <input className='pr-[100px] w-[320px] 2xl:w-[400px] text-white font-bold bg-[#274C5B] py-3 pl-12 rounded-lg' placeholder='Buscar platos, bebidas, etc.' onChange={InputChangeFind}></input>
            <BiSearch className='absolute left-3 top-4 text-white' />
          </div>

          <div className='row-start-2 col-start-1 col-span-3'>
            <div style={{ fontFamily: "David Libre" }} className='flex justify-between'>
              <div className='p-2 rounded-md' >
              <Link href="/dashboard/menu">
                <span className='text-sm text-[#ea7c69] border-b-2 border-[#ea7c69]' onClick={() => handleObtenerPlatosTodos()}>Todos</span>
              </Link>
              </div>
              {categorias.map((categoria: { nombre: string,id:number }, index: number) => (
                <div key={index} className='p-2 rounded-md'>
                  <Link href="/dashboard/menu">
                    <span className='text-sm text-[#ea7c69] border-b-2 border-[#ea7c69]' onClick={() => handleObtenerPlatosCategoria(categoria.id)}>{categoria.nombre}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className='row-start-2 col-start-4 flex items-center justify-end mr-3'>
            <button className='bg-[#01AE67] hover:bg-teal-700 text-white font-bold py-3 px-2 rounded-lg' onClick={handleCategoriaOpen}>Editar Categorias</button>
          </div>

        </div>

        <div className='row-start-2 col-start-1 col-span-6 flex items-start justify-start mr-[5%] border-black border-t-2'>
          <h1 style={{ fontFamily: "David Libre" }} className='font-bold text-xl mt-5'>Mis Platos</h1>
        </div>

        <div className='row-start-2 col-start-5 flex items-center justify-end mr-3'>
          <button className='bg-[#01AE67] hover:bg-teal-700 text-white font-bold py-3 px-2 rounded-lg' onClick={()=>handleModalOpen(0,"",0,"",0,"crear")}>Añadir Plato</button>
        </div>

        <div className='row-start-3 col-span-5 mt-5 '>
          <div className='grid grid-rows-3 gap-9'>

            {platos.map((plato: { nombre: string,precio:any,categoria_nombre:string,categoria_id:number,ver:string,id:number }, index: number) => (
            <div className='row-start-1 grid grid-cols-4 gap-3'>
            <div className='col-start-1 max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden justify-center text-center' style={{ width: '250px' }} onClick={()=>handleModalOpen(plato.id,plato.nombre,plato.precio,plato.ver,plato.categoria_id,"actualizar")}>
                  <div className='flex justify-center items-center overflow-hidden' style={{ backgroundImage: 'linear-gradient(to bottom, white 25%, #274c5b 25%, #274c5b 100%)' }}>
                    <Image width={200} height={200} src="/imagenes/platillos.svg" alt="" className='rounded-full w-56 h-auto' />
                  </div>
                  <div className='max-w-md mx-auto bg-[#274c5b] shadow-lg rounded-b-xl overflow-hidden text-white'>
                    <h2 className='text-xl font-bold mt-5'>{plato.nombre}</h2>
                    <h3 className='text-sm'>{plato.precio}</h3>
                    <h3 className='text-sm'>{plato.ver}</h3>
                    <p className='text-gray-400 mt-2 mb-5'>{plato.categoria_nombre}</p>
                  </div>
                </div>
                </div>
              ))};
          </div>
        </div>
        
        <Modal isOpen={isModalOpen} onClose={handleModalClose} Datos ={data} setData={setData}/>
        <ModalC isOpen={CategoriaAbierta} onClose={handleCategoriaClose} />

      </div>
    </div>

  )
}

export default MenuPage