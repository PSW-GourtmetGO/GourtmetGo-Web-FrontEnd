"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "../../public/imagenes/LogoSideBarSF.svg";
import {
  RiClipboardLine,
  RiHome3Line,
  RiLogoutBoxRLine,
  RiShoppingCartLine,
  RiUserLine,
  RiUserSettingsLine,
} from "react-icons/ri";
import Link from "next/link";

const enlaces = [
  {
    name: "dashboard",
    link: "/dashboard",
    icon: <RiHome3Line className="text-xl" />,
  },
  {
    name: "menu",
    link: "/dashboard/menu",
    icon: <RiClipboardLine className="text-xl" />,
  },
  {
    name: "pagos",
    link: "/dashboard/pagos",
    icon: <RiShoppingCartLine className="text-xl" />,
  },
  {
    name: "administrador",
    link: "/dashboard/administrador",
    icon: <RiUserSettingsLine className="text-xl" />,
  },
  {
    name: "perfil",
    link: "/dashboard/perfil",
    icon: <RiUserLine className="text-xl" />,
  },
];

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
                    {linkItem.icon}
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
      <div className="px-[10%] py-[5%]">{children}</div>
    </>
  );
}
