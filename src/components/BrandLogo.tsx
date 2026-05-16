
import { cn } from "@/lib/utils";

export function BrandLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center tracking-tighter", className)}>
      <span className="font-headline text-2xl md:text-3xl font-bold text-brand-gold uppercase">Mohak</span>
      <span className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] font-light -mt-1 opacity-80">The Vibe</span>
    </div>
  );
}
