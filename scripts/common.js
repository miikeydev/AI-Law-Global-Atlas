import { translations } from './data.js';

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
  updateFooterCopy();
  return { lang, theme: currentTheme };
}

export function navigateTo(path, params = {}) {
  storeNavigationState(path, params);
  const url = buildPageUrl(path, params);
  window.location.href = url;
}

function buildPageUrl(path, params = {}) {
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

export function setupResizeRedraw(redraw) {
  if (typeof redraw !== 'function') {
    return () => {};
  }
  let rafId = null;
  const onResize = () => {
    if (rafId !== null) {
      return;
    }
    rafId = window.requestAnimationFrame(() => {
      rafId = null;
      redraw();
    });
  };
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
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
  const lang = currentLang;
  const isDark = currentTheme === 'dark';
  if (lang === 'en') {
    return isDark ? 'Light mode' : 'Dark mode';
  }
  return isDark ? 'Mode clair' : 'Mode sombre';
}

function getThemeAria() {
  const lang = currentLang;
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
  updateLanguageToggleButtons(toggle);
  toggle.addEventListener('click', event => {
    event.preventDefault();
    const button = event.target.closest('[data-lang]');
    const requested = button?.dataset.lang;
    if (requested && requested !== currentLang) {
      updateLang(requested);
      return;
    }
    const fallbackLang = currentLang === 'fr' ? 'en' : 'fr';
    updateLang(fallbackLang);
  });
}

function updateLang(lang) {
  const normalized = lang === 'en' ? 'en' : 'fr';
  currentLang = normalized;
  storeLangPreference(normalized);
  const url = new URL(window.location.href);
  url.searchParams.set('lang', normalized);
  window.location.replace(url.toString());
}

function updateLanguageToggleButtons(toggle) {
  const buttons = toggle.querySelectorAll('[data-lang]');
  buttons.forEach(button => {
    const targetLang = button.dataset.lang;
    button.classList.toggle('active', targetLang === currentLang);
  });
}


function setupBrandHome() {
  const brand = document.getElementById('brandHome');
  if (brand) {
    brand.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
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

function updateFooterCopy() {
  const commonCopy = translations[currentLang]?.common;
  if (!commonCopy) {
    return;
  }

  const footer = document.querySelector('footer');
  const footerCopy = commonCopy.footer;
  if (footer && footerCopy) {
    const tagline = footer.querySelector('[data-i18n="footer.tagline"]');
    if (tagline) {
      tagline.textContent = footerCopy.tagline;
    }
    const subline = footer.querySelector('[data-i18n="footer.subline"]');
    if (subline) {
      subline.textContent = footerCopy.subline;
    }
    const contact = footer.querySelector('[data-i18n="footer.contact"]');
    if (contact) {
      contact.textContent = footerCopy.contact;
      contact.href = 'https://www.linkedin.com/in/emilie-letouz%C3%A9-57928a27b/';
      contact.target = '_blank';
      contact.rel = 'noopener noreferrer';
    }
  }

  const infoLabels = document.querySelectorAll('[data-i18n="common.info"]');
  infoLabels.forEach(label => {
    label.textContent = commonCopy.info || '+ infos';
  });
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
