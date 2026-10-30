"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/lib/site";

// Quiet floating chat button; appears once the visitor scrolls past the first screen
export function WhatsAppCTA() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={CONTACT.whatsappHello}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Mohak on WhatsApp (opens in a new tab)"
      title="Chat with us on WhatsApp"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full",
        "bg-brand-midnight text-brand-gold border border-brand-gold/40 shadow-lg",
        "transition-all duration-500 ease-out-soft hover:bg-brand-gold hover:text-brand-midnight",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
    </a>
  );
}
