import { initCommon, navigateTo } from './common.js';
import { translations, continentData, countryData } from './data.js';
import { loadWorldGeometry, renderContinentMap } from './maps.js';

const { lang } = initCommon();
const params = new URLSearchParams(window.location.search);
const continentId = params.get('continent');
if (!continentId) {
  navigateTo('world.html', { lang });
}
const continent = continentData[continentId];

if (!continent) {
  renderFallback();
} else {
  renderContinentInfo();
  loadWorldGeometry().then(() => {
    renderContinentMap(continentId, handleCountrySelect);
  });
}

function renderFallback() {
  const nameEl = document.getElementById('continentName');
  if (nameEl) {
    nameEl.textContent = lang === 'fr' ? 'Continent introuvable' : 'Continent not found';
  }
  document.querySelector('.continent-map')?.classList.add('hidden');
  document.querySelector('.continent-info')?.classList.add('empty');
}

function renderContinentInfo() {
  const t = translations[lang];
  const nameEl = document.getElementById('continentName');
  if (nameEl) {
    nameEl.textContent = continent.names[lang];
  }
  const subtitle = document.querySelector('[data-i18n="continent.subtitle"]');
  if (subtitle) {
    subtitle.textContent = t.continent.subtitle;
  }
  const availableLabel = document.querySelector('[data-i18n="continent.available"]');
  if (availableLabel) {
    availableLabel.textContent = t.continent.available;
  }
  const list = document.getElementById('countryList');
  if (list) {
    list.innerHTML = '';
    if (!continent.availableCountries.length) {
      const li = document.createElement('li');
      li.textContent = t.common.comingSoon;
      list.appendChild(li);
    } else {
      continent.availableCountries.forEach(id => {
        const country = countryData[id];
        if (!country) {
          return;
        }
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = country.name[lang];
        button.addEventListener('click', () => navigateTo('country.html', { continent: continentId, country: country.id, lang }));
        const li = document.createElement('li');
        li.appendChild(button);
        list.appendChild(li);
      });
    }
  }
  const donut = document.getElementById('donut');
  const progressValue = document.getElementById('progressValue');
  const progressNote = document.getElementById('progressNote');
  if (donut) {
    donut.style.setProperty('--value', continent.progress);
  }
  if (progressValue) {
    progressValue.textContent = `${formatPercent(continent.progress)}%`;
  }
  if (progressNote) {
    progressNote.innerHTML = t.continent.progress;
  }
}

function handleCountrySelect(countryId) {
  if (!countryData[countryId]) {
    return;
  }
  navigateTo('country.html', { continent: continentId, country: countryId, lang });
}

function formatPercent(value) {
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US';
  return new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);
}
