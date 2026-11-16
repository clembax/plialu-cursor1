import React from 'react';
import { ArrowDown } from 'lucide-react';
import * as DS from '../components/ds/ds';
import ScrollCue from '../components/ScrollCue';
import PortfolioGrid from '../../PortfolioGrid';
import { PROJECTS } from '../../projects';
import type { Project } from '../../projects';

export function PortfolioPage(props: {
  goContactForm: () => void;
  openProject: (id: string) => void;
  portfolioYearMin: number;
  portfolioYearMax: number;
  portfolioOrder: Project[];
}) {
  const { goContactForm, openProject, portfolioYearMin, portfolioYearMax, portfolioOrder } = props;
  return (
        <div className="animate-fade-up">
          {/* Hero Réalisations */}
          <section className={`relative bg-[#071318] ${DS.HERO_TOP} pb-12 md:pb-16 min-h-[100svh]`}>
            <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#0e2a33]/40 to-[#071318]"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-4xl">
                <div className="mb-16">
                <span className={`block mb-4 ${DS.EYEBROW_DARK}`}>
                  PORTFOLIO
                </span>
                <h1 className={`${DS.H1} text-white`}>
                  Nos réalisations de façades en aluminium
                </h1>
                <p className={`${DS.LEAD_DARK} mt-6`}>
                  Une sélection de façades en aluminium réalisées aux côtés de maîtres d'œuvre, maîtres d'ouvrage, cabinets d'architecture, professionnels de l'enveloppe et bureaux d'études.
                </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <a
                    href="/documents/Portfolio_Plialu.pdf"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className={DS.BTN_PRIMARY}
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                      Télécharger le Portfolio
                    </span>
                  </a>
                  <a
                    href="#projets-grille"
                    onClick={(e) => { e.preventDefault(); document.getElementById('projets-grille')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className={DS.BTN_PRIMARY}
                  >
                    Voir nos collaborations
                    <ArrowDown aria-hidden="true" size={18} />
                  </a>
                </div>
              </div>
            </div>
            <ScrollCue tone="dark" />
          </section>

          {/* Grille des Projets */}
          <section id="projets-grille" className="scroll-mt-24 bg-[#071318] py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className={`${DS.H2} text-white`}>Façades en aluminium de référence, de Lyon à Grenoble</h2>
              <p className="mb-8 mt-6 text-[10px] font-extrabold uppercase tracking-[0.4em] text-white/50">
                {PROJECTS.length} réalisations · {portfolioYearMin} à {portfolioYearMax}
              </p>
              <PortfolioGrid projects={portfolioOrder} onOpen={openProject} />
            </div>
          </section>

          {/* CTA Final */}
          <section className="py-16 md:py-24 bg-[#071318] text-center border-t border-white/5">
            <div className="max-w-3xl mx-auto px-6">
              <div className="mb-16">
              <h2 className={`${DS.H2} text-white`}>Votre façade sera notre prochaine référence</h2>
              <p className={`${DS.LEAD_DARK} mt-6 mx-auto`}>Cassettes, précadres, habillages&nbsp;: PLIALU fabrique les pièces de votre chantier, des plans à la livraison.</p>
              </div>
              <button onClick={goContactForm} className={DS.BTN_PRIMARY}>
                Soumettre mon projet
              </button>
            </div>
          </section>

        </div>
  );
}
