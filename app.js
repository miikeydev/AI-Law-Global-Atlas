const translations = {
fr: {
world: {
title: 'Un monde, mille régulations',
description: 'Un clic, et vous accédez aux actualités, textes de droit et initiatives législatives qui façonnent l\'encadrement de l\'IA partout sur la planète.'
},
continent: {
subtitle: 'Cliquez sur un pays de la carte pour en savoir plus.',
available: 'Sont déjà disponibles :',
progress: 'Il nous reste du <span class="accent-word">travail</span>.',
info: 'Voir les actualités du continent'
},
country: {
subtitle: 'Sélectionnez le sujet qui vous intéresse :',
newsToggle: 'Actualité juridique',
newsToggleClose: 'Fermer les actualités',
newsTitle: 'Dernières actualités juridiques'
},
modal: {
world: {
title: 'Une cartographie en construction',
body: 'Pays après pays, cette plateforme rassemble textes, annonces gouvernementales et initiatives privées pour suivre l\'encadrement mondial de l\'intelligence artificielle et de la propriété intellectuelle.'
},
continent: 'Cette zone s\'enrichit progressivement grâce à notre réseau d\'experts et d\'universités partenaires.'
},
common: {
info: '+ info',
comingSoon: 'Bientôt disponible'
}
},
en: {
world: {
title: 'One world, a thousand regulations',
description: 'With one click, access news, legal texts and legislative initiatives shaping AI regulation around the globe.'
},
continent: {
subtitle: 'Click on a country on the map to learn more.',
available: 'Available so far:',
progress: 'There is still <span class="accent-word">work</span> to do.',
info: 'See continent updates'
},
country: {
subtitle: 'Select the topic you are interested in:',
newsToggle: 'Legal news',
newsToggleClose: 'Hide legal news',
newsTitle: 'Latest legal updates'
},
modal: {
world: {
title: 'A map in constant evolution',
body: 'Country by country, this explorer curates statutes, policy papers and trusted reporting to follow the fast-moving field of AI and intellectual property law.'
},
continent: 'This region grows week after week thanks to our network of experts and academic fellows.'
},
common: {
info: '+ info',
comingSoon: 'Coming soon'
}
}
};

const continentData = {
americas: {
id: 'americas',
names: { fr: 'Amérique', en: 'Americas' },
progress: 46.3,
availableCountries: ['usa', 'canada', 'brazil', 'chile'],
markers: [
{ countryId: 'canada', x: 32, y: 32 },
{ countryId: 'usa', x: 38, y: 42 },
{ countryId: 'brazil', x: 52, y: 68 },
{ countryId: 'chile', x: 56, y: 82 }
],
info: {
fr: 'Les Amériques combinent initiatives fédérales et régionales pour encadrer l\'IA, du Canada au Chili.',
en: 'Across the Americas, federal and regional initiatives are shaping AI governance from Canada to Chile.'
}
},
europe: {
id: 'europe',
names: { fr: 'Europe', en: 'Europe' },
progress: 58.9,
availableCountries: ['france'],
markers: [
{ countryId: 'france', x: 48, y: 58 }
],
info: {
fr: 'L\'Europe articule règlements européens et adaptations nationales pour encadrer l\'IA.',
en: 'Europe combines EU-wide regulations with national adaptations to govern AI.'
}
},
africa: {
id: 'africa',
names: { fr: 'Afrique', en: 'Africa' },
progress: 3.7,
availableCountries: ['southAfrica'],
markers: [
{ countryId: 'southAfrica', x: 58, y: 78 }
],
info: {
fr: 'En Afrique, les feuilles de route nationales de l\'IA se multiplient pour accompagner les plans numériques.',
en: 'Across Africa, national AI roadmaps are emerging to support broader digital strategies.'
}
},
asia: {
id: 'asia',
names: { fr: 'Asie', en: 'Asia' },
progress: 8.2,
availableCountries: [],
markers: [],
info: {
fr: 'L\'Asie combine stratégies nationales ambitieuses, zones franches numériques et coalitions régionales.',
en: 'Asia mixes ambitious national strategies, digital free zones and regional coalitions.'
}
},
oceania: {
id: 'oceania',
names: { fr: 'Océanie', en: 'Oceania' },
progress: 12.4,
availableCountries: [],
markers: [],
info: {
fr: 'En Océanie, la réglementation IA accompagne les politiques de confiance numérique et de données.',
en: 'In Oceania, AI regulation aligns with digital trust and data policies.'
}
}
};

