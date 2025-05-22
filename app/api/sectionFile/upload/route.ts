import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

//sectionFile/upload
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ 
        success: false, 
        error: 'No file uploaded' 
      }, { status: 400 });
    }

    // Crear directorio si no existe
    const uploadDir = path.join(process.cwd(), 'public', 'img', 'iemdb');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generar nombre único
    const timestamp = Date.now();
    const randomSuffix = Math.round(Math.random() * 1E9);
    const extension = path.extname(file.name);
    const fileName = `${timestamp}-${randomSuffix}${extension}`;
    
    // Guardar archivo
    const filePath = path.join(uploadDir, fileName);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filePath, buffer);

    // Construir URL
    const fileUrl = `/img/iemdb/${fileName}`;

    return NextResponse.json({
      success: true,
      name: file.name,
      url: fileUrl
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to upload file' 
    }, { status: 500 });
  }
}