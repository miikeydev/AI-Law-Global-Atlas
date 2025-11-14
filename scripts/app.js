import { initCommon } from './common.js';
import { initGlobe, resizeGlobe, updateGlobeTheme } from './globe.js';

const { theme } = initCommon({ onThemeChange: updateGlobeTheme });
initGlobe(theme);

window.addEventListener('resize', () => {
  resizeGlobe();
});
