import React, { useState, useEffect } from "react";
import { useCms, SiteContent } from "../context/CmsContext";
import { Plus, Trash2, Eye, EyeOff, X } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<
    | "visibility"
    | "home_hero"
    | "home_cards"
    | "home_videos"
    | "home_testimonials"
    | "coaches"
    | "program_main"
    | "program_roadmap"
    | "program_feedbacks"
    | "program_bonuses"
    | "contact"
  >("visibility");

  const [formData, setFormData] = useState<SiteContent>(content);

  useEffect(() => {
    setFormData(content);
  }, [content]);

  // Handle ESC key to close modal or drawer
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

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (!success) {
      setError("Invalid Email ID or Password.");
    } else {
      setError("");
      setEmail("");
      setPassword("");
    }
  };

  const handleContentSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent(formData);
    alert("Website content & settings updated successfully!");
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
            {/* Top Close Icon */}
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-900 transition-colors"
              aria-label="Close authentication modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold tracking-wider text-[#07b4ba] mb-1">
              AOF MASTER CONTROL
            </h2>
            <p className="text-xs text-zinc-400 mb-4">
              Enter credentials to access all dynamic website settings.
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-xs p-2 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#07b4ba]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-300 mb-1">
                  Password
                </label>
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
                  className="flex-1 bg-[#07b4ba] hover:bg-[#069ca1] text-black font-bold py-2 rounded text-sm transition cursor-pointer"
                >
                  Authorize
                </button>
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(false)}
                  className="px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm rounded transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── ADMIN CONTROL PANEL DRAWER ── */}
      {isPanelOpen && (
        <div className="fixed inset-0 z-[1000] flex justify-end bg-black/60 backdrop-blur-xs">
          {/* Backdrop click to close */}
          <div 
            className="flex-1"
            onClick={() => setIsPanelOpen(false)}
          />

          <div className="w-full max-w-2xl bg-zinc-950 border-l border-zinc-800 text-white shadow-2xl flex flex-col font-sans h-full">
            {/* Header */}
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
              <div>
                <h2 className="font-bold text-lg text-[#07b4ba]">AOF Master Control Panel</h2>
                <span className="text-xs text-zinc-400">Total Live Content & Layout Studio</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={logout}
                  className="text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded text-zinc-300 transition-colors cursor-pointer"
                >
                  Logout
                </button>
                <button
                  type="button"
                  onClick={() => setIsPanelOpen(false)}
                  className="flex items-center justify-center p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Close Admin Panel (Esc)"
                  aria-label="Close Admin Panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-zinc-800 overflow-x-auto text-xs bg-zinc-950 shrink-0">
              {[
                { id: "visibility", label: "Section ON/OFF" },
                { id: "home_hero", label: "Home: Hero & Intro" },
                { id: "home_cards", label: "Home: Path & CTA" },
                { id: "home_videos", label: "Home: All 4 Videos" },
                { id: "home_testimonials", label: "Home: Student Reviews" },
                { id: "coaches", label: "Coaches Master" },
                { id: "program_main", label: "Program: Core & Pricing" },
                { id: "program_roadmap", label: "Program: 5-Week Roadmap" },
                { id: "program_feedbacks", label: "Program: Feedbacks" },
                { id: "program_bonuses", label: "Program: Bonuses & FAQs" },
                { id: "contact", label: "Contact & Footer" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                    activeTab === tab.id
                      ? "border-[#07b4ba] text-[#07b4ba] bg-zinc-900"
                      : "border-transparent text-zinc-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Fields */}
            <form onSubmit={handleContentSave} className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* TAB: VISIBILITY */}
              {activeTab === "visibility" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/40 space-y-3">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Landing Page Sections</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(formData.visibility).slice(0, 10).map(([key, val]) => (
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
                      {Object.entries(formData.visibility).slice(10).map(([key, val]) => (
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

              {/* TAB: HOME HERO & INTRO */}
              {activeTab === "home_hero" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Hero Banner</h4>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={formData.home.heroTagline}
                        onChange={(e) => setFormData({ ...formData, home: { ...formData.home, heroTagline: e.target.value } })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Title</label>
                      <textarea
                        rows={2}
                        value={formData.home.heroTitle}
                        onChange={(e) => setFormData({ ...formData, home: { ...formData.home, heroTitle: e.target.value } })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Subtitle</label>
                      <textarea
                        rows={2}
                        value={formData.home.heroSubtitle}
                        onChange={(e) => setFormData({ ...formData, home: { ...formData.home, heroSubtitle: e.target.value } })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Hero Image Path</label>
                      <input
                        type="text"
                        value={formData.home.heroImage}
                        onChange={(e) => setFormData({ ...formData, home: { ...formData.home, heroImage: e.target.value } })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Why AOF Section</h4>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Intro Heading</label>
                      <input
                        type="text"
                        value={formData.home.introHeading}
                        onChange={(e) => setFormData({ ...formData, home: { ...formData.home, introHeading: e.target.value } })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Paragraph 1</label>
                      <textarea
                        rows={3}
                        value={formData.home.introParagraph1}
                        onChange={(e) => setFormData({ ...formData, home: { ...formData.home, introParagraph1: e.target.value } })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Paragraph 2</label>
                      <textarea
                        rows={3}
                        value={formData.home.introParagraph2}
                        onChange={(e) => setFormData({ ...formData, home: { ...formData.home, introParagraph2: e.target.value } })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: HOME PATH & CTA */}
              {activeTab === "home_cards" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Choose Your Path Headings</h4>
                    <input
                      type="text"
                      value={formData.home.servicesTagline}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, servicesTagline: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      placeholder="Tagline"
                    />
                    <input
                      type="text"
                      value={formData.home.servicesHeading}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, servicesHeading: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      placeholder="Heading"
                    />
                    <input
                      type="text"
                      value={formData.home.servicesDesc}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, servicesDesc: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      placeholder="Subtitle"
                    />
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Card 1 (1-on-1 Transformation)</h4>
                    <input
                      type="text"
                      value={formData.home.card1Badge}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, card1Badge: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white focus:border-[#07b4ba] focus:outline-none mb-1"
                      placeholder="Badge Text"
                    />
                    <input
                      type="text"
                      value={formData.home.card1Title}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, card1Title: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none mb-1"
                    />
                    <textarea
                      rows={2}
                      value={formData.home.card1Desc}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, card1Desc: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Card 2 (30-Day Striking)</h4>
                    <input
                      type="text"
                      value={formData.home.card2Badge}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, card2Badge: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white focus:border-[#07b4ba] focus:outline-none mb-1"
                      placeholder="Badge Text"
                    />
                    <input
                      type="text"
                      value={formData.home.card2Title}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, card2Title: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none mb-1"
                    />
                    <textarea
                      rows={2}
                      value={formData.home.card2Desc}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, card2Desc: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB: ALL 4 HOME VIDEOS */}
              {activeTab === "home_videos" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Showcase Short 1 (Vertical)</h4>
                    <input
                      type="text"
                      value={formData.home.socialProofVideo1}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, socialProofVideo1: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      placeholder="e.g. zjcVWjWSJog or YouTube Link"
                    />
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Showcase Short 2 (Vertical)</h4>
                    <input
                      type="text"
                      value={formData.home.socialProofVideo2}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, socialProofVideo2: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      placeholder="e.g. xuAeRmO82Gk or YouTube Link"
                    />
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Showcase Short 3 (Vertical)</h4>
                    <input
                      type="text"
                      value={formData.home.socialProofVideo3}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, socialProofVideo3: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      placeholder="e.g. H49Y6b7wn58 or YouTube Link"
                    />
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Video 4: Testimonial Player Video (Horizontal 16:9)</h4>
                    <input
                      type="text"
                      value={formData.home.testimonialVideoHeading}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, testimonialVideoHeading: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none mb-2"
                      placeholder="Video Title Callout"
                    />
                    <input
                      type="text"
                      value={formData.home.testimonialVideoUrl}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, testimonialVideoUrl: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      placeholder="e.g. KTlqLcAeisU or YouTube Link"
                    />
                  </div>
                </div>
              )}

              {/* TAB: STUDENT TESTIMONIALS */}
              {activeTab === "home_testimonials" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Client Testimonials (Add/Delete/Edit)</h4>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            home: {
                              ...formData.home,
                              testimonials: [
                                ...formData.home.testimonials,
                                { id: Date.now().toString(), author: "New Member", role: "Member", text: "Excellent experience!" }
                              ]
                            }
                          })
                        }
                        className="flex items-center gap-1 text-xs bg-[#07b4ba] text-black px-2.5 py-1 rounded font-bold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> Add Testimonial
                      </button>
                    </div>

                    {formData.home.testimonials.map((t, idx) => (
                      <div key={t.id || idx} className="p-3 bg-zinc-950 border border-zinc-800 rounded space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={t.author}
                            placeholder="Name"
                            onChange={(e) => {
                              const updated = [...formData.home.testimonials];
                              updated[idx].author = e.target.value;
                              setFormData({ ...formData, home: { ...formData.home, testimonials: updated } });
                            }}
                            className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={t.role || ""}
                            placeholder="Role (Member/Fighter)"
                            onChange={(e) => {
                              const updated = [...formData.home.testimonials];
                              updated[idx].role = e.target.value;
                              setFormData({ ...formData, home: { ...formData.home, testimonials: updated } });
                            }}
                            className="w-28 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = formData.home.testimonials.filter((_, i) => i !== idx);
                              setFormData({ ...formData, home: { ...formData.home, testimonials: updated } });
                            }}
                            className="text-red-400 hover:text-red-300 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={t.image || ""}
                          placeholder="Image URL"
                          onChange={(e) => {
                            const updated = [...formData.home.testimonials];
                            updated[idx].image = e.target.value;
                            setFormData({ ...formData, home: { ...formData.home, testimonials: updated } });
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white"
                        />
                        <textarea
                          rows={2}
                          value={t.text}
                          placeholder="Review Text"
                          onChange={(e) => {
                            const updated = [...formData.home.testimonials];
                            updated[idx].text = e.target.value;
                            setFormData({ ...formData, home: { ...formData.home, testimonials: updated } });
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: COACHES */}
              {activeTab === "coaches" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Head Coach (Purushothaman MK)</h4>
                    <input
                      type="text"
                      value={formData.home.coach1Name}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, coach1Name: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none mb-2"
                    />
                    <input
                      type="text"
                      value={formData.home.coach1Image}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, coach1Image: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none mb-2"
                    />
                    <textarea
                      rows={3}
                      value={formData.home.coach1Bio}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, coach1Bio: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Team Coach (Kaviarasu K)</h4>
                    <input
                      type="text"
                      value={formData.home.coach2Name}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, coach2Name: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none mb-2"
                    />
                    <input
                      type="text"
                      value={formData.home.coach2Image}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, coach2Image: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none mb-2"
                    />
                    <textarea
                      rows={3}
                      value={formData.home.coach2Bio}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, coach2Bio: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB: PROGRAM CORE & PRICING */}
              {activeTab === "program_main" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Pricing, Countdown & Checkout Link</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Discount Price</label>
                        <input
                          type="text"
                          value={formData.program.priceDiscount}
                          onChange={(e) => setFormData({ ...formData, program: { ...formData.program, priceDiscount: e.target.value } })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Batch Start Label</label>
                        <input
                          type="text"
                          value={formData.program.batchNotice}
                          onChange={(e) => setFormData({ ...formData, program: { ...formData.program, batchNotice: e.target.value } })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Countdown Date (YYYY-MM-DDTHH:MM:SS)</label>
                      <input
                        type="text"
                        value={formData.program.targetCountdownDate}
                        onChange={(e) => setFormData({ ...formData, program: { ...formData.program, targetCountdownDate: e.target.value } })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Payment Gateway Link</label>
                      <input
                        type="text"
                        value={formData.program.buyNowUrl}
                        onChange={(e) => setFormData({ ...formData, program: { ...formData.program, buyNowUrl: e.target.value } })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: PROGRAM ROADMAP */}
              {activeTab === "program_roadmap" && (
                <div className="space-y-4">
                  <h4 className="font-bold text-xs uppercase text-[#07b4ba]">5-Week Roadmap Blueprint</h4>
                  {formData.program.roadmapCards.map((card, idx) => (
                    <div key={card.id || idx} className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => {
                            const updated = [...formData.program.roadmapCards];
                            updated[idx].title = e.target.value;
                            setFormData({ ...formData, program: { ...formData.program, roadmapCards: updated } });
                          }}
                          className="bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-sm text-white"
                        />
                        <input
                          type="text"
                          value={card.days}
                          onChange={(e) => {
                            const updated = [...formData.program.roadmapCards];
                            updated[idx].days = e.target.value;
                            setFormData({ ...formData, program: { ...formData.program, roadmapCards: updated } });
                          }}
                          className="bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                      <input
                        type="text"
                        value={card.image}
                        onChange={(e) => {
                          const updated = [...formData.program.roadmapCards];
                          updated[idx].image = e.target.value;
                          setFormData({ ...formData, program: { ...formData.program, roadmapCards: updated } });
                        }}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-white"
                        placeholder="Image URL"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* TAB: PROGRAM FEEDBACKS */}
              {activeTab === "program_feedbacks" && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Student Feedback Slider Cards</h4>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          program: {
                            ...formData.program,
                            feedbacks: [
                              ...formData.program.feedbacks,
                              { id: Date.now().toString(), author: "New Student", text: "The training is clear and disciplined!" }
                            ]
                          }
                        })
                      }
                      className="flex items-center gap-1 text-xs bg-[#07b4ba] text-black px-2.5 py-1 rounded font-bold cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> Add Feedback
                    </button>
                  </div>

                  {formData.program.feedbacks.map((f, idx) => (
                    <div key={f.id || idx} className="p-3 bg-zinc-950 border border-zinc-800 rounded space-y-2">
                      <div className="flex justify-between items-center gap-2">
                        <input
                          type="text"
                          value={f.author}
                          placeholder="Author"
                          onChange={(e) => {
                            const updated = [...formData.program.feedbacks];
                            updated[idx].author = e.target.value;
                            setFormData({ ...formData, program: { ...formData.program, feedbacks: updated } });
                          }}
                          className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.program.feedbacks.filter((_, i) => i !== idx);
                            setFormData({ ...formData, program: { ...formData.program, feedbacks: updated } });
                          }}
                          className="text-red-400 hover:text-red-300 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={f.text}
                        onChange={(e) => {
                          const updated = [...formData.program.feedbacks];
                          updated[idx].text = e.target.value;
                          setFormData({ ...formData, program: { ...formData.program, feedbacks: updated } });
                        }}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* TAB: BONUSES & FAQS */}
              {activeTab === "program_bonuses" && (
                <div className="space-y-4">
                  <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Bonuses Valuation</h4>
                    <input
                      type="text"
                      value={formData.program.bonusWorth}
                      onChange={(e) => setFormData({ ...formData, program: { ...formData.program, bonusWorth: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>

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
                                ...formData.program.faqs,
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
                    {formData.program.faqs.map((faq, idx) => (
                      <div key={faq.id || idx} className="p-3 bg-zinc-950 border border-zinc-800 rounded space-y-2">
                        <div className="flex justify-between items-center gap-2">
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => {
                              const updated = [...formData.program.faqs];
                              updated[idx].question = e.target.value;
                              setFormData({ ...formData, program: { ...formData.program, faqs: updated } });
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = formData.program.faqs.filter((_, i) => i !== idx);
                              setFormData({ ...formData, program: { ...formData.program, faqs: updated } });
                            }}
                            className="text-red-400 hover:text-red-300 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={faq.answer}
                          onChange={(e) => {
                            const updated = [...formData.program.faqs];
                            updated[idx].answer = e.target.value;
                            setFormData({ ...formData, program: { ...formData.program, faqs: updated } });
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: CONTACT */}
              {activeTab === "contact" && (
                <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                  <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Global Contact Info</h4>
                  <input
                    type="text"
                    value={formData.contact.phone}
                    onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, phone: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none mb-2"
                    placeholder="Phone"
                  />
                  <input
                    type="text"
                    value={formData.contact.email}
                    onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none mb-2"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    value={formData.contact.address}
                    onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, address: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none mb-2"
                    placeholder="Address"
                  />
                  <input
                    type="text"
                    value={formData.contact.footerTagline}
                    onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, footerTagline: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    placeholder="Footer Tagline"
                  />
                </div>
              )}

              {/* Bottom Actions Bar with explicit Close button */}
              <div className="pt-4 border-t border-zinc-800 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#07b4ba] hover:bg-[#069ca1] text-black font-bold py-2.5 rounded text-sm transition cursor-pointer"
                >
                  Save All Changes
                </button>
                <button
                  type="button"
                  onClick={resetContent}
                  className="px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs rounded transition cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setIsPanelOpen(false)}
                  className="px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
