import { NextResponse } from "next/server";
import { ServiceLocator } from "@/services/ServiceLocator";
import bcrypt from 'bcrypt';

// PUT: Update user password
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
    const { currentPassword, newPassword } = body;

    // Validate request body
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required" },
        { status: 400 }
      );
    }

    // Get user to verify current password
    const user = await ServiceLocator.userService.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 }
      );
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    const success = await ServiceLocator.userService.update({
      ...user,
      password: hashedNewPassword
    });

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: "Could not update password" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(`Error updating password for user ID ${params.id}:`, error);
    return NextResponse.json(
      { success: false, error: "Internal server error when updating password" },
      { status: 500 }
    );
  }
}