const countryData = {
usa: {
id: 'usa',
continentId: 'americas',
name: { fr: 'États-Unis d\'Amérique', en: 'United States of America' },
geoName: 'United States of America',
overview: {
fr: 'Les États-Unis combinent lignes directrices fédérales et plans sectoriels pour encadrer l\'IA responsable.',
en: 'The United States blends federal guidance with sector-specific plans to govern responsible AI.'
},
news: [
{ title: { fr: 'La Copyright Office précise la déclaration des contenus générés.', en: 'US Copyright Office clarifies disclosure of AI-generated content.' }, source: 'US Copyright Office', date: 'Mai 2024', link: '#' },
{ title: { fr: 'Le NIST publie une nouvelle feuille de route IA & sécurité.', en: 'NIST releases a joint AI and safety roadmap.' }, source: 'NIST', date: 'Mars 2024', link: '#' },
{ title: { fr: 'Projet de loi AI Research Resource Act relancé au Sénat.', en: 'AI Research Resource Act reintroduced in the Senate.' }, source: 'U.S. Senate', date: 'Février 2024', link: '#' }
],
sections: [
{
title: { fr: 'Cadre juridique en vigueur', en: 'Existing legal framework' },
items: [
{ badge: 'A', title: { fr: 'Œuvres et inventions générées par IA', en: 'AI-generated works and inventions' }, content: { fr: 'Le Copyright Office impose une divulgation exacte des portions générées tandis que l\'USPTO exige une supervision humaine pour les brevets.', en: 'The Copyright Office requires clear disclosure of generated portions while the USPTO stresses human oversight for inventive claims.' } },
{ badge: 'B', title: { fr: 'Bases de données et algorithmes', en: 'Databases and algorithms' }, content: { fr: 'Le AI Risk Management Framework du NIST structure l\'audit des jeux de données, complété par les directives de la FTC sur l\'usage loyal des données.', en: 'The NIST AI Risk Management Framework structures dataset audits, reinforced by FTC guidance on fair data practices.' } }
]
},
{
title: { fr: 'Réformes et perspectives législatives', en: 'Reforms and legislative outlook' },
items: [
{ badge: 'A', title: { fr: 'Créations issues de l\'IA', en: 'AI-driven creations' }, content: { fr: 'Plusieurs propositions de loi explorent un registre national des ensembles de données utilisés pour former des modèles génératifs.', en: 'Draft bills explore a national registry for datasets used to train generative models.' } },
{ badge: 'B', title: { fr: 'Données et algorithmes', en: 'Data and algorithms' }, content: { fr: 'La White House AI Bill of Rights inspire de nouvelles obligations de transparence pour les systèmes critiques.', en: 'The White House AI Bill of Rights informs new transparency duties for critical systems.' } }
]
}
]
},
canada: {
id: 'canada',
continentId: 'americas',
name: { fr: 'Canada', en: 'Canada' },
geoName: 'Canada',
overview: {
fr: 'Le Canada prépare la Loi sur l\'IA et les données afin d\'harmoniser innovation et confiance.',
en: 'Canada is shaping the Artificial Intelligence and Data Act to balance innovation and trust.'
},
news: [
{ title: { fr: 'Mise à jour du projet de loi C-27 avec obligations IA.', en: 'Bill C-27 updated with new AI duties.' }, source: 'Parlement du Canada', date: 'Avril 2024', link: '#' },
{ title: { fr: 'Publication des directives de transparence d\'Ottawa.', en: 'Ottawa shares transparency guidance for automated systems.' }, source: 'Gouvernement du Canada', date: 'Janvier 2024', link: '#' },
{ title: { fr: 'Investissements pour un réseau national d\'évaluation IA.', en: 'New funding for a national AI evaluation network.' }, source: 'ISED', date: 'Décembre 2023', link: '#' }
],
sections: [
{
title: { fr: 'Cadre juridique en vigueur', en: 'Existing legal framework' },
items: [
{ badge: 'A', title: { fr: 'Créations protégées', en: 'Protected creations' }, content: { fr: 'Le droit d\'auteur canadien reconnaît l\'intervention humaine substantielle comme critère clé et s\'appuie sur des lignes directrices sectorielles.', en: 'Canadian copyright law keeps substantial human involvement as a key criterion and leans on sector guidance.' } },
{ badge: 'B', title: { fr: 'Traitement des données', en: 'Data handling' }, content: { fr: 'La LPRPDE reste la référence avec des exigences renforcées de consentement explicite pour l\'apprentissage automatique.', en: 'PIPEDA remains the backbone, reinforcing explicit consent standards for machine learning.' } }
]
},
{
title: { fr: 'Réformes et perspectives législatives', en: 'Reforms and legislative outlook' },
items: [
{ badge: 'A', title: { fr: 'AIDA et innovation', en: 'AIDA and innovation' }, content: { fr: 'La future Loi sur l\'IA imposerait des évaluations de risques proportionnées à la sensibilité des systèmes.', en: 'The forthcoming AIDA would require risk assessments proportional to system sensitivity.' } },
{ badge: 'B', title: { fr: 'Supervision des algorithmes', en: 'Algorithmic supervision' }, content: { fr: 'Des sandboxes réglementaires fédérales-provinciales testent l\'auditabilité des modèles.', en: 'Joint federal-provincial sandboxes are testing model auditability.' } }
]
}
]
},
brazil: {
id: 'brazil',
continentId: 'americas',
name: { fr: 'Brésil', en: 'Brazil' },
geoName: 'Brazil',
overview: {
fr: 'Le Brésil avance sur un cadre progressif qui combine innovation ouverte et devoirs de diligence.',
en: 'Brazil is advancing a graduated framework mixing open innovation with duties of care.'
},
news: [
{ title: { fr: 'Le Sénat finalise le rapport sur le PL 2338.', en: 'Senate delivers report on Bill 2338.' }, source: 'Sénat fédéral', date: 'Mai 2024', link: '#' },
{ title: { fr: 'Brasilia lance un observatoire d\'impact IA.', en: 'Brasilia launches an AI impact observatory.' }, source: 'MCTI', date: 'Mars 2024', link: '#' },
{ title: { fr: 'Consultation sur les droits fondamentaux et l\'IA.', en: 'Consultation on AI and fundamental rights.' }, source: 'Chambre des députés', date: 'Janvier 2024', link: '#' }
],
sections: [
{
title: { fr: 'Cadre juridique en vigueur', en: 'Existing legal framework' },
items: [
{ badge: 'A', title: { fr: 'Créations et brevets', en: 'Creations and patents' }, content: { fr: 'L\'INPI confirme que l\'inventeur doit rester humain mais encourage la divulgation des outils utilisés.', en: 'INPI confirms inventorship stays human yet encourages disclosure of supporting tools.' } },
{ badge: 'B', title: { fr: 'Bases de données', en: 'Databases' }, content: { fr: 'La LGPD encadre la collecte pour l\'entraînement avec des obligations fortes sur les données sensibles.', en: 'LGPD frames training data collection with strict duties on sensitive information.' } }
]
},
{
title: { fr: 'Réformes et perspectives législatives', en: 'Reforms and legislative outlook' },
items: [
{ badge: 'A', title: { fr: 'Labellisation des systèmes', en: 'System labeling' }, content: { fr: 'Le projet de loi introduit une classification par niveau de risque avec obligations graduées.', en: 'The bill introduces risk tiers with proportionate duties.' } },
{ badge: 'B', title: { fr: 'Autorité de supervision', en: 'Supervisory authority' }, content: { fr: 'Un comité interinstitutionnel serait chargé de la cohérence réglementaire et des audits.', en: 'An interinstitutional committee would secure regulatory coherence and audits.' } }
]
}
]
},
chile: {
id: 'chile',
continentId: 'americas',
name: { fr: 'Chili', en: 'Chile' },
geoName: 'Chile',
overview: {
fr: 'Le Chili positionne l\'IA comme priorité industrielle et juridique via un plan national.',
en: 'Chile treats AI as both an industrial and legal priority through its national plan.'
},
news: [
{ title: { fr: 'Décret créant le Comité d\'IA responsable.', en: 'Decree creates the Responsible AI Committee.' }, source: 'Gouvernement du Chili', date: 'Avril 2024', link: '#' },
{ title: { fr: 'Publication des principes éthiques révisés.', en: 'Updated national ethical principles released.' }, source: 'Ministère des Sciences', date: 'Février 2024', link: '#' },
{ title: { fr: 'Consultation sur la propriété intellectuelle des modèles.', en: 'Consultation on IP for AI models.' }, source: 'INAPI', date: 'Novembre 2023', link: '#' }
],
sections: [
{
title: { fr: 'Cadre juridique en vigueur', en: 'Existing legal framework' },
items: [
{ badge: 'A', title: { fr: 'Propriété intellectuelle', en: 'Intellectual property' }, content: { fr: 'Les lignes directrices d\'INAPI recommandent de documenter la contribution humaine dans les dossiers de brevets assistés par IA.', en: 'INAPI guidance urges applicants to document human input in AI-assisted filings.' } },
{ badge: 'B', title: { fr: 'Protection des données', en: 'Data protection' }, content: { fr: 'La loi 19.628 impose des obligations élevées pour le traitement automatisé, renforcées par le plan national IA.', en: 'Law 19.628 sets high duties for automated processing, reinforced by the national AI plan.' } }
]
},
{
title: { fr: 'Réformes et perspectives législatives', en: 'Reforms and legislative outlook' },
items: [
{ badge: 'A', title: { fr: 'Auditabilité', en: 'Auditability' }, content: { fr: 'Une proposition parlementaire introduit des audits périodiques pour les modèles utilisés par l\'État.', en: 'A parliamentary bill would require periodic audits for models used by the State.' } },
{ badge: 'B', title: { fr: 'Innovation ouverte', en: 'Open innovation' }, content: { fr: 'Des partenariats public-privé financent un registre partagé des données d\'entraînement.', en: 'Public-private partnerships fund a shared registry of training datasets.' } }
]
}
]
},
france: {
id: 'france',
continentId: 'europe',
name: { fr: 'France', en: 'France' },
geoName: 'France',
overview: {
fr: 'La France articule droit européen et initiatives nationales autour du numérique responsable.',
en: 'France aligns EU law with national initiatives on responsible digital technology.'
},
news: [
{ title: { fr: 'Adoption de la loi SREN et obligations IA.', en: 'SREN law enforces new AI duties.' }, source: 'Assemblée nationale', date: 'Avril 2024', link: '#' },
{ title: { fr: 'CNIL publie un guide d\'audit des modèles.', en: 'CNIL releases a model auditing guide.' }, source: 'CNIL', date: 'Mars 2024', link: '#' },
{ title: { fr: 'France 2030 finance une task-force PI & IA.', en: 'France 2030 funds an IP and AI task force.' }, source: 'France 2030', date: 'Décembre 2023', link: '#' }
],
sections: [
{
title: { fr: 'Cadre juridique en vigueur', en: 'Existing legal framework' },
items: [
{ badge: 'A', title: { fr: 'Œuvres générées', en: 'Generated works' }, content: { fr: 'Le Code de la propriété intellectuelle retient la création humaine, mais les chartes sectorielles promeuvent les mentions d\'IA.', en: 'The Intellectual Property Code still requires human creation while sector charters promote AI disclosures.' } },
{ badge: 'B', title: { fr: 'Bases de données', en: 'Databases' }, content: { fr: 'Les producteurs peuvent s\'appuyer sur le droit sui generis pour contrôler l\'extraction des données d\'entraînement.', en: 'Producers rely on the sui generis right to control extraction for training data.' } }
]
},
{
title: { fr: 'Réformes et perspectives législatives', en: 'Reforms and legislative outlook' },
items: [
{ badge: 'A', title: { fr: 'Transposition de l\'AI Act', en: 'AI Act implementation' }, content: { fr: 'Un plan interministériel prépare l\'application de l\'AI Act avec un guichet unique.', en: 'An interministerial plan prepares AI Act enforcement through a single contact point.' } },
{ badge: 'B', title: { fr: 'Soutien à la création', en: 'Creative sector support' }, content: { fr: 'Création de contrats-types pour encadrer l\'entraînement sur les catalogues audiovisuels.', en: 'Template contracts are being drafted to govern training on audiovisual catalogues.' } }
]
}
]
},
southAfrica: {
id: 'southAfrica',
continentId: 'africa',
name: { fr: 'Afrique du Sud', en: 'South Africa' },
geoName: 'South Africa',
overview: {
fr: 'L\'Afrique du Sud déploie une stratégie IA liée aux objectifs d\'industrialisation et de propriété intellectuelle.',
en: 'South Africa deploys an AI strategy tied to industrial and intellectual property goals.'
},
news: [
{ title: { fr: 'Livre blanc IA publié pour consultation.', en: 'AI white paper released for consultation.' }, source: 'DTPSA', date: 'Mai 2024', link: '#' },
{ title: { fr: 'Création d\'un hub PI et innovation responsable.', en: 'Launch of an IP and responsible innovation hub.' }, source: 'CIPC', date: 'Février 2024', link: '#' },
{ title: { fr: 'Programme de régulation expérimentale pour la santé.', en: 'Regulatory sandbox for health AI announced.' }, source: 'Department of Health', date: 'Décembre 2023', link: '#' }
],
sections: [
{
title: { fr: 'Cadre juridique en vigueur', en: 'Existing legal framework' },
items: [
{ badge: 'A', title: { fr: 'Droit d\'auteur et brevets', en: 'Copyright and patents' }, content: { fr: 'La loi sur le droit d\'auteur privilégie la création humaine mais encourage des licences collectives pour l\'usage d\'archives.', en: 'Copyright rules still require human authorship while encouraging collective licences for archive training.' } },
{ badge: 'B', title: { fr: 'Protection des données', en: 'Data protection' }, content: { fr: 'La POPIA impose des évaluations d\'impact lorsque des données sensibles alimentent des systèmes prédictifs.', en: 'POPIA mandates impact assessments when sensitive data fuels predictive systems.' } }
]
},
{
title: { fr: 'Réformes et perspectives législatives', en: 'Reforms and legislative outlook' },
items: [
{ badge: 'A', title: { fr: 'Stratégie nationale IA', en: 'National AI strategy' }, content: { fr: 'Un projet de loi-cadre est à l\'étude pour reconnaître des labels de confiance et soutenir l\'open data.', en: 'A draft framework bill would recognise trust labels while supporting open data.' } },
{ badge: 'B', title: { fr: 'Écosystème IP', en: 'IP ecosystem' }, content: { fr: 'Le CIPC teste un guichet unique pour les dépôts liés aux inventions générées par IA.', en: 'The CIPC is piloting a single window for filings covering AI-assisted inventions.' } }
]
}
]
}
};

