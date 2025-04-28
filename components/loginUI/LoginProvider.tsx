'use client';

import { IUser } from '@/entities/IUser';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'; // Añadir useEffect

// 1. Añadir isLoading al tipo
type LoginContextType = {
    userSession: IUser | null;
    setUserSession: (user: IUser | null) => void;
    isLoading: boolean; // <-- Añadido
};

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({children} : {children: ReactNode})
{
    const [userSession, setUserSession] = useState<IUser | null>(null);
    // 2. Añadir estado para isLoading, inicializar en true
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Opcional: Simular carga inicial o verificar sesión almacenada
    useEffect(() => {
        // Aquí podrías verificar si hay una sesión guardada (ej. en localStorage)
        // Por ahora, simplemente marcamos la carga como finalizada después de un breve instante
        // En una app real, aquí harías una llamada a tu backend para validar un token, etc.
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // Simula 0.5 segundos de carga inicial

        return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }, []);


    // 3. Incluir isLoading en el valor del Provider
    return (
        <LoginContext.Provider value={{userSession, setUserSession, isLoading}}>
            {children}
        </LoginContext.Provider>
    );
}

export function useLogin()
{
    const context = useContext(LoginContext);
    if (!context) throw new Error('useLogin must be used within a LoginProvider'); // Corregido mensaje de error
    return context;
}