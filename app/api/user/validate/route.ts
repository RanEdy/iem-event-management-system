import { NextResponse } from 'next/server';
import { ServiceLocator } from '@/services/ServiceLocator';

export async function POST(request: Request) {
    try {
        const userData = await request.json();

        // Validate data using the userService
        const validationResult = await ServiceLocator.userService.validateUserData(userData);

        // If validation fails, we return the validation error message that occurred in userService.
        if (!validationResult.isValid) {
            return NextResponse.json({
                success: false,
                error: validationResult.error
            }, { status: 400 });
        }

        // If the validation is successful, we return the generated password.
        return NextResponse.json({
            success: true,
            generatedPassword: validationResult.generatedPassword
        }, { status: 200 });

    } catch (error) {
        console.error('Validation error:', error);
        return NextResponse.json({
            success: false,
            error: 'Internal server error during validation'
        }, { status: 500 });
    }
}