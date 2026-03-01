import { initCommon, consumeNavigationState } from './common.js';
import { translations, countryData, continentData } from './data.js';
import { loadWorldGeometry, renderCountryMap } from './maps.js';

const navState = getCountryNavState();
applyFallbackParams(navState);

let currentLang = 'fr';
const { lang } = initCommon({ onLangChange: handleLangChange });
currentLang = lang;
const params = new URLSearchParams(window.location.search);

let countryId = params.get('country');
if (!countryId && navState?.params?.country) {
  countryId = navState.params.country;
}
const country = countryId ? countryData[countryId] : null;

const CONTENT_ROOT = {
  fr: '../content/fr/',
  en: '../content/en/'
};

const contentCache = {};
let contentRequestToken = 0;

if (!country) {
  renderFallback();
} else {
  renderCountryHeader(country);
  loadCountryContent(currentLang, countryId);
  loadWorldGeometry().then(() => {
    renderCountryMap(countryId);
  });
}

function getFallbackText(currentLang) {
  return (
    translations[currentLang]?.country?.textFallback ||
    (currentLang === 'fr'
      ? 'Contenu à venir pour ce pays.'
      : 'Content coming soon for this country.')
  );
}

function renderFallback() {
  const nameEl = document.getElementById('countryName');
  if (nameEl) {
    nameEl.textContent = currentLang === 'fr' ? 'Pays introuvable' : 'Country not found';
  }
  const textEl = document.getElementById('countryText');
  if (textEl) {
    textEl.innerHTML = `<p>${getFallbackText(currentLang)}</p>`;
  }
}

function renderCountryHeader(country) {
  const continent = continentData[country.continentId];
  const heading = continent
    ? `${continent.names[currentLang]} : ${country.name[currentLang]}`
    : country.name[currentLang];

  const nameEl = document.getElementById('countryName');
  if (nameEl) {
    nameEl.textContent = heading;
  }
  const subtitle = document.querySelector('[data-i18n="country.subtitle"]');
  if (subtitle && translations[currentLang]?.country) {
    subtitle.textContent = translations[currentLang].country.subtitle;
  }
}

async function loadCountryContent(currentLang, id) {
  const container = document.getElementById('countryText');
  if (!container) {
    return;
  }
  const requestToken = ++contentRequestToken;

  const langToUse = CONTENT_ROOT[currentLang] ? currentLang : 'fr';
  const cacheKey = `${langToUse}:${id}`;
  let html = '';

  try {
    if (contentCache[cacheKey]) {
      html = contentCache[cacheKey];
    } else {
      const url = new URL(`${CONTENT_ROOT[langToUse]}${id}.html`, import.meta.url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      html = await response.text();
      contentCache[cacheKey] = html;
    }
  } catch (error) {
    console.warn('Unable to load country content', error);
  }

  if (!html || !html.trim()) {
    html = `<p>${getFallbackText(langToUse)}</p>`;
  }

  if (requestToken !== contentRequestToken) {
    return;
  }
  container.innerHTML = html;
}

function handleLangChange(langCode) {
  currentLang = langCode === 'en' ? 'en' : 'fr';
  if (!country) {
    renderFallback();
    return;
  }
  renderCountryHeader(country);
  loadCountryContent(currentLang, countryId);
  renderCountryMap(countryId);
}

function getCountryNavState() {
  const state = consumeNavigationState();
  if (!state || !state.path) {
    return state;
  }
  return state.path.includes('country') ? state : null;
}

function applyFallbackParams(state) {
  if (!state || !state.params) {
    return;
  }
  try {
    const url = new URL(window.location.href);
    let updated = false;
    ['lang', 'continent', 'country'].forEach(key => {
      if (!url.searchParams.get(key) && state.params[key]) {
        url.searchParams.set(key, state.params[key]);
        updated = true;
      }
    });
    if (updated) {
      window.history.replaceState({}, '', url);
    }
  } catch (error) {
    // ignore inability to update history
  }
}
