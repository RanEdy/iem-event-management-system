
"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'; // Importar useRouter
import { useLogin } from "./LoginProvider";
import { IUser } from "@/entities/IUser";
// Eliminar la importación directa de UserService
// import { UserService } from "@/services/UserService"; // Esta línea ya estaba comentada, pero la elimino para limpieza

const LoginForm = () => {
    const { setUserSession } = useLogin();
    const router = useRouter(); // Inicializar useRouter
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Estado para indicar carga

    // Función básica para validar el formato del email
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    const handleLogin = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        let hasError = false;

        // Limpiar errores previos
        setEmailError("");
        setPasswordError("");

        // Validar campo de email
        if (!email) {
            setEmailError("El campo de correo electrónico no puede estar vacío.");
            hasError = true;
        } else if (!validateEmail(email)) {
            setEmailError("Por favor, introduce un formato de correo electrónico válido.");
            hasError = true;
        }

        // Validar campo de contraseña
        if (!password) {
            setPasswordError("El campo de contraseña no puede estar vacío.");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        setIsLoading(true); // Indicar que la operación está en curso
        console.log("Intentando iniciar sesión con Email: " + email);

        try {
            // Realizar la petición fetch a la nueva API route
            const response = await fetch('/api/user/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Éxito: Usuario autenticado
                const authenticatedUser: IUser = data; // Asumiendo que la API devuelve el objeto IUser
                console.log("Inicio de sesión exitoso para:", authenticatedUser.email);
                setUserSession(authenticatedUser); // Guardar sesión en el contexto
                router.push('/main'); // Redirigir a la página principal
            } else {
                // Fallo: Credenciales incorrectas o error del servidor
                console.log("Error de inicio de sesión:", data.error || 'Error desconocido');
                setEmailError(data.error || "Correo electrónico o contraseña incorrectos.");
                // Si el error es específico de credenciales, marcar ambos campos
                if (response.status === 401) {
                    setPasswordError(" "); // Marcar ambos campos como relacionados al error
                } else {
                    // Para otros errores (e.g., 400, 500), solo mostrar en el campo de email
                    setPasswordError("");
                }
            }

        } catch (error) {
            console.error("Error en la llamada de login:", error);
            setEmailError("Ocurrió un error inesperado al intentar iniciar sesión."); // Error genérico
        } finally {
             setIsLoading(false); // Finalizar estado de carga
        }
    };

    return (
        <div className="p-6 h-full w-full">
            {/* Header Title */}
            <div className="mb-12 justify-self-center">
                <div className="text-cyan-900 text-center text-5xl font-extrabold justify-self-center">
                    WELCOME!
                </div>
                <div className="mb-4 text-cyan-950 text-center text-xl font-bold justify-self-center">
                    Please sign in your account
                </div>
                <hr />
            </div>
            <div className="justify-between">
                {/* Usar onSubmit en el form para manejar Enter y el click del botón */}
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            // Limpiar error al escribir
                            if (emailError) setEmailError("");
                            // Limpiar el error de contraseña si estaba marcado como error de API general
                            if (passwordError === " ") setPasswordError("");
                        }}
                        placeholder="EMAIL"
                        // Resaltar borde si hay error
                        className={`border-2 ${emailError ? 'border-red-500' : 'border-gray-300'} w-full p-2 mt-6 placeholder-gray-400 rounded-md`}
                        aria-invalid={!!emailError} // Para accesibilidad
                        aria-describedby="email-error"
                    />
                    {/* Mostrar mensaje de error para el email */}
                    {emailError && <p id="email-error" className="text-red-500 text-xs mt-1">{emailError}</p>}


                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            // Limpiar error al escribir
                            if (passwordError) setPasswordError("");
                            // **CORRECCIÓN 2:** Eliminada la línea que causaba el error de ámbito
                            // if (emailError === simulatedApiError) setEmailError("");
                        }}
                        placeholder="PASSWORD"
                        // Resaltar borde si hay error
                        className={`border-2 ${passwordError && passwordError !== " " ? 'border-red-500' : 'border-gray-300'} w-full p-2 mt-6 placeholder-gray-400 rounded-md`}
                        aria-invalid={!!passwordError && passwordError !== " "} // Para accesibilidad
                        aria-describedby="password-error"
                    />
                    {/* Mostrar mensaje de error para la contraseña */}
                    {/* Evitar mostrar el espacio usado para limpiar el error de email */}
                    {passwordError && passwordError !== " " && <p id="password-error" className="text-red-500 text-xs mt-1">{passwordError}</p>}

                    {/* Botón tipo submit */}
                    <button
                        type="submit"
                        className="h-10 w-full p-2 mt-6 rounded-md bg-cyan-900 text-white font-extrabold hover:bg-cyan-800 transition-colors duration-200 disabled:opacity-50"
                        disabled={isLoading} // Deshabilitar botón durante la carga
                    >
                        {isLoading ? 'INGRESANDO...' : 'LOGIN'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;