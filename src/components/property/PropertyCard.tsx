import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Move, Heart, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: number;
    type: "BUY" | "RENT" | "COMMERCIAL";
    beds: number;
    baths: number;
    area: number;
    city: string;
    locality: string;
    images: { url: string }[];
    agent?: {
      name: string;
      avatar: string;
    };
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <Card className="overflow-hidden group border-none shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={property.images[0]?.url || "/placeholder-property.jpg"}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={`${property.type === "BUY" ? "bg-primary" : "bg-accent"} text-white border-none`}>
            {property.type === "BUY" ? "FOR SALE" : property.type === "RENT" ? "FOR RENT" : "COMMERCIAL"}
          </Badge>
        </div>
        <button className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-accent hover:text-white transition-all duration-300">
          <Heart size={18} className="transition-transform group-active:scale-125" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <p className="text-white font-bold text-xl">{formattedPrice}</p>
        </div>
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center text-muted-foreground text-sm gap-1">
          <MapPin size={14} className="text-accent" />
          <span>{property.locality}, {property.city}</span>
        </div>
        <h3 className="font-bold text-lg line-clamp-1 group-hover:text-accent transition-colors">
          <Link href={`/properties/${property.id}`}>{property.title}</Link>
        </h3>
        <div className="flex items-center justify-between py-2 border-y border-muted/50">
          <div className="flex items-center gap-1.5">
            <Bed size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium">{property.beds}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium">{property.baths}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Move size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium">{property.area} <span className="text-[10px]">SQFT</span></span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={property.agent?.avatar} />
            <AvatarFallback>{property.agent?.name?.[0] || "A"}</AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium text-muted-foreground">{property.agent?.name || "Agent"}</span>
        </div>
        <Button variant="link" size="sm" className="text-accent h-auto p-0" nativeButton={false} render={<Link href={`/properties/${property.id}`} />}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
