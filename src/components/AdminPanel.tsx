import React, { useState, useEffect } from "react";
import { useCms, SiteContent } from "../context/CmsContext";
import { Plus, Trash2, Eye, EyeOff, X, ArrowUp, ArrowDown, Loader2 } from "lucide-react";

export const AdminPanel: React.FC = () => {
  const {
    content,
    updateContent,
    resetContent,
    isAuthModalOpen,
    setIsAuthModalOpen,
    isPanelOpen,
    setIsPanelOpen,
    login,
    logout
  } = useCms();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<
    | "visibility"
    | "home_hero"
    | "home_cards"
    | "home_coaches"
    | "home_videos"
    | "home_testimonials"
    | "home_faqs"
    | "prog_hero_pain"
    | "prog_intro_why"
    | "prog_roadmap"
    | "prog_promise_coach"
    | "prog_reviews"
    | "prog_bonuses"
    | "prog_cta"
    | "prog_faqs"
    | "contact"
  >("visibility");

  const [formData, setFormData] = useState<SiteContent>(content);

  useEffect(() => {
    setFormData(content);
  }, [content]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isPanelOpen) setIsPanelOpen(false);
        if (isAuthModalOpen) setIsAuthModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isPanelOpen, isAuthModalOpen, setIsPanelOpen, setIsAuthModalOpen]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError("");

    const success = await login(email, password);
    setIsLoggingIn(false);

    if (!success) {
      setError("Invalid Email ID or Password. Check your Supabase Authentication users.");
    } else {
      setError("");
      setEmail("");
      setPassword("");
    }
  };

  const handleContentSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const success = await updateContent(formData);
    setIsSaving(false);

    if (success) {
      alert("All changes successfully saved and published live to Supabase!");
    } else {
      alert("Failed to save changes to Supabase. Check console logs or verify your admin permissions.");
    }
  };

  const toggleVisibility = (key: keyof SiteContent["visibility"]) => {
    setFormData((prev) => ({
      ...prev,
      visibility: {
        ...prev.visibility,
        [key]: !prev.visibility[key]
      }
    }));
  };

  const moveArrayItem = (list: any[], index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= list.length) return list;
    const updated = [...list];
    const item = updated.splice(index, 1)[0];
    updated.splice(newIndex, 0, item);
    return updated;
  };

  return (
    <>
      {/* ── AUTHENTICATION MODAL ── */}
      {isAuthModalOpen && (
        <div 
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setIsAuthModalOpen(false)}
        >
          <div 
            className="bg-zinc-950 border border-zinc-800 rounded-xl max-w-md w-full p-6 text-white shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded hover:bg-zinc-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold tracking-wider text-[#07b4ba] mb-1">AOF MASTER CONTROL</h2>
            <p className="text-xs text-zinc-400 mb-4">Enter Supabase admin credentials to unlock site management.</p>
            {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-xs p-2 rounded mb-4">{error}</div>}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-300 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#07b4ba]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-300 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#07b4ba]"
                  required
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button 
                  type="submit" 
                  disabled={isLoggingIn}
                  className="flex-1 bg-[#07b4ba] hover:bg-[#069ca1] text-black font-bold py-2 rounded text-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoggingIn && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isLoggingIn ? "Verifying..." : "Authorize"}
                </button>
                <button type="button" onClick={() => setIsAuthModalOpen(false)} className="px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm rounded transition cursor-pointer">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── ADMIN PANEL DRAWER ── */}
      {isPanelOpen && (
        <div className="fixed inset-0 z-[1000] flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="flex-1" onClick={() => setIsPanelOpen(false)} />
          <div className="w-full max-w-3xl bg-zinc-950 border-l border-zinc-800 text-white shadow-2xl flex flex-col font-sans h-full">
            {/* Header */}
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/90">
              <div>
                <h2 className="font-bold text-lg text-[#07b4ba]">AOF Total Live Studio</h2>
                <span className="text-xs text-zinc-400">Complete Master Control System</span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={logout} className="text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded text-zinc-300 cursor-pointer">Logout</button>
                <button type="button" onClick={() => setIsPanelOpen(false)} className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white cursor-pointer" title="Close Panel">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Nav Tabs */}
            <div className="flex border-b border-zinc-800 overflow-x-auto text-xs bg-zinc-950 shrink-0">
              {[
                { id: "visibility", label: "Section ON/OFF" },
                { id: "home_hero", label: "Home: Hero & Why" },
                { id: "home_cards", label: "Home: Path & Cards" },
                { id: "home_coaches", label: "Home: Coaches" },
                { id: "home_videos", label: "Home: All 4 Videos" },
                { id: "home_testimonials", label: "Home: Testimonials" },
                { id: "home_faqs", label: "Home: FAQ Questions" },
                { id: "prog_hero_pain", label: "Prog: Hero & Pain Video" },
                { id: "prog_intro_why", label: "Prog: Intro & Why Cards" },
                { id: "prog_roadmap", label: "Prog: 5-Week Blueprint" },
                { id: "prog_promise_coach", label: "Prog: Promise & Coach" },
                { id: "prog_reviews", label: "Prog: Video & Reviews" },
                { id: "prog_bonuses", label: "Prog: Bonuses" },
                { id: "prog_cta", label: "Prog: CTA & Price Switch" },
                { id: "prog_faqs", label: "Prog: FAQs" },
                { id: "contact", label: "Footer & Contact" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                    activeTab === tab.id ? "border-[#07b4ba] text-[#07b4ba] bg-zinc-900" : "border-transparent text-zinc-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleContentSave} className="p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* 1. VISIBILITY */}
              {activeTab === "visibility" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/40 space-y-3">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Landing Page Sections</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(formData.visibility || {}).slice(0, 10).map(([key, val]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => toggleVisibility(key as any)}
                          className={`flex items-center justify-between p-2 rounded border transition-all cursor-pointer ${
                            val ? "bg-[#07b4ba]/10 border-[#07b4ba] text-white" : "bg-zinc-900 border-zinc-800 text-zinc-500"
                          }`}
                        >
                          <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                          {val ? <Eye className="w-3.5 h-3.5 text-[#07b4ba]" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/40 space-y-3">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Program Page Sections</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(formData.visibility || {}).slice(10).map(([key, val]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => toggleVisibility(key as any)}
                          className={`flex items-center justify-between p-2 rounded border transition-all cursor-pointer ${
                            val ? "bg-[#07b4ba]/10 border-[#07b4ba] text-white" : "bg-zinc-900 border-zinc-800 text-zinc-500"
                          }`}
                        >
                          <span className="capitalize">{key.replace("program", "").replace(/([A-Z])/g, " $1")}</span>
                          {val ? <Eye className="w-3.5 h-3.5 text-[#07b4ba]" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. HOME HERO & WHY AOF */}
              {activeTab === "home_hero" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Hero Banner</h4>
                    <input type="text" value={formData.home.heroTagline ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, heroTagline: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white" placeholder="Hero Tagline" />
                    <textarea rows={2} value={formData.home.heroTitle ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, heroTitle: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white font-mono" placeholder="Hero Title (Line by line)" />
                    <textarea rows={2} value={formData.home.heroSubtitle ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, heroSubtitle: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white" placeholder="Hero Subtitle" />
                    <input type="text" value={formData.home.heroImage ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, heroImage: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white" placeholder="Hero Background Image" />
                  </div>
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Trust 3 Pillars</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <input type="text" value={formData.home.trust1 ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, trust1: e.target.value } })} className="bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" />
                      <input type="text" value={formData.home.trust2 ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, trust2: e.target.value } })} className="bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" />
                      <input type="text" value={formData.home.trust3 ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, trust3: e.target.value } })} className="bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" />
                    </div>
                  </div>
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Why AOF Section</h4>
                    <input type="text" value={formData.home.introTagline ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, introTagline: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white" placeholder="Tagline" />
                    <input type="text" value={formData.home.introHeading ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, introHeading: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white" placeholder="Heading" />
                    <textarea rows={3} value={formData.home.introParagraph1 ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, introParagraph1: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white" placeholder="Paragraph 1" />
                    <textarea rows={3} value={formData.home.introParagraph2 ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, introParagraph2: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white" placeholder="Paragraph 2" />
                  </div>
                </div>
              )}

              {/* 3. HOME: CHOOSE PATH */}
              {activeTab === "home_cards" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Choose Path Section</h4>
                    <input type="text" value={formData.home.servicesTagline ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, servicesTagline: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white" placeholder="Tagline" />
                    <input type="text" value={formData.home.servicesHeading ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, servicesHeading: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white" placeholder="Heading" />
                    <textarea rows={2} value={formData.home.servicesSubtitle ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, servicesSubtitle: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white" placeholder="Subtitle" />
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Card 1: 1-on-1 Transformation</h4>
                    <input type="text" value={formData.home.card1Badge ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, card1Badge: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Badge" />
                    <input type="text" value={formData.home.card1Title ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, card1Title: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white" placeholder="Title" />
                    <textarea rows={2} value={formData.home.card1Desc ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, card1Desc: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Desc" />
                    <label className="block text-xs text-zinc-400 font-semibold mt-2">Card 1 Bullet Points (1 per line):</label>
                    <textarea
                      rows={3}
                      value={(formData.home.card1Points || []).join("\n")}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, card1Points: e.target.value.split("\n") } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                    />
                    <input type="text" value={formData.home.card1BtnText ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, card1BtnText: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Button Text" />
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Card 2: 30-Day Program</h4>
                    <input type="text" value={formData.home.card2Badge ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, card2Badge: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Badge" />
                    <input type="text" value={formData.home.card2Title ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, card2Title: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white" placeholder="Title" />
                    <textarea rows={2} value={formData.home.card2Desc ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, card2Desc: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Desc" />
                    <label className="block text-xs text-zinc-400 font-semibold mt-2">Card 2 Bullet Points (1 per line):</label>
                    <textarea
                      rows={3}
                      value={(formData.home.card2Points || []).join("\n")}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, card2Points: e.target.value.split("\n") } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                    />
                    <input type="text" value={formData.home.card2BtnText ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, card2BtnText: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Button Text" />
                  </div>
                </div>
              )}

              {/* 4. HOME: COACHES */}
              {activeTab === "home_coaches" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Head Coach (Purushothaman MK)</h4>
                    <input type="text" value={formData.home.coach1Name ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, coach1Name: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white" placeholder="Name" />
                    <input type="text" value={formData.home.coach1Title ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, coach1Title: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Title" />
                    <input type="text" value={formData.home.coach1Image ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, coach1Image: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Image URL" />
                    <textarea rows={3} value={formData.home.coach1Bio ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, coach1Bio: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Bio Paragraph" />
                    <label className="block text-xs text-zinc-400 font-semibold mt-2">Coach 1 Bullet Points (1 per line):</label>
                    <textarea
                      rows={3}
                      value={(formData.home.coach1Points || []).join("\n")}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, coach1Points: e.target.value.split("\n") } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                    />
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Team Coach (Kaviarasu K)</h4>
                    <input type="text" value={formData.home.coach2Name ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, coach2Name: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white" placeholder="Name" />
                    <input type="text" value={formData.home.coach2Title ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, coach2Title: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Title" />
                    <input type="text" value={formData.home.coach2Image ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, coach2Image: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Image URL" />
                    <textarea rows={3} value={formData.home.coach2Bio ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, coach2Bio: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Bio Paragraph" />
                    <label className="block text-xs text-zinc-400 font-semibold mt-2">Coach 2 Bullet Points (1 per line):</label>
                    <textarea
                      rows={3}
                      value={(formData.home.coach2Points || []).join("\n")}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, coach2Points: e.target.value.split("\n") } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* 5. HOME: ALL 4 VIDEOS */}
              {activeTab === "home_videos" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Showcase Short 1 (Vertical)</h4>
                    <input type="text" value={formData.home.socialProofVideo1 ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, socialProofVideo1: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white" placeholder="zjcVWjWSJog or YouTube Link" />
                  </div>
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Showcase Short 2 (Vertical)</h4>
                    <input type="text" value={formData.home.socialProofVideo2 ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, socialProofVideo2: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white" placeholder="xuAeRmO82Gk or YouTube Link" />
                  </div>
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Showcase Short 3 (Vertical)</h4>
                    <input type="text" value={formData.home.socialProofVideo3 ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, socialProofVideo3: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white" placeholder="H49Y6b7wn58 or YouTube Link" />
                  </div>
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Video 4: Testimonials Player (16:9)</h4>
                    <input type="text" value={formData.home.testimonialVideoHeading ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, testimonialVideoHeading: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white mb-2" placeholder="Video Callout Caption" />
                    <input type="text" value={formData.home.testimonialVideoUrl ?? ""} onChange={(e) => setFormData({ ...formData, home: { ...formData.home, testimonialVideoUrl: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white" placeholder="KTlqLcAeisU or YouTube Link" />
                  </div>
                </div>
              )}

              {/* 6. HOME: TESTIMONIALS */}
              {activeTab === "home_testimonials" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Home Testimonials (With Photo Support)</h4>
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          home: {
                            ...formData.home,
                            testimonials: [...(formData.home.testimonials || []), { id: Date.now().toString(), author: "New Member", role: "Member", text: "Training was amazing!", image: "" }]
                          }
                        })}
                        className="flex items-center gap-1 text-xs bg-[#07b4ba] text-black px-2.5 py-1 rounded font-bold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> Add Testimonial
                      </button>
                    </div>

                    {(formData.home.testimonials || []).map((t, idx) => (
                      <div key={t.id || idx} className="p-3 bg-zinc-950 border border-zinc-800 rounded space-y-2">
                        <div className="flex gap-2">
                          <input type="text" value={t.author ?? ""} placeholder="Name" onChange={(e) => {
                            const updated = [...(formData.home.testimonials || [])];
                            updated[idx].author = e.target.value;
                            setFormData({ ...formData, home: { ...formData.home, testimonials: updated } });
                          }} className="flex-1 bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white" />
                          <input type="text" value={t.role ?? ""} placeholder="Role" onChange={(e) => {
                            const updated = [...(formData.home.testimonials || [])];
                            updated[idx].role = e.target.value;
                            setFormData({ ...formData, home: { ...formData.home, testimonials: updated } });
                          }} className="w-28 bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white" />
                          <button type="button" onClick={() => {
                            const updated = (formData.home.testimonials || []).filter((_, i) => i !== idx);
                            setFormData({ ...formData, home: { ...formData.home, testimonials: updated } });
                          }} className="text-red-400 p-1 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                        </div>
                        <input type="text" value={t.image ?? ""} placeholder="Profile Image URL (leave empty for automatic letter icon)" onChange={(e) => {
                          const updated = [...(formData.home.testimonials || [])];
                          updated[idx].image = e.target.value;
                          setFormData({ ...formData, home: { ...formData.home, testimonials: updated } });
                        }} className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white" />
                        <textarea rows={2} value={t.text ?? ""} placeholder="Quote" onChange={(e) => {
                          const updated = [...(formData.home.testimonials || [])];
                          updated[idx].text = e.target.value;
                          setFormData({ ...formData, home: { ...formData.home, testimonials: updated } });
                        }} className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. HOME: FAQS */}
              {activeTab === "home_faqs" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Header Customization</h4>
                    <input
                      type="text"
                      value={formData.home.contactEyebrow ?? ""}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, contactEyebrow: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                      placeholder="Eyebrow Tagline (e.g. Got Questions?)"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={formData.home.contactHeadingMain ?? ""}
                        onChange={(e) => setFormData({ ...formData, home: { ...formData.home, contactHeadingMain: e.target.value } })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white"
                        placeholder="Heading Main (e.g. Frequently Asked)"
                      />
                      <input
                        type="text"
                        value={formData.home.contactHeadingAccent ?? ""}
                        onChange={(e) => setFormData({ ...formData, home: { ...formData.home, contactHeadingAccent: e.target.value } })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white font-bold"
                        placeholder="Accent (e.g. Questions)"
                      />
                    </div>
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Home Frequently Asked Questions</h4>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            home: {
                              ...formData.home,
                              homeFaqs: [
                                ...(formData.home.homeFaqs || []),
                                { id: Date.now().toString(), question: "New Question?", answer: "Answer here." }
                              ]
                            }
                          })
                        }
                        className="flex items-center gap-1 text-xs bg-[#07b4ba] text-black px-2.5 py-1 rounded font-bold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> Add FAQ
                      </button>
                    </div>

                    {(formData.home.homeFaqs || []).map((faq, idx) => (
                      <div key={faq.id || idx} className="p-3 bg-zinc-950 border border-zinc-800 rounded space-y-2">
                        <div className="flex justify-between items-center gap-2">
                          <input
                            type="text"
                            value={faq.question ?? ""}
                            onChange={(e) => {
                              const updated = [...(formData.home.homeFaqs || [])];
                              updated[idx].question = e.target.value;
                              setFormData({ ...formData, home: { ...formData.home, homeFaqs: updated } });
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-semibold"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (formData.home.homeFaqs || []).filter((_, i) => i !== idx);
                              setFormData({ ...formData, home: { ...formData.home, homeFaqs: updated } });
                            }}
                            className="text-red-400 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={faq.answer ?? ""}
                          onChange={(e) => {
                            const updated = [...(formData.home.homeFaqs || [])];
                            updated[idx].answer = e.target.value;
                            setFormData({ ...formData, home: { ...formData.home, homeFaqs: updated } });
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. PROGRAM: HERO & SOUND FAMILIAR */}
              {activeTab === "prog_hero_pain" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Program Hero</h4>
                    <input type="text" value={formData.program.heroTagline ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, heroTagline: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Tagline" />
                    <textarea rows={2} value={formData.program.heroTitle ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, heroTitle: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white font-mono" placeholder="Title" />
                    <textarea rows={2} value={formData.program.heroSubtitle ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, heroSubtitle: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Subtitle" />
                    <input type="text" value={formData.program.heroBgImage ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, heroBgImage: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Hero Image URL" />
                    <input type="text" value={formData.program.heroBtnText ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, heroBtnText: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="CTA Button Text" />
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Sounds Familiar (Pain Section)</h4>
                    <input type="text" value={formData.program.painTitle ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, painTitle: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white" placeholder="Pain Title" />
                    <input type="text" value={formData.program.painTagline ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, painTagline: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Pain Tagline" />
                    <textarea rows={2} value={formData.program.painSubheading ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, painSubheading: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Subheading" />
                    <input type="text" value={formData.program.painVideoUrl ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, painVideoUrl: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white" placeholder="YouTube Embed URL / ID" />
                    <label className="block text-xs text-zinc-400 font-semibold mt-2">Pain Bullet Points (1 per line):</label>
                    <textarea
                      rows={5}
                      value={(formData.program.painPoints || []).join("\n")}
                      onChange={(e) => setFormData({ ...formData, program: { ...formData.program, painPoints: e.target.value.split("\n") } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* 9. PROGRAM: INTRO & WHY THIS PROGRAM WORKS */}
              {activeTab === "prog_intro_why" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Introducing AOF 30-Day Program</h4>
                    <input type="text" value={formData.program.introTagline ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, introTagline: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Tagline" />
                    <input type="text" value={formData.program.introHeading ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, introHeading: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white" placeholder="Heading" />
                    <input type="text" value={formData.program.introImage ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, introImage: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Section Image URL" />
                    <textarea rows={3} value={formData.program.introText1 ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, introText1: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Paragraph 1" />
                    <textarea rows={2} value={formData.program.introText2 ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, introText2: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Paragraph 2" />
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Why This Program Works (Cards & Positions)</h4>
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          program: {
                            ...formData.program,
                            whyCards: [...(formData.program.whyCards || []), { id: Date.now().toString(), title: "NEW REASON", desc: "Description here." }]
                          }
                        })}
                        className="flex items-center gap-1 text-xs bg-[#07b4ba] text-black px-2.5 py-1 rounded font-bold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> Add Card
                      </button>
                    </div>

                    <input type="text" value={formData.program.whyTagline ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, whyTagline: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Tagline" />
                    <input type="text" value={formData.program.whyHeading ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, whyHeading: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white" placeholder="Heading" />

                    {(formData.program.whyCards || []).map((card, idx) => (
                      <div key={card.id || idx} className="p-3 bg-zinc-950 border border-zinc-800 rounded space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <input type="text" value={card.title ?? ""} onChange={(e) => {
                            const updated = [...(formData.program.whyCards || [])];
                            updated[idx].title = e.target.value;
                            setFormData({ ...formData, program: { ...formData.program, whyCards: updated } });
                          }} className="flex-1 bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-bold" />
                          <div className="flex items-center gap-1">
                            <button type="button" onClick={() => setFormData({ ...formData, program: { ...formData.program, whyCards: moveArrayItem(formData.program.whyCards, idx, "up") } })} className="p-1 text-zinc-400 hover:text-white cursor-pointer"><ArrowUp className="w-3.5 h-3.5" /></button>
                            <button type="button" onClick={() => setFormData({ ...formData, program: { ...formData.program, whyCards: moveArrayItem(formData.program.whyCards, idx, "down") } })} className="p-1 text-zinc-400 hover:text-white cursor-pointer"><ArrowDown className="w-3.5 h-3.5" /></button>
                            <button type="button" onClick={() => setFormData({ ...formData, program: { ...formData.program, whyCards: (formData.program.whyCards || []).filter((_, i) => i !== idx) } })} className="p-1 text-red-400 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                        <textarea rows={2} value={card.desc ?? ""} onChange={(e) => {
                          const updated = [...(formData.program.whyCards || [])];
                          updated[idx].desc = e.target.value;
                          setFormData({ ...formData, program: { ...formData.program, whyCards: updated } });
                        }} className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 10. PROGRAM: 5-WEEK ROADMAP */}
              {activeTab === "prog_roadmap" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Blueprint Headings & Footnote</h4>
                    <input type="text" value={formData.program.roadmapTagline ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, roadmapTagline: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Tagline" />
                    <input type="text" value={formData.program.roadmapHeading ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, roadmapHeading: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white" placeholder="Heading" />
                    <textarea rows={2} value={formData.program.roadmapSubtitle ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, roadmapSubtitle: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Subtitle" />
                    <textarea rows={3} value={formData.program.roadmapFootnote ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, roadmapFootnote: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Bottom Note" />
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">5-Week Cards (Images, Days & Bullet Points)</h4>
                    {(formData.program.roadmapCards || []).map((card, idx) => (
                      <div key={card.id || idx} className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <input type="text" value={card.title ?? ""} onChange={(e) => {
                            const updated = [...(formData.program.roadmapCards || [])];
                            updated[idx].title = e.target.value;
                            setFormData({ ...formData, program: { ...formData.program, roadmapCards: updated } });
                          }} className="bg-zinc-950 border border-zinc-800 rounded p-1.5 text-xs text-white font-bold" placeholder="Week Title" />
                          <input type="text" value={card.days ?? ""} onChange={(e) => {
                            const updated = [...(formData.program.roadmapCards || [])];
                            updated[idx].days = e.target.value;
                            setFormData({ ...formData, program: { ...formData.program, roadmapCards: updated } });
                          }} className="bg-zinc-950 border border-zinc-800 rounded p-1.5 text-xs text-white" placeholder="Days subtitle" />
                        </div>
                        <input type="text" value={card.image ?? ""} onChange={(e) => {
                          const updated = [...(formData.program.roadmapCards || [])];
                          updated[idx].image = e.target.value;
                          setFormData({ ...formData, program: { ...formData.program, roadmapCards: updated } });
                        }} className="w-full bg-zinc-950 border border-zinc-800 rounded p-1.5 text-xs text-white" placeholder="Image URL" />
                        <label className="block text-xs text-zinc-400 font-semibold mt-1">Week {idx + 1} Bullet Points (1 per line):</label>
                        <textarea
                          rows={4}
                          value={(card.points || []).join("\n")}
                          onChange={(e) => {
                            const updated = [...(formData.program.roadmapCards || [])];
                            updated[idx].points = e.target.value.split("\n");
                            setFormData({ ...formData, program: { ...formData.program, roadmapCards: updated } });
                          }}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 11. PROGRAM: PROMISE & LED BY COACH */}
              {activeTab === "prog_promise_coach" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Our Promise Section</h4>
                    <input type="text" value={formData.program.promiseHeading ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, promiseHeading: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white" placeholder="Heading" />
                    <textarea rows={3} value={formData.program.promiseQuote ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, promiseQuote: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Promise Quote" />
                    <input type="text" value={formData.program.promiseBtnText ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, promiseBtnText: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Button Text" />
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">LED BY Coach Section</h4>
                    <input type="text" value={formData.program.coachTagline ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, coachTagline: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Tagline" />
                    <input type="text" value={formData.program.coachName ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, coachName: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white" placeholder="Coach Name" />
                    <input type="text" value={formData.program.coachTitle ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, coachTitle: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Coach Title" />
                    <input type="text" value={formData.program.coachImage ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, coachImage: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Coach Image URL" />
                    <label className="block text-xs text-zinc-400 font-semibold mt-2">Coach Credentials (1 per line):</label>
                    <textarea
                      rows={3}
                      value={(formData.program.coachCreds || []).join("\n")}
                      onChange={(e) => setFormData({ ...formData, program: { ...formData.program, coachCreds: e.target.value.split("\n") } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                    />

                    <label className="block text-xs text-zinc-400 font-semibold mt-2">Coach Stats (4 counter cards):</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(formData.program.stats || []).map((s, idx) => (
                        <div key={idx} className="flex gap-1">
                          <input type="text" value={s.val ?? ""} onChange={(e) => {
                            const updated = [...(formData.program.stats || [])];
                            updated[idx].val = e.target.value;
                            setFormData({ ...formData, program: { ...formData.program, stats: updated } });
                          }} className="w-20 bg-zinc-900 border border-zinc-800 rounded p-1 text-xs text-white" placeholder="2,000+" />
                          <input type="text" value={s.label ?? ""} onChange={(e) => {
                            const updated = [...(formData.program.stats || [])];
                            updated[idx].label = e.target.value;
                            setFormData({ ...formData, program: { ...formData.program, stats: updated } });
                          }} className="flex-1 bg-zinc-900 border border-zinc-800 rounded p-1 text-xs text-white" placeholder="Label" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 12. PROGRAM: FROM OUR FIRST BATCH */}
              {activeTab === "prog_reviews" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Batch Testimonial Video Feature</h4>
                    <input type="text" value={formData.program.testimonialTagline ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, testimonialTagline: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Tagline" />
                    <input type="text" value={formData.program.testimonialHeading ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, testimonialHeading: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white font-mono" placeholder="Heading" />
                    <input type="text" value={formData.program.testimonialSubheading ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, testimonialSubheading: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Subheading" />
                    <input type="text" value={formData.program.testimonialVideoUrl ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, testimonialVideoUrl: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white" placeholder="YouTube Embed URL / ID" />
                    <input type="text" value={formData.program.testimonialQuote ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, testimonialQuote: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Quote Title" />
                    <textarea rows={3} value={formData.program.testimonialText ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, testimonialText: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Quote Body" />
                    <input type="text" value={formData.program.testimonialAuthor ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, testimonialAuthor: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Quote Author" />
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Feedback Slider Cards</h4>
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          program: {
                            ...formData.program,
                            feedbacks: [...(formData.program.feedbacks || []), { id: Date.now().toString(), author: "New Student", text: "Great structure and feedback!", role: "Member", image: "" }]
                          }
                        })}
                        className="flex items-center gap-1 text-xs bg-[#07b4ba] text-black px-2.5 py-1 rounded font-bold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> Add Feedback
                      </button>
                    </div>

                    {(formData.program.feedbacks || []).map((f, idx) => (
                      <div key={f.id || idx} className="p-3 bg-zinc-950 border border-zinc-800 rounded space-y-2">
                        <div className="flex justify-between items-center gap-2">
                          <input type="text" value={f.author ?? ""} placeholder="Name" onChange={(e) => {
                            const updated = [...(formData.program.feedbacks || [])];
                            updated[idx].author = e.target.value;
                            setFormData({ ...formData, program: { ...formData.program, feedbacks: updated } });
                          }} className="flex-1 bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white" />
                          <input type="text" value={f.role ?? ""} placeholder="Role" onChange={(e) => {
                            const updated = [...(formData.program.feedbacks || [])];
                            updated[idx].role = e.target.value;
                            setFormData({ ...formData, program: { ...formData.program, feedbacks: updated } });
                          }} className="w-24 bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white" />
                          <button type="button" onClick={() => {
                            const updated = (formData.program.feedbacks || []).filter((_, i) => i !== idx);
                            setFormData({ ...formData, program: { ...formData.program, feedbacks: updated } });
                          }} className="text-red-400 p-1 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                        </div>
                        <input type="text" value={f.image ?? ""} placeholder="Profile Image URL (leave empty for automatic letter initials)" onChange={(e) => {
                          const updated = [...(formData.program.feedbacks || [])];
                          updated[idx].image = e.target.value;
                          setFormData({ ...formData, program: { ...formData.program, feedbacks: updated } });
                        }} className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white" />
                        <textarea rows={2} value={f.text ?? ""} placeholder="Feedback Text" onChange={(e) => {
                          const updated = [...(formData.program.feedbacks || [])];
                          updated[idx].text = e.target.value;
                          setFormData({ ...formData, program: { ...formData.program, feedbacks: updated } });
                        }} className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 13. PROGRAM: BONUSES */}
              {activeTab === "prog_bonuses" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Bonuses Headings & Positions</h4>
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          program: {
                            ...formData.program,
                            bonuses: [...(formData.program.bonuses || []), { id: Date.now().toString(), title: "NEW BONUS", desc: "Bonus description" }]
                          }
                        })}
                        className="flex items-center gap-1 text-xs bg-[#07b4ba] text-black px-2.5 py-1 rounded font-bold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> Add Bonus
                      </button>
                    </div>

                    <input type="text" value={formData.program.bonusTagline ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, bonusTagline: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Tagline" />
                    <input type="text" value={formData.program.bonusHeading ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, bonusHeading: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white font-mono" placeholder="Heading" />
                    <input type="text" value={formData.program.bonusSubtitle ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, bonusSubtitle: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Subtitle" />
                    <input type="text" value={formData.program.bonusWorth ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, bonusWorth: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white font-bold" placeholder="Worth (e.g. ₹2,999)" />

                    {(formData.program.bonuses || []).map((bonus, idx) => (
                      <div key={bonus.id || idx} className="p-3 bg-zinc-950 border border-zinc-800 rounded space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <input type="text" value={bonus.title ?? ""} onChange={(e) => {
                            const updated = [...(formData.program.bonuses || [])];
                            updated[idx].title = e.target.value;
                            setFormData({ ...formData, program: { ...formData.program, bonuses: updated } });
                          }} className="flex-1 bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-bold" />
                          <div className="flex items-center gap-1">
                            <button type="button" onClick={() => setFormData({ ...formData, program: { ...formData.program, bonuses: moveArrayItem(formData.program.bonuses, idx, "up") } })} className="p-1 text-zinc-400 hover:text-white cursor-pointer"><ArrowUp className="w-3.5 h-3.5" /></button>
                            <button type="button" onClick={() => setFormData({ ...formData, program: { ...formData.program, bonuses: moveArrayItem(formData.program.bonuses, idx, "down") } })} className="p-1 text-zinc-400 hover:text-white cursor-pointer"><ArrowDown className="w-3.5 h-3.5" /></button>
                            <button type="button" onClick={() => setFormData({ ...formData, program: { ...formData.program, bonuses: (formData.program.bonuses || []).filter((_, i) => i !== idx) } })} className="p-1 text-red-400 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                        <textarea rows={2} value={bonus.desc ?? ""} onChange={(e) => {
                          const updated = [...(formData.program.bonuses || [])];
                          updated[idx].desc = e.target.value;
                          setFormData({ ...formData, program: { ...formData.program, bonuses: updated } });
                        }} className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 14. PROGRAM: CTA CARD & STRIKE-OUT PRICING SWITCH */}
              {activeTab === "prog_cta" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Ready To Start CTA Section</h4>
                    <input type="text" value={formData.program.ctaTagline ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, ctaTagline: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Tagline" />
                    <input type="text" value={formData.program.ctaHeading ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, ctaHeading: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white font-mono" placeholder="Heading (Line by line)" />
                    <textarea rows={2} value={formData.program.ctaDesc ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, ctaDesc: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Description" />
                    
                    <label className="block text-xs text-zinc-400 font-semibold mt-2">CTA Bullet Points (1 per line):</label>
                    <textarea
                      rows={4}
                      value={(formData.program.ctaFeatures || []).join("\n")}
                      onChange={(e) => setFormData({ ...formData, program: { ...formData.program, ctaFeatures: e.target.value.split("\n") } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                    />

                    <h5 className="font-bold text-xs uppercase text-[#07b4ba] mt-4">Conditional Guarantee</h5>
                    <input type="text" value={formData.program.guaranteeTitle ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, guaranteeTitle: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Guarantee Title" />
                    <textarea rows={2} value={formData.program.guaranteeText ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, guaranteeText: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Guarantee Description" />
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Pricing & Strike-Out Master Control</h4>
                    
                    {/* Strike-Through Switch */}
                    <div className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                      <div>
                        <span className="text-sm font-bold text-white block">Enable Original Price Strike-Out</span>
                        <span className="text-xs text-zinc-400 block">If ON, shows original price strikethrough with discount price. If OFF, shows only single price.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, program: { ...formData.program, showOriginalPriceStrike: !formData.program.showOriginalPriceStrike } })}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${formData.program.showOriginalPriceStrike ? "bg-[#07b4ba] justify-end" : "bg-zinc-700 justify-start"}`}
                      >
                        <div className="bg-black w-4 h-4 rounded-full shadow-md" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Original Price</label>
                        <input type="text" value={formData.program.originalPrice ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, originalPrice: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white" />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Offer Price</label>
                        <input type="text" value={formData.program.priceDiscount ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, priceDiscount: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white font-bold" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Save Ribbon</label>
                        <input type="text" value={formData.program.ribbonSaveText ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, ribbonSaveText: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Offer Ribbon</label>
                        <input type="text" value={formData.program.ribbonOfferText ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, ribbonOfferText: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Limit Ribbon</label>
                        <input type="text" value={formData.program.membersLimitText ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, membersLimitText: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" />
                      </div>
                    </div>

                    <input type="text" value={formData.program.ctaCardHeading ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, ctaCardHeading: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-sm text-white font-mono" placeholder="Card Main Heading" />
                    <input type="text" value={formData.program.ctaBtnText ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, ctaBtnText: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Button Text" />
                    <input type="text" value={formData.program.batchNotice ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, batchNotice: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Batch Start Notice" />
                    <input type="text" value={formData.program.targetCountdownDate ?? ""} onChange={(e) => setFormData({ ...formData, program: { ...formData.program, targetCountdownDate: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Target Countdown Date (YYYY-MM-DDTHH:MM:SS)" />
                  </div>
                </div>
              )}

              {/* 15. PROGRAM: FAQS */}
              {activeTab === "prog_faqs" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Frequently Asked Questions</h4>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            program: {
                              ...formData.program,
                              faqs: [
                                ...(formData.program.faqs || []),
                                { id: Date.now().toString(), question: "New FAQ Question?", answer: "Detailed answer." }
                              ]
                            }
                          })
                        }
                        className="flex items-center gap-1 text-xs bg-[#07b4ba] text-black px-2.5 py-1 rounded font-bold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> Add FAQ
                      </button>
                    </div>

                    {(formData.program.faqs || []).map((faq, idx) => (
                      <div key={faq.id || idx} className="p-3 bg-zinc-950 border border-zinc-800 rounded space-y-2">
                        <div className="flex justify-between items-center gap-2">
                          <input
                            type="text"
                            value={faq.question ?? ""}
                            onChange={(e) => {
                              const updated = [...(formData.program.faqs || [])];
                              updated[idx].question = e.target.value;
                              setFormData({ ...formData, program: { ...formData.program, faqs: updated } });
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-semibold"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (formData.program.faqs || []).filter((_, i) => i !== idx);
                              setFormData({ ...formData, program: { ...formData.program, faqs: updated } });
                            }}
                            className="text-red-400 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={faq.answer ?? ""}
                          onChange={(e) => {
                            const updated = [...(formData.program.faqs || [])];
                            updated[idx].answer = e.target.value;
                            setFormData({ ...formData, program: { ...formData.program, faqs: updated } });
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 16. CONTACT & FOOTER */}
              {activeTab === "contact" && (
                <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                  <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Global Contact Info</h4>
                  <input type="text" value={formData.contact.phone ?? ""} onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, phone: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Phone" />
                  <input type="text" value={formData.contact.email ?? ""} onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Email" />
                  <input type="text" value={formData.contact.address ?? ""} onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, address: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Address" />
                  <input type="text" value={formData.contact.footerTagline ?? ""} onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, footerTagline: e.target.value } })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white" placeholder="Footer Tagline" />
                </div>
              )}

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-zinc-800 flex gap-2">
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="flex-1 bg-[#07b4ba] hover:bg-[#069ca1] text-black font-bold py-2.5 rounded text-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isSaving ? "Publishing Changes..." : "Save All Changes"}
                </button>
                <button type="button" onClick={resetContent} className="px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs rounded transition cursor-pointer">Reset</button>
                <button type="button" onClick={() => setIsPanelOpen(false)} className="px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded transition cursor-pointer">Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
