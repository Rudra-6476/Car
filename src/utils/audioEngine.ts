/**
 * Real-time Web Audio Synthesizer for high-performance twin-turbo V8 engine.
 * Synthesizes engine rumble, rev frequency shifts, turbo spool, and exhaust crackles.
 */

class CarAudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  
  // Oscillators for engine rumble & harmonics
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private oscGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  
  // Turbo whistle
  private turboOsc: OscillatorNode | null = null;
  private turboGain: GainNode | null = null;
  private turboFilter: BiquadFilterNode | null = null;

  private currentRpm: number = 1000;
  private targetRpm: number = 1000;
  private animFrameId: number | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      // AudioContext not supported
    }
  }

  public start() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isRunning) return;
    this.isRunning = true;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, now);
    this.masterGain.connect(ctx.destination);

    // Filter to simulate engine block resonance
    this.filter = ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(450, now);
    this.filter.Q.setValueAtTime(3, now);

    this.oscGain = ctx.createGain();
    this.oscGain.gain.setValueAtTime(0.4, now);
    this.oscGain.connect(this.filter);
    this.filter.connect(this.masterGain);

    // Fundamental V8 cylinder pulse (sawtooth)
    this.osc1 = ctx.createOscillator();
    this.osc1.type = 'sawtooth';
    this.osc1.frequency.setValueAtTime(35, now);
    this.osc1.connect(this.oscGain);
    this.osc1.start();

    // Secondary harmonic (triangle)
    this.osc2 = ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(70, now);
    this.osc2.connect(this.oscGain);
    this.osc2.start();

    // Deep sub-bass pulse
    this.subOsc = ctx.createOscillator();
    this.subOsc.type = 'sine';
    this.subOsc.frequency.setValueAtTime(25, now);
    this.subOsc.connect(this.oscGain);
    this.subOsc.start();

    // Turbo spool whistle
    this.turboFilter = ctx.createBiquadFilter();
    this.turboFilter.type = 'bandpass';
    this.turboFilter.frequency.setValueAtTime(2400, now);
    this.turboFilter.Q.setValueAtTime(8, now);

    this.turboGain = ctx.createGain();
    this.turboGain.gain.setValueAtTime(0.01, now);

    this.turboOsc = ctx.createOscillator();
    this.turboOsc.type = 'sine';
    this.turboOsc.frequency.setValueAtTime(1800, now);
    this.turboOsc.connect(this.turboGain);
    this.turboGain.connect(this.turboFilter);
    this.turboFilter.connect(this.masterGain);
    this.turboOsc.start();

    this.updateLoop();
  }

  public setThrottle(isPressed: boolean) {
    if (!this.isRunning) {
      this.start();
    }
    this.targetRpm = isPressed ? 8800 : 1050;
  }

  public setTargetRpm(rpm: number) {
    if (!this.isRunning) {
      this.start();
    }
    this.targetRpm = Math.max(900, Math.min(9500, rpm));
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime, 0.05);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getRpm(): number {
    return this.currentRpm;
  }

  private triggerExhaustPop() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const popFilter = this.ctx.createBiquadFilter();
      popFilter.type = 'lowpass';
      popFilter.frequency.setValueAtTime(500, now);

      const popGain = this.ctx.createGain();
      popGain.gain.setValueAtTime(0.4, now);
      popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      noise.connect(popFilter);
      popFilter.connect(popGain);
      popGain.connect(this.masterGain);

      noise.start(now);
    } catch {
      // Ignore audio glitch
    }
  }

  private updateLoop = () => {
    if (!this.isRunning) return;

    // Smooth RPM interpolation
    const lerpSpeed = this.targetRpm > this.currentRpm ? 0.08 : 0.04;
    const prevRpm = this.currentRpm;
    this.currentRpm += (this.targetRpm - this.currentRpm) * lerpSpeed;

    // Over-rev crackle triggers on lift-off from high RPM
    if (prevRpm > 6500 && this.targetRpm < prevRpm && Math.random() < 0.12) {
      this.triggerExhaustPop();
    }

    if (this.ctx && this.osc1 && this.osc2 && this.subOsc && this.filter && this.turboOsc && this.turboGain) {
      const now = this.ctx.currentTime;
      const rpmRatio = (this.currentRpm - 900) / (9500 - 900); // 0 to 1

      // V8 fundamental frequency (firing pulses)
      // V8 idle at ~1000 RPM -> ~33 Hz, Redline 9000 RPM -> ~300 Hz
      const baseFreq = 30 + (this.currentRpm / 60) * 2;
      this.osc1.frequency.setTargetAtTime(baseFreq, now, 0.03);
      this.osc2.frequency.setTargetAtTime(baseFreq * 2.02, now, 0.03);
      this.subOsc.frequency.setTargetAtTime(baseFreq * 0.5, now, 0.03);

      // Filter opens as throttle/RPM rises (aggressive growl)
      const cutoffFreq = 300 + rpmRatio * 1800;
      this.filter.frequency.setTargetAtTime(cutoffFreq, now, 0.03);

      // Turbo spool whistle rises with RPM
      const turboFreq = 1400 + Math.pow(rpmRatio, 1.8) * 3200;
      this.turboOsc.frequency.setTargetAtTime(turboFreq, now, 0.04);
      this.turboGain.gain.setTargetAtTime(0.01 + rpmRatio * 0.08, now, 0.04);
    }

    this.animFrameId = requestAnimationFrame(this.updateLoop);
  };

  public stop() {
    this.isRunning = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    try {
      this.osc1?.stop();
      this.osc2?.stop();
      this.subOsc?.stop();
      this.turboOsc?.stop();
      this.ctx?.close();
    } catch {
      // Cleanup
    }
    this.ctx = null;
  }
}

export const carAudio = new CarAudioEngine();
