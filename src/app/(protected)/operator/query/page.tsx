"use client";

import { useState } from "react";
import { MainNav } from "@/components/operator/nav-bar"
import { UserNav } from "@/components/operator/user-nav"
import ReportComponent from "@/components/ReportComponent";
import { useToast } from "@/components/ui/use-toast"
import ChatComponent from "@/components/chatcomponent";
import  Image  from "next/image";

const Home = () => {
  const { toast } = useToast()

  const [reportData, setreportData] = useState("");
  const onReportConfirmation = (data: string) => {
    setreportData(data);
    toast({
      description: "Updated!"
    });
  }

  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        <div className="border-b bg-[#FEFEFE]">
          <div className="flex h-16 items-center px-4">
            <div className="flex items-center space-x-4">
              <UserNav />
            </div>
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Image src="/logo.png" alt="search" width={110} height={110} />
            </div>
          </div>
        </div>
        <main className="grid flex-1 gap-4 overflow-auto p-4
        md:grid-cols-2
        lg:grid-cols-3"
        >
          <div
            className="hidden md:flex flex-col"
          >
            <ReportComponent onReportConfirmation={onReportConfirmation} />
          </div>
          <div
            className="lg:col-span-2"
          >
            <ChatComponent reportData={reportData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
