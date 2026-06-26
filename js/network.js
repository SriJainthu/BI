// network.js — connection type, speed, battery

function loadNetwork() {
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  if (conn) {
    setText('conn-type', (conn.effectiveType || 'unknown').toUpperCase());
    setText('downlink', conn.downlink ? conn.downlink + ' Mbps' : 'N/A');
    setText('rtt', conn.rtt !== undefined ? conn.rtt + ' ms' : 'N/A');
    setText('datasaver', conn.saveData ? 'Enabled' : 'Disabled');
  } else {
    setText('conn-type', 'N/A');
    setText('downlink', 'Not supported');
    setText('rtt', 'N/A');
    setText('datasaver', 'N/A');
  }

  if (navigator.getBattery) {
    navigator.getBattery().then(battery => {
      const pct = Math.round(battery.level * 100);
      setText('battery-pct', pct + '%');
      setText('charging-status', battery.charging ? 'Charging' : 'On battery');

      const bar = $('battery-bar');
      if (bar) {
        bar.style.width = pct + '%';
        bar.style.background = pct > 60
          ? 'var(--green)'
          : pct > 25
          ? 'var(--amber)'
          : 'var(--red)';
      }

      battery.addEventListener('chargingchange', () => {
        setText('charging-status', battery.charging ? 'Charging' : 'On battery');
      });

      battery.addEventListener('levelchange', () => {
        const newPct = Math.round(battery.level * 100);
        setText('battery-pct', newPct + '%');
        if (bar) bar.style.width = newPct + '%';
      });
    });
  } else {
    setText('battery-pct', 'N/A');
    setText('charging-status', 'Battery API not supported');
  }
}