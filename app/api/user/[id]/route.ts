// Ruta API para gestionar un usuario específico (GET por id, PUT, DELETE)
import { NextResponse } from 'next/server';
import { ServiceLocator } from '@/services/ServiceLocator'; // Cambiado de DAOLocator a ServiceLocator
import { IUser } from '@/entities/IUser'; // Mantenido por si es necesario para tipos

// GET: Obtener un usuario por ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID de usuario inválido' }, { status: 400 });
    }

    const user = await ServiceLocator.userService.findById(id);

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
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID de usuario inválido' }, { status: 400 });
    }

    const body = await request.json();
    // Excluimos explícitamente la contraseña si viene en el body, aunque el servicio no debería usarla.
    const { password, ...updateData } = body;

    // Validación básica
    if (Object.keys(updateData).length === 0) {
        return NextResponse.json({ error: 'No se proporcionaron datos para actualizar' }, { status: 400 });
    }

    // El servicio se encarga de la lógica de actualización
    // Nota: La contraseña no se actualiza aquí por seguridad.
    const success = await ServiceLocator.userService.update({ ...updateData, id });

    if (success) {
        // Opcional: podrías devolver el usuario actualizado si el servicio lo retornara
        // const updatedUser = await ServiceLocator.userService.findById(id);
        // if (updatedUser) {
        //    const { password, ...userWithoutPassword } = updatedUser;
        //    return NextResponse.json(userWithoutPassword);
        // }
        return NextResponse.json({ success: true }); // Respuesta simple como en event
    } else {
        // El servicio devolvió false, podría ser porque el usuario no existe o falló la actualización
        // Podríamos verificar si existe para dar un 404 más específico, pero simplificamos
         return NextResponse.json({ success: false, error: 'No se pudo actualizar el usuario (puede que no exista)' }, { status: 400 }); // O 500 si es error interno
    }

  } catch (error) {
    console.error(`Error al actualizar usuario con ID ${params.id}:`, error);
    return NextResponse.json({ success: false, error: 'Error interno del servidor al actualizar usuario' }, { status: 500 });
  }
}

// DELETE: Eliminar un usuario por ID
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID de usuario inválido' }, { status: 400 });
    }

    const success = await ServiceLocator.userService.deleteById(id);

    // Devolvemos un objeto { success } como en event
    if (success) {
        return NextResponse.json({ success: true });
    } else {
        // Si deleteById devuelve false, asumimos que no se encontró el usuario
        return NextResponse.json({ success: false, error: 'Usuario no encontrado para eliminar' }, { status: 404 });
    }

  } catch (error) {
    console.error(`Error al eliminar usuario con ID ${params.id}:`, error);
    // Considerar errores de restricción de clave externa si los hay
    return NextResponse.json({ success: false, error: 'Error interno del servidor al eliminar usuario' }, { status: 500 });
  }
}