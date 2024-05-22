"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../../public/imagenes/LogoSideBarSF.svg";
import { IconType } from 'react-icons';

import {
  RiClipboardLine,
  RiHome3Line,
  RiLogoutBoxRLine,
  RiShoppingCartLine,
  RiUserLine,
  RiUserSettingsLine,
} from "react-icons/ri";
import Link from "next/link";

interface Rutas {
  name: string;
  link: string;
  icono: IconType;
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [moduloSeleccionado, setmoduloSeleccionado] = useState(() => {
    const moduloAlmacenado = localStorage.getItem("moduloSeleccionado");
    return moduloAlmacenado || "/dashboard";
  });

  const seleccionarModulo = (name: string) => {
    setmoduloSeleccionado(name);
    localStorage.setItem("moduloSeleccionado", name);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("moduloSeleccionado");
  };

  const [enlaces, setEnlaces] = useState<Rutas[]>([]);

useEffect(() => {
    if (localStorage.getItem('rolID') === '1') {
      setEnlaces([{
        name: "dashboard",
        link: "/dashboard",
        icono: RiHome3Line,
      },
      {
        name: "menu",
        link: "/dashboard/menu",
        icono: RiClipboardLine,
      },
      {
        name: "pagos",
        link: "/dashboard/pagos",
        icono: RiShoppingCartLine,
      },
      {
        name: "administrador",
        link: "/dashboard/administrador",
        icono: RiUserSettingsLine,
      },
      {
        name: "perfil",
        link: "/dashboard/perfil",
        icono: RiUserLine,
      },])
    }else if (localStorage.getItem('rolID') === '2'){
      setEnlaces([{
        name: "dashboard",
        link: "/dashboard",
        icono: RiHome3Line,
      }])
    }else{
        window.location.href = '/';
    }
}, []);

  return (
    <>
      <div
        className={`bg-[#274C5B] fixed lg:left-0 w-28 h-full flex flex-col justify-between py-6 rounded-tr-2xl z-50 transition-all `}
      >
        <div>
          <ul className="pl-4">
            {/* Logo */}
            <li>
              <div className="flex justify-center items-center p-4 mb-5">
                <Image
                  src={Logo}
                  alt=""
                  className="w-auto bg-[#5e7883] rounded-lg"
                />
              </div>
            </li>
            {/* Secciones */}
            {enlaces.map((linkItem, index) => (
              <Link href={linkItem.link} key={index} passHref>
                <li
                  className={`p-4 rounded-tl-xl rounded-bl-xl hover:bg-[#F9F8F8] text-white group transition-colors ${
                    moduloSeleccionado === linkItem.link ? "bg-[#F9F8F8]" : ""
                  }`}
                  onClick={() => seleccionarModulo(linkItem.link)}
                >
                  <div
                    className={`p-4 flex justify-center rounded-xl group-hover:text-[#5cb793] transition-colors ${
                      moduloSeleccionado === linkItem.link
                        ? "text-[#5cb793]"
                        : ""
                    }`}
                  >
                    {linkItem.icono({ className: "text-xl" })}
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        {/* Cerrar Sesión */}
        <div>
          <ul className="pl-4">
            <li className="p-4 rounded-tl-xl rounded-bl-xl  group transition-colors">
              <a
                className="group-hover:bg-white  p-4 flex justify-center rounded-xl text-white
             group-hover:text-[#5cb793] transition-colors "
                href="/"
                onClick={cerrarSesion}
              >
                <RiLogoutBoxRLine className="text-xl "></RiLogoutBoxRLine>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="pl-[10%] pt-[4%]">{children}</div>
    </>
  );
}
