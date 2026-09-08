'use strict';
(() => {
  const button = document.querySelector('#sound-toggle');
  const slider = document.querySelector('#sound-volume');
  const state = document.querySelector('#sound-state');
  const feedback = document.querySelector('#sound-feedback');
  let context, gain, playing = false;
  try {
    const saved = localStorage.getItem('tria-volume');
    if (saved !== null && Number.isFinite(Number(saved))) slider.value = String(Math.max(0, Math.min(100, Number(saved))));
  } catch {}
  function render() {
    button.setAttribute('aria-pressed', String(playing));
    state.textContent = playing ? 'Ligado' : 'Desligado';
  }
  function volume() {
    const value = Number(slider.value);
    slider.setAttribute('aria-valuetext', `${value}%`);
    document.querySelector('#volume-value').textContent = `${value}%`;
    slider.style.setProperty('--volume', `${value}%`);
    if (gain && playing) gain.gain.setTargetAtTime(value / 100 * 0.3, context.currentTime, 0.08);
  }
  slider.addEventListener('input', () => {
    volume();
    try { localStorage.setItem('tria-volume', slider.value); } catch {}
  });
  button.addEventListener('click', async () => {
    button.disabled = true;
    try {
      if (playing) {
        gain.gain.setTargetAtTime(0, context.currentTime, 0.035);
        await new Promise(resolve => setTimeout(resolve, 220));
        await context.suspend();
        playing = false;
      } else {
        if (!context) {
          const Audio = window.AudioContext || window.webkitAudioContext;
          if (!Audio) throw new Error('Audio unavailable');
          context = new Audio();
          // Resume in the original user gesture, including on iOS.
          await context.resume();
          await context.audioWorklet.addModule('./brown-noise.js');
          const source = new AudioWorkletNode(context, 'brown-noise');
          const highpass = context.createBiquadFilter();
          highpass.type = 'highpass'; highpass.frequency.value = 25; highpass.Q.value = 0.7;
          const lowpass = context.createBiquadFilter();
          lowpass.type = 'lowpass'; lowpass.frequency.value = 650; lowpass.Q.value = 0.7;
          gain = context.createGain(); gain.gain.value = 0;
          source.connect(highpass).connect(lowpass).connect(gain).connect(context.destination);
          context.onstatechange = () => {
            if (context) { playing = context.state === 'running'; render(); }
          };
        }
        await context.resume();
        if (context.state !== 'running') throw new Error('Audio interrupted');
        playing = true;
        volume();
      }
      feedback.textContent = playing ? 'Ruído marrom ligado.' : 'Ruído marrom desligado.';
    } catch {
      playing = false;
      if (context) { context.onstatechange = null; await context.close().catch(() => {}); }
      context = null; gain = null;
      feedback.className = 'feedback';
      feedback.textContent = 'Não foi possível iniciar o som. Toque novamente para tentar.';
    } finally {
      render(); button.disabled = false;
    }
  });
  volume(); render();
})();
