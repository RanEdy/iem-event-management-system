// Ruta API para gestionar un usuario específico (GET por id, PUT, DELETE)
import { NextResponse } from 'next/server';
import { DAOLocator } from '@/persistence/DAOLocator';
import { IUser } from '@/entities/IUser';

interface Params {
  params: { id: string };
}

// GET: Obtener un usuario por ID
export async function GET(request: Request, { params }: Params) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID de usuario inválido' }, { status: 400 });
    }

    const userDao = DAOLocator.userDao;
    const user = await userDao.findById(id);

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Excluir contraseña antes de enviar
    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);

  } catch (error) {
    console.error(`Error al obtener usuario con ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Error interno del servidor al obtener usuario' }, { status: 500 });
  }
}

// PUT: Actualizar un usuario por ID
export async function PUT(request: Request, { params }: Params) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID de usuario inválido' }, { status: 400 });
    }

    const userData: Partial<Omit<IUser, 'id' | 'password'>> = await request.json(); // Permitir actualizaciones parciales, excluir id y password directamente

    // Validación básica (se puede expandir)
    if (Object.keys(userData).length === 0) {
        return NextResponse.json({ error: 'No se proporcionaron datos para actualizar' }, { status: 400 });
    }

    const userDao = DAOLocator.userDao;

    // Construir objeto de actualización asegurando que el ID esté presente
    const updateData: IUser = { ...userData, id } as IUser; // Forzar tipo aquí, asumiendo que la DAO maneja la lógica

    // La DAO se encargará de verificar si el usuario existe y actualizarlo
    // Nota: La contraseña no se actualiza aquí por seguridad. Se necesitaría una ruta/lógica separada.
    const updated = await userDao.update(updateData); // Asumiendo que update devuelve boolean o el usuario actualizado

    if (updated) {
        // Opcional: devolver el usuario actualizado (sin contraseña)
        const freshUser = await userDao.findById(id);
        if(freshUser){
            const { password, ...userWithoutPassword } = freshUser;
            return NextResponse.json(userWithoutPassword);
        } else {
             // Esto no debería pasar si la actualización fue exitosa, pero por si acaso
             return NextResponse.json({ message: 'Usuario actualizado pero no se pudo recuperar' });
        }
    } else {
      // Podría ser que el usuario no exista o la actualización falló por otra razón
      // Verificar si el usuario existe primero podría dar un error 404 más específico
      const exists = await userDao.findById(id);
      if (!exists) {
          return NextResponse.json({ error: 'Usuario no encontrado para actualizar' }, { status: 404 });
      }
      return NextResponse.json({ error: 'No se pudo actualizar el usuario' }, { status: 500 });
    }

  } catch (error) {
    console.error(`Error al actualizar usuario con ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Error interno del servidor al actualizar usuario' }, { status: 500 });
  }
}

// DELETE: Eliminar un usuario por ID
export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID de usuario inválido' }, { status: 400 });
    }

    const userDao = DAOLocator.userDao;
    const deleted = await userDao.deleteById(id);

    if (deleted) {
      return NextResponse.json({ message: 'Usuario eliminado correctamente' }, { status: 200 }); // O 204 No Content
    } else {
      // Podría ser que el usuario no exista
      return NextResponse.json({ error: 'Usuario no encontrado para eliminar' }, { status: 404 });
    }

  } catch (error) {
    console.error(`Error al eliminar usuario con ID ${params.id}:`, error);
    // Considerar errores de restricción de clave externa si los hay
    return NextResponse.json({ error: 'Error interno del servidor al eliminar usuario' }, { status: 500 });
  }
}