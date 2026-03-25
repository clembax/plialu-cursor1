import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Fix: Use 'declare global' to augment the JSX namespace globally.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        icon?: string;
        width?: string | number;
        height?: string | number;
        flip?: string;
        rotate?: string | number;
        mode?: string;
        inline?: boolean;
        stroke?: string;
        'stroke-width'?: string | number;
      }, HTMLElement>;
      [key: string]: any;
    }
  }
}

import TerritorialMap from './TerritorialMap';
import Success from './Success';
import EnduitMinceIsolant from './src/components/solutions/EnduitMinceIsolant';
import Etancheite from './components/Etancheite';

const SEO_CONFIG: Record<string, { path: string; title: string; desc: string; noindex?: boolean }> = {
  'home': { path: '/', title: 'Façonnage métallique sur mesure en Rhône-Alpes | PLIALU', desc: 'Façonnage métallique sur mesure en Rhône-Alpes. Bureau d\'études intégré, pliage CNC, thermolaquage certifié QUALICOAT. Devis technique sous 48h.' },
  'expertises': { path: '/expertises', title: 'Process industriel & Fabrication métallique sur mesure | PLIALU', desc: 'Fabrication de pièces métalliques sur mesure : étude DXF, déroulage, pliage grande longueur, thermolaquage QUALICOAT. Parc machine intégré pour un contrôle qualité absolu.' },
  'solutions': { path: '/solutions', title: 'Solutions métalliques pour l\'enveloppe du bâtiment | PLIALU', desc: 'Solutions métalliques enveloppe bâtiment : bardage, ITE, cassettes, précadres. Profilés aluminium sur mesure, thermolaquage QUALICOAT inclus.' },
  'etancheite': {
    path: '/solutions/etancheite',
    title: 'Solutions d’Étanchéité Métallique',
    desc: 'Couvertines, bavettes et protections d’ouvrage pour toits plats. Fabrication sur mesure en métal prélaqué avec finitions durables pour une étanchéité parfaite des bâtiments industriels et collectifs.',
  },
  'projects': { path: '/portfolio', title: 'Nos réalisations — Façades aluminium et enveloppe bâtiment | PLIALU', desc: 'Découvrez les projets de façonnage métallique et profilés aluminium réalisés par PLIALU pour l\'enveloppe du bâtiment.' },
  'a-propos': { path: '/a-propos', title: 'PLIALU — Entreprise de façonnage métallique en Rhône-Alpes', desc: 'Spécialiste du façonnage métallique en Rhône-Alpes depuis 20 ans. Atelier intégré à Lyon, certification QUALICOAT, livraison chantier partout en Europe.' },
  'ressources': { path: '/ressources', title: 'Ressources techniques — Enveloppe du bâtiment | PLIALU', desc: 'Dossiers techniques et guides pratiques PLIALU pour vos choix de matériaux et conceptions de façades métalliques.' },
  'ressource-1': { path: '/ressources/choix-metal-facade', title: 'Quel métal choisir pour une façade extérieure ? | PLIALU', desc: 'Aluminium, acier ou inox pour une façade extérieure : comparatif technique, comportement aux UV, corrosion et contraintes chantier. Guide prescripteurs.' },
  'ressource-2': { path: '/ressources/pliage-aluminium-tolerances', title: 'Pliage aluminium : limites et tolérances | PLIALU', desc: 'Pliage aluminium : épaisseurs, rayons mini, tolérances ±0,3 mm. Ce que votre fabricant doit maîtriser avant de démarrer la production.' },
  'ressource-3': { path: '/ressources/thermolaquage-qualicoat', title: 'Thermolaquage certifié QUALICOAT : garanties | PLIALU', desc: 'Thermolaquage certifié QUALICOAT : protocoles de validation, classes de poudres, post-laquage après façonnage. Ce qu\'un prescripteur doit exiger.' },
  'contact': { path: '/contact', title: 'Contact & Devis | PLIALU', desc: 'Contactez le bureau d\'études PLIALU pour votre projet de façonnage métallique sur mesure. Réponse sous 48h.', noindex: true },
  'solution-bardage': { path: '/solutions/bardages-cassettes', title: 'Bardages & Cassettes sur mesure | PLIALU', desc: 'Fabrication de bardages et cassettes métalliques pour habillage de façade.' },
  'solution-enduit': { path: '/solutions/enduit-mince-isolant', title: 'Profilés pour Enduit Mince sur Isolant (ITE) | PLIALU', desc: 'Accessoires et profilés aluminium sur mesure pour systèmes d\'Isolation Thermique par l\'Extérieur (ITE).' },
  'solution-precadres': { path: '/solutions/precadres', title: 'Précadres métalliques sur mesure | PLIALU', desc: 'Fabrication de précadres d\'habillage de baies sur mesure en aluminium et acier.' },
  'solution-toles': { path: '/solutions/toles-prelaquees', title: 'Tôles prélaquées & Thermolaquage | PLIALU', desc: 'Tôles aluminium et acier prélaquées. Service de thermolaquage QUALICOAT intégré.' },
  'solution-ravalement': { path: '/solutions/ravalement-facade', title: 'Solutions métalliques pour ravalement de façade | PLIALU', desc: 'Habillages et profilés métalliques sur mesure pour la rénovation et le ravalement de façades.' },
  'merci': { path: '/merci', title: 'Demande envoyée | PLIALU', desc: 'Votre demande de devis a bien été envoyée à notre bureau d\'études.', noindex: true }
};

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [caeSlide, setCaeSlide] = useState(0);
  const [zentoSlide, setZentoSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState<
    | 'home'
    | 'expertises'
    | 'solutions'
    | 'etancheite'
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
  >('home');
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<{ src: string; srcset?: string; alt?: string } | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formFileError, setFormFileError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [solutionsAccordionOpen, setSolutionsAccordionOpen] = useState<string | null>(null);
  const [activeSolutionHover, setActiveSolutionHover] = React.useState(0);
  const [isSommaireSticky, setIsSommaireSticky] = useState(false);

  // Initialisation au montage : lit l'URL pour afficher la bonne page si accès direct (ex: F5)
  useEffect(() => {
    const currentPath = window.location.pathname;
    const matchingKey = Object.keys(SEO_CONFIG).find(key => SEO_CONFIG[key].path === currentPath);
    if (matchingKey && matchingKey !== currentPage) {
      setCurrentPage(matchingKey as any);
    }
  }, []); // Exécuté une seule fois au montage

  // Gère la mise à jour SEO et la fausse URL lors d'un changement de page
  useEffect(() => {
    const config = SEO_CONFIG[currentPage];
    if (config) {
      document.title = config.title;
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', config.desc);

      const metaRobots = document.querySelector('meta[name="robots"]');
      if (metaRobots) metaRobots.setAttribute('content', config.noindex ? 'noindex, follow' : 'index, follow');

      const updateOrCreateTag = (selector: string, createNode: () => HTMLElement) => {
        let el = document.querySelector(selector) as HTMLElement | null;
        if (!el) {
          el = createNode();
          document.head.appendChild(el);
        }
        return el;
      };

      const currentUrl = window.location.origin + config.path;

      const ogTitleEl = updateOrCreateTag('meta[property="og:title"]', () => {
        const el = document.createElement('meta');
        el.setAttribute('property', 'og:title');
        return el;
      });
      ogTitleEl.setAttribute('content', config.title);

      const ogDescEl = updateOrCreateTag('meta[property="og:description"]', () => {
        const el = document.createElement('meta');
        el.setAttribute('property', 'og:description');
        return el;
      });
      ogDescEl.setAttribute('content', config.desc);

      const ogTypeEl = updateOrCreateTag('meta[property="og:type"]', () => {
        const el = document.createElement('meta');
        el.setAttribute('property', 'og:type');
        return el;
      });
      ogTypeEl.setAttribute('content', 'website');

      const ogUrlEl = updateOrCreateTag('meta[property="og:url"]', () => {
        const el = document.createElement('meta');
        el.setAttribute('property', 'og:url');
        return el;
      });
      ogUrlEl.setAttribute('content', currentUrl);

      const canonicalEl = updateOrCreateTag('link[rel="canonical"]', () => {
        const el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        return el;
      });
      canonicalEl.setAttribute('href', currentUrl);

      // Met à jour l'URL sans recharger la page
      if (window.location.pathname !== config.path) {
        window.history.pushState(null, '', config.path);
      }
    }
  }, [currentPage]);

  // Écoute le bouton "Retour/Avance" du navigateur
  useEffect(() => {
    const handlePopState = () => {
      const currentPath = window.location.pathname;
      const matchingKey = Object.keys(SEO_CONFIG).find(key => SEO_CONFIG[key].path === currentPath);
      if (matchingKey) {
        setCurrentPage(matchingKey as any);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const contactFormRef = React.useRef<HTMLFormElement>(null);
  const teaserVideoRef = React.useRef<HTMLVideoElement>(null);
  const expertisesVideoRef = React.useRef<HTMLVideoElement>(null);
  const sommaireRef = useRef<HTMLDivElement>(null);
  const expertisesHeroRef = useRef<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Header Theme: 'dark' = light header bar (dark logo/menu) for contrast on light backgrounds (Expertises, Solutions, Ressources, Contact, Articles, Merci)
  const headerTheme =
    currentPage === 'expertises' ||
    currentPage === 'solutions' ||
    currentPage === 'solution-bardage' ||
    currentPage === 'solution-precadres' ||
    currentPage === 'solution-toles' ||
    currentPage === 'solution-ravalement' ||
    currentPage === 'ressources' ||
    currentPage === 'ressource-1' ||
    currentPage === 'ressource-2' ||
    currentPage === 'ressource-3' ||
    currentPage === 'contact' ||
    currentPage === 'merci'
      ? 'dark'
      : 'light';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    if (currentPage) {
      window.scrollTo(0, 0);
    }
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    // Livre Blanc: force body light background on the 3 resource article pages only
    const isArticlePage = currentPage === 'ressource-1' || currentPage === 'ressource-2' || currentPage === 'ressource-3';
    if (isArticlePage) {
      document.body.style.backgroundColor = '#FFFFFF';
      document.body.style.color = '#1F2937';
    } else {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    }
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, [currentPage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeImage) {
          setActiveImage(null);
        } else {
          setSelectedProjectId(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDownRef.current = true;
      startXRef.current = e.pageX - el.offsetLeft;
      scrollLeftRef.current = el.scrollLeft;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDownRef.current) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startXRef.current) * 1.5;
      el.scrollLeft = scrollLeftRef.current - walk;
    };

    const stopDragging = () => {
      isDownRef.current = false;
    };

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseup', stopDragging);
    el.addEventListener('mouseleave', stopDragging);

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseup', stopDragging);
      el.removeEventListener('mouseleave', stopDragging);
    };
  }, [currentPage]);

  // Vidéo Teaser / Expertises : lecture au scroll (Intersection Observer)
  useEffect(() => {
    const videoEl = currentPage === 'home' ? teaserVideoRef.current : currentPage === 'expertises' ? expertisesVideoRef.current : null;
    if (!videoEl) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.play().catch(() => {});
          } else {
            videoEl.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(videoEl);
    return () => observer.disconnect();
  }, [currentPage]);

  useEffect(() => {
    const handleSommaireScroll = () => {
      if (currentPage !== 'expertises') {
        setIsSommaireSticky(false);
        return;
      }
      const heroBottom = expertisesHeroRef.current?.getBoundingClientRect().bottom ?? 0;
      setIsSommaireSticky(heroBottom <= 64);
    };

    window.addEventListener('scroll', handleSommaireScroll);
    handleSommaireScroll();

    return () => {
      window.removeEventListener('scroll', handleSommaireScroll);
    };
  }, [currentPage]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 Mo
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setFormFileError(null);
    const form = contactFormRef.current;
    if (!form) return;

    const fileInput = form.querySelector<HTMLInputElement>('input[name="upload"]');
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setFormFileError("Fichier trop lourd (Max 10 Mo). Pour vos plans volumineux, utilisez un lien WeTransfer dans le message ou nous contacter par mail directement.");
        return;
      }
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setFormSubmitting(true);
    try {
      const formData = new FormData(form);
      const res = await fetch('https://formspree.io/f/mwvrvrqg', { method: 'POST', body: formData });
      await res.json().catch(() => ({}));
      if (res.ok) {
        setCurrentPage('merci');
      } else {
        setFormError("Erreur lors de l'envoi. Vérifiez la taille du fichier (Max 10Mo) ou contactez-nous par téléphone.");
      }
    } catch {
      setFormError("Erreur lors de l'envoi. Vérifiez la taille du fichier (Max 10Mo) ou contactez-nous par téléphone.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const solutions = [
    {
      title: "Enveloppe & habillage de façade",
      text: "Façonnage métallique pour l’enveloppe bâtiment : cassettes, couvertines et habillages en aluminium thermolaqué, acier galvanisé ou inox.",
      img: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771515763/Solutions-enveloppe-1200px_guufmy.webp",
      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771515763/Solutions-enveloppe-800px_ryxzuy.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771515763/Solutions-enveloppe-1200px_guufmy.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771515763/Solutions-enveloppe-1600px_s0cwua.webp 1600w",
      sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px",
      alt: "Bavettes et habillage métallique de façade",
      tag: "ENVELOPPE BÂTIMENT",
      materials: "Aluminium thermolaqué • Acier galvanisé • Inox"
    },
    {
      title: "Supports & structures métalliques",
      text: "Structures et supports en acier galvanisé conçus pour assurer la stabilité, la précision de fixation et la compatibilité avec l’enveloppe.",
      img: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771515264/Solutions2-1200px_cqiecv.webp",
      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771515264/Solutions2-800px_sk5bjv.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771515264/Solutions2-1200px_cqiecv.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771515264/Solutions2-1600px_xrns19.webp 1600w",
      sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px",
      alt: "Support métallique de couvertine façonné sur mesure en atelier",
      tag: "INFRASTRUCTURE",
      materials: "Acier galvanisé • Acier structurel • Inox"
    },
    {
      title: "Accessoires & finitions",
      text: "Profilés et pièces prêtes à poser en aluminium, acier galvanisé or inox pour sécuriser et accélérer la mise en œuvre.",
      img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2069",
      alt: "Profilés métalliques industriels en série",
      tag: "OPTIMISATION CHANTIER",
      materials: "Aluminium • Acier galvanisé • Inox"
    }
  ];

  const homeSolutionsList = [
    { id: '01', title: "Bardages & cassettes", image: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773147911/Placeholder-Dark_xe7she.webp" },
    { id: '02', title: "Enduit mince sur isolant", image: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773147911/Placeholder-Dark_xe7she.webp" },
    { id: '03', title: "Précadres", image: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773147911/Placeholder-Dark_xe7she.webp" },
    { id: '04', title: "Tôles prélaquées", image: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773147911/Placeholder-Dark_xe7she.webp" },
    { id: '05', title: "Ravalement de façade", image: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773147911/Placeholder-Dark_xe7she.webp" },
    {
      id: '06',
      title: "Étanchéité",
      description: "Modèle d'étanchéité sur toit plat",
      image: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773147911/Placeholder-Dark_xe7she.webp",
    }
  ];

  const expertisesDetails = [
    {
      id: "bureau-etudes",
      title: "Bureau d’études",
      tag: "ÉTUDE & OPTIMISATION",
      text: "Analyse critique de vos plans DXF/DWG, optimisation des calepinages et validation des tolérances fabrication métal sur mesure pour une production sans erreur. Nos ingénieurs valident la faisabilité technique de chaque pliage complexe en anticipant les contraintes fabrication pièces métalliques.",
      img: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773074223/BE-1200px_nzpfpj.webp",
      alt: "Bureau d'études technique Plialu - Optimisation de plans DXF et calcul de pliage",
      materials: "AutoCAD • SolidWorks • Optimisation DXF",
      light: true
    },
    {
      id: "deroulage-mise-format",
      title: "Déroulage",
      tag: "PRÉPARATION MATIÈRE",
      text: "Transformation des bobines en formats plats via nos lignes de refendage et cisaillage. Une maîtrise totale de la planéité, critère indispensable pour les façades haut de gamme et les cassettes aluminium.",
      img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2070",
      alt: "Stock de bobines et centre de déroulage industriel",
      materials: "Acier • Aluminium • Inox jusqu'à 4mm",
      light: false
    },
    {
      id: "thermolaquage-plat",
      title: "Thermolaquage",
      tag: "TRAITEMENT DE SURFACE",
      text: "Application automatisée de peinture poudre polyester sur formats plats avant pliage. Ce process garantit un rendu homogène, sans coulures, et une durabilité accrue certifiée Qualicoat conforme aux exigences du bâtiment.",
      img: "https://images.unsplash.com/photo-1534398079244-67c8ad85931b?q=80&w=2070",
      alt: "Ligne de thermolaquage automatisée pour panneaux métalliques",
      materials: "Certifié Qualicoat • Poudre Polyester",
      light: true
    },
    {
      id: "pliage-automatise",
      title: "Pliage",
      tag: "MISE EN FORME",
      text: "Nos centres de pliage robotisés et presses plieuses grande longueur permettent de réaliser des profils complexes avec une répétabilité absolue. Capacité de pliage jusqu'à 4 mètres pour vos couvertines et bavettes.",
      img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070",
      alt: "Presse plieuse numérique grande longueur en action",
      materials: "Grande longueur jusqu'à 4 m • Robotique",
      light: false
    },
    {
      id: "assemblage-finitions",
      title: "Assemblage",
      tag: "VALEUR AJOUTÉE",
      text: "Rivetage haute résistance, collage structurel certifié et pose d'accessoires (joint, mousse). Nos livrons des ensembles complets prêts à poser pour accélérer vos cadences de montage sur site.",
      img: "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=2070",
      alt: "Poste d'assemblage et de rivetage technique",
      materials: "Collage • Rivetage • Pose de raidisseurs",
      light: true
    },
    {
      id: "logistique-expedition",
      title: "Logistique",
      tag: "SÉCURITÉ CHANTIER",
      text: "Conditionnement rigoureux sur palettes sur-mesure pour prévenir toute de formation. Nous assurons la traçabilité et le respect des flux tendus pour livrer vos chantiers partout en Europe dans les délais convenus.",
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070",
      alt: "Expédition sécurisée de panneaux métalliques protégés",
      materials: "Protection UV • Logistique Europe",
      light: false
    }
  ];

  return (
    <div className="font-manrope selection-brand min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'h-20' : 'h-24'}`}>
        <div 
          className={`absolute inset-0 border-b backdrop-blur-md pointer-events-none transition-opacity duration-500 
            ${headerTheme === 'dark' ? 'bg-[#F0F4F6]/90 border-zinc-200' : 'bg-[#050E12]/90 border-white/5'} 
            ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex-none">
            <button onClick={() => setCurrentPage('home')} className="flex items-center gap-3 group outline-none h-12">
              <img 
                src={headerTheme === 'dark' 
                  ? "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771582466/Logo_Noir_Plialu_ywbl2o.svg" 
                  : "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771582757/Logo_Blanc_Plialu_ssatk6.svg"
                } 
                alt="PLIALU" 
                className="h-6 md:h-7 transition-all duration-300 scale-[1.3] origin-left"
              />
            </button>
          </div>

          {/* Center: Navigation Menu */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1 p-1.5 rounded-full border transition-all duration-300
            ${headerTheme === 'dark' ? 'bg-[#0E2A33]/5 border-black/10' : 'bg-white/5 border-white/5'}">
            <button 
              onClick={() => setCurrentPage('home')} 
              className={`text-xs font-semibold px-5 py-2 rounded-full transition-all 
                ${currentPage === 'home' 
                  ? (headerTheme === 'dark' ? 'text-[#0E2A33] bg-[#0E2A33]/10' : 'text-white bg-white/10')
                  : (headerTheme === 'dark' ? 'text-[#0E2A33]/60 hover:text-[#0E2A33] hover:bg-black/5' : 'text-zinc-400 hover:text-white hover:bg-white/5')
                }`}
            >
              Accueil
            </button>
            <button 
onClick={() => { setCurrentPage('expertises'); if (window.location.hash) window.history.replaceState(null, '', window.location.pathname + window.location.search || '#'); }}
              className={`text-xs font-semibold px-5 py-2 rounded-full transition-all
                ${currentPage === 'expertises'
                  ? (headerTheme === 'dark' ? 'text-[#0E2A33] bg-[#0E2A33]/10' : 'text-white bg-white/10')
                  : (headerTheme === 'dark' ? 'text-[#0E2A33]/60 hover:text-[#0E2A33] hover:bg-black/5' : 'text-zinc-400 hover:text-white hover:bg-white/5')
                }`}
            >
              Expertises
            </button>
            <button
              onClick={() => setCurrentPage('solutions')}
              className={`text-xs font-semibold px-5 py-2 rounded-full transition-all
                ${
                  currentPage === 'solutions' ||
                  currentPage === 'solution-bardage' ||
                  currentPage === 'solution-enduit' ||
                  currentPage === 'solution-precadres' ||
                  currentPage === 'solution-toles' ||
                  currentPage === 'solution-ravalement'
                    ? headerTheme === 'dark'
                      ? 'text-[#0E2A33] bg-[#0E2A33]/10'
                      : 'text-white bg-white/10'
                    : headerTheme === 'dark'
                      ? 'text-[#0E2A33]/60 hover:text-[#0E2A33] hover:bg-black/5'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
            >
              Solutions
            </button>
            <button 
              onClick={() => setCurrentPage('projects')} 
              className={`text-xs font-semibold px-5 py-2 rounded-full transition-all 
                ${currentPage === 'projects' 
                  ? (headerTheme === 'dark' ? 'text-[#0E2A33] bg-[#0E2A33]/10' : 'text-white bg-white/10')
                  : (headerTheme === 'dark' ? 'text-[#0E2A33]/60 hover:text-[#0E2A33] hover:bg-black/5' : 'text-zinc-400 hover:text-white hover:bg-white/5')
                }`}
            >
              Portfolio
            </button>
            <button 
              onClick={() => setCurrentPage('ressources')} 
              className={`text-xs font-semibold px-5 py-2 rounded-full transition-all
                ${currentPage === 'ressources'
                  ? (headerTheme === 'dark' ? 'text-[#0E2A33] bg-[#0E2A33]/10' : 'text-white bg-white/10')
                  : (headerTheme === 'dark' ? 'text-[#0E2A33]/60 hover:text-[#0E2A33] hover:bg-black/5' : 'text-zinc-400 hover:text-white hover:bg-white/5')
                }`}
            >
              Ressources
            </button>
            <button 
              onClick={() => setCurrentPage('a-propos')} 
              className={`text-xs font-semibold px-5 py-2 rounded-full transition-all
                ${currentPage === 'a-propos'
                  ? (headerTheme === 'dark' ? 'text-[#0E2A33] bg-black/10' : 'text-white bg-white/10')
                  : (headerTheme === 'dark' ? 'text-[#0E2A33]/60 hover:text-[#0E2A33] hover:bg-black/5' : 'text-zinc-400 hover:text-white hover:bg-white/5')
                }`}
            >
              À propos
            </button>
            <button 
              onClick={() => setCurrentPage('contact')} 
              className={`text-xs font-semibold px-5 py-2 rounded-full transition-all
                ${currentPage === 'contact' 
                  ? (headerTheme === 'dark' ? 'text-[#0E2A33] bg-[#0E2A33]/10' : 'text-white bg-white/10')
                  : (headerTheme === 'dark' ? 'text-[#0E2A33]/60 hover:text-[#0E2A33] hover:bg-black/5' : 'text-zinc-400 hover:text-white hover:bg-white/5')
                }`}
            >
              Contact
            </button>
          </div>

          {/* Right: CTA Button */}
          <div className="flex-none flex items-center gap-4">
            <button onClick={() => currentPage !== 'contact' && setCurrentPage('contact')} className="hidden md:flex text-xs font-bold bg-[#E2FD48] text-black px-6 py-3 rounded-full hover:bg-[#d4ed3f] transition-all tracking-tight shadow-[0_0_30px_rgba(226,253,72,0.15)]">
              Demander un devis
            </button>
            <button
              type="button"
              aria-label="Ouvrir le menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg border transition-all
                ${headerTheme === 'dark' ? 'text-[#0E2A33] bg-black/5 border-black/10' : 'text-white bg-white/5 border-white/10'}`}
            >
              <iconify-icon icon="lucide:menu" width="24" stroke-width="1.5"></iconify-icon>
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile (panneau coulissant) */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={() => setIsMenuOpen(false)}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-[#071318] border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <span className="text-[10px] font-extrabold tracking-widest text-[#E2FD48] uppercase">Menu</span>
            <button
              type="button"
              aria-label="Fermer le menu"
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <iconify-icon icon="lucide:x" width="24"></iconify-icon>
            </button>
          </div>
          <nav className="flex flex-col p-6 gap-1 overflow-y-auto">
            <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="text-left py-3 px-4 rounded-xl text-white font-medium hover:bg-white/10 transition-colors">Accueil</button>
            <button onClick={() => { setCurrentPage('expertises'); setIsMenuOpen(false); if (window.location.hash) window.history.replaceState(null, '', window.location.pathname + window.location.search || '#'); }} className="text-left py-3 px-4 rounded-xl text-white font-medium hover:bg-white/10 transition-colors">Expertises</button>
            <button onClick={() => { setCurrentPage('solutions'); setIsMenuOpen(false); }} className="text-left py-3 px-4 rounded-xl text-white font-medium hover:bg-white/10 transition-colors">Solutions</button>
            <button onClick={() => { setCurrentPage('projects'); setIsMenuOpen(false); }} className="text-left py-3 px-4 rounded-xl text-white font-medium hover:bg-white/10 transition-colors">Portfolio</button>
            <button onClick={() => { setCurrentPage('ressources'); setIsMenuOpen(false); }} className="text-left py-3 px-4 rounded-xl text-white font-medium hover:bg-white/10 transition-colors">Ressources</button>
            <button onClick={() => { setCurrentPage('a-propos'); setIsMenuOpen(false); }} className="text-left py-3 px-4 rounded-xl text-white font-medium hover:bg-white/10 transition-colors">À propos</button>
            <button onClick={() => { setCurrentPage('contact'); setIsMenuOpen(false); }} className="text-left py-3 px-4 rounded-xl text-white font-medium hover:bg-white/10 transition-colors">Contact</button>
            <button onClick={() => { setCurrentPage('contact'); setIsMenuOpen(false); }} className="mt-4 py-3 px-4 rounded-xl bg-[#E2FD48] text-[#0E2A33] font-bold text-center hover:bg-[#d4ed3f] transition-colors">Demander un devis</button>
          </nav>
        </div>
      </div>

      {/* --- HOMEPAGE CONTENT --- */}
      {currentPage === 'home' && (
        <>
          {/* 1. HERO SECTION (DARK) */}
          <section className="relative w-full overflow-hidden flex items-center" style={{ minHeight: 'calc(100vh + clamp(80px, 10vh, 140px))' }}>
            <div className="absolute inset-0 z-0">
              <picture>
                <source media="(max-width: 800px)" srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/v1771414327/Hero-800px_emwjxr.webp" />
                <source media="(max-width: 1200px)" srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/v1771414327/Hero-1200px_vuuw2q.webp" />
                <img src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1771414327/Hero-1600px_zpvubh.webp" className="w-full h-full object-cover" loading="eager" alt="L'expertise métallique industrielle PLIALU" />
              </picture>
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0e2a33]/70 to-[#071318]/90"></div>
              <div className="absolute inset-x-0 bottom-0 h-full z-20 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(7, 19, 24, 0) 0%, rgba(7, 19, 24, 0.10) 60%, rgba(7, 19, 24, 0.55) 85%, #071318 100%)' }}></div>
            </div>
            <div className="relative z-30 w-full max-w-7xl mx-auto px-6 py-20">
              <div className="max-w-5xl animate-fade-up">
                <h1 className="text-4xl md:text-6xl lg:text-[clamp(2.1rem,5.5vw,4.9rem)] tracking-tighter leading-[1.15] mb-12 font-black uppercase max-w-4xl text-white">
                  EXPERT INDUSTRIEL : <br className="hidden md:block" />
                  <span className="text-[#8E9BA4]">FAÇONNAGE MÉTALLIQUE SUR MESURE</span>
                </h1>
                <p className="text-base md:text-lg text-white/80 max-w-xl leading-relaxed border-l-2 border-[#E2FD48] pl-8 mb-16 font-medium">
                  Conception, usinage et finition de solutions métalliques pour l'enveloppe du bâtiment et les projets industriels exigeants. Une chaîne de production intégrée pour garantir vos tolérances et délais.
                </p>
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button onClick={() => setCurrentPage('contact')} className="w-full sm:w-auto px-10 py-4 bg-[#E2FD48] text-[#0E2A33] text-sm font-extrabold rounded-full hover:bg-white transition-all tracking-tight shadow-[0_20px_40px_rgba(226,253,72,0.15)]">Demander un devis</button>
                    <button onClick={() => setCurrentPage('expertises')} className="w-full sm:w-auto px-10 py-4 bg-transparent border border-white/20 text-white text-sm font-bold rounded-full hover:bg-white/10 transition-all tracking-tight flex items-center justify-center gap-2 group">
                      Découvrir nos expertises
                      <iconify-icon icon="lucide:arrow-right" className="group-hover:translate-x-1 transition-transform"></iconify-icon>
                    </button>
                  </div>
                  <div className="inline-flex items-center gap-5 px-5 py-3 border border-white/10 rounded-2xl bg-white/[0.02]">
                    <div className="w-8 h-8 flex items-center justify-center shrink-0">
                       <img src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1771500844/logo_qf_kzo395.png" alt="Logo Qualicoat" className="max-w-full max-h-full object-contain brightness-0 invert opacity-80" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-[#E2FD48] tracking-[0.15em] uppercase leading-none">QUALICOAT CERTIFIÉ</span>
                      <span className="text-[8px] font-medium text-white/40 uppercase tracking-wider mt-1.5">Thermolaquage conforme aux exigences internationales</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. NOS EXPERTISES (DARK) */}
          <section id="expertise" className="pt-32 pb-10 section--dark" style={{ background: 'linear-gradient(to bottom, #071318 0%, #0b1e26 100%)' }}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-20 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <span className="text-[10px] font-extrabold tracking-[0.3em] text-[#E2FD48] uppercase">PROCESS INTÉGRÉ</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-white">Fabrication de pièces métalliques sur mesure</h2>
                  </div>
                  <p className="text-white/90 text-lg leading-relaxed font-medium">
                    De l'étude technique Bureau d'Études au pliage grande longueur, jusqu'au thermolaquage industriel certifié Qualicoat. Chaque étape de notre <strong>fabrication industrielle métal</strong> est maîtrisée en interne pour une qualité irréprochable.
                  </p>
                  <button onClick={() => setCurrentPage('expertises')} className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#E2FD48] hover:text-white transition-all group">
                    Découvrir nos expertises
                    <iconify-icon icon="lucide:arrow-right" className="group-hover:translate-x-2 transition-transform"></iconify-icon>
                  </button>
                </div>
                <div className="relative aspect-square md:aspect-video lg:aspect-square overflow-hidden rounded-3xl border border-white/10 bg-[#07161C] group">
                  <img
                    src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1771508868/Expertise-1200_rb2ubu.webp"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    alt="Opérateur réalisant la fabrication de pièces métalliques sur mesure sur presse plieuse"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section dédiée : vidéo Teaser (loop, muette, lecture au scroll) */}
          <section
            id="teaser-video"
            className="relative py-20"
            style={{ background: 'linear-gradient(to bottom, #0b1e26 0%, #071318 100%)' }}
          >
            {/* Dégradé de transition avec la section Expertises */}
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, rgba(11,30,38,0) 0%, rgba(11,30,38,0.4) 8%, #0b1e26 20%)' }}
            ></div>
            <div className="relative max-w-7xl mx-auto px-6 z-10">
              <div className="flex flex-col md:flex-row items-center gap-12">
                {/* Colonne gauche : vidéo teaser */}
                <div className="flex-1 w-full">
                  <button
                    type="button"
                    onClick={() => {
                      // Définir l'ancre pour le scroll automatique sur la page Expertises
                      window.location.hash = '#video-complete';
                      // Basculer sur la page Expertises
                      setCurrentPage('expertises');
                    }}
                    className="group w-full text-left focus:outline-none"
                  >
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 aspect-video transition-transform duration-300 group-hover:scale-[1.02] cursor-pointer">
                      {/* Overlay de survol */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/70 bg-black/60">
                            <iconify-icon icon="lucide:play" width="22" className="text-white"></iconify-icon>
                          </span>
                          <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/80">
                            Lire le teaser
                          </span>
                        </div>
                      </div>

                      {/* Vidéo */}
                      <video
                        ref={teaserVideoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        loop
                        muted
                        playsInline
                        aria-label="Teaser vidéo PLIALU"
                      >
                        <source media="(min-width: 768px)" src="https://res.cloudinary.com/dyiup6v5x/video/upload/w_1920,q_auto/v1773244558/Teaser-Plialu_lqvf75.webm" type="video/webm" />
                        <source media="(min-width: 768px)" src="https://res.cloudinary.com/dyiup6v5x/video/upload/w_1920,f_auto,q_auto/v1773244180/Teaser-Plialu_zxa8ml.mp4" type="video/mp4" />
                        <source src="https://res.cloudinary.com/dyiup6v5x/video/upload/w_768,q_auto/v1773244558/Teaser-Plialu_lqvf75.webm" type="video/webm" />
                        <source src="https://res.cloudinary.com/dyiup6v5x/video/upload/w_768,f_auto,q_auto/v1773244180/Teaser-Plialu_zxa8ml.mp4" type="video/mp4" />
                        Votre navigateur ne supporte pas la lecture de vidéos.
                      </video>
                    </div>
                  </button>
                </div>

                {/* Colonne droite : texte d'accroche */}
                <div className="max-w-xs w-full md:w-auto text-left space-y-3">
                  <span className="text-xs font-bold tracking-[0.3em] text-[#E2FD48] uppercase">
                    VISITE D'USINE
                  </span>
                  <h3 className="text-2xl font-bold leading-tight text-white mt-3">
                    Découvrez nos lignes de production en action
                  </h3>
                  <p className="text-sm text-white/70 mt-3">
                    2 minutes pour comprendre pourquoi nos clients nous font confiance depuis 20 ans.
                  </p>
                  <button
                    type="button"
                    onClick={() => setCurrentPage('expertises')}
                    className="inline-flex items-center justify-center bg-[#E2FD48] text-[#0E2A33] font-bold px-5 py-3 rounded-full mt-6 text-sm"
                  >
                    Voir la visite complète →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 3. SOLUTIONS — Teaser (CTA vers page Solutions) */}
          <section id="solutions" className="py-32 section--light">
            <div className="max-w-7xl mx-auto px-6">
              <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                {/* Colonne gauche : intro + liste interactive + CTA */}
                <div className="flex flex-col h-full">
                  <div className="max-w-2xl space-y-6 mb-10">
                    <span className="text-[10px] font-extrabold tracking-[0.4em] text-[#0E2A33]/40 uppercase">SOLUTIONS</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">Solutions métalliques pour l'enveloppe du bâtiment</h2>
                    <p className="text-[#0E2A33]/60 text-lg leading-relaxed font-medium">Catalogue B2B : enduit mince, ravalement, bardages et cassettes, précadres, tôles prélaquées et étanchéité... Découvrez nos gammes aluminium et acier.</p>
                  </div>

                  <div className="flex flex-col gap-6">
                  {homeSolutionsList.map((item, index) => {
                    const isActive = activeSolutionHover === index;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setActiveSolutionHover(index)}
                        onClick={() => {
                          if (item.id === '06') setCurrentPage('etancheite');
                        }}
                        className="text-left group"
                      >
                        <div className="flex flex-col">
                          <div className={`flex items-center gap-4 transition-colors duration-200 ${isActive ? 'text-[#0E2A33]' : 'text-[#0E2A33]/40'}`}>
                            <span className={`text-[11px] font-black tracking-[0.3em] uppercase ${isActive ? 'text-[#0E2A33]' : 'text-[#0E2A33]/30'}`}>
                              {item.id}
                            </span>
                            <span className="text-3xl md:text-4xl font-extrabold tracking-tight">
                              {item.title}
                            </span>
                          </div>
                          <div
                            className={`mt-3 h-[2px] rounded-full transition-all duration-200 origin-left ${
                              isActive ? 'w-16 bg-[#0E2A33]' : 'w-10 bg-[#0E2A33]/10'
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                  </div>

                  <div className="mt-12">
                    <button
                      onClick={() => setCurrentPage('solutions')}
                      className="px-12 py-4 border border-[#0E2A33] text-[#0E2A33] text-sm font-bold rounded-full transition-all hover:bg-[#0E2A33] hover:text-white"
                    >
                      Voir toutes nos solutions
                    </button>
                  </div>
                </div>

                {/* Colonne droite : image dynamique */}
                <div className="relative h-full">
                  <div className="relative rounded-2xl overflow-hidden min-h-[320px] lg:h-full border border-zinc-100 bg-white shadow-sm">
                    {homeSolutionsList[activeSolutionHover]?.id === '02' ? (
                      <img
                        src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773850275/enduitminceisolant-1200px_ibn4ly.webp"
                        srcSet="
                          https://res.cloudinary.com/dyiup6v5x/image/upload/v1773850274/enduitminceisolant-800px_poxwkk.webp 800w,
                          https://res.cloudinary.com/dyiup6v5x/image/upload/v1773850275/enduitminceisolant-1200px_ibn4ly.webp 1200w,
                          https://res.cloudinary.com/dyiup6v5x/image/upload/v1773850275/enduitminceisolant-1600px_y0zenz.webp 1600w
                        "
                        sizes="(max-width: 768px) 800px, (max-width: 1200px) 1200px, 1600px"
                        alt="Enduit mince sur isolant — PLIALU"
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : homeSolutionsList[activeSolutionHover]?.id === '06' ? (
                      <div className="absolute inset-0 bg-[#071318] border border-white/10 flex items-center justify-center">
                        <span className="text-[#0E2A33] opacity-80 text-sm font-semibold">
                          Visualisation 3D en cours
                        </span>
                      </div>
                    ) : (
                      <img
                        key={homeSolutionsList[activeSolutionHover].id}
                        src={homeSolutionsList[activeSolutionHover].image}
                        alt={homeSolutionsList[activeSolutionHover].title}
                        className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. RÉALISATIONS (DARK) */}
          <section id="projects" className="py-32 section--dark" style={{ background: 'linear-gradient(to bottom, #071318 0%, #0b1e26 100%)' }}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                <div className="max-w-2xl space-y-4">
                  <span className="text-[10px] font-extrabold tracking-[0.3em] text-[#E2FD48] uppercase">PORTFOLIO COLLABORATIONS</span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-white">Projets réalisés en collaboration</h2>
                </div>
                <a href="/portfolio" onClick={(e) => { e.preventDefault(); setCurrentPage('projects'); }} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#E2FD48] hover:text-white transition-colors group">
                  TOUTES NOS COLLABORATIONS
                  <iconify-icon icon="lucide:arrow-up-right" width="18" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></iconify-icon>
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-[#07161C] cursor-pointer" onClick={() => setCaeSlide(prev => (prev === 0 ? 1 : 0))}>
                  <img src={caeSlide === 0 ? "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771517735/CAE-1200px_cdhouc.webp" : "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771518042/CAE2-1200px_sr3dgl.webp"} className="w-full h-full object-cover transition-all duration-1000 grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0" alt="Pièces métalliques sur mesure pour la façade du projet CAE à Lyon 3" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050E12]/25 p-10 flex flex-col justify-end pointer-events-none">
                    <h3 className="text-3xl text-white font-extrabold tracking-tighter">CAE – Lyon 3</h3>
                  </div>
                </div>
                <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-[#07161C] cursor-pointer md:mt-12" onClick={() => setZentoSlide(prev => (prev === 0 ? 1 : 0))}>
                  <img src={zentoSlide === 0 ? "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771521475/ZENTO1-1200px_w66src.webp" : "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771521598/ZENTO2-1200px_qbazyy.webp"} className="w-full h-full object-cover transition-all duration-1000 grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0" alt="Habillage métallique extérieur fourni pour le projet Zento à Grenoble" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050E12]/25 p-10 flex flex-col justify-end pointer-events-none">
                    <h3 className="text-3xl text-white font-extrabold tracking-tighter">ZENTO - Grenoble</h3>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4.5 RESSOURCES - EXPERTISE TECHNIQUE (LIGHT) */}
          <section id="ressources" className="py-32 section--light bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-20">
                <span className="text-[10px] font-extrabold tracking-[0.4em] text-[#0E2A33]/40 uppercase mb-4 block">RESSOURCES</span>
                <h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">Centre de ressources et expertise technique</h2>
                <p className="text-[#0E2A33]/60 text-lg md:text-xl font-medium max-w-2xl">Comprendre les enjeux techniques, les tolérances et les finitions pour optimiser la conception de vos pièces métalliques.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    id: 'ressource-1',
                    title: "Choisir le bon métal pour une façade extérieure",
                    desc: "Aluminium, acier ou inox ? Découvrez comment choisir le bon métal pour une façade extérieure en fonction des contraintes de corrosion et de durabilité."
                  },
                  {
                    id: 'ressource-2',
                    title: "Pliage aluminium pour façade : limites et tolérances",
                    desc: "Découvrez comment maîtriser le pliage aluminium pour façade en anticipant la dilatation thermique, le choix des alliages et le thermolaquage QUALICOAT."
                  },
                  {
                    id: 'ressource-3',
                    title: "Thermolaquage certifié Qualicoat : garanties",
                    desc: "La durabilité d'une façade ne dépend pas que du métal. Découvrez pourquoi le thermolaquage certifié Qualicoat après façonnage est le seul rempart contre la corrosion."
                  }
                ].map((card, idx) => (
                  <article 
                    key={card.id} 
                    className="group bg-white rounded-[24px] p-8 flex flex-col border border-zinc-100 shadow-sm transition-all duration-200 ease-out hover:border-2 hover:border-[#E2FD48] hover:-translate-y-0.5 hover:shadow-md cursor-pointer focus-within:border-2 focus-within:border-[#E2FD48] focus-within:-translate-y-0.5 outline-none relative"
                    tabIndex={0}
                    onClick={() => setCurrentPage(card.id as typeof currentPage)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setCurrentPage(card.id as typeof currentPage);
                      }
                    }}
                  >
                    <div className="mb-4 text-[#0E2A33]/20 group-hover:text-[#0E2A33] transition-colors duration-200">
                      <iconify-icon icon="lucide:file-text" width="32"></iconify-icon>
                    </div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-[#0E2A33] tracking-tight mb-4">
                      {card.title}
                    </h3>
                    <p className="text-[#0E2A33]/60 text-base leading-relaxed mb-10">
                      {card.desc}
                    </p>
                    <div className="mt-auto pt-6 border-t border-zinc-50 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-[#0E2A33]/30 uppercase">5 minutes de lecture</span>
                      <iconify-icon icon="lucide:arrow-right" className="text-[#0E2A33]/20 group-hover:text-[#0E2A33] transition-colors" width="20"></iconify-icon>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-20 text-center">
                <a
                  href="/ressources"
                  onClick={(e) => { e.preventDefault(); setCurrentPage('ressources'); }}
                  className="inline-block px-10 py-4 bg-[#0b2421] text-white text-xs font-black tracking-[0.2em] uppercase rounded-full transition-all hover:bg-[#0E2A33] shadow-lg"
                >
                  ACCÉDER AUX DOSSIERS COMPLETS
                </a>
              </div>
            </div>
          </section>

          {/* 6. À PROPOS (DARK) */}
          <section id="propos" className="py-32 section--dark overflow-hidden" style={{ background: 'linear-gradient(to bottom, #071318 0%, #0b1e26 100%)' }}>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 bg-[#07161C] order-2 lg:order-1 shadow-2xl">
                  <img
                    src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1771522416/APROPOS-1200px_wkguv2.webp"
                    className="w-full h-full object-cover opacity-80"
                    alt="Vue extérieure de l'usine Plialu, entreprise de métallurgie et façonnage en Rhône-Alpes"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-8 order-1 lg:order-2">
                  <span className="text-[10px] font-extrabold tracking-[0.3em] text-[#E2FD48] uppercase">À PROPOS</span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-white">Votre entreprise de métallurgie en Rhône-Alpes</h2>
                  <p className="text-white/80 text-lg leading-relaxed">
                    Depuis notre <strong>atelier lyonnais</strong>, nous assurons une réactivité optimale pour accompagner vos chantiers en <strong>Rhône-Alpes</strong> et en Europe. Une capacité de production appuyée par plus de 5 000 m² dédiés au façonnage métallique sur mesure.
                  </p>
                  <a href="/a-propos" onClick={(e) => { e.preventDefault(); setCurrentPage('a-propos'); }} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#E2FD48] hover:text-white transition-all group">EN SAVOIR PLUS <iconify-icon icon="lucide:arrow-right" className="group-hover:translate-x-2 transition-transform"></iconify-icon></a>
                </div>
              </div>
            </div>
          </section>

          {/* 7. CONTACT (LIGHT) */}
          <section id="contact" className="py-48 section--light">
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-fade-up">
              <span className="text-[10px] font-extrabold tracking-[0.4em] uppercase mb-8 inline-block text-[#0E2A33]/40">CONTACT</span>
              <h2 className="mb-10 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">Votre prochain chantier métal. Notre prochain projet.</h2>
              <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium text-[#0E2A33]/70">Bureau d'études, fabrication, thermolaquage — un seul appel suffit.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <button onClick={() => setCurrentPage('contact')} className="w-full sm:w-auto px-12 py-4 bg-[#0E2A33] text-white text-sm font-extrabold rounded-full transition-all shadow-lg hover:shadow-2xl">Demander un devis</button>
                <button onClick={() => setCurrentPage('contact')} className="w-full sm:w-auto px-12 py-4 border border-[#0E2A33] text-[#0E2A33] text-sm font-bold rounded-full transition-all hover:bg-[#0E2A33] hover:text-white">Contacter un expert</button>
              </div>

              {/* Bloc Coordonnées interactif */}
              <div className="max-w-3xl mx-auto pt-12 border-t border-[#0E2A33]/5 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 text-left">
                {/* Phone */}
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#0E2A33]/5 flex items-center justify-center text-[#0E2A33]/40 transition-colors group-hover:text-[#0E2A33]">
                    <iconify-icon icon="lucide:phone" width="18"></iconify-icon>
                  </div>
                  <div className="flex-1">
                    <span className="block text-[8px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Téléphone</span>
                    <div className="flex items-center gap-2">
                      <a href="tel:0478089370" className="text-sm font-bold text-[#0E2A33] hover:underline">04 78 08 93 70</a>
                      <button onClick={() => handleCopy("04 78 08 93 70", "tel-home")} className="p-1 rounded-md hover:bg-black/5 transition-colors relative">
                        <iconify-icon icon="lucide:copy" width="14" className="text-zinc-300 group-hover:text-zinc-400"></iconify-icon>
                        {copiedKey === 'tel-home' && <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] bg-[#0E2A33] text-white px-1.5 py-0.5 rounded">Copié</span>}
                      </button>
                    </div>
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#0E2A33]/5 flex items-center justify-center text-[#0E2A33]/40 transition-colors group-hover:text-[#0E2A33]">
                    <iconify-icon icon="lucide:mail" width="18"></iconify-icon>
                  </div>
                  <div className="flex-1">
                    <span className="block text-[8px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">E-mail</span>
                    <div className="flex items-center gap-2">
                      <a href="mailto:commercial@plialu.fr" className="text-sm font-bold text-[#0E2A33] hover:underline">commercial@plialu.fr</a>
                      <button onClick={() => handleCopy("commercial@plialu.fr", "mail-home")} className="p-1 rounded-md hover:bg-black/5 transition-colors relative">
                        <iconify-icon icon="lucide:copy" width="14" className="text-zinc-300 group-hover:text-zinc-400"></iconify-icon>
                        {copiedKey === 'mail-home' && <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] bg-[#0E2A33] text-white px-1.5 py-0.5 rounded">Copié</span>}
                      </button>
                    </div>
                  </div>
                </div>
                {/* Address */}
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#0E2A33]/5 flex items-center justify-center text-[#0E2A33]/40 transition-colors group-hover:text-[#0E2A33]">
                    <iconify-icon icon="lucide:map-pin" width="18"></iconify-icon>
                  </div>
                  <div className="flex-1">
                    <span className="block text-[8px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Adresse</span>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-[#0E2A33] leading-tight">Technoparc Saône Vallée, 150, Route Copernic, 01390 Civrieux</p>
                      <button onClick={() => handleCopy("Technoparc Saône Vallée, 150, Route Copernic, 01390 Civrieux", "addr-home")} className="p-1 rounded-md hover:bg-black/5 transition-colors relative">
                        <iconify-icon icon="lucide:copy" width="14" className="text-zinc-300 group-hover:text-zinc-400"></iconify-icon>
                        {copiedKey === 'addr-home' && <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] bg-[#0E2A33] text-white px-1.5 py-0.5 rounded">Copié</span>}
                      </button>
                    </div>
                  </div>
                </div>
                {/* Hours */}
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#0E2A33]/5 flex items-center justify-center text-[#0E2A33]/40 transition-colors group-hover:text-[#0E2A33]">
                    <iconify-icon icon="lucide:clock" width="18"></iconify-icon>
                  </div>
                  <div className="flex-1">
                    <span className="block text-[8px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Horaires</span>
                    <p className="text-sm font-bold text-[#0E2A33] leading-tight">Du Lundi au Vendredi de 8h à 12h et de 13h à 16h30</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* --- ABOUT PAGE CONTENT --- */}
      {currentPage === 'a-propos' && (
        <div className="animate-fade-up">
          {/* 1. HERO SECTION (DARK) */}
          <section className="relative bg-[#071318] pt-48 md:pt-56 pb-20 overflow-hidden min-h-[70vh] flex flex-col justify-center">
            <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#0e2a33]/40 to-[#071318]"></div>
            <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-4xl space-y-8">
                <span className="text-[10px] font-extrabold tracking-[0.4em] text-white/50 uppercase block">
                  NOTRE IDENTITÉ INDUSTRIELLE
                </span>
                <h1 className="text-4xl md:text-6xl tracking-tighter leading-[1.1] font-black uppercase text-white">
                  PLIALU, Entreprise de façonnage métal en Rhône-Alpes
                </h1>
                <p className="text-xl md:text-2xl text-[#E2FD48] font-bold tracking-tight">
                  Spécialiste du façonnage métallique en Rhône-Alpes depuis 20 ans.
                </p>
                <p className="text-base md:text-lg text-white/70 max-w-2xl leading-relaxed font-medium">
                  Implantée en région lyonnaise, notre usine intégrée accompagne les professionnels de l'enveloppe du bâtiment dans la transformation industrielle et la fabrication sur mesure de pièces métalliques.
                </p>
                <a
                  href="#a-propos-contenu"
                  onClick={(e) => { e.preventDefault(); document.getElementById('a-propos-contenu')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="inline-flex items-center gap-2 px-10 py-4 bg-[#E2FD48] text-[#0E2A33] text-sm font-extrabold rounded-full hover:bg-white transition-all tracking-tight shadow-[0_20px_40px_rgba(226,253,72,0.15)]"
                >
                  Demander un devis
                </a>
              </div>
            </div>
          </section>

          {/* 2. POSITIONNEMENT (LIGHT) - MACHINED PERFECTION V2 (FIXED BACKGROUND) */}
          <section id="a-propos-contenu" className="py-24 md:py-32 bg-white selection-brand relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                <div className="lg:col-span-6 space-y-10 py-10">
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
                      20 ans <br/>d’expertise
                    </h2>
                    <div className="w-20 h-1.5 bg-[#E2FD48]"></div>
                  </div>
                  <p className="text-zinc-500 text-base leading-relaxed max-w-lg">
                    Sous la direction de Jean-Pierre Bax, l’entreprise développe une expertise industrielle reconnue, fondée sur la précision, la maîtrise technique et la performance opérationnelle.
                    <br /><br />
                    Entreprise à taille humaine, PLIALU accompagne ses partenaires industriels, acteurs du bâtiment et professionnels exigeants dans la conception et la production de pièces métalliques adaptées à leurs contraintes techniques.
                  </p>
                  <div className="pt-4">
                    <button onClick={() => setCurrentPage('contact')} className="inline-flex items-center justify-center gap-3 group px-10 py-4 md:py-5 bg-[#E2FD48] text-[#0E2A33] text-sm md:text-base font-extrabold rounded-full transition-all tracking-tight shadow-[0_15px_30px_rgba(226,253,72,0.2)] hover:shadow-[#E2FD48]/40 hover:-translate-y-1">
                      <span>Échanger sur votre projet</span>
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12H19M19 12L13 6M19 12L13 18"/></svg>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="relative p-2 bg-white rounded-3xl border border-zinc-200 shadow-2xl shadow-[#0E2A33]/5 aspect-[4/3] group">
                    <img src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1771522416/APROPOS-1200px_wkguv2.webp" className="w-full h-full object-cover rounded-xl relative z-10 filter contrast-[1.05]" alt="Atelier de production Plialu à Lyon" loading="lazy" />
                  </div>
                </div>
            </div>

            <div className="mt-20 md:mt-32">
              <h3 className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.4em] mb-8">Les fondations de notre outil industriel</h3>
              
              <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-zinc-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px]">
                  {[
                    { expert: 'Précision', desc: 'Tolérances strictes au dixième.', icon: <svg className="w-8 h-8 transition-colors duration-500 text-zinc-300 group-hover:text-[#E2FD48]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 21l3-18M11 21l3-18M16 3l-1 4M18.5 3l-1.5 6M21 3l-2 8" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 17h16" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                    { expert: 'Maîtrise Technique', desc: 'Parc machine CNC de pointe.', icon: <svg className="w-8 h-8 transition-colors duration-500 text-zinc-300 group-hover:text-[#E2FD48]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg> },
                    { expert: 'Performance', desc: 'Production pour grands volumes.', icon: <svg className="w-8 h-8 transition-colors duration-500 text-zinc-300 group-hover:text-[#E2FD48]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                    { expert: 'Standard Qualité', desc: 'Traçabilité et norme QUALICOAT.', icon: <svg className="w-8 h-8 transition-colors duration-500 text-zinc-300 group-hover:text-[#E2FD48]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11" strokeLinecap="round" strokeLinejoin="round"/></svg> }
                  ].map((item) => (
                    <div key={item.expert} className="group bg-white hover:bg-[#0E2A33] transition-colors duration-500 px-8 py-10 md:py-12 flex flex-col justify-between min-h-[220px]">
                      <div className="mb-6">{item.icon}</div>
                      <div>
                        <span className="block text-[#0E2A33] group-hover:text-white font-black text-xl tracking-tight mb-2 transition-colors duration-500">{item.expert}</span>
                        <span className="text-zinc-500 group-hover:text-zinc-400 font-medium text-sm leading-relaxed transition-colors duration-500">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

          {/* 3. CARTE TERRITORIALE (LIGHT) - BADGES EDITION */}
          <section className="py-24 md:py-32 bg-[#F3F6F7] selection-brand border-t border-zinc-100 relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              
              <div className="max-w-3xl mb-12 space-y-5 text-center mx-auto flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
                  Notre rayonnement
                </h2>
                <div className="w-20 h-1 bg-[#E2FD48]"></div>
                <p className="text-zinc-500 text-base leading-relaxed pt-2 max-w-2xl">
                  Un ancrage régional fort associé à une capacité de livraison et d'accompagnement sur l'ensemble de vos chantiers en France et en Europe francophone.
                </p>
              </div>

              <div className="mb-10 p-8 md:p-12 bg-white rounded-3xl border border-zinc-100 shadow-sm relative overflow-hidden group max-w-5xl mx-auto">
                <div className="absolute inset-0 z-0 bg-white group-hover:scale-110 transition-transform duration-700 pointer-events-none opacity-50"></div>
                <div className="relative z-10">
                  <TerritorialMap />
                </div>
              </div>

              {/* Badges compacts (Remplace les anciennes cartes géantes) */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
                {[
                  { region: 'Rhône-Alpes', color: 'bg-[#E2FD48]' },
                  { region: 'France entière', color: 'bg-[#0E2A33]' },
                  { region: 'Suisse', color: 'bg-zinc-300' },
                  { region: 'Belgique', color: 'bg-zinc-300' }
                ].map((item) => (
                  <div key={item.region} className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white border border-zinc-200 rounded-full shadow-sm hover:border-zinc-300 transition-colors">
                    <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-bold text-[#0E2A33]">{item.region}</span>
                  </div>
                ))}
              </div>

            </div>
          </section>
          <section className="py-24 bg-[#071318] text-center border-t border-white/5">
            <div className="max-w-3xl mx-auto px-6 space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-white">20 ans de façonnage métallique en Rhône-Alpes.</h2>
              <p className="text-base md:text-lg text-white/50">Parlons de votre projet — nos techniciens répondent sous 48h.</p>
              <button onClick={() => setCurrentPage('contact')} className="px-10 py-4 md:px-12 md:py-5 bg-[#E2FD48] text-[#0E2A33] text-sm font-extrabold rounded-full transition-all shadow-xl hover:shadow-[#E2FD48]/20 hover:-translate-y-1">
                Soumettre mon projet
              </button>
            </div>
          </section>
        </div>
      )}

      {/* --- PROJECTS PAGE CONTENT --- */}
      {currentPage === 'projects' && (
        <div className="animate-fade-up">
          {/* Hero Réalisations */}
          <section className="relative bg-[#071318] pt-48 md:pt-56 pb-24 overflow-hidden min-h-[70vh] flex flex-col justify-center">
            <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#0e2a33]/40 to-[#071318]"></div>
            <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-4xl space-y-8">
                <span className="text-[10px] font-extrabold tracking-[0.4em] text-white/50 uppercase block">
                  PORTFOLIO COLLABORATIONS
                </span>
                <h1 className="text-4xl md:text-6xl tracking-tighter leading-[1.1] font-black uppercase text-white">
                  Projets réalisés en collaboration
                </h1>
                <p className="text-base md:text-lg text-white/70 max-w-2xl leading-relaxed font-medium">
                  Une sélection de projets menés aux côtés de maîtres d’œuvre, architectes et entreprises générales. <br />
                  Façonnage métallique, enveloppe bâtiment et solutions sur mesure au service d’exigences techniques élevées.
                </p>
                <a
                  href="#projets-grille"
                  onClick={(e) => { e.preventDefault(); document.getElementById('projets-grille')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="inline-flex items-center gap-2 px-10 py-4 bg-[#E2FD48] text-[#0E2A33] text-sm font-extrabold rounded-full hover:bg-white transition-all tracking-tight shadow-[0_20px_40px_rgba(226,253,72,0.15)]"
                >
                  Voir nos collaborations
                  <iconify-icon icon="lucide:arrow-down" width="18"></iconify-icon>
                </a>
              </div>
            </div>
          </section>

          {/* Grille des Projets */}
          <section id="projets-grille" className="py-24 bg-white scroll-mt-24">
            <div className="w-full">
              <div className="max-w-7xl mx-auto px-6 w-full mb-12 flex justify-between items-end">
                <div>
                  <h2 className="mb-3 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
                    Nos références
                  </h2>
                  <p className="text-[#0E2A33]/60 text-sm md:text-base max-w-2xl leading-relaxed">
                    Chaque réalisation engage notre process complet : bureau d'études, fabrication sur mesure, thermolaquage certifié QUALICOAT.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[#0E2A33]/40 text-[10px] font-bold tracking-[0.3em] uppercase">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="2" width="12" height="20" rx="6"/>
                    <path d="M12 6v4"/>
                  </svg>
                  Faire défiler
                </div>
              </div>
              <div className="max-w-7xl mx-auto w-full">
                <div
                  ref={scrollRef}
                  className="flex overflow-x-auto gap-6 px-6 pb-12 snap-x snap-mandatory no-scrollbar w-full cursor-grab active:cursor-grabbing"
                >
                {[
                  {
                    id: "cae-lyon",
                    title: "CAE –\nLyon 3",
                    city: "Lyon",
                    year: "2023",
                    tag: "ENVELOPPE BÂTIMENT",
                    context: "Façade complète & ossatures GALVA\nAlu 20/10 teinte Golden Beach – AKZO NOBEL – Alu 20/10 RAL 9003 & Inox recuit brillant",
                    bullets: [],
                    figures: [],
                    mainImg: {
                      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771517735/CAE-1200px_cdhouc.webp",
                      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771517735/CAE-800px_qbsmn7.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771517735/CAE-1200px_cdhouc.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771517735/CAE-1600px_fnjqom.webp 1600w"
                    },
                    gallery: [
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771518042/CAE2-1200px_sr3dgl.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771518042/CAE2-800px_vdpclz.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771518042/CAE2-1200px_sr3dgl.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771518043/CAE2-1600px_zy3fgw.webp 1600w"
                      },
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771948452/CAE3-1200px_ppn5ny.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771948452/CAE3-800px_gwscnh.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771948452/CAE3-1200px_ppn5ny.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771948452/CAE3-1600px_xan9en.webp 1600w"
                      },
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771948452/CAE4-1200px_bn46ch.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771948452/CAE4-800px_ue2hxt.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771948452/CAE4-1200px_bn46ch.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771948452/CAE4-1600px_hd9e2x.webp 1600w"
                      }
                    ]
                  },
                  {
                    id: "zento-grenoble",
                    title: "ZENTO –\nGrenoble",
                    city: "Grenoble",
                    year: "2023",
                    tag: "INFRASTRUCTURE",
                    context: "Cassettes et divers habillages\nAlu 20/10 teinte Copper – ARCONIC",
                    bullets: [],
                    figures: [],
                    mainImg: {
                      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771521475/ZENTO1-1200px_w66src.webp",
                      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771521475/ZENTO1-800px_qdiule.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771521475/ZENTO1-1200px_w66src.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771521475/ZENTO1-1600px_jzf8p6.webp 1600w"
                    },
                    gallery: [
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771521598/ZENTO2-1200px_qbazyy.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771521598/ZENTO2-800px_f5tlje.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771521598/ZENTO2-1200px_qbazyy.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771521599/ZENTO2-1600px_b21uca.webp 1600w"
                      },
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771949058/ZENTO3-1200px_yxeeg4.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771949057/ZENTO3-800px_ns6mdx.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771949058/ZENTO3-1200px_yxeeg4.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771949058/ZENTO3-1600px_jmjum8.webp 1600w"
                      },
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771949058/ZENTO4-900px_dfrnpd.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771949058/ZENTO4-800px_xx1due.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771949058/ZENTO4-900px_dfrnpd.webp 900w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771949058/ZENTO4-1000px_p8wclq.webp 1000w"
                      }
                    ]
                  },
                  {
                    id: "bureau-le-e",
                    title: "Bureau Le E –\nAnnecy",
                    city: "Annecy",
                    year: "2024",
                    tag: "AMÉNAGEMENT TERTIAIRE",
                    context: "Cassettes & embrasures fenêtres\nAlu 20/10 teinte WhiteGold – ARCONIC – Alu 20/10 RAL 7012",
                    bullets: [],
                    figures: [],
                    mainImg: {
                      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950836/BureauleE-1200px_lnhelx.webp",
                      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950836/BureauleE-1200px_lnhelx.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950837/BureauleE-1600px_e6bjlf.webp 1600w"
                    },
                    gallery: [
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950837/BureauLeE2-1200px_tuijwj.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950836/BureauLeE2-800px_agi9kx.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950837/BureauLeE2-1200px_tuijwj.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950837/BureauLeE2-1600px_qfjcl7.webp 1600w"
                      },
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950840/BureauleE3-1200px_fbq7tc.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950839/BureauleE3-800px_qlojmp.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950840/BureauleE3-1200px_fbq7tc.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1771950840/BureauleE3-1600px_by8yfo.webp 1600w"
                      }
                    ]
                  },
                  {
                    id: "welink-lyon",
                    title: "WeLink –\nLyon 7",
                    city: "Lyon",
                    year: "2023",
                    tag: "ENVELOPPE BÂTIMENT",
                    context: "Cassettes & Embrasures\nAlu 20/10 teinte Copper DS 0010 – ADAPTA",
                    bullets: [],
                    figures: [],
                    mainImg: {
                      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772021847/Welink-1200px_mu1jnb.webp",
                      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772021847/Welink-800px_baz4br.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772021847/Welink-1200px_mu1jnb.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772021847/Welink-1600px_ewa46q.webp 1600w"
                    },
                    gallery: [
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022202/Welink2-1200_jwu2kg.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022202/Welink2-800px_qcsvgi.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022202/Welink2-1200_jwu2kg.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022203/Welink2-1600px_gwf5ps.webp 1600w"
                      },
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022204/Welink3-1200px_txkxlg.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022203/Welink3-800px_gcjpgc.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022204/Welink3-1200px_txkxlg.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022205/Welink3-1600px_bhbrah.webp 1600w"
                      }
                    ]
                  },
                  {
                    id: "odyssey-venissieux",
                    title: "ODYSSEY –\nVénissieux",
                    city: "Vénissieux",
                    year: "2022",
                    tag: "ENVELOPPE BÂTIMENT",
                    context: "Cassettes et corniches\nAlu Anodisé",
                    bullets: [],
                    figures: [],
                    mainImg: {
                      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022576/Odyssey-1200px_no3wvs.webp",
                      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022576/Odyssey-800px_avcotk.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022576/Odyssey-1200px_no3wvs.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022577/Odyssey-1600px_tyiqrw.webp 1600w"
                    },
                    gallery: [
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022578/Odyssey2-1000px_ykklhf.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022577/Odyssey2-800px_leqwve.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022578/Odyssey2-1000px_ykklhf.webp 1000w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022579/Odyssey2-1300px_dath5e.webp 1300w"
                      },
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022581/Odyssey3-1200px_ys8g6a.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022580/Odyssey3-800px_ozd9cr.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022581/Odyssey3-1200px_ys8g6a.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772022582/Odyssey3-1500px_abgjsc.webp 1500w"
                      }
                    ]
                  },
                  {
                    id: "lycee-delorme",
                    title: "Lycée DELORME –\nL'Isle-d'Abeau",
                    city: "L'Isle-d'Abeau",
                    year: "2021",
                    tag: "INFRASTRUCTURE SCOLAIRE",
                    context: "Cassettes architecturales poiçonnées sur-mesure\nAlu 20/10 RAL 9003",
                    bullets: [],
                    figures: [],
                    mainImg: {
                      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772023237/Delorme-1200w-1600h_stzzy6.webp",
                      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772023237/Delorme-800px_w_qyojcr.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772023237/Delorme-1200w-1600h_stzzy6.webp 1200w"
                    },
                    gallery: [
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772023238/Delorme2-1000px_pbjbv6.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772023238/Delorme2-800px_rthkko.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772023238/Delorme2-1000px_pbjbv6.webp 1000w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772023240/Delorme2-1400px_cf8jjj.webp 1400w"
                      }
                    ]
                  },
                  {
                    id: "le-binome-meylan",
                    title: "LE BINÔME –\nMeylan",
                    city: "Meylan",
                    year: "2025",
                    tag: "ENVELOPPE BÂTIMENT",
                    context: "Cassettes\nAlu 20/10 RAL 9001 & 7022",
                    bullets: [],
                    figures: [],
                    mainImg: {
                      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024165/Binome-1200px_qkj7mo.webp",
                      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024164/Binome-800px_yp6iyd.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024165/Binome-1200px_qkj7mo.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024166/Binome-1600px_t9ezo1.webp 1600w"
                    },
                    gallery: [
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024172/Binome2-1200px_acuij5.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024167/Binome2-800px_izeja2.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024172/Binome2-1200px_acuij5.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024168/Binome2-1600px_uqtoij.webp 1600w"
                      },
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024170/Binome3-1200px_myhlcp.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024169/Binome3-800px_bcseb7.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024170/Binome3-1200px_myhlcp.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024171/Binome3-1600px_ekj7au.webp 1600w"
                      }
                    ]
                  },
                  {
                    id: "iut-lyon-1",
                    title: "IUT LYON 1 –\nVilleurbanne",
                    city: "Villeurbanne",
                    year: "2024",
                    tag: "INFRASTRUCTURE SCOLAIRE",
                    context: "Précadres soudés de fenêtres avec angles cintrés\nAcier 15/10 Galva + post-laquage RAL 5005",
                    bullets: [],
                    figures: [],
                    mainImg: {
                      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024666/IUT-1000px_dfobep.webp",
                      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024666/IUT-800px_uzbk7y.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024666/IUT-1000px_dfobep.webp 1000w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024667/IUT-1350px_vzgsip.webp 1350w"
                    },
                    gallery: [
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024671/IUT3-1200px_imymvc.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024670/IUT3-800px_airmf3.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024671/IUT3-1200px_imymvc.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024672/IUT3-1600px_v3fs37.webp 1600w"
                      },
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024670/IUT2-1000px_jy3ixk.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024668/IUT2-800px_thggsu.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772024670/IUT2-1000px_jy3ixk.webp 1000w"
                      }
                    ]
                  },
                  {
                    id: "voisin-lyon",
                    title: "VOISIN –\nLyon 9",
                    city: "Lyon",
                    year: "2024",
                    tag: "CASSETTES INTÉRIEURES",
                    context: "Cassettes intérieures – Siège social Voisin\nAlu 20/10 teinte Tasilaq Sable YW2304I – AKZO NOBEL",
                    bullets: [],
                    figures: [],
                    mainImg: {
                      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025154/Voisin-1200px_ijhnru.webp",
                      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025154/Voisin-800px_fuwtrc.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025154/Voisin-1200px_ijhnru.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025155/Voisin-1500px_nfhbwn.webp 1500w"
                    },
                    gallery: [
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025158/Voisin2-1200px_onphxp.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025158/Voisin2-800px_blcc7r.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025158/Voisin2-1200px_onphxp.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025158/Voisin2-1500px_dkkryk.webp 1500w"
                      },
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025161/Voisin3-1200px_loppcz.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025160/Voisin3-800px_vlnobd.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025161/Voisin3-1200px_loppcz.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772025162/Voisin3-1500px_t8ocr4.webp 1500w"
                      }
                    ]
                  },
                  {
                    id: "incurve-dardilly",
                    title: "INCURVE –\nDardilly",
                    city: "Dardilly",
                    year: "2022",
                    tag: "ENVELOPPE BÂTIMENT",
                    context: "Cassettes\nAlu RAL 7022",
                    bullets: [],
                    figures: [],
                    mainImg: {
                      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034002/Incurve-1200px_fnikjw.webp",
                      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034001/Incurve-800px_dy2zys.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034002/Incurve-1200px_fnikjw.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034004/Incurve-1600px_qfkpgk.webp 1600w"
                    },
                    gallery: [
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034006/Incurve2-1200px_mlw60j.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034005/Incurve2-800px_okqd0h.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034006/Incurve2-1200px_mlw60j.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034008/Incurve2-1600px_zxwtqr.webp 1600w"
                      }
                    ]
                  },
                  {
                    id: "alpina-seyssinet",
                    title: "ALPINA –\nSeyssinet",
                    city: "Seyssinet",
                    year: "2021",
                    tag: "ENVELOPPE BÂTIMENT",
                    context: "Cassettes\nAlu 20/10 RAL 7021 & teinte Golden Beach – AKZO NOBEL",
                    bullets: [],
                    figures: [],
                    mainImg: {
                      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034486/Alpina-1200px_xja4fb.webp",
                      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034486/Alpina-800px_vvnv2g.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034486/Alpina-1200px_xja4fb.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034488/Alpina-1600px_iyjnz6.webp 1600w"
                    },
                    gallery: [
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034492/Alpina2-1200px_muu0jg.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034490/Alpina2-800px_czpkbe.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034492/Alpina2-1200px_muu0jg.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034494/Alpina2-1600px_njhwi7.webp 1600w"
                      },
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034499/Alpina3-1200px_z8gy7n.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034496/Alpina3-800px_qd9l3u.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034499/Alpina3-1200px_z8gy7n.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034500/Alpina3-1600px_vs13lp.webp 1600w"
                      },
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034503/Alpina4-1200px_h1t2sb.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034502/Alpina4-800px_wisl3f.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034503/Alpina4-1200px_h1t2sb.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772034505/Alpina4-1600px_piloq2.webp 1600w"
                      }
                    ]
                  },
                  {
                    id: "bataille",
                    title: "Bataille – Lyon 8",
                    city: "Lyon",
                    year: "2020",
                    tag: "image",
                    context: "Cassettes perforées et bavettes en aluminium RAL 7034.\nTravail sur éléments perforés et protections de façade associant technicité, ventilation et finition architecturale.",
                    bullets: [],
                    figures: [],
                    mainImg: {
                      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035499/Bataille-1200px_iied0g.webp",
                      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035497/Bataille-800px_mextnn.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035499/Bataille-1200px_iied0g.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035500/Bataille-1600px_afmbmz.webp 1600w"
                    },
                    gallery: [
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035504/Bataille2-1200px_xbd2ga.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035502/Bataille2-800px_by9hei.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035504/Bataille2-1200px_xbd2ga.webp 1200w"
                      },
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035507/Bataille3-1200px_cb5owq.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035505/Bataille3-800_w9pryy.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035507/Bataille3-1200px_cb5owq.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035509/Bataille3-1600px_qig9ho.webp 1600w"
                      },
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035512/Bataille4-1200px_aiwowm.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035510/Bataille4-800px_ngcwkq.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035512/Bataille4-1200px_aiwowm.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035515/Bataille4-1600px_tnz6wx.webp 1600w"
                      },
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035517/Bataille5-1200px_urkxh9.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035516/Bataille5-800px_x6wgwx.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035517/Bataille5-1200px_urkxh9.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772035520/Bataille5-1600px_ykuiv8.webp 1600w"
                      }
                    ]
                  },
                  {
                    id: "nexity",
                    title: "LE QUARTZ –\nGrand Parilly",
                    city: "Grand Parilly",
                    year: "2023",
                    tag: "ENVELOPPE BÂTIMENT",
                    context: "Clins, encadrements, habillages balcons & couvertines\nAlu teinte Anodic Gold – AXALTA",
                    bullets: [],
                    figures: [],
                    mainImg: {
                      src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037000/Nexity-1200px_g8svfo.webp",
                      srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772036998/Nexity-800px_kstdls.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037000/Nexity-1200px_g8svfo.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037003/Nexity-1500px_nt4an0.webp 1500w"
                    },
                    gallery: [
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037006/Nexity2-1200px_uymlvt.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037004/Nexity2-800px_dqxfiy.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037006/Nexity2-1200px_uymlvt.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037008/Nexity2-1500px_kseshd.webp 1500w"
                      },
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037011/Nexity3-1000px_aw92dv.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037009/Nexity3-800px_swmvse.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037011/Nexity3-1000px_aw92dv.webp 1000w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037014/Nexity3-1250px_pbtmug.webp 1250w"
                      },
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037017/Nexity4-1200px_vkxldt.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037016/Nexity4-800px_alqsqg.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037017/Nexity4-1200px_vkxldt.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037019/Nexity4-1500px_p581ck.webp 1500w"
                      },
                      {
                        src: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037023/Nexity5-1200px_jvfvdd.webp",
                        srcset: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037021/Nexity5-800px_lgr1d9.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037023/Nexity5-1200px_jvfvdd.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1772037025/Nexity5-1500px_udzg1s.webp 1500w"
                      }
                    ]
                  }
                ].map((project) => {
                  const isOpen = selectedProjectId === project.id;
                  const projectImages = [project.mainImg, ...project.gallery].slice(0, 4);
                  const technicalDescription =
                    (project as { description?: string }).description ?? project.context;

                  return (
                    <article
                      key={project.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`Ouvrir le projet ${project.title}`}
                      className="snap-center shrink-0 w-[85vw] md:w-[600px] h-[75vh] relative group overflow-hidden rounded-none cursor-pointer"
                      onClick={() => setSelectedProjectId(isOpen ? null : project.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedProjectId(isOpen ? null : project.id);
                        }
                      }}
                    >
                      {!isOpen && (
                        <>
                          <img
                            src={project.mainImg.src}
                            srcset={project.mainImg.srcset}
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
                            alt={`${project.title} – ${project.tag}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover rounded-none transition-transform duration-[1.5s] group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A33]/80 via-transparent to-transparent"></div>
                          <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="text-[10px] font-bold tracking-[0.3em] text-[#E2FD48] uppercase mb-2 block">{project.tag}</span>
                            <span className="text-2xl font-black text-white uppercase tracking-tight whitespace-pre-line">{project.title}</span>
                            <p className="text-white/60 text-sm mt-1">{project.city}</p>
                            <p className="text-[#E2FD48] text-xs font-bold tracking-widest uppercase mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              DÉTAILS →
                            </p>
                          </div>
                        </>
                      )}

                      {isOpen && (
                        <>
                          <div className="w-full h-full relative transition-all duration-500 ease-in-out">
                            <div className="h-full">
                            {projectImages.length === 2 && (
                              <div className="grid grid-cols-2 h-full gap-2">
                                {projectImages.map((img, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    aria-label="Agrandir l'image"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveImage({ src: img.src, srcset: img.srcset });
                                    }}
                                    className="h-full w-full overflow-hidden"
                                  >
                                    <img
                                      src={img.src}
                                      srcset={img.srcset}
                                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
                                      alt={`${project.title} – Détail technique ${idx + 1}`}
                                      loading="lazy"
                                      decoding="async"
                                      className="w-full h-full object-cover rounded-none"
                                    />
                                  </button>
                                ))}
                              </div>
                            )}

                            {projectImages.length === 3 && (
                              <div className="grid grid-cols-3 h-full gap-2">
                                <button
                                  type="button"
                                  aria-label="Agrandir l'image"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveImage({ src: projectImages[0].src, srcset: projectImages[0].srcset });
                                  }}
                                  className="col-span-2 h-full w-full overflow-hidden"
                                >
                                  <img
                                    src={projectImages[0].src}
                                    srcset={projectImages[0].srcset}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
                                    alt={`${project.title} – Détail technique 1`}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover rounded-none"
                                  />
                                </button>
                                <div className="col-span-1 grid grid-rows-2 h-full gap-2">
                                  {projectImages.slice(1).map((img, idx) => (
                                    <button
                                      key={idx}
                                      type="button"
                                      aria-label="Agrandir l'image"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveImage({ src: img.src, srcset: img.srcset });
                                      }}
                                      className="h-full w-full overflow-hidden"
                                    >
                                      <img
                                        src={img.src}
                                        srcset={img.srcset}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
                                        alt={`${project.title} – Détail technique ${idx + 2}`}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover rounded-none"
                                      />
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {(projectImages.length === 1 || projectImages.length >= 4) && (
                              <div className={`grid ${projectImages.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} h-full gap-2`}>
                                {(projectImages.length === 1 ? projectImages : projectImages.slice(0, 4)).map((img, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    aria-label="Agrandir l'image"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveImage({ src: img.src, srcset: img.srcset });
                                    }}
                                    className={`h-full w-full overflow-hidden ${projectImages.length >= 4 ? 'aspect-square' : ''}`}
                                  >
                                    <img
                                      src={img.src}
                                      srcset={img.srcset}
                                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
                                      alt={`${project.title} – Détail technique ${idx + 1}`}
                                      loading="lazy"
                                      decoding="async"
                                      className="w-full h-full object-cover rounded-none"
                                    />
                                  </button>
                                ))}
                              </div>
                            )}
                            </div>

                            <div className={`absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md border-t border-white/10 px-6 py-5 flex items-start gap-6 transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                              <span className="text-[#E2FD48] text-xs font-bold tracking-widest uppercase shrink-0">{project.year}</span>
                              <div className="w-px h-8 bg-white/20 shrink-0"></div>
                              <h3 className="text-white font-black uppercase tracking-tight text-lg leading-tight">{project.title}</h3>
                              <div className="w-px h-8 bg-white/20 shrink-0"></div>
                              <p className="text-white/60 text-xs leading-relaxed">{technicalDescription}</p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProjectId(null);
                            }}
                            aria-label="Fermer le projet"
                            className="absolute top-4 right-4 z-20 w-8 h-8 bg-[#0E2A33]/80 rounded-full flex items-center justify-center text-white text-lg hover:bg-[#E2FD48] hover:text-[#0E2A33] transition-all"
                          >
                            ×
                          </button>
                        </>
                      )}
                    </article>
                  );
                })}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="py-24 bg-[#071318] text-center border-t border-white/5">
            <div className="max-w-3xl mx-auto px-6 space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-white">Un projet similaire à nous confier ?</h2>
              <p className="text-base md:text-lg text-white/50">Nos équipes techniques accompagnent architectes et bureaux d'études de la conception à la fabrication.</p>
              <button onClick={() => setCurrentPage('contact')} className="px-10 py-4 md:px-12 md:py-5 bg-[#E2FD48] text-[#0E2A33] text-sm font-extrabold rounded-full transition-all shadow-xl hover:shadow-[#E2FD48]/20 hover:-translate-y-1">
                Soumettre mon projet
              </button>
            </div>
          </section>

          {/* Image Lightbox Overlay */}
          {activeImage && (
            createPortal(
              <div
                className="fixed top-0 left-0 w-screen h-screen z-[200] flex items-center justify-center bg-black/90"
                onClick={() => setActiveImage(null)}
              >
                <img
                  src={activeImage?.src}
                  srcSet={activeImage?.srcset}
                  alt={activeImage.alt ?? 'Réalisation PLIALU - Façonnage métallique et enveloppe du bâtiment'}
                  className="max-w-[90vw] max-h-[90vh] object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  className="absolute top-6 right-6 text-white/70 hover:text-white text-4xl font-light"
                  onClick={() => setActiveImage(null)}
                >
                  ×
                </button>
              </div>,
              document.body
            )
          )}
        </div>
      )}

      {/* --- SOLUTIONS HUB PAGE CONTENT --- */}
      {currentPage === 'solutions' && (
        <div className="animate-fade-up">
          {/* Hero Solutions */}
          <section className="bg-white pt-48 md:pt-56 pb-20 min-h-[70vh] flex flex-col justify-center">
            <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-4xl space-y-8">
                <span className="text-[10px] font-extrabold tracking-[0.4em] text-zinc-400 uppercase block">CATALOGUE B2B</span>
                <h1 className="text-4xl md:text-6xl tracking-tighter leading-[1.1] font-black uppercase text-[#0E2A33]">
                  Solutions métalliques enveloppe du bâtiment
                </h1>
                <p className="text-base md:text-lg text-[#0E2A33]/70 max-w-2xl leading-relaxed font-medium">
                  Enduit mince sur isolant, ravalement de façade, bardages et cassettes, précadres, tôles prélaquées. Découvrez nos gammes aluminium et acier pour l'enveloppe du bâtiment.
                </p>
              </div>
            </div>
          </section>

          {/* --- BENTO GRID : 6 FAMILLES DE PRODUITS --- */}
          <section className="py-20 bg-[#0a1f26]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-white">Nos Solutions Enveloppe</h2>
                <p className="text-gray-400 max-w-2xl text-lg">
                  Découvrez nos expertises en façonnage métallique sur mesure pour l'habillage technique et esthétique de vos façades.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Carte 1: Bardage */}
                <div
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#0E2A33] border border-white/10 h-[400px] cursor-pointer transition-all duration-300 hover:border-[#E2FD48] hover:shadow-[0_0_30px_rgba(226,253,72,0.15)]"
                  onClick={() => setCurrentPage('solution-bardage')}
                >
                  <div className="relative w-full aspect-video bg-[#071318] border border-white/10 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(226,253,72,0.35),transparent_60%)]" />
                    <span className="relative text-[#0E2A33] opacity-80 text-sm font-semibold">
                      Visualisation 3D en cours
                    </span>
                  </div>

                  <div className="mt-auto p-6 w-full flex flex-col">
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#E2FD48] transition-colors duration-300">
                      Bardages &amp; Cassettes
                    </h3>
                    <p className="mt-2 text-gray-300">
                      Systèmes de fixation invisible et habillages grandes dimensions.
                    </p>
                  </div>
                </div>

                {/* Carte 2: ITE (image réelle conservée) */}
                <div
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#0E2A33] border border-white/10 h-[400px] cursor-pointer transition-all duration-300 hover:border-[#E2FD48] hover:shadow-[0_0_30px_rgba(226,253,72,0.15)]"
                  onClick={() => setCurrentPage('solution-enduit')}
                >
                  <div className="relative w-full aspect-video bg-[#071318] overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773850275/enduitminceisolant-1200px_ibn4ly.webp"
                      srcSet="
                        https://res.cloudinary.com/dyiup6v5x/image/upload/v1773850274/enduitminceisolant-800px_poxwkk.webp 800w,
                        https://res.cloudinary.com/dyiup6v5x/image/upload/v1773850275/enduitminceisolant-1200px_ibn4ly.webp 1200w,
                        https://res.cloudinary.com/dyiup6v5x/image/upload/v1773850275/enduitminceisolant-1600px_y0zenz.webp 1600w
                      "
                      sizes="(max-width: 768px) 800px, (max-width: 1200px) 1200px, 1600px"
                      alt="Enduit mince sur isolant — PLIALU"
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A33] via-[#0E2A33]/40 to-transparent opacity-90" />
                  </div>

                  <div className="mt-auto p-6 w-full flex flex-col">
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#E2FD48] transition-colors duration-300">
                      Enduit mince sur isolant
                    </h3>
                    <p className="mt-2 text-gray-300">
                      Profils de départ, d&apos;angle et d&apos;arrêt pour systèmes ITE.
                    </p>
                  </div>
                </div>

                {/* Carte 3: Précadres */}
                <div
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#0E2A33] border border-white/10 h-[400px] cursor-pointer transition-all duration-300 hover:border-[#E2FD48] hover:shadow-[0_0_30px_rgba(226,253,72,0.15)]"
                  onClick={() => setCurrentPage('solution-precadres')}
                >
                  <div className="relative w-full aspect-video bg-[#071318] border border-white/10 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(226,253,72,0.35),transparent_60%)]" />
                    <span className="relative text-[#0E2A33] opacity-80 text-sm font-semibold">
                      Visualisation 3D en cours
                    </span>
                  </div>

                  <div className="mt-auto p-6 w-full flex flex-col">
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#E2FD48] transition-colors duration-300">
                      Précadres
                    </h3>
                    <p className="mt-2 text-gray-300">
                      Encadrements de baies soudés ou en kit pour une finition étanche et esthétique.
                    </p>
                  </div>
                </div>

                {/* Carte 4: Tôles prélaquées */}
                <div
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#0E2A33] border border-white/10 h-[400px] cursor-pointer transition-all duration-300 hover:border-[#E2FD48] hover:shadow-[0_0_30px_rgba(226,253,72,0.15)]"
                  onClick={() => setCurrentPage('solution-toles')}
                >
                  <div className="relative w-full aspect-video bg-[#071318] border border-white/10 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(226,253,72,0.35),transparent_60%)]" />
                    <span className="relative text-[#0E2A33] opacity-80 text-sm font-semibold">
                      Visualisation 3D en cours
                    </span>
                  </div>

                  <div className="mt-auto p-6 w-full flex flex-col">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white group-hover:text-[#E2FD48] transition-colors duration-300">
                        Tôles prélaquées
                      </h3>
                      <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-200 shadow-sm w-fit">
                        <img
                          src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773322881/INFINI_Noir_ompn2i.png"
                          alt="Logo Infinimetal"
                          className="h-5 w-auto object-contain opacity-80"
                        />
                      </div>
                    </div>
                    <p className="mt-2 text-gray-300">
                      Vente de tôles prélaquées, RAL standards, déroulage sur mesure ou dimensions standards.
                    </p>
                  </div>
                </div>

                {/* Carte 5: Ravalement de façade */}
                <div
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#0E2A33] border border-white/10 h-[400px] cursor-pointer transition-all duration-300 hover:border-[#E2FD48] hover:shadow-[0_0_30px_rgba(226,253,72,0.15)]"
                  onClick={() => setCurrentPage('solution-ravalement')}
                >
                  <div className="relative w-full aspect-video bg-[#071318] border border-white/10 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(226,253,72,0.35),transparent_60%)]" />
                    <span className="relative text-[#0E2A33] opacity-80 text-sm font-semibold">
                      Visualisation 3D en cours
                    </span>
                  </div>

                  <div className="mt-auto p-6 w-full flex flex-col">
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#E2FD48] transition-colors duration-300">
                      Ravalement de façade
                    </h3>
                    <p className="mt-2 text-gray-300">
                      Profils de finition, nez de dalles et goutte d'eau pour la rénovation des bâtiments.
                    </p>
                  </div>
                </div>

                {/* Carte 6: Solutions pour l&apos;étanchéité */}
                <div
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#0E2A33] border border-white/10 h-[400px] cursor-pointer transition-all duration-300 hover:border-[#E2FD48] hover:shadow-[0_0_30px_rgba(226,253,72,0.15)]"
                  onClick={() => setCurrentPage('etancheite')}
                >
                  <div className="relative w-full aspect-video bg-[#071318] border border-white/10 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(226,253,72,0.35),transparent_60%)]" />
                    <span className="relative text-[#0E2A33] opacity-80 text-sm font-semibold">
                      Visualisation 3D en cours
                    </span>
                  </div>

                  <div className="mt-auto p-6 w-full flex flex-col">
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#E2FD48] transition-colors duration-300">
                      Solutions pour l&apos;étanchéité
                    </h3>
                    <p className="mt-2 text-gray-300">
                      Modèle d&apos;étanchéité sur toit plat
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section conversion vers le contact */}
          <section className="py-24 bg-[#071318] text-center border-t border-white/5">
            <div className="max-w-3xl mx-auto px-6 space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-white">Du profilé à la pose — tout se fabrique ici.</h2>
              <p className="text-base md:text-lg text-white/50">Profilés aluminium, accessoires ITE, thermolaquage post-façonnage. Un seul interlocuteur pour tout le système.</p>
              <button
                onClick={() => setCurrentPage('contact')}
                className="px-10 py-4 md:px-12 md:py-5 bg-[#E2FD48] text-[#0E2A33] text-sm font-extrabold rounded-full transition-all shadow-xl hover:shadow-[#E2FD48]/20 hover:-translate-y-1"
              >
                Chiffrer mon projet
              </button>
            </div>
          </section>
        </div>
      )}

      {/* --- EXPERTISES PAGE CONTENT --- */}
      {currentPage === 'expertises' && (
        <div className="animate-fade-in">
          {/* Hero Expertises (contient le sommaire en bas, au-dessus de la ligne de flottaison) */}
          <section ref={expertisesHeroRef} className="bg-white pt-48 md:pt-56 pb-0 min-h-[70vh] flex flex-col">
            <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-4xl space-y-8">
                <span className="text-[10px] font-extrabold tracking-[0.4em] text-zinc-400 uppercase block">
                  PROCESS INDUSTRIEL INTÉGRÉ
                </span>
                <h1 className="text-4xl md:text-6xl tracking-tighter leading-[1.1] font-black uppercase text-[#0E2A33]">
                  FABRICATION DE PIÈCES MÉTALLIQUES SUR MESURE
                </h1>
                <p className="text-base md:text-lg text-[#0E2A33]/70 max-w-2xl leading-relaxed font-medium">
                  De l'étude technique (DXF/DWG), au thermolaquage industriel, jusqu'au pliage, notre chaîne de valeur intégrée garantit précision, conformité et performance chantier.
                </p>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <a
                    href="#expertises-sommaire"
                    onClick={(e) => { e.preventDefault(); document.getElementById('expertises-sommaire')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="inline-flex items-center gap-2 w-full sm:w-auto px-12 py-4 bg-[#0E2A33] text-white text-sm font-extrabold rounded-full transition-all shadow-lg hover:shadow-2xl"
                  >
                    Découvrir notre process
                    <iconify-icon icon="lucide:arrow-down" width="18"></iconify-icon>
                  </a>
                  <a
                    href="#video-complete"
                    onClick={(e) => { e.preventDefault(); document.getElementById('video-complete')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="inline-flex items-center gap-2 w-full sm:w-auto px-12 py-4 border border-[#0E2A33] text-[#0E2A33] text-sm font-bold rounded-full transition-all hover:bg-[#0E2A33] hover:text-white"
                  >
                    Voir la vidéo complète
                    <iconify-icon icon="lucide:play" width="18"></iconify-icon>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Mini Sommaire : sticky sous le header */}
          <div
            id="expertises-sommaire"
            ref={sommaireRef}
            className={`sticky top-16 z-30 scroll-mt-24 shrink-0 ${
              isSommaireSticky
                ? 'bg-white/70 backdrop-blur-md border-t border-zinc-100/50'
                : 'bg-white border-t border-zinc-100'
            }`}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="relative flex items-center overflow-x-auto no-scrollbar py-14 px-4 md:justify-center scroll-snap-x">
                <div className="flex items-center gap-0 md:flex-row">
                  {expertisesDetails.map((exp, idx) => (
                    <React.Fragment key={exp.id}>
                      <a 
                        href={`#${exp.id}`} 
                        onMouseEnter={() => setHoveredStep(idx)}
                        onMouseLeave={() => setHoveredStep(null)}
                        className="relative z-10 flex items-center gap-3 px-3 py-2 rounded-[6px] border border-black/[0.15] bg-black/[0.02] group hover:bg-[#071318] hover:border-[#071318] hover:-translate-y-0.5 transition-all duration-200 scroll-snap-align-start shrink-0"
                      >
                        <span className="text-[10.5px] font-extrabold text-black/60 group-hover:text-[#E2FD48] transition-colors leading-none">
                          0{idx + 1}
                        </span>
                        <span className="text-[11px] font-bold tracking-tight text-[#0E2A33]/70 group-hover:text-white transition-colors uppercase whitespace-nowrap leading-none">
                          {exp.title}
                        </span>
                      </a>
                      {idx < expertisesDetails.length - 1 && (
                        <div className={`hidden md:block w-8 lg:w-12 h-[1px] shrink-0 self-center transition-colors duration-200 ${
                          hoveredStep === idx || hoveredStep === idx + 1 ? 'bg-[#E2FD48]' : 'bg-black/[0.15]'
                        }`}></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Vidéo complète – lecteur Vimeo */}
          <section id="video-complete" className="section--dark py-24 scroll-mt-24" style={{ background: '#071318' }}>
            <div className="max-w-6xl mx-auto px-6">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 aspect-video">
                <iframe
                  src="https://player.vimeo.com/video/1172884207?title=0&byline=0&portrait=0"
                  title="Vidéo complète du process PLIALU"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </section>

          {/* Section Chiffres clés */}
          <section className="py-16 md:py-24 text-white border-b border-white/5" style={{ background: 'linear-gradient(to bottom, #071318 0%, #0b1e26 100%)' }}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-16 md:gap-8 text-center">
                <div className="flex-1 relative md:after:content-[''] md:after:absolute md:after:-right-4 md:after:top-1/2 md:after:-translate-y-1/2 md:after:h-[60%] md:after:w-px md:after:bg-white/[0.12] last:after:hidden">
                  <div className="text-3xl md:text-5xl font-black text-[#E2FD48] mb-3">
                    <strong>+ 5 000 m²</strong>
                  </div>
                  <p className="text-[9px] font-extrabold tracking-widest text-white/40 uppercase">Atelier de production intégré</p>
                </div>
                <div className="flex-1 relative md:after:content-[''] md:after:absolute md:after:-right-4 md:after:top-1/2 md:after:-translate-y-1/2 md:after:h-[60%] md:after:w-px md:after:bg-white/[0.12] last:after:hidden">
                  <div className="text-2xl md:text-4xl lg:text-5xl font-black text-[#E2FD48] mb-3 text-balance leading-tight">
                    <strong>2 lignes intégrées</strong>
                  </div>
                  <p className="text-[9px] font-extrabold tracking-widest text-white/40 uppercase">Façonnage & thermolaquage industriel</p>
                </div>
                <div className="flex-1 relative md:after:content-[''] md:after:absolute md:after:-right-4 md:after:top-1/2 md:after:-translate-y-1/2 md:after:h-[60%] md:after:w-px md:after:bg-white/[0.12] last:after:hidden">
                  <div className="text-3xl md:text-5xl font-black text-[#E2FD48] mb-3 uppercase">
                    <strong>4 M</strong>
                  </div>
                  <p className="text-[9px] font-extrabold tracking-widest text-white/40 uppercase">Longueur maximale</p>
                </div>
              </div>
            </div>
          </section>

          {/* Corps de Page */}
          <div className="bg-[#F3F6F7]">
            {expertisesDetails.map((exp, idx) => (
              <React.Fragment key={exp.id}>
                <section 
                  id={exp.id} 
                  className={`relative overflow-hidden py-12 md:py-20 scroll-mt-36 ${exp.light ? 'bg-white' : 'bg-[#F3F6F7]'} ${idx > 0 ? 'border-t border-[#0E2A33]/5' : ''}`}
                >
                  {/* Background Step Number */}
                  <div className={`absolute top-0 md:top-10 select-none pointer-events-none z-0 ${idx % 2 === 0 ? 'left-[-15px] md:left-[-35px]' : 'right-[-15px] md:right-[-35px]'}`}>
                    <span className="text-[140px] md:text-[220px] lg:text-[340px] font-black leading-none text-black/[0.035] tracking-tighter">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center`}>
                      <div className={`space-y-6 ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                        <div className="space-y-3">
                          <span className="text-[10px] font-extrabold tracking-[0.3em] text-[#0E2A33]/40 uppercase block">
                            {exp.tag}
                          </span>
                          {exp.id === 'thermolaquage-plat' ? (
                            <div className="flex flex-wrap items-center gap-4 mb-6 mt-2">
                              <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
                                Thermolaquage
                              </h2>
                              <div className="flex items-center gap-3 px-5 py-2 bg-gray-50 rounded-full border border-gray-200 shadow-sm mt-1">
                                <img
                                  src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773322881/INFINI_Noir_ompn2i.png"
                                  alt="Logo Infinimetal"
                                  className="h-7 w-auto object-contain opacity-80"
                                />
                              </div>
                            </div>
                          ) : (
                            <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
                              {exp.title}
                            </h2>
                          )}
                        </div>
                        {exp.id === 'bureau-etudes' ? (
                          <p className="text-base md:text-lg leading-relaxed font-medium text-[#0E2A33]/70">
                            Analyse critique de vos plans DXF/DWG, optimisation des calepinages et validation des <strong>tolérances fabrication métal sur mesure</strong> pour une production sans erreur. Nos ingénieurs valident la faisabilité technique de chaque pliage complexe en anticipant les <strong>contraintes fabrication pièces métalliques</strong>.
                          </p>
                        ) : exp.id === 'deroulage-mise-format' ? (
                          <>
                            <p className="text-base md:text-lg leading-relaxed font-medium text-[#0E2A33]/70">
                              Transformation des bobines en formats plats via nos lignes de refendage et cisaillage. Une maîtrise totale de la planéité, première étape clé de notre <strong>fabrication industrielle métal</strong>, indispensable pour les façades haut de gamme et les cassettes aluminium.
                            </p>
                          </>
                        ) : exp.id === 'thermolaquage-plat' ? (
                          <>
                            <p className="text-base md:text-lg leading-relaxed font-medium text-[#0E2A33]/70">
                              Application automatisée de <strong>peinture poudre métal</strong> certifiée Qualicoat. Un rendu homogène et une durabilité accrue face aux exigences du bâtiment.
                            </p>
                          </>
                        ) : exp.id === 'pliage-automatise' ? (
                          <>
                            <p className="text-base md:text-lg leading-relaxed font-medium text-[#0E2A33]/70">
                              Nos centres de pliage robotisés et presses plieuses grande longueur permettent de réaliser des profils complexes avec une répétabilité absolue. Nous repoussons les <strong>limites du pliage aluminium</strong> avec une capacité allant jusqu'à 4 mètres pour vos couvertines et bavettes.
                            </p>
                          </>
                        ) : (
                          <p className="text-base md:text-lg leading-relaxed font-medium text-[#0E2A33]/70">
                            {exp.text}
                          </p>
                        )}
                        <div className="pt-6 border-t border-[#0E2A33]/10 flex flex-col gap-2">
                          <span className="text-[9px] font-bold tracking-[0.2em] text-[#0E2A33]/40 uppercase">DOMAINES D'APPLICATION</span>
                          <p className="text-sm font-bold text-[#0E2A33]/60 italic">{exp.materials}</p>
                        </div>
                      </div>
                      
                      <div className={`relative overflow-hidden rounded-xl shadow-lg h-[320px] md:h-[500px] ${idx % 2 !== 0 ? 'lg:order-1' : ''} group bg-zinc-50`}>
                        {exp.id === 'bureau-etudes' ? (
                          <img
                            src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773074223/BE-1200px_nzpfpj.webp"
                            srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773074223/BE-800px_wa43jv.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1773074223/BE-1200px_nzpfpj.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1773074223/BE-1600px_x6mpih.webp 1600w"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            alt="Ingénieur bureau d'études analysant des plans CAO pour la fabrication de pièces métalliques sur mesure"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover rounded-2xl shadow-lg transition-transform duration-1000 group-hover:scale-105"
                          />
                        ) : exp.id === 'deroulage-mise-format' ? (
                          <img
                            srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773075246/De%CC%81roulage-800px_qz2nnx.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1773075246/De%CC%81roulage-1200px_e0hd8r.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1773075246/De%CC%81roulage-1600px_plmy5l.webp 1600w"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773075246/De%CC%81roulage-1200px_e0hd8r.webp"
                            alt="Stockage de bobines de métal industrielles lourdes dans l'atelier Plialu pour l'étape de déroulage et préparation matière"
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                        ) : exp.id === 'thermolaquage-plat' ? (
                          <img
                            srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773147911/Thermolaquage-800px_xe7she.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1773147911/Thermolaquage-1200px_gnf55a.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1773147911/Thermolaquage-1600px_wo40dl.webp 1600w"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773147911/Thermolaquage-1200px_gnf55a.webp"
                            alt="Thermolaquage et peinture poudre métal"
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                        ) : exp.id === 'pliage-automatise' ? (
                          <img
                            srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773149127/Pliage-800px_x24kz6.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1773149127/Pliage-1200px_bl5tzv.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1773149127/Pliage-1600px_yxsdqe.webp 1600w"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773149127/Pliage-1200px_bl5tzv.webp"
                            alt="Pliage aluminium sur presse plieuse Amada"
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                        ) : (
                          <img
                            src={exp.img}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            alt={exp.alt}
                            loading="lazy"
                            decoding="async"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A33]/10 to-transparent opacity-40"></div>
                      </div>
                    </div>
                  </div>
                </section>
              </React.Fragment>
            ))}
          </div>

          {/* CTA Final */}
          <section className="py-24 bg-[#071318] text-center border-t border-white/5">
            <div className="max-w-3xl mx-auto px-6 space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-white">Vos contraintes techniques ont une réponse ici.</h2>
              <p className="text-base md:text-lg text-white/50">Chargés d'affaires disponibles pour analyser vos plans DXF et optimiser vos coûts avant production.</p>
              <button onClick={() => setCurrentPage('contact')} className="px-10 py-4 md:px-12 md:py-5 bg-[#E2FD48] text-[#0E2A33] text-sm font-extrabold rounded-full transition-all shadow-xl hover:shadow-[#E2FD48]/20 hover:-translate-y-1">
                Soumettre mes plans
              </button>
            </div>
          </section>
        </div>
      )}

      {/* --- RESSOURCES PAGE CONTENT --- */}
      {currentPage === 'ressources' && (
        <div className="animate-fade-up">
          {/* Hero Ressources */}
          <section className="bg-white pt-48 md:pt-56 pb-20 min-h-[70vh] flex flex-col justify-center">
            <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-4xl space-y-8">
                <span className="text-[10px] font-extrabold tracking-[0.4em] text-zinc-400 uppercase block">
                  RESSOURCES TECHNIQUES
                </span>
                <h1 className="text-4xl md:text-6xl tracking-tighter leading-[1.1] font-black uppercase text-[#0E2A33]">
                  Centre de ressources PLIALU
                </h1>
                <p className="text-base md:text-lg text-[#0E2A33]/70 max-w-2xl leading-relaxed font-medium">
                  Dossiers techniques et guides pratiques pour éclairer vos choix de matériaux, sécuriser vos décisions de conception et
                  fiabiliser vos chantiers en enveloppe et habillage métallique.
                </p>
                <a
                  href="#dossiers"
                  onClick={(e) => { e.preventDefault(); document.getElementById('dossiers')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="inline-flex items-center gap-2 w-full sm:w-auto px-12 py-4 bg-[#0E2A33] text-white text-sm font-extrabold rounded-full transition-all shadow-lg hover:shadow-2xl"
                >
                  Accéder aux dossiers complets
                  <iconify-icon icon="lucide:arrow-down" width="18"></iconify-icon>
                </a>
              </div>
            </div>
          </section>

          {/* Cards des 3 dossiers principaux */}
          <section id="dossiers" className="py-24 bg-[#F3F6F7] border-t border-zinc-200 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-16 max-w-3xl">
                <span className="text-[10px] font-extrabold tracking-[0.3em] text-[#0E2A33]/40 uppercase mb-4 block">
                  DOSSIERS TECHNIQUES
                </span>
                <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
                  3 articles pour structurer vos choix techniques
                </h2>
                <p className="text-base md:text-lg text-[#0E2A33]/70 leading-relaxed font-medium">
                  Chaque ressource reprend en détail les notions clés évoquées sur la page d’accueil : choix des alliages, contraintes
                  de façades aluminium et performances du thermolaquage QUALICOAT en environnement réel.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    id: 'ressource-1',
                    tag: 'CHOIX DES MATÉRIAUX',
                    title: "Choisir le bon métal pour une façade extérieure",
                    excerpt:
                      "Comprendre les différences de comportement, de tenue à la corrosion et de maintenance pour choisir la bonne matière en habillage de façade.",
                    readingTime: '5 minutes de lecture'
                  },
                  {
                    id: 'ressource-2',
                    tag: 'CONCEPTION FAÇADE',
                    title: "Pliage aluminium pour façade : limites et tolérances",
                    excerpt:
                      "Découvrez comment maîtriser le pliage aluminium pour façade en anticipant la dilatation thermique, le choix des alliages et le thermolaquage QUALICOAT.",
                    readingTime: '5 minutes de lecture'
                  },
                  {
                    id: 'ressource-3',
                    tag: 'DURABILITÉ & QUALICOAT',
                    title: "Thermolaquage certifié Qualicoat : garanties",
                    excerpt:
                      "La durabilité d'une façade ne dépend pas que du métal. Découvrez pourquoi le thermolaquage certifié Qualicoat après façonnage est le seul rempart contre la corrosion.",
                    readingTime: '5 minutes de lecture',
                    showQualicoatLogo: true
                  }
                ].map((article) => (
                  <article
                    key={article.id}
                    className="group bg-white rounded-[24px] p-8 flex flex-col border border-zinc-100 shadow-sm transition-all duration-200 ease-out hover:border-2 hover:border-[#E2FD48] hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                    onClick={() => setCurrentPage(article.id as typeof currentPage)}
                  >
                    <span className="text-[9px] font-black tracking-[0.3em] text-[#0E2A33]/40 uppercase mb-3">
                      {article.tag}
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-[#0E2A33] tracking-tight mb-4">
                      {article.title}
                    </h3>
                    <p className="text-[#0E2A33]/60 text-sm md:text-base leading-relaxed mb-8">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto pt-6 border-t border-zinc-50 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-[#0E2A33]/30 uppercase">
                        {article.readingTime}
                      </span>
                      <div className="flex items-center gap-2 text-[#0E2A33]/30 group-hover:text-[#0E2A33] transition-colors">
                        <span className="text-[10px] font-bold tracking-[0.18em] uppercase">Lire l’article</span>
                        <iconify-icon icon="lucide:arrow-right" width="18"></iconify-icon>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section className="py-24 bg-[#071318] text-center border-t border-white/5">
            <div className="max-w-3xl mx-auto px-6 space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-white">Prêt à passer à la fabrication ?</h2>
              <p className="text-base md:text-lg text-white/50">Nos techniciens prennent le relais — avec ou sans plans finalisés.</p>
              <button onClick={() => setCurrentPage('contact')} className="px-10 py-4 md:px-12 md:py-5 bg-[#E2FD48] text-[#0E2A33] text-sm font-extrabold rounded-full transition-all shadow-xl hover:shadow-[#E2FD48]/20 hover:-translate-y-1">
                Lancer mon projet
              </button>
            </div>
          </section>
        </div>
      )}

      {/* --- RESSOURCE ARTICLE 1 --- */}
      {currentPage === 'ressource-1' && (
        <div className="animate-fade-up bg-white" style={{ backgroundColor: '#FFFFFF' }}>
          {/* HERO ARTICLE */}
          <section className="pt-32 md:pt-40 pb-12 bg-white" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="max-w-5xl mx-auto px-6">
              <div className="w-full">
                <button
                  type="button"
                  onClick={() => setCurrentPage('ressources')}
                  className="flex items-center gap-2 text-sm font-semibold text-[#0E2A33] hover:text-[#E2FD48] cursor-pointer mb-8 uppercase tracking-widest"
                >
                  <span>← Retour aux ressources</span>
                </button>
                <h1 className="text-4xl md:text-5xl font-black text-[#0E2A33] leading-tight mt-20 text-center max-w-3xl mx-auto">
                  Choisir le bon métal pour une façade extérieure
                </h1>
                <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto text-center">
                  Aluminium, acier ou inox&nbsp;— chaque métal réagit différemment aux contraintes climatiques, aux normes et aux exigences
                  esthétiques d&apos;un projet de façade. Ce guide vous aide à choisir en fonction de votre contexte, avant même d&apos;appeler un
                  fabricant.
                </p>
                <div className="w-full h-[500px] rounded-2xl mt-8 mb-6 relative overflow-hidden mx-auto">
                  <img
                    src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773674033/Article1-hero-1200px_fmli5z.webp"
                    srcSet="
                      https://res.cloudinary.com/dyiup6v5x/image/upload/v1773674033/Article1-hero-800px_ocbjuj.webp 800w,
                      https://res.cloudinary.com/dyiup6v5x/image/upload/v1773674033/Article1-hero-1200px_fmli5z.webp 1200w,
                      https://res.cloudinary.com/dyiup6v5x/image/upload/v1773674033/Article1-hero-1600px_uh1kd0.webp 1600w
                    "
                    sizes="(max-width: 768px) 800px, (max-width: 1200px) 1200px, 1600px"
                    alt="Façade aluminium thermolaqué anthracite — réalisation PLIALU Rhône-Alpes"
                    className="w-full h-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </section>

          {/* CORPS DE L'ARTICLE */}
          <section className="pt-8 pb-20 bg-white" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="max-w-3xl mx-auto px-6 text-gray-700 leading-relaxed space-y-12">
              {/* Section 1 */}
              <div className="pt-4 mt-8 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
                  Pourquoi le choix du substrat est déterminant
                </h2>
                <p className="text-base mb-12">
                  Le substrat (matériau de base) d&apos;une façade détermine le poids sur l&apos;ossature secondaire, la liberté de formes
                  obtenue au pliage et la durabilité globale de l&apos;enveloppe. Un métal trop lourd peut surdimensionner les fixations,
                  alors qu&apos;un matériau mal adapté au climat accélère la corrosion et les désordres esthétiques. Un mauvais choix en phase
                  d&apos;étude se traduit souvent par un surcoût en phase chantier&nbsp;: renforts ajoutés, reprises de calepinage ou retours usine
                  imprévus. Les tolérances de pliage
                  <button
                    onClick={() => setCurrentPage('ressource-2')}
                    className="underline underline-offset-4 decoration-[#6B7280] hover:decoration-[#0E2A33] font-semibold text-[#0E2A33] ml-1"
                  >
                    (précision géométrique du façonnage)
                  </button>
                  varient elles aussi selon la dureté du substrat choisi.
                </p>
              </div>

              {/* Section 2 */}
              <div className="pt-8 mt-24 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
                  Aluminium, acier galvanisé, inox&nbsp;: comparatif technique
                </h2>
                <p className="text-base mb-12">
                  Aluminium, acier galvanisé et inox 316L couvrent à eux trois la grande majorité des projets de façade. L&apos;aluminium
                  s&apos;impose pour les enveloppes légères et très dessinées, l&apos;acier galvanisé pour les structures plus lourdes et
                  économiques, et l&apos;inox 316L pour les environnements agressifs (zones marines ou sites industriels exposés). Comprendre
                  leurs différences permet d&apos;adapter le bon métal à chaque contexte plutôt que de tout traiter de la même façon.
                </p>
                <div className="overflow-x-auto min-w-full">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#0E2A33] text-white">
                        <th className="py-3 px-3 text-left">Critère</th>
                        <th className="py-3 px-3 text-left">Aluminium</th>
                        <th className="py-3 px-3 text-left">Acier galvanisé</th>
                        <th className="py-3 px-3 text-left">Inox 316L</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-50">
                        <td className="py-4 px-6 font-medium text-[#0E2A33]">Densité</td>
                        <td className="py-4 px-6">2,7 g/cm³</td>
                        <td className="py-4 px-6">7,8 g/cm³</td>
                        <td className="py-4 px-6">7,9 g/cm³</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-6 font-medium text-[#0E2A33]">Résistance naturelle à la corrosion</td>
                        <td className="py-4 px-6">Oui</td>
                        <td className="py-4 px-6">Non (nécessite galvanisation)</td>
                        <td className="py-4 px-6">Excellente</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-4 px-6 font-medium text-[#0E2A33]">Pliage sur mesure</td>
                        <td className="py-4 px-6">Facile</td>
                        <td className="py-4 px-6">Possible jusqu&apos;à 3&nbsp;mm</td>
                        <td className="py-4 px-6">Complexe</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-6 font-medium text-[#0E2A33]">Zone littorale</td>
                        <td className="py-4 px-6">Avec traitement Seaside</td>
                        <td className="py-4 px-6">Déconseillé</td>
                        <td className="py-4 px-6">Recommandé</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-4 px-6 font-medium text-[#0E2A33]">Coût matière</td>
                        <td className="py-4 px-6">Moyen</td>
                        <td className="py-4 px-6">Faible</td>
                        <td className="py-4 px-6">Élevé</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-6 font-medium text-[#0E2A33]">Durée de vie estimée</td>
                        <td className="py-4 px-6">30-40 ans</td>
                        <td className="py-4 px-6">20-25 ans</td>
                        <td className="py-4 px-6">40+ ans</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 3 */}
              <div className="pt-8 mt-24 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
                  3 contextes, 3 choix différents
                </h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 border-t-4 border-[#E2FD48] p-8 shadow-sm relative">
                    <div className="w-10 h-10 rounded-full bg-[#E2FD48] flex items-center justify-center text-[#0E2A33] font-black text-sm absolute -top-5 left-6">
                      01
                    </div>
                    <h3 className="text-base font-bold text-[#0E2A33]">Façade urbaine</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold">Matériau&nbsp;:</span> Aluminium thermolaqué
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      <span className="font-semibold">Pourquoi&nbsp;:</span> Légèreté, liberté de formes et large choix de coloris RAL pour
                      s&apos;adapter aux chartes architecturales.
                    </p>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 border-t-4 border-[#E2FD48] p-8 shadow-sm relative">
                    <div className="w-10 h-10 rounded-full bg-[#E2FD48] flex items-center justify-center text-[#0E2A33] font-black text-sm absolute -top-5 left-6">
                      02
                    </div>
                    <h3 className="text-base font-bold text-[#0E2A33]">Façade maritime</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold">Matériau&nbsp;:</span> Aluminium traitement Seaside ou inox 316L
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      <span className="font-semibold">Pourquoi&nbsp;:</span> Résistance à la corrosion filiforme en zone littorale et
                      tenue longue durée face aux embruns salins.
                    </p>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 border-t-4 border-[#E2FD48] p-8 shadow-sm relative">
                    <div className="w-10 h-10 rounded-full bg-[#E2FD48] flex items-center justify-center text-[#0E2A33] font-black text-sm absolute -top-5 left-6">
                      03
                    </div>
                    <h3 className="text-base font-bold text-[#0E2A33]">Structure industrielle</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold">Matériau&nbsp;:</span> Acier galvanisé prélaqué (nuance S320GD)
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      <span className="font-semibold">Pourquoi&nbsp;:</span> Rigidité, coût maîtrisé et adaptation aux grandes portées des
                      bâtiments logistiques.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="pt-8 mt-24 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
                  Ce que ça change sur le traitement de surface
                </h2>
                <p className="text-base mb-12">
                  Le substrat choisi conditionne directement le process de thermolaquage (application d&apos;une poudre polymérisée pour
                  protéger et teinter la pièce). L&apos;aluminium accepte les épaisseurs les plus fines, autour de 45&nbsp;microns, tandis que
                  l&apos;acier exige une préparation plus lourde pour éviter la corrosion sous film. La
                  <button
                    onClick={() => setCurrentPage('ressource-3')}
                    className="underline underline-offset-4 decoration-[#6B7280] hover:decoration-[#0E2A33] font-semibold text-[#0E2A33] mx-1"
                  >
                    certification QUALICOAT
                  </button>
                  (label européen de qualité du thermolaquage) impose des protocoles différents selon le métal de base, un process
                  industriel que vous pouvez observer en détail sur notre{' '}
                  <button
                    onClick={() => setCurrentPage('expertises')}
                    className="underline underline-offset-4 decoration-[#6B7280] hover:decoration-[#0E2A33] font-semibold text-[#0E2A33]"
                  >
                    page Expertises
                  </button>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* PHOTO PRODUIT PLIALU */}
          <section className="bg-white pb-12" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-4xl mx-auto mt-12">
                <img
                  src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773674033/Article1-1200px_fq9vgq.webp"
                  srcSet="
                    https://res.cloudinary.com/dyiup6v5x/image/upload/v1773674033/Article1-800px_rrm7j2.webp 800w,
                    https://res.cloudinary.com/dyiup6v5x/image/upload/v1773674033/Article1-1200px_fq9vgq.webp 1200w,
                    https://res.cloudinary.com/dyiup6v5x/image/upload/v1773674033/Article1-1600px_aj9jzf.webp 1600w
                  "
                  sizes="(max-width: 768px) 800px, (max-width: 1200px) 1200px, 1600px"
                  alt="Pièces métalliques pliées sur mesure en atelier — façonnage PLIALU"
                  loading="lazy"
                  className="w-full h-64 object-cover rounded-2xl mt-12"
                />
              </div>
            </div>
          </section>

          {/* SECTION CONTACT BAS DE PAGE */}
          <section className="py-24 bg-[#071318] text-center border-t border-white/5">
            <div className="max-w-3xl mx-auto px-6 space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-white">
                Votre métal est choisi. Place au façonnage.
              </h2>
              <p className="text-base md:text-lg text-white/50">
                Nos techniciens optimisent vos profils et vos coûts dès réception des plans.
              </p>
              <button
                onClick={() => setCurrentPage('contact')}
                className="px-10 py-4 md:px-12 md:py-5 bg-[#E2FD48] text-[#0E2A33] text-sm font-extrabold rounded-full transition-all shadow-xl hover:shadow-[#E2FD48]/20 hover:-translate-y-1"
              >
                Demander un chiffrage
              </button>
            </div>
          </section>
        </div>
      )}

      {/* --- RESSOURCE ARTICLE 2 --- */}
      {currentPage === 'ressource-2' && (
        <div className="animate-fade-up bg-white" style={{ backgroundColor: '#FFFFFF' }}>
          {/* HERO ARTICLE */}
          <section className="pt-32 md:pt-40 pb-12 bg-white" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="max-w-5xl mx-auto px-6">
              <div className="w-full">
                <button
                  type="button"
                  onClick={() => setCurrentPage('ressources')}
                  className="flex items-center gap-2 text-sm font-semibold text-[#0E2A33] hover:text-[#E2FD48] cursor-pointer mb-8 uppercase tracking-widest"
                >
                  <span>← RETOUR AUX RESSOURCES</span>
                </button>

                <h1 className="text-4xl md:text-5xl font-black text-[#0E2A33] leading-tight mt-20 max-w-3xl mx-auto text-center">
                  Pliage aluminium : limites et tolérances
                </h1>

                <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto text-center">
                  Épaisseur, rayon de pliage, angle cible — trois paramètres qui déterminent si une pièce aluminium sera précise,
                  durable, ou à refaire. Ce guide vous explique ce que votre fabricant doit maîtriser avant même de démarrer la
                  production.
                </p>

                <img
                  src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773679861/Article2hero-1600px_ny59xx.webp"
                  srcSet="
                    https://res.cloudinary.com/dyiup6v5x/image/upload/v1773679860/Article2hero-800px_wpy72f.webp 800w,
                    https://res.cloudinary.com/dyiup6v5x/image/upload/v1773679860/Article2hero-1200px_k7lnyr.webp 1200w,
                    https://res.cloudinary.com/dyiup6v5x/image/upload/v1773679861/Article2hero-1600px_ny59xx.webp 1600w
                  "
                  sizes="100vw"
                  alt="Presse plieuse CNC en action — Atelier PLIALU"
                  className="w-full h-[500px] object-cover rounded-2xl mt-8"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          {/* CORPS DE L'ARTICLE */}
          <section className="pt-8 pb-20 bg-white" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="max-w-3xl mx-auto px-6 text-gray-700 leading-relaxed space-y-12">
              {/* Section 1 */}
              <div className="pt-8 mt-8 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
                  Pourquoi l&apos;aluminium est le métal de référence en pliage
                </h2>
                <p className="text-base mb-12">
                  L&apos;aluminium combine légèreté (2,7 g/cm³ — 3 fois plus léger que l&apos;acier), malléabilité et résistance naturelle à la
                  corrosion. Ces propriétés en font le substrat (matériau de base) privilégié pour le façonnage de précision en enveloppe
                  du bâtiment. Attention&nbsp;: toutes les nuances d&apos;aluminium ne se comportent pas de la même façon au pliage — la nuance
                  1050 est plus souple, la 5754 plus rigide et résistante en milieu marin. Le choix de la nuance dépend aussi du contexte
                  du projet — un sujet que nous détaillons dans notre{' '}
                  <button
                    type="button"
                    onClick={() => setCurrentPage('ressource-1')}
                    className="underline underline-offset-4 decoration-[#6B7280] hover:decoration-[#0E2A33] font-semibold text-[#0E2A33]"
                  >
                    guide sur le choix du métal de façade
                  </button>
                  .
                </p>
              </div>

              {/* Section 2 */}
              <div className="pt-8 mt-20 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
                  Les 3 paramètres techniques d&apos;un pliage réussi
                </h2>
                <p className="text-base mb-12">
                  Pour obtenir une pièce conforme aux plans, trois paramètres doivent être maîtrisés simultanément. L&apos;épaisseur de la tôle
                  détermine la rigidité de la pièce finale et les capacités machines nécessaires. Le rayon intérieur de pliage est la
                  distance minimale entre les deux faces pliées — en dessous d&apos;un seuil critique, la face externe de l&apos;angle se craquelle.
                  L&apos;angle de pliage cible, enfin, doit tenir compte du retour élastique (springback)&nbsp;: phénomène par lequel la tôle reprend
                  légèrement sa forme initiale une fois la pression de la presse relâchée. Une presse plieuse CNC (Commande Numérique par
                  Calculateur) compense automatiquement ce retour élastique en sur-pliant légèrement la pièce avant relâchement.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse mt-6 text-sm">
                    <thead>
                      <tr className="bg-[#0E2A33] text-white">
                        <th className="px-6 py-4 text-left">Épaisseur</th>
                        <th className="px-6 py-4 text-left">Rayon mini intérieur</th>
                        <th className="px-6 py-4 text-left">Angle mini réalisable</th>
                        <th className="px-6 py-4 text-left">Usage typique</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">1 mm</td>
                        <td className="px-6 py-4">1,5 mm</td>
                        <td className="px-6 py-4">15°</td>
                        <td className="px-6 py-4">Habillage léger, sous-faces</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">1,5 mm</td>
                        <td className="px-6 py-4">2 mm</td>
                        <td className="px-6 py-4">25°</td>
                        <td className="px-6 py-4">Bardage, cassettes façade</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">2 mm</td>
                        <td className="px-6 py-4">3 mm</td>
                        <td className="px-6 py-4">30°</td>
                        <td className="px-6 py-4">Profils structurels, cadres</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">3 mm</td>
                        <td className="px-6 py-4">4,5 mm</td>
                        <td className="px-6 py-4">45°</td>
                        <td className="px-6 py-4">Pièces techniques, renforts</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">4-5 mm</td>
                        <td className="px-6 py-4">6 mm</td>
                        <td className="px-6 py-4">60°</td>
                        <td className="px-6 py-4">Éléments porteurs lourds</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-sm text-gray-400 italic mt-3">
                    * Valeurs indicatives — nous consulter pour votre projet.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="pt-8 mt-20 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
                  Tolérance ±0,3 mm : ce que ça change sur chantier
                </h2>
                <p className="text-base mb-12">
                  La tolérance de pliage (précision géométrique du façonnage) de ±0,3&nbsp;mm obtenue par presse plieuse CNC (Commande
                  Numérique par Calculateur) garantit la régularité des joints entre cassettes, l&apos;étanchéité à l&apos;air et à l&apos;eau
                  de l&apos;enveloppe, et l&apos;absence de reprises en pose. Sans cette précision, les désaffleurs (décalages visibles entre deux
                  pièces adjacentes) compromettent l&apos;aspect final et génèrent des retouches coûteuses sur chantier. C&apos;est pourquoi nos
                  presses plieuses CNC sont étalonnées quotidiennement et chaque série fait l&apos;objet d&apos;un contrôle dimensionnel avant
                  expédition.
                </p>
              </div>

              {/* Section 4 */}
              <div className="pt-8 mt-20 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
                  3 limites techniques à anticiper en phase d&apos;étude
                </h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 border-t-4 border-[#E2FD48] p-8 shadow-sm relative">
                    <div className="w-10 h-10 rounded-full bg-[#E2FD48] flex items-center justify-center text-[#0E2A33] font-black text-sm absolute -top-5 left-6">
                      01
                    </div>
                    <h3 className="text-base font-bold text-[#0E2A33]">Épaisseur maximale</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Au-delà de 4&nbsp;mm, le pliage aluminium exige des presses de très haute capacité. Au-delà de 6&nbsp;mm, on bascule sur
                      de l&apos;usinage (fraisage) plutôt que du pliage — un process différent, un délai et un coût différents.
                    </p>
                  </div>

                  <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 border-t-4 border-[#E2FD48] p-8 shadow-sm relative">
                    <div className="w-10 h-10 rounded-full bg-[#E2FD48] flex items-center justify-center text-[#0E2A33] font-black text-sm absolute -top-5 left-6">
                      02
                    </div>
                    <h3 className="text-base font-bold text-[#0E2A33]">Rayon trop serré</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Un rayon intérieur inférieur à l&apos;épaisseur de la tôle génère des micro-craquelures sur la face externe, invisibles
                      à l&apos;œil nu mais fragilisant la tenue du revêtement sur le long terme.
                    </p>
                  </div>

                  <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 border-t-4 border-[#E2FD48] p-8 shadow-sm relative">
                    <div className="w-10 h-10 rounded-full bg-[#E2FD48] flex items-center justify-center text-[#0E2A33] font-black text-sm absolute -top-5 left-6">
                      03
                    </div>
                    <h3 className="text-base font-bold text-[#0E2A33]">Retour élastique</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Quand la presse relâche la pression, la tôle reprend légèrement sa forme initiale — c&apos;est le springback.
                      Si ce phénomène n&apos;est pas intégré dans la programmation CNC, l&apos;angle final ne correspond pas aux plans.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="pt-8 mt-20 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
                  Comment la qualité du pliage conditionne le thermolaquage
                </h2>
                <p className="text-base mb-12">
                  Une surface craquelée ou géométriquement imprécise ne permet pas une accroche homogène de la poudre polymérisée.
                  Résultat&nbsp;: décollements locaux, taches d&apos;oxydation sous revêtement, et impossibilité d&apos;obtenir la certification
                  QUALICOAT (label européen de qualité du thermolaquage) sur la pièce concernée. Découvrez{' '}
                  <button
                    type="button"
                    onClick={() => setCurrentPage('ressource-3')}
                    className="underline underline-offset-4 decoration-[#6B7280] hover:decoration-[#0E2A33] font-semibold text-[#0E2A33]"
                  >
                    les protocoles exacts que la certification QUALICOAT impose sur la préparation de surface
                  </button>
                  , et comment s&apos;inscrit{' '}
                  <button
                    type="button"
                    onClick={() => setCurrentPage('expertises')}
                    className="underline underline-offset-4 decoration-[#6B7280] hover:decoration-[#0E2A33] font-semibold text-[#0E2A33]"
                  >
                    notre process de thermolaquage intégré en atelier
                  </button>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* PHOTO PRODUIT PLIALU */}
          <section className="bg-white pb-12" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-4xl mx-auto mt-12">
                <img
                  src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773679861/Article2-1600px_kkmsjf.webp"
                  srcSet="
                    https://res.cloudinary.com/dyiup6v5x/image/upload/v1773679860/Article2-800px_gjokka.webp 800w,
                    https://res.cloudinary.com/dyiup6v5x/image/upload/v1773679861/Article2-1200px_u1bj5c.webp 1200w,
                    https://res.cloudinary.com/dyiup6v5x/image/upload/v1773679861/Article2-1600px_kkmsjf.webp 1600w
                  "
                  sizes="100vw"
                  alt="Pièces aluminium pliées — Atelier PLIALU, Rhône-Alpes"
                  className="w-full h-64 object-cover rounded-2xl mt-12"
                  loading="lazy"
                />
                <p className="text-sm text-gray-400 text-center mt-2">
                  Pièces aluminium pliées — Atelier PLIALU, Rhône-Alpes
                </p>
              </div>
            </div>
          </section>

          {/* SECTION CONTACT BAS DE PAGE */}
          <section className="py-24 bg-[#071318] text-center border-t border-white/5">
            <div className="max-w-3xl mx-auto px-6 space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-white">
                ±0,3 mm garanti. Sur votre prochaine commande aussi.
              </h2>
              <p className="text-base md:text-lg text-white/50">
                Presse plieuse CNC étalonnée quotidiennement. Contrôle dimensionnel systématique avant expédition.
              </p>
              <button
                onClick={() => setCurrentPage('contact')}
                className="px-10 py-4 md:px-12 md:py-5 bg-[#E2FD48] text-[#0E2A33] text-sm font-extrabold rounded-full transition-all shadow-xl hover:shadow-[#E2FD48]/20 hover:-translate-y-1"
              >
                Soumettre mes plans
              </button>
            </div>
          </section>
        </div>
      )}

      {/* --- RESSOURCE ARTICLE 3 --- */}
      {currentPage === 'ressource-3' && (
        <div className="animate-fade-up bg-white" style={{ backgroundColor: '#FFFFFF' }}>
          {/* HERO ARTICLE */}
          <section className="pt-32 md:pt-40 pb-12 bg-white" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="max-w-5xl mx-auto px-6">
              <div className="w-full">
                <button
                  type="button"
                  onClick={() => setCurrentPage('ressources')}
                  className="flex items-center gap-2 text-sm font-semibold text-[#0E2A33] hover:text-[#E2FD48] cursor-pointer mb-8 uppercase tracking-widest"
                >
                  <span>← Retour aux ressources</span>
                </button>

                <h1 className="text-4xl md:text-5xl font-black text-[#0E2A33] leading-tight mt-20 max-w-3xl mx-auto text-center">
                  Thermolaquage certifié Qualicoat : garanties
                </h1>

                <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto text-center">
                  La durabilité d'une façade métallique ne se joue pas uniquement sur le choix de l'alliage. C'est le traitement de
                  surface qui détermine la résistance réelle du système dans le temps — face aux UV, à l'humidité et aux cycles
                  thermiques. QUALICOAT est la certification internationale qui valide cette performance. PLIALU l'applique sur
                  l'intégralité de sa production thermolaquée, avec une particularité process décisive : le laquage intervient après le
                  façonnage, jamais avant. La performance d'un traitement de surface se décide en phase d'études, pas sur chantier — cet
                  article détaille ce qu'un prescripteur doit exiger et pourquoi.
                </p>

                <div className="relative mt-8">
                  <img
                    srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/f_auto,q_auto,w_800/v1774283296/PLIALU_Juin24_245_G_Perret_vsy4ar.jpg 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/f_auto,q_auto,w_1200/v1774283296/PLIALU_Juin24_245_G_Perret_vsy4ar.jpg 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/f_auto,q_auto,w_1600/v1774283296/PLIALU_Juin24_245_G_Perret_vsy4ar.jpg 1600w"
                    sizes="100vw"
                    src="https://res.cloudinary.com/dyiup6v5x/image/upload/f_auto,q_auto,w_1200/v1774283296/PLIALU_Juin24_245_G_Perret_vsy4ar.jpg"
                    alt="RAL et teintes thermolaquage certifié QUALICOAT"
                    className="w-full h-[500px] object-cover rounded-2xl"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
                    <img
                      src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1771500844/logo_qf_kzo395.png"
                      alt="Certification QUALICOAT"
                      className="h-8 w-auto"
                      loading="lazy"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-400 text-center mt-2">Nuancier RAL — Atelier PLIALU, Rhône-Alpes</p>
              </div>
            </div>
          </section>

          {/* CORPS DE L'ARTICLE */}
          <section className="pt-8 pb-20 bg-white" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="max-w-3xl mx-auto px-6 text-gray-700 leading-relaxed space-y-12">
              <div className="pt-8 mt-8 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">Pourquoi la certification QUALICOAT change tout</h2>
                <p className="text-base mb-6">
                  QUALICOAT est un label de qualité délivré par une association internationale indépendante, basée en Suisse, qui certifie
                  les laqueurs industriels sur aluminium et alliages légers. Le périmètre de certification ne se limite pas à un contrôle
                  visuel de la teinte ou de l'aspect de surface. QUALICOAT impose une validation multidimensionnelle des propriétés
                  physico-chimiques du complexe métal-peinture : adhérence, épaisseur de couche, résistance à la corrosion, stabilité
                  colorimétrique sous exposition UV, et résistance mécanique aux chocs et à l'abrasion.
                </p>
                <p className="text-base mb-6">
                  Chaque laqueur certifié est audité régulièrement. Les paramètres de process — températures de cuisson, durées de
                  polymérisation, concentrations des bains chimiques — sont tracés et contrôlés. Ce niveau d'exigence garantit aux
                  prescripteurs une reproductibilité industrielle du résultat, indépendamment du lot de production ou de la période de
                  fabrication.
                </p>
                <p className="text-base mb-12">
                  Un profilé thermolaqué certifié QUALICOAT n'est pas simplement peint. Il est traité selon un protocole normé dont chaque
                  étape est mesurée, enregistrée et vérifiable.
                </p>
              </div>

              <div className="pt-8 mt-20 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">Post-laquage vs pré-laquage : l'argument PLIALU</h2>
                <p className="text-base mb-6">
                  Dans l'industrie du façonnage métallique, deux approches coexistent pour le laquage des pièces de façade.
                </p>
                <p className="text-base mb-6">
                  Le pré-laquage en bobine (coil coating) consiste à laquer la tôle en continu avant les opérations de découpe et de
                  pliage. C'est un process adapté aux éléments plans de grande série. Ses limites apparaissent dès qu'il y a façonnage.
                  Chaque pli génère des micro-fissures dans le film de peinture sur les arêtes vives et les angles serrés. Les tranches de
                  découpe restent nues — métal brut exposé à l'atmosphère — et constituent des points d'amorce de corrosion. Sur des
                  éléments de façade exposés aux intempéries pendant 20 ou 30 ans, ces défauts ne sont pas cosmétiques : ils sont
                  fonctionnels.
                </p>
                <p className="text-base mb-12">
                  Le post-laquage — la méthode intégrée dans le process PLIALU — inverse la logique. La tôle est d'abord découpée,
                  poinçonnée, pliée et assemblée. Ce n'est qu'une fois la pièce dans sa géométrie définitive que le traitement de surface
                  intervient. Le résultat est un enrobage intégral de la pièce finie : arêtes vives, retours de pli, intérieur des
                  perçages et tranches de découpe sont couverts de manière homogène. La couche de peinture polymérise (durcit par réaction
                  chimique sous chaleur) sur une géométrie stabilisée — aucune contrainte mécanique ultérieure ne vient solliciter le film.
                </p>
                <p className="text-base mb-12">
                  Pour un prescripteur, la différence est nette : le post-laquage supprime les deux faiblesses intrinsèques du pré-laquage
                  sur pièces façonnées et garantit une protection complète sur 100 % de la surface exposée.
                </p>
                <img
                  srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/v1774283604/Postlaquage-800px_azmopo.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1774283603/Postlaquage-1200px_cwuvqo.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1774283604/Postlaquage-1600px_rpy0k2.webp 1600w"
                  sizes="100vw"
                  src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1774283603/Postlaquage-1200px_cwuvqo.webp"
                  alt="Poudrage électrostatique post-laquage thermolaquage certifié QUALICOAT — atelier PLIALU"
                  className="w-full h-[420px] object-cover rounded-2xl"
                  loading="lazy"
                />
                <p className="text-sm text-gray-400 text-center mt-2">
                  Poudrage électrostatique sur pièces façonnées — Atelier PLIALU, Rhône-Alpes
                </p>
              </div>

              <div className="pt-8 mt-20 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">Le processus QUALICOAT : ingénierie de surface</h2>
                <p className="text-base mb-6">
                  Le thermolaquage certifié QUALICOAT est une séquence industrielle en trois phases, où chaque étape conditionne la
                  performance de la suivante.
                </p>
                <p className="text-base mb-2">
                  <strong>Prétraitement chimique</strong>
                </p>
                <p className="text-base mb-6">
                  La surface de l'aluminium est d'abord dégraissée puis dérochée (dissolution de la couche d'oxyde naturel et des
                  impuretés métalliques). Ces deux étapes exposent un substrat propre et réactif. Vient ensuite la conversion chimique
                  Chrome-free : des sels de titane ou de zirconium créent une couche nanométrique entre le substrat et la laque, qui
                  renforce l'adhérence et constitue une barrière anticorrosion supplémentaire.
                </p>
                <p className="text-base mb-2">
                  <strong>Poudrage électrostatique</strong>
                </p>
                <p className="text-base mb-6">
                  La peinture poudre sèche (sans solvant liquide) est projetée par pistolet électrostatique. Les particules chargées se
                  déposent de manière uniforme sur toutes les géométries — retours, angles, cavités. L'épaisseur minimale exigée par
                  QUALICOAT est de 60 microns. Les excédents sont recyclés, et l'absence de solvant rend le procédé peu émissif en COV
                  (Composés Organiques Volatils).
                </p>
                <p className="text-base mb-2">
                  <strong>Polymérisation et réticulation thermique</strong>
                </p>
                <p className="text-base mb-12">
                  La pièce est cuite entre 180 °C et 200 °C pendant une durée contrôlée. La poudre fond, s'étale en film continu, puis
                  polymérise : les chaînes moléculaires se réticulent (créent des liaisons chimiques croisées irréversibles) pour former un
                  revêtement durci et stable. QUALICOAT impose des fenêtres de cuisson strictes pour garantir l'équilibre entre dureté de
                  surface et souplesse résiduelle — nécessaire pour encaisser les dilatations thermiques en façade.
                </p>
              </div>

              <div className="pt-8 mt-20 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">Les protocoles de validation</h2>
                <p className="text-base mb-6">
                  La certification QUALICOAT repose sur des tests normalisés réalisés sur chaque lot de production. Ces protocoles qualifient
                  le comportement physico-chimique du système complet substrat-conversion-peinture.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse mt-6 text-sm">
                    <thead>
                      <tr className="bg-[#0E2A33] text-white">
                        <th className="px-6 py-4 text-left">Test</th>
                        <th className="px-6 py-4 text-left">Ce qu'il garantit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">Test de quadrillage ISO 2409</td>
                        <td className="px-6 py-4">
                          Un quadrillage est incisé dans le film, puis un ruban adhésif normalisé est arraché. La classification Grade 0 est
                          obligatoire : aucun éclat, aucun détachement. Valide l'adhérence entre conversion et laque.
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">Mesure de brillance ISO 2813</td>
                        <td className="px-6 py-4">
                          Contrôle de la rétention de brillance sous UV avec des tolérances strictes par rapport à l'échantillon initial. Une
                          perte excessive signale une dégradation prématurée du liant polymère.
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">Vieillissement accéléré et brouillard salin</td>
                        <td className="px-6 py-4">
                          Exposition en atmosphère corrosive simulant plusieurs années d'intempéries. Valide la tenue du système dans le temps
                          en environnement urbain ou industriel.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <img
                  srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/v1774284080/Thermolaquage-800px_mitqzm.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1774284080/Thermolaquage-1200px_lyexrk.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1774284081/Thermolaquage-1600px_pke4oc.webp 1600w"
                  sizes="100vw"
                  src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1774284080/Thermolaquage-1200px_lyexrk.webp"
                  alt="Test de quadrillage ISO 2409 — protocole de validation thermolaquage certifié QUALICOAT atelier PLIALU"
                  className="w-full h-[420px] object-cover rounded-2xl mt-10"
                  loading="lazy"
                />
                <p className="text-sm text-gray-400 text-center mt-2">
                  Test de quadrillage ISO 2409 — Contrôle qualité PLIALU, Rhône-Alpes
                </p>
              </div>

              <div className="pt-8 mt-20 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">Classes de poudres : durabilité UV</h2>
                <p className="text-base mb-6">
                  Le choix de la classe de poudre détermine la stabilité colorimétrique (maintien de la teinte RAL d'origine) et la
                  rétention de brillance sur la durée d'exposition aux UV. C'est un paramètre à intégrer dès la rédaction du CCTP (Cahier
                  des Clauses Techniques Particulières, document contractuel qui définit les exigences techniques du marché) — pas en fin de
                  projet lorsque les arbitrages budgétaires ont déjà été faits.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse mt-6 text-sm">
                    <thead>
                      <tr className="bg-[#0E2A33] text-white">
                        <th className="px-6 py-4 text-left">Classe</th>
                        <th className="px-6 py-4 text-left">Durabilité UV</th>
                        <th className="px-6 py-4 text-left">Usage recommandé</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">Classe 1</td>
                        <td className="px-6 py-4">
                          Poudres standards, testées 1 an d'exposition naturelle (ISO 2810, protocole Florida).
                        </td>
                        <td className="px-6 py-4">
                          Projets courants, éléments peu exposés aux UV directs : façades nord, éléments protégés par des débords.
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">Classe 2</td>
                        <td className="px-6 py-4">
                          Poudres Super Durables, testées 3 ans. Rétention de brillance et stabilité colorimétrique nettement supérieures.
                        </td>
                        <td className="px-6 py-4">
                          Façades exposées, orientations sud et ouest, bâtiments tertiaires, ERP, équipements publics. Recommandé par défaut
                          pour tout élément de façade visible.
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">Classe 3</td>
                        <td className="px-6 py-4">
                          Poudres Ultra Durables, niveau d'exigence maximal. Performances validées pour les conditions d'exposition les plus
                          sévères.
                        </td>
                        <td className="px-6 py-4">
                          Environnements extrêmes : altitude, zones industrielles à forte concentration de polluants atmosphériques.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-8 mt-20 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">Ce qu'un prescripteur doit exiger</h2>
                <p className="text-base mb-6">Quatre points à verrouiller dans le cahier des charges.</p>
                <p className="text-base mb-6">
                  <strong>Exiger des poudres de Classe 2 minimum sur toutes les façades sollicitées par les UV.</strong> La Classe 1 peut
                  montrer une dérive colorimétrique visible après quelques années sur une orientation sud ou ouest fortement exposée. Le
                  surcoût de la Classe 2 est marginal rapporté à la durée de vie du bâtiment.
                </p>
                <p className="text-base mb-6">
                  <strong>Privilégier systématiquement le post-laquage après façonnage pour les éléments exposés.</strong> Le pré-laquage est
                  un compromis acceptable sur des pièces planes non découpées. Dès qu'il y a pliage, perçage ou assemblage, le post-laquage
                  est le seul process qui garantit un enrobage intégral sans zone de fragilité.
                </p>
                <p className="text-base mb-6">
                  <strong>Vérifier la traçabilité des certificats du laqueur.</strong> Un laqueur certifié QUALICOAT doit fournir, pour
                  chaque lot, les paramètres de cuisson, les résultats des tests d'adhérence ISO 2409 et les contrôles d'épaisseur de
                  couche. Si ces données ne sont pas disponibles sur demande, la certification n'a aucune valeur opérationnelle.
                </p>
                <p className="text-base mb-12">
                  <strong>Associer le choix du métal et de la référence RAL au traitement de surface dès la phase d'études.</strong>{' '}
                  L'alliage, l'épaisseur, la teinte RAL, la classe de poudre et le process de laquage forment un système. Spécifier l'un
                  sans l'autre revient à dimensionner une structure sans connaître les charges.
                </p>
              </div>
            </div>
          </section>

          {/* PHOTO PRODUIT PLIALU */}
          <section className="bg-white pb-12" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-4xl mx-auto mt-12">
                <img
                  srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/f_auto,q_auto,w_800/v1774284198/PLIALU_Juin24_280_G_Perret_kcw5mi.jpg 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/f_auto,q_auto,w_1200/v1774284198/PLIALU_Juin24_280_G_Perret_kcw5mi.jpg 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/f_auto,q_auto,w_1600/v1774284198/PLIALU_Juin24_280_G_Perret_kcw5mi.jpg 1600w"
                  sizes="100vw"
                  src="https://res.cloudinary.com/dyiup6v5x/image/upload/f_auto,q_auto,w_1200/v1774284198/PLIALU_Juin24_280_G_Perret_kcw5mi.jpg"
                  alt="Contrôle qualité thermolaquage certifié QUALICOAT — mesure épaisseur et certificat laqueur PLIALU"
                  className="w-full h-64 object-cover rounded-2xl mt-12"
                  loading="lazy"
                />
                <p className="text-sm text-gray-400 text-center mt-2">
                  Contrôle d'épaisseur de couche et traçabilité par lot — Atelier PLIALU, Rhône-Alpes
                </p>
              </div>
            </div>
          </section>

          {/* SECTION CONTACT BAS DE PAGE */}
          <section className="py-24 bg-[#071318] text-center border-t border-white/5">
            <div className="max-w-3xl mx-auto px-6 space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-white">
                Votre prochain projet. Thermolaquage certifié QUALICOAT inclus.
              </h2>
              <p className="text-base md:text-lg text-white/50">
                Post-laquage après façonnage, traçabilité par lot, certificats disponibles sur demande.
              </p>
              <button
                onClick={() => setCurrentPage('contact')}
                className="px-10 py-4 md:px-12 md:py-5 bg-[#E2FD48] text-[#0E2A33] text-sm font-extrabold rounded-full transition-all shadow-xl hover:shadow-[#E2FD48]/20 hover:-translate-y-1"
              >
                Demander un devis
              </button>
            </div>
          </section>
        </div>
      )}

      {/* --- SOLUTION BARDAGES & CASSETTES --- */}
      {currentPage === 'solution-bardage' && (
        <main className="min-h-[50vh] flex flex-col pt-48 md:pt-56 pb-20 bg-[#0E2A33]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Bardages &amp; Cassettes</h1>
            <button
              onClick={() => setCurrentPage('solutions')}
              className="text-[#E2FD48] hover:text-white transition font-medium flex items-center gap-2 mt-8"
            >
              &larr; Retour aux solutions
            </button>
          </div>
        </main>
      )}

      {/* --- SOLUTION ENDUIT MINCE SUR ISOLANT --- */}
      {currentPage === 'solution-enduit' && (
        <EnduitMinceIsolant setCurrentPage={setCurrentPage} />
      )}

      {/* --- SOLUTION PRÉCADRES --- */}
      {currentPage === 'solution-precadres' && (
        <main className="min-h-[50vh] flex flex-col pt-48 md:pt-56 pb-20 bg-[#0E2A33]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Précadres</h1>
            <button
              onClick={() => setCurrentPage('solutions')}
              className="text-[#E2FD48] hover:text-white transition font-medium flex items-center gap-2 mt-8"
            >
              &larr; Retour aux solutions
            </button>
          </div>
        </main>
      )}

      {/* --- SOLUTION TÔLES PRÉLAQUÉES --- */}
      {currentPage === 'solution-toles' && (
        <main className="min-h-[50vh] flex flex-col pt-48 md:pt-56 pb-20 bg-[#0E2A33]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Tôles prélaquées</h1>
            <button
              onClick={() => setCurrentPage('solutions')}
              className="text-[#E2FD48] hover:text-white transition font-medium flex items-center gap-2 mt-8"
            >
              &larr; Retour aux solutions
            </button>
          </div>
        </main>
      )}

      {/* --- SOLUTION RAVALEMENT DE FAÇADE --- */}
      {currentPage === 'solution-ravalement' && (
        <main className="min-h-[50vh] flex flex-col pt-48 md:pt-56 pb-20 bg-[#0E2A33]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Ravalement de façade</h1>
            <button
              onClick={() => setCurrentPage('solutions')}
              className="text-[#E2FD48] hover:text-white transition font-medium flex items-center gap-2 mt-8"
            >
              &larr; Retour aux solutions
            </button>
          </div>
        </main>
      )}

      {/* --- SOLUTIONS ÉTANCHÉITÉ --- */}
      {currentPage === 'etancheite' && <Etancheite />}

      {/* --- CONTACT PAGE CONTENT --- */}
      {currentPage === 'contact' && (
        <div className="animate-fade-up">
          {/* Hero Contact (White background, Dark header logic) */}
          <section className="bg-white pt-48 md:pt-56 pb-20 min-h-[70vh] flex flex-col justify-center">
            <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-4xl space-y-8">
                <span className="text-[10px] font-extrabold tracking-[0.4em] text-zinc-400 uppercase block">
                  ÉCHANGER SUR VOTRE PROJET
                </span>
                <h1 className="text-4xl md:text-6xl tracking-tighter leading-[1.1] font-black uppercase text-[#0E2A33]">
                  Contact
                </h1>
                <p className="text-base md:text-lg text-[#0E2A33]/70 max-w-2xl leading-relaxed font-medium">
                  Pour une étude technique, un chiffrage ou une demande de faisabilité, nos équipes vous répondent rapidement avec une approche orientée contraintes chantier (plans DXF/DWG, métrés, finitions, délais).
                </p>
                <a href="#contact-form" className="inline-block px-10 py-4 md:px-12 md:py-5 bg-[#0E2A33] text-white text-sm font-extrabold rounded-full transition-all shadow-xl hover:-translate-y-1">
                  Envoyer une demande
                </a>
              </div>
            </div>
          </section>

          {/* Coordonnées & Info (Light section) */}
          <section className="py-12 md:py-24 bg-[#F3F6F7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
                {/* Coordonnées */}
                <div className="space-y-12">
                  <div className="space-y-4">
                    <span className="text-[10px] font-extrabold tracking-[0.3em] text-[#0E2A33]/40 uppercase">COORDONNÉES</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">Où nous trouver ?</h2>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Phone */}
                    <div className="flex items-center gap-6 group">
                      <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#0E2A33]/40 group-hover:text-[#0E2A33] group-hover:border-[#0E2A33]/20 transition-all">
                        <iconify-icon icon="lucide:phone" width="20"></iconify-icon>
                      </div>
                      <div className="flex-1">
                        <span className="block text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Téléphone</span>
                        <div className="flex items-center gap-3">
                          <a href="tel:0478089370" className="text-lg font-bold text-[#0E2A33]">04 78 08 93 70</a>
                          <button onClick={() => handleCopy("04 78 08 93 70", "tel")} className="p-1.5 rounded-md hover:bg-black/5 transition-colors relative">
                            <iconify-icon icon="lucide:copy" width="16" className="text-zinc-400"></iconify-icon>
                            {copiedKey === 'tel' && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-[#0E2A33] text-white px-2 py-1 rounded shadow-sm">Copié</span>}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-6 group">
                      <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#0E2A33]/40 group-hover:text-[#0E2A33] group-hover:border-[#0E2A33]/20 transition-all">
                        <iconify-icon icon="lucide:mail" width="20"></iconify-icon>
                      </div>
                      <div className="flex-1">
                        <span className="block text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">E-mail</span>
                        <div className="flex items-center gap-3">
                          <a href="mailto:commercial@plialu.fr" className="text-lg font-bold text-[#0E2A33]">commercial@plialu.fr</a>
                          <button onClick={() => handleCopy("commercial@plialu.fr", "mail")} className="p-1.5 rounded-md hover:bg-black/5 transition-colors relative">
                            <iconify-icon icon="lucide:copy" width="16" className="text-zinc-400"></iconify-icon>
                            {copiedKey === 'mail' && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-[#0E2A33] text-white px-2 py-1 rounded shadow-sm">Copié</span>}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-center gap-6 group">
                      <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#0E2A33]/40 group-hover:text-[#0E2A33] group-hover:border-[#0E2A33]/20 transition-all">
                        <iconify-icon icon="lucide:map-pin" width="20"></iconify-icon>
                      </div>
                      <div className="flex-1">
                        <span className="block text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Siège & Atelier</span>
                        <div className="flex items-center gap-3">
                          <p className="text-lg font-bold text-[#0E2A33] leading-tight max-w-xs">Technoparc Saône Vallée, 150, Route Copernic, 01390 Civrieux</p>
                          <button onClick={() => handleCopy("Technoparc Saône Vallée, 150, Route Copernic, 01390 Civrieux", "addr")} className="p-1.5 rounded-md hover:bg-black/5 transition-colors relative">
                            <iconify-icon icon="lucide:copy" width="16" className="text-zinc-400"></iconify-icon>
                            {copiedKey === 'addr' && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-[#0E2A33] text-white px-2 py-1 rounded shadow-sm">Copié</span>}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Horaires */}
                    <div className="flex items-center gap-6 group">
                      <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#0E2A33]/40 group-hover:text-[#0E2A33] group-hover:border-[#0E2A33]/20 transition-all">
                        <iconify-icon icon="lucide:clock" width="20"></iconify-icon>
                      </div>
                      <div className="flex-1">
                        <span className="block text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Horaires d'ouverture</span>
                        <p className="text-lg font-bold text-[#0E2A33] leading-tight max-w-xs">Du Lundi au Vendredi de 8h à 12h et de 13h à 16h30</p>
                      </div>
                    </div>
                  </div>

                  {/* Localisation */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-extrabold tracking-[0.3em] text-[#0E2A33]/40 uppercase">LOCALISATION</span>
                    <div className="w-full h-[320px] md:h-[380px] rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-white">
                      <iframe
                        src="https://www.google.com/maps?q=Plialu%2C%20Technoparc%20Sa%C3%B4ne%20Vall%C3%A9e%2C%20150%20Route%20de%20Copernic%2C%2001390%20Civrieux&z=9&output=embed"
                        className="w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>

                {/* Formulaire Web3Forms */}
                <div id="contact-form" className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-zinc-100 scroll-mt-32">
                  <form
                    action="https://formsubmit.co/clementbax@yahoo.com"
                    method="POST"
                    encType="multipart/form-data"
                    className="space-y-6"
                  >
                    {/* Champs cachés Formsubmit */}
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_subject" value="Nouvelle demande de devis — PLIALU" />
                    <input type="hidden" name="_next" value="https://grey-wren-904418.hostingersite.com/merci.html" />

                    {/* Ligne 1 : Prénom / Nom */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#0E2A33]">Prénom</label>
                        <input
                          type="text"
                          name="firstname"
                          required
                          className="w-full p-3 bg-[#F3F6F7] border border-[#0E2A33]/20 rounded-lg focus:border-[#0E2A33] focus:ring-2 focus:ring-[#0E2A33]/40 outline-none text-[#0E2A33]"
                          placeholder="Jean"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#0E2A33]">Nom</label>
                        <input
                          type="text"
                          name="lastname"
                          required
                          className="w-full p-3 bg-[#F3F6F7] border border-[#0E2A33]/20 rounded-lg focus:border-[#0E2A33] focus:ring-2 focus:ring-[#0E2A33]/40 outline-none text-[#0E2A33]"
                          placeholder="Dupont"
                        />
                      </div>
                    </div>

                    {/* Ligne 2 : Email / Téléphone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#0E2A33]">Email professionnel</label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full p-3 bg-[#F3F6F7] border border-[#0E2A33]/20 rounded-lg focus:border-[#0E2A33] focus:ring-2 focus:ring-[#0E2A33]/40 outline-none text-[#0E2A33]"
                          placeholder="contact@entreprise.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#0E2A33]">Téléphone</label>
                        <input
                          type="tel"
                          name="phone"
                          className="w-full p-3 bg-[#F3F6F7] border border-[#0E2A33]/20 rounded-lg focus:border-[#0E2A33] focus:ring-2 focus:ring-[#0E2A33]/40 outline-none text-[#0E2A33]"
                          placeholder="06 00 00 00 00"
                        />
                      </div>
                    </div>

                    {/* Entreprise */}
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#0E2A33]">Entreprise / Cabinet</label>
                      <input
                        type="text"
                        name="company"
                        className="w-full p-3 bg-[#F3F6F7] border border-[#0E2A33]/20 rounded-lg focus:border-[#0E2A33] focus:ring-2 focus:ring-[#0E2A33]/40 outline-none text-[#0E2A33]"
                        placeholder="Nom de votre société"
                      />
                    </div>

                    {/* Description du projet */}
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#0E2A33]">Description du projet</label>
                      <textarea
                        name="message"
                        rows={4}
                        className="w-full p-3 bg-[#F3F6F7] border border-[#0E2A33]/20 rounded-lg focus:border-[#0E2A33] focus:ring-2 focus:ring-[#0E2A33]/40 outline-none text-[#0E2A33] resize-none"
                        placeholder="Détaillez vos besoins techniques..."
                      ></textarea>
                    </div>

                    {/* Upload fichier */}
                    <div className="p-4 border-2 border-dashed border-[#0E2A33]/20 rounded-xl bg-[#F3F6F7]">
                      <label className="block text-sm font-bold mb-2 text-[#0E2A33]">
                        <span className="text-[#0E2A33]">Joindre vos plans ou photos</span> (PDF, DWG, DXF, JPG)
                      </label>
                      <input
                        type="file"
                        name="attachment"
                        accept=".pdf,.dwg,.dxf,.jpg,.jpeg"
                        className="block w-full text-sm text-[#0E2A33]/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#E2FD48] file:text-[#0E2A33] hover:file:bg-[#d4ed3f] cursor-pointer"
                      />
                      <p className="mt-2 text-xs text-[#0E2A33]/50 text-center">Taille maximale : 10 Mo par envoi.</p>
                    </div>

                    {/* Bouton submit */}
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#E2FD48] text-[#0E2A33] font-bold rounded-lg hover:bg-[#d4ed3f] transition-colors uppercase tracking-wider shadow-[0_0_30px_rgba(226,253,72,0.2)]"
                    >
                      ENVOYER MA DEMANDE DE DEVIS TECHNIQUE
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Page Merci (succès envoi formulaire) */}
      {currentPage === 'merci' && (
        <Success onBackHome={() => setCurrentPage('home')} />
      )}

      {/* Premium Footer */}
      <footer className="pt-32 pb-12 section--dark" style={{ background: 'linear-gradient(to bottom, #071318 0%, #0b1e26 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
            <div className="space-y-8">
              <button onClick={() => setCurrentPage('home')} className="text-2xl font-black tracking-tighter text-white uppercase block">PLIALU.</button>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">Solutions métalliques industrielles sur mesure pour le bâtiment et l'industrie.</p>
              <div className="flex items-center gap-4 pt-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#E2FD48] hover:border-[#E2FD48] transition-all"><iconify-icon icon="line-md:linkedin" width="20"></iconify-icon></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#E2FD48] hover:border-[#E2FD48] transition-all"><iconify-icon icon="line-md:youtube" width="20"></iconify-icon></a>
              </div>
            </div>
            {['Expertises', 'Ressources', 'Société'].map((title) => (
              <div key={title}>
                <h4 className="text-white text-[10px] font-extrabold uppercase tracking-[0.3em] mb-8">{title}</h4>
                <ul className="space-y-4">
                  {(title === 'Expertises' ? ['Bureau d’études', 'Mise au format', 'Pliage grande longueur', 'Thermolaquage'] : 
                    title === 'Ressources' ? ['Centre de ressources', 'Dossiers techniques', 'Certifications', 'Contact expert'] :
                    ['À propos', 'Réalisations', 'Solutions', 'Contact']
                  ).map((link) => (
                    <li key={link}>
                      <button 
                        onClick={() => { 
                          if (link === 'Contact' || link === 'Contact expert') setCurrentPage('contact'); 
                          else if (title === 'Expertises' || link === 'Bureau d’études' || link === 'Mise au format') setCurrentPage('expertises'); 
                          else if (title === 'Ressources' || link === 'Centre de ressources' || link === 'Dossiers techniques') setCurrentPage('ressources');
                          else if (link === 'Réalisations') setCurrentPage('projects');
                          else if (link === 'À propos') setCurrentPage('a-propos');
                        }} 
                        className="text-white/40 hover:text-[#E2FD48] transition-colors text-sm font-medium text-left"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">© 2025 PLIALU SAS — TOUS DROITS RÉSERVÉS</span>
            <div className="flex gap-8 text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">
              <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
              <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;