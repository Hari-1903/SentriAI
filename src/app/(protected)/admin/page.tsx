import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/admin/user-nav";
import { Analytics } from "@/components/admin/analytics";
import VectorDBpage from "@/components/admin/knowledgebase";

export default function DashboardPage() {
  return (
    <div className='flex min-h-screen flex-col bg-[#F6F5FC] transition-opacity duration-500'>
      <div className="border-b bg-[#FEFEFE]">
        <div className="flex h-16 items-center px-4 justify-between">
          <div className="flex items-center space-x-4">
            <UserNav />
            <h2 className="text-2xl font-bold tracking-tight text-[#3267FF]">Admin Dashboard</h2>
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
        <Tabs defaultValue="analytics" className="space-y-4">
          <TabsList>
            <TabsTrigger value="analytics" className="text-sm">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="knowledgeBase" className="text-sm">
              Knowledge Base
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-sm">
              Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="analytics" className="space-y-4">
            <Analytics />
          </TabsContent>
          <TabsContent value="knowledgeBase" className="space-y-4">
            <VectorDBpage />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
