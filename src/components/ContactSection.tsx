```tsx
import { useState } from "react";

const faqItems = [
  {
    question: "What age do I need to start?",
    answer:
      "We welcome students from age 8 and up. Programs are tailored to your level.",
  },
  {
    question: "Are there any requirements?",
    answer:
      "No prior experience required — just commitment and the willingness to learn.",
  },
  {
    question: "Can I try a class for free?",
    answer:
      "Yes, your first trial class is on us. Book through the enquiry form.",
  },
  {
    question: "What equipment do I need?",
    answer:
      "Just comfortable training gear to start. We'll guide you on gloves and gear later.",
  },
  {
    question: "Where is the academy located?",
    answer:
      "We're based in Chennai, Tamil Nadu. Full address shared on enquiry.",
  },
];

const ContactSection = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0b0b0b]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(7,180,186,0.05) 1px,transparent .4px),linear-gradient(90deg,rgba(7,180,186,0.05) 1px,transparent .4px)",
        backgroundSize: "40px 40px",
      }}
    >
      <div className="w-[92%] max-w-[1400px] mx-auto py-16 md:py-24 relative z-10">
        {/* Heading */}
        <p className="text-center text-[#07b4ba] font-bold text-[12px] tracking-[3px] uppercase mb-2">
          Got Questions?
        </p>

        <h2 className="text-center font-['Bebas_Neue'] text-[36px] md:text-[60px] tracking-[3px] text-white leading-none mb-2">
          Frequently Asked <span className="text-[#07b4ba]">Questions</span>
        </h2>

        <div className="w-14 h-0.5 bg-[#07b4ba] mx-auto mt-4 mb-12 rounded-full" />

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className={`border rounded-xl bg-[#141414] overflow-hidden transition-colors duration-200 ${
                open === i
                  ? "border-[#07b4ba]/45"
                  : "border-white/8"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full bg-transparent border-none flex items-center justify-between py-5 px-6 cursor-pointer text-left gap-4"
              >
                <span
                  className={`font-bold text-[15px] md:text-[17px] leading-snug flex-1 font-['Barlow'] ${
                    open === i
                      ? "text-[#07b4ba]"
                      : "text-white"
                  }`}
                >
                  {item.question}
                </span>

                <span
                  className={`w-7 h-7 rounded-full border-[1.5px] flex items-center justify-center shrink-0 text-lg transition-all duration-300 ${
                    open === i
                      ? "border-[#07b4ba] text-[#07b4ba] rotate-45 bg-[#07b4ba]/10"
                      : "border-white/20 text-white/60"
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: open === i ? 400 : 0,
                  padding:
                    open === i
                      ? "0 24px 20px"
                      : "0 24px",
                }}
              >
                <p className="text-[14px] text-white/58 leading-[1.75] font-['Barlow']">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
```
