"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin, MessageCircle, Send, Youtube } from "lucide-react";
import { CONTACT, MARKETPLACES, SITE_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { FadeIn } from "./FadeIn";
import { Reveal } from "./Reveal";
import { Eyebrow, SectionHeading } from "./SectionHeading";

const socials = [
  { label: "Instagram", href: SITE_LINKS.instagram, Icon: Instagram },
  { label: "YouTube", href: SITE_LINKS.youtube, Icon: Youtube },
  { label: "LinkedIn", href: SITE_LINKS.linkedin, Icon: Linkedin },
  { label: "WhatsApp", href: SITE_LINKS.whatsappChat, Icon: MessageCircle },
];

// The three ways to reach us, shown as cards under the heading. `href` is omitted for the address.
const channels = [
  {
    label: "WhatsApp",
    value: CONTACT.phoneDisplay,
    note: "The quickest way to reach us.",
    cta: "Chat on WhatsApp",
    href: CONTACT.whatsappHello,
    external: true,
    Icon: MessageCircle,
  },
  {
    label: "Email",
    value: CONTACT.email,
    note: "For questions, orders and gifting.",
    cta: "Write to us",
    href: `mailto:${CONTACT.email}`,
    external: false,
    Icon: Mail,
  },
  {
    label: "Based in",
    value: CONTACT.location,
    note: "Delivered across India.",
    cta: undefined,
    href: undefined,
    external: false,
    Icon: MapPin,
  },
];

function ChannelCard({ channel }: { channel: (typeof channels)[number] }) {
  const { label, value, note, cta, href, external, Icon } = channel;
  const body = (
    <>
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-gold/40 text-brand-gold">
        <Icon aria-hidden className="w-5 h-5" strokeWidth={1.25} />
      </span>
      <p className="mt-8 text-eyebrow uppercase text-brand-gold">{label}</p>
      <p className="mt-3 font-headline text-xl md:text-2xl leading-snug break-words">{value}</p>
      <p className="mt-2 text-sm text-foreground/60 font-light">{note}</p>
      {cta && (
        <span className="mt-8 inline-flex items-center gap-2 text-eyebrow uppercase text-foreground/80 group-hover:text-brand-gold transition-colors">
          {cta}
          <ArrowUpRight aria-hidden className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.25} />
        </span>
      )}
    </>
  );
  const box = "group flex h-full flex-col border border-brand-gold/25 p-8 md:p-10 transition-colors";

  return href ? (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(box, "hover:border-brand-gold hover:bg-card")}
    >
      {body}
    </a>
  ) : (
    <div className={box}>{body}</div>
  );
}

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
    <>
      <section id="contact" className={cn("pb-section px-6 md:px-12", firstScreen ? "pt-28 md:pt-36" : "pt-section")}>
        <div className="max-w-site mx-auto">
          <Animate>
            {firstScreen ? (
              // Same hero treatment as /our-story: left-aligned eyebrow, extra-large serif h1, gold italic ending
              <div className="max-w-3xl">
                <Eyebrow className="mb-6">Get in touch</Eyebrow>
                <h1 className="font-headline text-display-xl">
                  Talk to the <em className="text-brand-gold">Mohak team.</em>
                </h1>
                <p className="mt-8 max-w-md text-foreground/70 font-light leading-relaxed">
                  Questions about a piece, or looking for something for an occasion? Message us on WhatsApp for the
                  quickest reply, or write to us by email.
                </p>
              </div>
            ) : (
              <SectionHeading
                eyebrow="Get in touch"
                title={
                  <>
                    Talk to the <em>Mohak team</em>
                  </>
                }
                description="Questions about a piece, or looking for something for an occasion? Message us on WhatsApp for the quickest reply, or write to us by email."
              />
            )}
          </Animate>

          <Animate delay={150}>
            <ul className="mt-14 md:mt-20 grid gap-4 md:grid-cols-3 md:gap-6">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <ChannelCard channel={channel} />
                </li>
              ))}
            </ul>
          </Animate>
        </div>
      </section>

      <section aria-labelledby="contact-form-heading" className="pb-section px-6 md:px-12">
        <div className="max-w-site mx-auto grid lg:grid-cols-[5fr_7fr] border border-brand-gold/20">
          {/* Dark panel: invitation, social links, marketplaces */}
          <Animate className="flex flex-col bg-brand-midnight text-brand-ivory p-8 sm:p-12 lg:p-14">
            <p className="text-eyebrow uppercase text-brand-gold">Prefer to write?</p>
            <h2 id="contact-form-heading" className="mt-4 font-headline text-display-sm">
              Send us <em>a message</em>
            </h2>
            <p className="mt-6 max-w-sm text-sm text-brand-ivory/70 font-light leading-relaxed">
              Tell us what you are looking for: a piece, an occasion or a gift. Your message opens in your email app, addressed to our team.
            </p>

            <div className="mt-auto pt-14">
              <p className="text-eyebrow uppercase text-brand-gold">Follow us</p>
              <ul className="mt-4 flex items-center gap-3">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Mohak on ${label}`}
                      title={label}
                      className="flex h-11 w-11 items-center justify-center border border-brand-ivory/25 text-brand-ivory hover:border-brand-gold hover:bg-brand-gold hover:text-brand-midnight transition-colors"
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.25} />
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-eyebrow uppercase text-brand-gold">Also available on</p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {MARKETPLACES.map((m) => (
                  <li key={m.label}>
                    <a
                      href={m.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-b border-brand-ivory/30 pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
                    >
                      {m.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Animate>

          <Animate delay={150} className="bg-card p-8 sm:p-12 lg:p-14">
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
    </>
  );
}
