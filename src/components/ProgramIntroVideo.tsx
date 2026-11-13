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
  const scrubbingRef = useRef(false);
  const seekVersionRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(false);
  const [mutePending, setMutePending] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seekPosition, setSeekPosition] = useState<number | null>(null);
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
    setSeekPosition(null);
    setError("");
    scrubbingRef.current = false;
    seekVersionRef.current += 1;

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
        // with an explicit Sound on control instead of promising a bypass.
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
    setMutePending(true);
    try {
      const value = await player.setMuted(!muted);
      if (playerRef.current === player) setMuted(value);
    } catch {
      setError("Sound could not be changed. Please try again.");
    } finally {
      if (playerRef.current === player) setMutePending(false);
    }
  };

  const seek = async (seconds: number) => {
    const player = playerRef.current;
    if (!player || duration <= 0) return;
    const version = ++seekVersionRef.current;
    try {
      const actual = await player.setCurrentTime(Math.max(0, Math.min(seconds, duration)));
      if (playerRef.current !== player || version !== seekVersionRef.current) return;
      setPosition(actual);
      setEnded(actual >= duration);
      setSeekPosition(null);
    } catch {
      if (playerRef.current !== player || version !== seekVersionRef.current) return;
      setSeekPosition(null);
      setError("That position could not be reached. Please try again.");
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

  const shownPosition = seekPosition ?? position;
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
        {error && <p role="status" className="absolute left-4 right-4 top-4 rounded bg-black/85 px-4 py-3 text-center text-sm text-white">{error}</p>}
      </div>
      <div className="flex min-h-[52px] items-center gap-2 bg-[#10171a] px-2 sm:gap-3 sm:px-4">
        <button type="button" onClick={toggleMute} disabled={!ready || mutePending} className="flex h-11 shrink-0 items-center justify-center gap-2 rounded px-2 text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#07b4ba] disabled:opacity-40" aria-label={muted ? "Unmute video" : "Mute video"}>
          {muted ? <VolumeX className="h-5 w-5" aria-hidden="true" /> : <Volume2 className="h-5 w-5" aria-hidden="true" />}
          {muted && <span className="text-xs font-semibold">Sound on</span>}
        </button>
        <span className="shrink-0 text-[11px] tabular-nums text-white/75">{formatTime(shownPosition)} / {formatTime(duration)}</span>
        <input
          type="range"
          aria-label="Video timeline"
          aria-valuetext={`${formatTime(shownPosition)} of ${formatTime(duration)}`}
          min={0}
          max={duration || 1}
          step={0.1}
          value={Math.min(shownPosition, duration || 1)}
          disabled={!ready || duration <= 0}
          className="h-11 min-w-0 flex-1 cursor-pointer accent-[#07b4ba] disabled:opacity-40"
          onPointerDown={event => { scrubbingRef.current = true; event.currentTarget.setPointerCapture(event.pointerId); }}
          onChange={event => {
            const value = Number(event.currentTarget.value);
            setSeekPosition(value);
            if (!scrubbingRef.current) void seek(value);
          }}
          onPointerUp={event => { scrubbingRef.current = false; void seek(Number(event.currentTarget.value)); }}
          onPointerCancel={() => { scrubbingRef.current = false; setSeekPosition(null); }}
          onBlur={event => {
            if (scrubbingRef.current) { scrubbingRef.current = false; void seek(Number(event.currentTarget.value)); }
          }}
        />
        <button type="button" onClick={toggleFullscreen} disabled={!ready} className="flex h-11 w-11 shrink-0 items-center justify-center rounded text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#07b4ba] disabled:opacity-40" aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}>
          {fullscreen ? <Minimize className="h-5 w-5" aria-hidden="true" /> : <Maximize className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
