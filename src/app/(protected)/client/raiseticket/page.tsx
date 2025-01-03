"use client"

import { useState } from "react"
import { NavBar } from "@/components/client/nav-bar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Complaint, ComplaintType } from "@/types/complaint"

// Mock data - replace with actual API call
const initialComplaints: Complaint[] = [
  {
    id: "TASK-8782",
    title: "Network connectivity issues in Building A",
    details: "The WiFi connection is very unstable on the 3rd floor. This is affecting our work significantly.",
    type: "Bug",
    status: "in_progress",
    priority: "medium",
    createdAt: "2024-01-02T10:00:00Z",
    updatedAt: "2024-01-02T10:00:00Z"
  },
  // Add more complaints as needed
]

export default function ClientPage() {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints)
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    details: "",
    type: "Bug" as ComplaintType
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const complaint: Complaint = {
      id: `TASK-${Math.floor(Math.random() * 10000)}`,
      ...newComplaint,
      status: "todo",
      priority: "medium",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setComplaints([complaint, ...complaints])
    setNewComplaint({ title: "", details: "", type: "Bug" })
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Submit a Complaint</h1>
            <p className="text-muted-foreground">Register your complaint and track its status</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newComplaint.title}
                  onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={newComplaint.type}
                  onValueChange={(value: ComplaintType) => 
                    setNewComplaint({ ...newComplaint, type: value })}
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
                <Label htmlFor="details">Details</Label>
                <Textarea
                  id="details"
                  value={newComplaint.details}
                  onChange={(e) => setNewComplaint({ ...newComplaint, details: e.target.value })}
                  className="min-h-[150px]"
                  required
                />
              </div>

              <Button type="submit" className="w-full">Submit Complaint</Button>
            </form>
          </div>

          <div className="border rounded-lg">
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
                  <TableRow key={complaint.id}>
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
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{complaint.title}</DialogTitle>
                            <DialogDescription>
                              Complaint ID: {complaint.id}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label>Status</Label>
                              <Badge 
                                variant={complaint.status === "completed" ? "default" : "secondary"}
                              >
                                {complaint.status === "in_progress" ? "In Progress" : 
                                  complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                              </Badge>
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
          </div>
        </div>
      </main>
    </div>
  )
}

