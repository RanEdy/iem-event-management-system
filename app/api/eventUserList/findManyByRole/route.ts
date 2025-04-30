import { ServiceLocator } from "@/services/ServiceLocator";
import { NextResponse } from "next/server";

export async function GET(req: Request)
{
    const body = await req.json();
    const filterlistByRole = await ServiceLocator.eventUserListService.findManyByRole(body);
    return NextResponse.json(filterlistByRole);
}