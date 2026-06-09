"use client";

import { useState, useCallback } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export interface FilterState {
  type: string;
  priceRange: [number, number];
  beds: string;
  amenities: string[];
}

const DEFAULT_FILTERS: FilterState = {
  type: "all",
  priceRange: [100000, 5000000],
  beds: "Any",
  amenities: [],
};

interface SearchFiltersProps {
  filters?: FilterState;
  onApply?: (filters: FilterState) => void;
  onReset?: () => void;
}

export default function SearchFilters({ filters: externalFilters, onApply, onReset }: SearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(
    externalFilters ?? { ...DEFAULT_FILTERS }
  );

  const handleTypeChange = useCallback((value: string | null) => {
    if (value) {
      setLocalFilters((prev) => ({ ...prev, type: value }));
    }
  }, []);

  const handlePriceChange = useCallback((val: number | readonly number[]) => {
    if (Array.isArray(val) && val.length >= 2) {
      setLocalFilters((prev) => ({ ...prev, priceRange: [val[0], val[1]] }));
    }
  }, []);

  const handleBedsChange = useCallback((value: string) => {
    setLocalFilters((prev) => ({ ...prev, beds: value }));
  }, []);

  const handleAmenityToggle = useCallback((amenityId: string, checked: boolean) => {
    setLocalFilters((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenityId]
        : prev.amenities.filter((a) => a !== amenityId),
    }));
  }, []);

  const handleReset = useCallback(() => {
    const fresh = { ...DEFAULT_FILTERS, amenities: [] };
    setLocalFilters(fresh);
    onReset?.();
    onApply?.(fresh);
  }, [onApply, onReset]);

  const handleApply = useCallback(() => {
    onApply?.(localFilters);
  }, [localFilters, onApply]);

  return (
    <div className="space-y-8 p-6 bg-white rounded-2xl shadow-sm border border-muted/50 sticky top-24">
      <div>
        <h3 className="font-bold text-lg mb-6 flex items-center justify-between">
          Filters
          <Button
            variant="ghost"
            size="sm"
            className="text-accent hover:text-accent font-normal h-auto p-0"
            onClick={handleReset}
          >
            Reset
          </Button>
        </h3>
        
        <div className="space-y-6">
          {/* Property Type */}
          <div className="space-y-3">
            <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Property Type</Label>
            <Select value={localFilters.type} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-full bg-surface border-muted">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="BUY">For Sale</SelectItem>
                <SelectItem value="RENT">For Rent</SelectItem>
                <SelectItem value="COMMERCIAL">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Price Range */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Price Range</Label>
              <span className="text-xs font-bold text-accent">
                ${(localFilters.priceRange[0] / 1000).toFixed(0)}k - ${(localFilters.priceRange[1] / 1000).toFixed(0)}k
              </span>
            </div>
            <Slider
              max={10000000}
              step={50000}
              value={localFilters.priceRange}
              onValueChange={handlePriceChange}
              className="py-4"
            />
          </div>

          <Separator />

          {/* Bedrooms */}
          <div className="space-y-3">
            <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Bedrooms</Label>
            <div className="grid grid-cols-5 gap-2">
              {["Any", "1", "2", "3", "4+"].map((num) => (
                <Button
                  key={num}
                  variant="outline"
                  size="sm"
                  className={`h-9 p-0 border-muted hover:border-accent hover:text-accent transition-all ${
                    localFilters.beds === num
                      ? "border-accent text-accent bg-accent/5 ring-1 ring-accent/30"
                      : ""
                  }`}
                  onClick={() => handleBedsChange(num)}
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Amenities */}
          <div className="space-y-3">
            <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Amenities</Label>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: "gym", label: "Fitness Center" },
                { id: "pool", label: "Swimming Pool" },
                { id: "parking", label: "Private Parking" },
                { id: "security", label: "24/7 Security" },
                { id: "pet", label: "Pet Friendly" },
              ].map((amenity) => (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity.id}
                    checked={localFilters.amenities.includes(amenity.id)}
                    onCheckedChange={(checked) =>
                      handleAmenityToggle(amenity.id, checked === true)
                    }
                    className="border-muted data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                  />
                  <label
                    htmlFor={amenity.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer hover:text-accent transition-colors"
                  >
                    {amenity.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Button
            className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-xl mt-4"
            onClick={handleApply}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}

export { DEFAULT_FILTERS };
