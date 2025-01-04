import React, { ChangeEvent, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
// import { motion } from 'framer-motion'

type Props = {
    onReportConfirmation: (data: string) => void
}

const ReportComponent = ({ onReportConfirmation }: Props) => {
    const { toast } = useToast()

    const [base64Data, setBase64Data] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [reportData, setReportData] = useState("");

    function handleReportSelection(event: ChangeEvent<HTMLInputElement>): void {

        // Step 1: Check if there are files in the event target
        if (!event.target.files) return;

        // Step 2: Get the first file from the file list
        const file = event.target.files[0];

        // Step 3: Check if a file was indeed selected
        if (file) {
            let isValidImage = false;
            let isValidDoc = false;
            const validImages = ['image/jpeg', 'image/png', 'image/webp'];
            const validDocs = ['application/pdf'];
            if (validImages.includes(file.type)) {
                isValidImage = true;
            }
            if (validDocs.includes(file.type)) {
                isValidDoc = true;
            }
            if (!(isValidImage || isValidDoc)) {
                toast({
                    variant: 'destructive',
                    description: "Filetype not supproted!",
                });
                return;
            }

            if (isValidImage) {
                compressImage(file, (compressedFile) => {
                    const reader = new FileReader();

                    reader.onloadend = () => {
                        const base64String = reader.result as string;
                        setBase64Data(base64String);
                        console.log(base64String);
                    };

                    reader.readAsDataURL(compressedFile);
                });
            }

            if (isValidDoc) {
                const reader = new FileReader();
                // Docs are not compressed. Might add note that upto 1MB supported. Or use server side compression libraries.
                reader.onloadend = () => {
                    const base64String = reader.result as string;
                    setBase64Data(base64String);
                    console.log(base64String);
                };

                reader.readAsDataURL(file);
            }
        }
    }

    function compressImage(file: File, callback: (compressedFile: File) => void) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // Create a canvas element
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Set  canvas dimensions to match the image
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw the image onto the canvas
                ctx!.drawImage(img, 0, 0);


                // Apply basic compression (adjust quality as needed)
                const quality = 0.1; // Adjust quality as needed

                // Convert canvas to data URL
                const dataURL = canvas.toDataURL('image/jpeg', quality);

                // Convert data URL back to Blob
                const byteString = atob(dataURL.split(',')[1]);
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);

                }
                const compressedFile = new File([ab], file.name, { type: 'image/jpeg' });

                callback(compressedFile);
            };
            img.src = e.target!.result as string;
        };

        reader.readAsDataURL(file);
    }

    async function extractDetails(): Promise<void> {
        if (!base64Data) {
            toast({
                variant: 'destructive',
                description: "Upload a valid report!",
            });
            return;
        }
        setIsLoading(true);

        const response = await fetch("/api/extractreport", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                base64: base64Data,
            }),
        });

        if (response.ok) {
            const reportText = await response.text();
            console.log(reportText);
            setReportData(reportText);
        }

        setIsLoading(false);

    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-xl font-bold ">Report Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="file-upload">Upload Report</Label>
                    <Input
                        id="file-upload"
                        type="file"
                        onChange={handleReportSelection}
                        className="cursor-pointer"
                    />
                </div>
                <Button 
                    onClick={extractDetails}
                    className="w-full bg-[#3267FF]/80 hover:bg-[#3267FF]"
                    disabled={isLoading}
                >
                    {isLoading ? "Extracting..." : "Extract Details"}
                </Button>
                <div className="space-y-2">
                    <Label htmlFor="report-data">Report Data</Label>
                    <Textarea
                        id="report-data"
                        value={reportData}
                        onChange={(e) => setReportData(e.target.value)}
                        placeholder="Extracted data from the report. Additional data can be added for better analysis."
                        className="min-h-[200px] resize-none"
                    />
                </div>
                <Button
                    onClick={() => onReportConfirmation(reportData)}
                    className="w-full bg-[#3267FF]/80 hover:bg-[#3267FF]"
                >
                    Verify and Submit
                </Button>
            </CardContent>
        </Card>
    )
}

export default ReportComponent

