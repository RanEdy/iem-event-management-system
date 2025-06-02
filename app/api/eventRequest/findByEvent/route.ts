import { ServiceLocator } from "@/services/ServiceLocator"
import { NextResponse } from "next/server";

export async function POST(req: Request)
{
    try
    {
        const { eventId } = await req.json()
        const requests = await ServiceLocator.eventRequestService.findByEvent(eventId);
        return NextResponse.json(requests);
    }
    catch(error)
    {
        console.log("Error trying to get requests by event: ", error)
        return NextResponse.json({succes: false, error: 'Internal server error when getting users'}, {status: 500})
    }
}