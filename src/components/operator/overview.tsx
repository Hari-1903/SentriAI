"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Clock, HelpCircle } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useAppContext } from "@/context/AppContext"
import Image from 'next/image'

export default function OperatorOverview() {
  const { complaints, scheduledCalls } = useAppContext();

  const stats = {
    total: complaints.length,
    open: complaints.filter(c => c.status === "open").length,
    inProgress: complaints.filter(c => c.status === "in_progress").length,
    completed: complaints.filter(c => c.status === "completed").length,
  }

  const recentComplaints = complaints.slice(0, 3);
  const upcomingCalls = scheduledCalls.slice(0, 3);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white shadow-lg flex items-center">
          <div>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-[#3267FF]">Hey Operator,</CardTitle>
              <CardDescription className="text-xl">
              Welcome to your Intelligent Support Dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                This is your centralized hub for managing support tickets, scheduling calls, and accessing the knowledge base. 
                Stay on top of client needs, track ticket statuses, and provide efficient support with real-time updates and AI-powered insights.
              </p>
            </CardContent>
          </div>
          <Image src="/operator.svg" alt="operator cartoon" width={200} height={200} className=' mx-14' />
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Tickets", value: stats.total, icon: HelpCircle, color: "text-blue-500" },
          { title: "Open", value: stats.open, icon: AlertCircle, color: "text-red-500" },
          { title: "In Progress", value: stats.inProgress, icon: Clock, color: "text-yellow-500" },
          { title: "Completed", value: stats.completed, icon: CheckCircle, color: "text-green-500" }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{item.title}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
                <item.icon className={`h-8 w-8 ${item.color}`} />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentComplaints.map((complaint) => (
                    <TableRow key={complaint.id}>
                      <TableCell>{complaint.id}</TableCell>
                      <TableCell>{complaint.title}</TableCell>
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
                        <Badge variant={complaint.priority === "high" ? "destructive" : "secondary"}>
                          {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingCalls.map((call, index) => (
                    <TableRow key={index}>
                      <TableCell>{call.name}</TableCell>
                      <TableCell>{call.date.toLocaleDateString()}</TableCell>
                      <TableCell>{call.time}</TableCell>
                      <TableCell>{call.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

