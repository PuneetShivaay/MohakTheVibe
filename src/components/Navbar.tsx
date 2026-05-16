"use client";

import * as React from "react";
import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const instagramUrl = "https://www.instagram.com/mohakthevibe/";
  const whatsappUrl = "https://wa.me/c/175282363322554";

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-[100] transition-all duration-500 py-4 px-6 md:px-12",
      isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-brand-gold/10" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Desktop Links Left */}
        <div className="hidden lg:flex items-center gap-8">
          <a href="#catalog" className="text-xs uppercase tracking-widest hover:text-brand-gold transition-colors font-medium">Catalog</a>
          <a href="#ai-stylist" className="text-xs uppercase tracking-widest hover:text-brand-gold transition-colors font-medium">AI Stylist</a>
        </div>

        {/* Center Logo */}
        <a href="/" className="hover:opacity-80 transition-opacity">
          <BrandLogo />
        </a>

        {/* Desktop Links Right + Controls */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-4">
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
          <div className="h-6 w-[1px] bg-brand-gold/30 mx-2" />
          <ThemeToggle />
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 bg-background z-[99] lg:hidden transition-transform duration-500 pt-32 px-12",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col gap-10 text-center">
          <a href="#catalog" onClick={() => setMobileMenuOpen(false)} className="font-headline text-3xl">Catalog</a>
          <a href="#ai-stylist" onClick={() => setMobileMenuOpen(false)} className="font-headline text-3xl">AI Stylist</a>
          <a href="#brand-story" onClick={() => setMobileMenuOpen(false)} className="font-headline text-3xl">Our Story</a>
          <div className="flex justify-center gap-8 pt-10 border-t border-brand-gold/10">
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <Instagram className="w-8 h-8 text-brand-gold" />
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-8 h-8 text-brand-gold" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
