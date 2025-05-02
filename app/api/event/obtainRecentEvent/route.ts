import { NextResponse } from 'next/server';
import { ServiceLocator } from '@/services/ServiceLocator';

export async function GET(){
    try{

        const event = await ServiceLocator.eventService.findFirst()
        console.log("api/evet/obtainRecentEvent/GET:");
        console.log(event);
        return NextResponse.json(event)

    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal server error while searching the last event"}, { status: 500 });
    }
}