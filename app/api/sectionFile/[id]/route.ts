import { ServiceLocator } from "@/services/ServiceLocator";
import { NextResponse } from "next/server";

//api/sectionFile/[id]
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const file = await ServiceLocator.sectionFileService.findById(Number(params.id));
  return NextResponse.json(file);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const success = await ServiceLocator.sectionFileService.update(body);
  return NextResponse.json({ success });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const success = await ServiceLocator.sectionFileService.deleteById(Number(params.id));
  return NextResponse.json({ success });
}