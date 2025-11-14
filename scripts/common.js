const THEME_KEY = 'aixip-theme';
const NAV_STATE_KEY = 'aixip-nav-state';
const LANG_KEY = 'aixip-lang';
let currentTheme = getStoredTheme();
let currentLang = determineInitialLang();

export function initCommon(options = {}) {
  const lang = currentLang;
  document.documentElement.lang = lang === 'fr' ? 'fr' : 'en';
  applyTheme(currentTheme);
  setupThemeButtons(options.onThemeChange);
  setupLanguageToggle();
  setupBrandHome();
  setupBackButton();
  return { lang, theme: currentTheme };
}

export function getLangParam() {
  return currentLang;
}

export function navigateTo(path, params = {}) {
  storeNavigationState(path, params);
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

export function consumeNavigationState() {
  try {
    const raw = sessionStorage.getItem(NAV_STATE_KEY);
    sessionStorage.removeItem(NAV_STATE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

function storeNavigationState(path, params = {}) {
  try {
    sessionStorage.setItem(NAV_STATE_KEY, JSON.stringify({
      path,
      params,
      timestamp: Date.now()
    }));
  } catch (error) {
    // ignore storage errors
  }
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

function setupLanguageToggle() {
  const toggle = document.getElementById('languageToggle');
  if (!toggle) {
    return;
  }
  const buttons = toggle.querySelectorAll('[data-lang]');
  buttons.forEach(button => {
    const targetLang = button.dataset.lang;
    button.classList.toggle('active', targetLang === currentLang);
    button.addEventListener('click', () => {
      if (!targetLang || targetLang === currentLang) {
        return;
      }
      updateLang(targetLang);
    });
  });
}

function updateLang(lang) {
  const normalized = lang === 'en' ? 'en' : 'fr';
  currentLang = normalized;
  storeLangPreference(normalized);
  const url = new URL(window.location.href);
  url.searchParams.set('lang', normalized);
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

function determineInitialLang() {
  const fromUrl = readLangFromUrl();
  if (fromUrl) {
    storeLangPreference(fromUrl);
    return fromUrl;
  }
  const stored = getStoredLangPreference();
  if (stored) {
    applyLangToUrl(stored);
    return stored;
  }
  applyLangToUrl('fr');
  return 'fr';
}

function readLangFromUrl() {
  const value = new URLSearchParams(window.location.search).get('lang');
  if (value === 'en' || value === 'fr') {
    return value;
  }
  return null;
}

function applyLangToUrl(lang) {
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get('lang') === lang) {
      return;
    }
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
  } catch (error) {
    // ignore inability to update URL
  }
}

function storeLangPreference(lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (error) {
    // ignore
  }
}

function getStoredLangPreference() {
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === 'en' || stored === 'fr') {
      return stored;
    }
  } catch (error) {
    return null;
  }
  return null;
}
