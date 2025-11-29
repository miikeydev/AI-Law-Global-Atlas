import { initCommon, consumeNavigationState } from './common.js';
import { translations, countryData, continentData } from './data.js';
import { loadWorldGeometry, renderCountryMap, renderContinentMap } from './maps.js';

const navState = getCountryNavState();
applyFallbackParams(navState);

const { lang: initialLang } = initCommon();
const params = new URLSearchParams(window.location.search);
const urlLang = params.get('lang');
const lang = urlLang === 'en' || urlLang === 'fr' ? urlLang : initialLang || 'fr';

let countryId = params.get('country');
if (!countryId && navState?.params?.country) {
  countryId = navState.params.country;
}
const country = countryId ? countryData[countryId] : null;

const CONTENT_PATH = {
  fr: new URL('../content/country-fr.json', import.meta.url).href,
  en: new URL('../content/country-en.json', import.meta.url).href
};

const contentCache = {};

if (!country) {
  renderFallback();
} else {
  renderCountryHeader(country);
  loadCountryContent(lang, countryId);
  loadWorldGeometry().then(() => {
    if (countryId === 'ue') {
      renderContinentMap('europe');
    } else {
      renderCountryMap(countryId);
    }
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
    nameEl.textContent = lang === 'fr' ? 'Pays introuvable' : 'Country not found';
  }
  const textEl = document.getElementById('countryText');
  if (textEl) {
    textEl.innerHTML = `<p>${getFallbackText(lang)}</p>`;
  }
}

function renderCountryHeader(country) {
  const continent = continentData[country.continentId];
  const heading = continent
    ? `${continent.names[lang]} : ${country.name[lang]}`
    : country.name[lang];

  const nameEl = document.getElementById('countryName');
  if (nameEl) {
    nameEl.textContent = heading;
  }
  const subtitle = document.querySelector('[data-i18n="country.subtitle"]');
  if (subtitle && translations[lang]?.country) {
    subtitle.textContent = translations[lang].country.subtitle;
  }
}

async function loadCountryContent(currentLang, id) {
  const container = document.getElementById('countryText');
  if (!container) {
    return;
  }

  let text = '';

  try {
    const targetLang = CONTENT_PATH[currentLang] ? currentLang : 'fr';
    const path = CONTENT_PATH[targetLang];
    if (!contentCache[targetLang]) {
      const response = await fetch(path, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      contentCache[targetLang] = await response.json();
    }
    const data = contentCache[targetLang];
    const candidate = data[id];
    if (candidate && typeof candidate === 'string') {
      text = candidate;
    }
  } catch (error) {
    console.warn('Unable to load country content', error);
  }

  if (!text) {
    text = getFallbackText(currentLang);
  }

  const blocks = text
    .split('\n\n')
    .map(b => b.trim())
    .filter(Boolean);

  const html = blocks
    .map(block => {
      if (block.startsWith('- ')) {
        const items = block
          .split('\n')
          .map(l => l.trim())
          .filter(l => l.startsWith('- '))
          .map(l => `<li>${l.slice(2)}</li>`)
          .join('');
        return `<ul>${items}</ul>`;
      }
      return `<p>${block}</p>`;
    })
    .join('');

  container.innerHTML = html;
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
