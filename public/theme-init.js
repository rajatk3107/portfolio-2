// Runs before React hydration to prevent flash of wrong theme
try {
  var saved = localStorage.getItem('theme');
  var preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  if ((saved || preferred) === 'light') {
    document.documentElement.classList.add('light');
  }
} catch (e) {}
