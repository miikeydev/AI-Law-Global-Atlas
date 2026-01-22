import {
  countryData,
  continentBounds,
  continentIdByLabel,
  continentData,
  manualCountryContinents,
  geoNameToCountryId,
  countryNameAliases
} from './data.js';

let worldFeatures = [];
let worldReady = false;
let countryContinentLookup = {};

const fallbackRegions = [
  { id: 'americas', bounds: [[-170, -60], [-15, 80]] },
  { id: 'europe', bounds: [[-30, 34], [65, 75]] },
  { id: 'africa', bounds: [[-25, -40], [60, 38]] },
  { id: 'asia', bounds: [[20, -10], [180, 85]] },
  { id: 'oceania', bounds: [[95, -50], [-110, 35]] }
];

export function loadWorldGeometry() {
  if (typeof d3 === 'undefined' || typeof topojson === 'undefined') {
    console.warn('Map libraries missing.');
    return Promise.resolve();
  }
  return Promise.all([
    fetch('res/world-110m.json').then(response => response.json()),
    fetch('res/country-continent.json').then(response => response.json()).catch(() => [])
  ])
    .then(([worldData, continentList]) => {
      worldFeatures = topojson.feature(worldData, worldData.objects.countries).features;
      countryContinentLookup = buildCountryContinentLookup(Array.isArray(continentList) ? continentList : [], worldFeatures);
      worldReady = true;
      return worldFeatures;
    })
    .catch(error => console.error('Unable to load world data', error));
}

export function drawWorldMap(onContinentSelect) {
  if (!worldReady || typeof d3 === 'undefined') {
    return;
  }
  const svg = d3.select('#worldMap');
  if (svg.empty()) {
    return;
  }
  const { width, height } = getSvgSize(svg);
  svg.attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMidYMid meet');
  const projection = d3.geoNaturalEarth1().fitExtent([[26, 26], [width - 26, height - 26]], { type: 'Sphere' });
  const path = d3.geoPath(projection);

  let layer = svg.select('g.map-layer');
  if (layer.empty()) {
    layer = svg.append('g').attr('class', 'map-layer');
  }

  const paths = layer.selectAll('path.land')
    .data(worldFeatures)
    .join('path')
    .attr('class', 'land')
    .attr('d', path)
    .attr('data-continent', feature => getContinentForFeature(feature) || '')
    .style('cursor', feature => (getContinentForFeature(feature) ? 'pointer' : 'default'));

  paths
    .on('mouseenter', (event, feature) => handleWorldHover(feature, true))
    .on('mouseleave', (event, feature) => handleWorldHover(feature, false))
    .on('click', (event, feature) => {
      const continentId = getContinentForFeature(feature);
      if (continentId && typeof onContinentSelect === 'function') {
        onContinentSelect(continentId);
      }
    });

  applyMobilePan(svg, layer, width, height, true);
}

export function renderContinentMap(continentId, onCountrySelect) {
  if (typeof d3 === 'undefined') {
    return;
  }
  const svg = d3.select('#continentMap');
  if (svg.empty()) {
    return;
  }
  if (!worldReady || !continentId) {
    svg.selectAll('*').remove();
    return;
  }
  const continent = continentData[continentId] || {};
  const availableIds = Array.isArray(continent.availableCountries) ? continent.availableCountries : [];
  const focusNames = buildFocusNameSet(continentId, availableIds);
  // Get ALL countries that belong to this continent, not just available ones
  const renderFeatures = worldFeatures.filter(feature => getContinentForFeature(feature) === continentId);
  // If no continent countries found, fall back to world features
  if (!renderFeatures.length) {
    const focusFeatures = worldFeatures.filter(feature => focusNames.has(getFeatureName(feature)));
    renderFeatures.push(...(focusFeatures.length ? focusFeatures : worldFeatures));
  }
  const bounds = continentBounds[continentId] || [[-180, -90], [180, 90]];
  const fitTarget = renderFeatures.length
    ? { type: 'FeatureCollection', features: renderFeatures }
    : boundsToFeature(bounds);
  const { width, height } = getSvgSize(svg);
  const padding = width < 560 ? 14 : 24;
  svg.attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMidYMid meet');
  const projection = d3.geoMercator().fitExtent([[padding, padding], [width - padding, height - padding]], fitTarget);
  const path = d3.geoPath(projection);
  const interactiveNames = new Set(renderFeatures.map(feature => getFeatureName(feature)).filter(name => focusNames.has(name)));
  let layer = svg.select('g.map-layer');
  if (layer.empty()) {
    layer = svg.append('g').attr('class', 'map-layer');
  }
  layer.selectAll('path.land')
    .data(renderFeatures, feature => getFeatureName(feature))
    .join('path')
    .attr('class', feature => (focusNames.has(getFeatureName(feature)) ? 'land active' : 'land inactive'))
    .attr('d', path)
    .style('pointer-events', feature => (interactiveNames.has(getFeatureName(feature)) ? 'auto' : 'none'))
    .style('cursor', feature => (interactiveNames.has(getFeatureName(feature)) ? 'pointer' : 'default'))
    .on('click', (event, feature) => {
      const featureName = getFeatureName(feature);
      const countryId = geoNameToCountryId[featureName];
      if (countryId && interactiveNames.has(featureName) && typeof onCountrySelect === 'function') {
        onCountrySelect(countryId);
      }
    })
    .on('mouseenter', (event, feature) => {
      const featureName = getFeatureName(feature);
      const countryId = geoNameToCountryId[featureName];
      if (countryId && interactiveNames.has(featureName)) {
        layer.selectAll('path.land')
          .classed('group-hover', f => geoNameToCountryId[getFeatureName(f)] === countryId);
      }
    })
    .on('mouseleave', () => {
      layer.selectAll('path.land').classed('group-hover', false);
    });
  applyMobilePan(svg, layer, width, height);
}

