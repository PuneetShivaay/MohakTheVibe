
"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatsAppCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-float">
      <Button
        onClick={() => window.open("https://wa.me/yournumber", "_blank")}
        className="h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 transition-transform flex items-center justify-center p-0"
      >
        <MessageCircle className="h-7 w-7" />
      </Button>
    </div>
  );
}
