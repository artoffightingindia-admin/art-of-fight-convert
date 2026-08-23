import { useState } from "react";
import { useCms } from "@/context/CmsContext";

const defaultFaqItems = [
  {
    id: "1",
    question: "What is AOF?",
    answer:
      "AOF is a coaching platform focused on helping people build real fighting skills, fitness, discipline, and confidence through structured training systems.",
  },
  {
    id: "2",
    question: "Which program is right for me?",
    answer:
      "Choose the 30-Day Program if you want a structured online system. Choose 1-on-1 Coaching if you want personalized guidance and direct coach support.",
  },
  {
    id: "3",
    question: "Do I need prior MMA experience?",
    answer:
      "No. Both beginners and experienced athletes can benefit from our programs.",
  },
  {
    id: "4",
    question: "Can I train from home?",
    answer:
      "Yes. Our programs are designed to be practical and accessible, even if you don't train at a gym every day.",
  },
  {
    id: "5",
    question: "Will I receive coach support?",
    answer:
      "Yes. The level of support depends on the program you choose, with 1-on-1 Coaching offering the most direct guidance.",
  },
  {
    id: "6",
    question: "How do I get started?",
    answer:
      "Simply explore the program that best fits your goals and follow the enrollment process on the next page.",
  },
];

const ContactSection = () => {
  const { content } = useCms();
  const c = content.home;
  const faqItems = c.homeFaqs?.length ? c.homeFaqs : defaultFaqItems;
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
        <p className="text-center text-[#07b4ba] font-bold text-[14px] tracking-[4px] uppercase mb-3 font-['Barlow']">
          {c.contactEyebrow || "Got Questions?"}
        </p>

        <h2 className="text-center font-['Bebas_Neue'] text-[36px] md:text-[60px] tracking-[3px] text-white leading-none mb-2">
          {c.contactHeadingMain || "Frequently Asked"}{" "}
          <span className="text-[#07b4ba]">{c.contactHeadingAccent || "Questions"}</span>
        </h2>

        <div className="w-14 h-[2px] bg-[#07b4ba] mx-auto mt-4 mb-12 rounded-full" />

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {faqItems.map((item, i) => (
            <div
              key={item.id || i}
              className={
                open === i
                  ? "border border-[#07b4ba]/45 rounded-xl bg-[#141414] overflow-hidden transition-all duration-300"
                  : "border border-white/10 rounded-xl bg-[#141414] overflow-hidden transition-all duration-300"
              }
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 px-6 text-left cursor-pointer"
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
                      ? "w-7 h-7 rounded-full border border-[#07b4ba] text-[#07b4ba] flex items-center justify-center rotate-45 transition-all duration-300 font-mono text-sm"
                      : "w-7 h-7 rounded-full border border-white/20 text-white/60 flex items-center justify-center transition-all duration-300 font-mono text-sm"
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
