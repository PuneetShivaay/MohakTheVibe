
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
              className="hover:opacity-80 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
              title="Shop on Flipkart"
            >
              <svg viewBox="0 0 100 100" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                {/* Yellow Shopping Bag */}
                <path d="M15,35 L85,35 C88,35 90,37 90,40 L90,85 C90,88 88,90 85,90 L15,90 C12,90 10,88 10,85 L10,40 C10,37 12,35 15,35 Z" fill="#ffd800" />
                {/* Bag Inner Flap */}
                <path d="M15,35 L22,25 L78,25 L85,35 Z" fill="#f8c300" opacity="0.8" />
                {/* Smiley Handle */}
                <path d="M38,48 C38,60 62,60 62,48" fill="none" stroke="#eb1c24" strokeWidth="3.5" strokeLinecap="round" />
                {/* Blue 'f' logo part */}
                <path d="M42,70 L80,70" fill="none" stroke="#2874f0" strokeWidth="10" strokeLinecap="round" />
                <path d="M58,55 C78,55 78,65 78,75 L78,90" fill="none" stroke="#2874f0" strokeWidth="10" strokeLinecap="round" />
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
            className="font-headline text-4xl tracking-tight dashed-link text-[#2874f0] flex items-center gap-4"
          >
            FLIPKART SHOP
          </a>
        </div>
      </div>
    </nav>
  );
}
