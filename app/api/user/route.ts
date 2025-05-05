// API path to manage users (GET all, POST create)
import { NextResponse } from 'next/server';
import { ServiceLocator } from '@/services/ServiceLocator';
import { DAOLocator } from '@/persistence/DAOLocator'; // Temporarily held for findByEmail if the service does not expose it
import { IUser } from '@/entities/IUser';

// GET: Get all users
export async function GET() {
  try {
    // Change: Use userService from ServiceLocator
    const users = await ServiceLocator.userService.findAll();
    // Exclude passwords before sending (logic maintained)
    const usersWithoutPassword = users.map(user => {
      const { password, ...userWithoutPass } = user;
      return userWithoutPass;
    });
    return NextResponse.json(usersWithoutPassword);
  } catch (error) {
    console.error('Error getting users:', error);
    // Consistent error response
    return NextResponse.json({ success: false, error: 'Internal server error when getting users' }, { status: 500 });
  }
}

// POST: Create a new user
export async function POST(request: Request) {
  try {
    const userData: Omit<IUser, 'id'> = await request.json();

    // Basic validation (maintained)
    if (!userData.email || !userData.password || !userData.name || !userData.level) {
      return NextResponse.json({ success: false, error: 'Required fields are missing to create the user' }, { status: 400 });
    }

    // Check if the email already exists (using DAO directly if the service doesn't offer it)
    // Ideally, this could be in the service.
    const existingUser = await DAOLocator.userDao.findByEmail(userData.email);
    if (existingUser) {
        return NextResponse.json({ success: false, error: 'The e-mail address is already registered' }, { status: 409 }); // 409 Conflict
    }

    // Change: Use userService from ServiceLocator to create
    const success = await ServiceLocator.userService.create(userData);

    // Cambio: Devolver { success: boolean } como en event/route.ts
    if (success) {
        // We do not return the user, only the confirmation. Status 201 indicates successful creation.
        return NextResponse.json({ success: true }, { status: 201 });
    } else {
        // If the service returns false, it indicates a failure in creation.
        return NextResponse.json({ success: false, error: 'User could not be created' }, { status: 500 }); // Or a more specific code if the cause is known
    }

  } catch (error) {
    console.error('Error creating user:', error);
    // Consistent error response
    return NextResponse.json({ success: false, error: 'Internal server error when creating user' }, { status: 500 });
  }
}