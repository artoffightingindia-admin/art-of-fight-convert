const CtaPairSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage: `url('/Box.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        height: "280px",
      }}
    >
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.45)" }} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <p
          className="uppercase mb-1"
          style={{ color: "#07b4ba", fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 3, textTransform: "uppercase" }}
        >
          Your New Standard Starts Here
        </p>
        <h2
          className="uppercase mb-1"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px,3vw,42px)", letterSpacing: 1.5, lineHeight: 1.1, color: "#fff" }}
        >
          Join AOF Train Like A Fighter
        </h2>
        <p className="mb-6" style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.42)", fontSize: 15 }}>
          Results Don't Wait
        </p>
        <div className="flex w-full max-w-2xl justify-between px-4 md:px-10 gap-4">
          <button
            onClick={() => { window.location.href = "/coaching"; }}
            className="flex-1 py-3 rounded-full transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "#07b4ba",
              color: "#fff",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "20px",
              letterSpacing: "3px",
            }}
          >
            1 On 1 Coaching
          </button>
          <button
            onClick={() => { window.location.href = "/program"; }}
            className="flex-1 py-3 rounded-full transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "#07b4ba",
              color: "#fff",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "20px",
              letterSpacing: "3px",
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
