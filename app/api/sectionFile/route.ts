import { ServiceLocator } from "@/services/ServiceLocator";
import { NextResponse } from "next/server";

export async function GET()
{
    const files = await ServiceLocator.sectionFileService.findAll();
    return NextResponse.json(files);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Validate fields
        if (!body.sectionId || !body.name || !body.dataBytes) {
            return NextResponse.json({
                success: false, 
                error: "Missing required fields: sectionId, name, or dataBytes"
            }, { status: 400 });
        }

        // Make file
        const file = await ServiceLocator.sectionFileService.create({
            sectionId: body.sectionId,
            name: body.name,
            dataBytes: body.dataBytes
        });

        if (!file) {
            return NextResponse.json({
                success: false, 
                error: "Failed to create file"
            }, { status: 500 });
        }

        return NextResponse.json({ 
            success: true, 
            file 
        });
    } catch (error) {
        console.error("Error creating section file:", error);
        return NextResponse.json({
            success: false, 
            error: "Internal server error"
        }, { status: 500 });
    }
}