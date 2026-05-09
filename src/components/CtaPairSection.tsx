import boxBg from "@/assets/Box.png";

const CtaPairSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage: `url(${boxBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        height: "280px",
      }}
    >
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.45)" }} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <p
          className="text-xs uppercase tracking-widest font-semibold mb-1"
          style={{ color: "#07b4ba" }}
        >
          Your New Standard Starts Here
        </p>
        <h2
          className="text-2xl md:text-3xl font-bold uppercase mb-1"
          style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#fff" }}
        >
          Join AOF Train Like A Fighter
        </h2>
        <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.65)" }}>
          Results Don't Wait
        </p>
        <div className="flex w-full max-w-2xl justify-between px-4 md:px-10 gap-4">
          <button
            onClick={() => { window.location.href = "/coaching"; }}
            className="flex-1 py-3 rounded-full font-semibold text-sm uppercase tracking-wide transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "#07b4ba",
              color: "#000",
              fontFamily: "'Bebas Neue', sans-serif",
            }}
          >
            1 On 1 Coaching
          </button>
          <button
            onClick={() => { window.location.href = "/program"; }}
            className="flex-1 py-3 rounded-full font-semibold text-sm uppercase tracking-wide transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "#07b4ba",
              color: "#000",
              fontFamily: "'Bebas Neue', sans-serif",
            }}
          >
            AOF 30 Days Program
          </button>
        </div>
      </div>
    </section>
  );
};

export default CtaPairSection;
