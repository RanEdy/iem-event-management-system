import { ServiceLocator } from "@/services/ServiceLocator";
import { NextResponse } from "next/server";

//sectionFile/upsert
export async function POST(req: Request) {
    const body = await req.json();
    const file = await ServiceLocator.sectionFileService.upsert(body);
    if (!file) return NextResponse.json({success: false, file})
    return NextResponse.json({ success: true, file });
}