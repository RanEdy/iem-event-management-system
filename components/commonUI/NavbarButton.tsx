"use client";

import React, { ReactNode } from "react"

type NavbarButtonProps =
    {
        icon: ReactNode
        name: string
        onClick?: () => void
    }


export const NavbarButton: React.FC<NavbarButtonProps> = ({ name, icon, onClick }) => {
    // Event handler that checks if onClick exists before calling it
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <button className="flex flex-col" onClick={handleClick}>
            {/* Focus Icon */}
            <div className="h-12 active:bg-white">

            </div>

            {/* Icon + Name */}
            <div className="min-w-56 h-full items-center align-middle pt-2 px-2 mx-4 rounded-md flex flex-row hover:bg-white hover:bg-opacity-10">
                <div className="h-full min-w-16 mr-2">
                    {icon}
                </div>
                <div className="text-white font-extrabold text-2xl">
                    {name}
                </div>
            </div>
        </button>
    )
}