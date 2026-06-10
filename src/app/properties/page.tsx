"use client";

import { useState, useMemo, useCallback } from "react";
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
import SearchFilters, { FilterState, DEFAULT_FILTERS } from "@/components/search/SearchFilters";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import dynamic from "next/dynamic";

const PropertyMap = dynamic(() => import("@/components/property/PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-2xl bg-muted/10 animate-pulse flex items-center justify-center border border-muted/50">
      <span className="text-muted-foreground text-sm font-medium">Loading Map...</span>
    </div>
  ),
});

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

const ITEMS_PER_PAGE = 4;

export default function PropertiesPage() {
  const [view, setView] = useState<"grid" | "list" | "map">("grid");
  const [filters, setFilters] = useState<FilterState>({ ...DEFAULT_FILTERS });
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter properties
  const filteredProperties = useMemo(() => {
    let results = [...mockProperties];

    // Filter by type
    if (filters.type && filters.type !== "all") {
      results = results.filter((p) => p.type === filters.type);
    }

    // Filter by price range
    results = results.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Filter by beds
    if (filters.beds && filters.beds !== "Any") {
      const bedCount = filters.beds === "4+" ? 4 : parseInt(filters.beds, 10);
      if (filters.beds === "4+") {
        results = results.filter((p) => p.beds >= bedCount);
      } else {
        results = results.filter((p) => p.beds === bedCount);
      }
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        results.sort((a, b) => b.price - a.price);
        break;
      case "area":
        results.sort((a, b) => b.area - a.area);
        break;
      case "newest":
      default:
        // Keep original order (newest)
        break;
    }

    return results;
  }, [filters, sortBy]);

  // Paginate
  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / ITEMS_PER_PAGE));
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProperties.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProperties, currentPage]);

  const handleApplyFilters = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setMobileFiltersOpen(false);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({ ...DEFAULT_FILTERS });
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((value: string | null) => {
    if (value) {
      setSortBy(value);
      setCurrentPage(1);
    }
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Pagination range helper
  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="bg-surface min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-80 shrink-0">
            <SearchFilters
              filters={filters}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-grow">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-4 rounded-2xl border border-muted/50">
              <div>
                <h1 className="text-2xl font-bold text-primary">Properties</h1>
                <p className="text-sm text-muted-foreground">
                  Found {filteredProperties.length} result{filteredProperties.length !== 1 ? "s" : ""}
                </p>
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

                <Select value={sortBy} onValueChange={handleSortChange}>
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

                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger className="lg:hidden h-10 px-4 border border-muted rounded-md flex items-center hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent text-sm font-medium">
                    <SlidersHorizontal className="mr-2" size={16} /> Filters
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0 overflow-y-auto">
                    <SearchFilters
                      filters={filters}
                      onApply={handleApplyFilters}
                      onReset={handleResetFilters}
                    />
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Results */}
            {view === "map" ? (
              <div className="rounded-2xl overflow-hidden border border-muted/50 bg-white h-[600px]">
                <PropertyMap properties={filteredProperties} />
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="bg-white rounded-2xl border border-muted/50 p-16 text-center">
                <div className="max-w-sm mx-auto">
                  <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                    <Grid size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">No properties found</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Try adjusting your filters to find more properties.
                  </p>
                  <Button
                    variant="outline"
                    className="border-accent text-accent hover:bg-accent/5"
                    onClick={handleResetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8"
                    : "flex flex-col gap-6"
                }
              >
                {paginatedProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} layout={view === "list" ? "horizontal" : "vertical"} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredProperties.length > 0 && totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    className="h-10 px-4 hover:border-accent hover:text-accent disabled:opacity-40"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  {getPageNumbers().map((page, idx) =>
                    page === "..." ? (
                      <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">
                        ...
                      </span>
                    ) : (
                      <Button
                        key={page}
                        variant="outline"
                        className={`h-10 w-10 p-0 ${
                          currentPage === page
                            ? "bg-accent text-white border-accent"
                            : "hover:border-accent hover:text-accent"
                        }`}
                        onClick={() => handlePageChange(page as number)}
                      >
                        {page}
                      </Button>
                    )
                  )}
                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    className="h-10 px-4 hover:border-accent hover:text-accent disabled:opacity-40"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
