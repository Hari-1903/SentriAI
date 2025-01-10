"use client"

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/admin/user-nav";
import { Analytics } from "@/components/admin/analytics";
import VectorDBpage from "@/components/admin/knowledgebase";
import InfoTab from "@/components/admin/info-tab";
import { motion } from "framer-motion";
import { AppProvider } from "@/context/AppContext";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("analytics");

  return (
    <AppProvider>
      <div className='flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
        <header className="border-b bg-white shadow-sm">
          <div className="flex h-16 items-center px-4 md:px-6 justify-between">
            <div className="flex items-center space-x-4">
              <UserNav/>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#3267FF]">Admin Dashboard</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button className="bg-[#F9D47E] text-black hover:bg-[#F9D47E]/90 hidden md:inline-flex">Download Report</Button>
              <Button className="bg-[#3267FF] hover:bg-[#3267FF]/90">Export Data</Button>
            </div>
          </div>
        </header>
        <main className="flex-grow p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="bg-white p-1 rounded-lg shadow-md mb-6">
              {["analytics", "knowledge-base", "info"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="text-sm px-4 py-2 rounded-md transition-all duration-200 data-[state=active]:bg-[#3267FF] data-[state=active]:text-white"
                >
                  {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </TabsTrigger>
              ))}
            </TabsList>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TabsContent value="analytics" className="space-y-4">
                <Analytics />
              </TabsContent>
              <TabsContent value="knowledge-base" className="space-y-4">
                <VectorDBpage />
              </TabsContent>
              <TabsContent value="info" className="space-y-4">
                <InfoTab />
              </TabsContent>
            </motion.div>
          </Tabs>
        </main>
      </div>
    </AppProvider>
  );
}

