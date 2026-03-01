import { initCommon, navigateTo, setupResizeRedraw } from './common.js';
import { translations } from './data.js';
import { loadWorldGeometry, drawWorldMap, hasWorldCriterion, setWorldCriterion } from './maps.js';
import { initCriterionPanel } from './criterion-panel.js';

let currentLang = 'fr';
const criterionPanel = initCriterionPanel({
  lang: currentLang,
  redraw: () => drawWorldMap(handleContinentSelect)
});
const { lang } = initCommon({ onLangChange: handleLangChange });
currentLang = lang;
if (!hasWorldCriterion()) {
  setWorldCriterion('c1');
}

criterionPanel.setLang(currentLang);
updateWorldText();

function updateWorldText() {
  const copy = translations[currentLang].world;
  const worldTextNodes = document.querySelectorAll('[data-i18n="world.title"], [data-i18n="world.description"]');
  worldTextNodes.forEach(node => {
    const key = node.getAttribute('data-i18n')?.replace('world.', '');
    if (!key || !(key in copy)) {
      return;
    }
    node.textContent = copy[key];
  });
}

loadWorldGeometry().then(() => {
  drawWorldMap(handleContinentSelect);
  criterionPanel.render();
  setupResizeRedraw(() => drawWorldMap(handleContinentSelect));
});

function handleLangChange(langCode) {
  currentLang = langCode === 'en' ? 'en' : 'fr';
  updateWorldText();
  criterionPanel.setLang(currentLang);
  criterionPanel.render();
  drawWorldMap(handleContinentSelect);
}

function handleContinentSelect(continentId) {
  if (!continentId) {
    return;
  }

  navigateTo('continent.html', { continent: continentId, lang: currentLang });
}
