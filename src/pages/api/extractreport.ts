export const runtime = "edge"; // Use Edge runtime

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
});

const prompt = `Attached is an image of a company report / docs. 
Go over the report and identify important points. Then summarize in 100-150 words. You may increase the word limit if the report has multiple pages. Make sure to include numerical values and key details from the report, including report title.
## Summary: `;

function fileToGenerativePart(imageData: string) {
    return {
        inlineData: {
            data: imageData.split(",")[1],
            mimeType: imageData.substring(
                imageData.indexOf(":") + 1,
                imageData.lastIndexOf(";")
            ),
        },
    };
}

export default async function handler(req: Request) {
    if (req.method === "POST") {
        try {
            const { base64 } = await req.json(); // Web API Request object supports .json()
            const filePart = fileToGenerativePart(base64);

            const generatedContent = await model.generateContent([prompt, filePart]);

            const textResponse =
                generatedContent.response.candidates![0].content.parts[0].text;

            return new Response(textResponse, { status: 200 });
        } catch (error) {
            console.error(error); // Log the error to the console for debugging
            return new Response(
                JSON.stringify({ error: error instanceof Error ? error.message : "Internal Server Error" }),
                { status: 500 }
            );
        }
    } else {
        return new Response(
            JSON.stringify({ error: "Method Not Allowed" }),
            { status: 405 }
        );
    }
}
