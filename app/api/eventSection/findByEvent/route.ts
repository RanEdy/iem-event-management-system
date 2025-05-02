import { NextResponse } from 'next/server';
import { ServiceLocator } from '@/services/ServiceLocator';

export async function GET(req: Request){
    try{
        const { id } = await req.json();
        const section = await ServiceLocator.eventSectionService.findByEvent(id);
        return NextResponse.json(section)

    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal server error while searching the last section event"}, { status: 500 });
    }
}