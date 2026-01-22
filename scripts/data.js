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
      info: '+ info',
      comingSoon: 'Bientôt disponible',
      theme: {
        lightLabel: 'Mode clair',
        darkLabel: 'Mode sombre',
        ariaToDark: 'Activer le mode sombre',
        ariaToLight: 'Activer le mode clair'
      },
      footer: {
        tagline: 'AI X IP Global Explorer — 2024',
        subline: 'Projet universitaire – Panthéon-Assas Université',
        contact: 'Contact'
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
      info: '+ info',
      comingSoon: 'Coming soon',
      theme: {
        lightLabel: 'Light mode',
        darkLabel: 'Dark mode',
        ariaToDark: 'Switch to dark mode',
        ariaToLight: 'Switch to light mode'
      },
      footer: {
        tagline: 'AI X IP Global Explorer — 2024',
        subline: 'University project – Panthéon-Assas University',
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
    availableCountries: ['ue', 'estonia', 'uk'],
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
    availableCountries: ['southAfrica', 'nigeria'],
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
    availableCountries: ['china', 'india', 'japan', 'singapore', 'uae'],
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
