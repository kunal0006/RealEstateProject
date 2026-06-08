"use client";

import { useState } from "react";
import { Grid, List, Map as MapIcon, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PropertyCard from "@/components/property/PropertyCard";
import SearchFilters from "@/components/search/SearchFilters";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const mockProperties = [
  {
    id: "1",
    title: "Modern Villa with Ocean View",
    price: 1250000,
    type: "BUY" as const,
    beds: 4,
    baths: 3,
    area: 3200,
    city: "Malibu",
    locality: "Pacific Coast",
    images: [{ url: "/images/properties/modern_ocean_villa.png" }],
    agent: { name: "Sarah Johnson", avatar: "" },
  },
  {
    id: "2",
    title: "Luxury Penthouse in Manhattan",
    price: 4500,
    type: "RENT" as const,
    beds: 2,
    baths: 2,
    area: 1500,
    city: "New York",
    locality: "Upper East Side",
    images: [{ url: "/images/properties/manhattan_penthouse.png" }],
    agent: { name: "Michael Chen", avatar: "" },
  },
  {
    id: "3",
    title: "Contemporary Suburban Home",
    price: 850000,
    type: "BUY" as const,
    beds: 3,
    baths: 2,
    area: 2400,
    city: "Austin",
    locality: "West Lake Hills",
    images: [{ url: "/images/properties/suburban_home.png" }],
    agent: { name: "Emma Wilson", avatar: "" },
  },
  {
    id: "4",
    title: "Chic Loft in Downtown LA",
    price: 3200,
    type: "RENT" as const,
    beds: 1,
    baths: 1,
    area: 950,
    city: "Los Angeles",
    locality: "Arts District",
    images: [{ url: "/images/properties/chic_loft.png" }],
    agent: { name: "David Miller", avatar: "" },
  },
  {
    id: "5",
    title: "Mountain Retreat",
    price: 975000,
    type: "BUY" as const,
    beds: 3,
    baths: 3,
    area: 2800,
    city: "Aspen",
    locality: "Snowmass",
    images: [{ url: "/images/properties/mountain_retreat.png" }],
    agent: { name: "Robert Fox", avatar: "" },
  },
  {
    id: "6",
    title: "Sleek Industrial Studio",
    price: 2800,
    type: "RENT" as const,
    beds: 0,
    baths: 1,
    area: 750,
    city: "Chicago",
    locality: "West Loop",
    images: [{ url: "/images/properties/industrial_studio.png" }],
    agent: { name: "Lisa Park", avatar: "" },
  },
];

export default function PropertiesPage() {
  const [view, setView] = useState<"grid" | "list" | "map">("grid");

  return (
    <div className="bg-surface min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-80 shrink-0">
            <SearchFilters />
          </aside>

          {/* Main Content */}
          <main className="flex-grow">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-4 rounded-2xl border border-muted/50">
              <div>
                <h1 className="text-2xl font-bold text-primary">Properties</h1>
                <p className="text-sm text-muted-foreground">Found {mockProperties.length} results</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2 bg-muted/30 p-1 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`px-3 h-8 rounded-md ${view === "grid" ? "bg-background text-foreground shadow-sm hover:bg-background" : ""}`}
                    onClick={() => setView("grid")}
                  >
                    <Grid size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`px-3 h-8 rounded-md ${view === "list" ? "bg-background text-foreground shadow-sm hover:bg-background" : ""}`}
                    onClick={() => setView("list")}
                  >
                    <List size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`px-3 h-8 rounded-md ${view === "map" ? "bg-background text-foreground shadow-sm hover:bg-background" : ""}`}
                    onClick={() => setView("map")}
                  >
                    <MapIcon size={16} />
                  </Button>
                </div>

                <Select defaultValue="newest">
                  <SelectTrigger className="w-[160px] h-10 border-muted">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="area">Largest Area</SelectItem>
                  </SelectContent>
                </Select>

                <Sheet>
                  <SheetTrigger className="lg:hidden h-10 px-4 border border-muted rounded-md flex items-center hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent text-sm font-medium">
                    <SlidersHorizontal className="mr-2" size={16} /> Filters
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0 overflow-y-auto">
                    <SearchFilters />
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
              {mockProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled className="h-10 px-4">Previous</Button>
                <Button variant="outline" className="h-10 w-10 p-0 bg-accent text-white border-accent">1</Button>
                <Button variant="outline" className="h-10 w-10 p-0 hover:border-accent hover:text-accent">2</Button>
                <Button variant="outline" className="h-10 w-10 p-0 hover:border-accent hover:text-accent">3</Button>
                <span className="px-2">...</span>
                <Button variant="outline" className="h-10 w-10 p-0 hover:border-accent hover:text-accent">12</Button>
                <Button variant="outline" className="h-10 px-4 hover:border-accent hover:text-accent">Next</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
