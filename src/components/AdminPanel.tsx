import React, { useState, useEffect } from "react";
import { useCms } from "../context/CmsContext";

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
  const [activeTab, setActiveTab] = useState<"home" | "coaches" | "program" | "coaching" | "faq_contact">("home");
  const [formData, setFormData] = useState(content);

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
    alert("Website content updated successfully across all sections!");
  };

  return (
    <>
      {/* Login Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl max-w-md w-full p-6 text-white shadow-2xl">
            <h2 className="text-xl font-bold tracking-wider text-[#07b4ba] mb-1">
              ADMIN VERIFICATION
            </h2>
            <p className="text-xs text-zinc-400 mb-4">
              Enter authorized credentials to access complete website settings.
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
        <div className="fixed inset-y-0 right-0 z-[100] w-full max-w-2xl bg-zinc-950 border-l border-zinc-800 text-white shadow-2xl flex flex-col">
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
            <div>
              <h2 className="font-bold text-lg text-[#07b4ba]">AOF Master Control</h2>
              <span className="text-xs text-zinc-400">Website Global Content Manager</span>
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
            <button
              type="button"
              onClick={() => setActiveTab("home")}
              className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === "home"
                  ? "border-[#07b4ba] text-[#07b4ba] bg-zinc-900"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              Hero & Intro
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("coaches")}
              className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === "coaches"
                  ? "border-[#07b4ba] text-[#07b4ba] bg-zinc-900"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              Coaches
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("program")}
              className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === "program"
                  ? "border-[#07b4ba] text-[#07b4ba] bg-zinc-900"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              Program Page
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("coaching")}
              className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === "coaching"
                  ? "border-[#07b4ba] text-[#07b4ba] bg-zinc-900"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              1 on 1 Coaching
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("faq_contact")}
              className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === "faq_contact"
                  ? "border-[#07b4ba] text-[#07b4ba] bg-zinc-900"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              FAQ & Contact
            </button>
          </div>

          <form onSubmit={handleContentSave} className="p-6 overflow-y-auto flex-1 space-y-6">
            {/* TAB: HERO & INTRO */}
            {activeTab === "home" && (
              <div className="space-y-4">
                <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                  <h3 className="font-bold text-sm text-[#07b4ba]">Hero Banner Section</h3>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Heading Text</label>
                    <textarea
                      rows={2}
                      value={formData.heroTitle}
                      onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Subtitle Text</label>
                    <textarea
                      rows={2}
                      value={formData.heroSubtitle}
                      onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Hero Image Path / URL</label>
                    <input
                      type="text"
                      value={formData.heroImage}
                      onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                  <h3 className="font-bold text-sm text-[#07b4ba]">Intro Section</h3>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Intro Heading</label>
                    <input
                      type="text"
                      value={formData.introHeading}
                      onChange={(e) => setFormData({ ...formData, introHeading: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Intro Text</label>
                    <textarea
                      rows={3}
                      value={formData.introText}
                      onChange={(e) => setFormData({ ...formData, introText: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                  <h3 className="font-bold text-sm text-[#07b4ba]">Sticky Ad & Services</h3>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Sticky Bar Text</label>
                    <input
                      type="text"
                      value={formData.stickyAdText}
                      onChange={(e) => setFormData({ ...formData, stickyAdText: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Button Text</label>
                      <input
                        type="text"
                        value={formData.stickyAdButtonText}
                        onChange={(e) => setFormData({ ...formData, stickyAdButtonText: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Button Target Link</label>
                      <input
                        type="text"
                        value={formData.stickyAdLink}
                        onChange={(e) => setFormData({ ...formData, stickyAdLink: e.target.value })}
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
                  <h3 className="font-bold text-sm text-[#07b4ba]">Head Coach</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Name</label>
                      <input
                        type="text"
                        value={formData.coach1Name}
                        onChange={(e) => setFormData({ ...formData, coach1Name: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Title</label>
                      <input
                        type="text"
                        value={formData.coach1Title}
                        onChange={(e) => setFormData({ ...formData, coach1Title: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Photo Image URL</label>
                    <input
                      type="text"
                      value={formData.coach1Image}
                      onChange={(e) => setFormData({ ...formData, coach1Image: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Biography</label>
                    <textarea
                      rows={3}
                      value={formData.coach1Bio}
                      onChange={(e) => setFormData({ ...formData, coach1Bio: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Bullet Point 1</label>
                    <input
                      type="text"
                      value={formData.coach1Point1}
                      onChange={(e) => setFormData({ ...formData, coach1Point1: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Bullet Point 2</label>
                    <input
                      type="text"
                      value={formData.coach1Point2}
                      onChange={(e) => setFormData({ ...formData, coach1Point2: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Bullet Point 3</label>
                    <input
                      type="text"
                      value={formData.coach1Point3}
                      onChange={(e) => setFormData({ ...formData, coach1Point3: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                  <h3 className="font-bold text-sm text-[#07b4ba]">Team Coach</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Name</label>
                      <input
                        type="text"
                        value={formData.coach2Name}
                        onChange={(e) => setFormData({ ...formData, coach2Name: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Title</label>
                      <input
                        type="text"
                        value={formData.coach2Title}
                        onChange={(e) => setFormData({ ...formData, coach2Title: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Photo Image URL</label>
                    <input
                      type="text"
                      value={formData.coach2Image}
                      onChange={(e) => setFormData({ ...formData, coach2Image: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Biography</label>
                    <textarea
                      rows={3}
                      value={formData.coach2Bio}
                      onChange={(e) => setFormData({ ...formData, coach2Bio: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Bullet Point 1</label>
                    <input
                      type="text"
                      value={formData.coach2Point1}
                      onChange={(e) => setFormData({ ...formData, coach2Point1: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Bullet Point 2</label>
                    <input
                      type="text"
                      value={formData.coach2Point2}
                      onChange={(e) => setFormData({ ...formData, coach2Point2: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Bullet Point 3</label>
                    <input
                      type="text"
                      value={formData.coach2Point3}
                      onChange={(e) => setFormData({ ...formData, coach2Point3: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PROGRAM PAGE */}
            {activeTab === "program" && (
              <div className="space-y-4">
                <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                  <h3 className="font-bold text-sm text-[#07b4ba]">30-Day Program Page Settings</h3>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Program Hero Title</label>
                    <input
                      type="text"
                      value={formData.programPageHeroTitle}
                      onChange={(e) => setFormData({ ...formData, programPageHeroTitle: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Program Subtitle</label>
                    <textarea
                      rows={2}
                      value={formData.programPageHeroSubtitle}
                      onChange={(e) => setFormData({ ...formData, programPageHeroSubtitle: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Regular Price</label>
                      <input
                        type="text"
                        value={formData.programPrice}
                        onChange={(e) => setFormData({ ...formData, programPrice: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Offer / Discount Price</label>
                      <input
                        type="text"
                        value={formData.programDiscountPrice}
                        onChange={(e) => setFormData({ ...formData, programDiscountPrice: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Payment Checkout Link</label>
                    <input
                      type="text"
                      value={formData.programBuyLink}
                      onChange={(e) => setFormData({ ...formData, programBuyLink: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Program Video Trailer (YouTube Link)</label>
                    <input
                      type="text"
                      value={formData.programYoutubeUrl}
                      onChange={(e) => setFormData({ ...formData, programYoutubeUrl: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Feature 1</label>
                    <input
                      type="text"
                      value={formData.programFeature1}
                      onChange={(e) => setFormData({ ...formData, programFeature1: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Feature 2</label>
                    <input
                      type="text"
                      value={formData.programFeature2}
                      onChange={(e) => setFormData({ ...formData, programFeature2: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Feature 3</label>
                    <input
                      type="text"
                      value={formData.programFeature3}
                      onChange={(e) => setFormData({ ...formData, programFeature3: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: COACHING PAGE */}
            {activeTab === "coaching" && (
              <div className="space-y-4">
                <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                  <h3 className="font-bold text-sm text-[#07b4ba]">1 on 1 Coaching Page</h3>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Coaching Title</label>
                    <input
                      type="text"
                      value={formData.coachingHeroTitle}
                      onChange={(e) => setFormData({ ...formData, coachingHeroTitle: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Subtitle</label>
                    <textarea
                      rows={2}
                      value={formData.coachingHeroSubtitle}
                      onChange={(e) => setFormData({ ...formData, coachingHeroSubtitle: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Fee / Price Label</label>
                    <input
                      type="text"
                      value={formData.coachingPrice}
                      onChange={(e) => setFormData({ ...formData, coachingPrice: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Application / Booking Link</label>
                    <input
                      type="text"
                      value={formData.coachingApplyLink}
                      onChange={(e) => setFormData({ ...formData, coachingApplyLink: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Preview Video (YouTube Link)</label>
                    <input
                      type="text"
                      value={formData.coachingYoutubeUrl}
                      onChange={(e) => setFormData({ ...formData, coachingYoutubeUrl: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: FAQ, TESTIMONIALS & CONTACT */}
            {activeTab === "faq_contact" && (
              <div className="space-y-4">
                <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                  <h3 className="font-bold text-sm text-[#07b4ba]">Testimonials</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Client 1 Name</label>
                      <input
                        type="text"
                        value={formData.testimonial1Name}
                        onChange={(e) => setFormData({ ...formData, testimonial1Name: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Role</label>
                      <input
                        type="text"
                        value={formData.testimonial1Role}
                        onChange={(e) => setFormData({ ...formData, testimonial1Role: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Review 1</label>
                    <textarea
                      rows={2}
                      value={formData.testimonial1Text}
                      onChange={(e) => setFormData({ ...formData, testimonial1Text: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                  <h3 className="font-bold text-sm text-[#07b4ba]">Frequently Asked Questions</h3>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Question 1</label>
                    <input
                      type="text"
                      value={formData.faq1Question}
                      onChange={(e) => setFormData({ ...formData, faq1Question: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Answer 1</label>
                    <textarea
                      rows={2}
                      value={formData.faq1Answer}
                      onChange={(e) => setFormData({ ...formData, faq1Answer: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="border border-zinc-800 rounded-lg p-4 space-y-3 bg-zinc-900/40">
                  <h3 className="font-bold text-sm text-[#07b4ba]">Contact Info & Footer</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Email</label>
                      <input
                        type="text"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Phone</label>
                      <input
                        type="text"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Address</label>
                    <input
                      type="text"
                      value={formData.contactAddress}
                      onChange={(e) => setFormData({ ...formData, contactAddress: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Footer Tagline</label>
                    <input
                      type="text"
                      value={formData.footerTagline}
                      onChange={(e) => setFormData({ ...formData, footerTagline: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:border-[#07b4ba] focus:outline-none"
                    />
                  </div>
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
                Reset
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