const geoNameToCountryId = Object.values(countryData).reduce((acc, country) => {
acc[country.geoName] = country.id;
return acc;
}, {});

const continentBounds = {
americas: [[-170, -60], [-20, 80]],
europe: [[-30, 34], [60, 75]],
africa: [[-25, -40], [55, 38]],
asia: [[20, -10], [150, 80]],
oceania: [[95, -50], [180, 10]]
};

const savedTheme = (() => {
try {
return localStorage.getItem('aixip-theme');
} catch (error) {
return null;
}
})();
const initialTheme = savedTheme === 'dark' ? 'dark' : 'light';

let state = { level: 'landing', lang: 'fr', continentId: null, countryId: null, theme: initialTheme };

let worldFeatures = [];
let worldReady = false;
let globeInstance = null;
const globeTextures = {};
let countryContinentLookup = {};
let currentThemeApplied = null;

const continentColorMap = {
americas: 'rgba(131,133,255,0.4)',
europe: 'rgba(156,214,255,0.42)',
africa: 'rgba(255,111,125,0.45)',
asia: 'rgba(255,205,140,0.42)',
oceania: 'rgba(126,236,205,0.45)'
};

const continentHoverColorMap = {
americas: 'rgba(139,141,255,0.65)',
europe: 'rgba(176,233,255,0.65)',
africa: 'rgba(255,143,156,0.65)',
asia: 'rgba(255,220,172,0.65)',
oceania: 'rgba(162,251,226,0.65)'
};

