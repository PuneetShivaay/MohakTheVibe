"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Menu, X, Youtube } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { MARKETPLACES, NAV_LINKS, SITE_LINKS } from "@/lib/site";

const allLinks = [...NAV_LINKS.left, ...NAV_LINKS.right];

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-eyebrow uppercase hover:text-brand-gold transition-colors">
      {label}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Only the home page has a full-bleed hero to sit over; other pages get the solid bar
  const overHero = pathname === "/" && !isScrolled && !mobileMenuOpen;

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock page scroll and allow Escape to close while the mobile menu is open
  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-[100] transition-all duration-500 ease-out-soft",
          overHero
            ? "bg-transparent text-white py-5 md:py-7"
            : "bg-background/90 text-foreground backdrop-blur-md border-b border-brand-gold/20 py-3"
        )}
      >
        <nav
          aria-label="Main"
          className="max-w-site mx-auto px-6 md:px-12 grid grid-cols-[1fr_auto_1fr] items-center"
        >
          {/* Left: desktop links, mobile menu button */}
          <div className="flex items-center gap-8">
            <button
              type="button"
              className="lg:hidden -ml-2 p-2 hover:text-brand-gold transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" strokeWidth={1.25} /> : <Menu className="h-5 w-5" strokeWidth={1.25} />}
            </button>
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.left.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </div>
          </div>

          {/* Centre: logo mark */}
          <Link href="/" aria-label="Mohak – The Vibe, home" onClick={() => setMobileMenuOpen(false)}>
            <BrandLogo compact />
          </Link>

          {/* Right: desktop links, Instagram, theme */}
          <div className="flex items-center justify-end gap-8">
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.right.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
              <a
                href={SITE_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mohak on Instagram"
                className="hover:text-brand-gold transition-colors"
              >
                <Instagram className="w-4 h-4" strokeWidth={1.25} />
              </a>
              <a
                href={SITE_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mohak on YouTube"
                className="hover:text-brand-gold transition-colors"
              >
                <Youtube className="w-4 h-4" strokeWidth={1.25} />
              </a>
            </div>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-[99] bg-background lg:hidden transition-all duration-500 ease-out-soft",
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none invisible"
        )}
      >
        <div className="flex flex-col h-full pt-28 pb-12 px-6 sm:px-12 overflow-y-auto">
          <nav aria-label="Mobile" className="flex flex-col">
            {allLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-headline text-display-sm border-b border-brand-gold/15 py-5 hover:text-brand-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-12 space-y-8">
            <div>
              <p className="text-eyebrow uppercase text-brand-gold mb-4">Also available on</p>
              <div className="flex gap-6 text-sm">
                {MARKETPLACES.map((m) => (
                  <a key={m.label} href={m.href} target="_blank" rel="noopener noreferrer" className="border-b border-foreground/30 pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors">
                    {m.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-eyebrow uppercase text-brand-gold mb-4">Connect</p>
              <div className="flex gap-6 text-sm">
                <a href={SITE_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="border-b border-foreground/30 pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors">
                  Instagram
                </a>
                <a href={SITE_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="border-b border-foreground/30 pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors">
                  YouTube
                </a>
                <a href={SITE_LINKS.whatsappChat} target="_blank" rel="noopener noreferrer" className="border-b border-foreground/30 pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
