import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/imagenes/logo.svg";

interface Propiedades {
  abrirNav: () => void;
}
const Nav = ({ abrirNav }: Propiedades) => {
  return (
    <div className="h-[12vh] bg-white">
      <div className="  sm:w-full px-10  mx-auto flex  items-center justify-between bg-[#274C5B] text-white  fixed z-10">
        {/* DIV PARA EL LOGO */}
        <div className="flex items-center space-x-2">
          <Image className="object-contain h-16 w-auto " src={Logo} alt="" />
        </div>
        {/* DIV NAVEGACION DEL NAV */}
        <ul className="hidden lg:flex items-center space-x-10 ">
          <li className="text-[20px] font-medium hover:text-[#DEE5E1]">
            <Link href="/#inicio">Inicio</Link>
          </li>
          <li className="text-[20px] font-medium hover:text-[#DEE5E1]">
            <Link href="/#planes">Planes</Link>
          </li>
          <li className="text-[20px] font-medium hover:text-[#DEE5E1]">
            <Link href="/#clientes">Clientes</Link>
          </li>
          <li className="text-[20px] font-medium hover:text-[#DEE5E1]">
            <Link href="/#contactanos">Contactanos</Link>
          </li>
          <li className="text-[20px] text-[#7EB693] font-medium hover:text-[#679377]">
            <Link href="/login">Iniciar Sesión</Link>
          </li>
          <li className="text-[20px] font-medium">
            <Link href="/registro">
              <div className=" px-6 py-2 bg-[#7EB693] rounded-md transition-all duration-300 hover:bg-[#96BCA5] sm:px-8 sm:py-3">
                Registrarse
              </div>
            </Link>
          </li>
        </ul>
        {/* Boton de menu */}
        <div className="flex lg:hidden">
          {/* <HiBars3BottomRight
            onClick={abrirNav}
            className=" w-[2rem] h-[2rem] "
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Nav;
