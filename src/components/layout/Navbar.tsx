"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, Search, Heart, User, LogOut, LayoutDashboard, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Properties", href: "/properties", icon: Search },
  ];

  if (session?.user) {
    navLinks.push({ name: "Favorites", href: "/favorites", icon: Heart });
  }

  const userRole = (session?.user as any)?.role;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight text-primary">
              Estate<span className="text-accent">Premium</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-accent ${
                pathname === link.href ? "text-accent" : "text-foreground/60"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="relative h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                  <AvatarFallback>{session.user.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userRole === "AGENT" && (
                  <DropdownMenuItem render={<Link href="/agent" />}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Agent Dashboard
                  </DropdownMenuItem>
                )}
                {userRole === "ADMIN" && (
                  <DropdownMenuItem render={<Link href="/admin" />}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Admin Panel
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem render={<Link href="/profile" />}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/login" className={cn(buttonVariants({ variant: "ghost" }))}>Login</Link>
              <Link href="/register" className={cn(buttonVariants({ variant: "default" }), "bg-accent hover:bg-accent/90 text-white")}>Join Us</Link>
            </div>
          )}

          {/* Mobile Nav Toggle */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium ${
                      pathname === link.href ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                {!session?.user && (
                  <>
                    <DropdownMenuSeparator />
                    <Link href="/login" onClick={() => setIsOpen(false)} className="text-lg font-medium">
                      Login
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)} className="text-lg font-medium text-accent">
                      Join Us
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
