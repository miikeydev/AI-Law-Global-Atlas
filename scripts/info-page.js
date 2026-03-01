import { initCommon } from './common.js';

const INFO_COPY = {
  fr: {
    projectTitle: 'À propos du projet',
    projectParagraph1: 'Ce projet a été réalisé par une étudiante en double diplôme de droit international à l\'Université Paris-Panthéon-Assas, dans l\'optique d\'offrir une approche comparative des différents encadrements juridiques de l\'intelligence artificielle à travers le monde. Ce travail reste néanmoins celui d\'une étudiante. Il a été mené avec le plus grand souci de rigueur et autant d\'encadrement que possible, mais il a vocation à constituer avant tout un point de départ pour vos propres recherches, et non une source exhaustive ou définitive.',
    projectParagraph2: 'Initié au début de l\'année 2025, ce projet s\'est construit sur plus d\'un an de recherches, d\'analyses juridiques et de mises à jour régulières, dans un domaine où le droit évolue particulièrement rapidement. L\'ensemble des contenus a été actualisé en 2026 et continuera à l\'être fréquemment, afin que le site évolue au rythme du droit du numérique.',
    acknowledgmentsTitle: 'Remerciements',
    acknowledgmentsParagraph1: 'Un immense merci aux professeurs de l\'ISIT (grande école de langues et de traduction) qui ont accepté de m\'aider et de m\'accompagner dans la traduction du site vers l\'anglais. Un travail titanesque, largement amélioré par de nombreuses relectures attentives.',
    acknowledgmentsParagraph2: 'Je remercie également certains professeurs et chargés de travaux dirigés de l\'Université Paris-Panthéon-Assas, qui ont suivi le projet avec bienveillance et partagé leurs retours et leurs conseils tout au long de son élaboration.',
    acknowledgmentsParagraph3: 'Merci enfin aux professionnels du droit du numérique, ainsi qu\'aux avocats et juristes étrangers qui, malgré la barrière des langues, ont accepté de relire, commenter et corriger ce travail alors qu\'il n\'en était encore qu\'à ses débuts.',
    acknowledgmentsParagraph4: 'Ce site est ainsi le fruit d\'une collaboration entre une étudiante passionnée par le droit du numérique et le droit international, ainsi que de nombreux professionnels du droit qui ont accepté de transmettre leurs savoirs avec une grande générosité.',
    sourcesTitle: 'Sources Juridiques par Pays',
    sourcesIntro: 'Vous trouverez ci-dessous les principales sources juridiques répertoriées par pays afin de vous permettre d\'aller plus loin dans vos recherches.'
  },
  en: {
    projectTitle: 'About the project',
    projectParagraph1: 'This project was developed by a student pursuing a dual degree in International Law at Paris-Panthéon-Assas University, with the objective of providing a comparative analysis of the various legal frameworks governing artificial intelligence worldwide. Nevertheless, this work remains that of a student. While conducted with the utmost commitment to rigor and under as much academic guidance as possible, it is intended primarily as a starting point for your own research, rather than an exhaustive or definitive authority.',
    projectParagraph2: 'Launched in early 2025, this project is the result of over a year of research, legal analysis, and regular updates in a field where law evolves with exceptional speed. All content was updated in 2026 and will continue to be refreshed frequently to ensure the platform evolves in step with digital law.',
    acknowledgmentsTitle: 'Acknowledgments',
    acknowledgmentsParagraph1: 'I would like to express my deepest gratitude to the faculty at ISIT (a leading Graduate School of specialized translation and interpreting) who graciously assisted and accompanied me in translating this site into English. Their meticulous proofreading significantly enhanced what was a monumental undertaking.',
    acknowledgmentsParagraph2: 'My thanks also go to the professors and teaching assistants at Paris-Panthéon-Assas University who monitored this project with benevolence and shared their feedback and advice throughout its development.',
    acknowledgmentsParagraph3: 'Finally, I am grateful to the digital law practitioners, as well as the foreign attorneys and jurists, who, despite language barriers, agreed to review, comment on, and refine this work while it was still in its early stages.',
    acknowledgmentsParagraph4: 'This platform is the fruit of a collaboration between a student passionate about digital and international law and numerous legal professionals who shared their knowledge with great generosity.',
    sourcesTitle: 'Legal Sources by Country',
    sourcesIntro: 'Below, you will find the primary legal sources indexed by country to facilitate further research.'
  }
};

const { lang } = initCommon({ onLangChange: renderInfoCopy });
renderInfoCopy(lang);

function renderInfoCopy(langCode) {
  const safeLang = langCode === 'en' ? 'en' : 'fr';
  const copy = INFO_COPY[safeLang];
  if (!copy) {
    return;
  }

  setText('infoProjectTitle', copy.projectTitle);
  setText('infoProjectParagraph1', copy.projectParagraph1);
  setText('infoProjectParagraph2', copy.projectParagraph2);
  setText('infoAcknowledgmentsTitle', copy.acknowledgmentsTitle);
  setText('infoAcknowledgmentsParagraph1', copy.acknowledgmentsParagraph1);
  setText('infoAcknowledgmentsParagraph2', copy.acknowledgmentsParagraph2);
  setText('infoAcknowledgmentsParagraph3', copy.acknowledgmentsParagraph3);
  setText('infoAcknowledgmentsParagraph4', copy.acknowledgmentsParagraph4);
  setText('infoSourcesTitle', copy.sourcesTitle);
  setText('infoSourcesIntro', copy.sourcesIntro);
}

function setText(id, value) {
  const node = document.getElementById(id);
  if (!node || typeof value !== 'string') {
    return;
  }
  node.textContent = value;
}
