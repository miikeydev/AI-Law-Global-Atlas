import {
  countryData,
  continentBounds,
  continentIdByLabel,
  continentData,
  manualCountryContinents,
  geoNameToCountryId,
  countryNameAliases,
  worldCriteriaDefinitions,
  worldCriterionScoresByCountryId,
  worldCriterionScoresByGeoName
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
const unratedWorldCriterionColor = '#DADDE6';
const worldCriterionIds = Object.keys(worldCriteriaDefinitions);
let activeWorldCriterion = null;
let worldMobileFocusedContinentId = null;
const worldCriterionScoreLookupById = buildWorldCriterionScoreLookups();

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
      const allWorldFeatures = topojson.feature(worldData, worldData.objects.countries).features;
      worldFeatures = allWorldFeatures.filter(feature => !isAntarcticaFeature(feature));
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
  const isMobileWorld = isWorldMobileMode();
  if (!isMobileWorld) {
    worldMobileFocusedContinentId = null;
  }
  svg.attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMidYMid meet');
  const fitFeatures = getWorldFeaturesForMobileFit();
  const fitTarget = fitFeatures.length
    ? { type: 'FeatureCollection', features: fitFeatures }
    : { type: 'Sphere' };
  const projection = d3.geoNaturalEarth1().fitExtent([[26, 26], [width - 26, height - 26]], fitTarget);
  const path = d3.geoPath(projection);

  let layer = svg.select('g.map-layer');
  if (layer.empty()) {
    layer = svg.append('g').attr('class', 'map-layer');
  }
  const hasCriterion = isWorldCriterionActive();

  const paths = layer.selectAll('path.land')
    .data(worldFeatures)
    .join('path')
    .attr('class', 'land')
    .attr('d', path)
    .attr('data-continent', feature => getContinentForFeature(feature) || '')
    .attr('data-world-criterion', hasCriterion ? activeWorldCriterion : null)
    .attr('data-regulation-level', feature => (hasCriterion ? getWorldCriterionBucket(feature).id : null))
    .style('fill', feature => (hasCriterion ? getWorldCriterionBucket(feature).color : null))
    .style('cursor', feature => (getContinentForFeature(feature) ? 'pointer' : 'default'));
  paths.selectAll('title').remove();
  paths.append('title').text(feature => (hasCriterion ? getWorldFeatureTooltip(feature) : getFeatureName(feature)));

  if (isMobileWorld) {
    paths
      .on('mouseenter', null)
      .on('mouseleave', null);
    applyWorldMobileFocus(svg, worldMobileFocusedContinentId);
    updateWorldMobileHint(worldMobileFocusedContinentId, true);
  } else {
    applyWorldMobileFocus(svg, null);
    paths
      .on('mouseenter', (event, feature) => handleWorldHover(feature, true))
      .on('mouseleave', (event, feature) => handleWorldHover(feature, false));
    updateWorldMobileHint(null, false);
  }

  paths.on('click', (event, feature) => {
    const continentId = getContinentForFeature(feature);
    if (!continentId || typeof onContinentSelect !== 'function') {
      if (isMobileWorld) {
        worldMobileFocusedContinentId = null;
        applyWorldMobileFocus(svg, null);
        updateWorldMobileHint(null, true);
      }
      return;
    }
    if (!isMobileWorld) {
      onContinentSelect(continentId);
      return;
    }
    if (worldMobileFocusedContinentId === continentId) {
      worldMobileFocusedContinentId = null;
      applyWorldMobileFocus(svg, null);
      updateWorldMobileHint(null, true);
      onContinentSelect(continentId);
      return;
    }
    worldMobileFocusedContinentId = continentId;
    applyWorldMobileFocus(svg, continentId);
    updateWorldMobileHint(continentId, true);
  });

  applyMobilePan(svg, layer, width, height, true);
}

export function setWorldCriterion(criterionId) {
  if (criterionId === null) {
    activeWorldCriterion = null;
  } else if (worldCriteriaDefinitions[criterionId]) {
    activeWorldCriterion = criterionId;
  }
  return activeWorldCriterion;
}

export function getWorldCriterion() {
  return activeWorldCriterion;
}

export function hasWorldCriterion() {
  return isWorldCriterionActive();
}

