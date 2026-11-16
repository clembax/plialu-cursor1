import { PROJECTS } from '../../projects';

export type PageKey =
  | 'home'
  | 'expertises'
  | 'solutions'
  | 'solutions-temporaire'
  | 'etancheite'
  | 'goutte-eau-extrudee'
  | 'contact'
  | 'projects'
  | 'a-propos'
  | 'ressources'
  | 'ressource-1'
  | 'ressource-2'
  | 'ressource-3'
  | 'solution-bardage'
  | 'solution-enduit'
  | 'solution-precadres'
  | 'solution-toles'
  | 'solution-ravalement'
  | 'merci'
  | 'mentions-legales'
  | 'politique-confidentialite';

export const SEO_CONFIG: Record<PageKey, { path: string; title: string; desc: string; noindex?: boolean }> = {
  'home': { path: '/', title: "Solutions métalliques sur mesure pour l'enveloppe du bâtiment", desc: "Solutions métalliques sur mesure pour l'enveloppe du bâtiment : pliage, thermolaquage Qualicoat et assemblage près de Lyon, pour architectes et façadiers." },
  'expertises': { path: '/expertises', title: 'Fabrication de pièces métalliques sur mesure | PLIALU', desc: "Fabrication de pièces métalliques sur mesure : bureau d'études, déroulage, thermolaquage Qualicoat, pliage et assemblage dans nos ateliers près de Lyon." },
  'solutions': { path: '/solutions-hub', title: 'Solutions métalliques pour l\'enveloppe du bâtiment | PLIALU', desc: 'Solutions métalliques enveloppe bâtiment : bardage, ITE, cassettes, précadres. Profilés aluminium sur mesure, thermolaquage QUALICOAT inclus.', noindex: true },
  'solutions-temporaire': { path: '/solutions', title: 'Profilés et accessoires aluminium pour façade | PLIALU', desc: 'Profilés et accessoires aluminium pour façade : enduit mince sur isolant, bardage, ravalement, précadres, étanchéité, MOB. Fiches techniques en PDF.' },
  'etancheite': {
    path: '/solutions/etancheite',
    title: 'Solutions d’Étanchéité Métallique',
    desc: 'Couvertines, bavettes et protections d’ouvrage pour toits plats. Fabrication sur mesure en métal prélaqué avec finitions durables pour une étanchéité parfaite des bâtiments industriels et collectifs.',
    noindex: true,
  },
  'goutte-eau-extrudee': {
    path: '/goutte-eau-extrudee',
    title: "Goutte d'eau extrudée pour nez de dalle | PLIALU",
    desc: "Goutte d'eau en aluminium extrudé pour nez de dalle et rive de balcon. Angles monoblocs, éclisses, laquage RAL dans nos ateliers. Demande de commande en ligne.",
  },
  'projects': { path: '/portfolio', title: 'Réalisations de façades en aluminium | PLIALU', desc: `${PROJECTS.length} réalisations de façades en aluminium à Grenoble, Lyon, Annecy et Meylan : cassettes, précadres, habillages. Projets menés avec architectes et façadiers.` },
  'a-propos': { path: '/a-propos', title: 'Façonnage métallique près de Lyon | PLIALU', desc: "PLIALU, entreprise de façonnage métallique près de Lyon : usine intégrée de 7 000 m², 20 ans d'expertise en Rhône-Alpes, thermolaquage certifié Qualicoat." },
  'ressources': { path: '/ressources', title: 'Ressources techniques — Enveloppe du bâtiment | PLIALU', desc: 'Dossiers techniques et guides pratiques PLIALU pour vos choix de matériaux et conceptions de façades métalliques.', noindex: true },
  'ressource-1': { path: '/ressources/choix-metal-facade', title: 'Quel métal choisir pour une façade extérieure ? | PLIALU', desc: 'Aluminium, acier ou inox pour une façade extérieure : comparatif technique, comportement aux UV, corrosion et contraintes chantier. Guide prescripteurs.', noindex: true },
  'ressource-2': { path: '/ressources/pliage-aluminium-tolerances', title: 'Pliage aluminium : limites et tolérances | PLIALU', desc: 'Pliage aluminium : épaisseurs, rayons mini, tolérances ±0,3 mm. Ce que votre fabricant doit maîtriser avant de démarrer la production.', noindex: true },
  'ressource-3': { path: '/ressources/thermolaquage-qualicoat', title: 'Thermolaquage certifié QUALICOAT : garanties | PLIALU', desc: 'Thermolaquage certifié QUALICOAT : protocoles de validation, classes de poudres, post-laquage après façonnage. Ce qu\'un prescripteur doit exiger.', noindex: true },
  'contact': { path: '/contact', title: 'Contact & Devis | PLIALU', desc: 'Contactez le bureau d\'études PLIALU pour votre projet de façonnage métallique sur mesure. Réponse sous 48h.', noindex: true },
  'mentions-legales': { path: '/mentions-legales', title: 'Mentions légales | PLIALU', desc: 'Mentions légales du site PLIALU : éditeur, directeur, hébergeur et responsabilité.', noindex: true },
  'politique-confidentialite': { path: '/politique-confidentialite', title: 'Politique de confidentialité | PLIALU', desc: 'Politique de confidentialité PLIALU : protection des données, RGPD, droits utilisateur.', noindex: true },
  'solution-bardage': { path: '/solutions/bardages-cassettes', title: 'Bardages & Cassettes sur mesure | PLIALU', desc: 'Fabrication de bardages et cassettes métalliques pour habillage de façade.', noindex: true },
  'solution-enduit': { path: '/solutions/enduit-mince-isolant', title: 'Profilés pour Enduit Mince sur Isolant (ITE) | PLIALU', desc: 'Accessoires et profilés aluminium sur mesure pour systèmes d\'Isolation Thermique par l\'Extérieur (ITE).', noindex: true },
  'solution-precadres': { path: '/solutions/precadres', title: 'Précadres métalliques sur mesure | PLIALU', desc: 'Fabrication de précadres d\'habillage de baies sur mesure en aluminium et acier.', noindex: true },
  'solution-toles': { path: '/solutions/toles-prelaquees', title: 'Tôles prélaquées & Thermolaquage | PLIALU', desc: 'Tôles aluminium et acier prélaquées. Service de thermolaquage QUALICOAT intégré.', noindex: true },
  'solution-ravalement': { path: '/solutions/ravalement-facade', title: 'Solutions métalliques pour ravalement de façade | PLIALU', desc: 'Habillages et profilés métalliques sur mesure pour la rénovation et le ravalement de façades.', noindex: true },
  'merci': { path: '/merci', title: 'Demande envoyée | PLIALU', desc: 'Votre demande de devis a bien été envoyée à notre bureau d\'études.', noindex: true }
};

export const BLOCKED_PAGE_KEYS = new Set([
  'solution-bardage',
  'solution-enduit',
  'solution-precadres',
  'solution-toles',
  'solution-ravalement',
  'etancheite',
  'solutions',
  'ressources',
  'ressource-1',
  'ressource-2',
  'ressource-3',
]);
