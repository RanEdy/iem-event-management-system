'use client';

import { IUser } from '@/entities/IUser';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'; // Add useEffect

// Añadir isLoading al tipo
type LoginContextType = {
    userSession: IUser | null;
    setUserSession: (user: IUser | null) => void;
    isLoading: boolean; // <-- Added
};

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({children} : {children: ReactNode})
{
    const [userSession, setUserSession] = useState<IUser | null>(null);
    // Add status for isLoading, initialise to true
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Optional: Simulate initial load or check stored session
    useEffect(() => {
        // Here you could check if there is a saved session (e.g. in localStorage).
        // For now, we simply mark the upload as finished after a short moment.
        // In a real app, here you would make a call to your backend to validate a token, etc.
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // Simulates 0.5 second initial charge

        return () => clearTimeout(timer); // Clean the timer if the component is disassembled.
    }, []);


    // Include isLoading in the Provider value
    return (
        <LoginContext.Provider value={{userSession, setUserSession, isLoading}}>
            {children}
        </LoginContext.Provider>
    );
}

export function useLogin()
{
    const context = useContext(LoginContext);
    if (!context) throw new Error('useLogin must be used within a LoginProvider'); // Fixed error message
    return context;
}