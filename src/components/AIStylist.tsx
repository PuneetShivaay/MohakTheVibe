
"use client";

import * as React from "react";
import { aiVibeStylist, type AIVibeStylistOutput } from "@/ai/flows/ai-vibe-stylist-flow";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Loader2, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";

export function AIStylist() {
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<AIVibeStylistOutput | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    try {
      const output = await aiVibeStylist({ occasionOrOutfitDescription: input });
      setResult(output);
    } catch (error) {
      console.error("Styling failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-stylist" className="py-24 px-6 md:px-12 bg-brand-midnight text-brand-ivory overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-copper blur-[120px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-gold/30 rounded-full text-brand-gold text-xs uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3" /> Digital Boutique Experience
          </div>
          <h2 className="font-headline text-4xl md:text-6xl mb-6">AI Vibe Stylist</h2>
          <p className="text-brand-ivory/70 max-w-2xl mx-auto font-light text-lg">
            Describe your outfit or the occasion, and let our artificial intelligence curate the perfect jewelry pairing from Mohak Luxe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card className="bg-brand-ivory/5 border-brand-gold/20 backdrop-blur-md rounded-none">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm uppercase tracking-widest mb-3 opacity-60">Describe Your Vibe</label>
                  <Textarea
                    placeholder="E.g., I'm wearing a silk emerald green saree for a sunset wedding ceremony..."
                    className="bg-transparent border-brand-gold/30 focus:border-brand-gold text-brand-ivory min-h-[150px] rounded-none resize-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={loading || !input}
                  className="w-full bg-brand-gold hover:bg-brand-beige text-brand-midnight h-14 rounded-none font-medium text-base group"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Style Me <Sparkle className="ml-2 w-4 h-4" /></>}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className={cn(
            "space-y-6 transition-all duration-700",
            result ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            {result && (
              <>
                <h3 className="font-headline text-2xl text-brand-gold italic">Your Personal Curation</h3>
                <div className="space-y-4">
                  {result.recommendations.map((rec, idx) => (
                    <div key={idx} className="p-6 border border-brand-gold/20 bg-brand-ivory/5 hover:bg-brand-ivory/10 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-brand-gold text-xs uppercase tracking-widest font-semibold">{rec.type}</span>
                        <span className="text-[10px] opacity-40 uppercase tracking-tighter">{rec.style}</span>
                      </div>
                      <p className="text-sm leading-relaxed mb-4 text-brand-ivory/90">{rec.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {rec.keywords.map((kw, i) => (
                          <span key={i} className="text-[10px] bg-brand-gold/10 text-brand-gold px-2 py-0.5 rounded-full">#{kw}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="font-headline text-xl text-brand-beige mt-8 leading-relaxed">
                  "{result.brandMessage}"
                </p>
              </>
            )}
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-20 border-2 border-dashed border-brand-gold/10">
                <Sparkles className="w-12 h-12 mb-4 text-brand-gold" />
                <p className="font-headline text-xl">Waiting for your story...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
