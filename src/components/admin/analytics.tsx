"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CreditCard, Activity, BarChart2, Clock, TrendingUp } from 'lucide-react';
import { useAppContext } from "@/context/AppContext";

export function Analytics() {
  const { complaints, scheduledCalls } = useAppContext();

  const complaintStatusData = [
    { name: "Open", value: complaints.filter(c => c.status === "open").length },
    { name: "In Progress", value: complaints.filter(c => c.status === "in_progress").length },
    { name: "Pending", value: complaints.filter(c => c.status === "pending").length },
    { name: "Completed", value: complaints.filter(c => c.status === "completed").length },
  ];

  const complaintTypeData = [
    { name: "Bug", value: complaints.filter(c => c.type === "Bug").length },
    { name: "Feature", value: complaints.filter(c => c.type === "Feature").length },
    { name: "Documentation", value: complaints.filter(c => c.type === "Documentation").length },
  ];

  const timeSaved = 120; 
  const revenueGrowth = 15;

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Complaints
            </CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complaints.length}</div>
            <p className="text-xs text-muted-foreground">
              +{complaints.filter(c => new Date(c.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length} this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Open Complaints
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complaints.filter(c => c.status === "open").length}</div>
            <p className="text-xs text-muted-foreground">
              {((complaints.filter(c => c.status === "open").length / complaints.length) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Calls</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledCalls.length}</div>
            <p className="text-xs text-muted-foreground">
              Next call in {Math.floor(Math.random() * 24)} hours
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((complaints.filter(c => c.status === "completed").length / complaints.length) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              +{((complaints.filter(c => c.status === "completed" && new Date(c.updatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length / complaints.length) * 100).toFixed(1)}% this week
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className=" md:col-span-2">
          <CardHeader>
            <CardTitle>Complaint Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex">
            <ResponsiveContainer width="50%" height="100%">
              <BarChart data={complaintStatusData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3267FF" name="Complaints" />
              </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="50%" height="100%">
              <BarChart data={complaintTypeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#F9D47E" name="Complaints" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Time Saved
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{timeSaved} hours</div>
            <p className="text-xs text-muted-foreground">
              Estimated time saved this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Revenue Growth
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{revenueGrowth}%</div>
            <p className="text-xs text-muted-foreground">
              Increase in revenue this quarter
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

