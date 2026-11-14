import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { Maximize, Minimize, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";

type ProgramIntroVideoProps = {
  /** Full Vimeo URL, including the privacy hash when required. */
  videoUrl: string;
};

const formatTime = (seconds: number) => {
  const whole = Math.max(0, Math.floor(seconds || 0));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
};

/** No pause button: playback can still be paused by the browser or operating system. */
export default function ProgramIntroVideo({ videoUrl }: ProgramIntroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const muteActionId = useRef(0);
  const unmuteRecoveryRef = useRef(false);
  const unmuteRecoveryTimer = useRef<number | null>(null);
  const hideControlsTimer = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(false);
  const [mutePending, setMutePending] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [error, setError] = useState("");
  const [showControls, setShowControls] = useState(false);

  useEffect(() => () => {
    if (hideControlsTimer.current !== null) window.clearTimeout(hideControlsTimer.current);
  }, []);

  const revealTouchControls = () => {
    setShowControls(true);
    if (hideControlsTimer.current !== null) window.clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = window.setTimeout(() => setShowControls(false), 3000);
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !videoUrl) return;
    let disposed = false;
    let playbackConfirmed = false;
    let fallbackStarted = false;
    let startupTimer: number | null = null;
    // Give every effect its own node so Strict Mode cleanup cannot remove a new player.
    const host = document.createElement("div");
    mount.appendChild(host);
    setReady(false);
    setPlaying(false);
    setHasStarted(false);
    setEnded(false);
    // Instagram's WebView commonly starts muted while Vimeo is still booting.
    // Show an actionable sound control before the SDK ready promise settles.
    setMuted(/Instagram/i.test(navigator.userAgent));
    setMutePending(false);
    setPosition(0);
    setDuration(0);
    setError("");

    let embedUrl: URL;
    try {
      const source = new URL(videoUrl);
      const path = source.pathname.split("/").filter(Boolean);
      const isPlayer = source.hostname === "player.vimeo.com" && path[0] === "video";
      const id = isPlayer ? path[1] : path[0];
      if (source.protocol !== "https:" || (!isPlayer && source.hostname !== "vimeo.com") || !/^\d+$/.test(id || "")) throw new Error("Invalid Vimeo URL");
      embedUrl = new URL(`https://player.vimeo.com/video/${id}`);
      const hash = source.searchParams.get("h") || (!isPlayer ? path[1] : undefined);
      if (hash) embedUrl.searchParams.set("h", hash);
      Object.entries({ autoplay: "1", muted: "0", preload: "auto", initial_quality: "360p", quality: "auto", controls: "0", keyboard: "0", loop: "0", playsinline: "1", title: "0", byline: "0", portrait: "0", pip: "0", vimeo_logo: "0", disable_context_menu: "1" }).forEach(([name, value]) => embedUrl.searchParams.set(name, value));
    } catch {
      setError("The video is unavailable. Please try again later.");
      host.remove();
      return;
    }
    // A direct iframe avoids an oEmbed lookup, which can fail for domain-restricted videos.
    const iframe = document.createElement("iframe");
    iframe.src = embedUrl.toString();
    iframe.loading = "eager";
    iframe.title = "AOF 30-Day MMA Striking Program introduction";
    iframe.allow = "autoplay; fullscreen; encrypted-media";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.tabIndex = -1;
    iframe.style.pointerEvents = "none";
    iframe.style.border = "0";
    host.appendChild(iframe);
    const player = new Player(iframe);
    playerRef.current = player;

    const clearStartupTimer = () => {
      if (startupTimer !== null) window.clearTimeout(startupTimer);
      startupTimer = null;
    };

    const confirmPlayback = () => {
      if (disposed) return;
      playbackConfirmed = true;
      clearStartupTimer();
      setHasStarted(true);
    };

    const startMutedFallback = async () => {
      if (disposed || fallbackStarted || playbackConfirmed) return;
      fallbackStarted = true;
      clearStartupTimer();
      try {
        const value = await player.setMuted(true);
        if (disposed) return;
        setMuted(value);
        // The audible play promise may still be pending. A fresh muted request
        // proceeds without waiting for that browser rejection.
        await player.play();
      } catch {
        if (!disposed) setPlaying(false);
      }
    };

    const onTime = (data: { seconds: number; duration: number }) => {
      if (disposed) return;
      setPosition(data.seconds);
      if (data.seconds > 0) {
        confirmPlayback();
      }
      if (data.duration > 0) setDuration(data.duration);
    };
    const onPlay = () => {
      if (disposed) return;
      setPlaying(true);
      setEnded(false);
      setError("");
    };
    const onPlaying = () => confirmPlayback();
    const onPause = () => {
      if (disposed) return;
      setPlaying(false);
      if (unmuteRecoveryRef.current) {
        unmuteRecoveryRef.current = false;
        void player.play().catch(() => setError("Playback paused while enabling sound. Tap Play to continue."));
      }
    };
    const onEnded = () => {
      if (disposed) return;
      setPlaying(false);
      setEnded(true);
    };
    const onVolume = (data: { muted: boolean }) => {
      if (disposed) return;
      setMuted(data.muted);
      if (!data.muted) setError("");
    };
    const onError = () => {
      if (!disposed) setError("The video could not load. Please refresh the page and try again.");
    };
    const onVimeoFullscreen = (data: { fullscreen: boolean }) => {
      if (!disposed) setFullscreen(data.fullscreen);
    };
    player.on("timeupdate", onTime);
    player.on("play", onPlay);
    player.on("playing", onPlaying);
    player.on("pause", onPause);
    player.on("ended", onEnded);
    player.on("volumechange", onVolume);
    player.on("error", onError);
    player.on("fullscreenchange", onVimeoFullscreen);

    void player.ready().then(async () => {
      if (disposed) return;
      setReady(true);
      void player.getDuration().then(value => { if (!disposed) setDuration(value); }).catch(() => {});
      void player.getMuted().then(value => { if (!disposed) setMuted(value); }).catch(() => {});
      // Start the sound-on attempt immediately. If the browser neither begins
      // playback nor rejects promptly, fall back without waiting indefinitely.
      if (playbackConfirmed) return;
      startupTimer = window.setTimeout(() => { void startMutedFallback(); }, 800);
      void player.play().catch(() => { void startMutedFallback(); });
    }).catch(onError);

    return () => {
      disposed = true;
      muteActionId.current += 1;
      unmuteRecoveryRef.current = false;
      if (unmuteRecoveryTimer.current !== null) window.clearTimeout(unmuteRecoveryTimer.current);
      clearStartupTimer();
      player.off("timeupdate", onTime);
      player.off("play", onPlay);
      player.off("playing", onPlaying);
      player.off("pause", onPause);
      player.off("ended", onEnded);
      player.off("volumechange", onVolume);
      player.off("error", onError);
      player.off("fullscreenchange", onVimeoFullscreen);
      if (playerRef.current === player) playerRef.current = null;
      void player.destroy().catch(() => {}).finally(() => host.remove());
    };
  }, [videoUrl]);

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const startPlayback = async () => {
    const player = playerRef.current;
    if (!player) return;
    try {
      if (ended) await player.setCurrentTime(0);
      await player.play();
    } catch {
      setError("Playback could not start. Please try again.");
    }
  };

  const toggleMute = async () => {
    const player = playerRef.current;
    if (!player || mutePending) return;
    const nextMuted = !muted;
    const actionId = ++muteActionId.current;
    const isCurrent = () => playerRef.current === player && muteActionId.current === actionId;
    setMutePending(true);
    setError("");
    let timeoutId: number | null = null;
    try {
      // Both calls must begin inside the tap's user activation, including when
      // the video was paused by the browser's autoplay policy.
      const muteRequest = player.setMuted(nextMuted);
      if (!nextMuted) {
        unmuteRecoveryRef.current = true;
        if (unmuteRecoveryTimer.current !== null) window.clearTimeout(unmuteRecoveryTimer.current);
        unmuteRecoveryTimer.current = window.setTimeout(() => { unmuteRecoveryRef.current = false; }, 1600);
      } else {
        unmuteRecoveryRef.current = false;
      }
      const playbackRequest = nextMuted ? Promise.resolve() : player.play();
      const result = await Promise.race([
        Promise.allSettled([muteRequest, playbackRequest]),
        new Promise<null>(resolve => { timeoutId = window.setTimeout(() => resolve(null), 1200); }),
      ]);
      if (!isCurrent()) return;
      if (result && result[0].status === "fulfilled" && result[0].value === nextMuted && result[1].status === "fulfilled") {
        setMuted(nextMuted);
        return;
      }
      // A rejected or stalled SDK request is not evidence that sound changed.
      // Query Vimeo briefly without claiming success if the query also stalls.
      const actual = await Promise.race([
        player.getMuted().catch(() => null),
        new Promise<null>(resolve => window.setTimeout(() => resolve(null), 350)),
      ]);
      if (!isCurrent()) return;
      if (actual !== null) setMuted(actual);
      if (nextMuted) {
        setError("Sound could not be changed here. Please try again.");
      } else if (actual === false) {
        setError("Sound is on. Tap Play to continue.");
      } else {
        setError("Sound could not be enabled here. Please open this page in your browser.");
      }
    } catch {
      if (isCurrent()) setError("Sound could not be updated. Please try again.");
    } finally {
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      if (isCurrent()) setMutePending(false);
    }
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    const player = playerRef.current;
    if (!container || !player) return;
    try {
      if (document.fullscreenElement === container) {
        await document.exitFullscreen();
      } else if (fullscreen) {
        await player.exitFullscreen();
      } else if (container.requestFullscreen) {
        // Fullscreen the wrapper so the timeline and sound control remain available.
        await container.requestFullscreen();
      } else {
        // iOS may use its native video UI; browser-owned controls cannot be suppressed.
        await player.requestFullscreen();
      }
    } catch {
      setError("Fullscreen is unavailable in this browser.");
    }
  };

  const progress = duration > 0 ? Math.min(100, Math.max(0, (position / duration) * 100)) : 0;
  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full overflow-hidden rounded-lg border border-white/15 bg-black shadow-[0_18px_60px_rgba(0,0,0,0.4)] fullscreen:rounded-none"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onPointerDown={event => { if (event.pointerType === "touch") revealTouchControls(); }}
      onFocusCapture={() => setShowControls(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setShowControls(false); }}
      style={fullscreen ? { width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" } : undefined}
      role="region"
      aria-label="AOF program introduction video"
    >
      <div className="relative aspect-video w-full" style={fullscreen ? { aspectRatio: "auto", height: "100%" } : undefined}>
        <div ref={mountRef} className="absolute inset-0 [&_iframe]:pointer-events-none [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full" />
        {!hasStarted && <img src="/images/program-intro-thumbnail.jpg" alt="" loading="eager" {...{ fetchpriority: "high" }} decoding="async" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />}
        {ready && !playing && (
          <button type="button" onClick={startPlayback} className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/30 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#07b4ba]" aria-label={ended ? "Replay introduction" : "Play introduction"}>
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#07b4ba] text-black">{ended ? <RotateCcw aria-hidden="true" /> : <Play aria-hidden="true" />}</span>
            <span className="text-sm font-semibold">{ended ? "Watch again" : "Play video"}</span>
          </button>
        )}
        <button type="button" onClick={toggleMute} disabled={mutePending} className={`absolute left-3 top-3 z-20 flex items-center justify-center rounded-full border shadow-lg backdrop-blur-sm transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07b4ba] disabled:opacity-40 sm:left-4 sm:top-4 ${muted ? "h-14 w-14 border-white/30 bg-black/65 text-white sm:h-16 sm:w-16" : "h-10 w-10 border-white/10 bg-black/25 text-white/60 sm:h-11 sm:w-11"}`} aria-label={muted ? "Unmute video" : "Mute video"}>
          {muted ? <VolumeX className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" /> : <Volume2 className="h-5 w-5" aria-hidden="true" />}
        </button>
        {error && <p role="status" className="pointer-events-none absolute bottom-14 left-4 right-4 z-20 rounded bg-black/85 px-4 py-3 text-center text-sm text-white">{error}</p>}
        <div className={`absolute inset-x-0 bottom-0 z-20 flex h-[52px] items-center gap-2 bg-gradient-to-t from-black/85 to-transparent px-2 transition-opacity duration-300 sm:gap-3 sm:px-4 ${showControls ? "opacity-100" : "pointer-events-none opacity-0"}`}>
          <span className="shrink-0 text-[11px] tabular-nums text-white/75">{formatTime(position)} / {formatTime(duration)}</span>
          <div role="progressbar" aria-label="Video timeline" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-valuetext={`${formatTime(position)} of ${formatTime(duration)}`} className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-[#07b4ba] transition-[width] duration-200" style={{ width: `${progress}%` }} />
          </div>
          <button type="button" onClick={toggleFullscreen} disabled={!ready} className="flex h-11 w-11 shrink-0 items-center justify-center rounded text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#07b4ba] disabled:opacity-40" aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}>
            {fullscreen ? <Minimize className="h-5 w-5" aria-hidden="true" /> : <Maximize className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>
    </div>
  );
}
