import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { Pinecone } from '@pinecone-database/pinecone';
import { NextApiRequest, NextApiResponse } from "next";
import { updateVectorDB } from "../../../utils";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    if (req.method === 'POST') {
        const { indexname, namespace}= JSON.parse(req.body)
        await handleUpload(indexname, namespace,res);
    }
}

async function handleUpload(indexname: string, namespace: string, res: NextApiResponse) {
    const loader = new DirectoryLoader('./src/documents',{
    '.pdf':(path: string)=> new PDFLoader(path , {
        splitPages: false
    }),
    '.txt':(path: string)=> new TextLoader(path),});
    const docs = await loader.load();
    const client= new Pinecone({
        apiKey: process.env.PINECONE_API_KEY!
    });

    await updateVectorDB(client, indexname, namespace, docs, (filename, totalChunks, chunkUpserted, isComplete) => {
        if (!isComplete){
            res.write(
                JSON.stringify({
                    filename,
                    totalChunks,
                    chunkUpserted,
                    isComplete
                })
            )
        }else{
            res.end();
        }
    })
}