"use client";

import * as React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-[100] transition-all duration-500 py-6 px-6 md:px-12",
      isScrolled ? "bg-background/90 backdrop-blur-md py-4 border-b" : "bg-transparent"
    )}>
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
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

        {/* Center: Brand Name */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <a href="/" className="font-headline text-2xl tracking-[0.3em] font-bold text-brand-gold uppercase">
            MOHAK
          </a>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <button className="hover:text-brand-gold transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <a 
              href={flipkartStoreUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-brand-gold transition-all duration-300 transform hover:scale-110"
              title="Shop on Flipkart"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#2874f0]" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.433 13.922l-.128-.158H6.69l-.128.158A5.992 5.992 0 005.15 17.5a6.002 6.002 0 1010.85 0 5.992 5.992 0 00-1.567-3.578zM12 21a3 3 0 110-6 3 3 0 010 6zm5.83-16.11A.75.75 0 0017.08 4H6.92a.75.75 0 00-.75.75v1.5a.75.75 0 00.75.75h10.16a.75.75 0 00.75-.75v-1.5zm1.17 4.5a.75.75 0 00-.75-.75H5.75a.75.75 0 00-.75.75v1.5a.75.75 0 00.75.75h12.5a.75.75 0 00.75-.75v-1.5z"/>
              </svg>
            </a>
          </div>
          <div className="h-4 w-[1px] bg-foreground/10 mx-2 hidden md:block" />
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-background z-[99] lg:hidden transition-transform duration-500 pt-32 px-12",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="font-headline text-4xl tracking-tight dashed-link"
            >
              {link.name}
            </a>
          ))}
          {/* Mobile shop link */}
          <a 
            href={flipkartStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-headline text-4xl tracking-tight dashed-link text-[#2874f0]"
          >
            FLIPKART SHOP
          </a>
        </div>
      </div>
    </nav>
  );
}
