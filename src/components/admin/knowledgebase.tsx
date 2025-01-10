'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import { Database, LucideLoader2, MoveUp, RefreshCcw } from 'lucide-react'
import React, { useState } from 'react'


const VectorDBPage = () => {  
    const [isUploading, setisUploading] = useState(false);
    const [indexname, setIndexname] = useState("");
    const [namespace, setNamespace] = useState("");

    const [filename, setfilename] = useState('');
    const [progress, setprogress] = useState(0);

    const [filelistastext, setfilelistastext] = useState("");

    const onfilelistrefresh = async () => {
        setfilelistastext('');
        const response = await fetch('/api/getfilelist',{method: 'GET'});
        const data = await response.json();
        console.log(data);
        const resultstring= (data as string[]).map(filename => `📁 ${filename}`).join('\n');
        setfilelistastext(resultstring);
    }

    const onStartUpload = async () => {
        setprogress(0);
        setfilename('');
        setisUploading(true);


        const response = await fetch('/api/updatedatabase', { method: 'POST', body: JSON.stringify({indexname, namespace})})
        console.log(response)
        await processStreamedProgress(response);
    }
    async function processStreamedProgress(response: Response) {
        const reader = response.body?.getReader();
        if (!reader) {
            console.error('No reader');
            return;
        }
        try{
            while(true){
                const {done, value} = await reader.read();
                if (done) {
                    setisUploading(false);
                    break
                }

                const data=new TextDecoder().decode(value);
                console.log(data);

                const {filename, totalChunks, chunkUpserted} = JSON.parse(data);
                const currentProgress = (chunkUpserted/totalChunks)*100;
                setprogress(currentProgress);
                setfilename(`${filename}[${chunkUpserted}/${totalChunks}]`);
            }
        }catch(e){
            console.error('Error reading response', e);
        }finally{
            reader.releaseLock();
        }
    }
    
    return (
        <Card className='h-full'>
            <CardHeader>
                <CardTitle> Update Knowledge Base</CardTitle>
                <CardDescription>Add new document to vector DB</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='grid gap-4'>
                    <div className='col-span-2 grid gap-4 border rounded-lg p-6'>
                        <div className='gap-4 relative'>
                            <Button onClick={onfilelistrefresh} className='absolute -right-4 -top-4' variant={'ghost'} size={'icon'}>
                                <RefreshCcw/>
                            </Button>
                            <Label>Files List :</Label>
                            <Textarea readOnly value={filelistastext}
                            className='min-h-24 resize-none border p-3 shadow-none disabled:cursor-default focus-visible:ring-0 text-sm text-muted-foreground'
                            />
                        </div>
                        <div className=' grid grid-cols-2 gap-4'>
                            <div className='grid gap-2'>
                                <Label>
                                    Index Name
                                </Label>
                                <Input value={indexname} onChange={e => setIndexname(e.target.value)} placeholder='Index Name' disabled={isUploading} className='disabled:cursor-default' />
                            </div>
                            <div className='grid gap-2'>
                                <Label>
                                    Namespace
                                </Label>
                                <Input value={namespace} onChange={e => setNamespace(e.target.value)} placeholder='Namespace' disabled={isUploading} className='disabled:cursor-default'/>
                            </div>
                        </div>   
                    </div>
                </div>
                <Button onClick={onStartUpload} variant={'outline'} className='w-full h-full' disabled={isUploading} >
                        <span className='flex flex-row>'>
                            <Database size={50}/>
                            <MoveUp className='stroke-red-500'/>
                        </span>
                </Button>
                {isUploading && <div className='mt-4'>
                    <Label>File Name : {filename}</Label>
                    <div className='flex flex-row items-center gap-4'>
                        <Progress value={progress}/>
                        <LucideLoader2 className='stroke-red-500 animate-spin'/>
                    </div>
                </div>}
            </CardContent>
        </Card>
  )
}

export default VectorDBPage

