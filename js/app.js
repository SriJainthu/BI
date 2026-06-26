// app.js — tab navigation, clock, init

function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  const panes = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) target.classList.add('active');

      if (tab.dataset.tab === 'heatmap') initHeatmap();
    });
  });
}

function initClock() {
  function tick() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    setText('clock', h + ':' + m + ':' + s);
    setText('footer-time', now.toLocaleDateString() + ' ' + h + ':' + m + ':' + s);
    setText('localtime', now.toLocaleTimeString());
  }
  tick();
  setInterval(tick, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initClock();
  loadIdentity();
  loadDevice();
  loadNetwork();
  loadPermissions();
  loadPerformance();
});