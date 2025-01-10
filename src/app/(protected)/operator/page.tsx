"use client"

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/operator/user-nav";
import TicketList from "@/components/operator/ticket-list";
import Query from "@/components/operator/query";
import OperatorOverview from "@/components/operator/overview";
import ScheduledCalls from "@/components/operator/scheduled-calls";
import { motion } from "framer-motion";
import { AppProvider } from "@/context/AppContext";

export default function Operator() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <AppProvider>
      <div className='flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
        <header className="border-b bg-white shadow-sm">
          <div className="flex h-16 items-center px-4 justify-between">
            <div className="flex items-center space-x-4">
              <UserNav/>
              <h2 className="text-2xl font-bold tracking-tight text-[#3267FF]">Operator Dashboard</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button className="bg-[#F9D47E] text-black hover:bg-[#F9D47E]/90">Download</Button>
              <Button className="bg-[#3267FF] hover:bg-[#3267FF]/90">Export</Button>
            </div>
          </div>
        </header>
        <main className="flex-grow">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="bg-white p-1 rounded-lg shadow-md mx-8 mt-6">
              {["overview", "tickets", "knowledge-base", "scheduled-calls"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="text-sm px-4 py-2 rounded-md transition-all duration-200 data-[state=active]:bg-[#3267FF] data-[state=active]:text-white"
                >
                  {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="mt-6 px-8 pb-8">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TabsContent value="overview" className="space-y-4">
                  <OperatorOverview />
                </TabsContent>
                <TabsContent value="tickets" className="space-y-4">
                  <TicketList />
                </TabsContent>
                <TabsContent value="knowledge-base" className="space-y-4">
                  <Query />
                </TabsContent>
                <TabsContent value="scheduled-calls" className="space-y-4">
                  <ScheduledCalls />
                </TabsContent>
              </motion.div>
            </div>
          </Tabs>
        </main>
      </div>
    </AppProvider>
  );
}

