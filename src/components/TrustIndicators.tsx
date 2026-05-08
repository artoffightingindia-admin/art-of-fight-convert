import { ShieldCheck, Users, Trophy } from "lucide-react";

const indicators = [
  { icon: ShieldCheck, title: "Proven System" },
  { icon: Users, title: "Tamil Team" },
  { icon: Trophy, title: "Real Results" },
];

const TrustIndicators = () => (
  <div
    className="grid grid-cols-3 w-full gap-4 md:gap-6 px-4 md:px-8"
    style={{ backgroundColor: "#07b4ba", height: "2cm" }}
  >
    {indicators.map((item) => (
      <div key={item.title} className="flex items-center justify-center gap-2 text-center">
        <item.icon
          style={{ width: "20px", height: "20px", color: "#000", flexShrink: 0 }}
        />
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: "#000",
            fontSize: "clamp(14px, 2vw, 18px)",
            letterSpacing: "0.12em",
            whiteSpace: "nowrap",
          }}
        >
          {item.title}
        </span>
      </div>
    ))}
  </div>
);

export default TrustIndicators;
