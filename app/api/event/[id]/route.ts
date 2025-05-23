import { ServiceLocator } from "@/services/ServiceLocator";
import { NextResponse } from "next/server";

//api/event/[id]
export async function GET(request: Request, context: { params: { id: string } }) {
  
  const { id } = await context.params;
  const event = await ServiceLocator.eventService.findById(Number(id));
  return NextResponse.json(event);
}

export async function PUT(req: Request,  context : { params: { id: string } }) {
  const { id } = await context.params;
  const body = await req.json();
  const event = await ServiceLocator.eventService.update({ ...body, id: Number(id) });
  return NextResponse.json({ event });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const success = await ServiceLocator.eventService.deleteById(Number(id));
  return NextResponse.json({ success });
}