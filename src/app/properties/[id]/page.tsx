"use client";

import Image from "next/image";
import { 
  Bed, 
  Bath, 
  Move, 
  MapPin, 
  Calendar, 
  Share2, 
  Heart, 
  CheckCircle2, 
  Phone, 
  Mail,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import MortgageCalculator from "@/components/property/MortgageCalculator";
import Link from "next/link";
import { motion } from "framer-motion";

const mockProperty = {
  id: "1",
  title: "Modern Villa with Ocean View",
  description: `This stunning modern villa offers unparalleled luxury and breathtaking ocean views. 
  Featuring 4 spacious bedrooms, 3 designer bathrooms, and an open-concept living area that 
  seamlessly blends indoor and outdoor spaces. The gourmet kitchen is equipped with top-of-the-line 
  Sub-Zero and Wolf appliances, while the master suite boasts a private balcony and a spa-like 
  ensuite. Outdoor amenities include an infinity pool, a built-in BBQ station, and lush 
  landscaping. Experience the pinnacle of coastal living in this architectural masterpiece.`,
  price: 1250000,
  type: "BUY" as const,
  beds: 4,
  baths: 3,
  area: 3200,
  city: "Malibu",
  locality: "Pacific Coast",
  zipCode: "90265",
  yearBuilt: 2022,
  floor: 2,
  parking: true,
  furnished: true,
  status: "ACTIVE",
  images: [
    { url: "/images/properties/modern_ocean_villa.png" },
    { url: "/images/properties/lakeside_villa.png" },
    { url: "/images/properties/suburban_home.png" },
  ],
  amenities: [
    "Infinity Pool", "Ocean View", "Smart Home System", "Wine Cellar", 
    "Private Gym", "24/7 Security", "Chef's Kitchen", "Solar Panels"
  ],
  agent: {
    name: "Sarah Johnson",
    role: "Senior Real Estate Expert",
    phone: "+1 (555) 123-4567",
    email: "sarah.j@estatepremium.com",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  }
};

export default function PropertyDetailPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" className="mb-4 hover:text-accent" nativeButton={false} render={<Link href="/properties" />}>
          <ArrowLeft className="mr-2" size={18} /> Back to Search
        </Button>
      </div>

      {/* Image Gallery */}
      <section className="container mx-auto px-4 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px]">
          <div className="md:col-span-2 relative rounded-2xl overflow-hidden group">
            <Image
              src={mockProperty.images[0].url}
              alt={mockProperty.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <div className="relative rounded-2xl overflow-hidden group">
              <Image
                src={mockProperty.images[1].url}
                alt={mockProperty.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden group">
              <Image
                src={mockProperty.images[2].url}
                alt={mockProperty.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                  View All Photos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Info */}
          <div className="lg:w-2/3 space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Badge className="bg-accent text-white border-none uppercase px-3 py-1 text-xs tracking-wider">
                    {mockProperty.type === "BUY" ? "For Sale" : "For Rent"}
                  </Badge>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Calendar size={14} className="mr-1" />
                    Built in {mockProperty.yearBuilt}
                  </div>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">
                  {mockProperty.title}
                </h1>
                <div className="flex items-center text-muted-foreground">
                  <MapPin size={18} className="mr-1 text-accent" />
                  {mockProperty.locality}, {mockProperty.city}, {mockProperty.zipCode}
                </div>
              </div>
              <div className="text-left md:text-right">
                <p className="text-3xl md:text-4xl font-bold text-accent">
                  ${mockProperty.price.toLocaleString()}
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <Button variant="outline" size="icon" className="rounded-full border-muted hover:border-accent hover:text-accent">
                    <Heart size={20} />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-muted hover:border-accent hover:text-accent">
                    <Share2 size={20} />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-surface p-8 rounded-3xl">
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase font-bold tracking-widest">Bedrooms</p>
                <div className="flex items-center gap-2 text-xl font-bold">
                  <Bed className="text-accent" /> {mockProperty.beds}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase font-bold tracking-widest">Bathrooms</p>
                <div className="flex items-center gap-2 text-xl font-bold">
                  <Bath className="text-accent" /> {mockProperty.baths}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase font-bold tracking-widest">Total Area</p>
                <div className="flex items-center gap-2 text-xl font-bold">
                  <Move className="text-accent" /> {mockProperty.area} <span className="text-sm font-normal">sqft</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase font-bold tracking-widest">Parking</p>
                <div className="flex items-center gap-2 text-xl font-bold">
                  <CheckCircle2 className="text-accent" /> {mockProperty.parking ? "Available" : "No"}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">About this property</h3>
              <p className="text-muted-foreground leading-relaxed">
                {mockProperty.description}
              </p>
            </div>

            <Separator />

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mockProperty.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Map Placeholder */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">Location</h3>
              <div className="h-[400px] w-full bg-surface rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                  <div className="text-center">
                    <MapPin size={40} className="text-accent mx-auto mb-2 opacity-50" />
                    <p className="text-muted-foreground font-medium">Map View (Mapbox Integration)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            {/* Agent Contact */}
            <Card className="border-none shadow-xl overflow-hidden sticky top-24">
              <div className="bg-primary p-6 text-white flex items-center gap-4">
                <Image
                  src={mockProperty.agent.avatar}
                  alt={mockProperty.agent.name}
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-accent"
                />
                <div>
                  <h4 className="font-bold text-lg">{mockProperty.agent.name}</h4>
                  <p className="text-white/60 text-xs uppercase tracking-wider">{mockProperty.agent.role}</p>
                </div>
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone size={16} className="text-accent" /> {mockProperty.agent.phone}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail size={16} className="text-accent" /> {mockProperty.agent.email}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h5 className="font-bold">Inquire about this property</h5>
                  <div className="space-y-3">
                    <Input placeholder="Full Name" className="bg-surface border-none h-11" />
                    <Input placeholder="Email Address" type="email" className="bg-surface border-none h-11" />
                    <Input placeholder="Phone Number" className="bg-surface border-none h-11" />
                    <Textarea placeholder="Message" className="bg-surface border-none min-h-[120px] resize-none" />
                    <Button className="w-full bg-accent hover:bg-accent/90 text-white h-12 rounded-xl mt-2">
                      Send Inquiry
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <MortgageCalculator price={mockProperty.price} />
          </div>
        </div>
      </div>
    </div>
  );
}
