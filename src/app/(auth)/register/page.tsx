"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, Mail, Lock, User, ArrowRight, Loader2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("BUYER");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate registration
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-surface px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="border-none shadow-2xl overflow-hidden">
          <CardHeader className="space-y-1 bg-primary text-white text-center py-8">
            <CardTitle className="text-3xl font-bold tracking-tight">Join EstatePremium</CardTitle>
            <CardDescription className="text-white/60">
              Create an account to start exploring and managing properties
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Select Your Role</Label>
                <RadioGroup 
                  defaultValue="BUYER" 
                  onValueChange={setRole}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem value="BUYER" id="buyer" className="peer sr-only" />
                    <Label
                      htmlFor="buyer"
                      className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-white p-4 hover:bg-surface peer-data-[state=checked]:border-accent [&:has([data-state=checked])]:border-accent cursor-pointer transition-all"
                    >
                      <User className={`mb-3 h-6 w-6 ${role === "BUYER" ? "text-accent" : "text-muted-foreground"}`} />
                      <span className={`text-sm font-bold ${role === "BUYER" ? "text-primary" : "text-muted-foreground"}`}>Buyer / Renter</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="AGENT" id="agent" className="peer sr-only" />
                    <Label
                      htmlFor="agent"
                      className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-white p-4 hover:bg-surface peer-data-[state=checked]:border-accent [&:has([data-state=checked])]:border-accent cursor-pointer transition-all"
                    >
                      <Building2 className={`mb-3 h-6 w-6 ${role === "AGENT" ? "text-accent" : "text-muted-foreground"}`} />
                      <span className={`text-sm font-bold ${role === "AGENT" ? "text-primary" : "text-muted-foreground"}`}>Agent / Seller</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" className="h-12 bg-surface border-none focus-visible:ring-accent" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" className="h-12 bg-surface border-none focus-visible:ring-accent" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input id="email" type="email" placeholder="m@example.com" className="pl-10 h-12 bg-surface border-none focus-visible:ring-accent" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input id="password" type="password" className="pl-10 h-12 bg-surface border-none focus-visible:ring-accent" required />
                </div>
              </div>

              <Button type="submit" className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl text-lg mt-4" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 animate-spin" /> : null}
                Create Account
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground font-bold tracking-widest">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-12 border-muted hover:bg-surface rounded-xl">
                <Globe className="mr-2 h-4 w-4" /> Google
              </Button>
              <Button variant="outline" className="h-12 border-muted hover:bg-surface rounded-xl">
                <Globe className="mr-2 h-4 w-4" /> GitHub
              </Button>
            </div>
          </CardContent>
          <CardFooter className="bg-surface/50 p-6 flex justify-center border-t border-muted/50">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-accent font-bold hover:underline inline-flex items-center">
                Sign in <ArrowRight size={14} className="ml-1" />
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
