import { queryPineconeVectorStore } from "../../../../utils2";
import { Pinecone } from "@pinecone-database/pinecone";
// import { Message, OpenAIStream, StreamData, StreamingTextResponse } from "ai";
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { Message, StreamData, streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 60;
// export const runtime = 'edge';

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY ?? "",
});

const google = createGoogleGenerativeAI({
    baseURL: 'https://generativelanguage.googleapis.com/v1beta',
    apiKey: process.env.GEMINI_API_KEY
});

// gemini-1.5-pro-latest
// gemini-1.5-pro-exp-0801
const model = google('models/gemini-1.5-pro-latest', {
    safetySettings: [
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
    ],
});

export async function POST(req: Request) {
    const reqBody = await req.json();
    console.log(reqBody);

    const messages: Message[] = reqBody.messages;
    const userQuestion = `${messages[messages.length - 1].content}`;

    const reportData: string = reqBody.data.reportData;
    const query = `Represent this for searching relevant passages: Document says:  \n${reportData}. \n\n${userQuestion}`;

    const retrievals = await queryPineconeVectorStore(pinecone, 'sentriai', "data", query);

    const finalPrompt = `Acts as a BPO call operator and generate a responses to the operators query. 
    Here is the summary of the attached company report and query by the operator. Some data may or may not be relevant to the report
    Go through the company report and answer the operator query. Ensure the response is factually accurate and demonstrates a thorough understanding of the query topic and the company report. 
    Before answering, you may enrich your knowledge by going through the provided data. Data is from the oragnisation the operator works in. The data is generic insights and not part of the company report. 
    Do not include any data if it is not relevant for the company's case.  Provide thorough justification for your answer. 

    \n\n*Attach Company report summary* \n${reportData}. 
    \n*end of company report summary* 

    \n\n*Operator Query*\n${userQuestion}?
    \n*End of operator query* 

    \n\n*Generic Company Data from the oragnization
    \n\n${retrievals}. 
    \n\n*End of company data from organizatino* 

    \n\nProvide thorough justification for your answer.
    \n\n*Answer:*`;

    const data = new StreamData();
    data.append({
        retrievals: retrievals
    });

    const result = await streamText({
        model: model,
        prompt: finalPrompt,
        onFinish() {
            data.close();
        }
    });

    return result.toDataStreamResponse({ data });
}

