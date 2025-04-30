// Ruta API para verificar credenciales de usuario
import { NextResponse } from 'next/server';
// Cambio: Importar ServiceLocator en lugar de DAOLocator
import { ServiceLocator } from '@/services/ServiceLocator';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contraseña son requeridos' }, { status: 400 });
    }

    // Cambio: Usar userService desde ServiceLocator para verificar credenciales
    const user = await ServiceLocator.userService.verifyCredentials(email, password);

    if (user) {
      // Excluir la contraseña del objeto de usuario antes de enviarlo
      const { password: _, ...userWithoutPassword } = user;
      return NextResponse.json(userWithoutPassword);
    } else {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error en la verificación de credenciales:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}