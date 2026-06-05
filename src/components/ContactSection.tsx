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
  {
  question: "How many days per week should I train?",
  answer:
    "For the best results, we recommend training 3–5 times per week. However, our programs can be adapted to fit your schedule and fitness level."
},
];

const ContactSection = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0b0b0b] py-16 md:py-24"
      style={{
        backgroundImage:
          "linear-gradient(rgba(7,180,186,0.05) 1px, transparent 0.4px), linear-gradient(90deg, rgba(7,180,186,0.05) 1px, transparent 0.4px)",
        backgroundSize: "40px 40px",
      }}
    >
      <div className="w-[92%] max-w-[1400px] mx-auto">
        
        {/* Header */}
        <p className="text-center text-[#07b4ba] font-bold text-[12px] tracking-[3px] uppercase mb-2">
          Got Questions?
        </p>

        <h2 className="text-center font-['Bebas_Neue'] text-[36px] md:text-[60px] tracking-[3px] text-white leading-none mb-2">
          Frequently Asked{" "}
          <span className="text-[#07b4ba]">Questions</span>
        </h2>

        <div className="w-14 h-[2px] bg-[#07b4ba] mx-auto mt-4 mb-12 rounded-full" />

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className={
                open === i
                  ? "border border-[#07b4ba]/45 rounded-xl bg-[#141414] overflow-hidden transition-all duration-300"
                  : "border border-white/10 rounded-xl bg-[#141414] overflow-hidden transition-all duration-300"
              }
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 px-6 text-left"
              >
                <span
                  className={
                    open === i
                      ? "font-['Barlow'] font-bold text-[15px] md:text-[17px] text-[#07b4ba]"
                      : "font-['Barlow'] font-bold text-[15px] md:text-[17px] text-white"
                  }
                >
                  {item.question}
                </span>

                <span
                  className={
                    open === i
                      ? "w-7 h-7 rounded-full border border-[#07b4ba] text-[#07b4ba] flex items-center justify-center rotate-45 transition-all duration-300"
                      : "w-7 h-7 rounded-full border border-white/20 text-white/60 flex items-center justify-center transition-all duration-300"
                  }
                >
                  +
                </span>
              </button>

              <div
                style={{
                  maxHeight: open === i ? "300px" : "0px",
                  padding:
                    open === i
                      ? "0 24px 20px 24px"
                      : "0 24px 0 24px",
                }}
                className="overflow-hidden transition-all duration-300"
              >
                <p className="font-['Barlow'] text-[14px] leading-[1.75] text-white/60">
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
