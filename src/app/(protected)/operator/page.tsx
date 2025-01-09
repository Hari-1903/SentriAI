import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/operator/user-nav";
import TicketList from "@/components/operator/ticket-list";
import Query from "@/components/operator/query";

export default function Operator() {
  return (
    <div className='flex min-h-screen flex-col bg-[#F6F5FC] transition-opacity duration-500'>
      <div className="border-b bg-[#FEFEFE]">
        <div className="flex h-16 items-center px-4 justify-between">
          <div className="flex items-center space-x-4">
            <UserNav/>
            <h2 className="text-2xl font-bold tracking-tight text-[#3267FF]">Operator Dashboard</h2>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button className="bg-[#F9D47E] text-black hover:bg-[#F9D47E]/90">Download</Button>
              <Button className="bg-[#3267FF] hover:bg-[#3267FF]/90">Export</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6 pb-3">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview" className="text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="raise-ticket" className="text-sm">
              Tickets
            </TabsTrigger>
            <TabsTrigger value="FAQ" className="text-sm">
              Knowledge Base
            </TabsTrigger>
            <TabsTrigger value="RequestCallback" className="text-sm">
              Scheduled Callbacks
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
          </TabsContent>
          <TabsContent value="raise-ticket" className="space-y-4">
            <TicketList />
          </TabsContent>
          <TabsContent value="FAQ" className="space-y-4">
            <Query />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
