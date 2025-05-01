import { ServiceLocator } from "@/services/ServiceLocator";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const event = await ServiceLocator.eventSectionService.findById(Number(params.id));
  return NextResponse.json(event);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const success = await ServiceLocator.eventSectionService.update({ ...body, id: Number(params.id) });
  return NextResponse.json({ success });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const success = await ServiceLocator.eventSectionService.deleteById(Number(params.id));
  return NextResponse.json({ success });
}