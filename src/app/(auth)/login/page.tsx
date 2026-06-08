"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-surface px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-2xl overflow-hidden">
          <CardHeader className="space-y-1 bg-primary text-white text-center py-8">
            <CardTitle className="text-3xl font-bold tracking-tight">Welcome Back</CardTitle>
            <CardDescription className="text-white/60">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="m@example.com" 
                    className="pl-10 h-12 bg-surface border-none focus-visible:ring-accent" 
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-accent hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input 
                    id="password" 
                    type="password" 
                    className="pl-10 h-12 bg-surface border-none focus-visible:ring-accent" 
                    required 
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl text-lg" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 animate-spin" /> : null}
                Sign In
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground font-bold tracking-widest">Or continue with</span>
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
              Don't have an account?{" "}
              <Link href="/register" className="text-accent font-bold hover:underline inline-flex items-center">
                Create account <ArrowRight size={14} className="ml-1" />
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
