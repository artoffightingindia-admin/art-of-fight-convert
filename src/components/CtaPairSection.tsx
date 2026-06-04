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
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.72)" }} />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">

        {/* Blue eyebrow */}
        <p
          style={{
            color: "#07b4ba",
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          Your New Standard Starts Here
        </p>

        {/* Main heading */}
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(28px, 3vw, 48px)",
            letterSpacing: 2,
            lineHeight: 1.05,
            color: "#fff",
            margin: "0 0 4px 0",
            textTransform: "uppercase",
          }}
        >
          Join AOF. Train Like A Fighter.
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            color: "rgba(255,255,255,0.55)",
            fontSize: 14,
            marginBottom: 18,
          }}
        >
          Results Don't Wait.
        </p>

        {/* Button row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 0,
            width: "100%",
            maxWidth: 680,
          }}
        >
          {/* Left CTA */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => { window.location.href = "/coaching"; }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                backgroundColor: "#07b4ba",
                color: "#fff",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 18,
                letterSpacing: 3,
                textTransform: "uppercase",
                border: "none",
                borderRadius: 50,
                padding: "10px 22px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                width: "100%",
                maxWidth: 240,
                justifyContent: "space-between",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                {/* Person icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Explore Coaching
              </span>
              <span style={{ fontSize: 16 }}>→</span>
            </button>
            <p style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 1.5, maxWidth: 200, margin: 0 }}>
              Personalized 1-on-1 coaching<br />with direct coach attention.
            </p>
          </div>

          {/* OR divider */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingTop: 6,
              gap: 0,
              width: 48,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                border: "1.5px solid rgba(255,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: 1,
                flexShrink: 0,
              }}
            >
              OR
            </div>
            {/* Vertical line below the OR circle */}
            <div
              style={{
                width: 1,
                height: 38,
                backgroundColor: "rgba(255,255,255,0.18)",
              }}
            />
          </div>

          {/* Right CTA */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => { window.location.href = "/program"; }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                backgroundColor: "#07b4ba",
                color: "#fff",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 18,
                letterSpacing: 3,
                textTransform: "uppercase",
                border: "none",
                borderRadius: 50,
                padding: "10px 22px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                width: "100%",
                maxWidth: 240,
                justifyContent: "space-between",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                {/* Calendar icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                View 30-Day Program
              </span>
              <span style={{ fontSize: 16 }}>→</span>
            </button>
            <p style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 1.5, maxWidth: 200, margin: 0 }}>
              Structured 30-day program to build<br />skills, fitness & fighter mindset.
            </p>
          </div>
        </div>

        {/* Bottom scroll prompt */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            marginTop: 14,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
          <span style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: 12 }}>
            Explore the full structure, roadmap, and transformation process.
          </span>
        </div>
        <p style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.32)", fontSize: 11, marginTop: 3 }}>
          Choose the path that fits your goals.
        </p>
      </div>
    </section>
  );
};

export default CtaPairSection;
