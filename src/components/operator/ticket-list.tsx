"use client"

import { useState } from "react"
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
import type { Complaint, ComplaintStatus, ComplaintPriority } from "@/types/complaint"
import { motion, AnimatePresence } from "framer-motion"
import { fadeIn, staggerContainer } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppContext } from "@/context/AppContext"

export default function TicketList() {
  const { complaints, updateComplaintStatus, updateComplaintPriority } = useAppContext();
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)
  const [showCompleted, setShowCompleted] = useState(false)
  const [filterStatus, setFilterStatus] = useState<ComplaintStatus | 'all'>('all')
  const [filterPriority, setFilterPriority] = useState<ComplaintPriority | 'all'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredComplaints = complaints.filter(complaint => 
    (filterStatus === 'all' || complaint.status === filterStatus) &&
    (filterPriority === 'all' || complaint.priority === filterPriority) &&
    (complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     complaint.id.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const activeComplaints = filteredComplaints.filter(c => c.status !== "completed")
  const completedComplaints = filteredComplaints.filter(c => c.status === "completed")

  const stats = {
    total: complaints.length,
    open: complaints.filter(c => c.status === "open").length,
    inProgress: complaints.filter(c => c.status === "in_progress").length,
    completed: complaints.filter(c => c.status === "completed").length,
  }

  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      animate="show"
      className="flex flex-col space-y-6 bg-[#F6F5FC]"
    >   
      <motion.main variants={fadeIn()} className="flex-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Ticket Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center w-full md:w-auto">
                <Input 
                  placeholder="Search tickets..." 
                  className="max-w-sm" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select 
                  value={filterStatus} 
                  onValueChange={(value: ComplaintStatus | 'all') => setFilterStatus(value)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select 
                  value={filterPriority} 
                  onValueChange={(value: ComplaintPriority | 'all') => setFilterPriority(value)}
                >
                  <SelectTrigger className="w-[200px]">
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
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {Object.entries(stats).map(([key, value]) => (
                <Card key={key}>
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <p className="text-sm font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                    <p className="text-2xl font-bold">{value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Tickets</CardTitle>
                </CardHeader>
                <CardContent>
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
                                <SelectItem value="open">Open</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={complaint.priority}
                              onValueChange={(value: ComplaintPriority) => 
                                updateComplaintPriority(complaint.id, value)
                              }
                            >
                              <SelectTrigger className="w-[100px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
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
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="pl-4">Task</TableHead>
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
            </div>
          </CardContent>
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
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Priority</Label>
                    <Select
                      value={selectedComplaint.priority}
                      onValueChange={(value: ComplaintPriority) => {
                        updateComplaintPriority(selectedComplaint.id, value)
                        setSelectedComplaint({
                          ...selectedComplaint,
                          priority: value,
                          updatedAt: new Date().toISOString()
                        })
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
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

