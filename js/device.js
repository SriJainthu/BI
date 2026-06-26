// device.js — OS, browser, screen, hardware info

function detectOS(ua) {
  if (/Windows NT 10/.test(ua)) return 'Windows 10/11';
  if (/Windows/.test(ua)) return 'Windows';
  if (/Mac OS X/.test(ua)) return 'macOS';
  if (/Android/.test(ua)) return 'Android';
  if (/iPhone|iPad/.test(ua)) return 'iOS';
  if (/Linux/.test(ua)) return 'Linux';
  return 'Unknown';
}

function detectBrowser(ua) {
  if (/Edg\//.test(ua)) return 'Microsoft Edge';
  if (/OPR\/|Opera/.test(ua)) return 'Opera';
  if (/Chrome\//.test(ua)) return 'Google Chrome';
  if (/Firefox\//.test(ua)) return 'Mozilla Firefox';
  if (/Safari\//.test(ua) && !/Chrome/.test(ua)) return 'Safari';
  return 'Unknown';
}

function loadDevice() {
  const ua = navigator.userAgent;

  setText('os', detectOS(ua));
  setText('browser', detectBrowser(ua));
  setText('screen', screen.width + ' × ' + screen.height);
  setText('colordepth', screen.colorDepth + ' bit');
  setText('cpu', navigator.hardwareConcurrency || '?');
  setText('mem', navigator.deviceMemory ? navigator.deviceMemory + ' GB' : 'N/A');
  setText('touch', ('ontouchstart' in window || navigator.maxTouchPoints > 0) ? 'Yes' : 'No');
  setText('ua', ua);
}