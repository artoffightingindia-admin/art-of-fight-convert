import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What is AOF?", a: "AOF is a coaching platform focused on helping people build real fighting skills, fitness, discipline, and confidence through structured training systems." },
  { q: "Which program is right for me?", a: "Choose the 30-Day Program if you want a structured online system. Choose 1-on-1 Coaching if you want personalized guidance and direct coach support." },
  { q: "Do I need prior MMA experience?", a: "No. Both beginners and experienced athletes can benefit from our programs." },
  { q: "Can I train from home?", a: "Yes. Our programs are designed to be practical and accessible, even if you don't train at a gym every day." },
   { q: "Will I receive coach support?", a: "Yes. The level of support depends on the program you choose, with 1-on-1 Coaching offering the most direct guidance." },
   { q: "How do I get started?", a: "Simply explore the program that best fits your goals and follow the enrollment process on the next page." },
];

const FAQSection = () => (
  <section id="faq" className="py-16 md:py-24">
    <div className="container max-w-3xl">
      <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2 text-center">FAQ</p>
      <h2 className="font-display text-4xl md:text-5xl text-foreground text-center mb-10">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-lg px-5">
            <AccordionTrigger className="text-foreground font-medium text-sm hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
