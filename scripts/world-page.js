import { initCommon, navigateTo, setupResizeRedraw } from './common.js';
import { translations } from './data.js';
import { initGlobe, updateGlobeTheme } from './globe.js';
import { loadWorldGeometry, drawWorldMap } from './maps.js';
import { initCriterionPanel } from './criterion-panel.js';

const { lang, theme } = initCommon({ onThemeChange: updateGlobeTheme });
initGlobe(theme);

updateWorldText();
const criterionPanel = initCriterionPanel({
  lang,
  redraw: () => drawWorldMap(handleContinentSelect)
});

function updateWorldText() {
  const copy = translations[lang].world;
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

function handleContinentSelect(continentId) {
  if (!continentId) {
    return;
  }

  navigateTo('continent.html', { continent: continentId, lang });
}
