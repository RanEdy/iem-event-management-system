
"use client";

import { useState } from "react";
import { useLogin } from "./LoginProvider";
import { IUser } from "@/entities/IUser"; // Asegúrate de que la importación sea correcta
import { UserLevel } from "@/entities/UserLevel"; // <-- Importa el enum UserLevel

const LoginForm = () => {
    const { setUserSession } = useLogin()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("") // Estado para el error del email
    const [passwordError, setPasswordError] = useState("") // Estado para el error de la contraseña

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

        // Si hay errores de validación local, no continuar
        if (hasError) {
            return;
        }

        console.log("Intentando iniciar sesión con Email: " + email);
        // Aquí es donde harías la llamada a tu API/backend para verificar las credenciales
        try {
            // const response = await fetch('/api/login', { /* ... */ }); // Llamada real a la API
            // Simulación: Suponemos que la API responde después de 1 segundo
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulación de respuesta de la API
            // Cambia esto para simular éxito o error desde el backend
            const simulatedApiSuccess = false; // Cambia a true para simular éxito
            const simulatedApiError = "Correo electrónico o contraseña incorrectos."; // Mensaje si simulatedApiSuccess es false


            if (simulatedApiSuccess) {
                // Si la API confirma que las credenciales son correctas:
                console.log("Inicio de sesión exitoso (simulado)");
                // const userData = await response.json(); // Obtener datos del usuario de la respuesta real

                // **CORRECCIÓN 1:** Asegúrate de que este objeto coincida con tu interfaz IUser
                // y usa una aserción de tipo si estás seguro de la estructura.
                // **CORRECCIÓN:** Ajusta los tipos de id y level
                const simulatedUserData: IUser = {
                     id: 1, // Cambiado a number
                     name: "Usuario Ejemplo",
                     email: email,
                     level: UserLevel.ADMIN, // Cambiado para usar el enum UserLevel
                     // Asegúrate de que todos los demás campos requeridos por IUser estén presentes
                     // y tengan los tipos correctos. Basado en IUser.ts, faltan varios campos.
                     // Por ejemplo (necesitarás valores reales o simulados):
                     password: "simulated_password", // IUser requiere password
                     birthday: new Date(), // IUser requiere birthday
                     hireDate: new Date(), // IUser requiere hireDate
                     phone: "123-456-7890", // IUser requiere phone
                     active: true, // IUser requiere active
                     guardCard: false, // IUser requiere guardCard
                     supervisorCount: 0, // IUser requiere supervisorCount
                     managerCount: 0, // IUser requiere managerCount
                     logisticCount: 0, // IUser requiere logisticCount
                     driverCount: 0, // IUser requiere driverCount
                     dispatchCount: 0, // IUser requiere dispatchCount
                     assistantManagerCount: 0, // IUser requiere assistantManagerCount
                     contactName: "Contacto Emergencia", // IUser requiere contactName (puede ser null/undefined si es opcional)
                     contactPhone: "987-654-3210", // IUser requiere contactPhone (puede ser null/undefined si es opcional)
                     eventUserlist: [] // IUser requiere eventUserlist
                };
                // Actualizar el estado global de la sesión a través del context
                setUserSession(simulatedUserData);
                // Aquí podrías redirigir al usuario, por ejemplo: router.push('/dashboard');
            } else {
                // Si la API indica que las credenciales son incorrectas o hay otro error:
                console.log("Error de inicio de sesión desde API (simulado)");
                setEmailError(simulatedApiError);
                setPasswordError(" "); // Puedes poner un espacio o repetir el error para indicar que ambos campos están relacionados con el fallo
            }

        } catch (error) {
            console.error("Error en la llamada de login:", error);
            setEmailError("Ocurrió un error inesperado al intentar iniciar sesión."); // Error genérico de red/fetch
        }
    }

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
                    <button type="submit" className="h-10 w-full p-2 mt-6 rounded-md bg-cyan-900 text-white font-extrabold hover:bg-cyan-800 transition-colors duration-200">
                        LOGIN
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;