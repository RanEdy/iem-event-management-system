import { ServiceLocator } from "@/services/ServiceLocator";
import { NextResponse } from "next/server";


export async function GET()
{
    const sections = await ServiceLocator.eventSectionService.findAll();
    return NextResponse.json(sections);
}

export async function POST(req: Request) {
    const body = await req.json();
    console.log("api/eventSection/POST: body")
    console.log(body)
    const section = await ServiceLocator.eventSectionService.create(body);
    console.log(section)
    return NextResponse.json({ success: true, section });
}