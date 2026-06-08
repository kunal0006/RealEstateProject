"use client";

import Image from "next/image";

import { 
  Users, 
  Building2, 
  DollarSign, 
  ShieldCheck, 
  Search,
  Filter,
  ArrowUpRight,
  UserCheck,
  UserX,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockPlatformStats = [
  { label: "Total Users", value: "2,450", trend: "+12%", icon: Users, color: "text-blue-600" },
  { label: "Total Revenue", value: "$45,200", trend: "+8.5%", icon: DollarSign, color: "text-green-600" },
  { label: "Active Listings", value: "842", trend: "+24%", icon: Building2, color: "text-purple-600" },
  { label: "Admin Actions", value: "156", trend: "-2%", icon: ShieldCheck, color: "text-orange-600" },
];

const mockUsers = [
  { id: "1", name: "Sarah Johnson", email: "sarah.j@example.com", role: "AGENT", status: "VERIFIED", joined: "2024-01-15" },
  { id: "2", name: "Robert Fox", email: "robert.f@example.com", role: "BUYER", status: "ACTIVE", joined: "2024-02-10" },
  { id: "3", name: "Emma Wilson", email: "emma.w@example.com", role: "AGENT", status: "PENDING", joined: "2024-04-05" },
  { id: "4", name: "David Miller", email: "david.m@example.com", role: "BUYER", status: "BANNED", joined: "2023-11-20" },
];

export default function AdminPanel() {
  return (
    <div className="bg-surface min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-primary tracking-tight">System Administration</h1>
            <p className="text-muted-foreground">Global platform monitoring and management.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="h-12 rounded-xl">Generate Report</Button>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-12">System Settings</Button>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {mockPlatformStats.map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm overflow-hidden group">
              <CardContent className="p-6 relative">
                <div className="flex justify-between items-start">
                  <div className={`p-2 rounded-lg bg-surface ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                  <Badge className="bg-green-500/10 text-green-600 border-none text-[10px]">
                    {stat.trend} <ArrowUpRight size={10} className="ml-1" />
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="users" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              User Management
            </TabsTrigger>
            <TabsTrigger value="listings" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Moderation Queue
            </TabsTrigger>
            <TabsTrigger value="revenue" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Revenue & Plans
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader className="bg-white border-b border-muted/50 flex flex-col md:flex-row md:items-center justify-between gap-4 py-6">
                <div>
                  <CardTitle className="text-lg">Platform Users</CardTitle>
                  <CardDescription>Search, manage roles, and monitor user activity.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input placeholder="Search users..." className="pl-10 h-10 w-[240px] border-muted bg-surface" />
                  </div>
                  <Button variant="outline" size="icon" className="border-muted"><Filter size={16} /></Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-surface text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Joined</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-muted/50 text-sm">
                      {mockUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-surface/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-primary/5 text-primary text-xs">{user.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-bold text-primary">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="outline" className="font-bold text-[10px] border-muted">
                              {user.role}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className={`h-1.5 w-1.5 rounded-full ${
                                user.status === "VERIFIED" || user.status === "ACTIVE" ? "bg-green-500" :
                                user.status === "PENDING" ? "bg-orange-500" : "bg-red-500"
                              }`} />
                              <span className="font-medium text-xs">{user.status}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">{user.joined}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:bg-green-50">
                                <UserCheck size={16} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50">
                                <UserX size={16} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="listings">
            <div className="space-y-6">
              {[1, 2].map((item) => (
                <Card key={item} className="border-none shadow-sm overflow-hidden flex flex-col md:flex-row">
                  <div className="relative h-48 md:h-auto md:w-64 shrink-0">
                    <Image 
                      src="/images/properties/lakeside_villa.png" 
                      alt="Listing" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xl font-bold">Lakeside Contemporary Villa</h4>
                        <Badge className="bg-orange-500/10 text-orange-600 border-none">PENDING APPROVAL</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Posted by <span className="text-primary font-medium underline">Sarah Johnson</span> • 3 hours ago</p>
                      <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        <span>Austin, TX</span>
                        <span>$1,450,000</span>
                        <span>4 Beds • 3 Baths</span>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 h-10 px-6 rounded-lg">
                        <CheckCircle2 size={16} /> Approve Listing
                      </Button>
                      <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 gap-2 h-10 px-6 rounded-lg">
                        <XCircle size={16} /> Reject
                      </Button>
                      <Button variant="ghost" className="text-muted-foreground gap-2 h-10 px-6 rounded-lg ml-auto">
                        <AlertCircle size={16} /> Flag for Review
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
