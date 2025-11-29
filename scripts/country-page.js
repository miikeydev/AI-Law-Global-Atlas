import { initCommon, consumeNavigationState } from './common.js';
import { translations, countryData, continentData } from './data.js';
import { loadWorldGeometry, renderCountryMap, renderContinentMap } from './maps.js';

const { lang } = initCommon();
const navState = consumeNavigationState();

const params = new URLSearchParams(window.location.search);
let countryId = params.get('country');

if (!countryId && navState?.params?.country) {
  countryId = navState.params.country;
}

const country = countryId ? countryData[countryId] : null;

if (!country) {
  renderFallback();
} else {
  renderCountryHeader(country);
  loadCountryContent(country);
  loadWorldGeometry().then(() => {
    if (countryId === 'ue') {
      renderContinentMap('europe');
    } else {
      renderCountryMap(countryId);
    }
  });
}

function renderFallback() {
  const nameEl = document.getElementById('countryName');
  if (nameEl) {
    nameEl.textContent = lang === 'fr' ? 'Pays introuvable' : 'Country not found';
  }
  const textEl = document.getElementById('countryText');
  if (textEl) {
    textEl.innerHTML =
      translations[lang]?.country?.textFallback ||
      (lang === 'fr'
        ? 'Contenu à venir pour ce pays.'
        : 'Content coming soon for this country.');
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
  if (subtitle) {
    subtitle.textContent = translations[lang].country.subtitle;
  }
}

async function loadCountryContent(country) {
  let text = '';

  try {
    const response = await fetch('country-content.json');
    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }
    const data = await response.json();
    const entry = data[country.id];
    const candidate = entry && entry[lang];
    if (candidate && typeof candidate === 'string') {
      text = candidate;
    }
  } catch (error) {
    console.warn('Unable to load country content', error);
  }

  if (!text) {
    text =
      translations[lang].country.textFallback ||
      (lang === 'fr'
        ? 'Contenu à venir pour ce pays.'
        : 'Content coming soon for this country.');
  }

  const container = document.getElementById('countryText');
  if (!container) return;

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
