"use client";

import React from "react"

type NavbarButtonProps =
    {
        icon: string
        name: string
    }


export const NavbarButton: React.FC<NavbarButtonProps> = ({ name, icon }) => {
    return (
        <div className="flex flex-col">
            {/* Focus Icon */}
            <div className="h-12 active:bg-white">

            </div>

            {/* Icon + Name */}
            <div className="min-w-56 h-full items-center p-2 mx-4 rounded-md flex flex-row hover:bg-white hover:bg-opacity-10">
                <div className="h-full min-w-16 mr-8">
                    <img className="w-4/5 h-4/5" src={icon}/>
                </div>
                <div className="text-white font-extrabold text-2xl">
                    {name}
                </div>
            </div>
        </div>
    )
}