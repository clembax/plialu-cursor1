import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Menu } from 'lucide-react';
import * as DS from '../components/ds/ds';
import type { PageKey } from '../seo/seoConfig';

export function Header(props: {
  currentPage: PageKey;
  goContactForm: () => void;
  openProjectId: string | null;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { currentPage, goContactForm, openProjectId, isMenuOpen, setIsMenuOpen } = props;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${(isScrolled || openProjectId) ? 'h-20' : 'h-24'}`}>
        <div 
          className={`absolute inset-0 border-b backdrop-blur-md pointer-events-none transition-opacity duration-500 
            ${headerTheme === 'dark' ? 'bg-[#F3F6F7]/90 border-[#0E2A33]/[0.12]' : 'bg-[#071318]/90 border-white/10'} 
            ${(isScrolled || openProjectId) ? 'opacity-100' : 'opacity-0'}`}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Left: Logo */}
          {!isMenuOpen && (
            <div className="flex-none">
              <Link to="/" className="flex items-center gap-3 group outline-none h-full">
                <img 
                  src={headerTheme === 'dark' 
                    ? "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771582466/Logo_Noir_Plialu_ywbl2o.svg" 
                    : "https://res.cloudinary.com/dyiup6v5x/image/upload/v1771582757/Logo_Blanc_Plialu_ssatk6.svg"
                  } 
                  alt="PLIALU" 
                  className="h-6 md:h-7 transition-all duration-300 scale-[1.5] origin-left"
                />
              </Link>
            </div>
          )}

          {/* Center: Navigation Menu */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-1 p-1.5 rounded-full border transition-all duration-300
            ${headerTheme === 'dark' ? 'bg-[#0E2A33]/5 border-black/10' : 'bg-white/5 border-white/5'}">
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
                      {[
                        ['Portfolio', 'res-book'],
                        ['Catalogue RAL', 'res-ral'],
                        ['Fiches techniques', 'res-fiches'],
                        ['Déroulage', 'res-deroulage'],
                      ].map(([label, anchor]) => (
                        <Link
                          key={anchor}
                          to={`/solutions#${anchor}`}
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
            <button onClick={goContactForm} className={`${DS.BTN_PRIMARY} max-lg:hidden lg:px-5 xl:px-10`}>
              Demander un devis
            </button>
            <button
              type="button"
              aria-label="Ouvrir le menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`fixed top-4 right-4 z-50 lg:hidden p-2 rounded-xl border-0 outline-none focus:outline-none focus:ring-0 transition-all
                ${headerTheme === 'dark' ? 'text-[#0E2A33] bg-black/5' : 'text-white bg-white/5'}`}
            >
              <Menu aria-hidden="true" size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile (panneau coulissant) */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
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
          </div>
          <nav className="flex flex-col p-6 gap-1 overflow-y-auto">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-left py-3 px-4 rounded-xl text-white font-medium hover:bg-white/10 transition-colors">Accueil</Link>
            <Link to="/expertises" onClick={() => setIsMenuOpen(false)} className="text-left py-3 px-4 rounded-xl text-white font-medium hover:bg-white/10 transition-colors">Expertises</Link>
            <Link to="/solutions" onClick={() => setIsMenuOpen(false)} className="text-left py-3 px-4 rounded-xl text-white font-medium hover:bg-white/10 transition-colors">Solutions</Link>
            <Link
              to="/goutte-eau-extrudee"
              onClick={() => setIsMenuOpen(false)}
              className="text-left py-2.5 pl-8 pr-4 rounded-xl text-sm text-white/70 font-medium hover:bg-white/10 hover:text-white transition-colors"
            >
              Goutte d'eau extrudée
            </Link>
            <Link to="/portfolio" onClick={() => setIsMenuOpen(false)} className="text-left py-3 px-4 rounded-xl text-white font-medium hover:bg-white/10 transition-colors">Portfolio</Link>
            <Link to="/a-propos" onClick={() => setIsMenuOpen(false)} className="text-left py-3 px-4 rounded-xl text-white font-medium hover:bg-white/10 transition-colors">À propos</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-left py-3 px-4 rounded-xl text-white font-medium hover:bg-white/10 transition-colors">Contact</Link>
            <button onClick={() => { goContactForm(); setIsMenuOpen(false); }} className={`${DS.BTN_PRIMARY} mt-4 w-full justify-center`}>Demander un devis</button>
          </nav>
        </div>
      </div>
    </>
  );
}
