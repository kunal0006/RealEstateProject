"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

interface PropertyMapProps {
  properties: any[];
  center?: [number, number];
  zoom?: number;
}

export default function PropertyMap({ properties, center = [-97.7431, 30.2672], zoom = 12 }: PropertyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: center,
      zoom: zoom,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => {
      map.current?.remove();
    };
  }, [center, zoom]);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    const markers = document.getElementsByClassName("mapboxgl-marker");
    while (markers[0]) {
      markers[0].parentNode?.removeChild(markers[0]);
    }

    // Add markers for properties
    properties.forEach((property) => {
      if (!property.lat || !property.lng) return;

      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundColor = "#E94560";
      el.style.width = "30px";
      el.style.height = "30px";
      el.style.borderRadius = "50%";
      el.style.border = "3px solid white";
      el.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "center";
      el.style.cursor = "pointer";
      
      // Add price label
      const label = document.createElement("div");
      label.className = "absolute -top-8 bg-primary text-white text-[10px] px-2 py-1 rounded-md font-bold shadow-lg opacity-0 transition-opacity group-hover:opacity-100";
      label.innerText = `$${(property.price / 1000).toFixed(0)}k`;
      el.appendChild(label);

      new mapboxgl.Marker(el)
        .setLngLat([property.lng, property.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(
              `
              <div class="p-2 min-w-[200px]">
                <h3 class="font-bold text-primary">${property.title}</h3>
                <p class="text-xs text-muted-foreground">${property.city}</p>
                <p class="text-sm font-bold text-accent mt-1">$${property.price.toLocaleString()}</p>
                <a href="/properties/${property.id}" class="text-[10px] text-blue-500 hover:underline mt-2 inline-block">View Details</a>
              </div>
              `
            )
        )
        .addTo(map.current!);
    });
  }, [properties]);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 relative">
      <div ref={mapContainer} className="w-full h-full" />
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-primary/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
          <p className="text-white text-xs font-bold uppercase tracking-widest">Map View</p>
          <p className="text-white/60 text-[10px]">{properties.length} Properties Found</p>
        </div>
      </div>
    </div>
  );
}
