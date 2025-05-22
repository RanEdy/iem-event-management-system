"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'; // Importar useRouter
import { useLogin } from "./LoginProvider";
import { IUser } from "@/entities/IUser";
// Remove direct import of UserService

const LoginForm = () => {
    const { setUserSession } = useLogin();
    const router = useRouter(); // Initialise useRouter
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Status to indicate load

    // Basic function to validate the email format
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    const handleLogin = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        let hasError = false;

        // Clean up previous errors
        setEmailError("");
        setPasswordError("");

        // Validate email field
        if (!email) {
            setEmailError("The email field cannot be empty.");
            hasError = true;
        } else if (!validateEmail(email)) {
            setEmailError("Please enter a valid e-mail address format.");
            hasError = true;
        }

        // Validate password field
        if (!password) {
            setPasswordError("Password field cannot be empty.");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        setIsLoading(true); // Indicate that the operation is in progress
        console.log("Trying to log in with Email: " + email);

        try {
            // Perform the fetch request to the new API route
            const response = await fetch('/api/user/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Success: User authenticated
                const authenticatedUser: IUser = data; // Assuming that the API returns the object IUser
                console.log("Successful login for:", authenticatedUser.email);
                setUserSession(authenticatedUser); // Save session in context
                router.push('/main'); // Redirect to homepage
            } else {
                // Fault: Incorrect credentials or server error
                console.log("Login error:", data.error || 'Unknown error');
                setEmailError(data.error || "Incorrect e-mail address or password.");
                // If the error is specific to credentials, check both fields
                if (response.status === 401) {
                    setPasswordError(" "); // Mark both fields as related to the error
                } else {
                    // For other errors (e.g., 400, 500), only show in the email field
                    setPasswordError("");
                }
            }

        } catch (error) {
            console.error("Error in login call:", error);
            setEmailError("An unexpected error occurred while trying to log in.."); // Generic error
        } finally {
             setIsLoading(false); // End state of charge
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
                            // Clear typing error
                            if (emailError) setEmailError("");
                            // Clear password error if marked as general API error
                            if (passwordError === " ") setPasswordError("");
                        }}
                        placeholder="EMAIL"
                        // Highlight border if there is an error
                        className={`border-2 ${emailError ? 'border-red-500' : 'border-gray-300'} w-full p-2 mt-6 placeholder-gray-400 rounded-md`}
                        aria-invalid={!!emailError} // For accessibility
                        aria-describedby="email-error"
                    />
                    {/* Show error message for email */}
                    {emailError && <p id="email-error" className="text-red-500 text-xs mt-1">{emailError}</p>}


                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            // Clear typing error
                            if (passwordError) setPasswordError("");
                            // **CORRECTION 2:** Removed the line causing the scope error
                        }}
                        placeholder="PASSWORD"
                        // Highlight border if there is an error
                        className={`border-2 ${passwordError && passwordError !== " " ? 'border-red-500' : 'border-gray-300'} w-full p-2 mt-6 placeholder-gray-400 rounded-md`}
                        aria-invalid={!!passwordError && passwordError !== " "} // For accessibility
                        aria-describedby="password-error"
                    />
                    {/* Show error message for password */}
                    {/* Avoid displaying the space used to clear the email error */}
                    {passwordError && passwordError !== " " && <p id="password-error" className="text-red-500 text-xs mt-1">{passwordError}</p>}

                    {/* Forgot password link */}
                    <div className="text-sm text-right mt-4">
                        <button
                            type="button" // Important: type="button" to prevent form submission
                            onClick={() => router.push('/forgot-password')} // Assuming '/forgot-password' is the route for TrancitionForm
                            className="font-medium text-cyan-600 hover:text-cyan-500"
                        >
                            Forgot your password?
                        </button>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="h-10 w-full p-2 mt-6 rounded-md bg-cyan-900 text-white font-extrabold hover:bg-cyan-800 transition-colors duration-200 disabled:opacity-50"
                        disabled={isLoading} // Disable button during charging
                    >
                        {isLoading ? 'INGRESANDO...' : 'LOGIN'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;