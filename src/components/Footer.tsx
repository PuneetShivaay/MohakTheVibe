"use client";

import { BrandLogo } from "./BrandLogo";
import { Instagram, Facebook, MessageCircle, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const instagramUrl = "https://www.instagram.com/mohakthevibe/";
  const whatsappUrl = "https://wa.me/c/175282363322554";

  return (
    <footer className="bg-brand-midnight text-brand-ivory pt-24 pb-12 px-6 md:px-12 border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-1 space-y-6">
          <BrandLogo className="items-start" />
          <p className="text-sm font-light opacity-60 leading-relaxed max-w-xs mt-4">
            Premium artificial jewelry for the woman who wears her vibe with confidence. Boutique collections, hand-picked aesthetics.
          </p>
          <div className="flex gap-4">
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:opacity-70 transition-opacity">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-brand-gold hover:opacity-70 transition-opacity">
              <Facebook className="w-5 h-5" />
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:opacity-70 transition-opacity">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-headline text-xl">Marketplaces</h4>
          <ul className="space-y-4 text-sm font-light opacity-60">
            <li><a href="#" className="hover:text-brand-gold transition-colors">Flipkart Shop</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Meesho Store</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Amazon Collection</a></li>
            <li><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">WhatsApp Catalogue</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-headline text-xl">The Brand</h4>
          <ul className="space-y-4 text-sm font-light opacity-60">
            <li><a href="#brand-story" className="hover:text-brand-gold transition-colors">Our Story</a></li>
            <li><a href="#catalog" className="hover:text-brand-gold transition-colors">Collections</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Ethics & Quality</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Shipping Info</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-headline text-xl">Boutique Office</h4>
          <ul className="space-y-4 text-sm font-light opacity-60">
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-brand-gold" />
              <span>Luxe Towers, Design District, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-brand-gold" />
              <span>hello@mohakthevibe.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-brand-ivory/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest opacity-40">
        <p>© 2024 Mohak – The Vibe. All Rights Reserved.</p>
        <div className="flex gap-8">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
