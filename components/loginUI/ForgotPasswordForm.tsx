"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const ForgotPasswordFormComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError('Invalid or missing reset token.');
      // Optionally, redirect if there is no token
      // router.push('/login'); 
    }
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    if (!password || !confirmPassword) {
      setError('Please complete both password fields.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (!token) {
        setError('Reset token not found. Unable to proceed.');
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch('/api/password/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Your password has been successfully reset. You can now log in with your new password.');
        setPassword('');
        setConfirmPassword('');
        // Opcionalmente, redirigir al login después de un momento
        setTimeout(() => router.push('/login'), 3000);
      } else {
        setError(data.message || 'The password could not be reset. The link may have expired or may be invalid..');
      }
    } catch (err) {
      console.error('Error resetting password:', err);
      setError('A network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token && !error) {
    return <div className="text-center p-4">Checking the token...</div>; // O un spinner
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-cyan-900">Set New Password</h2>
        {error && !message && <p className="text-sm text-center text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
        {message && <p className="text-sm text-center text-green-600 bg-green-100 p-3 rounded-md">{message}</p>}
        
        {!message && token && ( // Only display the form if there is no success message and there is a token.
            <form onSubmit={handleSubmit} className="mt-4 space-y-6">
            <div>
                <label htmlFor="password_reset" className="block text-sm font-medium text-gray-700">
                New Password
                </label>
                <input
                id="password_reset"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                />
            </div>

            <div>
                <label htmlFor="confirmPassword_reset" className="block text-sm font-medium text-gray-700">
                Confirm New Password
                </label>
                <input
                id="confirmPassword_reset"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                />
            </div>

            <div>
                <button
                type="submit"
                disabled={isLoading || !token}
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-cyan-700 border border-transparent rounded-md shadow-sm hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50"
                >
                {isLoading ? 'RestoringRestoring...' : 'Reset Password'}
                </button>
            </div>
            </form>
        )}
         <div className="text-center mt-4">
            <button
                onClick={() => router.push('/login')}
                className="text-sm text-cyan-600 hover:text-cyan-500"
            >
                Back to login
            </button>
        </div>
      </div>
    </div>
  );
};

// Necesitas envolver el componente con Suspense si usas useSearchParams directamente en un Client Component
// que no es hijo de una página que ya lo hace.
// Una forma es crear una página que use este componente.
// Ejemplo: app/reset-password/page.tsx
// "use client";
// import ForgotPasswordForm from '@/components/loginUI/ForgotPasswordForm'; // Ajusta la ruta
// import { Suspense } from 'react';
//
// export default function ResetPasswordPage() {
//   return (
//     <Suspense fallback={<div>Cargando...</div>}>
//       <ForgotPasswordForm />
//     </Suspense>
//   );
// }
// O exportar el componente envuelto en Suspense directamente si es más conveniente para tu estructura.

const ForgotPasswordForm = () => {
    return (
        <Suspense fallback={<div className="text-center p-4">Cargando componente...</div>}>
            <ForgotPasswordFormComponent />
        </Suspense>
    )
}

export default ForgotPasswordForm;