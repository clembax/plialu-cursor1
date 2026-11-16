import React, { useState, useEffect, useRef } from 'react';
import CookieBanner from './src/components/CookieBanner';
import GoutteEauExtrudee from './src/components/GoutteEauExtrudee';
import { PROJECTS, getPortfolioOrder, buildPortfolioJsonLd } from './projects';
import PortfolioSheet from './PortfolioSheet';
import { SEO_CONFIG, BLOCKED_PAGE_KEYS, type PageKey } from './src/seo/seoConfig';
import type { ZoneId } from './src/data/zones';
import { Header } from './src/layout/Header';
import { Footer } from './src/layout/Footer';
import { HomePage } from './src/pages/Home';
import { AProposPage } from './src/pages/APropos';
import { PortfolioPage } from './src/pages/Portfolio';
import { SolutionsHubPage } from './src/pages/SolutionsHub';
import { SolutionsPage } from './src/pages/Solutions';
import { ExpertisesPage } from './src/pages/Expertises';
import { RessourcesPage } from './src/pages/Ressources';
import { RessourceChoixMetalPage } from './src/pages/RessourceChoixMetal';
import { RessourcePliagePage } from './src/pages/RessourcePliage';
import { RessourceThermolaquagePage } from './src/pages/RessourceThermolaquage';
import { SolutionBardagePage } from './src/pages/SolutionBardage';
import { SolutionEnduitPage } from './src/pages/SolutionEnduit';
import { SolutionPrecadresPage } from './src/pages/SolutionPrecadres';
import { SolutionTolesPage } from './src/pages/SolutionToles';
import { SolutionRavalementPage } from './src/pages/SolutionRavalement';
import { EtancheitePage } from './src/pages/EtancheitePage';
import { ContactPage } from './src/pages/Contact';
import { MerciPage } from './src/pages/Merci';
import { MentionsLegalesPage } from './src/pages/MentionsLegales';
import { PolitiqueConfidentialitePage } from './src/pages/PolitiqueConfidentialite';

const sheetHistoryId = (): string | null => {
  const state = window.history.state as { plialuSheet?: unknown } | null;
  return state && typeof state.plialuSheet === 'string' ? state.plialuSheet : null;
};

