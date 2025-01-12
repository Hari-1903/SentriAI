import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false, // Disable built-in bodyParser to handle multipart/form-data
    },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    try {
        const chunks: Buffer[] = [];
        const uploadDir = path.join(process.cwd(), 'public', 'documents');

        // Ensure the documents folder exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        req.on('data', (chunk) => {
            chunks.push(chunk);
        });

        req.on('end', () => {
            const buffer = Buffer.concat(chunks);

            // Parse the boundary from the Content-Type header
            const boundary = req.headers['content-type']?.split('boundary=')[1];
            if (!boundary) {
                res.status(400).json({ error: 'Invalid content type' });
                return;
            }

            // Extract the file data from the multipart form data
            const boundaryBuffer = Buffer.from(`--${boundary}`);
            const endBoundaryBuffer = Buffer.from(`--${boundary}--`);
            const startIndex = buffer.indexOf(boundaryBuffer) + boundaryBuffer.length + 2;
            const endIndex = buffer.indexOf(endBoundaryBuffer) - 2;

            const filePart = buffer.slice(startIndex, endIndex);
            const filenameMatch = filePart.toString().match(/filename="(.+?)"/);

            if (!filenameMatch) {
                res.status(400).json({ error: 'Invalid file data' });
                return;
            }

            const filename = filenameMatch[1];
            const fileStart = filePart.indexOf('\r\n\r\n') + 4;
            const fileBuffer = filePart.slice(fileStart, filePart.lastIndexOf('\r\n'));

            // Save the file to the documents folder
            const filePath = path.join(uploadDir, filename);
            fs.writeFileSync(filePath, fileBuffer);

            res.status(200).json({ message: 'File uploaded successfully', filename });
        });

        req.on('error', (err) => {
            console.error('Error processing upload:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default handler;
