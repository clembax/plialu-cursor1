import { PROJECTS, buildPortfolioJsonLd } from '../../projects';

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
  | 'politique-confidentialite'
  | 'not-found';

export const SITE_ORIGIN = 'https://plialu.fr';

export const DEFAULT_OG_IMAGE =
  'https://res.cloudinary.com/dyiup6v5x/image/upload/c_fill,w_1200,h_630,f_jpg,q_auto/v1771414327/Hero-1200px_vuuw2q.webp';

const GOUTTE_OG_IMAGE =
  'https://res.cloudinary.com/dyiup6v5x/image/upload/c_crop,x_0,y_233,w_2247,h_2025/a_hflip/c_fill,w_1200,h_630,f_jpg,q_auto/v1794245866/profil_piyucu.webp';

const LASTMOD = '2026-11-16';

type SeoEntry = {
  path: string;
  title: string;
  desc: string;
  noindex?: boolean;
  ogImage?: string;
  lastmod?: string;
};

export const SEO_CONFIG: Record<PageKey, SeoEntry> = {
  'home': { path: '/', title: "Solutions métalliques sur mesure pour l'enveloppe du bâtiment", desc: "Solutions métalliques sur mesure pour l'enveloppe du bâtiment : pliage, thermolaquage Qualicoat et assemblage près de Lyon, pour architectes et façadiers.", lastmod: LASTMOD },
  'expertises': { path: '/expertises', title: 'Fabrication de pièces métalliques sur mesure | PLIALU', desc: "Fabrication de pièces métalliques sur mesure : bureau d'études, déroulage, thermolaquage Qualicoat, pliage et assemblage dans nos ateliers près de Lyon.", lastmod: LASTMOD },
  'solutions': { path: '/solutions-hub', title: 'Solutions métalliques pour l\'enveloppe du bâtiment | PLIALU', desc: 'Solutions métalliques enveloppe bâtiment : bardage, ITE, cassettes, précadres. Profilés aluminium sur mesure, thermolaquage QUALICOAT inclus.', noindex: true },
  'solutions-temporaire': { path: '/solutions', title: 'Profilés et accessoires aluminium pour façade | PLIALU', desc: 'Profilés et accessoires aluminium pour façade : enduit mince sur isolant, bardage, ravalement, précadres, étanchéité, MOB. Fiches techniques en PDF.', lastmod: LASTMOD },
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
    ogImage: GOUTTE_OG_IMAGE,
    lastmod: LASTMOD,
  },
  'projects': { path: '/portfolio', title: 'Réalisations de façades en aluminium | PLIALU', desc: `${PROJECTS.length} réalisations de façades en aluminium à Grenoble, Lyon, Annecy et Meylan : cassettes, précadres, habillages. Projets menés avec architectes et façadiers.`, lastmod: LASTMOD },
  'a-propos': { path: '/a-propos', title: 'Façonnage métallique près de Lyon | PLIALU', desc: "PLIALU, entreprise de façonnage métallique près de Lyon : usine intégrée de 7 000 m², 20 ans d'expertise en Rhône-Alpes, thermolaquage certifié Qualicoat.", lastmod: LASTMOD },
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
  'merci': { path: '/merci', title: 'Demande envoyée | PLIALU', desc: 'Votre demande de devis a bien été envoyée à notre bureau d\'études.', noindex: true },
  'not-found': { path: '/404', title: 'Page introuvable | PLIALU', desc: 'Cette adresse ne correspond à aucune page du site PLIALU.', noindex: true }
};

export function pathToPageKey(pathname: string): PageKey | null {
  const normalized = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const match = (Object.keys(SEO_CONFIG) as PageKey[]).find(
    (key) => key !== 'not-found' && SEO_CONFIG[key].path === normalized
  );
  return match ?? null;
}

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

export const PRERENDER_ROUTES: { pageKey: PageKey; path: string }[] = [
  { pageKey: 'home', path: '/' },
  { pageKey: 'expertises', path: '/expertises' },
  { pageKey: 'solutions-temporaire', path: '/solutions' },
  { pageKey: 'projects', path: '/portfolio' },
  { pageKey: 'a-propos', path: '/a-propos' },
  { pageKey: 'goutte-eau-extrudee', path: '/goutte-eau-extrudee' },
  { pageKey: 'contact', path: '/contact' },
  { pageKey: 'merci', path: '/merci' },
  { pageKey: 'mentions-legales', path: '/mentions-legales' },
  { pageKey: 'politique-confidentialite', path: '/politique-confidentialite' },
  { pageKey: 'not-found', path: '/404' },
];

