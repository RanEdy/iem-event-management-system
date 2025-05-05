"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context
type NavigationContextType = {
    currentPage: string;
    setCurrentPage: (page: string) => void;
};

// Create the context with default values
export const NavigationContext = createContext<NavigationContextType>({
    currentPage: "Events",
    setCurrentPage: () => {}
});

// Customised Hook to use the context
export const useNavigation = () => useContext(NavigationContext);

// Context provider
export const NavigationProvider = ({ children }: { children: ReactNode }) => {
    const [currentPage, setCurrentPage] = useState("Events");

    return (
        <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </NavigationContext.Provider>
    );
};