const App: React.FC = () => {
  const getInitialPage = (): PageKey => {
    const currentPath = window.location.pathname;
    const matchingKey = Object.keys(SEO_CONFIG).find(key => SEO_CONFIG[key].path === currentPath);
    if (!matchingKey || BLOCKED_PAGE_KEYS.has(matchingKey)) return 'home';
    return matchingKey as PageKey;
  };
  const [currentPage, setCurrentPage] = useState<PageKey>(getInitialPage);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const sheetOriginIdRef = useRef<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [solutionsAccordionOpen, setSolutionsAccordionOpen] = useState<string | null>(null);
  const [isSommaireSticky, setIsSommaireSticky] = useState(false);
  const [zone, setZone] = useState<ZoneId | null>(null);
  const zonePin = useRef<ZoneId | null>(null);

  // Nettoie l'URL des pages bloquées (le contenu est déjà 'home' via getInitialPage)
  useEffect(() => {
    const currentPath = window.location.pathname;
    const matchingKey = Object.keys(SEO_CONFIG).find(key => SEO_CONFIG[key].path === currentPath);
    if (matchingKey && BLOCKED_PAGE_KEYS.has(matchingKey)) {
      window.history.replaceState(null, '', '/');
    }
  }, []);

  useEffect(() => {
    if (currentPage === 'projects' || currentPage === 'home') return;
    if (sheetHistoryId()) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    setOpenProjectId((prev) => (prev ? null : prev));
  }, [currentPage]);

  // Gère la mise à jour SEO et la fausse URL lors d'un changement de page
  useEffect(() => {
    const config = SEO_CONFIG[currentPage];
    if (config) {
      document.title = config.title;
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', config.desc);
      const ogImageMeta = document.querySelector('meta[property="og:image"]');
      if (ogImageMeta) {
        ogImageMeta.setAttribute('content', 'https://res.cloudinary.com/dyiup6v5x/image/upload/v1771414327/Hero-1200px_vuuw2q.webp');
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:image');
        meta.setAttribute('content', 'https://res.cloudinary.com/dyiup6v5x/image/upload/v1771414327/Hero-1200px_vuuw2q.webp');
        document.head.appendChild(meta);
      }
      const ogImageWidthMeta = document.querySelector('meta[property="og:image:width"]') || (() => { const m = document.createElement('meta'); m.setAttribute('property', 'og:image:width'); m.setAttribute('content', '1200'); document.head.appendChild(m); return m; })();
      ogImageWidthMeta.setAttribute('content', '1200');

      const ogImageHeightMeta = document.querySelector('meta[property="og:image:height"]') || (() => { const m = document.createElement('meta'); m.setAttribute('property', 'og:image:height'); m.setAttribute('content', '630'); document.head.appendChild(m); return m; })();
      ogImageHeightMeta.setAttribute('content', '630');

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

      const existingLd = document.getElementById('ld-portfolio');
      if (currentPage === 'projects') {
        const payload = JSON.stringify(
          buildPortfolioJsonLd(PROJECTS, window.location.origin, SEO_CONFIG.projects.title)
        ).replace(/</g, '\\u003c');
        const script = existingLd ?? document.createElement('script');
        script.id = 'ld-portfolio';
        script.setAttribute('type', 'application/ld+json');
        script.textContent = payload;
        if (!existingLd) document.head.appendChild(script);
      } else if (existingLd) {
        existingLd.remove();
      }

      // Met à jour l'URL sans recharger la page
      if (window.location.pathname !== config.path) {
        window.history.pushState(null, '', config.path);
      }
    }
  }, [currentPage]);

  // Écoute le bouton "Retour/Avance" du navigateur
  useEffect(() => {
    const handlePopState = () => {
      setOpenProjectId(sheetHistoryId());
      const currentPath = window.location.pathname;
      const matchingKey = Object.keys(SEO_CONFIG).find(key => SEO_CONFIG[key].path === currentPath);
      if (matchingKey && BLOCKED_PAGE_KEYS.has(matchingKey)) {
        window.history.replaceState(null, '', '/');
        setCurrentPage('home');
        return;
      }
      if (matchingKey) {
        setCurrentPage(matchingKey as PageKey);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const teaserVideoRef = React.useRef<HTMLVideoElement>(null);
  const expertisesVideoRef = React.useRef<HTMLVideoElement>(null);
  const sommaireRef = useRef<HTMLDivElement>(null);
  const expertisesHeroRef = useRef<HTMLElement | null>(null);
  const scrollToInfinimetal = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (currentPage === 'a-propos') {
      document.getElementById('infinimetal')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentPage('a-propos');
      setTimeout(() => {
        document.getElementById('infinimetal')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const infinimetalLinkClass = 'cursor-pointer text-[#E2FD48] hover:underline transition-colors';

  const [contactPrefill, setContactPrefill] = useState<{ intention?: string; domaine?: string }>({});
  const [contactIntention, setContactIntention] = useState('');
  const [contactSending, setContactSending] = useState(false);
  const [attachmentTooLarge, setAttachmentTooLarge] = useState(false);
  const contactSendingRef = useRef(false);
  const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;

  const filesTooLarge = (files: FileList | null | undefined) =>
    [...(files ?? [])].reduce((sum, file) => sum + file.size, 0) > MAX_ATTACHMENT_BYTES;
  useEffect(() => {
    setContactIntention(contactPrefill.intention ?? '');
  }, [contactPrefill]);
  const isCandidature = contactIntention === 'Postuler chez PLIALU';

  const goContactForm = () => {
    if (currentPage !== 'contact') setCurrentPage('contact');
    window.setTimeout(() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
  };

  const onContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (contactSendingRef.current) {
      e.preventDefault();
      return;
    }
    const form = e.currentTarget;
    const files = form.querySelector<HTMLInputElement>('input[name="attachment"]')?.files;
    if (filesTooLarge(files)) {
      e.preventDefault();
      setAttachmentTooLarge(true);
      return;
    }
    setAttachmentTooLarge(false);
    contactSendingRef.current = true;
    setContactSending(true);
  };

  const goDevis = (domaine: string) => {
    setContactPrefill({ intention: 'Demander un devis', domaine });
    goContactForm();
  };

  const goSolution = (anchor: string) => {
    setCurrentPage('solutions-temporaire');
    window.setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
  };

  const openCookiePolicy = () => {
    setCurrentPage('politique-confidentialite');
    window.setTimeout(() => document.getElementById('cookies')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
  };


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

  const portfolioOrder = getPortfolioOrder(PROJECTS, 'zento-grenoble');
  const portfolioYears = PROJECTS.map((project) => Number(project.year));
  const portfolioYearMin = Math.min(...portfolioYears);
  const portfolioYearMax = Math.max(...portfolioYears);
  const openPortfolioIndex = portfolioOrder.findIndex((project) => project.id === openProjectId);
  const openPortfolioProject = openPortfolioIndex >= 0 ? portfolioOrder[openPortfolioIndex] : null;

  const openProject = (id: string) => {
    sheetOriginIdRef.current = id;
    setOpenProjectId(id);
    window.history.pushState({ plialuSheet: id }, '', window.location.href);
  };

  const showProject = (id: string) => {
    setOpenProjectId(id);
    if (sheetHistoryId()) {
      window.history.replaceState({ plialuSheet: id }, '', window.location.href);
    }
  };

  const closeSheet = () => {
    if (sheetHistoryId()) {
      window.history.back();
      return;
    }
    setOpenProjectId(null);
  };

  const requestQuoteFromSheet = () => {
    if (sheetHistoryId()) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    setOpenProjectId(null);
    goContactForm();
  };

  useEffect(() => {
    if (openProjectId) return;
    const originId = sheetOriginIdRef.current;
    if (!originId) return;
    sheetOriginIdRef.current = null;
    const frame = requestAnimationFrame(() => {
      document.getElementById(`portfolio-card-${originId}`)?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [openProjectId]);


  return (
    <div className="font-manrope selection-brand min-h-screen">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        goContactForm={goContactForm}
        openProjectId={openProjectId}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {currentPage === 'home' && (
        <HomePage
          setCurrentPage={setCurrentPage}
          goContactForm={goContactForm}
          goSolution={goSolution}
          openProject={openProject}
          teaserVideoRef={teaserVideoRef}
          portfolioYearMin={portfolioYearMin}
          portfolioYearMax={portfolioYearMax}
        />
      )}

      {currentPage === 'a-propos' && (
        <AProposPage
          setCurrentPage={setCurrentPage}
          goContactForm={goContactForm}
          zone={zone}
          setZone={setZone}
          zonePin={zonePin}
        />
      )}

      {currentPage === 'projects' && (
        <PortfolioPage
          goContactForm={goContactForm}
          openProject={openProject}
          portfolioYearMin={portfolioYearMin}
          portfolioYearMax={portfolioYearMax}
          portfolioOrder={portfolioOrder}
        />
      )}

      {currentPage === 'solutions' && (
        <SolutionsHubPage setCurrentPage={setCurrentPage} goContactForm={goContactForm} />
      )}

      {currentPage === 'solutions-temporaire' && (
        <SolutionsPage
          setCurrentPage={setCurrentPage}
          goContactForm={goContactForm}
          goDevis={goDevis}
          scrollToInfinimetal={scrollToInfinimetal}
          infinimetalLinkClass={infinimetalLinkClass}
        />
      )}

      {currentPage === 'expertises' && (
        <ExpertisesPage
          goContactForm={goContactForm}
          openCookiePolicy={openCookiePolicy}
          hoveredStep={hoveredStep}
          setHoveredStep={setHoveredStep}
          isSommaireSticky={isSommaireSticky}
          expertisesHeroRef={expertisesHeroRef}
          sommaireRef={sommaireRef}
          scrollToInfinimetal={scrollToInfinimetal}
        />
      )}

      {currentPage === 'ressources' && (
        <RessourcesPage setCurrentPage={setCurrentPage} goContactForm={goContactForm} />
      )}

      {currentPage === 'ressource-1' && (
        <RessourceChoixMetalPage setCurrentPage={setCurrentPage} goContactForm={goContactForm} />
      )}

      {currentPage === 'ressource-2' && (
        <RessourcePliagePage setCurrentPage={setCurrentPage} goContactForm={goContactForm} />
      )}

      {currentPage === 'ressource-3' && (
        <RessourceThermolaquagePage setCurrentPage={setCurrentPage} goContactForm={goContactForm} />
      )}

      {currentPage === 'solution-bardage' && (
        <SolutionBardagePage setCurrentPage={setCurrentPage} />
      )}

      {currentPage === 'solution-enduit' && (
        <SolutionEnduitPage setCurrentPage={setCurrentPage} />
      )}

      {currentPage === 'solution-precadres' && (
        <SolutionPrecadresPage setCurrentPage={setCurrentPage} />
      )}

      {currentPage === 'solution-toles' && (
        <SolutionTolesPage setCurrentPage={setCurrentPage} />
      )}

      {currentPage === 'solution-ravalement' && (
        <SolutionRavalementPage setCurrentPage={setCurrentPage} />
      )}

      {currentPage === 'etancheite' && <EtancheitePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'goutte-eau-extrudee' && <GoutteEauExtrudee setCurrentPage={setCurrentPage} />}

      {currentPage === 'contact' && (
        <ContactPage
          setCurrentPage={setCurrentPage}
          goContactForm={goContactForm}
          openCookiePolicy={openCookiePolicy}
          handleCopy={handleCopy}
          copiedKey={copiedKey}
          contactPrefill={contactPrefill}
          contactIntention={contactIntention}
          setContactIntention={setContactIntention}
          isCandidature={isCandidature}
          contactSending={contactSending}
          onContactSubmit={onContactSubmit}
          attachmentTooLarge={attachmentTooLarge}
          setAttachmentTooLarge={setAttachmentTooLarge}
          filesTooLarge={filesTooLarge}
        />
      )}

      {currentPage === 'merci' && (
        <MerciPage setCurrentPage={setCurrentPage} />
      )}

      {currentPage === 'mentions-legales' && (
        <MentionsLegalesPage setCurrentPage={setCurrentPage} />
      )}

      {currentPage === 'politique-confidentialite' && (
        <PolitiqueConfidentialitePage setCurrentPage={setCurrentPage} />
      )}

      {openProjectId && (currentPage === 'projects' || currentPage === 'home') && openPortfolioProject && (
        <PortfolioSheet
          project={openPortfolioProject}
          index={openPortfolioIndex}
          total={portfolioOrder.length}
          previous={portfolioOrder[(openPortfolioIndex - 1 + portfolioOrder.length) % portfolioOrder.length]}
          next={portfolioOrder[(openPortfolioIndex + 1) % portfolioOrder.length]}
          onClose={closeSheet}
          onSelect={showProject}
          onContact={requestQuoteFromSheet}
        />
      )}
      <Footer setCurrentPage={setCurrentPage} />
      <CookieBanner onOpenCookiePolicy={openCookiePolicy} />
    </div>
  );
};

export default App;
