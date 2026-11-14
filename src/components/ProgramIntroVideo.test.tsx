import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProgramIntroVideo from "./ProgramIntroVideo";

const mock = vi.hoisted(() => ({ instances: [] as any[], blockedAttempts: 0, blockedMutedAttempts: 0, holdAudibleAttempt: false, holdUnmuteRequest: false, rejectUnmuteRequest: false, pauseOnUnmute: false }));
vi.mock("@vimeo/player", () => ({
  default: class {
    listeners = new Map<string, (data?: unknown) => void>();
    iframe: HTMLIFrameElement;
    paused = true;
    isMuted = false;
    ready = vi.fn().mockResolvedValue(undefined);
    getDuration = vi.fn().mockResolvedValue(300);
    play = vi.fn(async () => {
      if (!this.isMuted && mock.holdAudibleAttempt) return await new Promise<void>(() => {});
      if (this.isMuted && mock.blockedMutedAttempts > 0) { mock.blockedMutedAttempts -= 1; throw new Error("NotAllowedError"); }
      if (!this.isMuted && mock.blockedAttempts > 0) { mock.blockedAttempts -= 1; throw new Error("NotAllowedError"); }
      this.emit("play");
      this.emit("timeupdate", { seconds: 0.1, duration: 300 });
    });
    setCurrentTime = vi.fn(async (value: number) => value);
    setMuted = vi.fn(async (value: boolean) => {
      if (!value && mock.holdUnmuteRequest) return await new Promise<boolean>(() => {});
      if (!value && mock.rejectUnmuteRequest) throw new Error("NotAllowedError");
      this.isMuted = value;
      if (!value && mock.pauseOnUnmute) queueMicrotask(() => this.emit("pause"));
      return value;
    });
    getPaused = vi.fn(async () => this.paused);
    getMuted = vi.fn(async () => this.isMuted);
    destroy = vi.fn().mockResolvedValue(undefined);
    requestFullscreen = vi.fn().mockResolvedValue(undefined);
    exitFullscreen = vi.fn().mockResolvedValue(undefined);
    on = vi.fn((name: string, callback: (data?: unknown) => void) => this.listeners.set(name, callback));
    off = vi.fn((name: string) => this.listeners.delete(name));
    emit(name: string, data?: unknown) {
      if (name === "play") this.paused = false;
      if (name === "pause") this.paused = true;
      this.listeners.get(name)?.(data);
    }
    constructor(iframe: HTMLIFrameElement) {
      this.iframe = iframe;
      mock.instances.push(this);
    }
  },
}));

