import { initCommon } from './common.js';
import { initGlobe, resizeGlobe, updateGlobeTheme } from './globe.js';

const { theme } = initCommon({ onThemeChange: updateGlobeTheme });
initGlobe(theme);

let resizeRaf = null;
window.addEventListener('resize', () => {
  if (resizeRaf !== null) {
    return;
  }
  resizeRaf = window.requestAnimationFrame(() => {
    resizeRaf = null;
    resizeGlobe();
  });
});
