import { ServiceLocator } from "@/services/ServiceLocator";
import { NextResponse } from "next/server";

//api/eventSection/[id]
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const section = await ServiceLocator.eventSectionService.findById(Number(params.id));
  return NextResponse.json(section);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const success = await ServiceLocator.eventSectionService.update(body);
  return NextResponse.json({ success });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const success = await ServiceLocator.eventSectionService.deleteById(Number(params.id));
  return NextResponse.json({ success });
}