import { initCommon } from './common.js';

const LEGAL_COPY = {
  fr: {
    title: 'Mentions Légales & Conditions Générales d\'Utilisation',
    section1Title: '1. Informations légales',
    section1P1: 'Conformément aux dispositions de l\'article 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l\'Économie Numérique (LCEN), il est porté à la connaissance des utilisateurs du site AI X IP Global Explorer (accessible à l\'adresse https://www.ai-x-ip-map.fr/) les présentes mentions légales.',
    section1P2Label: 'Éditeur et Directeur de la publication :',
    section1P2Text: 'Le site est édité par Madame Émilie Letouzé, personne physique agissant à titre strictement non professionnel, en sa qualité d\'étudiante en droit (Université Paris-Panthéon-Assas). Conformément à l\'article 6-III-2 de la loi du 21 juin 2004, l\'éditeur a fait le choix de préserver son anonymat géographique. Les éléments d\'identification personnelle de l\'éditeur ont été légalement communiqués à l\'hébergeur du site. Contact : emilie.letouze@outlook',
    section1P3Label: 'Hébergeur du site :',
    section1P3Text: 'Le site est hébergé par la société OVH SAS. Siège social : 2 rue Kellermann – 59100 Roubaix – France. Téléphone : 1007. La société OVH SAS est une filiale de la société OVH Groupe SA, immatriculée au RCS de Lille sous le numéro 537 407 926.',
    section2Title: '2. Propriété intellectuelle et Droits d\'auteur',
    section2P1: 'Le présent site web et l\'ensemble de ses contenus constituent des œuvres de l\'esprit protégées par les dispositions du Code de la propriété intellectuelle (CPI).',
    section2P2Label: 'Contenus éditoriaux et scientifiques :',
    section2P2Text: 'La conception doctrinale, l\'architecture intellectuelle, les textes, le design, ainsi que les analyses juridiques comparatives sont la propriété intellectuelle exclusive d\'Émilie Letouzé.',
    section2P3Label: 'Protection des bases de données :',
    section2P3Text: 'Conformément aux dispositions de l\'article L.341-1 et suivants du Code de la propriété intellectuelle, Émilie Letouzé a la qualité de producteur de la base de données sous-jacente à la cartographie. Toute extraction ou réutilisation, qualitativement ou quantitativement substantielle, du contenu de cette base de données est strictement interdite.',
    section2P4Label: 'Développement technique (Code source) :',
    section2P4Text: 'L\'infrastructure technique et le code source du site ont été développés par Mahouna Vayssieres. Conformément à l\'article L.112-2 13° du CPI, il en conserve la paternité technique, mais concède à titre gracieux et exclusif une licence d\'exploitation et de représentation à l\'éditeur pour les stricts besoins du présent projet.',
    section2P5: 'Toute reproduction, représentation, modification ou adaptation, totale ou partielle, des éléments du site (hors code source sous licence), sans l\'autorisation expresse et préalable d\'Émilie Letouzé, est constitutive du délit de contrefaçon sanctionné par les articles L.335-2 et suivants du Code de la propriété intellectuelle.',
    section3Title: '3. Conditions Générales d\'Utilisation et Avertissement',
    section3P1: 'L\'utilisation du site AI X IP Global Explorer implique l\'acceptation pleine et entière des présentes conditions d\'utilisation.',
    section3P2Label: 'Objet du site :',
    section3P2Text: 'Le présent site a pour vocation exclusive de présenter un travail de recherche étudiant en droit comparé, consistant en une cartographie analytique de l\'encadrement de l\'Intelligence Artificielle à l\'échelle mondiale.',
    section3P3Label: 'Clause de non-responsabilité :',
    section3P3Text: 'Les informations, fiches pays et analyses juridiques fournies sur ce site sont le fruit d\'une recherche académique à visée purement pédagogique et informative. Elles ne constituent en aucun cas une consultation juridique, un avis de droit ou une recommandation stratégique.',
    section3P4: 'L\'éditeur s\'efforce de fournir des informations aussi précises que possible (mises à jour en 2026). Toutefois, compte tenu de l\'évolution extrêmement rapide du droit du numérique à l\'international, l\'éditeur ne saurait garantir l\'exactitude, l\'exhaustivité ou l\'actualité des législations présentées. En conséquence, l\'utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive. Pour toute problématique juridique spécifique, il est impératif de consulter un avocat qualifié et inscrit au barreau de la juridiction concernée. L\'éditeur décline toute responsabilité quant aux conséquences directes ou indirectes liées à l\'utilisation des informations contenues sur ce site.',
    section4Title: '4. Données personnelles et Traceurs (RGPD)',
    section4P1: 'Ce site a été conçu dans le respect de la vie privée de ses utilisateurs (Privacy by Design). Il est strictement informatif, non marchand, et ne collecte aucune donnée à caractère personnel via des formulaires.',
    section4P2: 'Conformément aux lignes directrices de la Commission Nationale de l\'Informatique et des Libertés (CNIL) et à l\'article 82 de la loi Informatique et Libertés, ce site ne dépose aucun cookie à des fins de ciblage publicitaire ou de suivi comportemental. Seuls les traceurs strictement nécessaires à la fourniture du service de communication en ligne (cookies techniques de l\'hébergeur pour l\'équilibrage de charge ou la sécurité) peuvent être déposés, lesquels sont exemptés du recueil du consentement préalable.',
  },
  en: {
    title: 'Legal Notices & Terms of Use',
    section1Title: '1. Legal Information',
    section1P1: 'In accordance with the provisions of Article 6-III and 19 of Law No. 2004-575 of June 21, 2004 on Confidence in the Digital Economy (LCEN), the following legal notices are brought to the attention of users of the AI X IP Global Explorer website (accessible at https://www.ai-x-ip-map.fr/).',
    section1P2Label: 'Publisher and Editorial Director:',
    section1P2Text: 'This website is published by Ms. Émilie Letouzé, acting as a private individual on a strictly non-professional basis, in her capacity as a law student (Paris-Panthéon-Assas University). In accordance with Article 6-III-2 of the Law of June 21, 2004, the publisher has chosen to preserve her geographical anonymity. The publisher\'s personal identification details have been legally disclosed to the website\'s hosting provider. Contact: emilie.letouze@outlook',
    section1P3Label: 'Website Host:',
    section1P3Text: 'This website is hosted by OVH SAS. Registered office: 2 rue Kellermann – 59100 Roubaix – France. Phone: 1007. OVH SAS is a subsidiary of OVH Groupe SA, registered with the Lille Trade and Companies Register under number 537 407 926.',
    section2Title: '2. Intellectual Property and Copyright',
    section2P1: 'This website and all of its content constitute intellectual works protected by the provisions of the French Intellectual Property Code (Code de la propriété intellectuelle, CPI).',
    section2P2Label: 'Editorial and scientific content:',
    section2P2Text: 'The doctrinal design, intellectual architecture, texts, visual design, and comparative legal analyses are the exclusive intellectual property of Émilie Letouzé.',
    section2P3Label: 'Database protection:',
    section2P3Text: 'In accordance with Articles L.341-1 et seq. of the French Intellectual Property Code, Émilie Letouzé holds the status of database producer with respect to the underlying mapping database. Any qualitatively or quantitatively substantial extraction or re-use of the content of this database is strictly prohibited.',
    section2P4Label: 'Technical development (Source code):',
    section2P4Text: 'The technical infrastructure and source code of the website were developed by Mahouna Vayssieres. In accordance with Article L.112-2(13°) of the CPI, he retains technical authorship but grants the publisher, on a gratuitous and exclusive basis, a license to use and represent the work for the strict purposes of this project.',
    section2P5: 'Any reproduction, representation, modification, or adaptation, in whole or in part, of the website\'s elements (excluding the licensed source code), without the express prior authorization of Émilie Letouzé, constitutes copyright infringement as sanctioned by Articles L.335-2 et seq. of the French Intellectual Property Code.',
    section3Title: '3. Terms of Use and Disclaimer',
    section3P1: 'Use of the AI X IP Global Explorer website constitutes full and unconditional acceptance of these terms of use.',
    section3P2Label: 'Purpose of the website:',
    section3P2Text: 'This website is intended exclusively to present a student research project in comparative law, consisting of an analytical mapping of the regulation of Artificial Intelligence worldwide.',
    section3P3Label: 'Disclaimer:',
    section3P3Text: 'The information, country profiles, and legal analyses provided on this website are the result of academic research for purely educational and informational purposes. They do not constitute legal advice, a legal opinion, or a strategic recommendation under any circumstances.',
    section3P4: 'The publisher strives to provide information that is as accurate as possible (updated in 2026). However, given the extremely rapid pace of change in international digital law, the publisher cannot guarantee the accuracy, completeness, or currency of the legislation presented. Accordingly, users acknowledge that they use this information at their own risk. For any specific legal issue, it is essential to consult a qualified lawyer admitted to the bar of the relevant jurisdiction. The publisher disclaims all liability for direct or indirect consequences arising from the use of information contained on this website.',
    section4Title: '4. Personal Data and Cookies (GDPR)',
    section4P1: 'This website was designed with user privacy in mind (Privacy by Design). It is strictly informational, non-commercial, and does not collect any personal data through forms.',
    section4P2: 'In accordance with the guidelines of the French Data Protection Authority (CNIL) and Article 82 of the French Data Protection Act, this website does not place any cookies for advertising targeting or behavioral tracking purposes. Only technically necessary trackers essential to the provision of the online communication service (technical cookies from the hosting provider for load balancing or security purposes) may be placed, and these are exempt from the requirement to obtain prior consent.',
  }
};

