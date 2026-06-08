import Link from "next/link";
import { Globe, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              Estate<span className="text-accent">Premium</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Redefining real estate with premium listings, advanced search tools, and 
              world-class service for buyers, sellers, and agents.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-accent transition-colors"><Globe size={20} /></Link>
              <Link href="#" className="hover:text-accent transition-colors"><Mail size={20} /></Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/properties" className="hover:text-accent transition-colors">Browse Properties</Link></li>
              <li><Link href="/agent/register" className="hover:text-accent transition-colors">Join as Agent</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Property Types</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/properties?type=BUY" className="hover:text-accent transition-colors">Residential for Sale</Link></li>
              <li><Link href="/properties?type=RENT" className="hover:text-accent transition-colors">Rental Properties</Link></li>
              <li><Link href="/properties?type=COMMERCIAL" className="hover:text-accent transition-colors">Commercial Space</Link></li>
              <li><Link href="/properties?featured=true" className="hover:text-accent transition-colors">Featured Listings</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-accent" />
                <span>123 Luxury Ave, Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent" />
                <span>+1 (555) 000-ESTATE</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent" />
                <span>contact@estatepremium.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 EstatePremium. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
