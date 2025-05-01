import { ServiceLocator } from "@/services/ServiceLocator";
import { NextResponse } from "next/server";


export async function GET()
{
    const events = await ServiceLocator.eventSectionService.findAll();
    return NextResponse.json(events);
}

export async function POST(req: Request) {
    const body = await req.json();
    const success = await ServiceLocator.eventSectionService.create(body);
    return NextResponse.json({ success });
}