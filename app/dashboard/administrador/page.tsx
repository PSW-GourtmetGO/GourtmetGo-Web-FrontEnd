import React from 'react'
import { BiSearch } from 'react-icons/bi'

const AdministradorPage = () => {
  return (
    <div style={{
      backgroundImage: 'url("/imagenes/fondo.svg")',
      minHeight: "calc(88vh)",
    }}  >
      <div className='grid grid-cols-5 grid-rows-5' >
        <div className='col-start-1 col-span-2 text-[45px] border-b border-black' style={{ fontFamily: "David Libre" }}><h1>Empleados</h1></div>

        <div className='col-start-4 col-span-2 text-[45px] flex items-center justify-end ' style={{ fontFamily: "David Libre" }}><h1>Papi Pollos</h1></div>

        <div className='row-start-3 relative'>
          <input className='w-[400px]  text-white font-bold bg-[#274C5B] py-3 pl-12 rounded-lg' placeholder='Buscar nombre del empleado'></input>
          <BiSearch className='absolute left-3 top-4 text-white' />
        </div>
        <div className='row-start-3 col-start-2 flex items-start justify-end mr-[5%]'>
          <button className='bg-[#01AE67] hover:bg-teal-700 text-white font-bold py-3 px-2 rounded-lg'>Añadir Empleado</button>
        </div>


      </div>
    </div>

  )
}

export default AdministradorPage