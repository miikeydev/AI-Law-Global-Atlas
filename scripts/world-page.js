import { initCommon, navigateTo } from './common.js';
import { translations } from './data.js';
import { initGlobe, resizeGlobe, updateGlobeTheme } from './globe.js';
import { loadWorldGeometry, drawWorldMap } from './maps.js';

const { lang, theme } = initCommon({ onThemeChange: updateGlobeTheme });
initGlobe(theme);

const textTitle = document.querySelector('[data-i18n="world.title"]');
const textDescription = document.querySelector('[data-i18n="world.description"]');
updateWorldText();

function updateWorldText() {
  const copy = translations[lang].world;
  if (textTitle) {
    textTitle.textContent = copy.title;
  }
  if (textDescription) {
    textDescription.textContent = copy.description;
  }
}

loadWorldGeometry().then(() => {
  drawWorldMap(handleContinentSelect);
});

function handleContinentSelect(continentId) {
  if (!continentId) {
    return;
  }
  if (continentId === 'europe') {
    navigateTo('country.html', { country: 'ue', lang });
    return;
  }
  navigateTo('continent.html', { continent: continentId, lang });
}
