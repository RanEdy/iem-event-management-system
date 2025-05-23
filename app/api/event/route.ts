import { IEvent } from "@/entities/IEvent";
import { ServiceLocator } from "@/services/ServiceLocator";
import { NextResponse } from "next/server";

//api/event/
export async function GET()
{
    const events = await ServiceLocator.eventService.findAll();
    return NextResponse.json(events);
}

//POST: Create a new event
export async function POST(req: Request) {
    
    // Parse the request body as event data, but omitting the id
    const eventData: Omit<IEvent, 'id'> = await req.json();
    
    // Validate event name
    if (!eventData.name) {
        return NextResponse.json({ success: false, error: 'The field indicating the event name is missing.' }, { status: 400 });
    }

    // Validate address fields
    if (!eventData.city || !eventData.state || !eventData.address || !eventData.zipCode) {
        return NextResponse.json({ success: false, error: 'Address fields are missing to create the event' }, { status: 400 });
    }

    // Validate start and end dates
    if (!eventData.startDate || !eventData.endDate ) {
        return NextResponse.json({ success: false, error: 'Date fields are missing to create the event' }, { status: 400 });
    }

    // Ensure start date is before end date
    if (new Date(eventData.startDate) >= new Date(eventData.endDate)) {
        return NextResponse.json({ success: false, error: 'Start date must be before end date.' }, { status: 400 });
    }    

    // Validate maximum number of users
    if (!eventData.maxUsers) {
        return NextResponse.json({ success: false, error: 'The field indicating the maximum number of users for the event is missing.' }, { status: 400 });
    } 
    else if(isNaN(Number(eventData.maxUsers))) //Validate that the maximum number of users is of the number type
    {
        return NextResponse.json({ success: false, error: 'The value of the max users is not of type number.' }, { status: 400 });
    }
    else if(eventData.maxUsers <= 0) //Validate that the maximum number of users is not less than or equal to 0
    {
        return NextResponse.json({ success: false, error: 'The value of the max users must be greater than 0.' }, { status: 400 });
    }

    try {
        // Attempt to create the event
        const event = await ServiceLocator.eventService.create(eventData);

        //Handles the error that occurred when registering the event
        if (!event) {
            return NextResponse.json({ success: false, error: "Failed to create the event." }, { status: 500 });
        }

        //Registration was successful
        return NextResponse.json({ success: true, event, message: "Event created successfully" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal server error while creating the event"}, { status: 500 });
    }

}