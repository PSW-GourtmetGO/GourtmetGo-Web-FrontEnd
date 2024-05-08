import Image from 'next/image'
import React from 'react'
import { BiPencil, BiSearch } from 'react-icons/bi'
import { FaRegTrashAlt } from 'react-icons/fa'

import empleado1 from '../../../public/imagenes/mujer2.svg'

const AdministradorPage = () => {
  return (
    <div className="bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: 'url("/imagenes/fondo.svg")',
        minHeight: "calc(80vh)",
      }}>
      <div className='grid grid-cols-5 grid-rows-5' >
        <div className='col-start-1 col-span-2 text-[45px] border-b border-black' style={{ fontFamily: "David Libre" }}><h1>Empleados</h1></div>

        <div className='col-start-4 col-span-2 text-[45px] flex items-center justify-end ' style={{ fontFamily: "David Libre" }}><h1>Papi Pollos</h1></div>

        <div className='row-start-2 relative mt-10'>
          <input className='w-[320px] 2xl:w-[400px] text-white font-bold bg-[#274C5B] py-3 pl-12 rounded-lg' placeholder='Buscar nombre del empleado'></input>
          <BiSearch className='absolute left-3 top-4 text-white' />
        </div>
        <div className='row-start-2 col-start-2 flex items-start justify-end mr-[5%] mt-10'>
          <button className='bg-[#01AE67] hover:bg-teal-700 text-white font-bold py-3 px-2 rounded-lg'>Añadir Empleado</button>
        </div>

        <div className='row-start-3 col-span-5 mt-5'>
          <table className='w-full border-collapse'>
            <thead className='border-b border-black'>
              <tr>
                <th className='py-2 px-4 bg-transparent text-gray-800'>Nombre</th>
                <th className='py-2 px-4 bg-transparent text-gray-800'>Apellido</th>
                <th className='py-2 px-4 bg-transparent text-gray-800'>Correo</th>
                <th className='py-2 px-4 bg-transparent text-gray-800'>Acciones</th>
              </tr>
            </thead>

            <tbody className='text-center'>
              {/* Aquí puedes agregar filas de datos */}
              <tr className='bg-transparent text-gray-800'>
                <td className='py-2 px-4'>
                  <div className='flex items-center justify-start ml-[23%] 2xl:ml-[29%]'>
                    <div className='mr-4'><Image className='rounded-full w-10' src={empleado1} alt=''></Image></div>
                    <span>Juan</span>
                  </div>
                </td>

                <td className='py-2 px-4'>Pérez</td>
                <td className='py-2 px-4'>juan@example.com</td>
                <td className='py-2 px-4'>
                  {/* Aquí puedes agregar botones u otras acciones */}
                  <button className='bg-[#274C5B] text-white p-2 rounded-full'><BiPencil className='left-3 top-4 text-white text-xl 2xl:text-2xl ' /></button>
                  <button className='bg-[#B80808] text-white p-2 ml-5 rounded-full'><FaRegTrashAlt className='left-3 top-4 text-white text-xl 2xl:text-2xl' /></button>
                </td>
              </tr>
              {/* Puedes agregar más filas según necesites */}
            </tbody>
          </table>
        </div>



      </div>
    </div>

  )
}

export default AdministradorPage