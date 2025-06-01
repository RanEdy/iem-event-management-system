"use client";

import React from 'react';
import { UserLevel } from '@prisma/client';
import { NavbarButton } from './NavbarButton';
// Importa los iconos que necesites, por ejemplo:
import { FaUserFriends, FaFolderOpen, FaClipboardList, FaUser, FaUserShield, FaUserCog } from "react-icons/fa";
import { IoLayers } from "react-icons/io5";
import { useNavigation } from '@/contexts/NavigationContext';
import { useLogin } from '../loginUI/LoginProvider';

type NavbarProps = {
    level: UserLevel; // Esta prop 'level' parece ser del componente Navbar en sí, no necesariamente del usuario en sesión.
                     // Nos basaremos en userSession.level para el icono del usuario.
    options: string[];
}


const Navbar: React.FC<NavbarProps> = ({level, options}) => 
{
    const { currentPage, setCurrentPage } = useNavigation();
    const { userSession } = useLogin(); 
    
    const renderUserIcon = () => {
        if (!userSession) {
            return <FaUser className="w-3/5 h-3/5 text-white self-center"/>; // Icono por defecto si no hay sesión
        }

        switch (userSession.level) {
            case UserLevel.MASTER:
                return <FaUserCog className="w-3/5 h-3/5 text-white self-center"/>; // Ejemplo para MASTER
            case UserLevel.ADMIN:
                return <FaUserShield className="w-3/5 h-3/5 text-white self-center"/>; // Ejemplo para ADMIN
            case UserLevel.STAFF:
                return <FaUser className="w-3/5 h-3/5 text-white self-center"/>; // Ejemplo para STAFF
            default:
                return <FaUser className="w-3/5 h-3/5 text-white self-center"/>; // Icono por defecto
        }
    };
    
    return (
        <div className="flex h-32 w-full p-6 m-0 shadow-lg shadow-gray-700 items-center justify-between bg-bluedark-gradient-r">
            {/* Logo Img */}
            <div className="flex-shrink-0">
                <img className="h-30 w-48" src="/img/iem_icon_white.png"/>
            </div>

            {/* Option Buttons */}
            <div className="h-full w-auto flex flex-row justify-between flex-shrink-0">
                <NavbarButton 
                    name={"Events"} 
                    icon={<FaClipboardList className="text-white h-3/4 w-3/4"/>}
                    onClick={() => setCurrentPage("Events")}
                />
                {(userSession?.level === UserLevel.MASTER || userSession?.level === UserLevel.ADMIN) && (
                    <>
                        <NavbarButton 
                            name={"Users"} 
                            icon={<FaUserFriends className="text-white h-3/4 w-3/4"/>}
                            onClick={() => setCurrentPage("Users")}
                        />
                        <NavbarButton 
                            name={"Archives"} 
                            icon={<FaFolderOpen className="text-white h-3/4 w-3/4"/>}
                            onClick={() => setCurrentPage("Archives")}
                        />
                    </>
                )}
                {(userSession?.level === UserLevel.STAFF) && (
                    <>
                        <NavbarButton 
                            name={"Request Status"} 
                            icon={<IoLayers  className="text-white h-3/4 w-3/4"/>}
                            onClick={() => setCurrentPage("Request")}
                        />
                    </>
                )}
                
            </div>

            {/* User Info */}
            <div className="flex flex-shrink-0 items-center"> 
                {userSession && ( 
                    <span className="text-white font-semibold mr-4">{userSession.name}</span> 
                )}
                <div className="flex w-16 h-16 bg-bluedark-gradient-r justify-center rounded-full">
                    {renderUserIcon()} {/* Llama a la función para renderizar el icono */}
                </div>
            </div>
        </div>
    );
}

export default Navbar;