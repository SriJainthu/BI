// identity.js — IP, location, timezone

function loadIdentity() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  setText('timezone', tz);
  setText('localtime', new Date().toLocaleTimeString());
  setText('lang', navigator.language || navigator.userLanguage);
  const dnt = navigator.doNotTrack;
  setText('dnt', dnt === '1' ? 'Enabled' : dnt === '0' ? 'Disabled' : 'Not Set');

  fetch('https://ipapi.co/json/')
    .then(r => r.json())
    .then(d => {
      setText('ip', d.ip);
      setText('isp', d.org || d.asn || '—');
      setText('location', [d.city, d.region, d.country_name].filter(Boolean).join(', '));
      const lat = parseFloat(d.latitude).toFixed(4);
      const lng = parseFloat(d.longitude).toFixed(4);
      setText('coords', lat + ' / ' + lng);
    })
    .catch(() => {
      setText('ip', 'Unavailable');
      setText('location', 'Unavailable');
      setText('coords', 'Could not fetch');
    });
}