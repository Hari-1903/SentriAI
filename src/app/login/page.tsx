"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
  const [role, setRole] = useState("client");
  const [inputs, setInputs] = useState<Inputs>({})
  const router = useRouter(); // Initialize the router

  interface Inputs {
    email?: string;
    password?: string;
    operatorId?: string;
    operatorPassword?: string;
    adminUsername?: string;
    adminPassword?: string;
  }

  interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleInputChange = (e: InputChangeEvent) => {
    const { id, value } = e.target;
    setInputs((prev: Inputs) => ({ ...prev, [id]: value }));
  };

  const isFormValid = () => {
    if (role === "client") {
      return inputs.email?.trim() && inputs.password?.trim();
    }
    if (role === "operator") {
      return inputs.operatorId?.trim() && inputs.operatorPassword?.trim();
    }
    if (role === "admin") {
      return inputs.adminUsername?.trim() && inputs.adminPassword?.trim();
    }
    return false;
  };

  const handleLogin = () => {
    if (role === "client") {
      router.push("/client");
    } else if (role === "operator") {
      router.push("/operator");
    } else if (role === "admin") {
      router.push("/admin");
    }
  };

  const renderLoginFields = () => {
    if (role === "client") {
      return (
        <>
          <div className="space-y-2">
            <Label htmlFor="email">Email Id</Label>
            <Input
              id="email"
              placeholder="Example@email.com"
              type="email"
              value={inputs.email || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              value={inputs.password || ""}
              onChange={handleInputChange}
              required
            />
          </div>
        </>
      );
    } else if (role === "operator") {
      return (
        <>
          <div className="space-y-2">
            <Label htmlFor="operatorId">Operator ID</Label>
            <Input
              id="operatorId"
              placeholder="Enter your ID"
              value={inputs.operatorId || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="operatorPassword">Password</Label>
            <Input
              id="operatorPassword"
              type="password"
              placeholder="Enter your password"
              value={inputs.operatorPassword || ""}
              onChange={handleInputChange}
              required
            />
          </div>
        </>
      );
    } else if (role === "admin") {
      return (
        <>
          <div className="space-y-2">
            <Label htmlFor="adminUsername">Admin Id</Label>
            <Input
              id="adminUsername"
              placeholder="Enter your username"
              value={inputs.adminUsername || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="adminPassword">Password</Label>
            <Input
              id="adminPassword"
              type="password"
              placeholder="Enter your password"
              value={inputs.adminPassword || ""}
              onChange={handleInputChange}
              required
            />
          </div>
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[900px]"
      >
        <Card className="grid lg:grid-cols-2 overflow-hidden shadow-slate-400/50">
          <div className="p-12 flex flex-col justify-center space-y-6">
            <div className="space-y-2 flex justify-center items-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome Back to SentriAI
              </h1>
            </div>

            <Tabs
              defaultValue="client"
              onValueChange={setRole}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="client">Client</TabsTrigger>
                <TabsTrigger value="operator">Operator</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-4">
              {renderLoginFields()}
              <div className="text-right">
                <Button
                  variant="link"
                  className="text-sm text-[#3267FF] p-0 h-auto font-normal"
                >
                  Forgot Password?
                </Button>
              </div>
              <Button
                className="w-full bg-[#1a1a1a] hover:bg-[#1a1a1a]/90 text-white"
                onClick={handleLogin}
                disabled={!isFormValid()}
              >
                Sign in as {role.charAt(0).toUpperCase() + role.slice(1)}
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block bg-slate-400">
            <Image
              src="/login.jpg"
              alt="animated image of a team working together"
              fill
              className="object-cover"
              priority
            />
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
