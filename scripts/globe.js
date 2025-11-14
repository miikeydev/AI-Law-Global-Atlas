let globeInstance = null;
let landFeaturesPromise = null;
const polygonMaterials = {};

export async function initGlobe(theme = 'light') {
  const container = document.getElementById('globeContainer');
  if (!container) {
    return;
  }
  if (typeof Globe === 'undefined' || typeof topojson === 'undefined') {
    showGlobeFallback(container);
    return;
  }
  try {
    const features = await loadLandFeatures();
    container.innerHTML = '';
    const palette = getGlobePalette(theme);
    globeInstance = Globe()(container)
      .backgroundColor('rgba(0,0,0,0)')
      .showGlobe(false)
      .showAtmosphere(false)
      .width(container.clientWidth || 360)
      .height(container.clientHeight || 360)
      .polygonsData(features)
      .polygonSideColor(() => 'rgba(0,0,0,0)')
      .polygonLabel(feature => feature.properties?.name || '')
      .polygonAltitude(0.008);

    applyPolygonAppearance(theme, palette);

    const controls = globeInstance.controls();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.55;

    ensureLighting(theme);
    globeInstance.pointOfView({ lat: 18, lng: -20, altitude: 1.35 });
    container.classList.remove('globe-fallback');
  } catch (error) {
    console.error('Globe initialization failed', error);
    showGlobeFallback(container);
  }
}

export async function updateGlobeTheme(theme = 'light') {
  if (!globeInstance) {
    await initGlobe(theme);
    return;
  }
  const palette = getGlobePalette(theme);
  applyPolygonAppearance(theme, palette);
  ensureLighting(theme);
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

function applyPolygonAppearance(theme, palette) {
  if (!globeInstance) {
    return;
  }
  globeInstance
    .polygonCapColor(() => palette.capColor)
    .polygonStrokeColor(() => palette.strokeColor);

  const material = getPolygonMaterial(theme, palette);
  if (material) {
    globeInstance.polygonCapMaterial(material);
  }
}

function getPolygonMaterial(theme, palette) {
  if (typeof window === 'undefined' || !window.THREE) {
    return null;
  }
  if (!polygonMaterials[theme]) {
    const { MeshLambertMaterial, DoubleSide } = window.THREE;
    polygonMaterials[theme] = new MeshLambertMaterial({
      color: palette.capColor,
      side: DoubleSide,
      transparent: true,
      opacity: palette.capOpacity
    });
  } else {
    polygonMaterials[theme].color.set(palette.capColor);
    polygonMaterials[theme].opacity = palette.capOpacity;
  }
  return polygonMaterials[theme];
}

async function loadLandFeatures() {
  if (!landFeaturesPromise) {
    const topo = getTopojson();
    if (!topo) {
      return Promise.reject(new Error('TopoJSON library missing'));
    }
    landFeaturesPromise = fetch('res/world-110m.json')
      .then(response => response.json())
      .then(worldData => {
        const land = worldData.objects && (worldData.objects.land || worldData.objects.countries);
        const targetObject = land || worldData.objects[Object.keys(worldData.objects)[0]];
        return topo.feature(worldData, targetObject).features;
      })
      .catch(error => {
        landFeaturesPromise = null;
        throw error;
      });
  }
  return landFeaturesPromise;
}

function getTopojson() {
  if (typeof topojson !== 'undefined') {
    return topojson;
  }
  if (typeof window !== 'undefined' && window.topojson) {
    return window.topojson;
  }
  return null;
}

function ensureLighting(theme) {
  if (!globeInstance || typeof globeInstance.scene !== 'function' || !window.THREE) {
    return;
  }
  const scene = globeInstance.scene();
  if (!scene) {
    return;
  }
  const ambientName = 'landingAmbientLight';
  const dirName = 'landingDirectionalLight';
  let ambient = scene.getObjectByName(ambientName);
  let directional = scene.getObjectByName(dirName);
  const { AmbientLight, DirectionalLight } = window.THREE;
  if (!ambient) {
    ambient = new AmbientLight(0xffffff, theme === 'dark' ? 0.8 : 0.45);
    ambient.name = ambientName;
    scene.add(ambient);
  } else {
    ambient.intensity = theme === 'dark' ? 0.8 : 0.45;
  }
  if (!directional) {
    directional = new DirectionalLight(0xffffff, theme === 'dark' ? 0.35 : 0.25);
    directional.position.set(5, 3, 2);
    directional.name = dirName;
    scene.add(directional);
  } else {
    directional.intensity = theme === 'dark' ? 0.35 : 0.25;
  }
}

function getGlobePalette(theme) {
  if (theme === 'dark') {
    return {
      capColor: '#6c6ff5',
      strokeColor: 'rgba(255,255,255,0.35)',
      capOpacity: 0.95
    };
  }
  return {
    capColor: '#0b0d16',
    strokeColor: 'rgba(20,22,40,0.45)',
    capOpacity: 0.92
  };
}

function showGlobeFallback(target) {
  const container = target || document.getElementById('globeContainer');
  if (container) {
    container.classList.add('globe-fallback');
  }
}
