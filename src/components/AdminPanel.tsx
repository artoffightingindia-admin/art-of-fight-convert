import React, { useState, useEffect } from "react";
import { useCms, SiteContent, TestimonialItem, FaqItem, RoadmapItem, BonusItem } from "../context/CmsContext";
import { Trash2, Plus, Eye, EyeOff } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<"visibility" | "home" | "coaches" | "program" | "coaching" | "lead" | "contact">("visibility");
  const [formData, setFormData] = useState<SiteContent>(content);

  useEffect(() => {
    setFormData(content);
  }, [content]);

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

  // Helper for visibility toggles
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
      {/* Login Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl max-w-md w-full p-6 text-white shadow-2xl">
            <h2 className="text-xl font-bold tracking-wider text-[#07b4ba] mb-1">
              AOF MASTER VERIFICATION
            </h2>
            <p className="text-xs text-zinc-400 mb-4">
              Enter master credentials to access the live administrative console.
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
                  className="flex-1 bg-[#07b4ba] hover:bg-[#069ca1] text-black font-bold py-2 rounded text-sm transition"
                >
                  Authorize
                </button>
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(false)}
                  className="px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm rounded transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Panel Drawer */}
      {isPanelOpen && (
        <div className="fixed inset-y-0 right-0 z-[1000] w-full max-w-2xl bg-zinc-950 border-l border-zinc-800 text-white shadow-2xl flex flex-col font-sans">
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
            <div>
              <h2 className="font-bold text-lg text-[#07b4ba]">AOF Master Control Panel</h2>
              <span className="text-xs text-zinc-400">Total Website & Section Visibility Manager</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={logout}
                className="text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded text-zinc-300"
              >
                Logout
              </button>
              <button
                type="button"
                onClick={() => setIsPanelOpen(false)}
                className="text-zinc-400 hover:text-white text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-zinc-800 overflow-x-auto text-xs bg-zinc-950">
            {[
              { id: "visibility", label: "Section ON/OFF" },
              { id: "home", label: "Home Page" },
              { id: "coaches", label: "Coaches" },
              { id: "program", label: "30-Day Program" },
              { id: "coaching", label: "Coaching Page" },
              { id: "lead", label: "Lead / Blueprint" },
              { id: "contact", label: "Contact & Footer" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "border-[#07b4ba] text-[#07b4ba] bg-zinc-900"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleContentSave} className="p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* TAB: VISIBILITY ON/OFF */}
            {activeTab === "visibility" && (
              <div className="space-y-4">
                <p className="text-xs text-zinc-400">
                  Toggle sections ON or OFF across every page. Disabled sections will immediately hide on the live site.
                </p>

                <div className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/40 space-y-3">
                  <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Landing Page Sections</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(formData.visibility).slice(0, 10).map(([key, val]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleVisibility(key as any)}
                        className={`flex items-center justify-between p-2 rounded border transition-all ${
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
                    {Object.entries(formData.visibility).slice(10, 22).map(([key, val]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleVisibility(key as any)}
                        className={`flex items-center justify-between p-2 rounded border transition-all ${
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

            {/* TAB: HOME PAGE */}
            {activeTab === "home" && (
              <div className="space-y-4">
                <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                  <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Hero Section</h4>
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
                    <label className="block text-xs text-zinc-400 mb-1">Background Image URL</label>
                    <input
                      type="text"
                      value={formData.home.heroImage}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, heroImage: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                  <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Sticky Announcement Bar</h4>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Ad Caption Text</label>
                    <input
                      type="text"
                      value={formData.home.stickyAdText}
                      onChange={(e) => setFormData({ ...formData, home: { ...formData.home, stickyAdText: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Button Text</label>
                      <input
                        type="text"
                        value={formData.home.stickyAdBtnText}
                        onChange={(e) => setFormData({ ...formData, home: { ...formData.home, stickyAdBtnText: e.target.value } })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Button Link</label>
                      <input
                        type="text"
                        value={formData.home.stickyAdLink}
                        onChange={(e) => setFormData({ ...formData, home: { ...formData.home, stickyAdLink: e.target.value } })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: COACHES */}
            {activeTab === "coaches" && (
              <div className="space-y-4">
                <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                  <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Head Coach (Coach 1)</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Name</label>
                      <input
                        type="text"
                        value={formData.coaches.coach1Name}
                        onChange={(e) => setFormData({ ...formData, coaches: { ...formData.coaches, coach1Name: e.target.value } })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Title</label>
                      <input
                        type="text"
                        value={formData.coaches.coach1Title}
                        onChange={(e) => setFormData({ ...formData, coaches: { ...formData.coaches, coach1Title: e.target.value } })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Image URL</label>
                    <input
                      type="text"
                      value={formData.coaches.coach1Image}
                      onChange={(e) => setFormData({ ...formData, coaches: { ...formData.coaches, coach1Image: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Biography</label>
                    <textarea
                      rows={3}
                      value={formData.coaches.coach1Bio}
                      onChange={(e) => setFormData({ ...formData, coaches: { ...formData.coaches, coach1Bio: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                  <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Team Coach (Coach 2)</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Name</label>
                      <input
                        type="text"
                        value={formData.coaches.coach2Name}
                        onChange={(e) => setFormData({ ...formData, coaches: { ...formData.coaches, coach2Name: e.target.value } })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Title</label>
                      <input
                        type="text"
                        value={formData.coaches.coach2Title}
                        onChange={(e) => setFormData({ ...formData, coaches: { ...formData.coaches, coach2Title: e.target.value } })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Image URL</label>
                    <input
                      type="text"
                      value={formData.coaches.coach2Image}
                      onChange={(e) => setFormData({ ...formData, coaches: { ...formData.coaches, coach2Image: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Biography</label>
                    <textarea
                      rows={3}
                      value={formData.coaches.coach2Bio}
                      onChange={(e) => setFormData({ ...formData, coaches: { ...formData.coaches, coach2Bio: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: 30-DAY PROGRAM PAGE */}
            {activeTab === "program" && (
              <div className="space-y-5">
                {/* Hero Section */}
                <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                  <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Program Hero & Pricing</h4>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Hero Title</label>
                    <textarea
                      rows={2}
                      value={formData.program.heroTitle}
                      onChange={(e) => setFormData({ ...formData, program: { ...formData.program, heroTitle: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Subtitle</label>
                    <textarea
                      rows={2}
                      value={formData.program.heroSubtitle}
                      onChange={(e) => setFormData({ ...formData, program: { ...formData.program, heroSubtitle: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Discount Offer Price</label>
                      <input
                        type="text"
                        value={formData.program.priceDiscount}
                        onChange={(e) => setFormData({ ...formData, program: { ...formData.program, priceDiscount: e.target.value } })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
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
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Payment Checkout URL</label>
                    <input
                      type="text"
                      value={formData.program.buyNowUrl}
                      onChange={(e) => setFormData({ ...formData, program: { ...formData.program, buyNowUrl: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Feedbacks / Testimonials Array Editor */}
                <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Student Feedbacks (Add/Delete/Edit)</h4>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          program: {
                            ...formData.program,
                            feedbacks: [
                              ...formData.program.feedbacks,
                              { id: Date.now().toString(), author: "New Student", text: "Training changed my perspective!" }
                            ]
                          }
                        })
                      }
                      className="flex items-center gap-1 text-xs bg-[#07b4ba] text-black px-2.5 py-1 rounded font-bold"
                    >
                      <Plus className="w-3 h-3" /> Add Review
                    </button>
                  </div>
                  {formData.program.feedbacks.map((item, idx) => (
                    <div key={item.id || idx} className="p-3 bg-zinc-950 border border-zinc-800 rounded space-y-2">
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          value={item.author}
                          placeholder="Author Name"
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
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={item.text}
                        placeholder="Review Text"
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

                {/* FAQ Array Editor */}
                <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Program FAQs (Add/Delete/Edit)</h4>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          program: {
                            ...formData.program,
                            faqs: [
                              ...formData.program.faqs,
                              { id: Date.now().toString(), question: "New Question?", answer: "Answer details here." }
                            ]
                          }
                        })
                      }
                      className="flex items-center gap-1 text-xs bg-[#07b4ba] text-black px-2.5 py-1 rounded font-bold"
                    >
                      <Plus className="w-3 h-3" /> Add FAQ
                    </button>
                  </div>
                  {formData.program.faqs.map((item, idx) => (
                    <div key={item.id || idx} className="p-3 bg-zinc-950 border border-zinc-800 rounded space-y-2">
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          value={item.question}
                          placeholder="Question"
                          onChange={(e) => {
                            const updated = [...formData.program.faqs];
                            updated[idx].question = e.target.value;
                            setFormData({ ...formData, program: { ...formData.program, faqs: updated } });
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white mr-2"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.program.faqs.filter((_, i) => i !== idx);
                            setFormData({ ...formData, program: { ...formData.program, faqs: updated } });
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={item.answer}
                        placeholder="Answer"
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

            {/* TAB: COACHING PAGE */}
            {activeTab === "coaching" && (
              <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                <h4 className="font-bold text-xs uppercase text-[#07b4ba]">1 on 1 Coaching Page</h4>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.coaching.heroTitle}
                    onChange={(e) => setFormData({ ...formData, coaching: { ...formData.coaching, heroTitle: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Subtitle</label>
                  <textarea
                    rows={2}
                    value={formData.coaching.heroSubtitle}
                    onChange={(e) => setFormData({ ...formData, coaching: { ...formData.coaching, heroSubtitle: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Price</label>
                    <input
                      type="text"
                      value={formData.coaching.price}
                      onChange={(e) => setFormData({ ...formData, coaching: { ...formData.coaching, price: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Application URL</label>
                    <input
                      type="text"
                      value={formData.coaching.applyLink}
                      onChange={(e) => setFormData({ ...formData, coaching: { ...formData.coaching, applyLink: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Video Link (YouTube Embed)</label>
                  <input
                    type="text"
                    value={formData.coaching.videoUrl}
                    onChange={(e) => setFormData({ ...formData, coaching: { ...formData.coaching, videoUrl: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* TAB: LEAD / BLUEPRINT */}
            {activeTab === "lead" && (
              <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Blueprint & Lead Generation</h4>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Hero Title</label>
                  <input
                    type="text"
                    value={formData.lead.heroTitle}
                    onChange={(e) => setFormData({ ...formData, lead: { ...formData.lead, heroTitle: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Subtitle</label>
                  <textarea
                    rows={2}
                    value={formData.lead.heroSubtitle}
                    onChange={(e) => setFormData({ ...formData, lead: { ...formData.lead, heroSubtitle: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Button Call to Action</label>
                  <input
                    type="text"
                    value={formData.lead.submitButtonText}
                    onChange={(e) => setFormData({ ...formData, lead: { ...formData.lead, submitButtonText: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* TAB: CONTACT & FOOTER */}
            {activeTab === "contact" && (
              <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                <h4 className="font-bold text-xs uppercase text-[#07b4ba]">Global Contact Info & Socials</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Phone</label>
                    <input
                      type="text"
                      value={formData.contact.phone}
                      onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, phone: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Email</label>
                    <input
                      type="text"
                      value={formData.contact.email}
                      onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Address</label>
                  <input
                    type="text"
                    value={formData.contact.address}
                    onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, address: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Footer Tagline</label>
                  <input
                    type="text"
                    value={formData.contact.footerTagline}
                    onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, footerTagline: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="pt-4 flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-[#07b4ba] hover:bg-[#069ca1] text-black font-bold py-2.5 rounded text-sm transition"
              >
                Save All Changes
              </button>
              <button
                type="button"
                onClick={resetContent}
                className="px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs rounded transition"
              >
                Reset Defaults
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
