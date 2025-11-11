import {
  countryData,
  continentBounds,
  continentColorMap,
  continentHoverColorMap,
  continentIdByLabel,
  manualCountryContinents,
  geoNameToCountryId
} from './data.js';

let worldFeatures = [];
let worldReady = false;
let countryContinentLookup = {};

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
      countryContinentLookup = buildCountryContinentLookup(Array.isArray(continentList) ? continentList : []);
      worldReady = true;
      drawWorldMap();
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
  const paths = svg.selectAll('path.land')
    .data(worldFeatures)
    .join('path')
    .attr('class', 'land')
    .attr('d', path)
    .attr('data-continent', feature => getContinentForFeature(feature) || '')
    .attr('fill', feature => {
      const continentId = getContinentForFeature(feature);
      return continentId ? continentColorMap[continentId] : 'rgba(255,255,255,0.12)';
    })
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
  const focusNames = new Set(getGeoNamesForContinent(continentId));
  const bounds = continentBounds[continentId] || [[-180, -90], [180, 90]];
  const fitFeature = boundsToFeature(bounds);
  const { width, height } = getSvgSize(svg);
  svg.attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMidYMid meet');
  const projection = d3.geoMercator().fitExtent([[20, 20], [width - 20, height - 20]], fitFeature);
  const path = d3.geoPath(projection);
  svg.selectAll('path.land')
    .data(worldFeatures)
    .join('path')
    .attr('class', d => {
      const name = getFeatureName(d);
      return focusNames.size ? (focusNames.has(name) ? 'land active' : 'land inactive') : 'land inactive';
    })
    .attr('d', path)
    .style('pointer-events', d => (focusNames.has(getFeatureName(d)) ? 'auto' : 'none'))
    .style('cursor', d => (focusNames.has(getFeatureName(d)) ? 'pointer' : 'default'))
    .on('click', (event, feature) => {
      const featureName = getFeatureName(feature);
      const countryId = geoNameToCountryId[featureName];
      if (countryId && focusNames.has(featureName) && typeof onCountrySelect === 'function') {
        onCountrySelect(countryId);
      }
    });
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
  const feature = worldFeatures.find(item => getFeatureName(item) === country.geoName);
  if (!feature) {
    svg.selectAll('*').remove();
    return;
  }
  const { width, height } = getSvgSize(svg);
  svg.attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMidYMid meet');
  const projection = d3.geoMercator().fitExtent([[20, 20], [width - 20, height - 20]], { type: 'FeatureCollection', features: [feature] });
  const path = d3.geoPath(projection);
  svg.selectAll('path.land')
    .data([feature])
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

function highlightWorldContinent(continentId, entering) {
  if (!continentId) {
    return;
  }
  const svg = d3.select('#worldMap');
  const fillColor = entering
    ? (continentHoverColorMap[continentId] || continentColorMap[continentId] || 'rgba(255,255,255,0.3)')
    : (continentColorMap[continentId] || 'rgba(255,255,255,0.2)');
  svg.selectAll(`path.land[data-continent="${continentId}"]`)
    .classed('continent-focus', !!entering)
    .attr('fill', fillColor);
}

function getGeoNamesForContinent(continentId) {
  return Object.values(countryData)
    .filter(country => country.continentId === continentId)
    .map(country => country.geoName);
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
  return countryContinentLookup[normalized] || null;
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

function buildCountryContinentLookup(list) {
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
  Object.entries(manualCountryContinents).forEach(([name, continentId]) => {
    lookup[name] = continentId;
  });
  return lookup;
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
