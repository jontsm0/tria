// Continuous, sample-rate-aware integrated noise; no repeating audio clip.
class BrownNoiseProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.last = 0;
    this.leak = Math.exp(-2 * Math.PI * 8 / sampleRate);
    this.scale = Math.sqrt(1 - this.leak * this.leak);
  }
  process(inputs, outputs) {
    const channels = outputs[0];
    if (!channels.length) return true;
    for (let i = 0; i < channels[0].length; i++) {
      this.last = this.leak * this.last + this.scale * (Math.random() * 2 - 1);
      for (const channel of channels) channel[i] = this.last;
    }
    return true;
  }
}
registerProcessor('brown-noise', BrownNoiseProcessor);
