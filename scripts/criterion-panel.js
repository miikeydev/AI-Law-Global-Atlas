import { translations } from './data.js';
import {
  setWorldCriterion,
  getWorldCriterion,
  hasWorldCriterion,
  getNextWorldCriterion,
  getWorldCriterionDetails
} from './maps.js';

const FALLBACK_COPY = {
  detailsShow: 'Voir le critère actif',
  detailsHide: 'Masquer le critère actif',
  switchToC1: 'Activer la légende C1',
  switchToC2: 'Activer la légende C2'
};

export function initCriterionPanel({ lang, redraw }) {
  const panel = document.getElementById('worldCriterionPanel');
  const detailsToggle = document.getElementById('criterionDetailsToggle');
  const legendSwitch = document.getElementById('legendSwitchBtn');
  const leadContainer = document.getElementById('worldCriterionLead');
  const listContainer = document.getElementById('worldCriterionList');
  const legendGrid = document.getElementById('worldLegendGrid');
  const title = document.getElementById('worldCriterionTitle');
  const listTitle = document.getElementById('worldCriterionListTitle');
  const legendTitle = document.getElementById('worldLegendTitle');

  const hasPanel = !!(panel && detailsToggle && legendSwitch && leadContainer && listContainer && legendGrid);
  if (!hasPanel) {
    return {
      render: () => {},
      update: () => {}
    };
  }

  detailsToggle.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    updateControlButtons();
  });

  legendSwitch.addEventListener('click', () => {
    const nextCriterion = getNextWorldCriterion();
    setWorldCriterion(nextCriterion);
    if (typeof redraw === 'function') {
      redraw();
    }
    render();
  });

  updateControlButtons();

  return { render, update: updateControlButtons };

  function render() {
    if (!hasWorldCriterion()) {
      panel.hidden = true;
      leadContainer.innerHTML = '';
      listContainer.innerHTML = '';
      legendGrid.innerHTML = '';
      if (title) {
        title.textContent = '';
      }
      if (listTitle) {
        listTitle.textContent = '';
      }
      if (legendTitle) {
        legendTitle.textContent = '';
      }
      updateControlButtons();
      return;
    }

    const criterion = getWorldCriterionDetails(getWorldCriterion(), lang);
    if (title) {
      title.textContent = criterion.title;
    }
    if (listTitle) {
      listTitle.textContent = criterion.listTitle;
    }
    if (legendTitle) {
      legendTitle.textContent = criterion.legendTitle;
    }

    leadContainer.innerHTML = '';
    criterion.lead.forEach(text => {
      const p = document.createElement('p');
      p.textContent = text;
      leadContainer.appendChild(p);
    });

    listContainer.innerHTML = '';
    criterion.list.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      listContainer.appendChild(li);
    });

    legendGrid.innerHTML = '';
    criterion.buckets.forEach(bucket => {
      legendGrid.appendChild(buildLegendItem(bucket.color, bucket.label));
    });
    legendGrid.appendChild(buildLegendItem(criterion.unratedColor, criterion.unratedLabel));

    updateControlButtons();
  }

  function updateControlButtons() {
    const copy = translations[lang]?.world || FALLBACK_COPY;
    const currentCriterion = getWorldCriterion();
    const nextCriterion = getNextWorldCriterion(currentCriterion);
    const isActive = hasWorldCriterion();
    const isExpanded = isActive && !panel.hidden;

    detailsToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    detailsToggle.dataset.state = isExpanded ? 'open' : 'closed';
    detailsToggle.disabled = !isActive;
    detailsToggle.textContent = isExpanded
      ? (copy.detailsHide || FALLBACK_COPY.detailsHide)
      : (copy.detailsShow || FALLBACK_COPY.detailsShow);

    legendSwitch.dataset.nextCriterion = nextCriterion;
    legendSwitch.textContent = nextCriterion === 'c2'
      ? (copy.switchToC2 || FALLBACK_COPY.switchToC2)
      : (copy.switchToC1 || FALLBACK_COPY.switchToC1);
  }
}

function buildLegendItem(color, labelText) {
  const item = document.createElement('span');
  item.className = 'legend-item';

  const swatch = document.createElement('i');
  swatch.className = 'legend-swatch';
  swatch.style.background = color;

  const label = document.createElement('b');
  label.textContent = labelText;

  item.appendChild(swatch);
  item.appendChild(label);
  return item;
}
