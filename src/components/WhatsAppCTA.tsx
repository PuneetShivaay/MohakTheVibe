
"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_LINKS } from "@/lib/site";

export function WhatsAppCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-float">
      <Button
        onClick={() => window.open(SITE_LINKS.whatsappCatalog, "_blank")}
        className="h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 transition-transform flex items-center justify-center p-0"
        title="View WhatsApp Catalogue"
      >
        <MessageCircle className="h-7 w-7" />
      </Button>
    </div>
  );
}
