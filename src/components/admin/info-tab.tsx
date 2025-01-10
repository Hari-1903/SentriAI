"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, HardDrive, Phone, AlertTriangle, Server, Users } from 'lucide-react';

export default function InfoTab() {
  // These values would typically come from your backend or a context
  const storageUsed = 75; // GB
  const storageLimit = 100; // GB
  const apiCalls = 8500;
  const apiCallLimit = 10000;
  const securityStatus = "Good";
  const lastSecurityScan = "2023-06-15";
  const activeUsers = 1250;
  const totalUsers = 1500;

  return (
    <div className="space-y-4 md:space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:gap-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <HardDrive className="h-6 w-6 text-blue-500" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Storage Usage
              </p>
              <p className="text-sm text-muted-foreground">
                {storageUsed} GB / {storageLimit} GB
              </p>
            </div>
            <Progress
              value={(storageUsed / storageLimit) * 100}
              className="w-full md:w-[60%]"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <Phone className="h-6 w-6 text-green-500" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                API Calls
              </p>
              <p className="text-sm text-muted-foreground">
                {apiCalls} / {apiCallLimit}
              </p>
            </div>
            <Progress
              value={(apiCalls / apiCallLimit) * 100}
              className="w-full md:w-[60%]"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Shield className="h-6 w-6 text-yellow-500" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Security Status
              </p>
              <p className="text-sm text-muted-foreground">
                {securityStatus}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Last Security Scan
              </p>
              <p className="text-sm text-muted-foreground">
                {lastSecurityScan}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Server Status</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:gap-6">
            <div className="flex items-center space-x-4">
              <Server className="h-6 w-6 text-purple-500" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Server Uptime
                </p>
                <p className="text-sm text-muted-foreground">
                  99.99%
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <Users className="h-6 w-6 text-indigo-500" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Active Users
                </p>
                <p className="text-sm text-muted-foreground">
                  {activeUsers} / {totalUsers}
                </p>
              </div>
              <Progress
                value={(activeUsers / totalUsers) * 100}
                className="w-full md:w-[60%]"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:gap-6">
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <p className="text-sm font-medium">Database: Healthy</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <p className="text-sm font-medium">API: Operational</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <p className="text-sm font-medium">Cache: Warning</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <p className="text-sm font-medium">CDN: Operational</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

