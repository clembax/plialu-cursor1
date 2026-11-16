import React from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import * as DS from '../components/ds/ds';
import ScrollCue from '../components/ScrollCue';
import AproposGains from '../components/AproposGains';
import FranceDotMap from '../../FranceDotMap';
import { ZoneSwatch } from '../components/ZoneSwatch';
import { SHOW_ZONE_KEY, ZONE_HIGHLIGHT, ZONE_ROWS } from '../data/zones';
import type { ZoneId } from '../data/zones';

export function AProposPage(props: {
  goContactForm: () => void;
  zone: ZoneId | null;
  setZone: React.Dispatch<React.SetStateAction<ZoneId | null>>;
  zonePin: React.RefObject<ZoneId | null>;
}) {
  const { goContactForm, zone, setZone, zonePin } = props;
  return (
        <div className="animate-fade-up">
          {/* 1. HERO SECTION (DARK) */}
          <section className={`relative bg-[#071318] ${DS.HERO_TOP} pb-20 overflow-hidden min-h-[100svh] flex flex-col`}>
            <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#0e2a33]/40 to-[#071318]"></div>
            <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-6xl">
                <div className="mb-16">
                <span className={`block mb-4 ${DS.EYEBROW_DARK}`}>
                  NOTRE IDENTITÉ INDUSTRIELLE
                </span>
                <h1 className={`${DS.H1} text-white`}>
                  PLIALU, Entreprise de<br />
                  façonnage métal <span className="whitespace-nowrap">près de Lyon</span>
                </h1>
                <p className={`${DS.LEAD_DARK} mt-6`}>
                  Implantée près de Lyon, notre usine de façonnage métallique accompagne les professionnels de l'enveloppe du bâtiment en Rhône-Alpes, de la transformation industrielle à la fabrication sur mesure de pièces métalliques.
                </p>
                </div>
                <button type="button" onClick={goContactForm} className={DS.BTN_PRIMARY}>
                  Demander un devis
                </button>
              </div>
            </div>
            <ScrollCue tone="dark" />
          </section>

          {/* 2. POSITIONNEMENT (LIGHT) - MACHINED PERFECTION V2 (FIXED BACKGROUND) */}
          <section id="a-propos-contenu" className="bg-white py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[72px] items-center">
                <div>
                  <p className={`${DS.EYEBROW_LIGHT} mb-4`}>Notre ADN</p>
                  <h2 className={`${DS.H2} text-[#0E2A33]`}>Votre partenaire en façonnage métallique, de l'esquisse au chantier livré</h2>
                  <p className={`${DS.LEAD_LIGHT} mt-6`}>PLIALU, c'est 20 ans de fabrication métallique intégrée en Rhône-Alpes. Pièces standard et sur-mesure, avec une capacité industrielle complète qui s'adapte aux contraintes de chaque projet.</p>
                  <p className={`${DS.LEAD_LIGHT} mt-5`}>Nos équipes interviennent à chaque étape : lecture de plans, conseil matière, optimisation des tolérances, respect des délais.</p>
                  <button onClick={goContactForm} className={`${DS.BTN_PRIMARY} mt-10`}>
                    Échanger sur votre projet
                    <ArrowRight aria-hidden="true" size={16} />
                  </button>
                </div>
                <img src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1771522416/APROPOS-1200px_wkguv2.webp" className="w-full aspect-[4/3] object-cover rounded-[20px]" alt="Atelier de production Plialu à Lyon" loading="lazy" />
              </div>
            </div>
          </section>

          <AproposGains />

          <section
            id="infinimetal"
            className="bg-white py-24 md:py-32 border-t border-[#0E2A33]/[0.12] scroll-mt-24"
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="relative flex items-center justify-between">
                <div className="md:pr-72">
                  <p className={`mb-4 ${DS.EYEBROW_LIGHT}`}>
                    THERMOLAQUAGE
                  </p>
                  <h2 className={`${DS.H2} text-[#0E2A33]`}>
                    Nos lignes de thermolaquage
                  </h2>
                </div>
                <img
                  src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1780588809/infini_noir_f4v6lv.png"
                  alt="Logo Infinimetal"
                  className="pointer-events-none absolute right-0 top-1/2 w-32 h-32 -translate-y-1/2 object-contain md:w-64 md:h-64"
                />
              </div>
              <div className="md:pr-72">
              <p className={`${DS.LEAD_LIGHT} mt-6`}>
                Infinimetal est notre marque déposée spécialisée en thermolaquage certifié Qualicoat. Infinimetal dispose de deux lignes de thermolaquage complémentaires : une ligne à plat pour le laquage de tôles, et une ligne verticale dédiée au laquage post-formage à la main.
              </p>
              <p className="mt-5 max-w-2xl text-base leading-[1.65] text-[#0E2A33]/75 md:text-lg">
                Cette polyvalence de thermolaquage nous permet de répondre à tous les besoins de laquage des façadiers et professionnels du bâtiment, que les pièces soient brutes ou déjà façonnées. Chez Infinimetal, Qualicoat est aujourd'hui le référentiel européen du thermolaquage pour les façades haut de gamme, appliqué sur nos deux lignes avec traçabilité de process.
              </p>
              </div>
              <Link
                to="/solutions"
                className={`${DS.BTN_PRIMARY} mt-10`}
              >
                Découvrir le Catalogue RAL
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12H19M19 12L13 6M19 12L13 18"/></svg>
              </Link>
            </div>
          </section>

          <section className="relative selection-brand py-24 md:py-32" style={{ background: 'linear-gradient(to bottom, #0b1e26 0%, #071318 100%)' }}>
            <div className="mx-auto max-w-7xl px-6">
              <div className="h-px bg-white/10" />
              <p className="sr-only">PLIALU, atelier de façonnage métallique implanté en Rhône-Alpes, intervient sur toute la France, Corse comprise, ainsi qu'en Belgique et en Suisse.</p>
              <div className="grid items-start gap-10 pb-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
                <h2 className={`${DS.H2} text-white [text-wrap:balance] lg:col-start-1 lg:row-start-1`}>
                  <span className="block">Un atelier à Lyon.</span>
                  <span className="block">Des chantiers partout en France.</span>
                </h2>
                <FranceDotMap className="mx-auto w-full max-w-[640px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:-mr-[2.8%]" highlight={ZONE_HIGHLIGHT ? zone : null} />
                {SHOW_ZONE_KEY && (
                  <ul className="divide-y divide-white/10 border-y border-white/10 lg:col-start-1 lg:row-start-2 lg:self-end">
                    {ZONE_ROWS.map((row) => (
                      <li key={row.kind} className={ZONE_HIGHLIGHT ? undefined : 'flex items-center gap-4 py-4'}>
                        {ZONE_HIGHLIGHT ? (
                          <button
                            type="button"
                            className="flex w-full items-center gap-4 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E2FD48]"
                            onMouseEnter={() => setZone(row.kind)}
                            onMouseLeave={() => setZone(zonePin.current)}
                            onFocus={() => setZone(row.kind)}
                            onBlur={() => setZone(zonePin.current)}
                            onClick={() => {
                              zonePin.current = zonePin.current === row.kind ? null : row.kind;
                              setZone(zonePin.current);
                            }}
                          >
                            <ZoneSwatch kind={row.kind} />
                            <div>
                              <div className="text-base font-semibold text-white">{row.name}</div>
                              <div className="text-sm text-white/50">{row.detail}</div>
                            </div>
                          </button>
                        ) : (
                          <>
                            <ZoneSwatch kind={row.kind} />
                            <div>
                              <div className="text-base font-semibold text-white">{row.name}</div>
                              <div className="text-sm text-white/50">{row.detail}</div>
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
          <section className="py-16 md:py-24 bg-[#071318] text-center">
            <div className="max-w-3xl mx-auto px-6">
              <div className="mb-16">
              <h2 className={`${DS.H2} text-white`}>20 ans de façonnage métallique en <span className="whitespace-nowrap">Rhône-Alpes.</span></h2>
              <p className={`${DS.LEAD_DARK} mt-6 mx-auto`}>Vos équipes techniques répondent sous 48 h.</p>
              </div>
              <button onClick={goContactForm} className={DS.BTN_PRIMARY}>
                Soumettre un projet
              </button>
            </div>
          </section>
        </div>
  );
}
