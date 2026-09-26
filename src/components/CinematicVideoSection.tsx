import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Film, Upload, Link2, RotateCcw, Sparkles } from 'lucide-react';

export const CinematicVideoSection: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showInputModal, setShowInputModal] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fallback / Pre-video Dynamic Canvas Animation:
  // Night highway speed run with crimson light trails, perspective lines and road grid
  useEffect(() => {
    if (videoSrc) return; // If user has loaded a video, don't run canvas loop
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    const stars: { x: number; y: number; speed: number; length: number }[] = [];
    for (let i = 0; i < 70; i++) {
      stars.push({
        x: Math.random() * 1000,
        y: Math.random() * 260,
        speed: 2 + Math.random() * 6,
        length: 10 + Math.random() * 40,
      });
    }

    const render = () => {
      canvas.width = canvas.parentElement?.clientWidth || 960;
      canvas.height = canvas.parentElement?.clientHeight || 540;
      const w = canvas.width;
      const h = canvas.height;

      // Deep obsidian night sky
      ctx.fillStyle = '#060609';
      ctx.fillRect(0, 0, w, h);

      // Distant crimson horizon glow
      const horizonY = h * 0.52;
      const horizonGrad = ctx.createLinearGradient(0, horizonY - 100, 0, horizonY + 80);
      horizonGrad.addColorStop(0, 'rgba(185, 28, 28, 0)');
      horizonGrad.addColorStop(0.6, 'rgba(239, 68, 68, 0.28)');
      horizonGrad.addColorStop(1, 'rgba(127, 29, 29, 0.05)');
      ctx.fillStyle = horizonGrad;
      ctx.fillRect(0, horizonY - 100, w, 180);

      // Speed stars / light streaks rushing backwards
      ctx.strokeStyle = 'rgba(254, 202, 202, 0.4)';
      ctx.lineWidth = 1.2;
      stars.forEach((s) => {
        s.x -= s.speed * 2.2;
        if (s.x < -s.length) s.x = w + s.length;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.length, s.y);
        ctx.stroke();
      });

      // Perspective Highway Track
      offset = (offset + 14) % 80;
      const vanishX = w * 0.5;
      const vanishY = horizonY;

      // Asphalt floor
      ctx.fillStyle = '#0a0a10';
      ctx.fillRect(0, horizonY, w, h - horizonY);

      // Perspective Grid Lines (Neon Red Highway)
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.lineWidth = 1.5;

      const numTracks = 9;
      for (let i = 0; i <= numTracks; i++) {
        const bottomX = (w / numTracks) * i;
        ctx.beginPath();
        ctx.moveTo(vanishX, vanishY);
        ctx.lineTo(bottomX, h);
        ctx.stroke();
      }

      // Horizontal moving road markers
      for (let d = 0; d < h - horizonY; d += 25) {
        const curY = horizonY + Math.pow((d + offset) / (h - horizonY), 2) * (h - horizonY);
        if (curY > horizonY && curY < h) {
          const alpha = (curY - horizonY) / (h - horizonY);
          ctx.strokeStyle = `rgba(220, 38, 38, ${alpha * 0.5})`;
          ctx.beginPath();
          ctx.moveTo(0, curY);
          ctx.lineTo(w, curY);
          ctx.stroke();
        }
      }

      // Center glowing red hypercar silhouette driving at night
      const carX = w * 0.5;
      const carY = h * 0.68;

      // Red ground underglow
      const underGlow = ctx.createRadialGradient(carX, carY + 30, 10, carX, carY + 30, 140);
      underGlow.addColorStop(0, 'rgba(239, 68, 68, 0.8)');
      underGlow.addColorStop(0.5, 'rgba(220, 38, 38, 0.3)');
      underGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = underGlow;
      ctx.beginPath();
      ctx.arc(carX, carY + 30, 140, 0, Math.PI * 2);
      ctx.fill();

      // Rear taillight streaks / light trails shooting back
      ctx.strokeStyle = '#ff1a35';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#ff2233';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.moveTo(carX - 65, carY + 5);
      ctx.lineTo(carX + 65, carY + 5);
      ctx.stroke();

      // Exhaust twin flame plumes
      ctx.fillStyle = '#ff7700';
      ctx.beginPath();
      ctx.ellipse(carX - 18, carY + 22, 5, 12, 0, 0, Math.PI * 2);
      ctx.ellipse(carX + 18, carY + 22, 5, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Aerodynamic car silhouette rear body
      ctx.fillStyle = '#140305';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(carX - 85, carY + 15);
      ctx.quadraticCurveTo(carX - 90, carY - 15, carX - 45, carY - 25);
      ctx.quadraticCurveTo(carX, carY - 38, carX + 45, carY - 25);
      ctx.quadraticCurveTo(carX + 90, carY - 15, carX + 85, carY + 15);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Active rear wing elevated
      ctx.fillStyle = '#0a0a0e';
      ctx.strokeStyle = '#ff3344';
      ctx.lineWidth = 2;
      ctx.strokeRect(carX - 95, carY - 45, 190, 8);
      ctx.fillRect(carX - 95, carY - 45, 190, 8);

      // Reset shadows
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [videoSrc]);

  // Handle local video file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setVideoName(file.name);
      setIsPlaying(true);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      setVideoSrc(urlInput.trim());
      setVideoName('External Cinematic Stream');
      setIsPlaying(true);
      setShowInputModal(false);
      setUrlInput('');
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleResetToDemo = () => {
    setVideoSrc(null);
    setVideoName('');
  };

  return (
    <section id="cinematic" className="py-20 relative bg-[#07070a]/75 backdrop-blur-md overflow-hidden">
      {/* Ambient Red Glow backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[300px] sm:h-[400px] bg-red-600/12 blur-[80px] sm:blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest mb-2">
              <Film className="w-3.5 h-3.5" />
              <span>Cinematic Animation Theatre</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display text-balance">
              Motion & Velocity Showcase
            </h2>
            <p className="mt-2 text-neutral-400 text-sm sm:text-base max-w-xl">
              Equipped with 4K motion projection. Watch the hypercar simulation below or load your video animation file instantly.
            </p>
          </div>

          {/* Action buttons to load/upload video */}
          <div className="flex items-center gap-3">
            <input
              type="file"
              ref={fileInputRef}
              accept="video/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 rounded-xl border border-red-900/60 bg-red-950/40 hover:bg-red-900/50 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(220,38,38,0.2)]"
            >
              <Upload className="w-4 h-4 text-red-400" />
              <span>Upload Video</span>
            </button>

            <button
              onClick={() => setShowInputModal(true)}
              className="px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 hover:border-red-800 text-neutral-300 hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <Link2 className="w-4 h-4 text-red-400" />
              <span>Video URL</span>
            </button>

            {videoSrc && (
              <button
                onClick={handleResetToDemo}
                title="Reset to Night Highway Simulation"
                className="p-2.5 rounded-xl border border-white/10 bg-black/40 hover:border-red-800 text-neutral-400 hover:text-white transition-all"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Video Theatre Frame */}
        <div className="relative w-full aspect-[16/9] max-h-[620px] rounded-3xl overflow-hidden border border-red-900/50 bg-black shadow-[0_25px_60px_-15px_rgba(220,38,38,0.35)] flex items-center justify-center group">

          {videoSrc ? (
            /* Active user video playback with Gemini Watermark Shield */
            <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
              <video
                ref={videoRef}
                src={videoSrc}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover scale-[1.14] translate-y-[-1%] translate-x-[-1%]"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              {/* Bottom-right corner watermark concealment shield */}
              <div
                className="absolute bottom-0 right-0 w-44 h-32 pointer-events-none z-20"
                style={{
                  background:
                    'radial-gradient(ellipse at bottom right, #070709 35%, rgba(7,7,9,0.92) 65%, transparent 100%)',
                }}
              />
              <div className="absolute bottom-0 right-0 w-36 h-24 backdrop-blur-xl pointer-events-none z-10 opacity-95" />
            </div>

          ) : (
            /* Interactive Night Highway Speed Canvas Simulation */
            <div className="relative w-full h-full">
              <canvas ref={canvasRef} className="w-full h-full" />

              {/* Ready Notification Overlay */}
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/70 border border-red-500/40 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-xs font-mono text-red-200">
                  VIDEO STAGE READY FOR YOUR ANIMATION
                </span>
              </div>
            </div>
          )}

          {/* Bottom Ambient Cinema Scrim & Controls */}
          <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/60 to-transparent flex items-center justify-between z-30 transition-opacity">
            <div className="flex items-center gap-3">
              {videoSrc ? (
                <>
                  <button
                    onClick={togglePlay}
                    className="p-3 rounded-full bg-red-600 text-white hover:bg-red-500 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.6)]"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2.5 rounded-full bg-black/60 border border-white/10 text-neutral-300 hover:text-white hover:border-red-800 transition-colors"
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-red-400" />}
                  </button>

                  <span className="text-xs font-mono text-neutral-300 ml-2 truncate max-w-xs">
                    {videoName || 'Cinematic Sequence'}
                  </span>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-600/90 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      Live Velocity Animation Loop
                    </div>
                    <div className="text-[11px] text-red-400 font-mono">
                      Awaiting user video file or link
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
              <span className="hidden sm:inline">1080P · 60 FPS · ULTRA WIDESCREEN</span>
              {videoSrc && (
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg bg-black/60 border border-white/10 text-neutral-300 hover:text-white hover:border-red-800 transition-colors"
                  aria-label="Toggle fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Video Helper Notice */}
        <div className="mt-4 p-4 rounded-2xl bg-[#0c0c12] border border-red-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
            <span>
              <strong>Video Animation Slot Active:</strong> Whenever you have the video file ready, click <em>&ldquo;Upload Video&rdquo;</em> or paste a direct video link to render it here in real-time.
            </span>
          </div>
          <span className="font-mono text-red-400 shrink-0">CODEC: MP4 / WEBM / H.264</span>
        </div>
      </div>

      {/* URL Input Modal */}
      {showInputModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0f0e15] border border-red-900/60 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-display mb-1">
              Load Cinematic Video URL
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              Enter any direct MP4 or WebM video link to stream it in the theatre.
            </p>

            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <input
                type="url"
                required
                placeholder="https://example.com/hypercar-trailer.mp4"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black border border-red-950 focus:border-red-500 text-white text-sm focus:outline-none font-mono"
              />

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInputModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                >
                  Load Stream
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
