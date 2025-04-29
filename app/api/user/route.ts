// Ruta API para gestionar usuarios (GET todos, POST crear)
import { NextResponse } from 'next/server';
import { DAOLocator } from '@/persistence/DAOLocator';
import { IUser } from '@/entities/IUser';

// GET: Obtener todos los usuarios
export async function GET() {
  try {
    const userDao = DAOLocator.userDao;
    const users = await userDao.findAll();
    // Excluir contraseñas antes de enviar
    const usersWithoutPassword = users.map(user => {
      const { password, ...userWithoutPass } = user;
      return userWithoutPass;
    });
    return NextResponse.json(usersWithoutPassword);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return NextResponse.json({ error: 'Error interno del servidor al obtener usuarios' }, { status: 500 });
  }
}

// POST: Crear un nuevo usuario
export async function POST(request: Request) {
  try {
    const userData: Omit<IUser, 'id'> = await request.json();

    // Validación básica (se puede expandir)
    if (!userData.email || !userData.password || !userData.name || !userData.level) {
      return NextResponse.json({ error: 'Faltan campos requeridos para crear el usuario' }, { status: 400 });
    }

    const userDao = DAOLocator.userDao;
    // Verificar si el email ya existe
    const existingUser = await userDao.findByEmail(userData.email);
    if (existingUser) {
        return NextResponse.json({ error: 'El correo electrónico ya está registrado' }, { status: 409 }); // 409 Conflict
    }

    // Crear usuario (la DAO debería manejar el hash de la contraseña si es necesario)
    const newUser = await userDao.create(userData);

    // Excluir contraseña antes de devolver
    const { password, ...userWithoutPassword } = newUser;

    return NextResponse.json(userWithoutPassword, { status: 201 }); // 201 Created

  } catch (error) {
    console.error('Error al crear usuario:', error);
    // Podríamos verificar errores específicos de Prisma/DB aquí
    return NextResponse.json({ error: 'Error interno del servidor al crear usuario' }, { status: 500 });
  }
}