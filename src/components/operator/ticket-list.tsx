"use client"

import { useState } from "react"
import { MainNav } from "@/components/operator/nav-bar"
import { UserNav } from "@/components/operator/user-nav"
import { Input } from "@/components/ui/input"
import Image from "next/image"
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
import { ChevronDown, MoreHorizontal } from 'lucide-react'
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
import { motion, AnimatePresence } from "framer-motion"
import { fadeIn, staggerContainer } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
  {
    id: "TASK-6543",
    title: "Update employee handbook",
    details: "The current employee handbook is outdated. It needs to be updated with the new policies.",
    type: "Documentation",
    status: "completed",
    priority: "low",
    createdAt: "2024-01-01T11:00:00Z",
    updatedAt: "2024-01-04T14:00:00Z"
  },
  {
    id: "TASK-5432",
    title: "Implement new security protocols",
    details: "We need to implement the new security protocols as discussed in the last meeting.",
    type: "Feature",
    status: "completed",
    priority: "high",
    createdAt: "2023-12-28T13:00:00Z",
    updatedAt: "2024-01-03T16:00:00Z"
  },
]

export default function TicketList() {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints)
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)
  const [showCompleted, setShowCompleted] = useState(false)

  const activeComplaints = complaints.filter(c => c.status !== "completed")
  const completedComplaints = complaints.filter(c => c.status === "completed")

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
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      animate="show"
      className="flex flex-col bg-[#F6F5FC]"
    >   
      <motion.main variants={fadeIn()} className="flex-1">
        <div className="flex justify-between items-center mb-6 ">
            <div className="flex gap-4 items-center">
          <Input placeholder="Filter complaints..." className="max-w-sm shadow-sm" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[200px] shadow-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="todo">Todo</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[200px] shadow-sm">
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
            <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-red-100 shadow-md px-4 py-1 rounded-lg transition-all duration-300 flex justify-center items-center flex-col"
            >
              <p className="text-sm ">Pending</p>
              <p className="text-lg font-bold">{stats.pending}</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-green-100 shadow-md py-1 px-3 rounded-lg transition-all duration-300 flex justify-center items-center flex-col"
            >
              <p className="text-sm">Completed</p>
              <p className="text-lg font-bold">{stats.completed}</p>
            </motion.div>
            </div>
        </div>
        <Card className="mb-6">
          <CardHeader className="shadow-sm">
            <CardTitle >Active Tickets</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                  </TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeComplaints.map((complaint) => (
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setShowCompleted(!showCompleted)}
          >
            <CardTitle className="text-md font-light flex items-center justify-between">
              Completed Tickets
              <ChevronDown className={`w-6 h-6 transition-transform ${showCompleted ? 'transform rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
          <AnimatePresence>
            {showCompleted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className=" pl-4">Task</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Completed Date</TableHead>
                        <TableHead className="w-[150px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {completedComplaints.map((complaint) => (
                        <TableRow key={complaint.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium ml-2">{complaint.title}</div>
                              <div className="text-sm text-muted-foreground ml-2">{complaint.id}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{complaint.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={complaint.priority === "high" ? "destructive" : "secondary"}>
                              {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(complaint.updatedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedComplaint(complaint)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

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
      </motion.main>
    </motion.div>
  )
}


