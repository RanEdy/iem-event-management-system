import { ServiceLocator } from "@/services/ServiceLocator";
import { NextResponse } from "next/server";

//api/eventRequest/
export async function GET()
{
    const response = await ServiceLocator.eventRequestService.findAll();
    return NextResponse.json(response);
}

export async function POST(req: Request) {
    const body = await req.json();
    console.log(body)
    const response = await ServiceLocator.eventRequestService.create(body);
    console.log(response)
    return NextResponse.json({ success: true, response });
}