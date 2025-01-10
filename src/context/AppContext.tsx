import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Complaint, ComplaintStatus } from "@/types/complaint";

interface ScheduledCall {
  name: string;
  email: string;
  date: Date;
  time: string;
  reason: string;
}

interface AppContextType {
  complaints: Complaint[];
  addComplaint: (complaint: Complaint) => void;
  updateComplaintStatus: (id: string, status: string) => void;
  scheduledCalls: ScheduledCall[];
  addScheduledCall: (call: ScheduledCall) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: "TASK-0012",
      title: "Login page not loading",
      details: "Unable to access the login page on the company portal.",
      type: "Bug",
      status: "open",
      priority: "high",
      createdAt: "2024-01-03T08:30:00Z",
      updatedAt: "2024-01-03T08:30:00Z"
    },
    {
      id: "TASK-0025",
      title: "Delayed invoice generation",
      details: "Invoices are not being generated automatically after transaction completion.",
      type: "Feature",
      status: "pending",
      priority: "medium",
      createdAt: "2024-01-01T12:15:00Z",
      updatedAt: "2024-01-02T09:00:00Z"
    },
    {
      id: "TASK-0047",
      title: "Incorrect data displayed on dashboard",
      details: "The analytics dashboard is showing outdated statistics for Q4 performance.",
      type: "Bug",
      status: "open",
      priority: "high",
      createdAt: "2024-01-03T11:45:00Z",
      updatedAt: "2024-01-03T11:45:00Z"
    },
    {
      id: "TASK-0098",
      title: "Add export option for reports",
      details: "Request to include an option to export data reports in CSV format.",
      type: "Feature",
      status: "completed",
      priority: "low",
      createdAt: "2023-12-30T14:20:00Z",
      updatedAt: "2024-01-01T16:00:00Z"
    },
    {
      id: "TASK-0132",
      title: "App crashes intermittently",
      details: "The mobile app crashes occasionally when uploading large files.",
      type: "Bug",
      status: "in_progress",
      priority: "high",
      createdAt: "2024-01-02T18:00:00Z",
      updatedAt: "2024-01-03T09:30:00Z"
    },
    {
      id: "TASK-0148",
      title: "Request for multilingual support",
      details: "Suggestion to add Spanish and French language support to the platform.",
      type: "Feature",
      status: "completed",
      priority: "medium",
      createdAt: "2024-01-01T10:40:00Z",
      updatedAt: "2024-01-02T08:00:00Z"
    },
    {
      id: "TASK-0175",
      title: "Slow response from chatbot",
      details: "The chatbot takes too long to respond to user queries during peak hours.",
      type: "Bug",
      status: "open",
      priority: "high",
      createdAt: "2024-01-02T13:10:00Z",
      updatedAt: "2024-01-02T13:10:00Z"
    },
    {
      id: "TASK-0204",
      title: "Request for dark mode feature",
      details: "Many users have requested the inclusion of a dark mode theme in the UI.",
      type: "Bug",
      status: "completed",
      priority: "low",
      createdAt: "2024-01-02T08:50:00Z",
      updatedAt: "2024-01-02T10:30:00Z"
    },
    {
      id: "TASK-0239",
      title: "Email notifications not working",
      details: "System is not sending email notifications for ticket updates.",
      type: "Bug",
      status: "open",
      priority: "medium",
      createdAt: "2024-01-01T09:25:00Z",
      updatedAt: "2024-01-01T09:25:00Z"
    },
    {
      id: "TASK-0301",
      title: "Include analytics for individual agents",
      details: "Request to add performance analytics for individual agents in the reports.",
      type: "Feature",
      status: "open",
      priority: "medium",
      createdAt: "2024-01-02T11:00:00Z",
      updatedAt: "2024-01-02T11:00:00Z"
    }    
  ]);

  const [scheduledCalls, setScheduledCalls] = useState<ScheduledCall[]>([
    {
      name: "John Doe",
      email: "john@example.com",
      date: new Date("2024-01-15T10:00:00Z"),
      time: "10:00 AM",
      reason: "Discuss security upgrade"
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      date: new Date("2024-01-16T14:00:00Z"),
      time: "02:00 PM",
      reason: "Review recent alerts"
    },
    {
      name: "Steve Rogers",
      email: "Steve@example.com",
      date: new Date("2024-01-16T14:00:00Z"),
      time: "08:30 PM",
      reason: "Demo new features"
    },
  ]);

  const addComplaint = (complaint: Complaint) => {
    setComplaints(prevComplaints => [...prevComplaints, complaint]);
  };

  const updateComplaintStatus = (id: string, status: string) => {
    setComplaints(prevComplaints =>
      prevComplaints.map(complaint =>
        complaint.id === id ? { ...complaint, status: status as ComplaintStatus, updatedAt: new Date().toISOString() } : complaint
      )
    );
  };

  const addScheduledCall = (call: ScheduledCall) => {
    setScheduledCalls(prevCalls => [...prevCalls, call]);
  };

  return (
    <AppContext.Provider value={{ complaints, addComplaint, updateComplaintStatus, scheduledCalls, addScheduledCall }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

