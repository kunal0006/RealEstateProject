"use client";

import { 
  Plus, 
  BarChart3, 
  Users, 
  Building2, 
  Heart, 
  ChevronRight,
  MoreVertical,
  Edit,
  Trash2,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockStats = [
  { label: "Active Listings", value: "8", icon: Building2, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Total Views", value: "1,240", icon: BarChart3, color: "text-purple-500", bg: "bg-purple-50" },
  { label: "New Leads", value: "12", icon: Users, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Favorites", value: "84", icon: Heart, color: "text-red-500", bg: "bg-red-50" },
];

const mockAgentListings = [
  {
    id: "1",
    title: "Modern Villa with Ocean View",
    price: 1250000,
    status: "ACTIVE",
    views: 450,
    inquiries: 8,
    date: "2024-04-10",
    image: "/images/properties/modern_ocean_villa.png",
  },
  {
    id: "2",
    title: "Contemporary Suburban Home",
    price: 850000,
    status: "PENDING",
    views: 280,
    inquiries: 3,
    date: "2024-04-15",
    image: "/images/properties/suburban_home.png",
  },
  {
    id: "3",
    title: "Minimalist City Apartment",
    price: 650000,
    status: "SOLD",
    views: 512,
    inquiries: 15,
    date: "2024-03-20",
    image: "/images/properties/chic_loft.png",
  },
];

export default function AgentDashboard() {
  return (
    <div className="bg-surface min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-primary tracking-tight">Agent Dashboard</h1>
            <p className="text-muted-foreground">Manage your properties and leads in one place.</p>
          </div>
          <Button className="bg-accent hover:bg-accent/90 text-white rounded-xl h-12 px-6">
            <Plus className="mr-2" size={18} /> Create New Listing
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {mockStats.map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="listings" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              My Listings
            </TabsTrigger>
            <TabsTrigger value="leads" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Recent Leads
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="space-y-6">
            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-white border-b border-muted/50">
                <CardTitle className="text-lg">Recent Listings</CardTitle>
                <CardDescription>View and manage your active and past property listings.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-surface text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <th className="px-6 py-4">Property</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Stats</th>
                        <th className="px-6 py-4">Added</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-muted/50">
                      {mockAgentListings.map((listing) => (
                        <tr key={listing.id} className="hover:bg-surface/50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
                                <Image src={listing.image} alt={listing.title} fill className="object-cover" />
                              </div>
                              <span className="font-bold text-primary line-clamp-1">{listing.title}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium">${listing.price.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <Badge className={`${
                              listing.status === "ACTIVE" ? "bg-green-500/10 text-green-600" :
                              listing.status === "PENDING" ? "bg-orange-500/10 text-orange-600" :
                              "bg-blue-500/10 text-blue-600"
                            } border-none font-bold text-[10px]`}>
                              {listing.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><BarChart3 size={12} /> {listing.views} Views</span>
                              <span className="flex items-center gap-1"><Users size={12} /> {listing.inquiries} Leads</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{listing.date}</td>
                          <td className="px-6 py-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <Button variant="ghost" size="icon" className="rounded-full group-hover:bg-white group-hover:shadow-sm">
                                  <MoreVertical size={18} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem>
                                  <Edit size={14} className="mr-2" /> Edit Listing
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <ExternalLink size={14} className="mr-2" /> View Public
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 size={14} className="mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((lead) => (
                <Card key={lead} className="border-none shadow-sm hover:shadow-md transition-all group">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold">
                          JD
                        </div>
                        <div>
                          <h4 className="font-bold">John Doe</h4>
                          <p className="text-xs text-muted-foreground">j.doe@example.com</p>
                        </div>
                      </div>
                      <Badge className="bg-accent text-white border-none text-[10px]">NEW</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 bg-surface p-3 rounded-lg italic">
                      "Hi Sarah, I'm very interested in the Modern Villa. Can we schedule a visit this Saturday at 2 PM?"
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">2 hours ago</span>
                      <Button variant="link" className="text-accent h-auto p-0 font-bold group-hover:underline">
                        Reply Now <ChevronRight size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
