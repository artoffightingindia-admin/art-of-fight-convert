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
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(false);
  const [mutePending, setMutePending] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !videoUrl) return;
    let disposed = false;
    // Give every effect its own node so Strict Mode cleanup cannot remove a new player.
    const host = document.createElement("div");
    mount.appendChild(host);
    setReady(false);
    setPlaying(false);
    setEnded(false);
    setMuted(false);
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
      Object.entries({ autoplay: "1", muted: "0", controls: "0", keyboard: "0", loop: "0", playsinline: "1", title: "0", byline: "0", portrait: "0", pip: "0", vimeo_logo: "0", disable_context_menu: "1" }).forEach(([name, value]) => embedUrl.searchParams.set(name, value));
    } catch {
      setError("The video is unavailable. Please try again later.");
      host.remove();
      return;
    }
    // A direct iframe avoids an oEmbed lookup, which can fail for domain-restricted videos.
    const iframe = document.createElement("iframe");
    iframe.src = embedUrl.toString();
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

    const onTime = (data: { seconds: number; duration: number }) => {
      if (disposed) return;
      setPosition(data.seconds);
      if (data.duration > 0) setDuration(data.duration);
    };
    const onPlay = () => {
      if (disposed) return;
      setPlaying(true);
      setEnded(false);
      setError("");
    };
    const onPause = () => { if (!disposed) setPlaying(false); };
    const onEnded = () => {
      if (disposed) return;
      setPlaying(false);
      setEnded(true);
    };
    const onVolume = (data: { muted: boolean }) => { if (!disposed) setMuted(data.muted); };
    const onError = () => {
      if (!disposed) setError("The video could not load. Please refresh the page and try again.");
    };
    const onVimeoFullscreen = (data: { fullscreen: boolean }) => {
      if (!disposed) setFullscreen(data.fullscreen);
    };
    player.on("timeupdate", onTime);
    player.on("play", onPlay);
    player.on("pause", onPause);
    player.on("ended", onEnded);
    player.on("volumechange", onVolume);
    player.on("error", onError);
    player.on("fullscreenchange", onVimeoFullscreen);

    void player.ready().then(async () => {
      if (disposed) return;
      setReady(true);
      void player.getDuration().then(value => { if (!disposed) setDuration(value); }).catch(() => {});
      try {
        await player.play();
      } catch {
        if (disposed) return;
        // Browsers commonly reject audible autoplay. Keep the video moving silently
        // with an accessible speaker control instead of promising a bypass.
        try {
          const value = await player.setMuted(true);
          if (disposed) return;
          setMuted(value);
          await player.play();
        } catch {
          // Low-power modes can block even muted autoplay; retain a Play fallback.
          if (!disposed) setPlaying(false);
        }
      }
    }).catch(onError);

    return () => {
      disposed = true;
      player.off("timeupdate", onTime);
      player.off("play", onPlay);
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
    const keepPlaying = !nextMuted && playing;
    setMutePending(true);
    try {
      // Send both requests during the click's user activation. Some browsers pause
      // a muted autoplay stream when it becomes audible through the iframe SDK.
      const muteRequest = player.setMuted(nextMuted);
      const playbackRequest = keepPlaying ? player.play().catch(() => {}) : Promise.resolve();
      // Vimeo may leave the SDK promise pending even after its volume event fires.
      // Release the control promptly so visitors can always change their mind.
      const value = await Promise.race([
        muteRequest,
        new Promise<boolean>(resolve => window.setTimeout(() => resolve(nextMuted), 1200)),
      ]);
      if (playerRef.current !== player) return;
      setMuted(value);
      void playbackRequest.then(async () => {
        // Recover only this explicit unmute action; external pauses remain paused.
        if (keepPlaying && playerRef.current === player && await player.getPaused()) await player.play();
      }).catch(() => {});
    } catch {
      if (playerRef.current === player) setError("Sound or playback could not be updated. Please try again.");
    } finally {
      if (playerRef.current === player) setMutePending(false);
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
      style={fullscreen ? { width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" } : undefined}
      role="region"
      aria-label="AOF program introduction video"
    >
      <div className="relative aspect-video w-full" style={fullscreen ? { aspectRatio: "auto", height: "calc(100% - 52px)" } : undefined}>
        <div ref={mountRef} className="absolute inset-0 [&_iframe]:pointer-events-none [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full" />
        {!ready && !error && <p className="absolute inset-0 grid place-items-center text-sm text-white/70">Loading video…</p>}
        {ready && !playing && (
          <button type="button" onClick={startPlayback} className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/30 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#07b4ba]" aria-label={ended ? "Replay introduction" : "Play introduction"}>
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#07b4ba] text-black">{ended ? <RotateCcw aria-hidden="true" /> : <Play aria-hidden="true" />}</span>
            <span className="text-sm font-semibold">{ended ? "Watch again" : "Play video"}</span>
          </button>
        )}
        <button type="button" onClick={toggleMute} disabled={!ready || mutePending} className="absolute left-3 top-3 z-20 flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/65 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-[#07b4ba] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07b4ba] disabled:opacity-40 sm:left-4 sm:top-4 sm:h-16 sm:w-16" aria-label={muted ? "Unmute video" : "Mute video"}>
          {muted ? <VolumeX className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" /> : <Volume2 className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />}
        </button>
        {error && <p role="status" className="absolute left-4 right-4 top-4 rounded bg-black/85 px-4 py-3 text-center text-sm text-white">{error}</p>}
      </div>
      <div className="flex min-h-[52px] items-center gap-2 bg-[#10171a] px-2 sm:gap-3 sm:px-4">
        <span className="shrink-0 text-[11px] tabular-nums text-white/75">{formatTime(position)} / {formatTime(duration)}</span>
        <div role="progressbar" aria-label="Video timeline" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-valuetext={`${formatTime(position)} of ${formatTime(duration)}`} className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/25">
          <div className="h-full rounded-full bg-[#07b4ba] transition-[width] duration-200" style={{ width: `${progress}%` }} />
        </div>
        <button type="button" onClick={toggleFullscreen} disabled={!ready} className="flex h-11 w-11 shrink-0 items-center justify-center rounded text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#07b4ba] disabled:opacity-40" aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}>
          {fullscreen ? <Minimize className="h-5 w-5" aria-hidden="true" /> : <Maximize className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
