import { NextResponse } from "next/server";
import { ServiceLocator } from "@/services/ServiceLocator"; // Changed from DAOLocator to ServiceLocator
import { IUser } from "@/entities/IUser"; // Held in case it is necessary for types

// GET: Get a user by ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = await ServiceLocator.userService.findById(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Exclude password before sending
    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error(`Error getting user with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: "Internal server error when getting user" },
      { status: 500 }
    );
  }
}

// PUT: Update user by ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const body = await request.json();
    // We explicitly exclude the password if it comes in the body, although the service should not use it.
    const { password, ...updateData } = body;

    // Basic validation
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No data provided to update" },
        { status: 400 }
      );
    }

    // The service takes care of the update logic
    // Note: The password is not updated here for security reasons.
    const success = await ServiceLocator.userService.update({
      ...updateData,
      id,
    });

    if (success) {
      // Optional: you could return the updated user if the service returns it.
      // const updatedUser = await ServiceLocator.userService.findById(id);
      // if (updatedUser) {
      //    const { password, ...userWithoutPassword } = updatedUser;
      //    return NextResponse.json(userWithoutPassword);
      // }
      return NextResponse.json({ success: true }); // Simple answer as in event
    } else {
      // The service returned false, it could be because the user does not exist or the update failed.
      // We could check if it exists to give a more specific 404, but we simplify it by
      return NextResponse.json(
        { success: false, error: "Could not update user (may not exist)" },
        { status: 400 }
      ); // Or 500 if internal error
    }
  } catch (error) {
    console.error(`Error updating user with ID ${params.id}:`, error);
    return NextResponse.json(
      { success: false, error: "Internal server error when updating user" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a user by ID
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const success = await ServiceLocator.userService.deleteById(id);

    // We return an object { success } as in event
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      // If deleteById returns false, we assume that the user was not found.
      return NextResponse.json(
        { success: false, error: "User not found to delete" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(`Error deleting user with ID ${params.id}:`, error);
    // Consider foreign key constraint errors if any
    return NextResponse.json(
      { success: false, error: "Internal server error when deleting user" },
      { status: 500 }
    );
  }
}