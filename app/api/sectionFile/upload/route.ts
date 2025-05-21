import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, {File} from 'formidable'
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end("Only POST allowed");

  const uploadDir = path.join(process.cwd(), 'public', 'img', 'iemdb');
  fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({ uploadDir, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err || !files.file) {
      console.error(err);
      return res.status(500).json({ success: false, error: "File parsing failed" });
    }

    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;
    const fileName = path.basename(uploadedFile.filepath);
    const relativePath = `/img/iemdb/${fileName}`;

    res.status(200).json({
      success: true,
      name: uploadedFile.originalFilename || fileName,
      url: relativePath
    });
  });
}