describe("ProgramIntroVideo", () => {
  beforeEach(() => { mock.instances.length = 0; mock.blockedAttempts = 0; mock.blockedMutedAttempts = 0; mock.holdAudibleAttempt = false; mock.holdUnmuteRequest = false; mock.rejectUnmuteRequest = false; mock.pauseOnUnmute = false; });

  it("autoplays with sound when allowed, without pause controls or pause traps", async () => {
    const { unmount } = render(<ProgramIntroVideo videoUrl="https://vimeo.com/123456" />);
    const player = mock.instances[0];
    await waitFor(() => expect(player.play).toHaveBeenCalledTimes(1));
    const params = new URL(player.iframe.src).searchParams;
    expect(Object.fromEntries(params)).toMatchObject({ autoplay: "1", muted: "0", initial_quality: "360p", quality: "auto", controls: "0", keyboard: "0", loop: "0" });
    expect(player.setMuted).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Mute video" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /pause/i })).not.toBeInTheDocument();
    act(() => player.emit("pause"));
    expect(screen.getByRole("button", { name: "Play introduction" })).toBeInTheDocument();
    expect(player.play).toHaveBeenCalledTimes(1);
    unmount();
    expect(player.destroy).toHaveBeenCalledOnce();
    expect(player.listeners.size).toBe(0);
  });

  it("preserves the unlisted privacy hash when creating a restricted embed", async () => {
    render(<ProgramIntroVideo videoUrl="https://vimeo.com/123456/abcdef" />);
    const player = mock.instances[0];
    await waitFor(() => expect(player.play).toHaveBeenCalledTimes(1));
    expect(new URL(player.iframe.src).searchParams.get("h")).toBe("abcdef");
    expect(player.iframe.referrerPolicy).toBe("strict-origin-when-cross-origin");
  });

  it("falls back to muted autoplay with a sound control when audible autoplay is blocked", async () => {
    mock.blockedAttempts = 1;
    render(<ProgramIntroVideo videoUrl="https://vimeo.com/123456" />);
    const player = mock.instances[0];
    await waitFor(() => expect(player.play).toHaveBeenCalledTimes(2));
    expect(player.setMuted).toHaveBeenCalledWith(true);
    expect(await screen.findByRole("button", { name: "Unmute video" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Play introduction" })).not.toBeInTheDocument();
  });

  it("switches to muted playback after 800ms when audible playback never settles", async () => {
    vi.useFakeTimers();
    try {
      mock.holdAudibleAttempt = true;
      render(<ProgramIntroVideo videoUrl="https://vimeo.com/123456" />);
      const player = mock.instances[0];
      await act(async () => { await Promise.resolve(); });
      expect(player.play).toHaveBeenCalledTimes(1);
      expect(player.setMuted).not.toHaveBeenCalled();
      await act(async () => { await vi.advanceTimersByTimeAsync(800); });
      expect(player.setMuted).toHaveBeenCalledWith(true);
      expect(player.play).toHaveBeenCalledTimes(2);
      expect(screen.getByRole("button", { name: "Unmute video" })).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it("allows user-initiated playback when both audible and muted autoplay are blocked", async () => {
    mock.blockedAttempts = 1;
    mock.blockedMutedAttempts = 1;
    render(<ProgramIntroVideo videoUrl="https://vimeo.com/123456" />);
    const player = mock.instances[0];
    await waitFor(() => expect(player.play).toHaveBeenCalledTimes(2));
    const play = await screen.findByRole("button", { name: "Play introduction" });
    fireEvent.click(play);
    await waitFor(() => expect(player.play).toHaveBeenCalledTimes(3));
    expect(screen.queryByRole("button", { name: "Play introduction" })).not.toBeInTheDocument();
  });

  it("shows progress without seeking and lets visitors mute or unmute", async () => {
    mock.blockedAttempts = 1;
    render(<ProgramIntroVideo videoUrl="https://vimeo.com/123456" />);
    const player = mock.instances[0];
    const timeline = screen.getByRole("progressbar", { name: "Video timeline" });
    const unmute = await screen.findByRole("button", { name: "Unmute video" });
    act(() => player.emit("timeupdate", { seconds: 120, duration: 300 }));
    expect(timeline).toHaveAttribute("aria-valuenow", "40");
    expect(screen.queryByRole("slider", { name: "Video timeline" })).not.toBeInTheDocument();
    fireEvent.click(timeline);
    expect(player.setCurrentTime).not.toHaveBeenCalled();
    fireEvent.click(unmute);
    await waitFor(() => expect(player.setMuted).toHaveBeenCalledWith(false));
    fireEvent.click(await screen.findByRole("button", { name: "Mute video" }));
    await waitFor(() => expect(player.setMuted).toHaveBeenCalledWith(true));
    expect(await screen.findByRole("button", { name: "Unmute video" })).toBeInTheDocument();
  });

  it("continues playing if the browser pauses the stream while unmuting", async () => {
    mock.blockedAttempts = 1;
    mock.pauseOnUnmute = true;
    render(<ProgramIntroVideo videoUrl="https://vimeo.com/123456" />);
    const player = mock.instances[0];
    await waitFor(() => expect(player.play).toHaveBeenCalledTimes(2));
    fireEvent.click(screen.getByRole("button", { name: "Unmute video" }));
    await waitFor(() => expect(player.play).toHaveBeenCalledTimes(4));
    expect(player.paused).toBe(false);
    expect(screen.queryByRole("button", { name: "Play introduction" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mute video" })).toBeInTheDocument();
  });

  it("resumes a previously paused video from an explicit unmute tap", async () => {
    mock.blockedAttempts = 1;
    render(<ProgramIntroVideo videoUrl="https://vimeo.com/123456" />);
    const player = mock.instances[0];
    await waitFor(() => expect(player.play).toHaveBeenCalledTimes(2));
    act(() => player.emit("pause"));
    fireEvent.click(screen.getByRole("button", { name: "Unmute video" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Mute video" })).toBeEnabled());
    expect(player.play).toHaveBeenCalledTimes(3);
    expect(player.paused).toBe(false);
  });

  it("keeps the button clickable and reports a rejected unmute accurately", async () => {
    mock.blockedAttempts = 1;
    mock.rejectUnmuteRequest = true;
    render(<ProgramIntroVideo videoUrl="https://vimeo.com/123456" />);
    const player = mock.instances[0];
    const button = await screen.findByRole("button", { name: "Unmute video" });
    fireEvent.click(button);
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Sound could not be enabled"));
    expect(screen.getByRole("button", { name: "Unmute video" })).toBeEnabled();
    expect(player.getMuted).toHaveBeenCalled();
  });

  it("does not claim sound is on when Vimeo's unmute request remains pending", async () => {
    mock.blockedAttempts = 1;
    mock.holdUnmuteRequest = true;
    render(<ProgramIntroVideo videoUrl="https://vimeo.com/123456" />);
    const player = mock.instances[0];
    const button = await screen.findByRole("button", { name: "Unmute video" });
    vi.useFakeTimers();
    try {
      fireEvent.click(button);
      await act(async () => { await vi.advanceTimersByTimeAsync(1200); });
      expect(player.getMuted).toHaveBeenCalled();
      expect(screen.getByRole("button", { name: "Unmute video" })).toBeEnabled();
      expect(screen.getByRole("status")).toHaveTextContent("Sound could not be enabled");
    } finally {
      vi.useRealTimers();
    }
  });
});
