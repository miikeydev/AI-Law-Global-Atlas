export const translations = {
  fr: {
    world: {
      title: 'Un monde, mille régulations',
      description: 'Un clic, et vous accédez aux actualités, textes de droit et initiatives législatives qui façonnent l\'encadrement de l\'IA partout sur la planète.',
      detailsShow: 'Voir le critère actif',
      detailsHide: 'Masquer le critère actif',
      switchToC1: 'Activer la légende C1',
      switchToC2: 'Activer la légende C2'
    },
    continent: {
      subtitle: 'Cliquez sur un pays de la carte pour en savoir plus.',
      available: 'Sont déjà disponibles :',
      progress: 'Il nous reste du <span class="accent-word">travail</span>.',
      progressLow: 'Il nous reste du <span class="accent-word">travail</span>.',
      progressHigh: 'La couverture est déjà <span class="accent-word">bien avancée</span>.',
      info: 'Voir les actualités du continent'
    },
    country: {
      subtitle: '',
      newsToggle: 'Actualité juridique',
      newsToggleClose: 'Fermer les actualités',
      newsTitle: 'Dernières actualités juridiques',
      newsLabel: 'Actualité juridique',
      newsEmpty: 'Les actualités arrivent bientôt.',
      textFallback: 'Contenu à venir pour ce pays.'
    },
    modal: {
      world: {
        title: 'Une cartographie en construction',
        body: 'Pays après pays, cette plateforme rassemble textes, annonces gouvernementales et initiatives privées pour suivre l\'encadrement mondial de l\'intelligence artificielle et de la propriété intellectuelle.'
      },
      continent: 'Cette zone s\'enrichit progressivement grâce à notre réseau d\'experts et d\'universités partenaires.'
    },
    common: {
      info: '+ d\'infos',
      comingSoon: 'Bientôt disponible',
      theme: {
        lightLabel: 'Mode clair',
        darkLabel: 'Mode sombre',
        ariaToDark: 'Activer le mode sombre',
        ariaToLight: 'Activer le mode clair'
      },
      footer: {
        tagline: 'AI X IP Global Explorer — 2025 - 2026',
        subline: 'University project – Student of Panthéon-Assas University',
        contact: 'Contact'
      }
    }
  },
  en: {
    world: {
      title: 'One world, a thousand regulations',
      description: 'With one click, access news, legal texts and legislative initiatives shaping AI regulation around the globe.',
      detailsShow: 'Show active criterion',
      detailsHide: 'Hide active criterion',
      switchToC1: 'Use legend C1',
      switchToC2: 'Use legend C2'
    },
    continent: {
      subtitle: 'Click on a country on the map to learn more.',
      available: 'Available so far:',
      progress: 'There is still <span class="accent-word">work</span> to do.',
      progressLow: 'There is still <span class="accent-word">work</span> to do.',
      progressHigh: 'Coverage is already <span class="accent-word">well advanced</span>.',
      info: 'See continent updates'
    },
    country: {
      subtitle: '',
      newsToggle: 'Legal news',
      newsToggleClose: 'Hide legal news',
      newsTitle: 'Latest legal updates',
      newsLabel: 'Legal news',
      newsEmpty: 'Legal updates are coming soon.',
      textFallback: 'Content coming soon for this country.'
    },
    modal: {
      world: {
        title: 'A map in constant evolution',
        body: 'Country by country, this explorer curates statutes, policy papers and trusted reporting to follow the fast-moving field of AI and intellectual property law.'
      },
      continent: 'This region grows week after week thanks to our network of experts and academic fellows.'
    },
    common: {
      info: '+ infos',
      comingSoon: 'Coming soon',
      theme: {
        lightLabel: 'Light mode',
        darkLabel: 'Dark mode',
        ariaToDark: 'Switch to dark mode',
        ariaToLight: 'Switch to light mode'
      },
      footer: {
        tagline: 'AI X IP Global Explorer — 2025 - 2026',
        subline: 'University project – Student of Panthéon-Assas University',
        contact: 'Contact'
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
    progress: 75.0,
    availableCountries: ['ue', 'estonia', 'uk', 'turkey'],
    markers: [
      { countryId: 'ue', x: 48, y: 58 }
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
    availableCountries: ['southAfrica', 'nigeria', 'kenya'],
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
    availableCountries: ['china', 'india', 'japan', 'singapore', 'uae', 'southKorea', 'saudiArabia', 'russia'],
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
    availableCountries: ['australia'],
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
    geoName: 'United States of America'
  },
  canada: {
    id: 'canada',
    continentId: 'americas',
    name: { fr: 'Canada', en: 'Canada' },
    geoName: 'Canada'
  },
  brazil: {
    id: 'brazil',
    continentId: 'americas',
    name: { fr: 'Brésil', en: 'Brazil' },
    geoName: 'Brazil'
  },
  chile: {
    id: 'chile',
    continentId: 'americas',
    name: { fr: 'Chili', en: 'Chile' },
    geoName: 'Chile'
  },
  estonia: {
    id: 'estonia',
    continentId: 'europe',
    name: { fr: 'Estonie', en: 'Estonia' },
    geoName: 'Estonia'
  },
  uk: {
    id: 'uk',
    continentId: 'europe',
    name: { fr: 'Royaume-Uni', en: 'United Kingdom' },
    geoName: 'United Kingdom'
  },
  china: {
    id: 'china',
    continentId: 'asia',
    name: { fr: 'Chine', en: 'China' },
    geoName: 'China'
  },
  india: {
    id: 'india',
    continentId: 'asia',
    name: { fr: 'Inde', en: 'India' },
    geoName: 'India'
  },
  japan: {
    id: 'japan',
    continentId: 'asia',
    name: { fr: 'Japon', en: 'Japan' },
    geoName: 'Japan'
  },
  singapore: {
    id: 'singapore',
    continentId: 'asia',
    name: { fr: 'Singapour', en: 'Singapore' },
    geoName: 'Singapore'
  },
  uae: {
    id: 'uae',
    continentId: 'asia',
    name: { fr: 'Émirats arabes unis', en: 'United Arab Emirates' },
    geoName: 'United Arab Emirates'
  },
  nigeria: {
    id: 'nigeria',
    continentId: 'africa',
    name: { fr: 'Nigeria', en: 'Nigeria' },
    geoName: 'Nigeria'
  },
  southAfrica: {
    id: 'southAfrica',
    continentId: 'africa',
    name: { fr: 'Afrique du Sud', en: 'South Africa' },
    geoName: 'South Africa'
  },
  australia: {
    id: 'australia',
    continentId: 'oceania',
    name: { fr: 'Australie', en: 'Australia' },
    geoName: 'Australia'
  },
  ue: {
    id: 'ue',
    continentId: 'europe',
    name: { fr: 'Union Européenne', en: 'European Union' },
    geoNames: ['France', 'Spain', 'Germany', 'Italy', 'Netherlands', 'Belgium', 'Portugal', 'Sweden', 'Poland', 'Austria', 'Hungary', 'Czechia', 'Greece', 'Finland', 'Denmark', 'Ireland', 'Romania', 'Bulgaria', 'Slovakia', 'Croatia', 'Lithuania', 'Latvia', 'Slovenia', 'Luxembourg', 'Cyprus', 'Malta']
  },
  southKorea: {
    id: 'southKorea',
    continentId: 'asia',
    name: { fr: 'Corée du Sud', en: 'South Korea' },
    geoName: 'South Korea'
  },
  saudiArabia: {
    id: 'saudiArabia',
    continentId: 'asia',
    name: { fr: 'Arabie Saoudite', en: 'Saudi Arabia' },
    geoName: 'Saudi Arabia'
  },
  turkey: {
    id: 'turkey',
    continentId: 'europe',
    name: { fr: 'Turquie', en: 'Turkey' },
    geoName: 'Turkey'
  },
  russia: {
    id: 'russia',
    continentId: 'asia',
    name: { fr: 'Russie', en: 'Russia' },
    geoName: 'Russia'
  },
  kenya: {
    id: 'kenya',
    continentId: 'africa',
    name: { fr: 'Kenya', en: 'Kenya' },
    geoName: 'Kenya'
  }
};

export const geoNameToCountryId = Object.values(countryData).reduce((acc, country) => {
  if (Array.isArray(country.geoNames)) {
    country.geoNames.forEach(name => {
      acc[name] = country.id;
    });
  } else if (country.geoName) {
    acc[country.geoName] = country.id;
  }
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
  russia: 'asia',
  russianfederation: 'asia',
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

export const worldCriteriaDefinitions = {
  c1: {
    id: 'c1',
    shortLabel: { fr: 'Critère 1 (C1)', en: 'Criterion 1 (C1)' },
    title: { fr: 'Intensité de la régulation de l’intelligence artificielle', en: 'Intensity of AI regulation' },
    lead: {
      fr: [
        'Cette cartographie ne mesure ni la qualité du droit, ni son efficacité, ni son modernisme.',
        'Elle mesure le degré de contrainte juridique ex ante pesant sur les acteurs de l’IA.'
      ],
      en: [
        'This map does not assess legal quality, efficiency, or modernity.',
        'It measures the level of ex ante legal constraints imposed on AI actors.'
      ]
    },
    listTitle: { fr: 'Critères de distinction :', en: 'Distinction criteria:' },
    list: {
      fr: [
        'Le volume d’obligations imposées aux concepteurs et utilisateurs d’IA.',
        'La présence d’interdictions ou de pratiques prohibées.',
        'L’existence de mécanismes de contrôle préalables (autorisation, certification, enregistrement).'
      ],
      en: [
        'The volume of obligations imposed on AI developers and users.',
        'The presence of prohibitions or forbidden practices.',
        'The existence of prior control mechanisms (authorization, certification, registration).'
      ]
    },
    legendTitle: { fr: 'Intensité de régulation (C1)', en: 'Regulatory Intensity (C1)' },
    buckets: [
      { id: 'very-high', min: 75, color: '#7B0B1F', label: { fr: 'Régulation très contraignante', en: 'Very stringent regulation' } },
      { id: 'high', min: 60, color: '#A5152E', label: { fr: 'Régulation forte', en: 'Strong regulation' } },
      { id: 'medium', min: 45, color: '#CE4D74', label: { fr: 'Régulation intermédiaire', en: 'Intermediate regulation' } },
      { id: 'low', min: 25, color: '#E89AB9', label: { fr: 'Régulation souple', en: 'Flexible regulation' } },
      { id: 'very-low', min: -Infinity, color: '#F8DCE8', label: { fr: 'Approche très libérale', en: 'Very liberal approach' } }
    ]
  },
  c2: {
    id: 'c2',
    shortLabel: { fr: 'Critère 2 (C2)', en: 'Criterion 2 (C2)' },
    title: { fr: 'Niveau de spécialisation normative en matière d’IA', en: 'Normative specialization level for AI' },
    lead: {
      fr: [
        'Cette cartographie ne mesure pas le degré de sévérité.',
        'Elle mesure le niveau d’abstraction du droit et la manière dont l’IA est pensée par le législateur.'
      ],
      en: [
        'This map does not measure strictness.',
        'It measures the level of legal abstraction and how AI is framed by lawmakers.'
      ]
    },
    listTitle: { fr: 'Indicateurs concrets d’évaluation :', en: 'Concrete assessment indicators:' },
    list: {
      fr: [
        'Existence d’une définition juridique de l’IA.',
        'Présence de textes explicitement dédiés à l’IA.',
        'Création d’autorités ou mécanismes spécifiques.',
        'Reconnaissance de risques propres à l’IA (biais, opacité, autonomie).'
      ],
      en: [
        'Existence of a legal definition of AI.',
        'Presence of texts explicitly dedicated to AI.',
        'Creation of dedicated authorities or mechanisms.',
        'Recognition of AI-specific risks (bias, opacity, autonomy).'
      ]
    },
    legendTitle: { fr: 'Spécialisation normative (C2)', en: 'Normative Specialization (C2)' },
    buckets: [
      { id: 'very-high', min: 80, color: '#2F0A54', label: { fr: 'Cadre global et structurant', en: 'Global and structuring framework' } },
      { id: 'high', min: 60, color: '#53238E', label: { fr: 'Lois spécifiques à l’IA', en: 'AI-specific laws' } },
      { id: 'medium', min: 40, color: '#8551C3', label: { fr: 'Adaptations sectorielles', en: 'Sector-based adaptations' } },
      { id: 'low', min: 20, color: '#C2A5EA', label: { fr: 'Soft law / stratégies / chartes', en: 'Soft law / strategies / charters' } },
      { id: 'very-low', min: -Infinity, color: '#ECE9F3', label: { fr: 'Aucune spécialisation normative', en: 'No normative specialization' } }
    ]
  }
};

export const worldCriterionScoresByCountryId = {
  c1: {
    ue: 90,
    southKorea: 85,
    brazil: 82,
    chile: 78,
    china: 75,
    turkey: 68,
    usa: 55,
    canada: 48,
    uk: 42,
    japan: 12,
    singapore: 15,
    australia: 18,
    saudiArabia: 38,
    uae: 20,
    india: 32,
    estonia: 22,
    russia: 45,
    nigeria: 28,
    southAfrica: 25,
    kenya: 25
  },
  c2: {
    ue: 95,
    southKorea: 92,
    brazil: 88,
    chile: 85,
    china: 72,
    turkey: 65,
    usa: 45,
    canada: 38,
    uk: 52,
    japan: 68,
    singapore: 58,
    australia: 48,
    saudiArabia: 30,
    uae: 28,
    india: 25,
    estonia: 22,
    russia: 40,
    nigeria: 18,
    southAfrica: 20,
    kenya: 15
  }
};

export const worldCriterionScoresByGeoName = {
  c1: {
    Egypt: 35
  },
  c2: {
    Egypt: 32
  }
};
