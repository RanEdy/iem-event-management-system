import { ServiceLocator } from "@/services/ServiceLocator";
import { NextResponse } from "next/server";

export async function GET(req: Request)
{
    const { role } = await req.json();
    const filterlistByRole = await ServiceLocator.eventUserListService.findManyByRole(role);
    return NextResponse.json(filterlistByRole);
}