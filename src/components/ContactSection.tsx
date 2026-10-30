"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { CONTACT } from "@/lib/site";
import { cn } from "@/lib/utils";
import { FadeIn } from "./FadeIn";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

// Contact details plus a mailto form. `firstScreen` renders it as the top of the /contact page
// (h1, CSS FadeIn so it is visible without JavaScript, room for the fixed navbar).
export function ContactSection({ firstScreen = false }: { firstScreen?: boolean }) {
  const Animate = firstScreen ? FadeIn : Reveal;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const subject = encodeURIComponent(`Inquiry from ${values.name}`);
    const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`);
    const mailtoUrl = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoUrl;
    
    toast({
      title: "Opening Mail Client",
      description: `Redirecting you to send your inquiry to ${CONTACT.email}`,
    });

    form.reset();
  }

  const fieldLabel = "text-eyebrow uppercase text-brand-gold";
  const fieldInput = "rounded-none border-brand-gold/25 bg-background focus-visible:ring-brand-gold";

  return (
    <section id="contact" className={cn("pb-section px-6 md:px-12 bg-card", firstScreen ? "pt-28 md:pt-36" : "pt-section")}>
      <div className="max-w-site mx-auto grid md:grid-cols-2 gap-14 md:gap-20">
        <Animate>
          <SectionHeading
            align="left"
            as={firstScreen ? "h1" : "h2"}
            eyebrow="Get in touch"
            title={
              <>
                Talk to the <em>Mohak team</em>
              </>
            }
            description="Questions about a piece, or looking for something for an occasion? Write to us, or message us on WhatsApp for the quickest reply."
          />

          <ul className="mt-10 space-y-6">
            <li className="flex items-start gap-4">
              <MapPin aria-hidden className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" strokeWidth={1.25} />
              <div>
                <p className="font-headline text-lg">Boutique office</p>
                <p className="text-sm text-foreground/70 font-light">{CONTACT.location}</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Mail aria-hidden className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" strokeWidth={1.25} />
              <div>
                <p className="font-headline text-lg">Email</p>
                <a href={`mailto:${CONTACT.email}`} className="text-sm text-foreground/70 font-light hover:text-brand-gold transition-colors">
                  {CONTACT.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <MessageCircle aria-hidden className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" strokeWidth={1.25} />
              <div>
                <p className="font-headline text-lg">WhatsApp</p>
                <a href={CONTACT.whatsappHello} target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/70 font-light hover:text-brand-gold transition-colors">
                  {CONTACT.phoneDisplay}
                </a>
              </div>
            </li>
          </ul>
        </Animate>

        <Animate delay={150} className="border border-brand-gold/20 p-6 sm:p-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={fieldLabel}>Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" autoComplete="name" className={fieldInput} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={fieldLabel}>Email address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" autoComplete="email" className={fieldInput} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={fieldLabel}>Your message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us what you're looking for…" className={`${fieldInput} min-h-[140px] resize-none`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="group w-full h-12 rounded-none bg-brand-midnight text-brand-ivory hover:bg-brand-gold hover:text-brand-midnight dark:bg-brand-gold dark:text-brand-midnight dark:hover:bg-brand-beige text-eyebrow uppercase transition-colors"
              >
                Send message <Send aria-hidden className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </Form>
        </Animate>
      </div>
    </section>
  );
}
