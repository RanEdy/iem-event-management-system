import { NextResponse } from "next/server";
import { ServiceLocator } from "@/services/ServiceLocator";

export async function GET(req: Request) {
    try {
        // Retrieve URL parameters
        const { searchParams } = new URL(req.url);
        const userId = Number(searchParams.get("userId"));
        const eventId = Number(searchParams.get("eventId"));

        // Validate parameters
        if (!userId || !eventId) {
            return NextResponse.json({
                success: false,
                error: "Missing or invalid userId or eventId"
            }, { status: 400 });
        }

        // Call the method with both IDs
        const eventUserList = await ServiceLocator.eventUserListService.findByUserAndEvent(userId, eventId);

        // Return the response with the result
        return NextResponse.json({ success: true, eventUserList });

    } catch (error) {
        console.error("Error fetching event user list:", error);
        return NextResponse.json({
            success: false,
            error: "Internal server error while searching for event user list"
        }, { status: 500 });
    }
}