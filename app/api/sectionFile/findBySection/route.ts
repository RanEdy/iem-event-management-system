import { NextResponse, NextRequest } from 'next/server';
import { ServiceLocator } from '@/services/ServiceLocator';

//api/sectionFile/findBySection
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, error: "Missing 'id' query parameter" }, { status: 400 });
        }

        const files = await ServiceLocator.sectionFileService.findBySection(Number(id));
        return NextResponse.json(files);
    } catch (error) {
        return NextResponse.json({ success: false, error: "Trying [api/sectionFile/findBySection/] >> Internal server error" }, { status: 500 });
    }
}