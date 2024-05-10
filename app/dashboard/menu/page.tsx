import Image from 'next/image'
import React from 'react'
import { BiSearch } from 'react-icons/bi'

const MenuPage = () => {
  return (
    <div className="bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: 'url("/imagenes/fondo.svg")',
        minHeight: "calc(80vh)",
      }}>
      <div className='max-h-[80vh] w-full grid grid-cols-5 grid-rows-5' >
        <div className='col-start-1 col-span-4 text-[45px] border-b border-black' style={{ fontFamily: "David Libre" }}><h1>Anthony Solis</h1>
          <h1 style={{ fontFamily: "David Libre" }} className='text-sm'>Lunes, 1 Abr 2024</h1>
          <div style={{ fontFamily: "David Libre" }} className='grid grid-cols-6 gap-4 justify-between'>
            <div className='p-2 rounded-md' >
              <h1 className='text-sm '>Platos Calientes</h1>
            </div>
            <div className='p-2 rounded-md' >
              <h1 className='text-sm'>Platos Fríos</h1>
            </div>
            <div className='p-2 rounded-md' >
              <h1 className='text-sm'>Sopas</h1>
            </div>
            <div className='p-2 rounded-md' >
              <h1 className='text-sm'>Grill</h1>
            </div>
            <div className='p-2 rounded-md' >
              <h1 className='text-sm'>Aperitivos</h1>
            </div>
            <div className='p-2 rounded-md' >
              <h1 className='text-sm'>Postres</h1>
            </div>
          </div>
        </div>

        <div className='col-start-5 col-end-6 relative border-b border-black'>
          <input className='pr-[100px] w-[320px] 2xl:w-[400px] text-white font-bold bg-[#274C5B] py-3 pl-12 rounded-lg' placeholder='Buscar platos, bebidas, etc.'></input>
          <BiSearch className='absolute left-3 top-4 text-white' />
        </div>

        <div className='row-start-2 col-start-1 flex items-start justify-start mr-[5%] mt-6'>
          <h1 style={{ fontFamily: "David Libre" }} className='font-bold text-xl'>Mis Platos</h1>
        </div>

        <div className='row-start-2 col-start-5 flex items-start justify-end mr-[5%] mt-6'>
          <button className='bg-[#01AE67] hover:bg-teal-700 text-white font-bold py-3 px-2 rounded-lg'>Editar menú</button>
        </div>

        <div className='row-start-3 col-span-5 mt-5 '>
          <div className='grid grid-rows-3 gap-9'>
            <div className='row-start-1 grid grid-cols-4 gap-3'>
              <div className='col-start-1 max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden justify-center text-center' style={{ width: '250px' }}>
                <div className='flex justify-center items-center overflow-hidden' style={{ backgroundImage: 'linear-gradient(to bottom, white 25%, #274c5b 25%, #274c5b 100%)' }}>
                  <Image width={200} height={200} src="/imagenes/platillos.svg" alt="" className='rounded-full' />
                </div>
                <div className='max-w-md mx-auto bg-[#274c5b] shadow-lg rounded-b-xl overflow-hidden text-white'>
                  <h2 className='text-xl font-bold mt-5'>Nombre</h2>
                  <h3 className='text-sm'>Costo: $21</h3>
                  <p className='text-gray-400 mt-2 mb-5'>Disponible 2</p>
                </div>
              </div>
              <div className='col-start-2 max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden justify-center text-center' style={{ width: '250px' }}>
                <div className='flex justify-center items-center overflow-hidden' style={{ backgroundImage: 'linear-gradient(to bottom, white 25%, #274c5b 25%, #274c5b 100%)' }}>
                  <Image width={200} height={200} src="/imagenes/platillos.svg" alt="" className='rounded-full w-56 h-auto' />
                </div>
                <div className='max-w-md mx-auto bg-[#274c5b] shadow-lg rounded-b-lg overflow-hidden text-white'>
                  <h2 className='text-xl font-bold mt-5'>Nombre</h2>
                  <h3 className='text-sm'>Costo: $21</h3>
                  <p className='text-gray-400 mt-2 mb-5'>Disponible 2</p>
                </div>
              </div>
              <div className='col-start-3 max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden justify-center text-center' style={{ width: '250px' }}>
                <div className='flex justify-center items-center overflow-hidden' style={{ backgroundImage: 'linear-gradient(to bottom, white 25%, #274c5b 25%, #274c5b 100%)' }}>
                  <Image width={200} height={200} src="/imagenes/platillos.svg" alt="" className='rounded-full w-56 h-auto' />
                </div>
                <div className='max-w-md mx-auto bg-[#274c5b] shadow-lg rounded-b-lg overflow-hidden text-white'>
                  <h2 className='text-xl font-bold mt-5'>Nombre</h2>
                  <h3 className='text-sm'>Costo: $21</h3>
                  <p className='text-gray-400 mt-2 mb-5'>Disponible 2</p>
                </div>
              </div>
              <div className='col-start-4 max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden justify-center text-center' style={{ width: '250px' }}>
                <div className='flex justify-center items-center overflow-hidden' style={{ backgroundImage: 'linear-gradient(to bottom, white 25%, #274c5b 25%, #274c5b 100%)' }}>
                  <Image width={200} height={200} src="/imagenes/platillos.svg" alt="" className='rounded-full w-56 h-auto' />
                </div>
                <div className='max-w-md mx-auto bg-[#274c5b] shadow-lg rounded-b-lg overflow-hidden text-white'>
                  <h2 className='text-xl font-bold mt-5'>Nombre</h2>
                  <h3 className='text-sm'>Costo: $21</h3>
                  <p className='text-gray-400 mt-2 mb-5'>Disponible 2</p>
                </div>
              </div>
            </div>

            <div className='row-start-2 grid grid-cols-4 gap-3'>
              <div className='col-start-1 max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden justify-center text-center' style={{ width: '250px' }}>
                <div className='flex justify-center items-center overflow-hidden' style={{ backgroundImage: 'linear-gradient(to bottom, white 25%, #274c5b 25%, #274c5b 100%)' }}>
                  <Image width={200} height={200} src="/imagenes/platillos.svg" alt="" className='rounded-full w-56 h-auto' />
                </div>
                <div className='max-w-md mx-auto bg-[#274c5b] shadow-lg rounded-b-lg overflow-hidden text-white'>
                  <h2 className='text-xl font-bold mt-5'>Nombre</h2>
                  <h3 className='text-sm'>Costo: $21</h3>
                  <p className='text-gray-400 mt-2 mb-5'>Disponible 2</p>
                </div>
              </div>
              <div className='col-start-2 max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden justify-center text-center' style={{ width: '250px' }}>
                <div className='flex justify-center items-center overflow-hidden' style={{ backgroundImage: 'linear-gradient(to bottom, white 25%, #274c5b 25%, #274c5b 100%)' }}>
                  <Image width={200} height={200} src="/imagenes/platillos.svg" alt="" className='rounded-full w-56 h-auto' />
                </div>
                <div className='max-w-md mx-auto bg-[#274c5b] shadow-lg rounded-b-lg overflow-hidden text-white'>
                  <h2 className='text-xl font-bold mt-5'>Nombre</h2>
                  <h3 className='text-sm'>Costo: $21</h3>
                  <p className='text-gray-400 mt-2 mb-5'>Disponible 2</p>
                </div>
              </div>
              <div className='col-start-3 max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden justify-center text-center' style={{ width: '250px' }}>
                <div className='flex justify-center items-center overflow-hidden' style={{ backgroundImage: 'linear-gradient(to bottom, white 25%, #274c5b 25%, #274c5b 100%)' }}>
                  <Image width={200} height={200} src="/imagenes/platillos.svg" alt="" className='rounded-full w-56 h-auto' />
                </div>
                <div className='max-w-md mx-auto bg-[#274c5b] shadow-lg rounded-b-lg overflow-hidden text-white'>
                  <h2 className='text-xl font-bold mt-5'>Nombre</h2>
                  <h3 className='text-sm'>Costo: $21</h3>
                  <p className='text-gray-400 mt-2 mb-5'>Disponible 2</p>
                </div>
              </div>
              <div className='col-start-4 max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden justify-center text-center' style={{ width: '250px' }}>
                <div className='flex justify-center items-center overflow-hidden' style={{ backgroundImage: 'linear-gradient(to bottom, white 25%, #274c5b 25%, #274c5b 100%)' }}>
                  <Image width={200} height={200} src="/imagenes/platillos.svg" alt="" className='rounded-full w-56 h-auto' />
                </div>
                <div className='max-w-md mx-auto bg-[#274c5b] shadow-lg rounded-b-lg overflow-hidden text-white'>
                  <h2 className='text-xl font-bold mt-5'>Nombre</h2>
                  <h3 className='text-sm'>Costo: $21</h3>
                  <p className='text-gray-400 mt-2 mb-5'>Disponible 2</p>
                </div>
              </div>
            </div>

            <div className='row-start-3 grid grid-cols-4 gap-3'>
              <div className='col-start-1 max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden justify-center text-center' style={{ width: '250px' }}>
                <div className='flex justify-center items-center overflow-hidden' style={{ backgroundImage: 'linear-gradient(to bottom, white 25%, #274c5b 25%, #274c5b 100%)' }}>
                  <Image width={200} height={200} src="/imagenes/platillos.svg" alt="" className='rounded-full w-56 h-auto' />
                </div>
                <div className='max-w-md mx-auto bg-[#274c5b] shadow-lg rounded-b-lg overflow-hidden text-white'>
                  <h2 className='text-xl font-bold mt-5'>Nombre</h2>
                  <h3 className='text-sm'>Costo: $21</h3>
                  <p className='text-gray-400 mt-2 mb-5'>Disponible 2</p>
                </div>
              </div>
              <div className='col-start-2 max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden justify-center text-center' style={{ width: '250px' }}>
                <div className='flex justify-center items-center overflow-hidden' style={{ backgroundImage: 'linear-gradient(to bottom, white 25%, #274c5b 25%, #274c5b 100%)' }}>
                  <Image width={200} height={200} src="/imagenes/platillos.svg" alt="" className='rounded-full w-56 h-auto' />
                </div>
                <div className='max-w-md mx-auto bg-[#274c5b] shadow-lg rounded-b-lg overflow-hidden text-white'>
                  <h2 className='text-xl font-bold mt-5'>Nombre</h2>
                  <h3 className='text-sm'>Costo: $21</h3>
                  <p className='text-gray-400 mt-2 mb-5'>Disponible 2</p>
                </div>
              </div>
              <div className='col-start-3 max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden justify-center text-center' style={{ width: '250px' }}>
                <div className='flex justify-center items-center overflow-hidden' style={{ backgroundImage: 'linear-gradient(to bottom, white 25%, #274c5b 25%, #274c5b 100%)' }}>
                  <Image width={200} height={200} src="/imagenes/platillos.svg" alt="" className='rounded-full w-56 h-auto' />
                </div>
                <div className='max-w-md mx-auto bg-[#274c5b] shadow-lg rounded-b-lg overflow-hidden text-white'>
                  <h2 className='text-xl font-bold mt-5'>Nombre</h2>
                  <h3 className='text-sm'>Costo: $21</h3>
                  <p className='text-gray-400 mt-2 mb-5'>Disponible 2</p>
                </div>
              </div>
              <div className='col-start-4 max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden justify-center text-center' style={{ width: '250px' }}>
                <div className='flex justify-center items-center overflow-hidden' style={{ backgroundImage: 'linear-gradient(to bottom, white 25%, #274c5b 25%, #274c5b 100%)' }}>
                  <Image width={200} height={200} src="/imagenes/platillos.svg" alt="" className='rounded-full w-56 h-auto' />
                </div>
                <div className='max-w-md mx-auto bg-[#274c5b] shadow-lg rounded-b-lg overflow-hidden text-white'>
                  <h2 className='text-xl font-bold mt-5'>Nombre</h2>
                  <h3 className='text-sm'>Costo: $21</h3>
                  <p className='text-gray-400 mt-2 mb-5'>Disponible 2</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}

export default MenuPage