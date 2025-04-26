"use client";

import React from 'react';
import { UserLevel } from '@/entities/UserLevel';
import { NavbarButton } from './NavbarButton';

type NavbarProps = {
    level: UserLevel;
    options: string[];
}


const Navbar: React.FC<NavbarProps> = ({level, options}) => 
{
    let selected: number = -1;
    return (
        <div className="h-32 w-full p-6 mx-auto shadow-lg shadow-gray-700 flex items-center justify-between bg-bluedark-gradient-r">
            {/* Logo Img */}
            <div className="flex-shrink-0 border-red-600 border-2">
                <img className="h-30 w-48" src="/img/iem_icon_white.png"/>
            </div>

            {/* Option Buttons */}
            <div className="h-full w-auto flex flex-row justify-between flex-shrink-0 border-red-600 border-2">
                <NavbarButton name={"Events"} icon={"/img/iem_icon_white.png"}/>
                <NavbarButton name={"Users"} icon={"/img/iem_icon_white.png"}/>
                <NavbarButton name={"Archives"} icon={"/img/iem_icon_white.png"}/>
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
            <div className="flex-shrink-0 border-red-600 border-2">
                <h1>User Info</h1>
            </div>

        </div>
    );
}

export default Navbar;