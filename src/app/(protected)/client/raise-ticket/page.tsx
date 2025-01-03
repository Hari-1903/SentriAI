"use client"

import { useState, useEffect } from "react"
import { MainNav } from "@/components/client/nav-bar"
import { UserNav } from "@/components/client/user-nav"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Search } from "@/components/client/search"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, CheckCircle, AlertCircle, Clock } from 'lucide-react'
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
  {
    id: "TASK-8783",
    title: "Request for additional monitors",
    details: "Our team needs dual monitors to improve productivity. Can we get 5 more monitors?",
    type: "Feature",
    status: "todo",
    priority: "low",
    createdAt: "2024-01-03T09:00:00Z",
    updatedAt: "2024-01-03T09:00:00Z"
  },
  {
    id: "TASK-8784",
    title: "Update employee handbook",
    details: "The current employee handbook is outdated. It needs to be updated with the new policies.",
    type: "Documentation",
    status: "completed",
    priority: "medium",
    createdAt: "2024-01-01T11:00:00Z",
    updatedAt: "2024-01-04T14:00:00Z"
  },
  {
    id: "TASK-8785",
    title: "Software license renewal",
    details: "Our current software licenses are expiring next month. We need to renew them.",
    type: "Documentation",
    status: "todo",
    priority: "high",
    createdAt: "2024-01-05T14:00:00Z",
    updatedAt: "2024-01-05T14:00:00Z"
  },
  {
    id: "TASK-8786",
    title: "Office chair replacements",
    details: "Several employees have reported that their office chairs are worn out and need replacement.",
    type: "Feature",
    status: "in_progress",
    priority: "medium",
    createdAt: "2024-01-06T10:30:00Z",
    updatedAt: "2024-01-06T10:30:00Z"
  },
]

export default function ClientPage() {
  
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints)
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    details: "",
    type: "Bug" as ComplaintType
  })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

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

  const stats = {
    total: complaints.length,
    inProgress: complaints.filter(c => c.status === "in_progress").length,
    completed: complaints.filter(c => c.status === "completed").length,
  }

  return (
    <div className={`flex min-h-screen flex-col bg-[#F6F5FC] transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="border-b bg-[#FEFEFE]">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center space-x-4">
            <UserNav />
          </div>
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
             <Search />
          </div>
        </div>
      </div>
      <main className="flex-1 p-8 pt-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-[#3267FF]">Tickets Overview</h2>
          <div className="flex items-center space-x-2">
            <Button className="bg-[#F9D47E] text-black hover:bg-[#F9D47E]/90">Download</Button>
            <Button className="bg-[#3267FF] hover:bg-[#3267FF]/90">Export</Button>
          </div>
        </div>
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
                <Label htmlFor="details">Details</Label>
                <Textarea
                  id="details"
                  value={newComplaint.details}
                  onChange={(e) =>
                    setNewComplaint({ ...newComplaint, details: e.target.value })
                  }
                  className="min-h-[150px]"
                  required
                />
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
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
        <PlusCircle className="h-4 w-4 text-[#3267FF]" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stats.total}</div>
      </CardContent>
    </Card>
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">In Progress</CardTitle>
        <Clock className="h-4 w-4 text-[#F9D47E]" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stats.inProgress}</div>
      </CardContent>
    </Card>
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Completed</CardTitle>
        <CheckCircle className="h-4 w-4 text-[#F2FBF9]" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stats.completed}</div>
      </CardContent>
    </Card>
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Pending</CardTitle>
        <AlertCircle className="h-4 w-4 text-[#FCFBF4]" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {stats.total - stats.inProgress - stats.completed}
        </div>
      </CardContent>
    </Card>
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
                                <Badge 
                                  variant={complaint.status === "completed" ? "default" : "secondary"}
                                  className={complaint.status === "completed" ? "bg-[#F2FBF9] text-green-700" : ""}
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
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