const continentIdByLabel = {
'Africa': 'africa',
'Asia': 'asia',
'Europe': 'europe',
'North America': 'americas',
'South America': 'americas',
'Central America': 'americas',
'Oceania': 'oceania',
'Australia': 'oceania',
'Antarctica': null
};

const manualCountryContinents = {
'unitedstatesofamerica': 'americas',
'unitedstates': 'americas',
'usa': 'americas',
'russianfederation': 'europe',
'republicofthecongo': 'africa',
'democraticrepublicofthecongo': 'africa',
'ivorycoast': 'africa',
'cotedivoire': 'africa',
'bolivia': 'americas',
'capeverde': 'africa',
'eswatini': 'africa',
'vaticancity': 'europe',
'czechia': 'europe',
'northmacedonia': 'europe',
'southsudan': 'africa',
'myanmar': 'asia',
'burma': 'asia',
'laos': 'asia',
'bahamas': 'americas',
'timorleste': 'asia',
'taiwan': 'asia',
'hongkong': 'asia',
'macau': 'asia',
'palestine': 'asia',
'kosovo': 'europe',
'westernsahara': 'africa',
'newcaledonia': 'oceania',
'puertorico': 'americas',
'falklandislands': 'americas'
};

const views = {
landing: document.getElementById('landingView'),
world: document.getElementById('worldView'),
continent: document.getElementById('continentView'),
country: document.getElementById('countryView')
};

