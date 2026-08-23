import { ShieldCheck, Users, Trophy } from "lucide-react";
import { useCms } from "@/context/CmsContext";

const TrustIndicators = () => {
  const { content } = useCms();
  const { visibility, home } = content;

  // Respect the section ON/OFF toggle from Admin Panel
  if (!visibility?.trustIndicators) {
    return null;
  }

  const indicators = [
    { icon: ShieldCheck, title: home.trust1 ?? "Proven System" },
    { icon: Users, title: home.trust2 ?? "Tamil Team" },
    { icon: Trophy, title: home.trust3 ?? "Real Results" },
  ];

  return (
    <div
      className="w-full bg-[#07b4ba] relative z-20 flex items-center shrink-0 px-2 md:px-8"
      style={{ height: "1.5cm" }}
    >
      <div className="w-full flex items-center justify-between gap-0">
        {indicators.map((item, idx) => (
          <div key={idx} className="flex-1 flex items-center justify-center gap-1.5 md:gap-3">
            <item.icon
              className="w-5 h-5 md:w-7 md:h-7 text-white shrink-0"
              strokeWidth={1.8}
            />
            <span
              className="font-['Bebas_Neue'] text-white text-[13px] md:text-[22px] tracking-[1px] md:tracking-[2px] leading-none whitespace-nowrap mt-0.5"
            >
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustIndicators;
