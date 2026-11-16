import React, { useState, useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router';
import CookieBanner from './src/components/CookieBanner';
import GoutteEauExtrudee from './src/components/GoutteEauExtrudee';
import { PROJECTS, getPortfolioOrder } from './projects';
import PortfolioSheet from './PortfolioSheet';
import { SEO_CONFIG, BLOCKED_PAGE_KEYS, pathToPageKey, pageHead, jsonLdPayload, type PageKey } from './src/seo/seoConfig';
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
import { NotFound } from './src/pages/NotFound';

type LocationState = { plialuSheet?: unknown; intention?: string; domaine?: string } | null;

const readSheetId = (state: unknown): string | null => {
  if (!state || typeof state !== 'object' || !('plialuSheet' in state)) return null;
  const id = (state as { plialuSheet?: unknown }).plialuSheet;
  return typeof id === 'string' ? id : null;
};

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = pathToPageKey(location.pathname) ?? 'not-found';
  const goTo = (key: PageKey) => {
    navigate(SEO_CONFIG[key].path);
  };
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const sheetOriginIdRef = useRef<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSommaireSticky, setIsSommaireSticky] = useState(false);
  const [zone, setZone] = useState<ZoneId | null>(null);
  const zonePin = useRef<ZoneId | null>(null);
  const openProjectId = (currentPage === 'projects' || currentPage === 'home') ? readSheetId(location.state) : null;

  useEffect(() => {
    const tags = pageHead(currentPage, SEO_CONFIG[currentPage].path);
    const jsonIds = new Set<string>();

    for (const tag of tags) {
      if (tag.kind === 'title') {
        document.title = tag.text;
        continue;
      }
      if (tag.kind === 'meta') {
        const selector = tag.name
          ? `meta[name="${tag.name}"]`
          : `meta[property="${tag.property}"]`;
        let el = document.querySelector(selector);
        if (!el) {
          el = document.createElement('meta');
          if (tag.name) el.setAttribute('name', tag.name);
          if (tag.property) el.setAttribute('property', tag.property);
          document.head.appendChild(el);
        }
        el.setAttribute('content', tag.content);
        continue;
      }
      if (tag.kind === 'link') {
        let el = document.querySelector(`link[rel="${tag.rel}"]`);
        if (!el) {
          el = document.createElement('link');
          el.setAttribute('rel', tag.rel);
          document.head.appendChild(el);
        }
        el.setAttribute('href', tag.href);
        continue;
      }
      jsonIds.add(tag.id);
      const existing = document.getElementById(tag.id);
      const script = existing ?? document.createElement('script');
      script.id = tag.id;
      script.setAttribute('type', 'application/ld+json');
      script.textContent = jsonLdPayload(tag.json);
      if (!existing) document.head.appendChild(script);
    }

    for (const id of ['ld-org', 'ld-portfolio']) {
      if (!jsonIds.has(id)) document.getElementById(id)?.remove();
    }
  }, [currentPage]);

  const teaserVideoRef = React.useRef<HTMLVideoElement>(null);
  const sommaireRef = useRef<HTMLDivElement>(null);
  const expertisesHeroRef = useRef<HTMLElement | null>(null);

  const navState = location.state as LocationState;
  const contactPrefill = {
    intention: typeof navState?.intention === 'string' ? navState.intention : undefined,
    domaine: typeof navState?.domaine === 'string' ? navState.domaine : undefined,
  };
  const [contactIntention, setContactIntention] = useState('');
  const [contactSending, setContactSending] = useState(false);
  const [attachmentTooLarge, setAttachmentTooLarge] = useState(false);
  const contactSendingRef = useRef(false);
  const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;

  const filesTooLarge = (files: FileList | null | undefined) =>
    [...(files ?? [])].reduce((sum, file) => sum + file.size, 0) > MAX_ATTACHMENT_BYTES;
  useEffect(() => {
    if (location.pathname !== '/contact') return;
    setContactIntention(contactPrefill.intention ?? '');
  }, [location.key, location.pathname, contactPrefill.intention]);
  const isCandidature = contactIntention === 'Postuler chez PLIALU';

  const goContactForm = () => {
    if (location.pathname === '/contact' && location.hash === '#contact-form') {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    navigate('/contact#contact-form');
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
    navigate('/contact#contact-form', { state: { intention: 'Demander un devis', domaine } });
  };

  useEffect(() => {
    setIsMenuOpen(false);
    const hash = location.hash;
    if (hash) {
      const element = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
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

  // Vidéo Teaser : lecture au scroll (Intersection Observer)
  useEffect(() => {
    const videoEl = currentPage === 'home' ? teaserVideoRef.current : null;
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
    navigate({ pathname: location.pathname, search: location.search }, { state: { plialuSheet: id } });
  };

  const showProject = (id: string) => {
    navigate({ pathname: location.pathname, search: location.search }, { replace: true, state: { plialuSheet: id } });
  };

  const closeSheet = () => {
    if (readSheetId(location.state)) {
      navigate(-1);
    }
  };

  const requestQuoteFromSheet = () => {
    navigate({ pathname: location.pathname, search: location.search }, { replace: true, state: null });
    navigate('/contact#contact-form');
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
        goContactForm={goContactForm}
        openProjectId={openProjectId}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <Routes>
        <Route path="*" element={
          currentPage !== 'not-found' && BLOCKED_PAGE_KEYS.has(currentPage) ? <Navigate to="/" replace /> :
          currentPage === 'home' ? (
            <HomePage
              goContactForm={goContactForm}
              openProject={openProject}
              teaserVideoRef={teaserVideoRef}
              portfolioYearMin={portfolioYearMin}
              portfolioYearMax={portfolioYearMax}
            />
          ) : currentPage === 'a-propos' ? (
            <AProposPage
              goContactForm={goContactForm}
              zone={zone}
              setZone={setZone}
              zonePin={zonePin}
            />
          ) : currentPage === 'projects' ? (
            <PortfolioPage
              goContactForm={goContactForm}
              openProject={openProject}
              portfolioYearMin={portfolioYearMin}
              portfolioYearMax={portfolioYearMax}
              portfolioOrder={portfolioOrder}
            />
          ) : currentPage === 'solutions' ? (
            <SolutionsHubPage goContactForm={goContactForm} />
          ) : currentPage === 'solutions-temporaire' ? (
            <SolutionsPage goContactForm={goContactForm} goDevis={goDevis} />
          ) : currentPage === 'expertises' ? (
            <ExpertisesPage
              goContactForm={goContactForm}
              hoveredStep={hoveredStep}
              setHoveredStep={setHoveredStep}
              isSommaireSticky={isSommaireSticky}
              expertisesHeroRef={expertisesHeroRef}
              sommaireRef={sommaireRef}
            />
          ) : currentPage === 'ressources' ? (
            <RessourcesPage goContactForm={goContactForm} />
          ) : currentPage === 'ressource-1' ? (
            <RessourceChoixMetalPage goContactForm={goContactForm} />
          ) : currentPage === 'ressource-2' ? (
            <RessourcePliagePage goContactForm={goContactForm} />
          ) : currentPage === 'ressource-3' ? (
            <RessourceThermolaquagePage goContactForm={goContactForm} />
          ) : currentPage === 'solution-bardage' ? (
            <SolutionBardagePage />
          ) : currentPage === 'solution-enduit' ? (
            <SolutionEnduitPage />
          ) : currentPage === 'solution-precadres' ? (
            <SolutionPrecadresPage />
          ) : currentPage === 'solution-toles' ? (
            <SolutionTolesPage />
          ) : currentPage === 'solution-ravalement' ? (
            <SolutionRavalementPage />
          ) : currentPage === 'etancheite' ? (
            <EtancheitePage />
          ) : currentPage === 'goutte-eau-extrudee' ? (
            <GoutteEauExtrudee />
          ) : currentPage === 'contact' ? (
            <ContactPage
              goContactForm={goContactForm}
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
          ) : currentPage === 'merci' ? (
            <MerciPage />
          ) : currentPage === 'mentions-legales' ? (
            <MentionsLegalesPage />
          ) : currentPage === 'politique-confidentialite' ? (
            <PolitiqueConfidentialitePage />
          ) : (
            <NotFound />
          )
        } />
      </Routes>

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
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default App;
