import { NextResponse } from "next/server";
import { ServiceLocator } from "@/services/ServiceLocator";

export async function GET(req: Request) {
    try {
        // Retrieve the user ID from the URL parameters
        const { searchParams } = new URL(req.url);
        const userId = Number(searchParams.get("id"));

        if (!userId) {
            return NextResponse.json({ success: false, error: "Missing or invalid userId" }, { status: 400 });
        }

        // Call the method to fetch the user's event requests
        const eventRequests = await ServiceLocator.eventRequestService.findByUserId(userId);

        return NextResponse.json({ success: true, requests: eventRequests });

    } catch (error) {
        console.error("Error fetching event requests:", error);
        return NextResponse.json({ success: false, error: "Internal server error while searching for event requests" }, { status: 500 });
    }
}