export function renderCountryMap(countryId) {
  if (typeof d3 === 'undefined') {
    return;
  }
  const svg = d3.select('#countryMapSvg');
  if (svg.empty()) {
    return;
  }
  if (!worldReady || !countryId) {
    svg.selectAll('*').remove();
    return;
  }
  const country = countryData[countryId];
  if (!country) {
    svg.selectAll('*').remove();
    return;
  }

  let features = [];
  if (Array.isArray(country.geoNames)) {
    // Multi-country case (e.g. UE)
    features = worldFeatures.filter(item => country.geoNames.includes(getFeatureName(item)));
  } else {
    // Single country case
    const feature = worldFeatures.find(item => getFeatureName(item) === country.geoName);
    if (feature) features.push(feature);
  }

  if (!features.length) {
    svg.selectAll('*').remove();
    return;
  }

  const { width, height } = getSvgSize(svg);
  svg.attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMidYMid meet');

  const projection = d3.geoMercator().fitExtent([[20, 20], [width - 20, height - 20]], { type: 'FeatureCollection', features: features });
  const path = d3.geoPath(projection);

  svg.selectAll('path.land')
    .data(features)
    .join('path')
    .attr('class', 'land active')
    .attr('d', path);
}

export function handleMapResize(continentId, countryId, onContinentSelect, onCountrySelect) {
  if (!worldReady) {
    return;
  }
  drawWorldMap(onContinentSelect);
  renderContinentMap(continentId, onCountrySelect);
  renderCountryMap(countryId);
}

function handleWorldHover(feature, entering) {
  const continentId = getContinentForFeature(feature);
  highlightWorldContinent(continentId, entering);
}

function applyMobilePan(svg, layer, width, height, enableInitialZoom = false) {
  if (typeof d3 === 'undefined' || typeof d3.zoom === 'undefined') {
    return;
  }
  const enablePan = window.matchMedia ? window.matchMedia('(max-width: 1100px)').matches : false;
  svg.classed('draggable', !!enablePan);
  if (!enablePan) {
    svg.on('.zoom', null);
    layer.attr('transform', null);
    return;
  }
  const zoom = d3.zoom()
    .scaleExtent([1, 4])
    .translateExtent([[0, 0], [width, height]])
    .on('zoom', event => {
      layer.attr('transform', event.transform);
    });
  svg.on('.zoom', null);
  svg.call(zoom);

  // Initial Auto-Zoom for mobile
  if (enableInitialZoom && width < 640) {
    // Zoom 2.5x by default to fill the screen better
    const initialTransform = d3.zoomIdentity
      .translate(width / 2, height / 2)
      .scale(2.5)
      .translate(-width / 2, -height / 2);
    svg.call(zoom.transform, initialTransform);
  } else {
    svg.call(zoom.transform, d3.zoomIdentity);
  }
}

function highlightWorldContinent(continentId, entering) {
  if (!continentId) {
    return;
  }
  const svg = d3.select('#worldMap');
  svg.selectAll(`path.land[data-continent="${continentId}"]`)
    .classed('continent-focus', !!entering);
}

