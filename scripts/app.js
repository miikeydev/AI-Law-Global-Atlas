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
const THEME_TOGGLE_MIN_WIDTH = 180;
const THEME_TOGGLE_MAX_WIDTH = 300;
const THEME_TOGGLE_PADDING = 48;
const THEME_TOGGLE_KNOB_SPACE = 52;

const views = {
  landing: document.getElementById('landingView'),
  world: document.getElementById('worldView'),
  continent: document.getElementById('continentView'),
  country: document.getElementById('countryView')
};

const header = document.getElementById('appHeader');
const infoButton = document.getElementById('infoButton');
const backButton = document.getElementById('backButton');
const newsPanel = document.getElementById('newsPanel');
const newsListEl = document.getElementById('newsList');
const modalEl = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const brandHomeBtn = document.getElementById('brandHome');
const languageToggleControl = document.getElementById('languageToggle');

init();

function init() {
  bindEvents();
  initGlobe(state.theme).catch(error => console.warn('Globe init failed', error));
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

  Array.from(document.querySelectorAll('.theme-toggle')).forEach(button => {
    button.addEventListener('click', toggleTheme);
  });

  Array.from(document.querySelectorAll('[data-modal]')).forEach(button => {
    button.addEventListener('click', () => openModal(button.dataset.modal));
  });

  backButton.addEventListener('click', handleBack);
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
  if (languageToggleControl) {
    languageToggleControl.addEventListener('click', toggleLanguage);
    languageToggleControl.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleLanguage();
      }
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

function toggleLanguage() {
  const nextLang = state.lang === 'fr' ? 'en' : 'fr';
  setState({ lang: nextLang });
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
    let labelEl = button.querySelector('.theme-label');
    if (!labelEl) {
      button.innerHTML = '<span class="theme-label"></span><span class="theme-thumb" aria-hidden="true"></span>';
      labelEl = button.querySelector('.theme-label');
    }
    labelEl.textContent = themeCopy.label;
    button.setAttribute('aria-label', themeCopy.aria);
    button.dataset.theme = state.theme;
    button.classList.toggle('is-dark', state.theme === 'dark');
    button.classList.toggle('is-light', state.theme === 'light');
    syncThemeToggleWidth(button, labelEl);
  });
}

function syncThemeToggleWidth(button, labelEl) {
  if (!button || !labelEl) {
    return;
  }
  const measuredTextWidth = measureLabelWidth(labelEl);
  const desiredWidth = clampWidth(Math.ceil(measuredTextWidth + THEME_TOGGLE_PADDING + THEME_TOGGLE_KNOB_SPACE));
  button.style.setProperty('--theme-toggle-width', `${desiredWidth}px`);
}

function measureLabelWidth(labelEl) {
  const clone = labelEl.cloneNode(true);
  clone.style.position = 'absolute';
  clone.style.visibility = 'hidden';
  clone.style.opacity = '0';
  clone.style.whiteSpace = 'nowrap';
  clone.style.width = 'auto';
  clone.style.flex = '0 0 auto';
  clone.style.pointerEvents = 'none';
  labelEl.parentNode.appendChild(clone);
  const width = clone.scrollWidth;
  clone.remove();
  return width;
}

function clampWidth(value) {
  if (!Number.isFinite(value)) {
    return THEME_TOGGLE_MIN_WIDTH;
  }
  return Math.max(THEME_TOGGLE_MIN_WIDTH, Math.min(THEME_TOGGLE_MAX_WIDTH, value));
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
  if (!languageToggleControl) {
    return;
  }
  const isEnglish = state.lang === 'en';
  languageToggleControl.setAttribute('aria-checked', isEnglish ? 'true' : 'false');
  languageToggleControl.dataset.lang = state.lang;
  const options = languageToggleControl.querySelectorAll('.lang-option');
  options.forEach((option, index) => {
    const active = (index === 0 && !isEnglish) || (index === 1 && isEnglish);
    option.classList.toggle('active', active);
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
  const newsLabel = document.querySelector('[data-i18n="country.newsLabel"]');
  if (newsLabel) {
    newsLabel.textContent = t.country.newsLabel;
  }
  if (!state.countryId) {
    updateNewsSection(null);
    renderCountryMap(null);
    return;
  }
  const country = countryData[state.countryId];
  document.getElementById('countryName').textContent = country.name[state.lang];
  const continent = continentData[country.continentId];
  document.getElementById('continentBadge').textContent = continent.names[state.lang];
  updateNewsSection(country);
  buildLegalSections(country);
  renderCountryMap(state.countryId);
}

function updateNewsSection(country) {
  if (!newsPanel || !newsListEl) {
    return;
  }
  newsListEl.innerHTML = '';
  if (!country) {
    newsPanel.classList.add('hidden');
    return;
  }
  newsPanel.classList.remove('hidden');
  const linkLabel = state.lang === 'fr' ? 'Consulter' : 'Open';
  const newsItems = Array.isArray(country.news) ? country.news : [];
  if (!newsItems.length) {
    const li = document.createElement('li');
    li.className = 'news-empty';
    li.textContent = translations[state.lang].country.newsEmpty || '';
    newsListEl.appendChild(li);
    return;
  }
  newsItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.title[state.lang]}</strong><span>${item.source} — ${item.date}</span><a href="${item.link}" target="_blank" rel="noopener">${linkLabel}</a>`;
    newsListEl.appendChild(li);
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
  Promise.resolve(updateGlobeTheme(theme)).catch(error => console.warn('Globe theme update skipped', error));
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