export type HeadMeta = { kind: 'meta'; name?: string; property?: string; content: string };
export type HeadLink = { kind: 'link'; rel: string; href: string };
export type HeadJsonLd = { kind: 'jsonld'; id: string; json: unknown };
export type HeadTitle = { kind: 'title'; text: string };
export type HeadTag = HeadTitle | HeadMeta | HeadLink | HeadJsonLd;

const ORG_PAGES = new Set<PageKey>(['home', 'a-propos', 'contact']);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function publicUrl(pathname: string): string {
  if (pathname === '/' || pathname === '') return `${SITE_ORIGIN}/`;
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const trimmed = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  return `${SITE_ORIGIN}${trimmed}`;
}

function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'PLIALU',
    legalName: 'PLIALU',
    url: SITE_ORIGIN,
    logo: 'https://res.cloudinary.com/dyiup6v5x/image/upload/f_png,w_512/v1771582466/Logo_Noir_Plialu_ywbl2o.svg',
    image: DEFAULT_OG_IMAGE,
    telephone: '+33 4 78 08 93 70',
    email: 'commercial@plialu.fr',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Technoparc Saône Vallée Ouest, 150 Route Copernic',
      postalCode: '01390',
      addressLocality: 'Civrieux',
      addressCountry: 'FR',
      addressRegion: 'Auvergne-Rhône-Alpes',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '07:30',
        closes: '16:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '07:30',
        closes: '12:00',
      },
    ],
    sameAs: ['https://www.linkedin.com/company/plialu'],
    vatID: 'FR79498363001',
    areaServed: 'Auvergne-Rhône-Alpes',
    description: SEO_CONFIG.home.desc,
  };
}

export function pageHead(pageKey: PageKey, pathname: string): HeadTag[] {
  const config = SEO_CONFIG[pageKey];
  const url = publicUrl(pathname);
  const image = config.ogImage ?? DEFAULT_OG_IMAGE;
  const tags: HeadTag[] = [
    { kind: 'title', text: config.title },
    { kind: 'meta', name: 'description', content: config.desc },
    { kind: 'meta', name: 'robots', content: config.noindex ? 'noindex, follow' : 'index, follow' },
    { kind: 'link', rel: 'canonical', href: url },
    { kind: 'meta', property: 'og:title', content: config.title },
    { kind: 'meta', property: 'og:description', content: config.desc },
    { kind: 'meta', property: 'og:url', content: url },
    { kind: 'meta', property: 'og:type', content: 'website' },
    { kind: 'meta', property: 'og:locale', content: 'fr_FR' },
    { kind: 'meta', property: 'og:site_name', content: 'PLIALU' },
    { kind: 'meta', property: 'og:image', content: image },
    { kind: 'meta', property: 'og:image:width', content: '1200' },
    { kind: 'meta', property: 'og:image:height', content: '630' },
    { kind: 'meta', name: 'twitter:card', content: 'summary_large_image' },
  ];

  if (ORG_PAGES.has(pageKey)) {
    tags.push({ kind: 'jsonld', id: 'ld-org', json: localBusinessJsonLd() });
  }
  if (pageKey === 'projects') {
    tags.push({
      kind: 'jsonld',
      id: 'ld-portfolio',
      json: buildPortfolioJsonLd(PROJECTS, SITE_ORIGIN, SEO_CONFIG.projects.title),
    });
  }
  return tags;
}

export function jsonLdPayload(json: unknown): string {
  return JSON.stringify(json).replace(/</g, '\\u003c');
}

export function buildHead(pageKey: PageKey, pathname: string): string {
  return pageHead(pageKey, pathname).map((tag) => {
    if (tag.kind === 'title') return `    <title>${escapeHtml(tag.text)}</title>`;
    if (tag.kind === 'meta' && tag.name) {
      return `    <meta name="${escapeHtml(tag.name)}" content="${escapeHtml(tag.content)}" />`;
    }
    if (tag.kind === 'meta' && tag.property) {
      return `    <meta property="${escapeHtml(tag.property)}" content="${escapeHtml(tag.content)}" />`;
    }
    if (tag.kind === 'link') {
      return `    <link rel="${escapeHtml(tag.rel)}" href="${escapeHtml(tag.href)}" />`;
    }
    if (tag.kind === 'jsonld') {
      return `    <script id="${tag.id}" type="application/ld+json">${jsonLdPayload(tag.json)}</script>`;
    }
    return '';
  }).join('\n');
}

export function sitemapEntries(): { loc: string; lastmod: string }[] {
  return PRERENDER_ROUTES.flatMap((route) => {
    const entry = SEO_CONFIG[route.pageKey];
    if (entry.noindex || !entry.lastmod) return [];
    return [{ loc: publicUrl(route.path), lastmod: entry.lastmod }];
  });
}
