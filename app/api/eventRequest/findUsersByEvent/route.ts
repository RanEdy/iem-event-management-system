import { ServiceLocator } from "@/services/ServiceLocator"
import { NextResponse } from "next/server";


export async function POST(req: Request)
{
    try
    {
        const { eventId } = await req.json()
        const users = await ServiceLocator.eventRequestService.findUsersByEvent(eventId);
        return NextResponse.json(users);
    }
    catch(error)
    {
        console.log("Error trying to get users by event requests: ", error)
        return NextResponse.json({succes: false, error: 'Internal server error when getting users'}, {status: 500})
    }
}