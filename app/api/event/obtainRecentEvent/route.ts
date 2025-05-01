import { NextResponse } from 'next/server';
import { ServiceLocator } from '@/services/ServiceLocator';

export async function GET(){
    try{

        return NextResponse.json(ServiceLocator.eventService.obtainRecentEvent())

    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal server error while searching the last event"}, { status: 500 });
    }
}