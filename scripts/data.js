export const translations = {
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
    comingSoon: 'Bientôt disponible',
    theme: {
      lightLabel: 'Mode clair',
      darkLabel: 'Mode sombre',
      ariaToDark: 'Activer le mode sombre',
      ariaToLight: 'Activer le mode clair'
    }
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
    comingSoon: 'Coming soon',
    theme: {
      lightLabel: 'Light mode',
      darkLabel: 'Dark mode',
      ariaToDark: 'Switch to dark mode',
      ariaToLight: 'Switch to light mode'
    }
  }
}
};

export const continentData = {
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

export const countryData = {
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

export const geoNameToCountryId = Object.values(countryData).reduce((acc, country) => {
  acc[country.geoName] = country.id;
  return acc;
}, {});

export const continentBounds = {
  americas: [[-170, -60], [-20, 80]],
  europe: [[-30, 34], [60, 75]],
  africa: [[-25, -40], [55, 38]],
  asia: [[20, -10], [150, 80]],
  oceania: [[95, -50], [180, 10]]
};

export const continentColorMap = {
  americas: 'rgba(131,133,255,0.4)',
  europe: 'rgba(156,214,255,0.42)',
  africa: 'rgba(255,111,125,0.45)',
  asia: 'rgba(255,205,140,0.42)',
  oceania: 'rgba(126,236,205,0.45)'
};

export const continentHoverColorMap = {
  americas: 'rgba(139,141,255,0.65)',
  europe: 'rgba(176,233,255,0.65)',
  africa: 'rgba(255,143,156,0.65)',
  asia: 'rgba(255,220,172,0.65)',
  oceania: 'rgba(162,251,226,0.65)'
};

export const continentIdByLabel = {
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

export const manualCountryContinents = {
  unitedstatesofamerica: 'americas',
  unitedstates: 'americas',
  usa: 'americas',
  russianfederation: 'europe',
  republicofthecongo: 'africa',
  democraticrepublicofthecongo: 'africa',
  ivorycoast: 'africa',
  cotedivoire: 'africa',
  bolivia: 'americas',
  capeverde: 'africa',
  eswatini: 'africa',
  vaticancity: 'europe',
  czechia: 'europe',
  northmacedonia: 'europe',
  southsudan: 'africa',
  myanmar: 'asia',
  burma: 'asia',
  laos: 'asia',
  bahamas: 'americas',
  timorleste: 'asia',
  taiwan: 'asia',
  hongkong: 'asia',
  macau: 'asia',
  palestine: 'asia',
  kosovo: 'europe',
  westernsahara: 'africa',
  newcaledonia: 'oceania',
  puertorico: 'americas',
  falklandislands: 'americas'
};

export const countryNameAliases = {
  fiji: 'fijiislands',
  wsahara: 'westernsahara',
  demrepcongo: 'thedemocraticrepublicofcongo',
  dominicanrep: 'dominicanrepublic',
  falklandis: 'falklandislands',
  frsantarcticlands: 'frenchsouthernterritories',
  centralafricanrep: 'centralafricanrepublic',
  eqguinea: 'equatorialguinea',
  solomonis: 'solomonislands',
  ncyprus: 'cyprus',
  somaliland: 'somalia',
  bosniaandherz: 'bosniaandherzegovina',
  macedonia: 'northmacedonia',
  ssudan: 'southsudan'
};
