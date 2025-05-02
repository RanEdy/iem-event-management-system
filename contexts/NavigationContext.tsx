"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Definir el tipo para el contexto
type NavigationContextType = {
    currentPage: string;
    setCurrentPage: (page: string) => void;
};

// Crear el contexto con valores por defecto
export const NavigationContext = createContext<NavigationContextType>({
    currentPage: "Events",
    setCurrentPage: () => {}
});

// Hook personalizado para usar el contexto
export const useNavigation = () => useContext(NavigationContext);

// Proveedor del contexto
export const NavigationProvider = ({ children }: { children: ReactNode }) => {
    const [currentPage, setCurrentPage] = useState("Events");

    return (
        <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </NavigationContext.Provider>
    );
};