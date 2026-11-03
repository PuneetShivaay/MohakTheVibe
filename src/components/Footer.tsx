import Link from "next/link";
import { Instagram, Mail, MapPin, MessageCircle, Phone, Youtube } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { collections } from "@/lib/products";
import { CONTACT, LEGAL_LINKS, MARKETPLACES, NAV_LINKS, SHOP_LINKS, SITE_LINKS, TRUST_POINTS } from "@/lib/site";

const columnTitle = "text-eyebrow uppercase text-brand-gold mb-6";
const columnLink = "text-sm text-foreground/70 hover:text-brand-gold transition-colors";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-brand-gold/20 pt-12 md:pt-16 pb-10 px-6 md:px-12 overflow-hidden">
      {/* Trust line */}
      <ul className="max-w-site mx-auto flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-x-10 gap-y-2 pb-10 mb-12 border-b border-brand-gold/20 text-eyebrow uppercase text-foreground/70 text-center">
        {TRUST_POINTS.map((point) => (
          <li key={point} className="flex items-center gap-3">
            <span aria-hidden className="w-1 h-1 rounded-full bg-brand-gold" />
            {point}
          </li>
        ))}
      </ul>

      <div className="max-w-site mx-auto grid gap-x-6 gap-y-12 grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] pb-16 border-b border-brand-gold/20">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-1">
          <BrandLogo className="items-start" />
          <p className="mt-6 max-w-xs text-sm text-foreground/70 font-light leading-relaxed">
            Handpicked jewellery for the woman who wears her vibe with confidence.
          </p>
          <div className="mt-6 flex gap-5">
            <a href={SITE_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Mohak on Instagram" className="text-brand-gold hover:opacity-70 transition-opacity">
              <Instagram className="w-5 h-5" strokeWidth={1.25} />
            </a>
            <a href={SITE_LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="Mohak on YouTube" className="text-brand-gold hover:opacity-70 transition-opacity">
              <Youtube className="w-5 h-5" strokeWidth={1.25} />
            </a>
            <a href={SITE_LINKS.whatsappChat} target="_blank" rel="noopener noreferrer" aria-label="Chat with Mohak on WhatsApp" className="text-brand-gold hover:opacity-70 transition-opacity">
              <MessageCircle className="w-5 h-5" strokeWidth={1.25} />
            </a>
          </div>
        </div>

        {/* Shop */}
        <nav aria-label="Footer shop">
          <p className={columnTitle}>Shop</p>
          <ul className="space-y-3">
            {SHOP_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={columnLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className={`${columnTitle} mt-10`}>Collections</p>
          <ul className="space-y-3">
            {collections.map((c) => (
              <li key={c.slug}>
                <Link href={`/collections/${c.slug}`} className={columnLink}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Company */}
        <nav aria-label="Footer company">
          <p className={columnTitle}>Company</p>
          <ul className="space-y-3">
            {[...NAV_LINKS.right, ...LEGAL_LINKS].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={columnLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className={`${columnTitle} mt-10`}>Also available on</p>
          <ul className="space-y-3">
            {MARKETPLACES.map((m) => (
              <li key={m.label}>
                <a href={m.href} target="_blank" rel="noopener noreferrer" className={columnLink}>
                  {m.label}
                </a>
              </li>
            ))}
            <li>
              <a href={SITE_LINKS.whatsappCatalog} target="_blank" rel="noopener noreferrer" className={columnLink}>
                WhatsApp Catalogue
              </a>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div className="col-span-2 lg:col-span-1">
          <p className={columnTitle}>Get in touch</p>
          <ul className="space-y-4 text-sm text-foreground/70">
            <li className="flex items-start gap-3">
              <MapPin aria-hidden className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" strokeWidth={1.25} />
              <span>{CONTACT.location}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone aria-hidden className="w-4 h-4 text-brand-gold shrink-0" strokeWidth={1.25} />
              <a href={CONTACT.phoneHref} className="hover:text-brand-gold transition-colors">
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail aria-hidden className="w-4 h-4 text-brand-gold shrink-0" strokeWidth={1.25} />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-brand-gold transition-colors break-all">
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Oversized faded wordmark */}
      <p aria-hidden className="font-headline text-[22vw] md:text-[16vw] leading-none tracking-[0.08em] text-center text-foreground/[0.05] select-none pt-10">
        MOHAK
      </p>
      <p className="max-w-site mx-auto mt-4 text-center text-eyebrow uppercase text-foreground/50">
        © {year} Mohak – The Vibe.
        {CONTACT.gstin && <span className="block sm:inline sm:ml-3">GSTIN {CONTACT.gstin}.</span>}{" "}
        Developed by{" "}
        <a
          href={SITE_LINKS.developer}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/70 border-b border-transparent pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
        >
          Otical
        </a>
      </p>
    </footer>
  );
}
