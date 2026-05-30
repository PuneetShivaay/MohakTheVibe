
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Mail, MapPin, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export function ContactSection() {
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
    const mailtoUrl = `mailto:mohakthevibe@gmail.com?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoUrl;
    
    toast({
      title: "Opening Mail Client",
      description: "Redirecting you to send your inquiry to mohakthevibe@gmail.com",
    });

    form.reset();
  }

  return (
    <section id="contact" className="py-16 sm:py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 sm:gap-16">
        <div className="space-y-6 sm:space-y-8">
          <div>
            <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] sm:text-xs font-semibold">Get In Touch</span>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl text-brand-midnight mt-4 mb-6 leading-tight">
              Contact our <span className="italic">Mohak Team</span>
            </h2>
            <p className="text-muted-foreground font-light text-base sm:text-lg max-w-md">
              Have questions about a specific piece or want a custom curation? Our team in Gomti Nagar is ready to assist you.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-brand-gold" />
              </div>
              <div>
                <h4 className="font-headline text-base sm:text-lg">Boutique Office</h4>
                <p className="text-xs sm:text-sm text-muted-foreground font-light">Gomti Nagar Lucknow, Uttar Pradesh India</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-brand-gold" />
              </div>
              <div>
                <h4 className="font-headline text-base sm:text-lg">Direct Email</h4>
                <p className="text-xs sm:text-sm text-muted-foreground font-light">mohakthevibe@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-brand-ivory/30 p-6 sm:p-8 border border-brand-gold/10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-[9px] sm:text-[10px] tracking-widest text-brand-gold">Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" className="rounded-none border-brand-gold/20 focus:border-brand-gold bg-white" {...field} />
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
                    <FormLabel className="uppercase text-[9px] sm:text-[10px] tracking-widest text-brand-gold">Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" className="rounded-none border-brand-gold/20 focus:border-brand-gold bg-white" {...field} />
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
                    <FormLabel className="uppercase text-[9px] sm:text-[10px] tracking-widest text-brand-gold">Your Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us what you're looking for..." 
                        className="rounded-none border-brand-gold/20 focus:border-brand-gold bg-white min-h-[100px] sm:min-h-[120px] resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-brand-midnight text-white hover:bg-brand-gold rounded-none h-11 sm:h-12 uppercase tracking-widest text-[9px] sm:text-[10px] transition-all group">
                Send Details <Send className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
