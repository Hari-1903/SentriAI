"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Bell, Phone, HelpCircle, CheckCircle } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useAppContext } from "@/context/AppContext"
import Image from 'next/image'

export default function Overview() {
  const { complaints, scheduledCalls } = useAppContext();

  const recentComplaints = complaints.filter(c => c.status !== "completed").slice(0, 3);
  const completedTickets = complaints.filter(c => c.status === "completed").slice(0, 5);

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
            <CardTitle className="text-3xl font-bold text-[#3267FF]">Welcome to Sentri AI</CardTitle>
            <CardDescription className="text-xl">
              Your Intelligent Security Solution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
                This is your dedicated space for hassle-free support and efficient issue resolution. With intuitive tools to track your requests, 
                raise tickets seamlessly, and get real-time updates, staying in control has never been easier. Built with transparency and 
                user-friendliness in mind, it ensures your concerns are addressed quickly and effectively. Ready to experience streamlined support? 
                <span className='text-gray-800 font-semibold'>Check it out!</span>
            </p>
          </CardContent>
          </div>
        <Image src="/teaam.svg" alt="hero" width={400} height={400} className=' mx-14 my-12' />
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr] gap-6">
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledCalls.map((call, index) => (
                    <TableRow key={index}>
                      <TableCell>{call.name}</TableCell>
                      <TableCell>{call.date.toLocaleDateString()}</TableCell>
                      <TableCell>{call.time}</TableCell>
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
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                Completed Tickets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticket.id}</TableCell>
                      <TableCell>{ticket.title}</TableCell>
                      <TableCell>{ticket.type}</TableCell>
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

