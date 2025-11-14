const THEME_KEY = 'aixip-theme';
let currentTheme = getStoredTheme();

export function initCommon(options = {}) {
  const lang = getLangParam();
  document.documentElement.lang = lang === 'fr' ? 'fr' : 'en';
  applyTheme(currentTheme);
  setupThemeButtons(options.onThemeChange);
  setupLanguageToggle(lang);
  setupBrandHome();
  setupBackButton();
  return { lang, theme: currentTheme };
}

export function getLangParam() {
  const value = new URLSearchParams(window.location.search).get('lang');
  return value === 'en' ? 'en' : 'fr';
}

export function navigateTo(path, params = {}) {
  const url = buildPageUrl(path, params);
  window.location.href = url;
}

export function buildPageUrl(path, params = {}) {
  const url = new URL(path, window.location.href);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
}


function setupThemeButtons(onThemeChange) {
  const buttons = document.querySelectorAll('.theme-toggle');
  updateThemeButtons(buttons);
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
      updateThemeButtons(buttons);
      if (typeof onThemeChange === 'function') {
        onThemeChange(currentTheme);
      }
    });
  });
  if (typeof onThemeChange === 'function') {
    onThemeChange(currentTheme);
  }
}

function updateThemeButtons(buttons) {
  buttons.forEach(button => {
    button.textContent = getThemeLabel();
    button.setAttribute('aria-label', getThemeAria());
  });
}

function getThemeLabel() {
  const lang = getLangParam();
  const isDark = currentTheme === 'dark';
  if (lang === 'en') {
    return isDark ? 'Light mode' : 'Dark mode';
  }
  return isDark ? 'Mode clair' : 'Mode sombre';
}

function getThemeAria() {
  const lang = getLangParam();
  const isDark = currentTheme === 'dark';
  if (lang === 'en') {
    return isDark ? 'Switch to light mode' : 'Switch to dark mode';
  }
  return isDark ? 'Activer le mode clair' : 'Activer le mode sombre';
}

function setupLanguageToggle(lang) {
  const toggle = document.getElementById('languageToggle');
  if (!toggle) {
    return;
  }
  const buttons = toggle.querySelectorAll('[data-lang]');
  buttons.forEach(button => {
    const targetLang = button.dataset.lang;
    button.classList.toggle('active', targetLang === lang);
    button.addEventListener('click', () => {
      if (targetLang === lang) {
        return;
      }
      updateLang(targetLang);
    });
  });
}

function updateLang(lang) {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.location.href = url.toString();
}


function setupBrandHome() {
  const brand = document.getElementById('brandHome');
  if (brand) {
    brand.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
}

function setupBackButton() {
  const backButton = document.getElementById('backButton');
  if (!backButton) {
    return;
  }
  backButton.addEventListener('click', () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = 'index.html';
    }
  });
}

function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    // ignore
  }
}

function getStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    return stored === 'dark' ? 'dark' : 'light';
  } catch (error) {
    return 'light';
  }
}