export function getNextWorldCriterion(criterionId = activeWorldCriterion) {
  const currentIndex = worldCriterionIds.indexOf(criterionId);
  if (currentIndex < 0) {
    return worldCriterionIds[0];
  }
  return worldCriterionIds[(currentIndex + 1) % worldCriterionIds.length];
}

export function getWorldCriterionDetails(criterionId = activeWorldCriterion, lang = getDocumentLang()) {
  const criterion = worldCriteriaDefinitions[criterionId] || worldCriteriaDefinitions.c1;
  const safeLang = lang === 'en' ? 'en' : 'fr';
  return {
    id: criterion.id,
    shortLabel: criterion.shortLabel[safeLang],
    title: criterion.title[safeLang],
    lead: criterion.lead[safeLang],
    listTitle: criterion.listTitle[safeLang],
    list: criterion.list[safeLang],
    legendTitle: criterion.legendTitle[safeLang],
    buckets: criterion.buckets.map(bucket => ({
      id: bucket.id,
      color: bucket.color,
      label: bucket.label[safeLang]
    })),
    unratedLabel: safeLang === 'en' ? 'Not rated' : 'Non évalué',
    unratedColor: unratedWorldCriterionColor
  };
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
  const focusNames = buildFocusNameSet(availableIds);
  // Get ALL countries that belong to this continent, not just available ones
  const renderFeatures = worldFeatures.filter(feature => getContinentForFeature(feature) === continentId);
  // If no continent countries found, fall back to world features
  if (!renderFeatures.length) {
    const focusFeatures = worldFeatures.filter(feature => focusNames.has(getFeatureName(feature)));
    renderFeatures.push(...(focusFeatures.length ? focusFeatures : worldFeatures));
  }
  const displayFeatures = prepareContinentFeatures(continentId, renderFeatures);
  const bounds = continentBounds[continentId] || [[-180, -90], [180, 90]];
  const focusFeatures = displayFeatures.filter(feature => focusNames.has(getFeatureName(feature)));
  const fitTarget = getContinentFitTarget(continentId, displayFeatures, focusFeatures, bounds);
  const { width, height } = getSvgSize(svg);
  const padding = getAdaptivePadding(width, height, { ratio: 0.03, min: width < 560 ? 6 : 10, max: 24 });
  svg.attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMidYMid meet');
  const projection = createContinentProjection(continentId)
    .fitExtent([[padding, padding], [width - padding, height - padding]], fitTarget);
  const path = d3.geoPath(projection);
  const interactiveNames = new Set(displayFeatures.map(feature => getFeatureName(feature)).filter(name => focusNames.has(name)));
  const hasCriterion = isWorldCriterionActive();
  let layer = svg.select('g.map-layer');
  if (layer.empty()) {
    layer = svg.append('g').attr('class', 'map-layer');
  }
  layer.selectAll('path.land')
    .data(displayFeatures, feature => getFeatureName(feature))
    .join('path')
    .attr('class', feature => (focusNames.has(getFeatureName(feature)) ? 'land active' : 'land inactive'))
    .attr('d', path)
    .attr('data-world-criterion', hasCriterion ? activeWorldCriterion : null)
    .attr('data-regulation-level', feature => (hasCriterion ? getWorldCriterionBucket(feature).id : null))
    .style('fill', feature => (hasCriterion ? getWorldCriterionBucket(feature).color : null))
    .style('opacity', feature => (focusNames.has(getFeatureName(feature)) ? 0.98 : 0.65))
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
  layer.selectAll('path.land').selectAll('title').remove();
  layer.selectAll('path.land').append('title').text(feature => (hasCriterion ? getWorldFeatureTooltip(feature) : getFeatureName(feature)));
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

  const padding = getAdaptivePadding(width, height, { ratio: 0.04, min: 8, max: 20 });
  const projection = d3.geoMercator().fitExtent([[padding, padding], [width - padding, height - padding]], { type: 'FeatureCollection', features: features });
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
  const svg = d3.select('#worldMap');
  if (svg.empty()) {
    return;
  }
  if (!entering || !continentId) {
    svg.selectAll('path.land').classed('continent-focus', false);
    return;
  }
  svg.selectAll('path.land')
    .classed('continent-focus', item => getContinentForFeature(item) === continentId);
}

