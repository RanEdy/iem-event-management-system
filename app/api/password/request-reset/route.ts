import { NextResponse } from 'next/server';
import { ServiceLocator } from '@/services/ServiceLocator';
import { DAOLocator } from '@/persistence/DAOLocator'; // Añadir esta importación
// Asumiremos que tienes un método en UserService para manejar la solicitud de restablecimiento.
// Deberás crear este método. Ejemplo: requestPasswordReset(email: string): Promise<boolean>

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'El correo electrónico es obligatorio.' }, { status: 400 });
    }

    // Lógica para encontrar al usuario y generar un token de restablecimiento
    // Esto es un placeholder, necesitarás implementar la lógica real.
    // Por ejemplo, usando el UserService:
    const userExists = await DAOLocator.userDao.findByEmail(email);
    if (!userExists) {
      // Incluso si el usuario no existe, es una buena práctica de seguridad
      // devolver un mensaje genérico para no revelar si un email está registrado.
      console.log(`Email no encontrado en la base de datos: ${email}`);
      return NextResponse.json({ message: 'Si tu correo electrónico está registrado, recibirás un enlace para restablecer tu contraseña en breve.' });
    }

    // const token = await ServiceLocator.userService.generatePasswordResetToken(userExists.id);
    // await ServiceLocator.emailService.sendPasswordResetEmail(email, token); // Necesitarás un servicio de email

    console.log(`Solicitud de restablecimiento de contraseña para: ${email}`);
    // Simulación de éxito
    // Aquí deberías llamar a tu servicio para generar el token y enviar el correo.
    // Por ahora, simplemente devolvemos un mensaje de éxito genérico.
    // Asegúrate de que tu UserService tenga un método como `requestPasswordReset`
    // y que maneje la lógica de encontrar al usuario, generar el token, guardarlo y enviar el email.

    // Ejemplo de cómo podría ser (necesitarás implementar esta lógica en tu UserService):
    const success = await ServiceLocator.userService.requestPasswordReset(email);

    if (success) {
      return NextResponse.json({ message: 'Si tu correo electrónico está registrado, recibirás un enlace para restablecer tu contraseña en breve.' });
    } else {
      // Aunque el servicio falle internamente (ej. no se pudo enviar el email),
      // por seguridad, podrías querer seguir mostrando un mensaje genérico al cliente.
      // O, si es un error que el cliente debe conocer (ej. formato de email inválido ya manejado), puedes ser más específico.
      // Para este caso, si `requestPasswordReset` devuelve false por no encontrar el email,
      // el mensaje genérico sigue siendo apropiado.
      return NextResponse.json({ message: 'Si tu correo electrónico está registrado, recibirás un enlace para restablecer tu contraseña en breve.' });
      // Si quieres ser más específico sobre un error del servidor:
      // return NextResponse.json({ message: 'Ocurrió un error al procesar tu solicitud.' }, { status: 500 });
    }

  } catch (error) {
    console.error('Error en /api/password/request-reset:', error);
    return NextResponse.json({ message: 'Ocurrió un error en el servidor. Por favor, inténtalo de nuevo.' }, { status: 500 });
  }
}