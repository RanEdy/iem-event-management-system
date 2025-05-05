import { ServiceLocator } from "@/services/ServiceLocator";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: { id: string } }) {
  
  const { id } = await context.params;
  const event = await ServiceLocator.eventService.findById(Number(id));
  return NextResponse.json(event);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const success = await ServiceLocator.eventService.update({ ...body, id: Number(params.id) });
  return NextResponse.json({ success });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const success = await ServiceLocator.eventService.deleteById(Number(params.id));
  return NextResponse.json({ success });
}