function applyWorldMobileFocus(svg, continentId) {
  if (!svg || svg.empty()) {
    return;
  }
  svg.selectAll('path.land')
    .classed('continent-mobile-focus', item => !!continentId && getContinentForFeature(item) === continentId);
}

function updateWorldMobileHint(continentId, enabled) {
  const hint = document.getElementById('worldMobileHint');
  if (!hint) {
    return;
  }
  if (!enabled) {
    hint.textContent = '';
    hint.classList.remove('active');
    return;
  }
  if (!continentId) {
    hint.textContent = getDocumentLang() === 'en'
      ? 'Tap a continent to select it.'
      : 'Touchez un continent pour le sélectionner.';
    hint.classList.remove('active');
    return;
  }
  const lang = getDocumentLang();
  const continentName = continentData[continentId]?.names?.[lang] || continentId;
  hint.textContent = lang === 'en'
    ? `${continentName} selected. Tap again to open.`
    : `${continentName} sélectionné. Touchez encore pour ouvrir.`;
  hint.classList.add('active');
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
  const maxScale = enableInitialZoom ? 2.6 : 3;
  const zoom = d3.zoom()
    .scaleExtent([1, maxScale])
    .translateExtent([[0, 0], [width, height]])
    .on('zoom', event => {
      layer.attr('transform', event.transform);
    });
  svg.on('.zoom', null);
  svg.call(zoom);

  // Mobile "cover" mode for world map: fill space like a map app, even with crop.
  if (enableInitialZoom && width < 900) {
    const initialScale = width < 560 ? 1.54 : 1.36;
    const northShift = height * 0.02;
    const initialTransform = d3.zoomIdentity
      .translate(width / 2, (height / 2) - northShift)
      .scale(initialScale)
      .translate(-width / 2, -height / 2);
    svg.call(zoom.transform, initialTransform);
  } else {
    svg.call(zoom.transform, d3.zoomIdentity);
  }
}

function isWorldMobileMode() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(max-width: 900px)').matches;
}

function getWorldFeaturesForMobileFit() {
  if (!Array.isArray(worldFeatures) || !worldFeatures.length) {
    return [];
  }
  return worldFeatures.filter(feature => {
    const name = normalizeCountryName(getFeatureName(feature));
    return name !== 'antarctica';
  });
}

function buildFocusNameSet(availableIds = []) {
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
    return { width: 960, height: 560 };
  }
  const node = selection.node();
  const parentNode = node.parentNode || null;
  const fallbackWidth = 960;
  const width = node.clientWidth || (parentNode ? parentNode.clientWidth : fallbackWidth) || fallbackWidth;
  const fallbackHeight = Math.round(width * 0.58);
  const measuredHeight = node.clientHeight || (parentNode ? parentNode.clientHeight : fallbackHeight) || fallbackHeight;
  const height = measuredHeight > 220 ? measuredHeight : fallbackHeight;
  return { width, height };
}

function getAdaptivePadding(width, height, options = {}) {
  const safeWidth = Number.isFinite(width) ? width : 600;
  const safeHeight = Number.isFinite(height) ? height : 360;
  const minSize = Math.max(0, Math.min(safeWidth, safeHeight));
  const ratio = Number.isFinite(options.ratio) ? options.ratio : 0.03;
  const min = Number.isFinite(options.min) ? options.min : 8;
  const max = Number.isFinite(options.max) ? options.max : 24;
  const computed = Math.round(minSize * ratio);
  return Math.max(min, Math.min(max, computed));
}

function createContinentProjection(continentId) {
  if (continentId === 'asia') {
    // Shift seam away from Asia to avoid Russia wrap-around at the left edge.
    return d3.geoMercator().rotate([-100, 0]);
  }
  return d3.geoMercator();
}

function getContinentFitTarget(continentId, renderFeatures, focusFeatures, fallbackBounds) {
  if (continentId === 'oceania' && Array.isArray(focusFeatures) && focusFeatures.length) {
    return { type: 'FeatureCollection', features: focusFeatures };
  }
  if (continentId === 'asia' && Array.isArray(renderFeatures) && renderFeatures.length) {
    return { type: 'FeatureCollection', features: renderFeatures };
  }
  const compactBounds = getCompactContinentBounds(continentId);
  if (compactBounds) {
    return boundsToFeature(compactBounds);
  }
  if (Array.isArray(renderFeatures) && renderFeatures.length) {
    return { type: 'FeatureCollection', features: renderFeatures };
  }
  return boundsToFeature(fallbackBounds);
}

