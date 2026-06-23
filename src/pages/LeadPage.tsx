import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const LeadPage = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && phone && agreed) {
      setSubmitted(true);
      // Here you can add your form submission logic
      console.log("Form submitted:", { email, phone });
      // Reset form after 2 seconds
      setTimeout(() => {
        setEmail("");
        setPhone("");
        setAgreed(false);
        setSubmitted(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section with Video Background */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob z-0"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 z-0"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 z-0"></div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Reveal animation="fade-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              HOW TO TURN YOUR IN-PERSON COACHING INTO{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-primary">
                $5K/MONTH
              </span>{" "}
              ONLINE
            </h1>
          </Reveal>

          <Reveal animation="fade-up" delay={0.2}>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Without Quitting What Already Works
            </p>
          </Reveal>

          {/* CTA Box */}
          <Reveal animation="scale-in" delay={0.4}>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/30 rounded-2xl p-8 md:p-12 max-w-md mx-auto mb-8">
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
                This live workshop will show you how to earn
              </p>
              <p className="text-5xl md:text-6xl font-bold text-white mb-4">
                $5K/<span className="text-cyan-400">MONTH</span>
              </p>
              <p className="text-gray-300 text-sm">The number most coaches are chasing</p>
            </div>
          </Reveal>

          <Reveal animation="fade-up" delay={0.6}>
            <p className="text-gray-300 text-lg mb-4">
              A free live workshop for coaches & fighters who already get paid for what they know, and want to add
              online income without burning out on more hours.
            </p>
            <p className="text-xl font-semibold text-white mb-2">Live with Purushotham MK</p>
          </Reveal>

          {/* Form Box */}
          <Reveal animation="scale-in" delay={0.8}>
            <div className="bg-white rounded-xl p-8 max-w-md mx-auto mt-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">ENTER YOUR EMAIL</h2>

              {submitted ? (
                <div className="text-center py-8">
                  <p className="text-lg font-semibold text-green-600 mb-2">✓ Success!</p>
                  <p className="text-gray-600">
                    You'll receive a private invitation & link to join the workshop on Tuesday, June 24, Workshop
                    begins at 8:30pm EST
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="e.g. sean@aoffgym.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="e.g. (555) 000-1234"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  <div className="flex items-start gap-3 py-4">
                    <input
                      type="checkbox"
                      id="agree"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      required
                      className="mt-1 w-4 h-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
                    />
                    <label htmlFor="agree" className="text-xs text-gray-600 leading-relaxed text-left cursor-pointer">
                      Yes, I will accept to receive transactional marketing texts (workshop and account information). Champion of Business at the number provided. Consent is not a condition of purchase. Message frequency varies. Msg and data rates may apply. Reply{" "}
                      <span className="font-semibold">STOP</span> to cancel.{" "}
                      <a href="#" className="text-cyan-500 hover:underline">
                        See our Terms, Conditions & Privacy details
                      </a>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!email || !phone || !agreed}
                    className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-bold py-3 px-6 rounded-lg transition-all duration-200 text-lg"
                  >
                    SAVE MY SEAT
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Workshop Details */}
          <Reveal animation="fade-up" delay={1}>
            <div className="mt-16 text-gray-300 text-sm">
              <p className="text-cyan-400 font-semibold mb-4">WORKSHOP DETAILS</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div>
                  <p className="font-semibold text-white">LIVE SESSION</p>
                  <p>On Zoom</p>
                </div>
                <div>
                  <p className="font-semibold text-white">DATE</p>
                  <p>Tuesday, June 24</p>
                </div>
                <div>
                  <p className="font-semibold text-white">TIME</p>
                  <p>8:30 PM IST</p>
                </div>
                <div>
                  <p className="font-semibold text-white">DURATION</p>
                  <p>90 Minutes</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why This Program Works Section */}
      <section className="py-20 bg-gradient-to-b from-background to-slate-900">
        <div className="container mx-auto px-4">
          <Reveal animation="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
              WHY THIS PROGRAM WORKS
            </h2>
            <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
              Built around the real challenges of beginners
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              {
                title: "Clear Roadmap",
                desc: "Know exactly what to do to launch and grow your program.",
                icon: "📋",
              },
              {
                title: "Train on Your Schedule",
                desc: "Pre-recorded sessions and trainings. Take them 24/7/365.",
                icon: "⏰",
              },
              {
                title: "Train with Confidence",
                desc: "Get expert guidance so you know you're practicing techniques correctly.",
                icon: "💪",
              },
              {
                title: "Beginner Friendly",
                desc: "Start with confidence. Never trained MMA before? We've got you covered.",
                icon: "🌟",
              },
              {
                title: "Learn in Tamil",
                desc: "Understand complex coaching delivered in Tamil and English.",
                icon: "🇮🇳",
              },
            ].map((item, idx) => (
              <Reveal key={idx} animation="fade-up" delay={idx * 0.1}>
                <div className="text-center">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="font-display text-lg font-bold text-white mb-2 uppercase">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Coach Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Reveal animation="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">LED BY</h2>
          </Reveal>

          <div className="max-w-4xl mx-auto">
            <Reveal animation="scale-in">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 md:p-12 border border-cyan-500/20">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <div className="w-full md:w-1/3">
                    <div className="w-48 h-48 rounded-lg bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-gray-700 font-bold text-2xl">
                      [Coach Photo]
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">PURUSHOTHAM MK</h3>
                    <p className="text-cyan-400 font-semibold mb-4">CEO, Art of Fighting Academy</p>
                    <ul className="space-y-3 text-gray-300 mb-6">
                      <li className="flex items-center gap-3">
                        <span className="text-primary">✓</span> Only Tamil MMA Fighter in IMP & Multiple-Time National Medalist
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-primary">✓</span> Coached 200+ Students, Including National Champions Across Multiple Disciplines
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-primary">✓</span> Specialized in Developing Strong Fundamentals for Beginners
                      </li>
                    </ul>
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                      <div>
                        <p className="text-2xl font-bold text-primary">2,000+</p>
                        <p className="text-xs text-gray-400">CLIENTS COACHED</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">10+</p>
                        <p className="text-xs text-gray-400">YEARS EXPERIENCE</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">20+</p>
                        <p className="text-xs text-gray-400">MMA FIGHTS</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">10K+</p>
                        <p className="text-xs text-gray-400">COMMUNITY</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Register Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-background">
        <div className="container mx-auto px-4">
          <Reveal animation="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
              THIS IS LIVE FOR A REASON
            </h2>
          </Reveal>

          <div className="max-w-2xl mx-auto mt-12">
            <Reveal animation="fade-up" delay={0.2}>
              <blockquote className="text-center text-lg md:text-xl text-gray-300 border-l-4 border-primary pl-6 italic">
                "You can risk me anything about your own situation in real time. At the end, I'm spending up something
                on everyone in the room."
              </blockquote>
              <p className="text-center text-gray-400 mt-4">— Sean Fagan, Coach & Trainer</p>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LeadPage;