function getGeoNamesForContinent(continentId) {
  return Object.values(countryData)
    .filter(country => country.continentId === continentId)
    .map(country => country.geoName);
}

function buildFocusNameSet(continentId, availableIds = []) {
  if (Array.isArray(availableIds) && availableIds.length) {
    const names = new Set();
    availableIds.forEach(id => {
      const c = countryData[id];
      if (c) {
        if (Array.isArray(c.geoNames)) {
          c.geoNames.forEach(name => names.add(name));
        } else if (c.geoName) {
          names.add(c.geoName);
        }
      }
    });
    return names;
  }
  // If no available countries specified, return empty set (all countries will be inactive)
  return new Set();
}

function getSvgSize(selection) {
  if (!selection || selection.empty()) {
    return { width: 600, height: 360 };
  }
  const node = selection.node();
  const width = node.clientWidth || (node.parentNode ? node.parentNode.clientWidth : 600) || 600;
  const height = node.clientHeight || (node.parentNode ? node.parentNode.clientHeight : 360) || 360;
  return { width, height };
}

function getContinentForFeature(feature) {
  if (!feature) {
    return null;
  }
  const normalized = normalizeCountryName(getFeatureName(feature));
  if (normalized && countryContinentLookup[normalized]) {
    return countryContinentLookup[normalized];
  }
  const inferred = inferContinentFromFeature(feature);
  if (inferred && normalized) {
    countryContinentLookup[normalized] = inferred;
  }
  return inferred;
}

function getFeatureName(feature) {
  if (!feature) {
    return '';
  }
  if (feature.properties) {
    return feature.properties.name || feature.properties.NAME || feature.properties.admin || '';
  }
  return feature.id || '';
}

function boundsToFeature(bounds) {
  const [[minLon, minLat], [maxLon, maxLat]] = bounds;
  return {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [minLon, minLat],
        [maxLon, minLat],
        [maxLon, maxLat],
        [minLon, maxLat],
        [minLon, minLat]
      ]]
    }
  };
}

function buildCountryContinentLookup(list = [], features = []) {
  const lookup = {};
  list.forEach(item => {
    const continentId = continentIdByLabel[item.continent];
    if (!continentId) {
      return;
    }
    const normalized = normalizeCountryName(item.country);
    if (normalized) {
      lookup[normalized] = continentId;
    }
  });
  Object.entries(countryNameAliases).forEach(([alias, canonical]) => {
    if (!lookup[alias] && lookup[canonical]) {
      lookup[alias] = lookup[canonical];
    }
  });
  Object.entries(manualCountryContinents).forEach(([name, continentId]) => {
    lookup[name] = continentId;
  });
  if (Array.isArray(features)) {
    features.forEach(feature => {
      const normalized = normalizeCountryName(getFeatureName(feature));
      if (!normalized || lookup[normalized]) {
        return;
      }
      const fallbackId = inferContinentFromFeature(feature);
      if (fallbackId) {
        lookup[normalized] = fallbackId;
      }
    });
  }
  return lookup;
}

function inferContinentFromFeature(feature) {
  const centroid = getFeatureCentroid(feature);
  if (!centroid) {
    return null;
  }
  const [lon, lat] = centroid;
  for (const region of fallbackRegions) {
    if (pointInBounds(lon, lat, region.bounds)) {
      return region.id;
    }
  }
  return null;
}

function getFeatureCentroid(feature) {
  if (typeof d3 === 'undefined' || !feature) {
    return null;
  }
  try {
    const centroid = d3.geoCentroid(feature);
    if (
      !centroid ||
      centroid.length !== 2 ||
      !Number.isFinite(centroid[0]) ||
      !Number.isFinite(centroid[1])
    ) {
      return null;
    }
    return centroid;
  } catch (error) {
    return null;
  }
}

function pointInBounds(lon, lat, bounds) {
  if (!Array.isArray(bounds) || bounds.length !== 2) {
    return false;
  }
  const [[minLon, minLat], [maxLon, maxLat]] = bounds;
  if (lat < minLat || lat > maxLat) {
    return false;
  }
  if (minLon <= maxLon) {
    return lon >= minLon && lon <= maxLon;
  }
  return lon >= minLon || lon <= maxLon;
}

function normalizeCountryName(value) {
  return (value || '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z]/g, '');
}
