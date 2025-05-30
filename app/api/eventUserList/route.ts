import { ServiceLocator } from "@/services/ServiceLocator";
import { NextResponse } from "next/server";

export async function GET()
{
    const events = await ServiceLocator.eventUserListService.findAll();
    return NextResponse.json(events);
}

export async function POST(req: Request) {
    const body = await req.json();
    const success = await ServiceLocator.eventUserListService.create(body);
    return NextResponse.json({ success });
}