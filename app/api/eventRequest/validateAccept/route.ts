import { ServiceLocator } from "@/services/ServiceLocator"
import { NextResponse } from "next/server";


export async function POST(req: Request)
{
    try
    {
        const { eventId, userId } = await req.json()
        const response = await ServiceLocator.eventRequestService.validateAccept(eventId, userId);
        return NextResponse.json(response);
    }
    catch(error)
    {
        console.log("Error trying to validate the event request: ", error)
        return NextResponse.json({succes: false, error: 'Internal server error when validating event request'}, {status: 500})
    }
}