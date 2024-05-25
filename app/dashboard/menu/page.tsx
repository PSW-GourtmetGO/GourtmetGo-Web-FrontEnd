'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import Modal from './componentes/modalmenu/page';
import ModalC from './componentes/modalcategoria/page';
import Link from 'next/link';
import axios from 'axios';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import "./page.scss";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MenuPage = () => {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({
    platoID: 0,
    platoNombre: '',
    precio: 0,
    visible: '',
    categoria: 0,
    accion: ''
  });
  const [CategoriaAbierta, setCategoriaAbierta] = useState(false);
  const restaurante = localStorage.getItem('restauranteNOMBRE');
  const [categorias, setCategorias] = useState([]);
  const [platos, setPlatos] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const date = new Date();
    const formattedDate = format(date, 'EEEE, d MMM yyyy', { locale: es });
    setCurrentDate(formattedDate);
    const obtenerCategorias = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/api/Web/categoria/${localStorage.getItem('restauranteID')}`);
        console.log(response.data);
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
  }, [isModalOpen, CategoriaAbierta]);

  const handleObtenerPlatosCategoria = async (categoriaId: number) => {
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
        console.log(response.data);
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener las estadísticas:', error);
      }
    };

    obtenerPlatos();
  }, []);

  const handleModalOpen = (platoID: number, platoNombre: string, precio: number, visible: string, categoria: number, accion: string) => {
    if (accion === 'crear') {
      setData({
        platoID: 0,
        platoNombre: '',
        precio: 0,
        visible: 'true',
        categoria: 1,
        accion: accion
      });
    } else {
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

  const InputChangeFind = async (event: any) => {
    const inputValue = event.target.value;
    const lettersOnly = inputValue.replace(/[^a-zA-Z\s]/g, '');
    event.target.value = lettersOnly;
    try {
      const response = await axios.get(`http://localhost:4500/api/Web/plato/duenio?restaurante=${localStorage.getItem('restauranteID')}&plato=${lettersOnly}`);
      console.log(response.data)
      setSearchResults(response.data); 
    } catch (error) {
      console.error('Error al obtener las estadísticas:', error);
    }
  };

  useEffect(() => {
    // Actualiza la lista de platos solo si hay resultados de búsqueda
    setPlatos(searchResults.length > 0 ? searchResults : []);
  }, [searchResults]);

  return (
    <div className="contenedorPaginasDashboard">
      <div className="encabezado">
        <div className="titulo">
          <h1>Platos</h1>
          <hr />
        </div>
        <div className="inforestaurante">
          <h1>{restaurante}</h1>
        </div>
      </div>
      <div className="informacionPlatos">
        <div className="usuario">
          <h2>Anthony Solis</h2>
          <p>{currentDate}</p>
        </div>
        <div className="contenedorBuscador">
          <input className='inputBuscador' placeholder='Buscar platos, bebidas, etc.' maxLength={25} minLength={4} onChange={InputChangeFind}></input>
          <svg className='iconoBuscador' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor" d="M9.539 15.23q-2.398 0-4.065-1.666Q3.808 11.899 3.808 9.5t1.666-4.065T9.539 3.77t4.064 1.666T15.269 9.5q0 1.042-.369 2.017t-.97 1.668l5.909 5.907q.14.14.15.345q.009.203-.15.363q-.16.16-.354.16t-.354-.16l-5.908-5.908q-.75.639-1.725.989t-1.96.35m0-1q1.99 0 3.361-1.37q1.37-1.37 1.37-3.361T12.9 6.14T9.54 4.77q-1.991 0-3.361 1.37T4.808 9.5t1.37 3.36t3.36 1.37" />
          </svg>
        </div>
      </div>
      <div className="contenidoMenu">
        <div className="botonesPlatos">
          <div className="contenedorEtiquetas">
            <div className='etiqueta'>
              <Link href="/dashboard/menu">
                <span className='textoEtiqueta' onClick={() => handleObtenerPlatosTodos()}>Todos</span>
              </Link>
            </div>
            {categorias.map((categoria: { nombre: string, id: number }, index: number) => (
              <div key={index} className='etiqueta'>
                <Link href="/dashboard/menu">
                  <span className='textoEtiqueta' onClick={() => handleObtenerPlatosCategoria(categoria.id)}>{categoria.nombre}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="btnPlato">
            <button className='botonVerde' onClick={handleCategoriaOpen}>Editar Categorias</button>
            <button className='botonVerde' onClick={() => handleModalOpen(0, "", 0, "", 0, "crear")} disabled={categorias.length === 0}>Agregar Plato</button>
          </div>
        </div>
        <div className="listaPlatos">
          {platos.map((plato: { nombre: string, precio: any, categoria_nombre: string, categoria_id: number, ver: string, id: number }, index: number) => (
            <div className='contenedorPlato' key={index}>
              <div className='tarjetaPlato' style={{ width: '250px' }} onClick={() => handleModalOpen(plato.id, plato.nombre, plato.precio, plato.ver, plato.categoria_id, "actualizar")}>
                <div className='imagenPlato'>
                  <Image width={200} height={200} src="/imagenes/platillos.svg" alt="" className='fotoPlato' />
                </div>
                <div className='detallePlato'>
                  <h2 className='nombrePlato'>{plato.nombre}</h2>
                  <h3 className='precioPlato'>$ {plato.precio}</h3>
                  <h3 className='verPlato'>{plato.ver}</h3>
                  <p className='categoriaPlato'>{plato.categoria_nombre}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer />
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} Datos={data} setData={setData} />
      <ModalC isOpen={CategoriaAbierta} onClose={handleCategoriaClose} />
    </div>
  );
}

export default MenuPage;
