class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMusicPlaying: boolean = false;
  private musicInterval: number | null = null;
  private ambientGain: GainNode | null = null;
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), this.ctx.currentTime);
    }
  }

  // Play a gentle celesta / glockenspiel note
  public playCelestaNote(freq: number, startTime: number = 0, duration: number = 1.2, velocity: number = 0.25) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = startTime || this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    // Harmonic for bell/celesta chime ring
    oscHarmonic.type = 'triangle';
    oscHarmonic.frequency.setValueAtTime(freq * 2.01, t);

    noteGain.gain.setValueAtTime(0, t);
    noteGain.gain.linearRampToValueAtTime(velocity, t + 0.015);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc.connect(noteGain);
    oscHarmonic.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(t);
    oscHarmonic.start(t);
    osc.stop(t + duration);
    oscHarmonic.stop(t + duration);
  }

  // Play magical firefly sparkle chime cascade
  public playMagicSparkle(intensity: number = 0.2) {
    this.initContext();
    if (!this.ctx) return;

    const notes = [1318.51, 1567.98, 1760.00, 2093.00, 2637.02, 3135.96]; // E6, G6, A6, C7, E7, G7
    notes.forEach((freq, idx) => {
      this.playCelestaNote(freq, (this.ctx?.currentTime || 0) + idx * 0.06, 0.8, intensity);
    });
  }

  // Play cute ladybug pitter-patter sound effect
  public playPitterPatter() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    for (let i = 0; i < 6; i++) {
      const stepTime = t + i * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320 + (i % 2) * 60, stepTime);
      osc.frequency.exponentialRampToValueAtTime(140, stepTime + 0.04);

      gain.gain.setValueAtTime(0.12, stepTime);
      gain.gain.exponentialRampToValueAtTime(0.001, stepTime + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(stepTime);
      osc.stop(stepTime + 0.04);
    }
  }

  // Play warm emotional reunion chord swell (G Major 9th)
  public playEmotionalChord() {
    this.initContext();
    if (!this.ctx) return;

    const chord = [196.00, 293.66, 392.00, 493.88, 587.33, 783.99]; // G3, D4, G4, B4, D5, G5
    chord.forEach((freq, i) => {
      this.playCelestaNote(freq, (this.ctx?.currentTime || 0) + i * 0.04, 2.5, 0.18);
    });
  }

  // Start continuous 3/4 lullaby background score
  public startLullabyScore() {
    this.initContext();
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;

    // Pattern in E Major / G Major: 84 BPM -> beat duration = 60/84 = 0.714s
    const beatSec = 60 / 84;
    const measures = [
      // Measure 1: E major / gentle awakening
      [329.63, 659.25, 830.61], // E4, E5, G#5
      // Measure 2: B major arpeggio
      [246.94, 493.88, 739.99], // B3, B4, F#5
      // Measure 3: C# minor warmth
      [277.18, 554.37, 830.61], // C#4, C#5, G#5
      // Measure 4: A major / resolution
      [220.00, 440.00, 659.25], // A3, A4, E5
    ];

    let currentMeasure = 0;
    const playMeasure = () => {
      if (!this.isMusicPlaying || !this.ctx) return;
      const notes = measures[currentMeasure % measures.length];
      const now = this.ctx.currentTime;

      // Bass note on beat 1
      this.playCelestaNote(notes[0], now, beatSec * 2.2, 0.22);
      // Chime note on beat 2
      this.playCelestaNote(notes[1], now + beatSec, beatSec * 1.5, 0.15);
      // Chime note on beat 3
      this.playCelestaNote(notes[2], now + beatSec * 2, beatSec * 1.5, 0.18);

      currentMeasure++;
    };

    playMeasure();
    this.musicInterval = window.setInterval(playMeasure, beatSec * 3 * 1000);
  }

  public stopLullabyScore() {
    this.isMusicPlaying = false;
    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public toggleScore(): boolean {
    if (this.isMusicPlaying) {
      this.stopLullabyScore();
      return false;
    } else {
      this.startLullabyScore();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isMusicPlaying;
  }
}

export const audioEngine = new AudioEngine();
