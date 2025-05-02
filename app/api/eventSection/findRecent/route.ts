import { ServiceLocator } from "@/services/ServiceLocator";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const section = await ServiceLocator.eventSectionService.findRecent();
        return NextResponse.json(section)
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal server error while searching the last section event"}, { status: 500 });
    }
}