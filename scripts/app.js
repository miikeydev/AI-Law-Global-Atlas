import { translations, continentData, countryData } from './data.js';
import { initGlobe, resizeGlobe, updateGlobeTheme } from './globe.js';
import { loadWorldGeometry, drawWorldMap, renderContinentMap, renderCountryMap, handleMapResize } from './maps.js';

const THEME_STORAGE_KEY = 'aixip-theme';
const initialTheme = getStoredTheme();

const state = {
  level: 'landing',
  lang: 'fr',
  continentId: null,
  countryId: null,
  theme: initialTheme
};

let currentThemeApplied = null;

const views = {
  landing: document.getElementById('landingView'),
  world: document.getElementById('worldView'),
  continent: document.getElementById('continentView'),
  country: document.getElementById('countryView')
};

const header = document.getElementById('appHeader');
const infoButton = document.getElementById('infoButton');
const backButton = document.getElementById('backButton');
const newsToggle = document.getElementById('newsToggle');
const newsPanel = document.getElementById('newsPanel');
const modalEl = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const brandHomeBtn = document.getElementById('brandHome');

init();

function init() {
  bindEvents();
  initGlobe(state.theme);
  loadWorldGeometry().then(() => {
    drawWorldMap(goToContinent);
    refreshMaps();
  });
  render();
}

function bindEvents() {
  Array.from(document.querySelectorAll('.primary[data-start]')).forEach(button => {
    button.addEventListener('click', () => {
      setState({ lang: button.dataset.start, level: 'world', continentId: null, countryId: null });
    });
  });

  Array.from(document.querySelectorAll('.language-toggle button')).forEach(button => {
    button.addEventListener('click', () => setState({ lang: button.dataset.lang }));
  });

  Array.from(document.querySelectorAll('.theme-toggle')).forEach(button => {
    button.addEventListener('click', toggleTheme);
  });

  Array.from(document.querySelectorAll('[data-modal]')).forEach(button => {
    button.addEventListener('click', () => openModal(button.dataset.modal));
  });

  backButton.addEventListener('click', handleBack);
  newsToggle.addEventListener('click', toggleNews);
  modalEl.querySelector('.close-modal').addEventListener('click', closeModal);
  modalEl.addEventListener('click', event => {
    if (event.target === modalEl) {
      closeModal();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  if (brandHomeBtn) {
    brandHomeBtn.addEventListener('click', () => {
      setState({ level: 'landing', continentId: null, countryId: null });
    });
  }

  window.addEventListener('resize', () => {
    resizeGlobe();
    handleMapResize(state.continentId, state.countryId, goToContinent, goToCountry);
  });
}

function setState(partial) {
  Object.assign(state, partial);
  render();
}

function toggleTheme() {
  const nextTheme = state.theme === 'light' ? 'dark' : 'light';
  setState({ theme: nextTheme });
}

function goToContinent(id) {
  if (!continentData[id]) {
    return;
  }
  setState({ level: 'continent', continentId: id, countryId: null });
}

function goToCountry(id) {
  if (!countryData[id]) {
    return;
  }
  setState({ level: 'country', countryId: id });
}

function handleBack() {
  if (state.level === 'country') {
    setState({ level: 'continent', countryId: null });
    return;
  }
  if (state.level === 'continent') {
    setState({ level: 'world', continentId: null });
    return;
  }
  if (state.level === 'world') {
    setState({ level: 'landing', continentId: null, countryId: null });
  }
}

function render() {
  applyTheme(state.theme);
  updateThemeButtons();
  document.documentElement.lang = state.lang === 'fr' ? 'fr' : 'en';
  Object.values(views).forEach(view => view.classList.remove('active'));
  views[state.level].classList.add('active');
  if (state.level === 'landing') {
    header.classList.add('hidden');
    if (infoButton) {
      infoButton.style.visibility = 'hidden';
    }
  } else {
    header.classList.remove('hidden');
    if (infoButton) {
      infoButton.style.visibility = 'visible';
    }
  }
  backButton.style.visibility = state.level === 'landing' ? 'hidden' : 'visible';
  updateInfoButton();
  updateLanguageControls();
  renderWorldTexts();
  renderContinentView();
  renderCountryView();
}

function updateThemeButtons() {
  const themeCopy = getThemeCopy();
  const buttons = document.querySelectorAll('.theme-toggle');
  buttons.forEach(button => {
    button.textContent = themeCopy.label;
    button.setAttribute('aria-label', themeCopy.aria);
  });
}

function getThemeCopy() {
  const themeStrings = translations[state.lang].common.theme;
  const isDark = state.theme === 'dark';
  const currentLabel = isDark
    ? (themeStrings.darkLabel || themeStrings.toDark || 'Mode sombre')
    : (themeStrings.lightLabel || themeStrings.toLight || 'Mode clair');
  const aria = isDark
    ? (themeStrings.ariaToLight || 'Activer le mode clair')
    : (themeStrings.ariaToDark || 'Activer le mode sombre');
  return { label: currentLabel, aria };
}

function updateInfoButton() {
  if (!infoButton) {
    return;
  }
  infoButton.textContent = translations[state.lang].common.info;
  infoButton.dataset.modal = state.level === 'country' ? 'country' : state.level === 'continent' ? 'continent' : 'world';
}

function updateLanguageControls() {
  Array.from(document.querySelectorAll('.language-toggle button')).forEach(button => {
    button.classList.toggle('active', button.dataset.lang === state.lang);
  });
}

function renderWorldTexts() {
  const t = translations[state.lang];
  const worldTitle = document.querySelector('[data-i18n="world.title"]');
  const worldDescription = document.querySelector('[data-i18n="world.description"]');
  if (worldTitle) {
    worldTitle.textContent = t.world.title;
  }
  if (worldDescription) {
    worldDescription.textContent = t.world.description;
  }
}

function renderContinentView() {
  const t = translations[state.lang];
  const subtitle = document.querySelector('[data-i18n="continent.subtitle"]');
  if (subtitle) {
    subtitle.textContent = t.continent.subtitle;
  }
  const availableLabel = document.querySelector('[data-i18n="continent.available"]');
  if (availableLabel) {
    availableLabel.textContent = t.continent.available;
  }
  const detailButton = document.querySelector('#continentView [data-modal="continent"]');
  if (detailButton) {
    detailButton.textContent = t.continent.info;
  }

  if (!state.continentId) {
    document.getElementById('continentName').textContent = '';
    document.getElementById('countryList').innerHTML = '';
    document.getElementById('donut').style.setProperty('--value', 0);
    document.getElementById('progressValue').textContent = '';
    document.getElementById('progressNote').innerHTML = '';
    renderContinentMap(null, goToCountry);
    return;
  }

  const continent = continentData[state.continentId];
  document.getElementById('continentName').textContent = continent.names[state.lang];
  const list = document.getElementById('countryList');
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
      const li = document.createElement('li');
      li.textContent = country.name[state.lang];
      list.appendChild(li);
    });
  }
  const donut = document.getElementById('donut');
  donut.style.setProperty('--value', continent.progress);
  document.getElementById('progressValue').textContent = `${formatPercent(continent.progress)}%`;
  document.getElementById('progressNote').innerHTML = t.continent.progress;
  renderContinentMap(state.continentId, goToCountry);
}

