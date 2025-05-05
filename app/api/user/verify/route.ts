// API path to verify user credentials
import { NextResponse } from 'next/server';
// Change: Import ServiceLocator instead of DAOLocator
import { ServiceLocator } from '@/services/ServiceLocator';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Change: Use userService from ServiceLocator to verify credentials
    const user = await ServiceLocator.userService.verifyCredentials(email, password);

    if (user) {
      // Exclude the password from the user object before submitting it
      const { password: _, ...userWithoutPassword } = user;
      return NextResponse.json(userWithoutPassword);
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error in credential verification:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}