"use client"; // Necesario para usar hooks

import { useLogin } from "@/components/loginUI/LoginProvider";
import { UserLevel } from "@/entities/UserLevel"; // Importar UserLevel para obtener el nombre del enum
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MainPage()
{
    const { userSession, isLoading } = useLogin();
    const router = useRouter();

    // Redirigir si no hay sesión y no está cargando
    useEffect(() => {
        if (!isLoading && !userSession) {
            router.push('/login');
        }
    }, [userSession, isLoading, router]);

    // Mostrar estado de carga o mensaje si no hay sesión aún
    if (isLoading || !userSession) {
        return (
            <div className="h-full w-full flex justify-center items-center">
                <p>Cargando...</p>
            </div>
        );
    }

    // Obtener el nombre del nivel de usuario
    const userLevelName = UserLevel[userSession.level];

    return (
        <div className="h-full w-full flex flex-col justify-center items-center text-center p-5">
            <h1 className="text-3xl font-bold mb-4">¡Bienvenido, {userSession.name}!</h1>
            <p className="text-xl">Tu nivel de acceso es: <span className="font-semibold">{userLevelName}</span></p>
            {/* Aquí puedes añadir más contenido específico de la página principal */}
        </div>
    )
}