import { translations } from './data.js';
import {
  setWorldCriterion,
  getWorldCriterion,
  hasWorldCriterion,
  getWorldCriterionDetails
} from './maps.js';

const FALLBACK_COPY = {
  legendOverviewTitle: 'Légendes disponibles'
};

export function initCriterionPanel({ lang, redraw }) {
  let currentLang = lang === 'en' ? 'en' : 'fr';
  const panel = document.getElementById('worldCriterionPanel');
  const leadContainer = document.getElementById('worldCriterionLead');
  const listContainer = document.getElementById('worldCriterionList');
  const legendGrid = document.getElementById('worldLegendGrid');
  const title = document.getElementById('worldCriterionTitle');
  const listTitle = document.getElementById('worldCriterionListTitle');
  const legendTitle = document.getElementById('worldLegendTitle');
  const overviewTitle = document.getElementById('worldLegendOverviewTitle');
  const legendPills = Array.from(document.querySelectorAll('[data-world-criterion-target]'));

  const hasPanel = !!(panel && leadContainer && listContainer && legendGrid);
  if (!hasPanel) {
    return {
      render: () => {},
      update: () => {},
      setLang: () => {}
    };
  }

  legendPills.forEach(button => {
    button.addEventListener('click', () => {
      const criterionId = button.dataset.worldCriterionTarget;
      if (!criterionId) {
        return;
      }
      setWorldCriterion(criterionId);
      panel.hidden = false;
      if (typeof redraw === 'function') {
        redraw();
      }
      render();
    });
  });

  updateControlButtons();

  return { render, update: updateControlButtons, setLang };

  function setLang(langCode) {
    currentLang = langCode === 'en' ? 'en' : 'fr';
    updateControlButtons();
  }

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

    const criterion = getWorldCriterionDetails(getWorldCriterion(), currentLang);
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
    legendGrid.appendChild(buildLegendItem(criterion.unratedColor, criterion.unratedLabel, 'legend-item--unrated'));

    updateControlButtons();
  }

  function updateControlButtons() {
    const copy = translations[currentLang]?.world || FALLBACK_COPY;
    const currentCriterion = getWorldCriterion();
    const isActive = hasWorldCriterion();
    panel.hidden = !isActive;

    if (overviewTitle) {
      overviewTitle.textContent = copy.legendOverviewTitle || FALLBACK_COPY.legendOverviewTitle;
    }

    legendPills.forEach(button => {
      const criterionId = button.dataset.worldCriterionTarget;
      if (!criterionId) {
        return;
      }
      const criterionDetails = getWorldCriterionDetails(criterionId, currentLang);
      button.textContent = criterionDetails.title;
      const isSelected = criterionId === currentCriterion;
      button.dataset.active = isSelected ? 'true' : 'false';
      button.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });
  }
}

function buildLegendItem(color, labelText, extraClass = '') {
  const item = document.createElement('span');
  item.className = extraClass ? `legend-item ${extraClass}` : 'legend-item';

  const swatch = document.createElement('i');
  swatch.className = 'legend-swatch';
  swatch.style.background = color;

  const label = document.createElement('b');
  label.textContent = labelText;

  item.appendChild(swatch);
  item.appendChild(label);
  return item;
}
