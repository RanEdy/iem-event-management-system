"use client";

import React from "react"

type NavbarButtonProps =
    {
        icon: string
        name: string
    }


export const NavbarButton: React.FC<NavbarButtonProps> = ({ name, icon }) => {
    return (
        <div className="flex flex-col hover:bg-white hover:bg-opacity-10">
            {/* Focus Icon */}
            <div className="h-12 border-2 border-black active:bg-white">

            </div>

            {/* Icon + Name */}
            <div className="min-w-56 h-full items-center flex flex-row border-2 border-purple-700">
                <div className="h-full min-w-16 mr-8 border-2 border-blue-700">
                    <img className="w-4/5 h-4/5" src={icon}/>
                </div>
                <div className="text-white font-extrabold text-2xl">
                    {name}
                </div>
            </div>
        </div>
    )
}