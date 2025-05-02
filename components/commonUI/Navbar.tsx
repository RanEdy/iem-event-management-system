"use client";

import React from 'react';
import { UserLevel } from '@prisma/client';
import { NavbarButton } from './NavbarButton';
import { FaUserFriends, FaFolderOpen, FaClipboardList, FaUser } from "react-icons/fa";
import { useNavigation } from '@/contexts/NavigationContext';

type NavbarProps = {
    level: UserLevel;
    options: string[];
}


const Navbar: React.FC<NavbarProps> = ({level, options}) => 
{
    const { currentPage, setCurrentPage } = useNavigation();
    
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
                <NavbarButton 
                    name={"Users"} 
                    icon={<FaUserFriends className="text-white h-3/4 w-3/4"/>}
                />
                <NavbarButton 
                    name={"Archives"} 
                    icon={<FaFolderOpen className="text-white h-3/4 w-3/4"/>}
                    onClick={() => setCurrentPage("Archives")}
                />
                {
                    level == UserLevel.MASTER ? <>

                    </> : null
                }

                {
                    level == UserLevel.ADMIN ? <>

                    </> : null
                }

                {
                    level == UserLevel.STAFF ? <>

                    </> : null
                }
            </div>

            {/* User Info */}
            <div className="flex flex-shrink-0">
                <div className="flex w-16 h-16 bg-bluedark-gradient-r justify-center rounded-full">
                    <FaUser className="w-3/5 h-3/5 text-white self-center"/>
                </div>
            </div>
        </div>
    );
}

export default Navbar;