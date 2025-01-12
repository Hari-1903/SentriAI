'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import { Database, LucideLoader2, MoveUp, RefreshCcw, Upload } from 'lucide-react'
import React, { useState, useRef } from 'react'


const VectorDBPage = () => {  
    const [isUploading, setisUploading] = useState(false);
    const [indexname, setIndexname] = useState("");
    const [namespace, setNamespace] = useState("");

    const [filename, setfilename] = useState('');
    const [progress, setprogress] = useState(0);

    const [filelistastext, setfilelistastext] = useState("");
    
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          setSelectedFile(file);
          setfilename(file.name);
        }
      };

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

    const handleFileSelect = () => {
        fileInputRef.current?.click();
      };

    
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
            <CardContent className='space-y-6'>
                <div className='grid gap-4 grid-cols-3 md:grid-cols-2'>
                    <div className='space-y-2 grid-span-2'>
                        <div className='flex items-center justify-between'>
                            <Label>Files List</Label>   
                            <Button onClick={onfilelistrefresh} variant={'ghost'} size={'icon'}>
                                <RefreshCcw/>
                            </Button>
                        </div>
                        <Textarea readOnly value={filelistastext}
                        className='min-h-[200] resize-none border p-3 shadow-none disabled:cursor-default focus-visible:ring-0 text-sm text-muted-foreground'
                        />
                    </div>
                    <div className=' flex justify-between flex-col pt-8'>
                    <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
                        <Button onClick={handleFileSelect} variant='outline' className='w-full'>
                            <Upload className="mr-2 h-4 w-4" />
                            {selectedFile ? 'Change File' : 'Choose File'}
                            </Button>
                            {selectedFile && (
                                <p className="text-sm text-muted-foreground">Selected: {selectedFile.name}</p>
                            )}
                        <div className='space-y-2'>
                            <Label>
                            Index Name 
                            </Label>
                            <Input value={indexname} onChange={e => setIndexname(e.target.value)} placeholder='Index Name' disabled={isUploading} className='disabled:cursor-default' />
                        </div>
                        <div className='space-y-2'>
                            <Label>
                                Namespace
                            </Label>
                            <Input value={namespace} onChange={e => setNamespace(e.target.value)} placeholder='Namespace' disabled={isUploading} className='disabled:cursor-default'/>
                        </div>
                        <div className='items-center justify-center'>
                        </div>
                    </div>   
                </div>
                <div className='flex items-center justify-center'>
                <Button onClick={onStartUpload} className='h-full' disabled={isUploading} >
                        <span className='flex flex-row>'>
                            <Database size={50}/>
                            <MoveUp className='stroke-red-500'/>
                            Update Database
                        </span>
                </Button>
                </div>
                {isUploading && <div className='mt-4'>
                    <Label>File Name : {filename}</Label>
                    <div className='flex flex-row items-center gap-4'>
                        <Progress value={progress}/>
                        <LucideLoader2 className='animate-spin text-blue-500'/>
                    </div>
                </div>}
            </CardContent>
        </Card>
  )
}

export default VectorDBPage

