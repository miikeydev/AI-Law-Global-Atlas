let globeInstance = null;
const texturePaths = {
  light: 'res/light_earth.jpg',
  dark: 'res/dark_earth.jpg'
};

export function initGlobe(theme = 'light') {
  const container = document.getElementById('globeContainer');
  if (!container) {
    return;
  }
  if (typeof Globe === 'undefined') {
    showGlobeFallback(container);
    return;
  }
  try {
    container.innerHTML = '';
    const palette = getGlobePalette(theme);
    const texture = getGlobeTexture(theme);
    globeInstance = Globe()(container)
      .globeImageUrl(texture)
      .bumpImageUrl(null)
      .backgroundColor('rgba(0,0,0,0)')
      .showAtmosphere(true)
      .atmosphereColor(palette.atmosphereColor)
      .atmosphereAltitude(0.18)
      .width(container.clientWidth || 360)
      .height(container.clientHeight || 360);

    const material = globeInstance.globeMaterial();
    material.color.set(palette.materialColor);
    material.emissive.set(palette.emissiveColor);
    material.emissiveIntensity = palette.emissiveIntensity;
    material.shininess = 25;

    const renderer = globeInstance.renderer();
    renderer.setClearColor(0x000000, 0);

    const controls = globeInstance.controls();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;

    globeInstance.pointOfView({ lat: 12, lng: -15, altitude: 1.35 });
    container.classList.remove('globe-fallback');
  } catch (error) {
    console.error('Globe initialization failed', error);
    showGlobeFallback(container);
  }
}

export function updateGlobeTheme(theme = 'light') {
  if (!globeInstance) {
    initGlobe(theme);
    return;
  }
  const palette = getGlobePalette(theme);
  const texture = getGlobeTexture(theme);
  globeInstance.globeImageUrl(texture);
  const material = globeInstance.globeMaterial();
  material.color.set(palette.materialColor);
  material.emissive.set(palette.emissiveColor);
  material.emissiveIntensity = palette.emissiveIntensity;
  globeInstance.atmosphereColor(palette.atmosphereColor);
}

export function resizeGlobe() {
  if (!globeInstance) {
    return;
  }
  const container = document.getElementById('globeContainer');
  if (!container) {
    return;
  }
  globeInstance.width(container.clientWidth || 360);
  globeInstance.height(container.clientHeight || 360);
}

function getGlobeTexture(theme = 'light') {
  const key = theme === 'dark' ? 'dark' : 'light';
  return texturePaths[key];
}

function getGlobePalette(theme) {
  if (theme === 'dark') {
    return {
      materialColor: '#0b0c1a',
      emissiveColor: '#030304',
      emissiveIntensity: 0.55,
      atmosphereColor: '#6768ff'
    };
  }
  return {
    materialColor: '#dfe5f0',
    emissiveColor: '#aab9ff',
    emissiveIntensity: 0.35,
    atmosphereColor: '#cbd1ff'
  };
}

function showGlobeFallback(target) {
  const container = target || document.getElementById('globeContainer');
  if (container) {
    container.classList.add('globe-fallback');
  }
}
