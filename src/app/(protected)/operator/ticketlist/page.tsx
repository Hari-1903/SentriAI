"use client"

import { useState } from "react"
import { NavBar } from "@/components/client/nav-bar"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import type { Complaint, ComplaintStatus } from "@/types/complaint"

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
  {
    id: "TASK-7878",
    title: "Elevator maintenance required on 5th floor",
    details: "The elevator makes unusual noises and sometimes stops between floors. This is a safety concern.",
    type: "Bug",
    status: "pending",
    priority: "high",
    createdAt: "2024-01-02T09:00:00Z",
    updatedAt: "2024-01-02T09:00:00Z"
  },
  // Add more complaints as needed
]

export default function OperatorPage() {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints)
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)
  
  const stats = {
    pending: complaints.filter(c => c.status !== "completed").length,
    completed: complaints.filter(c => c.status === "completed").length
  }

  const updateComplaintStatus = (id: string, status: ComplaintStatus) => {
    setComplaints(complaints.map(complaint =>
      complaint.id === id 
        ? { ...complaint, status, updatedAt: new Date().toISOString() } 
        : complaint
    ))
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-muted-foreground">Here's a list of complaints for this month!</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Pending Complaints</p>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <Input placeholder="Filter complaints..." className="max-w-sm" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="todo">Todo</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
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
                    <Select
                      value={complaint.status}
                      onValueChange={(value: ComplaintStatus) => 
                        updateComplaintStatus(complaint.id, value)
                      }
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todo">Todo</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge variant={complaint.priority === "high" ? "destructive" : "secondary"}>
                      {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedComplaint(complaint)}
                      >
                        View Details
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => updateComplaintStatus(complaint.id, "completed")}
                          >
                            Mark as Completed
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={!!selectedComplaint} onOpenChange={() => setSelectedComplaint(null)}>
          <DialogContent className="max-w-2xl">
            {selectedComplaint && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedComplaint.title}</DialogTitle>
                  <DialogDescription>
                    Complaint ID: {selectedComplaint.id}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Status</Label>
                    <Select
                      value={selectedComplaint.status}
                      onValueChange={(value: ComplaintStatus) => {
                        updateComplaintStatus(selectedComplaint.id, value)
                        setSelectedComplaint({
                          ...selectedComplaint,
                          status: value,
                          updatedAt: new Date().toISOString()
                        })
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todo">Todo</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Details</Label>
                    <p className="text-sm text-muted-foreground">{selectedComplaint.details}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Created</Label>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedComplaint.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Label>Last Updated</Label>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedComplaint.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}

