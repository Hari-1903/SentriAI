"use client";

import { useState } from "react";
import { MainNav } from "@/components/operator/nav-bar"
import { UserNav } from "@/components/operator/user-nav"
import ReportComponent from "@/components/ReportComponent";
import { useToast } from "@/components/ui/use-toast"
import ChatComponent from "@/components/chatcomponent";
import Image from "next/image";
import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from "@/lib/utils"

const Home = () => {
  const { toast } = useToast()

  const [reportData, setReportData] = useState("");
  const onReportConfirmation = (data: string) => {
    setReportData(data);
    toast({
      description: "Report data updated successfully!"
    });
  }

  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-[#F6F5FC]"
    >
      <header className="border-b bg-[#FEFEFE] sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center px-4">
          <UserNav />
          <MainNav className="mx-6" />
          <div className="ml-auto">
            <Image src="/logo.png" alt="SentriAi Logo" width={110} height={110} />
          </div>
        </div>
      </header>
      <motion.main
        variants={fadeIn()}
        className="container mx-auto py-8 px-4"
      >
        <h1 className="text-3xl font-bold text-[#3267FF] mb-6">Query Dashboard</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            variants={fadeIn("right")}
            className="lg:col-span-1"
          >
            <ReportComponent onReportConfirmation={onReportConfirmation} />
          </motion.div>
          <motion.div
            variants={fadeIn("left")}
            className="md:col-span-2"
          >
            <ChatComponent reportData={reportData} />
          </motion.div>
        </div>
      </motion.main>
    </motion.div>
  );
};

export default Home;

