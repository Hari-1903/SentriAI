import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Users, CreditCard, Activity } from "lucide-react";
import { UserNav } from "@/components/admin/user-nav";
import { MainNav } from "@/components/admin/main-nav";
import { Overview } from "@/components/admin/overview";
import VectorDBPage from "@/components/admin/knowledgebase";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className='flex min-h-screen flex-col bg-[#F6F5FC] transition-opacity duration-500'>
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
      <div className="flex-1 space-y-4 p-8 pt-6 pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-[#3267FF]">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button className="bg-[#F9D47E] text-black hover:bg-[#F9D47E]/90">Download</Button>
            <Button className="bg-[#3267FF] hover:bg-[#3267FF]/90">Export</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview" className="text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-sm">
              Reports
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-sm">
              Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Subscriptions
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2,350</div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Now
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardContent>
                  <VectorDBPage />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
