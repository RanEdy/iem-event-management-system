import { NextResponse } from 'next/server';
import { ServiceLocator } from '@/services/ServiceLocator';

async function GET(req: Request){
    try{
        const { id } = await req.json();
        return NextResponse.json(ServiceLocator.eventSectionService.findByEvent(id))

    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal server error while searching the last section event"}, { status: 500 });
    }
}