import { ServiceLocator } from "@/services/ServiceLocator"
import { NextResponse } from "next/server";

//api/event/totalUsers
export async function POST(req: Request)
{
    try {
        const { eventId } = await req.json()
        const totalUsers = await ServiceLocator.eventService.getTotalUsers(eventId);
        console.log(totalUsers)
        return NextResponse.json({totalUsers})
        
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}