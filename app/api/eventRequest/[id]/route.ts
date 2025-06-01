import { ServiceLocator } from "@/services/ServiceLocator";
import { NextResponse } from "next/server";

//api/eventRequest/[id]
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const response = await ServiceLocator.eventRequestService.findById(Number(params.id));
  return NextResponse.json(response);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const success = await ServiceLocator.eventRequestService.update(body);
  return NextResponse.json({ success });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const success = await ServiceLocator.eventRequestService.deleteById(Number(params.id));
  return NextResponse.json({ success });
}