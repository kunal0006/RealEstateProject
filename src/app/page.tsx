"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Home as HomeIcon, DollarSign, ArrowRight, Building2, Sparkles } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import PropertyCard from "@/components/property/PropertyCard";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    router.push(`/properties${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/ui/hero_bg.png" 
            alt="Luxury Home" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Badge className="bg-accent text-white border-none px-4 py-1.5 rounded-full mb-6 font-bold tracking-widest text-xs animate-pulse">
              <Sparkles size={14} className="mr-2" /> NEW EXCLUSIVE LISTINGS
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight tracking-tighter">
              Discover Your <br />
              <span className="text-accent italic">Dream Estate</span>
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-xl leading-relaxed">
              Experience the pinnacle of luxury living with our curated collection of world-class properties.
            </p>

            {/* Glassmorphism Search Bar */}
            <div className="bg-white/10 backdrop-blur-xl p-4 rounded-[2.5rem] border border-white/20 shadow-2xl flex flex-col md:flex-row gap-4 max-w-4xl">
              <div className="flex-1 relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-accent transition-colors" size={20} />
                <Input 
                  placeholder="Search by city, neighborhood, or ZIP..." 
                  className="bg-white/5 border-none h-16 pl-14 pr-6 text-white placeholder:text-white/30 rounded-full focus-visible:ring-2 focus-visible:ring-accent/50 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="flex gap-4">
                <Link
                  href="/properties?type=BUY"
                  className="bg-white/5 px-6 flex items-center gap-3 rounded-full border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <HomeIcon className="text-accent" size={20} />
                  <span className="text-white font-medium">Buy</span>
                </Link>
                <Link
                  href="/properties?type=RENT"
                  className="bg-white/5 px-6 flex items-center gap-3 rounded-full border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <DollarSign className="text-accent" size={20} />
                  <span className="text-white font-medium">Rent</span>
                </Link>
                <Button 
                  className="bg-accent hover:bg-accent/90 text-white h-16 px-10 rounded-full font-bold text-lg shadow-xl shadow-accent/20 transition-all hover:scale-105 active:scale-95"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* Featured Properties */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Exclusive Selection</h2>
              <p className="text-3xl md:text-4xl font-bold text-primary">Featured Listings</p>
            </div>
            <Link 
              href="/properties" 
              className={cn(buttonVariants({ variant: "outline" }), "group border-primary/20 hover:border-primary/40 h-12 px-8 rounded-xl font-bold")}
            >
              Browse All Properties <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: "1",
                title: "Lakeside Contemporary Villa",
                price: 1450000,
                city: "Austin",
                locality: "Lake Austin",
                beds: 4,
                baths: 3,
                area: 3200,
                type: "BUY" as const,
                images: [{ url: "/images/properties/lakeside_villa.png" }],
                agent: { name: "Sarah Johnson", avatar: "" }
              },
              {
                id: "2",
                title: "Modern Villa with Ocean View",
                price: 1250000,
                city: "Malibu",
                locality: "Pacific Coast",
                beds: 4,
                baths: 3,
                area: 3200,
                type: "BUY" as const,
                images: [{ url: "/images/properties/modern_ocean_villa.png" }],
                agent: { name: "Emma Wilson", avatar: "" }
              },
              {
                id: "3",
                title: "Luxury Penthouse in Manhattan",
                price: 4500,
                city: "New York",
                locality: "Upper East Side",
                beds: 2,
                baths: 2,
                area: 1500,
                type: "RENT" as const,
                images: [{ url: "/images/properties/manhattan_penthouse.png" }],
                agent: { name: "Michael Chen", avatar: "" }
              }
            ].map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* City Explorer */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Neighborhood Discovery</h2>
            <p className="text-4xl md:text-5xl font-bold text-primary">Explore Popular Cities</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Austin", state: "Texas", count: "142", img: "https://images.unsplash.com/photo-1531219432768-9f540ce91ef3?auto=format&fit=crop&q=80&w=600" },
              { name: "Miami", state: "Florida", count: "98", img: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?auto=format&fit=crop&q=80&w=600" },
              { name: "New York", state: "NY", count: "215", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600" },
              { name: "Los Angeles", state: "California", count: "167", img: "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&q=80&w=600" },
            ].map((city) => (
              <Link key={city.name} href={`/properties?q=${encodeURIComponent(city.name)}`}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="relative h-96 rounded-3xl overflow-hidden group cursor-pointer"
                >
                  <Image src={city.img} alt={city.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-white font-bold text-2xl mb-1">{city.name}</p>
                        <p className="text-white/60 text-sm">{city.state}</p>
                      </div>
                      <Badge className="bg-accent text-white border-none h-10 w-10 flex items-center justify-center rounded-xl p-0">
                        <ArrowRight size={20} />
                      </Badge>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
                      <Building2 className="text-accent" size={16} />
                      <span className="text-white/80 text-xs font-bold uppercase tracking-tighter">{city.count} Listings Available</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 transform translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { label: "Active Listings", value: "2,500+" },
              { label: "Satisfied Clients", value: "12k+" },
              { label: "Expert Agents", value: "450+" },
              { label: "Years Experience", value: "15+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</p>
                <p className="text-sm font-bold uppercase tracking-widest text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-surface rounded-[3rem] p-12 md:p-24 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent to-primary" />
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-6xl font-bold text-primary mb-8 leading-tight">
                Ready to find your <br />
                <span className="text-accent italic">next home?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                Join thousands of happy homeowners who found their perfect place with EstatePremium.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white h-16 px-10 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95"
                  nativeButton={false}
                  render={<Link href="/properties" />}
                >
                  Get Started Now
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary h-16 px-10 rounded-2xl font-bold text-lg hover:bg-primary/5 transition-all"
                  nativeButton={false}
                  render={<Link href="/agent" />}
                >
                  Contact an Agent
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="/images/properties/suburban_home.png" 
                alt="Luxury Lifestyle" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
