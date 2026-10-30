import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export type Faq = { question: string; answer: string };

// Draft answers: confirm with the brand before launch (see docs/redesign-progress.md)
export const FAQS: { group: string; items: Faq[] }[] = [
  {
    group: "Ordering & shipping",
    items: [
      {
        question: "How do I buy a piece?",
        answer:
          "Choose a piece here, then buy it on Flipkart or Meesho, wherever you already shop. Not sure which one? Message us on WhatsApp and we will send you the link.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Delivery is handled by the marketplace you order from. Most orders arrive within 3–7 working days, and the marketplace shows the exact estimate for your pin code at checkout.",
      },
      {
        question: "Do you ship across India?",
        answer: "Yes. If the marketplace delivers to your pin code, you can order from us.",
      },
    ],
  },
  {
    group: "Returns & exchanges",
    items: [
      {
        question: "Can I return or exchange a piece?",
        answer:
          "Returns and exchanges follow the policy of the marketplace you bought from. Start the request in your Flipkart or Meesho orders, and message us if you need any help.",
      },
      {
        question: "What if my order arrives damaged?",
        answer:
          "Take photos of the piece and packaging as soon as you open it, raise a return on the marketplace, and let us know on WhatsApp so we can follow up.",
      },
    ],
  },
  {
    group: "Care",
    items: [
      {
        question: "How do I keep my jewellery shining?",
        answer:
          "Keep it dry and away from perfume, lotion and water. Put it on last and take it off first, then store it in the Mohak box or a soft pouch.",
      },
      {
        question: "Are the pieces anti-tarnish?",
        answer:
          "Our pieces have an anti-tarnish finish so they stay bright for longer. With the care above, a favourite stays a favourite.",
      },
    ],
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-section px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <Reveal className="mb-14">
          <SectionHeading
            eyebrow="Good to know"
            title={
              <>
                Frequently asked <em>questions</em>
              </>
            }
          />
        </Reveal>

        <div className="space-y-12">
          {FAQS.map((group) => (
            <Reveal key={group.group}>
              <h3 className="text-eyebrow uppercase text-brand-gold mb-2">{group.group}</h3>
              <Accordion type="single" collapsible>
                {group.items.map((faq) => (
                  <AccordionItem key={faq.question} value={faq.question} className="border-brand-gold/20">
                    <AccordionTrigger className="font-headline text-left text-base md:text-lg font-normal py-5 hover:no-underline hover:text-brand-gold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/70 font-light leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
