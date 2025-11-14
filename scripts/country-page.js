import { initCommon } from './common.js';
import { translations, countryData, continentData } from './data.js';
import { loadWorldGeometry, renderCountryMap } from './maps.js';

const { lang } = initCommon();
const params = new URLSearchParams(window.location.search);
const countryId = params.get('country');
const country = countryData[countryId];

if (!country) {
  renderFallback();
} else {
  renderCountryHeader(country);
  loadCountryContent(country).then(text => {
    const container = document.getElementById('countryText');
    if (container) {
      container.textContent = text;
    }
  });
  loadWorldGeometry().then(() => {
    renderCountryMap(countryId);
  });
}

function renderFallback() {
  const nameEl = document.getElementById('countryName');
  if (nameEl) {
    nameEl.textContent = lang === 'fr' ? 'Pays introuvable' : 'Country not found';
  }
}

function renderCountryHeader(country) {
  const continent = continentData[country.continentId];
  const heading = continent ? `${continent.names[lang]} : ${country.name[lang]}` : country.name[lang];
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
  try {
    const response = await fetch('country-content.json');
    const data = await response.json();
    const entry = data[country.id];
    const text = entry && entry[lang];
    if (text) {
      return text;
    }
  } catch (error) {
    console.warn('Unable to load country content', error);
  }
  return lang === 'fr' ? 'Contenu à venir pour ce pays.' : 'Content coming soon for this country.';
}
