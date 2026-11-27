import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Link, useLocation } from 'react-router';
import { ChevronDown, Menu, X } from 'lucide-react';
import * as DS from '../components/ds/ds';
import { getSnapshot, subscribe } from '../heroCtaStore';
import type { PageKey } from '../seo/seoConfig';

const SOLUTIONS_DOCS = [
  { label: 'Plaquette', id: 'res-plaquette' },
  { label: 'Portfolio', id: 'res-book' },
  { label: 'Catalogue RAL', id: 'res-ral' },
  { label: 'Fiches techniques', id: 'res-fiches' },
  { label: 'Déroulage', id: 'res-deroulage' },
  { label: "Fiche goutte d'eau", id: 'res-goutte' },
  { label: 'Fiche couvre-joint', id: 'res-couvre-joint' },
] as const;

const PDF_BADGE_ON_DARK = 'rounded-full border border-white/20 px-[7px] py-0.5 text-[10px] font-semibold tracking-[0.05em] text-white/50';
const PRODUCT_BADGE_ON_DARK = 'whitespace-nowrap rounded-full border border-[#E2FD48]/35 px-2.5 py-1 text-[11px] font-bold text-[#E2FD48]';

export function Header(props: {
  currentPage: PageKey;
  goContactForm: () => void;
  openProjectId: string | null;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { currentPage, goContactForm, openProjectId, isMenuOpen, setIsMenuOpen } = props;
  const location = useLocation();
  const heroCtaVisible = useSyncExternalStore(subscribe, getSnapshot, () => true);
  const hideCta = currentPage === 'home' && heroCtaVisible;
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuWasOpen = useRef(false);
  const [ctaShift, setCtaShift] = useState<number | null>(null);
  const solutionsCurrent = currentPage === 'solutions-temporaire' || currentPage === 'goutte-eau-extrudee';
  const [solutionsOpen, setSolutionsOpen] = useState(solutionsCurrent);

  useEffect(() => {
    const container = containerRef.current;
    const menu = menuRef.current;
    const cta = ctaRef.current;
    if (!container || !menu || !cta) return;
    const measure = () => {
      const box = container.getBoundingClientRect();
      // Le parent n'est jamais transformé : sa mesure reste stable pendant l'animation du bouton.
      const ctaBox = cta.parentElement!.getBoundingClientRect();
      if (ctaBox.width === 0) {
        setCtaShift(null);
        return;
      }
      const next = ctaBox.right - (box.left + box.width / 2 + menu.getBoundingClientRect().width / 2);
      // Ignore les écarts sous-pixel mesurés pendant l'animation de hauteur : chaque nouvelle valeur relancerait la transition du menu.
      setCtaShift((prev) => (prev !== null && Math.abs(prev - next) < 0.5 ? prev : next));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(menu);
    observer.observe(cta);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const html = document.documentElement;
    const gap = window.innerWidth - html.clientWidth;
    const previousOverflow = html.style.overflow;
    const previousPadding = html.style.paddingRight;
    html.style.overflow = 'hidden';
    if (gap > 0) {
      html.style.paddingRight = `${gap}px`;
      html.style.setProperty('--menu-lock', `${gap}px`);
    }
    return () => {
      html.style.overflow = previousOverflow;
      html.style.paddingRight = previousPadding;
      html.style.removeProperty('--menu-lock');
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen, setIsMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash, setIsMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      firstLinkRef.current?.focus();
    } else if (menuWasOpen.current) {
      burgerRef.current?.focus();
    }
    menuWasOpen.current = isMenuOpen;
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => {
    if (!isMenuOpen) setSolutionsOpen(solutionsCurrent);
    setIsMenuOpen((open) => !open);
  };

  const mainBefore = [
    { label: 'Accueil', to: '/', current: currentPage === 'home' },
    { label: 'Expertises', to: '/expertises', current: currentPage === 'expertises' },
  ];
  const mainAfter = [
    { label: 'Portfolio', to: '/portfolio', current: currentPage === 'projects' },
    { label: 'À propos', to: '/a-propos', current: currentPage === 'a-propos' },
    { label: 'Contact', to: '/contact', current: currentPage === 'contact' },
  ];
  const mobileItem = (current: boolean) =>
    `flex min-h-12 items-center gap-3 font-display text-[22px] font-semibold ${current ? 'text-white' : 'text-white/75'}`;
  const mobileDot = (current: boolean) => (
    <span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${current ? 'bg-[#E2FD48]' : 'bg-transparent'}`} />
  );

  const headerTheme =
    currentPage === 'expertises' ||
    currentPage === 'solutions' ||
    currentPage === 'solutions-temporaire' ||
    currentPage === 'solution-bardage' ||
    currentPage === 'solution-precadres' ||
    currentPage === 'solution-toles' ||
    currentPage === 'solution-ravalement' ||
    currentPage === 'ressources' ||
    currentPage === 'ressource-1' ||
    currentPage === 'ressource-2' ||
    currentPage === 'ressource-3' ||
    currentPage === 'contact'
      ? 'dark'
      : 'light';

  return (
    <>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-[height] duration-500 ${(isScrolled || openProjectId) ? 'h-20' : 'h-24'}`}>
        <div 
          className={`absolute inset-0 border-b backdrop-blur-md pointer-events-none transition-opacity duration-500 
            ${headerTheme === 'dark' ? 'bg-[#F3F6F7]/90 border-[#0E2A33]/[0.12]' : 'bg-[#071318]/90 border-white/10'} 
            ${(isScrolled || openProjectId) ? 'opacity-100' : 'opacity-0'}`}
        ></div>
        
        <div ref={containerRef} className="relative max-w-7xl mx-auto px-6 h-full flex items-center justify-between [container-type:inline-size]">
          {/* Left: Logo */}
          {!isMenuOpen && (
            <div className="flex-none">
              <Link to="/" className="flex items-center gap-3 group outline-none h-full">
                <img
                  src={headerTheme === 'dark'
                    ? '/logos/PLIALU_sans-tagline_noir.svg'
                    : '/logos/PLIALU_sans-tagline_blanc.svg'}
                  alt="PLIALU"
                  width="339.343"
                  height="121.927"
                  className="h-[37px] w-auto md:h-[44px] transition-all duration-300"
                />
              </Link>
            </div>
          )}

          {/* Center: Navigation Menu */}
          <div
            ref={menuRef}
            style={{
              // Avant la première mesure (HTML pré-généré), 50cqw - 100 % colle le menu au bord droit du contenu.
              transform: hideCta
                ? `translate3d(${ctaShift === null ? 'calc(50cqw - 100%)' : `calc(-50% + ${ctaShift}px)`}, 0, 0)`
                : 'translate3d(-50%, 0, 0)',
            }}
            className={`absolute left-1/2 hidden lg:flex items-center gap-1 p-1.5 rounded-full border will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${hideCta ? 'delay-100' : 'delay-0'}
            \${headerTheme === 'dark' ? 'bg-[#0E2A33]/5 border-black/10' : 'bg-white/5 border-white/5'}`}>
            <Link 
              to="/" 
              className={`whitespace-nowrap text-xs font-semibold px-5 py-2 rounded-full transition-all 
                ${currentPage === 'home' 
                  ? (headerTheme === 'dark' ? 'text-[#0E2A33] bg-[#0E2A33]/10' : 'text-white bg-white/10')
                  : (headerTheme === 'dark' ? 'text-[#0E2A33]/60 hover:text-[#0E2A33] hover:bg-black/5' : 'text-white/50 hover:text-white hover:bg-white/5')
                }`}
            >
              Accueil
            </Link>
            <Link 
              to="/expertises"
              className={`whitespace-nowrap text-xs font-semibold px-5 py-2 rounded-full transition-all
                ${currentPage === 'expertises'
                  ? (headerTheme === 'dark' ? 'text-[#0E2A33] bg-[#0E2A33]/10' : 'text-white bg-white/10')
                  : (headerTheme === 'dark' ? 'text-[#0E2A33]/60 hover:text-[#0E2A33] hover:bg-black/5' : 'text-white/50 hover:text-white hover:bg-white/5')
                }`}
            >
              Expertises
            </Link>
            <div className="group relative">
              <Link
                to="/solutions"
                aria-haspopup="true"
                className={`inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold px-5 py-2 rounded-full transition-all
                  ${
                    ['solutions-temporaire', 'etancheite', 'goutte-eau-extrudee'].includes(currentPage)
                      ? headerTheme === 'dark'
                        ? 'text-[#0E2A33] bg-[#0E2A33]/10'
                        : 'text-white bg-white/10'
                      : headerTheme === 'dark'
                        ? 'text-[#0E2A33]/60 hover:text-[#0E2A33] hover:bg-black/5'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
              >
                Solutions
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-200 group-hover:rotate-180">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Link>

              <div
                className={`invisible absolute left-1/2 top-[calc(100%+14px)] z-50 flex min-w-[240px] -translate-x-1/2 translate-y-1.5 flex-col gap-0.5 rounded-[20px] border p-1.5 opacity-0 transition-all duration-200 before:absolute before:inset-x-0 before:-top-4 before:h-4 before:content-[''] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-has-[:focus-visible]:visible group-has-[:focus-visible]:translate-y-0 group-has-[:focus-visible]:opacity-100 ${
                  headerTheme === 'dark'
                    ? 'border-[#0E2A33]/10 bg-[#F3F4F5]'
                    : 'border-white/[0.12] bg-[#071318]/[0.92] shadow-[0_12px_32px_rgba(0,0,0,0.3)] backdrop-blur'
                }`}
              >
                {(() => {
                  const item = `flex items-center justify-between gap-4 whitespace-nowrap rounded-full px-4 py-[9px] text-xs font-semibold transition-colors duration-150 ${
                    headerTheme === 'dark'
                      ? 'text-[#0E2A33]/60 hover:bg-[#0E2A33]/[0.07] hover:text-[#0E2A33]'
                      : 'text-white/70 hover:bg-white/[0.06] hover:text-white'
                  }`;
                  const pdf = `rounded-full border px-[7px] py-0.5 text-[10px] font-semibold tracking-[0.05em] ${
                    headerTheme === 'dark' ? 'border-[#0E2A33]/15 text-[#0E2A33]/50' : 'border-white/20 text-white/50'
                  }`;
                  const close = () => (document.activeElement as HTMLElement | null)?.blur();
                  return (
                    <>
                      <Link
                        to="/goutte-eau-extrudee"
                        onClick={() => { close(); }}
                        className={`${item} text-left`}
                      >
                        Goutte d'eau extrudée
                      </Link>
                      <div className={`mx-3 my-1 h-px ${headerTheme === 'dark' ? 'bg-[#0E2A33]/10' : 'bg-white/10'}`} />
                      {SOLUTIONS_DOCS.map(({ label, id }) => (
                        <Link
                          key={id}
                          to={`/solutions#${id}`}
                          onClick={() => { close(); }}
                          className={`${item} text-left`}
                        >
                          {label}
                          <span className={pdf}>PDF</span>
                        </Link>
                      ))}
                    </>
                  );
                })()}
              </div>
            </div>
            <Link 
              to="/portfolio" 
              className={`whitespace-nowrap text-xs font-semibold px-5 py-2 rounded-full transition-all 
                ${currentPage === 'projects' 
                  ? (headerTheme === 'dark' ? 'text-[#0E2A33] bg-[#0E2A33]/10' : 'text-white bg-white/10')
                  : (headerTheme === 'dark' ? 'text-[#0E2A33]/60 hover:text-[#0E2A33] hover:bg-black/5' : 'text-white/50 hover:text-white hover:bg-white/5')
                }`}
            >
              Portfolio
            </Link>
            <Link 
              to="/a-propos" 
              className={`whitespace-nowrap text-xs font-semibold px-5 py-2 rounded-full transition-all
                ${currentPage === 'a-propos'
                  ? (headerTheme === 'dark' ? 'text-[#0E2A33] bg-black/10' : 'text-white bg-white/10')
                  : (headerTheme === 'dark' ? 'text-[#0E2A33]/60 hover:text-[#0E2A33] hover:bg-black/5' : 'text-white/50 hover:text-white hover:bg-white/5')
                }`}
            >
              À propos
            </Link>
            <Link 
              to="/contact" 
              className={`whitespace-nowrap text-xs font-semibold px-5 py-2 rounded-full transition-all
                ${currentPage === 'contact' 
                  ? (headerTheme === 'dark' ? 'text-[#0E2A33] bg-[#0E2A33]/10' : 'text-white bg-white/10')
                  : (headerTheme === 'dark' ? 'text-[#0E2A33]/60 hover:text-[#0E2A33] hover:bg-black/5' : 'text-white/50 hover:text-white hover:bg-white/5')
                }`}
            >
              Contact
            </Link>
          </div>

          {/* Right: CTA Button */}
          <div className="flex-none flex items-center gap-4">
            <div
              ref={ctaRef}
              aria-hidden={hideCta || undefined}
              inert={hideCta}
              className={`max-lg:hidden transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${hideCta ? 'opacity-0 translate-x-2 scale-[0.97] pointer-events-none delay-0' : 'opacity-100 translate-x-0 scale-100 delay-150'}`}
            >
              <button onClick={goContactForm} tabIndex={hideCta ? -1 : undefined} className={`${DS.BTN_PRIMARY} lg:px-5 xl:px-10`}>
                Demander un devis
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        id="mobile-menu"
        inert={isMenuOpen ? undefined : true}
        className={`fixed inset-0 z-[70] lg:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Fermer le menu"
          onClick={closeMenu}
          className="absolute inset-0 hidden bg-black/50 backdrop-blur-sm sm:block"
        />
        <div
          className={`absolute top-0 right-0 flex h-full w-full flex-col bg-[#071318] transition-transform duration-300 ease-out sm:max-w-sm sm:border-l sm:border-white/10 sm:shadow-2xl ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className={`flex shrink-0 items-center px-6 ${(isScrolled || openProjectId) ? 'h-20' : 'h-24'}`}>
            <Link to="/" onClick={closeMenu} className="flex items-center gap-3 outline-none">
              <img
                src="/logos/PLIALU_sans-tagline_blanc.svg"
                alt="PLIALU"
                width="339.343"
                height="121.927"
                className="h-[37px] w-auto md:h-[44px] transition-all duration-300"
              />
            </Link>
          </div>
          <nav aria-label="Menu" className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-6">
            {mainBefore.map((item) => (
              <Link
                key={item.to}
                ref={item.to === '/' ? firstLinkRef : undefined}
                to={item.to}
                onClick={closeMenu}
                aria-current={item.current ? 'page' : undefined}
                className={`border-b border-white/10 ${mobileItem(item.current)}`}
              >
                {mobileDot(item.current)}
                {item.label}
              </Link>
            ))}
            <div className="border-b border-white/10">
              <div className="flex items-center">
                <Link
                  to="/solutions"
                  onClick={closeMenu}
                  aria-current={solutionsCurrent ? 'page' : undefined}
                  className={`min-w-0 flex-1 ${mobileItem(solutionsCurrent)}`}
                >
                  {mobileDot(solutionsCurrent)}
                  Solutions
                </Link>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-white/80"
                  aria-label="Afficher les sous-pages de Solutions"
                  aria-expanded={solutionsOpen}
                  aria-controls="solutions-submenu"
                  onClick={() => setSolutionsOpen((open) => !open)}
                >
                  <ChevronDown aria-hidden="true" size={22} strokeWidth={1.5} className={`transition-transform duration-[250ms] motion-reduce:transition-none ${solutionsOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <div
                id="solutions-submenu"
                inert={solutionsOpen ? undefined : true}
                className={`grid transition-[grid-template-rows] duration-[250ms] ease-out motion-reduce:transition-none ${solutionsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <div className="ml-[18px] flex flex-col border-l border-white/10 pb-3 pl-4">
                    <Link
                      to="/goutte-eau-extrudee"
                      onClick={closeMenu}
                      className="flex min-h-11 items-center justify-between gap-3 py-2 text-[15px] text-white"
                    >
                      Goutte d'eau extrudée
                      <span className={PRODUCT_BADGE_ON_DARK}>Fiche produit</span>
                    </Link>
                    <p className="px-0 pb-1 pt-3 text-[10px] uppercase tracking-widest text-white/40">Documents PDF</p>
                    {SOLUTIONS_DOCS.map((doc) => (
                      <Link
                        key={doc.id}
                        to={`/solutions#${doc.id}`}
                        onClick={closeMenu}
                        className="flex min-h-11 items-center justify-between gap-3 py-2 text-[15px] text-white/80"
                      >
                        {doc.label}
                        <span className={PDF_BADGE_ON_DARK}>PDF</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {mainAfter.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                aria-current={item.current ? 'page' : undefined}
                className={`border-b border-white/10 ${mobileItem(item.current)}`}
              >
                {mobileDot(item.current)}
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="shrink-0 px-6 pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
            <button type="button" onClick={() => { goContactForm(); closeMenu(); }} className={`${DS.BTN_PRIMARY} w-full justify-center`}>
              Demander un devis
            </button>
            <a href="tel:+33478089370" onClick={closeMenu} className="mt-3 block py-2 text-center text-sm text-white/60">
              04 78 08 93 70
            </a>
          </div>
        </div>
      </div>
      <button
        ref={burgerRef}
        type="button"
        aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        onClick={toggleMenu}
        style={{ right: 'calc(1rem + var(--menu-lock, 0px))' }}
        className={`fixed top-4 z-[80] lg:hidden p-2 rounded-xl border-0 outline-none focus:outline-none focus:ring-0 transition-all
          ${isMenuOpen ? 'text-white bg-white/10' : headerTheme === 'dark' ? 'text-[#0E2A33] bg-black/5' : 'text-white bg-white/5'}`}
      >
        {isMenuOpen ? <X aria-hidden="true" size={24} strokeWidth={1.5} /> : <Menu aria-hidden="true" size={24} strokeWidth={1.5} />}
      </button>
    </>
  );
}