const header = document.getElementById('appHeader');
const infoButton = document.getElementById('infoButton');
const backButton = document.getElementById('backButton');
const themeToggle = document.getElementById('themeToggle');
const modalEl = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const newsToggle = document.getElementById('newsToggle');
const newsPanel = document.getElementById('newsPanel');

Array.from(document.querySelectorAll('.primary[data-start]')).forEach(button => {
button.addEventListener('click', () => {
const lang = button.dataset.start;
setState({ lang, level: 'world', continentId: null, countryId: null });
});
});

Array.from(document.querySelectorAll('.language-toggle button')).forEach(button => {
button.addEventListener('click', () => {
setState({ lang: button.dataset.lang });
});
});

Array.from(document.querySelectorAll('[data-modal]')).forEach(button => {
button.addEventListener('click', () => openModal(button.dataset.modal));
});

backButton.addEventListener('click', handleBack);
newsToggle.addEventListener('click', toggleNews);
if (themeToggle) {
themeToggle.addEventListener('click', () => {
const nextTheme = state.theme === 'light' ? 'dark' : 'light';
setState({ theme: nextTheme });
});
}
// Bouton theme sur la page d'accueil
const landingThemeToggle = document.getElementById('landingThemeToggle');
if (landingThemeToggle) {
landingThemeToggle.addEventListener('click', () => {
const nextTheme = state.theme === 'light' ? 'dark' : 'light';
setState({ theme: nextTheme });
});
}
modalEl.querySelector('.close-modal').addEventListener('click', closeModal);
modalEl.addEventListener('click', event => {
if (event.target === modalEl) {
closeModal();
}
});

