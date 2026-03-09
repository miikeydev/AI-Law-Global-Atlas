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
  setupLanguageToggle(options.onLangChange);
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

function setupLanguageToggle(onLangChange) {
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
      updateLang(requested, onLangChange, toggle);
      return;
    }
    const fallbackLang = currentLang === 'fr' ? 'en' : 'fr';
    updateLang(fallbackLang, onLangChange, toggle);
  });
}

function updateLang(lang, onLangChange, toggle) {
  const normalized = lang === 'en' ? 'en' : 'fr';
  if (normalized === currentLang) {
    if (toggle) {
      updateLanguageToggleButtons(toggle);
    }
    return;
  }
  currentLang = normalized;
  document.documentElement.lang = normalized;
  storeLangPreference(normalized);
  applyLangToUrl(normalized);
  if (toggle) {
    updateLanguageToggleButtons(toggle);
  }
  updateThemeButtons(document.querySelectorAll('.theme-toggle'));
  updateFooterCopy();
  updateContactModalLang(normalized);
  if (typeof onLangChange === 'function') {
    onLangChange(normalized);
  }
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
      contact.removeAttribute('href');
      contact.style.cursor = 'pointer';
      contact.addEventListener('click', e => {
        e.preventDefault();
        openContactModal();
      });
    }
  }
  initContactModal();

  const infoLabels = document.querySelectorAll('[data-i18n="common.info"]');
  infoLabels.forEach(label => {
    label.textContent = commonCopy.info || (currentLang === 'en' ? '+ info' : '+ d\'infos');
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

// ─── Contact modal ────────────────────────────────────────────────────────────

function initContactModal() {
  if (document.getElementById('contactModal')) return;
  const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';
  const t = {
    title:    lang === 'en' ? 'About the project'            : 'À propos du projet',
    subtitle: lang === 'en' ? 'A collaboration between two.' : 'Un travail à deux mains.',
    roleE:    lang === 'en' ? 'Research, writing & sources'  : 'Recherche, rédaction & sources',
    roleM:    lang === 'en' ? 'Development & code'           : 'Développement & code',
    linkedin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="flex-shrink:0"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> LinkedIn`,
    close:    lang === 'en' ? 'Close'                        : 'Fermer',
  };

  const modal = document.createElement('div');
  modal.id = 'contactModal';
  modal.className = 'contact-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', t.title);
  modal.innerHTML = `
    <div class="contact-modal-backdrop"></div>
    <div class="contact-modal-card">
      <button class="contact-modal-close" aria-label="${t.close}" data-modal-i18n="close">✕</button>
      <p class="contact-modal-title" data-modal-i18n="title">${t.title}</p>
      <p class="contact-modal-subtitle" data-modal-i18n="subtitle">${t.subtitle}</p>
      <div class="contact-modal-profiles">
        <div class="contact-profile">
          <div class="contact-profile-avatar">
            <img src="res/EmilieLetouzePP.jpeg" alt="Émilie Letouzé" loading="lazy">
          </div>
          <p class="contact-profile-name">Émilie Letouzé</p>
          <p class="contact-profile-role" data-modal-i18n="roleE">${t.roleE}</p>
          <a class="contact-profile-link"
             href="https://www.linkedin.com/in/emilie-letouz%C3%A9-57928a27b/"
             target="_blank" rel="noopener noreferrer">${t.linkedin}</a>
        </div>
        <div class="contact-profile">
          <div class="contact-profile-avatar">
            <img src="res/MahounaVayssieresPP.jpeg" alt="Mahouna Vayssieres" loading="lazy">
          </div>
          <p class="contact-profile-name">Mahouna Vayssieres</p>
          <p class="contact-profile-role" data-modal-i18n="roleM">${t.roleM}</p>
          <a class="contact-profile-link"
             href="https://www.linkedin.com/in/mahouna-vayssieres-6b627a223/"
             target="_blank" rel="noopener noreferrer">${t.linkedin}</a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('.contact-modal-backdrop').addEventListener('click', closeContactModal);
  modal.querySelector('.contact-modal-close').addEventListener('click', closeContactModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeContactModal();
  });
}

function updateContactModalLang(lang) {
  const modal = document.getElementById('contactModal');
  if (!modal) return;
  const t = {
    title:    lang === 'en' ? 'About the project'            : 'À propos du projet',
    subtitle: lang === 'en' ? 'A collaboration between two.' : 'Un travail à deux mains.',
    roleE:    lang === 'en' ? 'Research, writing & sources'  : 'Recherche, rédaction & sources',
    roleM:    lang === 'en' ? 'Development & code'           : 'Développement & code',
    close:    lang === 'en' ? 'Close'                        : 'Fermer',
  };
  modal.querySelectorAll('[data-modal-i18n]').forEach(el => {
    const key = el.getAttribute('data-modal-i18n');
    if (key === 'close') el.setAttribute('aria-label', t.close);
    else if (t[key] !== undefined) el.textContent = t[key];
  });
}

function openContactModal() {
  const modal = document.getElementById('contactModal');
  if (modal) modal.classList.add('is-open');
}

function closeContactModal() {
  const modal = document.getElementById('contactModal');
  if (modal) modal.classList.remove('is-open');
}
