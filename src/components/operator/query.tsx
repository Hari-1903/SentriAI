"use client";

import { useState } from "react";
import ReportComponent from "@/components/ReportComponent";
import { useToast } from "@/components/ui/use-toast"
import ChatComponent from "@/components/chatcomponent";
import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from "@/lib/utils"

const Query = () => {
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
      className="bg-[#F6F5FC]"
    >
      <motion.main
        variants={fadeIn()}
        className="container mx-auto"
      >
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

export default Query;

