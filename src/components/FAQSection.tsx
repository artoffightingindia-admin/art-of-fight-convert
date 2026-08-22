import { useCms } from "@/context/CmsContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const { content } = useCms();

  const faqs = [
    { q: content.faq1Question, a: content.faq1Answer },
    { q: content.faq2Question, a: content.faq2Answer },
    { q: content.faq3Question, a: content.faq3Answer },
  ];

  return (
    <section id="faq" className="py-12 md:py-16 bg-background">
      <div className="container max-w-3xl space-y-8">
        <h2 className="font-display text-3xl md:text-4xl text-center text-[#07b4ba]">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-zinc-800 px-4">
              <AccordionTrigger className="text-left font-semibold text-sm md:text-base">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
