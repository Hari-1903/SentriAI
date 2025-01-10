"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, CheckCircle, AlertCircle, Clock, Mic, StopCircle } from 'lucide-react'
import type { Complaint, ComplaintType } from "@/types/complaint"
import { useAppContext } from "@/context/AppContext"

export default function RaiseTicket() {
  const { complaints, addComplaint, updateComplaintStatus } = useAppContext()
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    details: "",
    type: "Bug" as ComplaintType,
    voiceMessage: null as Blob | null,
    reason: ""
  })
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        setNewComplaint({ ...newComplaint, voiceMessage: audioBlob })
        audioChunksRef.current = []
      }
      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setRecordingTime(0)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComplaint.title || (!newComplaint.details && !newComplaint.voiceMessage)) {
      alert("Please provide a title and either details or a voice message.")
      return
    }
    const complaint: Complaint = {
      id: `TASK-${Math.floor(Math.random() * 10000)}`,
      ...newComplaint,
      status: "open",
      priority: "medium",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    addComplaint(complaint)
    setNewComplaint({ title: "", details: "", type: "Bug", voiceMessage: null, reason: "" })
  }

  const stats = {
    total: complaints.length,
    inProgress: complaints.filter(c => c.status === "in_progress").length,
    completed: complaints.filter(c => c.status === "completed").length,
  }

  return (
    <main className="flex-1">
      <div className="grid gap-8 md:grid-cols-3 mb-8">
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg md:col-span-2">
          <CardHeader>
            <CardTitle>Raise a Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newComplaint.title}
                  onChange={(e) =>
                    setNewComplaint({ ...newComplaint, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={newComplaint.type}
                  onValueChange={(value: ComplaintType) =>
                    setNewComplaint({ ...newComplaint, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bug">Bug</SelectItem>
                    <SelectItem value="Feature">Feature</SelectItem>
                    <SelectItem value="Documentation">Documentation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Complaint Details</Label>
                <div className="flex flex-col space-y-2">
                  <Textarea
                    id="details"
                    value={newComplaint.details}
                    onChange={(e) =>
                      setNewComplaint({ ...newComplaint, details: e.target.value, voiceMessage: null })
                    }
                    className="min-h-[150px]"
                    placeholder="Type your complaint details here..."
                    disabled={newComplaint.voiceMessage !== null}
                  />
                  <div className="flex items-center space-x-2">
                    {!isRecording ? (
                      <Button 
                        type="button" 
                        onClick={startRecording} 
                        className="bg-red-500 hover:bg-red-600"
                        disabled={newComplaint.details !== ""}
                      >
                        <Mic className="mr-2 h-4 w-4" /> Start Recording
                      </Button>
                    ) : (
                      <Button 
                        type="button" 
                        onClick={stopRecording} 
                        className="bg-gray-500 hover:bg-gray-600"
                      >
                        <StopCircle className="mr-2 h-4 w-4" /> Stop Recording ({recordingTime}s)
                      </Button>
                    )}
                    {newComplaint.voiceMessage && (
                      <audio src={URL.createObjectURL(newComplaint.voiceMessage)} controls />
                    )}
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#3267FF] hover:bg-[#3267FF]/90"
              >
                Raise a Ticket
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2 md:col-span-1">
          {[
            { title: "Total Complaints", value: stats.total, icon: PlusCircle, color: "text-blue-500" },
            { title: "In Progress", value: stats.inProgress, icon: Clock, color: "text-yellow-500" },
            { title: "Completed", value: stats.completed, icon: CheckCircle, color: "text-green-500" },
            { title: "Pending", value: stats.total - stats.inProgress - stats.completed, icon: AlertCircle, color: "text-red-500" }
          ].map((item, index) => (
            <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{item.title}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
                <item.icon className={`h-8 w-8 ${item.color}`} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Recent Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Complaint</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints.map((complaint) => (
                  <TableRow key={complaint.id} className="transition-colors hover:bg-[#EDE6FB]/50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{complaint.title}</div>
                        <div className="text-sm text-muted-foreground">{complaint.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{complaint.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={complaint.status === "completed" ? "default" : "secondary"}
                        className={complaint.status === "completed" ? "bg-[#F2FBF9] text-green-700" : ""}
                      >
                        {complaint.status === "in_progress" ? "In Progress" : 
                          complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost">View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>{complaint.title}</DialogTitle>
                            <DialogDescription>
                              Complaint ID: {complaint.id}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label>Status</Label>
                              <Select
                                value={complaint.status}
                                onValueChange={(value) => updateComplaintStatus(complaint.id, value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="todo">Todo</SelectItem>
                                  <SelectItem value="in_progress">In Progress</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label>Details</Label>
                              <p className="text-sm text-muted-foreground">{complaint.details}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label>Created</Label>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(complaint.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="grid gap-2">
                                <Label>Last Updated</Label>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(complaint.updatedAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </main>
  )
}

