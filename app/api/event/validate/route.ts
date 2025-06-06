import { NextRequest, NextResponse } from "next/server";
import { EventService } from "@/services/EventService";

//api/event/validate
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // Extract the data from the request body
        const {
            name,
            city,
            state,
            zipCode,
            address,
            startDate,
            endDate,
            maxUsers
        } = body;
        
        // Validate the data
        const eventService = new EventService();
        
        // Results of the validation
        const validationResult = await eventService.validateEventData({
            name,
            city,
            state,
            zipCode,
            address,
            startDate,
            endDate,
            maxUsers: Number(maxUsers)
        });

        if (!validationResult.isValid) {
            return NextResponse.json({
                success: false,
                error: validationResult.error
            }, { status: 400 });
        }

        // If the data is valid
        return NextResponse.json({
            success: true,
            message: "Event data send correctly!"
        });
    } catch (error) {
        console.error("Validation error:", error);
        return NextResponse.json({
            success: false,
            error: "Internal server error during validation"
        }, { status: 500 });
    }
}