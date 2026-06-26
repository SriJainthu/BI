// heatmap.js — mouse movement heatmap

let heatmapDots = [];
let moveCount = 0;
let heatCtx = null;
let heatCanvas = null;

function initHeatmap() {
  heatCanvas = document.getElementById('heatmap');
  if (!heatCanvas) return;
  heatCtx = heatCanvas.getContext('2d');
  drawHeatmapBackground();

  heatCanvas.addEventListener('mousemove', onMouseMove);
}

function onMouseMove(e) {
  const rect = heatCanvas.getBoundingClientRect();
  const scaleX = heatCanvas.width / rect.width;
  const scaleY = heatCanvas.height / rect.height;
  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;

  moveCount++;
  setText('move-count', moveCount);
  setText('last-x', Math.round(x));
  setText('last-y', Math.round(y));

  heatmapDots.push({ x, y, a: 1 });
  renderHeatmap();
}

function renderHeatmap() {
  heatCtx.clearRect(0, 0, heatCanvas.width, heatCanvas.height);
  drawHeatmapBackground();

  heatmapDots.forEach(dot => {
    const grad = heatCtx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, 22);
    grad.addColorStop(0, 'rgba(0,229,255,' + (dot.a * 0.7) + ')');
    grad.addColorStop(0.5, 'rgba(0,255,157,' + (dot.a * 0.3) + ')');
    grad.addColorStop(1, 'rgba(0,229,255,0)');
    heatCtx.fillStyle = grad;
    heatCtx.beginPath();
    heatCtx.arc(dot.x, dot.y, 22, 0, Math.PI * 2);
    heatCtx.fill();
  });

  heatmapDots = heatmapDots
    .map(d => ({ ...d, a: d.a * 0.97 }))
    .filter(d => d.a > 0.03);
}

function drawHeatmapBackground() {
  heatCtx.fillStyle = '#060a0f';
  heatCtx.fillRect(0, 0, heatCanvas.width, heatCanvas.height);

  // Grid lines
  heatCtx.strokeStyle = 'rgba(26,42,56,0.8)';
  heatCtx.lineWidth = 1;
  const step = 40;
  for (let x = 0; x < heatCanvas.width; x += step) {
    heatCtx.beginPath();
    heatCtx.moveTo(x, 0);
    heatCtx.lineTo(x, heatCanvas.height);
    heatCtx.stroke();
  }
  for (let y = 0; y < heatCanvas.height; y += step) {
    heatCtx.beginPath();
    heatCtx.moveTo(0, y);
    heatCtx.lineTo(heatCanvas.width, y);
    heatCtx.stroke();
  }

  if (moveCount === 0) {
    heatCtx.fillStyle = 'rgba(74,96,112,0.5)';
    heatCtx.font = '14px "Share Tech Mono", monospace';
    heatCtx.textAlign = 'center';
    heatCtx.fillText('[ move cursor here to start tracking ]', heatCanvas.width / 2, heatCanvas.height / 2);
    heatCtx.textAlign = 'left';
  }
}

function clearHeatmap() {
  heatmapDots = [];
  moveCount = 0;
  setText('move-count', 0);
  setText('last-x', '—');
  setText('last-y', '—');
  drawHeatmapBackground();
}