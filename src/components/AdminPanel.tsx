// src/components/AdminPanel.tsx
import React, { useState } from "react";
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

  const [formData, setFormData] = useState(content);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (!success) {
      setError("Invalid Email ID or Password.");
    } else {
      setError("");
      setEmail("");
      setPassword("");
      setFormData(content);
    }
  };

  const handleContentSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent(formData);
    alert("Website content updated successfully!");
  };

  return (
    <>
      {/* Authentication Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl max-w-md w-full p-6 text-white shadow-2xl">
            <h2 className="text-xl font-bold tracking-wider text-red-600 mb-1">
              ADMIN VERIFICATION
            </h2>
            <p className="text-xs text-zinc-400 mb-4">
              Enter authorized credentials to access content management.
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
                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-red-600"
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
                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-red-600"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded text-sm transition"
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
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-zinc-950 border-l border-zinc-800 text-white shadow-2xl flex flex-col">
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-lg text-red-600">AOF Control Center</h2>
              <span className="text-xs text-zinc-400">Live Website Content Editor</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={logout}
                className="text-xs bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded text-zinc-300"
              >
                Logout
              </button>
              <button
                onClick={() => setIsPanelOpen(false)}
                className="text-zinc-400 hover:text-white text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>
          </div>

          <form onSubmit={handleContentSave} className="p-6 overflow-y-auto flex-1 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                Hero Heading Text
              </label>
              <input
                type="text"
                value={formData.heroTitle}
                onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm focus:border-red-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                Hero Subtitle
              </label>
              <textarea
                rows={2}
                value={formData.heroSubtitle}
                onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm focus:border-red-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                Hero Image URL / Path
              </label>
              <input
                type="text"
                value={formData.heroImage}
                onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm focus:border-red-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                Featured YouTube Video Link
              </label>
              <input
                type="text"
                value={formData.youtubeVideoUrl}
                onChange={(e) => setFormData({ ...formData, youtubeVideoUrl: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm focus:border-red-600 focus:outline-none"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                About Section Text
              </label>
              <textarea
                rows={3}
                value={formData.aboutText}
                onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm focus:border-red-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                Coach Biography
              </label>
              <textarea
                rows={3}
                value={formData.coachBio}
                onChange={(e) => setFormData({ ...formData, coachBio: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm focus:border-red-600 focus:outline-none"
              />
            </div>

            <div className="pt-4 flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded text-sm transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={resetContent}
                className="px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs rounded transition"
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
