import { ServiceLocator } from "@/services/ServiceLocator";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const success = await ServiceLocator.sectionFileService.create(body);
    return NextResponse.json({ success });
}