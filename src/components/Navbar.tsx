
"use client";

import * as React from "react";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "EARRINGS", href: "#catalog" },
  { name: "COLLECTIONS", href: "#festive" },
  { name: "ABOUT US", href: "#brand-story" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const flipkartStoreUrl = "https://www.flipkart.com/search?q=mohak+the+vibe";
  const flipkartLogo = PlaceHolderImages.find(img => img.id === "flipkart-logo")?.imageUrl || "/images/flipkart-logo.png";
  const brandLogo = PlaceHolderImages.find(img => img.id === "brand-logo")?.imageUrl;

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-500 py-4 px-4 md:py-6 md:px-12",
        isScrolled || mobileMenuOpen ? "bg-background/95 backdrop-blur-md py-3 border-b" : "bg-transparent"
      )}>
        <div className="max-w-[1600px] mx-auto flex items-center justify-between relative h-10">
          {/* Left: Navigation Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-[10px] tracking-[0.2em] font-medium hover:text-brand-gold transition-colors dashed-link"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Center: Brand Logo/Name */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
            <a href="/" className="flex items-center">
              {brandLogo ? (
                <div className="relative h-8 w-24 sm:h-10 sm:w-32 md:w-40">
                  <Image 
                    src={brandLogo} 
                    alt="Mohak" 
                    fill
                    className="object-contain"
                    priority
                    onError={(e) => {
                      const target = e.target as any;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<span class="font-headline text-xl md:text-2xl tracking-[0.3em] font-bold text-brand-gold uppercase">MOHAK</span>';
                      }
                    }}
                  />
                </div>
              ) : (
                <span className="font-headline text-xl md:text-2xl tracking-[0.3em] font-bold text-brand-gold uppercase">
                  MOHAK
                </span>
              )}
            </a>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-2 md:gap-6">
            <div className="hidden md:flex items-center gap-6">
              <button className="hover:text-brand-gold transition-colors">
                <Search className="w-4 h-4" />
              </button>
              <a 
                href={flipkartStoreUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-80 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
                title="Shop on Flipkart"
              >
                <Image 
                  src={flipkartLogo}
                  alt="Shop on Flipkart"
                  width={32}
                  height={32}
                  className="object-contain h-8 w-auto"
                />
              </a>
            </div>
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 bg-background z-[99] lg:hidden transition-all duration-500 ease-in-out",
        mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}>
        <div className="flex flex-col h-full pt-24 pb-12 px-8 sm:px-12 overflow-y-auto">
          <div className="flex flex-col gap-8 sm:gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight border-b border-foreground/5 pb-4 hover:text-brand-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            {/* Mobile search and shop links */}
            <div className="mt-6 space-y-6">
              <a 
                href={flipkartStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-headline text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#2874f0] flex items-center gap-4 group"
              >
                <span>FLIPKART SHOP</span>
                <Image 
                  src={flipkartLogo}
                  alt="Flipkart"
                  width={40}
                  height={40}
                  className="object-contain h-8 sm:h-10 w-auto group-hover:scale-110 transition-transform"
                />
              </a>
              
              <div className="pt-8 border-t border-foreground/5">
                <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/40 mb-4">Connect with us</p>
                <div className="flex gap-6 sm:gap-8">
                   <a href="https://www.instagram.com/mohakthevibe/" target="_blank" className="text-xl sm:text-2xl font-headline">Instagram</a>
                   <a href="https://wa.me/916388498674" target="_blank" className="text-xl sm:text-2xl font-headline">WhatsApp</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
