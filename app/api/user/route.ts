// Ruta API para gestionar usuarios (GET todos, POST crear)
import { NextResponse } from 'next/server';
import { ServiceLocator } from '@/services/ServiceLocator';
import { DAOLocator } from '@/persistence/DAOLocator'; // Mantenido temporalmente para findByEmail si el servicio no lo expone
import { IUser } from '@/entities/IUser';

// GET: Obtener todos los usuarios
export async function GET() {
  try {
    // Cambio: Usar userService desde ServiceLocator
    const users = await ServiceLocator.userService.findAll();
    // Excluir contraseñas antes de enviar (lógica mantenida)
    const usersWithoutPassword = users.map(user => {
      const { password, ...userWithoutPass } = user;
      return userWithoutPass;
    });
    return NextResponse.json(usersWithoutPassword);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    // Respuesta de error consistente
    return NextResponse.json({ success: false, error: 'Error interno del servidor al obtener usuarios' }, { status: 500 });
  }
}

// POST: Crear un nuevo usuario
export async function POST(request: Request) {
  try {
    const userData: Omit<IUser, 'id'> = await request.json();

    // Validación básica (mantenida)
    if (!userData.email || !userData.password || !userData.name || !userData.level) {
      return NextResponse.json({ success: false, error: 'Faltan campos requeridos para crear el usuario' }, { status: 400 });
    }

    // Verificar si el email ya existe (usando DAO directamente si el servicio no lo ofrece)
    // Idealmente, esto podría estar en el servicio.
    const existingUser = await DAOLocator.userDao.findByEmail(userData.email);
    if (existingUser) {
        return NextResponse.json({ success: false, error: 'El correo electrónico ya está registrado' }, { status: 409 }); // 409 Conflict
    }

    // Cambio: Usar userService desde ServiceLocator para crear
    const success = await ServiceLocator.userService.create(userData);

    // Cambio: Devolver { success: boolean } como en event/route.ts
    if (success) {
        // No devolvemos el usuario, solo la confirmación. Status 201 indica creación exitosa.
        return NextResponse.json({ success: true }, { status: 201 });
    } else {
        // Si el servicio devuelve false, indica un fallo en la creación.
        return NextResponse.json({ success: false, error: 'No se pudo crear el usuario' }, { status: 500 }); // O un código más específico si se conoce la causa
    }

  } catch (error) {
    console.error('Error al crear usuario:', error);
    // Respuesta de error consistente
    return NextResponse.json({ success: false, error: 'Error interno del servidor al crear usuario' }, { status: 500 });
  }
}