document.addEventListener('keydown', event => {
if (event.key === 'Escape') {
closeModal();
}
});

initGlobe();
loadWorldGeometry();
window.addEventListener('resize', handleResize);
render();

function setState(partial) {
state = { ...state, ...partial };
render();
}

function goToContinent(id) {
if (!continentData[id]) {
return;
}
setState({ level: 'continent', continentId: id, countryId: null });
}

function goToCountry(id) {
if (!countryData[id]) {
return;
}
setState({ level: 'country', countryId: id });
}

function handleBack() {
if (state.level === 'country') {
setState({ level: 'continent', countryId: null });
return;
}
if (state.level === 'continent') {
setState({ level: 'world', continentId: null });
return;
}
if (state.level === 'world') {
setState({ level: 'landing', continentId: null, countryId: null });
}
}

function render() {
applyTheme();
updateThemeButtonText();
document.documentElement.lang = state.lang === 'fr' ? 'fr' : 'en';
Object.values(views).forEach(view => view.classList.remove('active'));
views[state.level].classList.add('active');
if (state.level === 'landing') {
header.classList.add('hidden');
} else {
header.classList.remove('hidden');
}
backButton.style.visibility = state.level === 'landing' ? 'hidden' : 'visible';
infoButton.style.visibility = state.level === 'landing' ? 'hidden' : 'visible';
infoButton.textContent = translations[state.lang].common.info;
infoButton.dataset.modal = state.level === 'country' ? 'country' : state.level === 'continent' ? 'continent' : 'world';
updateLanguageControls();
renderWorldTexts();
renderContinentView();
renderCountryView();
}

function updateLanguageControls() {
Array.from(document.querySelectorAll('.language-toggle button')).forEach(button => {
button.classList.toggle('active', button.dataset.lang === state.lang);
});
}

function renderWorldTexts() {
const t = translations[state.lang];
const worldTitle = document.querySelector('[data-i18n="world.title"]');
const worldDescription = document.querySelector('[data-i18n="world.description"]');
if (worldTitle) {
worldTitle.textContent = t.world.title;
}
if (worldDescription) {
worldDescription.textContent = t.world.description;
}
}

function renderContinentView() {
const subtitle = document.querySelector('[data-i18n="continent.subtitle"]');
if (subtitle) {
subtitle.textContent = translations[state.lang].continent.subtitle;
}
const availableLabel = document.querySelector('[data-i18n="continent.available"]');
if (availableLabel) {
availableLabel.textContent = translations[state.lang].continent.available;
}
const detailButton = document.querySelector('#continentView [data-modal="continent"]');
if (detailButton) {
detailButton.textContent = translations[state.lang].continent.info;
}
if (!state.continentId) {
document.getElementById('continentName').textContent = '';
document.getElementById('countryList').innerHTML = '';
document.getElementById('donut').style.setProperty('--value', 0);
document.getElementById('progressValue').textContent = '';
document.getElementById('progressNote').innerHTML = '';
renderContinentMap(null);
return;
}
const continent = continentData[state.continentId];
document.getElementById('continentName').textContent = continent.names[state.lang];
const list = document.getElementById('countryList');
list.innerHTML = '';
if (!continent.availableCountries.length) {
const li = document.createElement('li');
li.textContent = translations[state.lang].common.comingSoon;
list.appendChild(li);
} else {
continent.availableCountries.forEach(id => {
const country = countryData[id];
if (!country) {
return;
}
const li = document.createElement('li');
li.textContent = country.name[state.lang];
list.appendChild(li);
});
}
const donut = document.getElementById('donut');
donut.style.setProperty('--value', continent.progress);
document.getElementById('progressValue').textContent = formatPercent(continent.progress) + '%';
document.getElementById('progressNote').innerHTML = translations[state.lang].continent.progress;
renderContinentMap(state.continentId);
}

function renderCountryView() {
const subtitle = document.querySelector('[data-i18n="country.subtitle"]');
if (subtitle) {
subtitle.textContent = translations[state.lang].country.subtitle;
}
const newsTitle = document.querySelector('[data-i18n="country.newsTitle"]');
if (newsTitle) {
newsTitle.textContent = translations[state.lang].country.newsTitle;
}
if (!state.countryId) {
newsToggle.textContent = translations[state.lang].country.newsToggle;
newsPanel.classList.add('hidden');
renderCountryMap(null);
return;
}
const country = countryData[state.countryId];
document.getElementById('countryName').textContent = country.name[state.lang];
const continent = continentData[country.continentId];
document.getElementById('continentBadge').textContent = continent.names[state.lang];
newsPanel.classList.add('hidden');
newsToggle.textContent = translations[state.lang].country.newsToggle;
buildNewsList(country);
buildLegalSections(country);
renderCountryMap(state.countryId);
}