function getCompactContinentBounds(continentId) {
  if (continentId === 'oceania') {
    return [[112, -52], [180, 8]];
  }
  return null;
}

function prepareContinentFeatures(continentId, features = []) {
  if (!Array.isArray(features) || !features.length) {
    return [];
  }
  return features;
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

function isAntarcticaFeature(feature) {
  const normalized = normalizeCountryName(getFeatureName(feature));
  return normalized === 'antarctica' || normalized === 'antarctique';
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

function getWorldCriterionBucket(feature, criterionId = activeWorldCriterion) {
  const criterion = worldCriteriaDefinitions[criterionId] || worldCriteriaDefinitions.c1;
  const score = getWorldCriterionScore(feature, criterionId);
  if (!Number.isFinite(score)) {
    return {
      id: 'unrated',
      color: unratedWorldCriterionColor,
      score: null,
      label: {
        fr: 'Non évalué',
        en: 'Not rated'
      }
    };
  }
  const bucket = criterion.buckets.find(item => score >= item.min) || criterion.buckets[criterion.buckets.length - 1];
  return { ...bucket, score };
}

function getWorldCriterionScore(feature, criterionId = activeWorldCriterion) {
  const scoreLookup = worldCriterionScoreLookupById[criterionId] || {};
  const name = getFeatureName(feature);
  const normalized = normalizeCountryName(name);
  if (normalized && Number.isFinite(scoreLookup[normalized])) {
    return scoreLookup[normalized];
  }
  return null;
}

function getWorldFeatureTooltip(feature) {
  const name = getFeatureName(feature);
  const bucket = getWorldCriterionBucket(feature);
  const criterion = worldCriteriaDefinitions[activeWorldCriterion] || worldCriteriaDefinitions.c1;
  const lang = getDocumentLang();
  const label = bucket.label[lang] || bucket.label.fr;
  if (!Number.isFinite(bucket.score)) {
    return `${name}\n${criterion.shortLabel[lang]} — ${label}`;
  }
  return `${name}\n${criterion.shortLabel[lang]}: ${bucket.score}/100 — ${label}`;
}

function getDocumentLang() {
  return document?.documentElement?.lang === 'en' ? 'en' : 'fr';
}

function isWorldCriterionActive() {
  return !!(activeWorldCriterion && worldCriteriaDefinitions[activeWorldCriterion]);
}

function buildWorldCriterionScoreLookups() {
  const lookups = {};
  Object.keys(worldCriteriaDefinitions).forEach(criterionId => {
    lookups[criterionId] = buildScoreLookupForCriterion(criterionId);
  });
  return lookups;
}

function buildScoreLookupForCriterion(criterionId) {
  const lookup = {};
  const countryScores = worldCriterionScoresByCountryId[criterionId] || {};
  const geoNameScores = worldCriterionScoresByGeoName[criterionId] || {};

  // First pass: multi-country entities (e.g. UE).
  Object.entries(countryScores).forEach(([countryId, score]) => {
    if (!Number.isFinite(score)) {
      return;
    }
    const country = countryData[countryId];
    if (!country || !Array.isArray(country.geoNames)) {
      return;
    }
    country.geoNames.forEach(name => {
      const normalized = normalizeCountryName(name);
      if (normalized) {
        lookup[normalized] = score;
      }
    });
  });

  // Second pass: country-specific entries override regional aggregates.
  Object.entries(countryScores).forEach(([countryId, score]) => {
    if (!Number.isFinite(score)) {
      return;
    }
    const country = countryData[countryId];
    if (!country || !country.geoName) {
      return;
    }
    const normalized = normalizeCountryName(country.geoName);
    if (normalized) {
      lookup[normalized] = score;
    }
  });

  Object.entries(geoNameScores).forEach(([name, score]) => {
    if (!Number.isFinite(score)) {
      return;
    }
    const normalized = normalizeCountryName(name);
    if (normalized) {
      lookup[normalized] = score;
    }
  });

  return lookup;
}
