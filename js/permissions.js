// permissions.js — check browser permissions

function loadPermissions() {
  const perms = ['camera', 'microphone', 'geolocation', 'notifications'];

  perms.forEach(name => {
    if (navigator.permissions) {
      navigator.permissions.query({ name })
        .then(result => setBadge('perm-' + name, result.state))
        .catch(() => setBadge('perm-' + name, 'unknown'));
    } else {
      setBadge('perm-' + name, 'unknown');
    }
  });

  // Cookies
  setBadge('perm-cookies', navigator.cookieEnabled ? 'granted' : 'denied');

  // LocalStorage
  try {
    localStorage.setItem('__bid_test__', '1');
    localStorage.removeItem('__bid_test__');
    setBadge('perm-storage', 'granted');
  } catch {
    setBadge('perm-storage', 'denied');
  }

  // PDF viewer
  const hasPDF = navigator.pdfViewerEnabled !== undefined
    ? navigator.pdfViewerEnabled
    : navigator.mimeTypes && navigator.mimeTypes['application/pdf'];
  setBadge('perm-pdf', hasPDF ? 'granted' : 'denied');
}