function buildNewsList(country) {
const list = document.getElementById('newsList');
list.innerHTML = '';
const linkLabel = state.lang === 'fr' ? 'Consulter' : 'Open';
country.news.forEach(item => {
const li = document.createElement('li');
li.innerHTML = `<strong>${item.title[state.lang]}</strong><span>${item.source} — ${item.date}</span><a href="${item.link}">${linkLabel}</a>`;
list.appendChild(li);
});
}

function buildLegalSections(country) {
const wrapper = document.getElementById('legalSections');
wrapper.innerHTML = '';
country.sections.forEach((section, index) => {
const group = document.createElement('div');
group.className = 'accordion-group';
const heading = document.createElement('h4');
heading.textContent = `${index + 1}. ${section.title[state.lang]}`;
group.appendChild(heading);
section.items.forEach(item => {
const itemEl = document.createElement('div');
itemEl.className = 'accordion-item';
const trigger = document.createElement('button');
trigger.className = 'accordion-trigger';
const titleSpan = document.createElement('span');
titleSpan.className = 'title';
titleSpan.textContent = item.title[state.lang];
const badge = document.createElement('span');
badge.className = 'badge';
badge.textContent = item.badge;
trigger.appendChild(titleSpan);
trigger.appendChild(badge);
itemEl.appendChild(trigger);
const content = document.createElement('div');
content.className = 'accordion-content';
content.innerHTML = `<p>${item.content[state.lang]}</p>`;
itemEl.appendChild(content);
trigger.addEventListener('click', () => toggleAccordion(itemEl, content));
group.appendChild(itemEl);
});
wrapper.appendChild(group);
});
}

function toggleAccordion(item, content) {
const isOpen = item.classList.toggle('open');
content.classList.toggle('active', isOpen);
content.style.maxHeight = isOpen ? content.scrollHeight + 'px' : '0px';
}

function toggleNews() {
if (!state.countryId) {
return;
}
const hidden = newsPanel.classList.toggle('hidden');
newsToggle.textContent = hidden ? translations[state.lang].country.newsToggle : translations[state.lang].country.newsToggleClose;
}

function openModal(type) {
if (type === 'world') {
modalTitle.textContent = translations[state.lang].modal.world.title;
modalBody.textContent = translations[state.lang].modal.world.body;
} else if (type === 'continent' && state.continentId) {
const continent = continentData[state.continentId];
modalTitle.textContent = continent.names[state.lang];
modalBody.textContent = continent.info[state.lang];
} else if (type === 'country' && state.countryId) {
const country = countryData[state.countryId];
modalTitle.textContent = country.name[state.lang];
modalBody.textContent = country.overview[state.lang];
} else {
return;
}
modalEl.classList.remove('hidden');
}

function closeModal() {
modalEl.classList.add('hidden');
}

function formatPercent(value) {
const locale = state.lang === 'fr' ? 'fr-FR' : 'en-US';
return new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);
}

function applyTheme() {
if (currentThemeApplied === state.theme) {
return;
}
currentThemeApplied = state.theme;
document.body.setAttribute('data-theme', state.theme);
try {
localStorage.setItem('aixip-theme', state.theme);
} catch (error) {
// ignore
}
updateGlobeTheme();
}

function updateThemeButtonText() {
const isLight = state.theme === 'light';
const text = isLight ? 'Mode sombre' : 'Mode clair';
const ariaLabel = isLight ? 'Activer le mode sombre' : 'Activer le mode clair';
    
if (themeToggle) {
themeToggle.textContent = text;
themeToggle.setAttribute('aria-label', ariaLabel);
}
    
const landingThemeToggle = document.getElementById('landingThemeToggle');
if (landingThemeToggle) {
landingThemeToggle.textContent = text;
landingThemeToggle.setAttribute('aria-label', ariaLabel);
}
}

function showGlobeFallback(target) {
const container = target || document.getElementById('globeContainer');
if (container) {
container.classList.add('globe-fallback');
}
}

function updateGlobeTheme() {
if (!globeInstance) {
return;
}
const theme = state.theme || 'light';
const palette = getGlobePalette(theme);
const texture = getGlobeTexture(theme);
globeInstance.globeImageUrl(texture);
const material = globeInstance.globeMaterial();
material.color.set(palette.materialColor);
material.emissive.set(palette.emissiveColor);
material.emissiveIntensity = palette.emissiveIntensity;
globeInstance.atmosphereColor(palette.atmosphereColor);
}

function getGlobeTexture(theme) {
return '//unpkg.com/three-globe/example/img/earth-water.png';
}

