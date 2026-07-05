import fs from 'fs';
import pdfParse from 'pdf-parse';

export class PdfReader {

    async read(pdfPath) {
        const dataBuffer = fs.readFileSync(pdfPath);

        // Interop fix - kabhi function directly milta hai, kabhi .default ke andar
        const pdfFunction = pdfParse.default || pdfParse;

        const data = await pdfFunction(dataBuffer);
        return data.text;
    }
}