// utils.js — shared helpers

function $(id) { return document.getElementById(id); }

function setText(id, val) {
  const el = $(id);
  if (el) el.textContent = val || '—';
}

function setBadge(id, state) {
  const el = $(id);
  if (!el) return;
  el.className = 'badge';
  if (state === 'granted') { el.textContent = 'granted'; el.classList.add('granted'); }
  else if (state === 'denied') { el.textContent = 'denied'; el.classList.add('denied'); }
  else if (state === 'prompt') { el.textContent = 'prompt'; el.classList.add('prompt'); }
  else { el.textContent = state || 'unknown'; }
}

function formatMs(ms) {
  if (ms === null || ms === undefined || isNaN(ms)) return '—';
  return Math.round(ms) + ' ms';
}