function getGlobePalette(theme) {
if (theme === 'dark') {
return {
materialColor: '#111426',
emissiveColor: '#050509',
emissiveIntensity: 0.45,
atmosphereColor: '#7b7cff'
};
}
return {
materialColor: '#e1e5ff',
emissiveColor: '#9aaaf7',
emissiveIntensity: 0.35,
atmosphereColor: '#b0b3ff'
};
}

function createGlobeTexture(theme = 'light') {
const isDark = theme === 'dark';
const canvas = document.createElement('canvas');
canvas.width = canvas.height = 256;
const ctx = canvas.getContext('2d');
const baseGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
if (isDark) {
baseGradient.addColorStop(0, '#151733');
baseGradient.addColorStop(1, '#070712');
} else {
baseGradient.addColorStop(0, '#f7f8ff');
baseGradient.addColorStop(1, '#b5bdff');
}
ctx.fillStyle = baseGradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);
const highlight = ctx.createRadialGradient(canvas.width * 0.35, canvas.height * 0.3, canvas.width * 0.1, canvas.width * 0.35, canvas.height * 0.3, canvas.width * 0.5);
if (isDark) {
highlight.addColorStop(0, 'rgba(255,255,255,0.25)');
highlight.addColorStop(1, 'rgba(255,255,255,0)');
} else {
highlight.addColorStop(0, 'rgba(255,255,255,0.6)');
highlight.addColorStop(1, 'rgba(255,255,255,0)');
}
ctx.fillStyle = highlight;
ctx.beginPath();
ctx.arc(canvas.width * 0.35, canvas.height * 0.3, canvas.width * 0.5, 0, Math.PI * 2);
ctx.fill();
return canvas.toDataURL('image/png');
}

function initGlobe() {
const container = document.getElementById('globeContainer');
if (!container) {
return;
}
if (typeof Globe === 'undefined') {
showGlobeFallback(container);
return;
}
try {
const theme = state.theme || 'light';
container.innerHTML = '';
const texture = getGlobeTexture(theme);
const palette = getGlobePalette(theme);
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

function resizeGlobe() {
const container = document.getElementById('globeContainer');
if (!container || !globeInstance) {
return;
}
globeInstance.width(container.clientWidth || 360);
globeInstance.height(container.clientHeight || 360);
}

function loadWorldGeometry() {
if (typeof d3 === 'undefined' || typeof topojson === 'undefined') {
console.warn('Map libraries missing.');
return;
}
Promise.all([
fetch('res/world-110m.json').then(response => response.json()),
fetch('res/country-continent.json').then(response => response.json()).catch(() => [])
])
.then(([worldData, continentList]) => {
worldFeatures = topojson.feature(worldData, worldData.objects.countries).features;
buildCountryContinentLookup(Array.isArray(continentList) ? continentList : []);
worldReady = true;
drawWorldMap();
renderContinentMap(state.continentId);
renderCountryMap(state.countryId);
})
.catch(error => console.error('Unable to load world data', error));
}

function drawWorldMap() {
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

paths.on('mouseenter', (event, feature) => handleWorldHover(feature, true))
.on('mouseleave', (event, feature) => handleWorldHover(feature, false))
.on('click', (event, feature) => {
const continentId = getContinentForFeature(feature);
if (continentId) {
goToContinent(continentId);
}
});
}

function renderContinentMap(continentId) {
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
if (countryId && focusNames.has(featureName)) {
goToCountry(countryId);
}
});
}

function renderCountryMap(countryId) {
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

function handleWorldHover(feature, entering) {
const continentId = getContinentForFeature(feature);
highlightWorldContinent(continentId, entering);
}

function highlightWorldContinent(continentId, entering) {
if (!continentId) {
return;
}
const svg = d3.select('#worldMap');
const fillColor = entering ? (continentHoverColorMap[continentId] || continentColorMap[continentId] || 'rgba(255,255,255,0.3)') : (continentColorMap[continentId] || 'rgba(255,255,255,0.2)');
svg.selectAll(`path.land[data-continent="${continentId}"]`)
.classed('continent-focus', !!entering)
.attr('fill', fillColor);
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

function handleResize() {
resizeGlobe();
if (!worldReady) {
return;
}
drawWorldMap();
renderContinentMap(state.continentId);
renderCountryMap(state.countryId);
}

function buildCountryContinentLookup(list) {
countryContinentLookup = {};
list.forEach(item => {
const continentId = continentIdByLabel[item.continent];
if (!continentId) {
return;
}
const normalized = normalizeCountryName(item.country);
if (normalized) {
countryContinentLookup[normalized] = continentId;
}
});
Object.entries(manualCountryContinents).forEach(([name, continentId]) => {
countryContinentLookup[name] = continentId;
});
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