const { lang } = initCommon({ onLangChange: renderLegalCopy });
renderLegalCopy(lang);

function renderLegalCopy(langCode) {
  const safeLang = langCode === 'en' ? 'en' : 'fr';
  const c = LEGAL_COPY[safeLang];
  if (!c) return;

  setText('legalTitle', c.title);
  setText('legalSection1Title', c.section1Title);
  setText('legalSection1P1', c.section1P1);
  setText('legalSection1P2Label', c.section1P2Label);
  setText('legalSection1P2Text', c.section1P2Text);
  setText('legalSection1P3Label', c.section1P3Label);
  setText('legalSection1P3Text', c.section1P3Text);
  setText('legalSection2Title', c.section2Title);
  setText('legalSection2P1', c.section2P1);
  setText('legalSection2P2Label', c.section2P2Label);
  setText('legalSection2P2Text', c.section2P2Text);
  setText('legalSection2P3Label', c.section2P3Label);
  setText('legalSection2P3Text', c.section2P3Text);
  setText('legalSection2P4Label', c.section2P4Label);
  setText('legalSection2P4Text', c.section2P4Text);
  setText('legalSection2P5', c.section2P5);
  setText('legalSection3Title', c.section3Title);
  setText('legalSection3P1', c.section3P1);
  setText('legalSection3P2Label', c.section3P2Label);
  setText('legalSection3P2Text', c.section3P2Text);
  setText('legalSection3P3Label', c.section3P3Label);
  setText('legalSection3P3Text', c.section3P3Text);
  setText('legalSection3P4', c.section3P4);
  setText('legalSection4Title', c.section4Title);
  setText('legalSection4P1', c.section4P1);
  setText('legalSection4P2', c.section4P2);
}

function setText(id, value) {
  const node = document.getElementById(id);
  if (!node || typeof value !== 'string') return;
  node.textContent = value;
}
