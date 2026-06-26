// performance.js — page load, DNS, DOM timing

function loadPerformance() {
  setText('darkmode', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Yes' : 'No');

  // Hardware acceleration via canvas
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const renderer = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : 'Available';
      setText('hwaccel', renderer.length > 40 ? renderer.substring(0, 40) + '…' : renderer);
    } else {
      setText('hwaccel', 'Not available');
    }
  } catch {
    setText('hwaccel', 'Unknown');
  }

  // Timing — wait for load to complete
  function applyTiming() {
    if (!performance || !performance.timing) {
      setText('perf-load', 'Not supported');
      return;
    }
    const t = performance.timing;
    const navStart = t.navigationStart;

    setText('perf-load', formatMs(t.loadEventEnd - navStart));
    setText('perf-dns', formatMs(t.domainLookupEnd - t.domainLookupStart));
    setText('perf-tcp', formatMs(t.connectEnd - t.connectStart));
    setText('perf-dom', formatMs(t.domInteractive - navStart));
    setText('perf-dcl', formatMs(t.domContentLoadedEventEnd - navStart));
    setText('perf-redirect', String(performance.navigation ? performance.navigation.redirectCount : 0));
  }

  if (document.readyState === 'complete') {
    applyTiming();
  } else {
    window.addEventListener('load', () => setTimeout(applyTiming, 100));
  }
}