function renderCountryView() {
  const t = translations[state.lang];
  const subtitle = document.querySelector('[data-i18n="country.subtitle"]');
  if (subtitle) {
    subtitle.textContent = t.country.subtitle;
  }
  const newsTitle = document.querySelector('[data-i18n="country.newsTitle"]');
  if (newsTitle) {
    newsTitle.textContent = t.country.newsTitle;
  }
  if (!state.countryId) {
    newsToggle.textContent = t.country.newsToggle;
    newsPanel.classList.add('hidden');
    renderCountryMap(null);
    return;
  }
  const country = countryData[state.countryId];
  document.getElementById('countryName').textContent = country.name[state.lang];
  const continent = continentData[country.continentId];
  document.getElementById('continentBadge').textContent = continent.names[state.lang];
  newsPanel.classList.add('hidden');
  newsToggle.textContent = t.country.newsToggle;
  buildNewsList(country);
  buildLegalSections(country);
  renderCountryMap(state.countryId);
}

function buildNewsList(country) {
  const list = document.getElementById('newsList');
  list.innerHTML = '';
  const linkLabel = state.lang === 'fr' ? 'Consulter' : 'Open';
  country.news.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.title[state.lang]}</strong><span>${item.source} — ${item.date}</span><a href="${item.link}">${linkLabel}</a>`;
    list.appendChild(li);
  });
}

function buildLegalSections(country) {
  const wrapper = document.getElementById('legalSections');
  wrapper.innerHTML = '';
  country.sections.forEach((section, index) => {
    const group = document.createElement('div');
    group.className = 'accordion-group';
    const heading = document.createElement('h4');
    heading.textContent = `${index + 1}. ${section.title[state.lang]}`;
    group.appendChild(heading);
    section.items.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'accordion-item';
      const trigger = document.createElement('button');
      trigger.className = 'accordion-trigger';
      trigger.innerHTML = `<span class="badge">${item.badge}</span><span class="title">${item.title[state.lang]}</span>`;
      const icon = document.createElement('span');
      icon.textContent = '+';
      trigger.appendChild(icon);
      const content = document.createElement('div');
      content.className = 'accordion-content';
      content.textContent = item.content[state.lang];
      trigger.addEventListener('click', () => {
        const isOpen = itemEl.classList.toggle('open');
        icon.textContent = isOpen ? '–' : '+';
        content.classList.toggle('active', isOpen);
      });
      itemEl.appendChild(trigger);
      itemEl.appendChild(content);
      group.appendChild(itemEl);
    });
    wrapper.appendChild(group);
  });
}

function toggleNews() {
  if (!state.countryId) {
    return;
  }
  const t = translations[state.lang];
  const hidden = newsPanel.classList.toggle('hidden');
  newsToggle.textContent = hidden ? t.country.newsToggle : t.country.newsToggleClose;
}

function openModal(type) {
  if (type === 'world') {
    modalTitle.textContent = translations[state.lang].modal.world.title;
    modalBody.textContent = translations[state.lang].modal.world.body;
  } else if (type === 'continent' && state.continentId) {
    const continent = continentData[state.continentId];
    modalTitle.textContent = continent.names[state.lang];
    modalBody.textContent = continent.info[state.lang];
  } else if (type === 'country' && state.countryId) {
    const country = countryData[state.countryId];
    modalTitle.textContent = country.name[state.lang];
    modalBody.textContent = country.overview[state.lang];
  } else {
    return;
  }
  modalEl.classList.remove('hidden');
}

function closeModal() {
  modalEl.classList.add('hidden');
}

function formatPercent(value) {
  const locale = state.lang === 'fr' ? 'fr-FR' : 'en-US';
  return new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);
}

function applyTheme(theme = state.theme) {
  if (currentThemeApplied === theme) {
    return;
  }
  currentThemeApplied = theme;
  document.body.setAttribute('data-theme', theme);
  persistTheme(theme);
  updateGlobeTheme(theme);
}

function persistTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    // ignore storage errors
  }
}

function getStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'dark' ? 'dark' : 'light';
  } catch (error) {
    return 'light';
  }
}

function refreshMaps() {
  renderContinentMap(state.continentId, goToCountry);
  renderCountryMap(state.countryId);
}
