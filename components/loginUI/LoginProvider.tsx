'use client';

import { IUser } from '@/entities/IUser';
import { createContext, useContext, useState, ReactNode } from 'react';

type LoginContextType = {
    userSession: IUser | null;
    setUserSession: (user: IUser | null) => void;
};

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({children} : {children: ReactNode})
{
    const [userSession, setUserSession] = useState<IUser | null>(null);

    return (
        <LoginContext.Provider value={{userSession, setUserSession}}>
            {children}
        </LoginContext.Provider>
    );
}

export function useLogin()
{
    const context = useContext(LoginContext);
    if (!context) throw new Error('useLogin may be used outside <LoginProvider>');
    return context;
}