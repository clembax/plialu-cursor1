import React, { useState, useEffect } from 'react';

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

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [caeSlide, setCaeSlide] = useState(0);
  const [zentoSlide, setZentoSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState<
    | 'home'
    | 'expertises'
    | 'solutions'
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
  const [activeImage, setActiveImage] = useState<{ src: string; srcset?: string } | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formFileError, setFormFileError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [solutionsAccordionOpen, setSolutionsAccordionOpen] = useState<string | null>(null);
  const [activeSolutionHover, setActiveSolutionHover] = React.useState(0);
  const contactFormRef = React.useRef<HTMLFormElement>(null);
  const teaserVideoRef = React.useRef<HTMLVideoElement>(null);
  const expertisesVideoRef = React.useRef<HTMLVideoElement>(null);

  // Header Theme: 'dark' = light header bar (dark logo/menu) for contrast on light backgrounds (Expertises, Solutions, Ressources, Contact, Articles, Merci)
  const headerTheme =
    currentPage === 'expertises' ||
    currentPage === 'solutions' ||
    currentPage === 'solution-bardage' ||
    currentPage === 'solution-enduit' ||
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
    // SEO: basic document title per page
    let title = 'PLIALU';
    let description: string | null = null;

    if (currentPage === 'expertises') {
      title = 'Façonnage métallique sur mesure : expertise et précision | Plialu';
      description =
        "Spécialiste du façonnage métallique pour le bâtiment. Étude technique, pliage CNC haute précision et thermolaquage certifié Qualicoat pour vos façades.";
    } else if (currentPage === 'solutions') {
      title = 'Solutions métalliques enveloppe du bâtiment | Plialu';
    } else if (currentPage === 'solution-bardage') {
      title = 'Bardages et Cassettes Métalliques sur mesure | Plialu';
    } else if (currentPage === 'solution-enduit') {
      title = 'Profils pour Enduit Mince sur Isolant (ITE) | Plialu';
    } else if (currentPage === 'solution-precadres') {
      title = 'Précadres Métalliques de Fenêtre sur mesure | Plialu';
    } else if (currentPage === 'solution-toles') {
      title = 'Tôles Prélaquées | Plialu';
    } else if (currentPage === 'solution-ravalement') {
      title = 'Solutions Métalliques pour Ravalement de Façade | Plialu';
    } else if (currentPage === 'ressource-1') {
      title = 'Choisir le bon métal pour une façade extérieure | Plialu';
    } else if (currentPage === 'ressource-2') {
      title = 'Limites et tolérances du pliage aluminium pour façade | Plialu';
    } else if (currentPage === 'ressource-3') {
      title = 'Garanties du thermolaquage certifié Qualicoat | Plialu';
    }
    document.title = title;

    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', description);
      }
    }
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
    { id: '05', title: "Ravalement de façade", image: "https://res.cloudinary.com/dyiup6v5x/image/upload/v1773147911/Placeholder-Dark_xe7she.webp" }
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
    <div className="font-manrope selection-brand min-h-screen overflow-x-hidden">
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
                  EXPERT INDUSTRIEL EN <br className="hidden md:block" />
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
          <section id="expertise" className="py-32 section--dark" style={{ background: 'linear-gradient(to bottom, #071318 0%, #0b1e26 100%)' }}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-20 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <span className="text-[10px] font-extrabold tracking-[0.3em] text-[#E2FD48] uppercase">PROCESS INTÉGRÉ</span>
                    <h2 className="text-4xl md:text-5xl text-white tracking-tighter font-extrabold leading-tight">Fabrication de pièces métalliques sur mesure</h2>
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
            className="relative py-24"
            style={{ background: 'linear-gradient(to bottom, #0b1e26 0%, #071318 100%)' }}
          >
            {/* Dégradé de transition avec la section Expertises */}
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, rgba(11,30,38,0) 0%, rgba(11,30,38,0.4) 8%, #0b1e26 20%)' }}
            ></div>
            <div className="relative max-w-6xl mx-auto px-6 z-10">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <video
                  ref={teaserVideoRef}
                  className="w-full h-auto"
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
                    <h2 className="text-4xl md:text-5xl text-[#0E2A33] tracking-tighter font-extrabold">Solutions métalliques pour l'enveloppe du bâtiment</h2>
                    <p className="text-[#0E2A33]/60 text-lg leading-relaxed font-medium">Catalogue B2B : enduit mince, ravalement, bardages et cassettes, précadres, tôles prélaquées. Découvrez nos gammes aluminium et acier.</p>
                  </div>

                  <div className="flex flex-col gap-6">
                  {homeSolutionsList.map((item, index) => {
                    const isActive = activeSolutionHover === index;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setActiveSolutionHover(index)}
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
                    <img
                      key={homeSolutionsList[activeSolutionHover].id}
                      src={homeSolutionsList[activeSolutionHover].image}
                      alt={homeSolutionsList[activeSolutionHover].title}
                      className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                    />
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
                  <h2 className="text-4xl md:text-5xl text-white tracking-tighter font-extrabold">Projets réalisés en collaboration</h2>
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
                <h2 className="text-4xl md:text-5xl text-[#0E2A33] tracking-tighter font-extrabold mb-6">Centre de ressources et expertise technique</h2>
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
                  <h2 className="text-4xl md:text-5xl text-white tracking-tighter font-extrabold">Votre entreprise de métallurgie en Rhône-Alpes</h2>
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-[#0E2A33] tracking-tighter font-extrabold mb-10 leading-[1.1]">Un projet en tête ? <br />Concrétisons-le.</h2>
              <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium text-[#0E2A33]/70">Lancez la discussion dès aujourd’hui avec nos experts techniques.</p>
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
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0e2a33]/40 to-[#071318]"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-6">
              <div className="max-w-4xl space-y-8">
                <span className="text-[10px] font-extrabold tracking-[0.4em] text-[#E2FD48] uppercase block">
                  NOTRE IDENTITÉ INDUSTRIELLE
                </span>
                <h1 className="text-4xl md:text-6xl tracking-tighter leading-[1.1] font-black uppercase text-white">
                  PLIALU, Entreprise de façonnage métal en Rhône-Alpes
                </h1>
                <p className="text-xl md:text-2xl text-[#E2FD48] font-bold tracking-tight">
                  Façonnage industriel du métal en feuille depuis près de 20 ans
                </p>
                <p className="text-base md:text-lg text-white/70 max-w-2xl leading-relaxed font-medium">
                  Implantée en région lyonnaise, PLIALU est une entreprise de façonnage et de transformation du métal spécialisée dans la fabrication sur mesure.
                </p>
                <button onClick={() => setCurrentPage('contact')} className="px-10 py-4 bg-[#E2FD48] text-[#0E2A33] text-sm font-extrabold rounded-full hover:bg-white transition-all tracking-tight shadow-[0_20px_40px_rgba(226,253,72,0.15)]">
                  Demander un devis
                </button>
              </div>
            </div>
          </section>

          {/* 2. POSITIONNEMENT (LIGHT) */}
          <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-[#0E2A33] leading-tight">
                    20 ans d’expertise
                  </h2>
                  <p className="text-[#0E2A33]/70 text-lg font-medium leading-relaxed">
                    Sous la direction de Jean-Pierre Bax, l’entreprise développe une expertise industrielle reconnue, fondée sur la précision, la maîtrise technique et la performance opérationnelle.
                    <br /><br />
                    Entreprise à taille humaine, PLIALU accompagne ses partenaires industriels, acteurs du bâtiment et professionnels exigeants dans la conception et la production de pièces métalliques adaptées à leurs contraintes techniques.
                  </p>
                  <ul className="space-y-3">
                    {['Rhône-Alpes', 'Reste de la France', 'Suisse', 'Belgique'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[#0E2A33] font-bold">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E2FD48]"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href="/contact#contact-form" className="inline-flex items-center justify-center text-xs font-bold bg-[#E2FD48] text-black px-6 py-3 rounded-full hover:bg-[#d4ed3f] transition-all tracking-tight shadow-[0_0_30px_rgba(226,253,72,0.15)]">
                    Échanger sur votre projet
                  </a>
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-zinc-100 shadow-sm">
                  <img 
                    src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1771522416/APROPOS-1200px_wkguv2.webp" 
                    className="w-full h-full object-cover" 
                    alt="Atelier de production Plialu à Lyon : 5 000 m² dédiés au façonnage métallique et pliage aluminium en Rhône-Alpes" 
                    loading="lazy" 
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 3. CARTE TERRITORIALE (LIGHT) */}
          <section className="py-32 bg-[#F3F6F7]">
            <div className="max-w-7xl mx-auto px-6">
              <TerritorialMap />
            </div>
          </section>
        </div>
      )}

      {/* --- PROJECTS PAGE CONTENT --- */}
      {currentPage === 'projects' && (
        <div className="animate-fade-up">
          {/* Hero Réalisations */}
          <section className="relative bg-[#071318] pt-48 md:pt-56 pb-24 overflow-hidden min-h-[70vh] flex flex-col justify-center">
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0e2a33]/40 to-[#071318]"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-6">
              <div className="max-w-4xl space-y-8">
                <span className="text-[10px] font-extrabold tracking-[0.4em] text-[#E2FD48] uppercase block">
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
                  className="inline-flex items-center gap-2 px-10 py-4 md:px-12 md:py-5 bg-[#E2FD48] text-[#0E2A33] text-sm font-extrabold rounded-full transition-all shadow-xl hover:shadow-[#E2FD48]/20 hover:-translate-y-1"
                >
                  Voir nos collaborations
                  <iconify-icon icon="lucide:arrow-down" width="18"></iconify-icon>
                </a>
              </div>
            </div>
          </section>

          {/* Grille des Projets */}
          <section id="projets-grille" className="py-24 bg-white scroll-mt-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    id: "cae-lyon",
                    title: "CAE – Lyon 3",
                    city: "Lyon",
                    year: "2023",
                    tag: "ENVELOPPE BÂTIMENT",
                    context: "Façade complète & ossatures GALVA en aluminium 20/10 teinte Golden Beach (Akzo Nobel), RAL 9003 et inox recuit brillant.\nIntervention sur l’enveloppe d’un ensemble administratif d’État d’envergure, associant ossatures galvanisées structurelles et habillage aluminium thermolaqué pour garantir précision d’exécution, durabilité et cohérence architecturale.",
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
                    title: "ZENTO – Grenoble",
                    city: "Grenoble",
                    year: "2023",
                    tag: "INFRASTRUCTURE",
                    context: "Cassettes et habillages architecturaux en aluminium 20/10 teinte Copper (Arconic).\nRéalisation intégrant des volumes courbes et façades arrondies, avec fabrication sur mesure de cassettes adaptées aux lignes contemporaines d’un bâtiment tertiaire.",
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
                    title: "Bureau Le E – Annecy",
                    city: "Annecy",
                    year: "2024",
                    tag: "AMÉNAGEMENT TERTIAIRE",
                    context: "Cassettes et embrasures de fenêtres en aluminium 20/10 WhiteGold (Arconic) et RAL 7012.\nHabillage précis des façades et tableaux, intégré à un ensemble tertiaire contemporain avec exigence de régularité et qualité de finition.",
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
                    title: "WeLink – Lyon 7",
                    city: "Lyon",
                    year: "2023",
                    tag: "ENVELOPPE BÂTIMENT",
                    context: "Cassettes et embrasures en aluminium 20/10 teinte Copper DS 0010 (Adapta).\nFaçade à dominante cuivrée intégrant des éléments métalliques façonnés sur mesure pour un ensemble tertiaire urbain.",
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
                    title: "ODYSSEY – Vénissieux",
                    city: "Vénissieux",
                    year: "2022",
                    tag: "ENVELOPPE BÂTIMENT",
                    context: "Cassettes et corniches en aluminium anodisé.\nTraitement de façade structuré mettant en valeur les lignes horizontales et la régularité architecturale du bâtiment.",
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
                    title: "Lycée Delorme – L’Isle-d’Abeau",
                    city: "L’Isle-d’Abeau",
                    year: "2021",
                    tag: "INFRASTRUCTURE SCOLAIRE",
                    context: "Cassettes architecturales poinçonnées sur mesure en aluminium 20/10 RAL 9003.\nFaçade technique à forte identité visuelle intégrant un travail de perforation spécifique adapté à un équipement public.",
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
                    title: "Le Binôme – Meylan",
                    city: "Meylan",
                    year: "2025",
                    tag: "ENVELOPPE BÂTIMENT",
                    context: "Cassettes aluminium 20/10 RAL 9001 et 7022.\nTraitement contrasté des façades associant tons clairs et foncés pour rythmer les volumes résidentiels.",
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
                    title: "IUT Lyon 1 – Villeurbanne",
                    city: "Villeurbanne",
                    year: "2024",
                    tag: "INFRASTRUCTURE",
                    context: "Précadres soudés de fenêtres avec angles cintrés en acier 15/10 galvanisé avec post-laquage RAL 5005.\nIntervention technique sur structure acier intégrant cintrage, soudure et finition colorée pour un bâtiment d’enseignement supérieur.",
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
                    title: "VOISIN – Lyon 9",
                    city: "Lyon",
                    year: "2024",
                    tag: "cassettes intérieures",
                    context: "Siège social – cassettes intérieures en aluminium 20/10 teinte Tasilaq Sable YW2304I (Akzo Nobel).\nHabillage intérieur structurant combinant finition texturée et intégration architecturale soignée.",
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
                    title: "Incurve – Dardilly",
                    city: "Dardilly",
                    year: "2022",
                    tag: "ENVELOPPE BÂTIMENT",
                    context: "Cassettes aluminium RAL 7022.\nHabillage de façade à géométrie courbe intégrant des panneaux sur mesure adaptés aux lignes arrondies du bâtiment.",
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
                    title: "Alpina – Seyssinet",
                    city: "Seyssinet",
                    year: "2021",
                    tag: "HABILLAGE DE FAÇADE",
                    context: "Cassettes aluminium 20/10 RAL 7021 et Golden Beach (Akzo Nobel).\nHabillage de façade tertiaire combinant teintes contrastées et précision d’assemblage.",
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
                    title: "Le Quartz – Grand Parilly",
                    city: "Grand Parilly",
                    year: "2023",
                    tag: "image",
                    context: "Clins, encadrements, habillages de balcons et couvertines en aluminium teinte Anodic Gold (Axalta).\nIntervention multi-éléments sur bâtiment résidentiel, assurant protection des acrotères, finition des ouvertures et cohérence esthétique de l’enveloppe.",
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
                ].map((project, idx) => (
                  <React.Fragment key={project.id}>
                    <article 
                      className={`group relative aspect-[3/2] overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${selectedProjectId === project.id ? 'ring-0' : ''}`}
                      onClick={() => setSelectedProjectId(selectedProjectId === project.id ? null : project.id)}
                    >
                      <img 
                        src={project.mainImg.src} 
                        srcset={project.mainImg.srcset}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
                        alt={`${project.title} – ${project.tag}`} 
                        loading="lazy" 
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                        <span className="text-[9px] font-black tracking-[0.2em] text-[#E2FD48] uppercase mb-2">{project.tag}</span>
                        <h3 className="text-xl font-extrabold text-white tracking-tight">{project.title}</h3>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-white/60 font-medium">{project.city}</span>
                          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">Détails</span>
                        </div>
                      </div>
                    </article>

                    {/* Panneau Projet (Expandable) */}
                    {selectedProjectId === project.id && (
                      <div className="col-span-1 md:col-span-2 lg:col-span-3 animate-fade-up overflow-hidden">
                        <div className="relative my-6 bg-[#F3F6F7] rounded-[32px] border border-zinc-200 overflow-hidden max-w-[1100px] mx-auto shadow-xl">
                          <div className="flex flex-col lg:flex-row max-h-[unset] lg:max-h-[500px]">
                            {/* Colonne Gauche (Infos) */}
                            <div className="w-full lg:w-[40%] p-8 md:p-10 overflow-y-auto no-scrollbar">
                              <div className="mb-8">
                                <h4 className="text-2xl md:text-3xl font-black text-[#0E2A33] tracking-tighter mb-2">{project.title}</h4>
                                <p className="text-sm font-bold text-[#0E2A33]/40 uppercase tracking-widest">{project.city} • {project.year}</p>
                              </div>
                              
                              <p className="text-[#0E2A33]/70 text-base font-medium leading-relaxed mb-8 border-l-2 border-[#E2FD48] pl-6 whitespace-pre-line">
                                {project.context}
                              </p>
                            </div>

                            {/* Colonne Droite (Galerie) */}
                            <div className="w-full lg:w-[60%] p-4 lg:p-8 bg-white/50 overflow-y-auto no-scrollbar">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button 
                                  onClick={() => setActiveImage(project.mainImg)}
                                  aria-label="Agrandir l'image"
                                  className="md:col-span-2 aspect-[3/2] rounded-2xl overflow-hidden cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-[#E2FD48]"
                                >
                                  <img 
                                    src={project.mainImg.src} 
                                    srcset={project.mainImg.srcset}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
                                    alt={`${project.title} – ${project.tag}`} 
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover" 
                                  />
                                </button>
                                {project.gallery.map((img, gIdx) => (
                                  <button 
                                    key={gIdx} 
                                    onClick={() => setActiveImage(img)}
                                    aria-label="Agrandir l'image"
                                    className="aspect-square rounded-2xl overflow-hidden cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-[#E2FD48]"
                                  >
                                    <img 
                                      src={img.src} 
                                      srcset={img.srcset}
                                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
                                      alt={`${project.title} – Détail technique ${gIdx + 1}`} 
                                      loading="lazy"
                                      decoding="async"
                                      className="w-full h-full object-cover" 
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                          <button 
                            onClick={() => setSelectedProjectId(null)}
                            aria-label="Fermer le projet"
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#0E2A33] hover:bg-white transition-all shadow-md z-20"
                          >
                            <iconify-icon icon="lucide:x" width="20"></iconify-icon>
                          </button>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="py-24 bg-[#071318] text-center border-t border-white/5">
            <div className="max-w-3xl mx-auto px-6 space-y-8">
              <h2 className="text-3xl md:text-5xl text-white tracking-tighter font-extrabold">Un projet similaire à nous confier ?</h2>
              <p className="text-base md:text-lg text-white/50">Nos équipes techniques vous accompagnent de la conception à la fabrication.</p>
              <button onClick={() => setCurrentPage('contact')} className="px-10 py-4 md:px-12 md:py-5 bg-[#E2FD48] text-[#0E2A33] text-sm font-extrabold rounded-full transition-all shadow-xl hover:shadow-[#E2FD48]/20 hover:-translate-y-1">
                Demander un devis personnalisé
              </button>
            </div>
          </section>

          {/* Image Lightbox Overlay */}
          {activeImage && (
            <div 
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 animate-fade-in"
              onClick={() => setActiveImage(null)}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
              <div 
                className="relative z-10 max-w-full max-h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={activeImage.src} 
                  srcset={activeImage.srcset}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 1200px"
                  alt="Agrandissement" 
                  className="max-w-[80vw] max-h-[80vh] [@media(min-width:1440px)]:max-w-[70vw] [@media(min-width:1440px)]:max-h-[70vh] object-contain rounded-lg shadow-2xl transition-transform duration-300 ease-out"
                  style={{ transform: 'scale(min(1.3, 1))' }}
                />
                <button 
                  onClick={() => setActiveImage(null)}
                  aria-label="Fermer l'image"
                  className="absolute -top-12 right-0 md:-right-12 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#E2FD48]"
                >
                  <iconify-icon icon="lucide:x" width="24"></iconify-icon>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- SOLUTIONS HUB PAGE CONTENT --- */}
      {currentPage === 'solutions' && (
        <div className="animate-fade-up">
          {/* Hero Solutions */}
          <section className="bg-white pt-48 md:pt-56 pb-20 min-h-[70vh] flex flex-col justify-center">
            <div className="max-w-7xl mx-auto px-6">
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

          {/* --- BENTO GRID : 5 FAMILLES DE PRODUITS --- */}
          <section className="py-20 bg-[#0a1f26]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Nos Solutions Enveloppe</h2>
                <p className="text-gray-400 max-w-2xl text-lg">
                  Découvrez nos expertises en façonnage métallique sur mesure pour l'habillage technique et esthétique de vos façades.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {/* Ligne 1 : 2 grandes cartes (50/50) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Carte 1 */}
                  <div
                    className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 h-[400px] cursor-pointer"
                    onClick={() => setCurrentPage('solution-bardage')}
                  >
                    <div
                      className="absolute inset-0 bg-neutral-800 bg-cover bg-center opacity-70 group-hover:opacity-100 transition duration-500"
                      style={{
                        backgroundImage:
                          "url('https://res.cloudinary.com/dyiup6v5x/image/upload/v1773147911/Placeholder-Dark_xe7she.webp')",
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A33] via-[#0E2A33]/40 to-transparent opacity-90 group-hover:opacity-70 transition duration-500"></div>
                    <div className="absolute bottom-6 left-6 right-6 transform translate-y-2 group-hover:translate-y-0 transition duration-500">
                      <h3 className="text-2xl font-bold text-white group-hover:text-[#E2FD48] transition duration-300">
                        Bardages & Cassettes
                      </h3>
                      <p className="mt-2 text-gray-300 opacity-0 group-hover:opacity-100 transition duration-500 delay-100">
                        Systèmes de fixation invisible et habillages grandes dimensions.
                      </p>
                    </div>
                  </div>

                  {/* Carte 2 */}
                  <div
                    className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 h-[400px] cursor-pointer"
                    onClick={() => setCurrentPage('solution-enduit')}
                  >
                    <div
                      className="absolute inset-0 bg-neutral-800 bg-cover bg-center opacity-70 group-hover:opacity-100 transition duration-500"
                      style={{
                        backgroundImage:
                          "url('https://res.cloudinary.com/dyiup6v5x/image/upload/v1773147911/Placeholder-Dark_xe7she.webp')",
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A33] via-[#0E2A33]/40 to-transparent opacity-90 group-hover:opacity-70 transition duration-500"></div>
                    <div className="absolute bottom-6 left-6 right-6 transform translate-y-2 group-hover:translate-y-0 transition duration-500">
                      <h3 className="text-2xl font-bold text-white group-hover:text-[#E2FD48] transition duration-300">
                        Enduit mince sur isolant
                      </h3>
                      <p className="mt-2 text-gray-300 opacity-0 group-hover:opacity-100 transition duration-500 delay-100">
                        Profils de départ, d'angle et d'arrêt pour systèmes ITE.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ligne 2 : 3 cartes moyennes (33/33/33) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Carte 3 */}
                  <div
                    className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 h-[300px] cursor-pointer"
                    onClick={() => setCurrentPage('solution-precadres')}
                  >
                    <div
                      className="absolute inset-0 bg-neutral-800 bg-cover bg-center opacity-70 group-hover:opacity-100 transition duration-500"
                      style={{
                        backgroundImage:
                          "url('https://res.cloudinary.com/dyiup6v5x/image/upload/v1773147911/Placeholder-Dark_xe7she.webp')",
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A33] via-[#0E2A33]/40 to-transparent opacity-90 group-hover:opacity-70 transition duration-500"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#E2FD48] transition duration-300">Précadres</h3>
                    </div>
                  </div>

                  {/* Carte 4 */}
                  <div
                    className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 h-[300px] cursor-pointer"
                    onClick={() => setCurrentPage('solution-toles')}
                  >
                    <div
                      className="absolute inset-0 bg-neutral-800 bg-cover bg-center opacity-70 group-hover:opacity-100 transition duration-500"
                      style={{
                        backgroundImage:
                          "url('https://res.cloudinary.com/dyiup6v5x/image/upload/v1773147911/Placeholder-Dark_xe7she.webp')",
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A33] via-[#0E2A33]/40 to-transparent opacity-90 group-hover:opacity-70 transition duration-500"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#E2FD48] transition duration-300">Tôles prélaquées</h3>
                    </div>
                  </div>

                  {/* Carte 5 */}
                  <div
                    className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 h-[300px] cursor-pointer"
                    onClick={() => setCurrentPage('solution-ravalement')}
                  >
                    <div
                      className="absolute inset-0 bg-neutral-800 bg-cover bg-center opacity-70 group-hover:opacity-100 transition duration-500"
                      style={{
                        backgroundImage:
                          "url('https://res.cloudinary.com/dyiup6v5x/image/upload/v1773147911/Placeholder-Dark_xe7she.webp')",
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A33] via-[#0E2A33]/40 to-transparent opacity-90 group-hover:opacity-70 transition duration-500"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#E2FD48] transition duration-300">Ravalement de façade</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section conversion vers le contact */}
          <section className="py-20 md:py-28 text-white" style={{ background: 'linear-gradient(to bottom, #071318 0%, #0b1e26 100%)' }}>
            <div className="max-w-7xl mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">Un projet en tête ?</h2>
              <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
                Chiffrez votre projet sur mesure avec nos équipes.
              </p>
              <button
                onClick={() => setCurrentPage('contact')}
                className="px-12 py-4 bg-[#E2FD48] text-[#0E2A33] text-sm font-extrabold rounded-full hover:bg-white transition-all shadow-lg"
              >
                Chiffrer votre projet sur mesure
              </button>
            </div>
          </section>
        </div>
      )}

      {/* --- EXPERTISES PAGE CONTENT --- */}
      {currentPage === 'expertises' && (
        <div className="animate-fade-up">
          {/* Hero Expertises (contient le sommaire en bas, au-dessus de la ligne de flottaison) */}
          <section className="bg-white pt-48 md:pt-56 pb-0 min-h-[70vh] flex flex-col">
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
            {/* Mini Sommaire : en bas du Hero, visible au-dessus de la ligne de flottaison */}
            <div id="expertises-sommaire" className="relative z-10 bg-white border-t border-zinc-100 scroll-mt-24 shrink-0">
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
          </section>

          {/* Vidéo complète – emplacement préparé (placeholder, sans balise vidéo pour l'instant) */}
          <section id="video-complete" className="section--dark py-24 scroll-mt-24" style={{ background: '#071318' }}>
            <div className="max-w-6xl mx-auto px-6">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 aspect-video group transition-transform duration-300 hover:scale-[1.02]">
                {/* Overlay décoratif */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-40 pointer-events-none"></div>

                {/* Contenu placeholder */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
                  <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full border border-white/40 bg-black/50 group-hover:border-[#E2FD48] group-hover:bg-black/70 transition-colors">
                    <iconify-icon icon="lucide:play" width="28" className="text-white/85"></iconify-icon>
                  </div>
                  <p className="text-sm md:text-base text-white/85 font-medium">
                    Prochainement : vidéo complète du process PLIALU
                  </p>
                  <p className="mt-2 text-[11px] md:text-xs text-white/55 uppercase tracking-[0.2em]">
                    Cliquez pour découvrir prochainement
                  </p>
                </div>

                {/* Overlay de survol */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
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
                          <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
                            {exp.title}
                          </h2>
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
                            <p className="text-base md:text-lg leading-relaxed font-medium text-[#0E2A33]/70">
                              <a href="/expertises/thermolaquage-industriel">Découvrez notre thermolaquage certifié Qualicoat</a>
                            </p>
                          </>
                        ) : exp.id === 'pliage-automatise' ? (
                          <>
                            <p className="text-base md:text-lg leading-relaxed font-medium text-[#0E2A33]/70">
                              Nos centres de pliage robotisés et presses plieuses grande longueur permettent de réaliser des profils complexes avec une répétabilité absolue. Nous repoussons les <strong>limites du pliage aluminium</strong> avec une capacité allant jusqu'à 4 mètres pour vos couvertines et bavettes.
                            </p>
                            <p className="text-base md:text-lg leading-relaxed font-medium text-[#0E2A33]/70">
                              <a href="/expertises/pliage-aluminium-sur-mesure">En savoir plus sur nos capacités de pliage aluminium sur mesure</a>
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
              <h2 className="text-3xl md:text-5xl text-white tracking-tighter font-extrabold">Une étude technique pour votre projet ?</h2>
              <p className="text-base md:text-lg text-white/50">Nos chargés d'affaires analysent vos contraintes pour optimiser vos coûts de fabrication.</p>
              <button onClick={() => setCurrentPage('contact')} className="px-10 py-4 md:px-12 md:py-5 bg-[#E2FD48] text-[#0E2A33] text-sm font-extrabold rounded-full transition-all shadow-xl hover:shadow-[#E2FD48]/20 hover:-translate-y-1">
                Demander un devis personnalisé
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
            <div className="max-w-7xl mx-auto px-6">
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
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-[#0E2A33] mb-4">
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
        </div>
      )}

      {/* --- RESSOURCE ARTICLE 1 --- */}
      {currentPage === 'ressource-1' && (
        <div className="animate-fade-up bg-white" style={{ backgroundColor: '#FFFFFF' }}>
          <section className="pt-32 md:pt-40 pb-12 bg-white" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-4xl">
                <span className="text-[10px] font-extrabold tracking-[0.4em] text-[#6B7280] uppercase block mb-4">
                  RESSOURCES TECHNIQUES · MATÉRIAUX
                </span>
                <h1 className="text-4xl md:text-5xl tracking-tighter leading-[1.1] font-black mb-6 text-[#000000]">
                  Choisir le bon métal pour une façade extérieure
                </h1>
                <p className="text-base md:text-lg text-[#1F2937]/80 leading-relaxed font-medium mb-10">
                  Pour un architecte ou un façadier, <strong>choisir le bon métal pour une façade extérieure</strong> est une décision
                  critique qui conditionne la pérennité structurelle et l’esthétique du bâti. Cette sélection repose sur une compréhension
                  précise des propriétés mécaniques, des coefficients de <strong>dilatation</strong> et des exigences de protection contre
                  la corrosion.
                </p>
              </div>
            </div>
          </section>

          <section className="py-20 border-t border-gray-200 bg-white" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="max-w-4xl mx-auto px-6 space-y-16 text-[#1F2937]">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#000000]">
                  Comparatif technique : Aluminium, Acier et Inox
                </h2>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  Le choix du substrat influence directement la charge sur le gros œuvre et la complexité du pliage métallique sur
                  mesure.
                </p>
                <ul className="list-disc list-inside space-y-3 text-sm md:text-base text-[#1F2937]/90">
                  <li>
                    <strong>L’Aluminium</strong> : Prisé pour sa légèreté (environ 2,7 g/cm³), il réduit les contraintes sur les
                    ossatures secondaires. Sa résistance naturelle à l’oxydation en fait le matériau de prédilection pour les zones
                    humides.
                  </li>
                  <li>
                    <strong>L’Acier</strong> : Offre une rigidité supérieure (Module d’Young de 210 GPa). Il doit être utilisé sous forme
                    galvanisée ou prélaquée (nuance S320GD) pour garantir une protection anti-corrosion efficace.
                  </li>
                  <li>
                    <strong>L’Inox (Acier Inoxydable)</strong> : La nuance 316L (A4) est la seule recommandée pour les environnements
                    marins ou industriels agressifs.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#000000]">
                  Durabilité et finitions : l’importance du thermolaquage
                </h2>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  Le traitement de surface est indissociable du choix du métal. Pour une façade extérieure, nous recommandons le label{' '}
                  <strong>QUALICOAT</strong>&nbsp;:
                </p>
                <ul className="list-disc list-inside space-y-3 text-sm md:text-base text-[#1F2937]/90">
                  <li>
                    <strong>Préparation de surface</strong> : Un dégraissage et un mordançage rigoureux.
                  </li>
                  <li>
                    <strong>Application</strong> : Une couche de poudre polymérisée entre 45 et 60 microns.
                  </li>
                  <li>
                    <strong>Variante Seaside</strong> : Obligatoire pour les projets en littoral afin de prévenir la corrosion
                    filiforme.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#000000]">
                  Précision du pliage CNC : l’exigence du sur-mesure
                </h2>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  La réussite technique dépend de la précision géométrique. Nos presses plieuses numériques (CNC) permettent des
                  tolérances de ±0,3&nbsp;mm. Un pliage de haute précision assure la régularité des joints creux et facilite l’étanchéité
                  à l’air et à l’eau de l’enveloppe.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#000000]">
                  Conclusion : l’expertise Plialu au service de l’architecture
                </h2>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  <strong>Choisir le bon métal pour une façade extérieure</strong> nécessite de concilier esthétique et contraintes
                  normatives (DTU). La précision de notre pliage associé à des certifications <strong>QUALICOAT</strong> offre la
                  garantie d’une enveloppe performante.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* --- RESSOURCE ARTICLE 2 --- */}
      {currentPage === 'ressource-2' && (
        <div className="animate-fade-up bg-white" style={{ backgroundColor: '#FFFFFF' }}>
          <section className="pt-32 md:pt-40 pb-12 bg-white" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-4xl">
                <span className="text-[10px] font-extrabold tracking-[0.4em] text-[#6B7280] uppercase block mb-4">
                  RESSOURCES TECHNIQUES · FAÇADE ALUMINIUM
                </span>
                <h1 className="text-4xl md:text-5xl tracking-tighter leading-[1.1] font-black mb-6 text-[#000000]">
                  Pliage aluminium pour façade : limites et tolérances
                </h1>
                <p className="text-base md:text-lg text-[#1F2937]/80 leading-relaxed font-medium mb-6">
                  Le <strong>pliage aluminium pour façade</strong> constitue une étape critique de l’ingénierie de l’enveloppe, intervenant
                  juste après l’étape consistant à{' '}
                  <button
                    onClick={() => setCurrentPage('ressource-1')}
                    className="underline underline-offset-4 decoration-[#6B7280] hover:decoration-[#1F2937] transition-colors font-semibold text-[#1F2937]"
                  >
                    choisir le bon métal pour une façade extérieure
                  </button>{' '}
                  pour garantir la pérennité et l’esthétique de l’ouvrage. Pour les architectes et bureaux d’études, la maîtrise du
                  façonnage n’est pas qu’une question de forme, mais une réponse rigoureuse aux contraintes mécaniques et
                  environnementales.
                </p>
                <p className="text-base md:text-lg text-[#1F2937]/80 leading-relaxed font-medium">
                  Une cassette ou un habillage mal conçu peut compromettre l’étanchéité globale et la planéité visuelle du bâtiment. Ce
                  guide détaille les paramètres physiques et industriels essentiels pour réussir vos projets de façades métalliques
                  premium.
                </p>
              </div>
            </div>
          </section>

          <section className="py-20 border-t border-gray-200 bg-[#F9FAFB]" style={{ backgroundColor: '#F9FAFB' }}>
            <div className="max-w-4xl mx-auto px-6 space-y-16 text-[#1F2937]">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#000000]">
                  Gestion de la dilatation thermique : anticiper le mouvement
                </h2>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  L’aluminium possède un coefficient de <strong>dilatation</strong> thermique linéaire élevé, ce qui impose une
                  conception capable d’absorber les variations dimensionnelles sans générer de contraintes internes.
                </p>
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
                  DONNÉES PHYSIQUES ET CALCULS
                </h3>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  La valeur de référence pour les alliages d’aluminium est d’environ 2,4&nbsp;mm/m pour 100&nbsp;°C de variation
                  thermique. Pour une façade exposée, une amplitude de 100&nbsp;°C (de -20&nbsp;°C en hiver à +80&nbsp;°C sur une tôle
                  sombre en plein soleil) constitue une base de calcul réaliste.
                </p>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  La variation de longueur se calcule selon la formule classique de la <strong>dilatation</strong>&nbsp;:
                </p>
                <p className="text-base text-[#1F2937] font-mono bg-[#F9FAFB] inline-block px-3 py-2 rounded-md border border-[#D1D5DB]">
                  ΔL = α × L₀ × ΔT
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-[#1F2937]/90 mt-4">
                  <li>α est le coefficient de dilatation.</li>
                  <li>L₀ est la longueur initiale de la pièce.</li>
                  <li>ΔT est l’écart de température pris en compte.</li>
                </ul>
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mt-6">
                  CONSÉQUENCES SUR LA CONCEPTION
                </h3>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  Le pliage doit intégrer des jeux de fonctionnement précis pour éviter des pathologies lourdes&nbsp;:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-[#1F2937]/90">
                  <li>
                    <strong>Oil canning</strong> : ondulations de surface dues au bridage thermique des cassettes.
                  </li>
                  <li>
                    <strong>Fatigue des fixations</strong> : cisaillement des rivets si les trous oblongs sont absents ou mal
                    dimensionnés.
                  </li>
                  <li>
                    <strong>Défaut d’étanchéité</strong> : usure prématurée des joints de calfeutrement soumis à des élongations
                    excessives.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#000000]">
                  Métallurgie et rayons de pliage : les limites du matériau
                </h2>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  Le choix de l’alliage et du rayon de courbure dicte la résistance structurelle et l’aspect fini de la façade. Une
                  approche purement esthétique sans prise en compte de ces paramètres conduit à des fragilités mécaniques.
                </p>
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
                  ANALYSE DES ALLIAGES COURANTS ET CONTRAINTES DE FAÇONNAGE
                </h3>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  L’épaisseur de la tôle détermine le rayon de pliage minimal à respecter pour éviter la fissuration des grains. Plus la
                  tôle est fine, plus le rayon de pliage peut être serré, mais au prix d’une plus grande sensibilité aux chocs et aux
                  déformations.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-[#1F2937]/90">
                  <li>Pour des épaisseurs faibles, le rayon minimal est réduit mais doit rester compatible avec l’usage en façade.</li>
                  <li>
                    Le pliage doit préférentiellement s’effectuer perpendiculairement au sens de laminage pour garantir une intégrité
                    moléculaire maximale.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#000000]">
                  Finitions et thermolaquage : l’assurance QUALICOAT
                </h2>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  Après le <strong>pliage aluminium pour façade</strong>, le traitement de surface assure la protection contre les UV et
                  la pollution. Le label <strong>QUALICOAT</strong> impose des protocoles stricts garantissant la durabilité du système
                  de revêtement.
                </p>
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
                  CERTIFICATION ET PERFORMANCES
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-[#1F2937]/90">
                  <li>Épaisseur de laque d’environ 60&nbsp;µm minimum sur les faces vues.</li>
                  <li>Adhérence optimale vérifiée par des tests de quadrillage et de pliage.</li>
                  <li>
                    Résistance prouvée au brouillard salin acétique, avec la variante <strong>Seaside</strong> pour les milieux
                    fortement corrosifs.
                  </li>
                </ul>
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mt-6">
                  AVANTAGES DU POST-LAQUAGE
                </h3>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  Réaliser le thermolaquage après le pliage permet de protéger les arêtes de coupe et les arrondis de plis, zones où les
                  tôles pré-laquées présentent souvent des fragilités et des amorces de corrosion.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#000000]">
                  Précision industrielle et apport de la commande numérique (CNC)
                </h2>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  L’utilisation de presses plieuses à commande numérique (CNC) est indispensable pour répondre aux standards de
                  l’architecture contemporaine. Elle garantit une répétabilité des angles, des dimensions et des rayons de pliage sur
                  l’ensemble des pièces d’un même projet.
                </p>
              </div>

              <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <p className="text-sm text-[#1F2937]/80 max-w-xl">
                  Pour vos projets de <strong>pliage aluminium pour façade</strong>, PLIALU met à disposition une capacité industrielle
                  de haut niveau et un accompagnement technique dédié, de l’esquisse au dossier d’exécution.
                </p>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="px-8 py-3 bg-[#1F2937] text-white text-xs font-black tracking-[0.2em] uppercase rounded-full hover:bg-[#E2FD48] transition-colors"
                >
                  ÉCHANGER AVEC UN EXPERT
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* --- RESSOURCE ARTICLE 3 --- */}
      {currentPage === 'ressource-3' && (
        <div className="animate-fade-up bg-white" style={{ backgroundColor: '#FFFFFF' }}>
          <section className="pt-32 md:pt-40 pb-12 bg-white" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-4xl">
                <span className="text-[10px] font-extrabold tracking-[0.4em] text-[#6B7280] uppercase block mb-4">
                  RESSOURCES TECHNIQUES · THERMOLAQUAGE QUALICOAT
                </span>
                <h1 className="text-4xl md:text-5xl tracking-tighter leading-[1.1] font-black mb-6 text-[#000000]">
                  Thermolaquage certifié Qualicoat : garanties
                </h1>
                <p className="text-base md:text-lg text-[#1F2937]/80 leading-relaxed font-medium">
                  Le <strong>Thermolaquage certifié Qualicoat</strong> représente l'exigence technique absolue pour garantir la pérennité
                  structurelle et esthétique des enveloppes métalliques soumises aux contraintes environnementales sévères. Dans le domaine
                  de la conception architecturale contemporaine, la durabilité d'une façade ne peut plus être perçue comme la simple
                  résultante de la nature intrinsèque du métal utilisé.
                </p>
              </div>
            </div>
          </section>

          <section className="py-20 border-t border-gray-200 bg-[#F9FAFB]" style={{ backgroundColor: '#F9FAFB' }}>
            <div className="max-w-4xl mx-auto px-6 space-y-16 text-[#1F2937]">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#000000]">
                  La science du label : fondements et garanties de la certification Qualicoat
                </h2>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  Le label international <strong>QUALICOAT</strong> est une certification régie par des spécifications rigoureuses visant à
                  établir des niveaux d'exigence minimaux pour les installations de laquage, les matériaux de revêtement et les produits
                  finis destinés aux applications architecturales.
                </p>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  La certification ne se limite pas à un contrôle visuel&nbsp;: elle repose sur une validation multidimensionnelle des
                  propriétés physico-chimiques du complexe métal-peinture. Les spécifications intègrent des normes ISO et EN pour
                  quantifier chaque paramètre de performance, avec une traçabilité renforcée sur les nouvelles générations d’alliages
                  (dont l’aluminium recyclé).
                </p>
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
                  PROTOCOLES DE TESTS : ADHÉRENCE, BRILLANCE ET RÉSISTANCE
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-[#1F2937]/90">
                  <li>
                    <strong>Test de quadrillage (ISO 2409)</strong> : classification "Grade 0" obligatoire, sans aucun éclat ni
                    détachement de la laque au croisement des coupes.
                  </li>
                  <li>
                    <strong>Mesure de brillance (ISO 2813)</strong> : contrôle de la rétention de brillance sous rayonnement UV avec des
                    tolérances strictes par rapport à l’échantillon initial.
                  </li>
                  <li>
                    <strong>Vieillissement accéléré et brouillard salin</strong> : exposition prolongée en atmosphère corrosive pour
                    valider la tenue du système dans le temps.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#000000]">
                  Stabilité colorimétrique et classes de poudres
                </h2>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  Pour les prescripteurs, la stabilité visuelle est primordiale. Le <strong>Thermolaquage certifié Qualicoat</strong>{' '}
                  garantit la tenue des teintes et de la brillance face au rayonnement solaire grâce à des familles de poudres classées
                  par niveau de durabilité.
                </p>
                <table className="w-full text-left text-sm md:text-base border border-[#D1D5DB] border-collapse mt-4 text-[#000000]">
                  <thead className="bg-[#F3F4F6]">
                    <tr>
                      <th className="px-4 py-3 border-b border-[#D1D5DB] font-semibold text-[#000000]">Classe de poudre</th>
                      <th className="px-4 py-3 border-b border-[#D1D5DB] font-semibold text-[#000000]">Durabilité UV</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#D1D5DB]">
                      <td className="px-4 py-3">Classe 1</td>
                      <td className="px-4 py-3">Poudres standards testées 1 an en Floride (ISO 2810).</td>
                    </tr>
                    <tr className="border-b border-[#D1D5DB]">
                      <td className="px-4 py-3">Classe 2</td>
                      <td className="px-4 py-3">
                        Poudres «&nbsp;Super Durables&nbsp;» testées 3 ans, avec une rétention de brillance nettement supérieure.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Classe 3</td>
                      <td className="px-4 py-3">Poudres «&nbsp;Ultra Durables&nbsp;» destinées aux environnements extrêmes.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#000000]">
                  Le processus Qualicoat : ingénierie de la surface et chimie des matériaux
                </h2>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  Le succès d'un <strong>Thermolaquage certifié Qualicoat</strong> repose sur une préparation de surface qui transforme
                  l'aluminium d'un état passif à un état chimiquement réactif. Chaque étape du processus est monitorée par des relevés
                  de production et des tests sur plaquettes témoins conservées sur la durée.
                </p>
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
                  PRÉTRAITEMENT CHIMIQUE : DÉCONTAMINATION, DÉROCHAGE, CONVERSION
                </h3>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  Après dégraissage, le dérochage élimine les impuretés métalliques et l’oxyde naturel. La conversion chimique, désormais
                  majoritairement <strong>Chrome-free</strong> (sels de titane ou de zirconium), crée une couche nanométrique jouant le
                  rôle d’interface entre le substrat et la laque poudre.
                </p>
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
                  APPLICATION PAR POUDRAGE ÉLECTROSTATIQUE
                </h3>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  La peinture poudre, projetée par pistolet électrostatique, se dépose de manière uniforme sur les géométries
                  complexes. Le recyclage des excédents (jusqu’à 98&nbsp;%) en fait un procédé performant et peu émissif en COV.
                </p>
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
                  POLYMÉRISATION ET RÉTICULATION THERMIQUE
                </h3>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  La cuisson au four assure la réticulation du film de peinture. Le contrôle de l’<strong>indice de cuisson</strong>{' '}
                  garantit que la laque atteint ses propriétés mécaniques optimales de dureté et de souplesse.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#000000]">
                  Focus Seaside : protection renforcée pour les zones littorales
                </h2>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  Les environnements côtiers, riches en chlorures et en humidité, sont parmi les plus agressifs pour l’aluminium
                  architectural. La mention <strong>Qualicoat Seaside</strong> renforce la protection en imposant un dérochage plus
                  profond et des protocoles de contrôle spécifiques.
                </p>
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
                  TABLEAU TECHNIQUE : PRÉTRAITEMENTS ET DISTANCE AU LITTORAL
                </h3>
                <table className="w-full text-left text-sm md:text-base border border-[#D1D5DB] border-collapse mt-4 text-[#000000]">
                  <thead className="bg-[#F3F4F6]">
                    <tr>
                      <th className="px-4 py-3 border-b border-[#D1D5DB] font-semibold text-[#000000]">Type de prétraitement</th>
                      <th className="px-4 py-3 border-b border-[#D1D5DB] font-semibold text-[#000000]">Taux d’attaque (g/m²)</th>
                      <th className="px-4 py-3 border-b border-[#D1D5DB] font-semibold text-[#000000]">Distance recommandée du littoral</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#D1D5DB]">
                      <td className="px-4 py-3">Standard</td>
                      <td className="px-4 py-3">Attaque modérée</td>
                      <td className="px-4 py-3">&gt; 20 km</td>
                    </tr>
                    <tr className="border-b border-[#D1D5DB]">
                      <td className="px-4 py-3">Seaside A</td>
                      <td className="px-4 py-3">Taux d’attaque renforcé</td>
                      <td className="px-4 py-3">Environ 5 à 20 km du littoral</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Seaside Ox (pré-anodisation)</td>
                      <td className="px-4 py-3">Couche anodique mince</td>
                      <td className="px-4 py-3">Front de mer / Offshore</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  Ces configurations réduisent drastiquement les sites d’amorçage de la{' '}
                  <strong>corrosion filiforme</strong>, pathologie redoutée des façades exposées aux embruns.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#000000]">
                  Post-laquage vs pré-laquage : l’enjeu du pliage aluminium pour façade
                </h2>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  La durabilité d'une enveloppe métallique ne dépend pas uniquement de la qualité de la peinture, mais de la
                  chronologie industrielle. Laquer après le{' '}
                  <button
                    onClick={() => setCurrentPage('ressource-2')}
                    className="underline underline-offset-4 decoration-[#6B7280] hover:decoration-[#1F2937] transition-colors font-semibold text-[#1F2937]"
                  >
                    pliage aluminium pour façade
                  </button>{' '}
                  permet de supprimer les micro-fissures et les tranches nues caractéristiques des systèmes pré-laqués.
                </p>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  Le post-laquage, pratiqué par Plialu, enrobe intégralement les pièces déjà façonnées, y compris les arêtes vives et
                  l'intérieur des perçages. La couche de laque polymérise sur une géométrie stabilisée, sans subir de déformation
                  ultérieure.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#000000]">
                  Maillage réglementaire et recommandations pour les prescripteurs
                </h2>
                <p className="text-base text-[#1F2937]/80 leading-relaxed">
                  Le <strong>Thermolaquage certifié Qualicoat</strong> s’inscrit dans un cadre normatif précis (NF DTU, normes d’exposition,
                  prescriptions d’entretien). La façade devient un système global où le métal apporte la rigidité et le traitement de
                  surface assure la longévité.
                </p>
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
                  POINTS CLÉS POUR LES ARCHITECTES ET BUREAUX D’ÉTUDES
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-[#1F2937]/90">
                  <li>
                    Exiger des systèmes <strong>Qualicoat Seaside</strong> pour tout projet à proximité du littoral.
                  </li>
                  <li>
                    Privilégier systématiquement le <strong>post-laquage</strong> après façonnage pour les éléments de façade les plus
                    exposés.
                  </li>
                  <li>
                    Spécifier des poudres de <strong>Classe 2</strong> minimum sur les façades les plus sollicitées par les UV.
                  </li>
                  <li>
                    Vérifier la traçabilité des certificats de laqueur (paramètres de cuisson, tests d’adhérence, contrôles qualité).
                  </li>
                </ul>
              </div>

              <div className="pt-8 border-t border-gray-300 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <p className="text-sm text-[#1F2937]/80 max-w-xl">
                  Pour une enveloppe durable, commencez par{' '}
                  <button
                    onClick={() => setCurrentPage('ressource-1')}
                    className="underline underline-offset-4 decoration-[#6B7280] hover:decoration-[#1F2937] transition-colors font-semibold text-[#1F2937]"
                  >
                    choisir le bon métal pour une façade extérieure
                  </button>
                  , puis associez-le à un <strong>Thermolaquage certifié Qualicoat</strong> appliqué après le façonnage.
                </p>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="px-8 py-3 bg-[#1F2937] text-white text-xs font-black tracking-[0.2em] uppercase rounded-full hover:bg-[#0E2A33] transition-colors"
                >
                  PARLER THERMOLAQUAGE AVEC NOUS
                </button>
              </div>
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
        <main className="min-h-[50vh] flex flex-col pt-48 md:pt-56 pb-20 bg-[#0E2A33]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Enduit mince sur isolant</h1>
            <button
              onClick={() => setCurrentPage('solutions')}
              className="text-[#E2FD48] hover:text-white transition font-medium flex items-center gap-2 mt-8"
            >
              &larr; Retour aux solutions
            </button>
          </div>
        </main>
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

      {/* --- CONTACT PAGE CONTENT --- */}
      {currentPage === 'contact' && (
        <div className="animate-fade-up">
          {/* Hero Contact (White background, Dark header logic) */}
          <section className="bg-white pt-48 md:pt-56 pb-20 min-h-[70vh] flex flex-col justify-center">
            <div className="max-w-7xl mx-auto px-6">
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
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-[#0E2A33]">Où nous trouver ?</h2>
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
                  <form ref={contactFormRef} action="https://formspree.io/f/mwvrvrqg" method="POST" encType="multipart/form-data" className="space-y-6" onSubmit={handleContactSubmit}>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#0E2A33]">Prénom</label>
                        <input type="text" name="firstname" required className="w-full p-3 bg-[#F3F6F7] border border-[#0E2A33]/20 rounded-lg focus:border-[#E2FD48] focus:ring-2 focus:ring-[#E2FD48]/30 outline-none text-[#0E2A33]" placeholder="Jean" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#0E2A33]">Nom</label>
                        <input type="text" name="lastname" required className="w-full p-3 bg-[#F3F6F7] border border-[#0E2A33]/20 rounded-lg focus:border-[#E2FD48] focus:ring-2 focus:ring-[#E2FD48]/30 outline-none text-[#0E2A33]" placeholder="Dupont" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#0E2A33]">Email professionnel</label>
                        <input type="email" name="email" required className="w-full p-3 bg-[#F3F6F7] border border-[#0E2A33]/20 rounded-lg focus:border-[#E2FD48] focus:ring-2 focus:ring-[#E2FD48]/30 outline-none text-[#0E2A33]" placeholder="contact@entreprise.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#0E2A33]">Téléphone</label>
                        <input type="tel" name="phone" required className="w-full p-3 bg-[#F3F6F7] border border-[#0E2A33]/20 rounded-lg focus:border-[#E2FD48] focus:ring-2 focus:ring-[#E2FD48]/30 outline-none text-[#0E2A33]" placeholder="06 00 00 00 00" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#0E2A33]">Entreprise / Cabinet</label>
                      <input type="text" name="company" className="w-full p-3 bg-[#F3F6F7] border border-[#0E2A33]/20 rounded-lg focus:border-[#E2FD48] focus:ring-2 focus:ring-[#E2FD48]/30 outline-none text-[#0E2A33]" placeholder="Nom de votre société" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#0E2A33]">Description de votre projet (pliage, façonnage, dimensions...)</label>
                      <textarea name="message" required rows={4} className="w-full p-3 bg-[#F3F6F7] border border-[#0E2A33]/20 rounded-lg focus:border-[#E2FD48] focus:ring-2 focus:ring-[#E2FD48]/30 outline-none text-[#0E2A33] resize-none" placeholder="Détaillez vos besoins techniques..."></textarea>
                    </div>

                    <div className="p-4 border-2 border-dashed border-[#0E2A33]/20 rounded-xl bg-[#F3F6F7]">
                      <label className="block text-sm font-bold mb-2 text-[#0E2A33]">
                        <span className="text-[#E2FD48]">Joindre vos plans ou photos</span> (PDF, DWG, DXF, JPG)
                      </label>
                      <input type="file" name="upload" accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png" className="block w-full text-sm text-[#0E2A33]/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#E2FD48] file:text-[#0E2A33] hover:file:bg-[#d4ed3f] cursor-pointer" />
                      <p className="mt-2 text-xs text-[#0E2A33]/50 text-center">Taille maximale : 10 Mo par envoi.</p>
                    </div>

                    {formFileError && (
                      <div className="p-4 rounded-xl bg-orange-50 border-2 border-orange-300 text-orange-800 text-sm font-medium" role="alert">
                        {formFileError}
                      </div>
                    )}
                    {formError && (
                      <p className="text-sm text-red-600 font-medium" role="alert">
                        {formError}
                      </p>
                    )}
                    <button type="submit" disabled={formSubmitting} className="w-full py-4 bg-[#E2FD48] text-[#0E2A33] font-bold rounded-lg hover:bg-[#d4ed3f] transition-colors uppercase tracking-wider shadow-[0_0_30px_rgba(226,253,72,0.2)] disabled:opacity-60 disabled:cursor-not-allowed">
                      {formSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande de devis technique'}
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