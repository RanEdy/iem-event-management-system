import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Eliminar cookies, tokens o sesión aquí si usas alguna implementación
    const response = NextResponse.json({ success: true });

    // Aquí puedes borrar una cookie (si usas JWT o sesión con cookie)
    response.cookies.set('authToken', '', { path: '/', expires: new Date(0) });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ success: false, error: 'Logout failed' }, { status: 500 });
  }
}
