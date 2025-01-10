"use client"

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/client/user-nav";
import RaiseTicket from "@/components/client/raise-ticket";
import FAQ from "@/components/client/faq";
import ScheduleCall from "@/components/client/schedule-call";
import Overview from "@/components/client/overview";
import { motion } from "framer-motion";
import { AppProvider } from "@/context/AppContext";

export default function Client() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <AppProvider>
      <div className='flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
        <header className="border-b bg-white shadow-sm">
          <div className="flex h-16 items-center px-4 justify-between">
            <div className="flex items-center space-x-4">
              <UserNav/>
              <h2 className="text-2xl font-bold tracking-tight text-[#3267FF]">Client Dashboard</h2>
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
              {["overview", "raise-ticket", "FAQ", "RequestCallback"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="text-sm px-4 py-2 rounded-md transition-all duration-200 data-[state=active]:bg-[#3267FF] data-[state=active]:text-white"
                >
                  {tab === "RequestCallback" ? "Schedule a Call" : tab.charAt(0).toUpperCase() + tab.slice(1)}
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
                  <Overview />
                </TabsContent>
                <TabsContent value="raise-ticket" className="space-y-4">
                  <RaiseTicket />
                </TabsContent>
                <TabsContent value="FAQ" className="space-y-4">
                  <FAQ />
                </TabsContent>
                <TabsContent value="RequestCallback" className="space-y-4">
                  <ScheduleCall />
                </TabsContent>
              </motion.div>
            </div>
          </Tabs>
        </main>
      </div>
    </AppProvider>
  );
}

