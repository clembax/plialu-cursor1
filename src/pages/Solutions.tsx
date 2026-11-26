import React from 'react';
import { Link } from 'react-router';
import { ArrowDown } from 'lucide-react';
import * as DS from '../components/ds/ds';
import ScrollCue from '../components/ScrollCue';
import { RAL_APERCU } from '../data/ral';

const infinimetalLinkClass = 'cursor-pointer text-[#E2FD48] hover:underline transition-colors';

export function SolutionsPage(props: {
  goContactForm: () => void;
  goDevis: (domaine: string) => void;
}) {
  const { goContactForm, goDevis } = props;
  return (
        <div className="animate-fade-up">
          {/* Hero section */}
          <section className={`relative bg-white ${DS.HERO_TOP} pb-20 min-h-[100svh] flex flex-col`}>
            <div className="relative z-30 w-full max-w-7xl mx-auto px-6">
              <div className="max-w-5xl">
                <span className={`inline-block mb-4 ${DS.EYEBROW_LIGHT}`}>
                  CATALOGUE B2B
                </span>
                <h1 className={`${DS.H1} text-[#0E2A33]`}>
                  Profilés et accessoires aluminium pour façade
                </h1>
                <p className={`${DS.LEAD_LIGHT} mt-6`}>
                  PLIALU fabrique sur mesure les profilés et accessoires aluminium pour façade&nbsp;: habillages, pliages et pièces techniques de l'enveloppe du bâtiment. De l'isolation thermique par l'extérieur au ravalement, en passant par les bardages, précadres et tôles prélaquées, tout est plié et laqué dans notre usine près de Lyon.
                </p>
                <div className="flex flex-wrap gap-4 mt-10">
                  <button type="button" onClick={goContactForm} className={DS.BTN_PRIMARY}>
                    Demander un devis
                  </button>
                  <button
                    type="button"
                    onClick={() => document.getElementById('ressources')?.scrollIntoView({ behavior: 'smooth' })}
                    className={DS.BTN_SECONDARY_LIGHT}
                  >
                    Télécharger nos ressources
                    <ArrowDown aria-hidden="true" size={16} />
                  </button>
                </div>
              </div>
            </div>
            <ScrollCue tone="light" />
          </section>

          {/* Domaines section */}
          <section className="section--dark bg-gradient-to-b from-[#071318] to-[#0b1e26] py-24 md:py-32">
            <div className="relative z-30 w-full max-w-7xl mx-auto px-6">
              <div className="space-y-16">
                {/* En-tête section */}
                <div>
                  <p className={`${DS.EYEBROW_DARK} mb-4`}>Gammes</p>
                  <h2 className={`${DS.H2} text-white`}>
                    Six domaines d'application, de l'ITE aux murs-rideaux
                  </h2>
                  <p className={`${DS.LEAD_DARK} mt-6`}>Pliés et laqués par PLIALU dans son usine près de Lyon.</p>
                </div>

                {/* Grille 6 domaines (textes de la plaquette) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(() => {
                    const CLD = 'https://res.cloudinary.com/dyiup6v5x/image/upload';
                    const ic = 'h-6 w-6 shrink-0 text-[#E2FD48]';
                    const domaines = [
                      {
                        n: '01',
                        anchor: 'enduit-mince',
                        title: 'Enduit mince sur isolant',
                        text: "Profilés ITE sur mesure, y compris hors standard, pour les points singuliers de l'isolation par l'extérieur\u00A0: départs, arrêts latéraux, couronnements, cornières entoilées, joints de dilatation PVC entoilés, et tous les pliages associés en aluminium laqué.",
                        img: 'v1794308485/Solutions_enduit_mince_ITE_nhj3ul.webp',
                        alt: 'Enduit mince sur isolant\u00A0: façade ITE avec tableaux et bavettes de fenêtres en aluminium laqué',
                        icon: (
                          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={ic}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                          </svg>
                        ),
                      },
                      {
                        n: '02',
                        anchor: 'bardage',
                        title: 'Bardage, cassettes & clins',
                        text: "Cassettes de façade et clins sur mesure, en aluminium ou en acier, laqués dans nos ateliers. Habillage des fenêtres\u00A0: bavettes, tableaux, linteaux et épingles d'embrasure. Ossatures galvanisées pour le bardage et grilles anti-rongeurs.",
                        img: 'v1794305547/Image_site_bardage_eam6np.webp',
                        alt: 'Bardage en cassettes de façade aluminium\u00A0: joint en croix et fixations',
                        icon: (
                          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256" className={ic}>
                            <path d="M240,208h-8V72a8,8,0,0,0-8-8H184V40a8,8,0,0,0-8-8H80a8,8,0,0,0-8,8V96H32a8,8,0,0,0-8,8V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM40,112H80a8,8,0,0,0,8-8V48h80V72a8,8,0,0,0,8,8h40V208H152V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40H40Zm96,96H120V176h16ZM112,72a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H120A8,8,0,0,1,112,72Zm0,32a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H120A8,8,0,0,1,112,104Zm56,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H176A8,8,0,0,1,168,104ZM88,136a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H80A8,8,0,0,1,88,136Zm0,32a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H80A8,8,0,0,1,88,168Zm24-32a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H120A8,8,0,0,1,112,136Zm56,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H176A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H176A8,8,0,0,1,168,168Z" />
                          </svg>
                        ),
                      },
                      {
                        n: '03',
                        anchor: 'ravalement',
                        title: 'Ravalement de façade',
                        text: "Bavettes droites ou rayonnées, avec relevés droits ou rayonnés. Gouttes d'eau extrudées, couvre-joints extrudés ou pliés, habillages de nez de dalle.",
                        img: 'v1794235010/9cd7d856-180e-4fc2-bf46-7c3f938dfa8f_dj4zga.webp',
                        alt: "Ravalement de façade\u00A0: nez de dalle équipé d'une goutte d'eau extrudée en aluminium",
                        product: true,
                        icon: (
                          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256" className={ic}>
                            <path d="M226.76,69a8,8,0,0,0-12.84-2.88l-40.3,37.19-17.23-3.7-3.7-17.23,37.19-40.3A8,8,0,0,0,187,29.24,72,72,0,0,0,88,96,72.34,72.34,0,0,0,94,124.94L33.79,177c-.15.12-.29.26-.43.39a32,32,0,0,0,45.26,45.26c.13-.13.27-.28.39-.42L131.06,162A72,72,0,0,0,232,96,71.56,71.56,0,0,0,226.76,69ZM160,152a56.14,56.14,0,0,1-27.07-7,8,8,0,0,0-9.92,1.77L67.11,211.51a16,16,0,0,1-22.62-22.62L109.18,133a8,8,0,0,0,1.77-9.93,56,56,0,0,1,58.36-82.31l-31.2,33.81a8,8,0,0,0-1.94,7.1L141.83,108a8,8,0,0,0,6.14,6.14l26.35,5.66a8,8,0,0,0,7.1-1.94l33.81-31.2A56.06,56.06,0,0,1,160,152Z" />
                          </svg>
                        ),
                      },
                      {
                        n: '04',
                        anchor: 'precadres',
                        title: 'Précadres, portes ou fenêtres',
                        text: 'Précadres de fenêtres et de portes sur mesure, en aluminium ou en acier\u00A0: étanches, monoblocs, soudés puis laqués. Livrés prêts à poser sur chantier.',
                        img: 'v1794305764/20201001_141101_resized_bddixg.webp',
                        alt: "Précadre aluminium monobloc soudé dans l'atelier PLIALU, vue de dessus",
                        icon: (
                          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256" className={ic}>
                            <path d="M200,80v32a8,8,0,0,1-16,0V88H160a8,8,0,0,1,0-16h32A8,8,0,0,1,200,80ZM96,168H72V144a8,8,0,0,0-16,0v32a8,8,0,0,0,8,8H96a8,8,0,0,0,0-16ZM232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM216,200V56H40V200H216Z" />
                          </svg>
                        ),
                      },
                      {
                        n: '05',
                        anchor: 'etancheite',
                        title: 'Étanchéité',
                        text: "Couvertines d'acrotère sur mesure, laquées dans la teinte RAL de votre choix, avec angles, éclisses et pattes drainantes. Bandes de rive pour toitures-terrasses.",
                        img: 'v1794308485/Solutions_etancheite_couvertine_nofleh.webp',
                        alt: 'Étanchéité de toiture-terrasse\u00A0: couvertine aluminium posée sur acrotère avec son support',
                        icon: (
                          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256" className={ic}>
                            <path d="M53.92,34.62A8,8,0,1,0,42.08,45.38L64.72,70.29C48.32,95,40,119.78,40,144a88,88,0,0,0,149.21,63.22l12.87,14.16a8,8,0,1,0,11.84-10.76ZM128,216a72.08,72.08,0,0,1-72-72c0-19.93,6.68-40.57,19.86-61.46L178.43,195.36A71.84,71.84,0,0,1,128,216ZM90,50.51a8,8,0,0,1-.27-11.31A247.8,247.8,0,0,1,123.41,9.45a8,8,0,0,1,9.18,0C136,11.83,216,68.7,216,144a88.08,88.08,0,0,1-3.15,23.4,8,8,0,0,1-7.71,5.88A7.79,7.79,0,0,1,203,173a8,8,0,0,1-5.59-9.83A72.55,72.55,0,0,0,200,144c0-57.24-55.48-105-72-118a252.23,252.23,0,0,0-26.66,24.23A8,8,0,0,1,90,50.51Z" />
                          </svg>
                        ),
                      },
                      {
                        n: '06',
                        anchor: 'mob-fob',
                        title: 'MOB, FOB & murs-rideaux',
                        text: 'Murs et façades à ossature bois, murs-rideaux\u00A0: pièces techniques et spécifiques regroupant les cinq domaines précédents.',
                        img: 'v1772021847/Welink-1200px_mu1jnb.webp',
                        alt: 'Murs-rideaux et façade métallique du bâtiment WeLink à Lyon 7',
                        icon: (
                          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256" className={ic}>
                            <path d="M212,136a12,12,0,1,1-12-12A12,12,0,0,1,212,136Zm36,0c0,40.37-21.08,72-48,72H56c-26.92,0-48-31.63-48-72S29.08,64,56,64H92.69l37.65-37.66A8,8,0,0,1,136,24h32a8,8,0,0,1,0,16H139.31l-24,24H200C226.92,64,248,95.63,248,136ZM56,192H169.51a73.46,73.46,0,0,1-12.67-24H80a8,8,0,0,1,0-16h73.16A110.63,110.63,0,0,1,152,136c0-22.86,6.76-42.9,17.51-56H56c-12.47,0-23.55,13.26-28.8,32H104a8,8,0,0,1,0,16H24.35q-.34,3.93-.35,8C24,166.36,38.65,192,56,192Zm176-56c0-30.36-14.65-56-32-56s-32,25.64-32,56,14.65,56,32,56S232,166.36,232,136Z" />
                          </svg>
                        ),
                      },
                    ];
                    return domaines.map((d) => (
                      <article key={d.n} id={d.anchor} className={`${DS.CARD_DARK} group flex flex-col scroll-mt-32 transition-colors duration-300 hover:border-[#E2FD48]/50`}>
                        <div className="relative h-[180px] overflow-hidden border-b border-white/10">
                          <img
                            src={`${CLD}/f_auto,q_auto,c_limit,w_800/${d.img}`}
                            srcSet={`${CLD}/f_auto,q_auto,c_limit,w_600/${d.img} 600w, ${CLD}/f_auto,q_auto,c_limit,w_800/${d.img} 800w, ${CLD}/f_auto,q_auto,c_limit,w_1200/${d.img} 1200w`}
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                            alt={d.alt}
                            loading="lazy"
                            className={`absolute inset-0 h-full w-full object-cover ${DS.CARD_IMG_ZOOM}`}
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-7">
                          <span className="mb-3.5 block font-display text-xs font-bold tracking-[0.1em] text-white/40">{d.n}</span>
                          <div className="mb-4 flex items-center gap-2">
                            {d.icon}
                            <h3 className={`${DS.H3} text-white`}>{d.title}</h3>
                          </div>
                          <p className="mb-5 text-sm leading-relaxed text-white/60">{d.text}</p>
                          <div className="mt-auto flex flex-col gap-5 border-t border-white/10 pt-5">
                            {d.product && (
                              <Link
                                to="/goutte-eau-extrudee"
                                className="group/link flex w-full items-center gap-2.5 text-left"
                              >
                                <span className="whitespace-nowrap rounded-full border border-[#E2FD48]/35 px-2.5 py-1 text-[11px] font-bold text-[#E2FD48]">
                                  Fiche produit
                                </span>
                                <span className="flex-1 text-sm font-semibold text-white">Goutte d'eau extrudée</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[#E2FD48] transition-transform duration-150 group-hover/link:translate-x-2">
                                  <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                              </Link>
                            )}
                            <button type="button" onClick={() => goDevis(d.title)} className="group/devis inline-flex items-center gap-3 self-start font-sans text-xs font-semibold uppercase tracking-widest text-[#E2FD48] transition-colors duration-150 hover:text-white">
                              Demander un devis
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-150 group-hover/devis:translate-x-2">
                                <path d="M5 12h14M13 6l6 6-6 6" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </article>
                    ));
                  })()}
                </div>

                {/* Tôles prélaquées — fullwidth */}
                <div
                  id="toles-prelaquees"
                  className="grid scroll-mt-32 grid-cols-1 items-center gap-7 rounded-[20px] border border-white/10 bg-[linear-gradient(135deg,#0E2A33_0%,#071318_100%)] p-7 md:grid-cols-[1.5fr_1fr] md:gap-12 md:p-11"
                >
                  <div>
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 shrink-0 text-[#E2FD48]">
                        <path d="M11 7 6 2" />
                        <path d="M18.992 12H2.041" />
                        <path d="M21.145 18.38A3.34 3.34 0 0 1 20 16.5a3.3 3.3 0 0 1-1.145 1.88c-.575.46-.855 1.02-.855 1.595A2 2 0 0 0 20 22a2 2 0 0 0 2-2.025c0-.58-.285-1.13-.855-1.595" />
                        <path d="m8.5 4.5 2.148-2.148a1.205 1.205 0 0 1 1.704 0l7.296 7.296a1.205 1.205 0 0 1 0 1.704l-7.592 7.592a3.615 3.615 0 0 1-5.112 0l-3.888-3.888a3.615 3.615 0 0 1 0-5.112L5.67 7.33" />
                      </svg>
                      <h3 className="font-display text-[26px] font-bold tracking-tight text-white">Tôles prélaquées</h3>
                      <span className="rounded-full border border-[#E2FD48]/35 px-3 py-1.5 text-[11px] font-bold text-[#E2FD48]">Usine intégrée</span>
                    </div>
                    <p className="max-w-[540px] text-base leading-[1.65] text-white/70">
                      Tôles aluminium prélaquées au format pour les façonniers, certifiées Qualicoat et filmées. Largeurs 1 250 et 1 500 mm, longueur sur mesure jusqu'à 4 000 mm, à partir de 30 tôles. Déroulées dans nos ateliers, laquées par{' '}
                      <Link to="/a-propos#infinimetal" className={infinimetalLinkClass}>
                        Infinimetal
                      </Link>
                      .
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {['Certifiées Qualicoat', 'Filmées', 'Déroulage intégré'].map((f) => (
                        <span key={f} className="rounded-full border border-white/[0.16] px-3 py-1.5 text-xs font-semibold text-white/80">{f}</span>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2" role="img" aria-label="Aperçu de teintes RAL disponibles">
                      {RAL_APERCU.map((c) => (
                        <i key={c} className="block h-10 w-10 rounded-[10px] border border-white/[0.12]" style={{ background: c }} />
                      ))}
                    </div>
                    <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                      <button type="button" onClick={() => document.getElementById('res-ral')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className={DS.ACTION_DARK}>
                        Catalogue RAL
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={DS.ACTION_ARROW}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                      </button>
                      <button type="button" onClick={() => document.getElementById('res-deroulage')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className={DS.ACTION_DARK}>
                        Document déroulage
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={DS.ACTION_ARROW}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                      </button>
                      <button type="button" onClick={() => goDevis('Tôles prélaquées')} className={DS.BTN_PRIMARY}>
                        Demander un devis
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-start md:justify-center">
                    <img src="https://res.cloudinary.com/dyiup6v5x/image/upload/f_auto,q_auto,w_520/v1780589052/infini_blanc_zvlnn3.png" alt="Logo Infinimetal Laquage Solutions" loading="lazy" className="h-auto w-44 md:w-[260px]" />
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Télécharger les documents */}
          <section id="ressources" className={`${DS.SECTION} bg-white scroll-mt-28`}>
            <div className={DS.CONTAINER}>
              <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
                <div className="max-w-3xl">
                  <p className={`${DS.EYEBROW_LIGHT} mb-4`}>Ressources</p>
                  <h2 className={`${DS.H2} text-[#0E2A33]`}>Fiches techniques et catalogue RAL à télécharger</h2>
                  <p className={`${DS.LEAD_LIGHT} mt-6`}>Les documents PDF de PLIALU&nbsp;: plaquette de présentation, catalogue des teintes RAL, fiches techniques par domaine, guide du déroulage, fiche de la goutte d'eau extrudée et portfolio.</p>
                </div>
                <p className="text-sm leading-[1.55] text-[#0E2A33]/[0.62] md:text-right">
                  6 documents PDF
                  <br />
                  En téléchargement direct
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {(() => {
                  const CLD = 'https://res.cloudinary.com/dyiup6v5x/image/upload';
                  const cld = (img: string, w: number) => `${CLD}/f_auto,q_auto,c_limit,w_${w}/${img}`;
                  const docs = [
                    { id: 'res-plaquette', file: 'Plaquette_Plialu_2026.pdf', dl: 'Plaquette_PLIALU_2026.pdf', title: 'Plaquette PLIALU', text: "Déroulage, thermolaquage, pliage et nos six domaines d'application, en 12 pages.", img: 'v1795704366/Plaquette_Plialu_mockup_avm413.webp', alt: "Plaquette PLIALU imprimée : couverture Metal Solutions et double page sur le thermolaquage, avec les teintes RAL et la certification Qualicoat" },
                    { id: 'res-book', file: 'Portfolio_Plialu.pdf', dl: 'Portfolio_PLIALU.pdf', title: 'Portfolio', text: 'Découvrez nos réalisations et chantiers emblématiques.', img: 'v1794303276/Portfolio_Plialu_mockup_1_nk5hfv.webp', alt: 'Couverture et pages du portfolio PLIALU' },
                    { id: 'res-ral', file: 'Catalogue_RAL.pdf', dl: 'Catalogue_RAL_PLIALU.pdf', title: 'Catalogue des teintes RAL', text: 'Toutes les teintes RAL proposées par PLIALU pour le thermolaquage, en finition brillante et mate.', img: 'v1794303276/Catalogue_RAL_mockup_1_cvsdji.webp', alt: 'Pages du catalogue RAL Infinimetal' },
                    { id: 'res-fiches', file: 'Fiches_techniques.pdf', dl: 'Fiches_techniques_PLIALU.pdf', title: 'Fiches techniques par domaine', text: 'Les fiches techniques PLIALU pour chaque domaine\u00A0: enduit, bardage, ravalement, précadres, étanchéité et MOB.', img: 'v1794303276/Fiches_techniques_mockup_1_iz09yh.webp', alt: 'Fiches techniques enduit mince, bardage et étanchéité' },
                    { id: 'res-deroulage', file: 'Deroulage.pdf', dl: 'Deroulage_PLIALU.pdf', title: 'Guide du déroulage', text: 'Le guide du déroulage PLIALU, pour optimiser vos formats et réduire vos chutes.', img: 'v1794306327/Deroulage_mockup_1_cmo86g.webp', alt: 'Pages du document déroulage aluminium' },
                    { id: 'res-goutte', file: 'Fiche_Goutte_eau_extrudee.pdf', dl: 'Fiche_Goutte_eau_extrudee_PLIALU.pdf', title: "Fiche technique goutte d'eau extrudée", text: "Rejet d'eau pour nez de dalle\u00A0: plan de coupe, accessoires, mise en œuvre et finitions.", img: 'v1794240588/Fiche_Goutte_eau_mockup_k6behd.webp', alt: "Pages de la fiche technique Goutte d'eau extrudée", product: true },
                  ];
                  const dlIcon = (size: number) => (
                    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 4v12M6 10l6 6 6-6M5 20h14" />
                    </svg>
                  );
                  return docs.map((d, i) => {
                    const feat = i === 0;
                    const href = `/documents/${d.file}`;
                    const cardCls = `${DS.CARD_LIGHT} group flex scroll-mt-32 flex-col text-[#0E2A33] transition-colors duration-150 hover:border-[#0E2A33]/45 ${feat ? 'md:col-span-2 md:flex-row' : ''}`;
                    const mockCls = `relative block aspect-[16/10] overflow-hidden border-b border-[#0E2A33]/10 bg-[#E8EDEF] ${feat ? 'md:w-[58%] md:flex-none md:border-b-0 md:border-r' : ''}`;
                    const img = (
                      <img
                        src={cld(d.img, feat ? 1200 : 800)}
                        srcSet={`${cld(d.img, 800)} 800w, ${cld(d.img, 1200)} 1200w, ${cld(d.img, 1600)} 1600w`}
                        sizes={feat ? '(max-width: 768px) 100vw, 740px' : '(max-width: 768px) 100vw, 620px'}
                        alt={d.alt}
                        loading="lazy"
                        className={`absolute inset-0 h-full w-full object-cover ${DS.CARD_IMG_ZOOM}`}
                      />
                    );
                    const head = (
                      <>
                        <div className="flex items-center justify-between gap-4">
                          <span className={DS.EYEBROW_LIGHT}>PDF · 0{i + 1}</span>
                          {d.product ? (
                            <span className="whitespace-nowrap rounded-full bg-[#0E2A33] px-2.5 py-1 text-[11px] font-bold text-[#E2FD48]">Fiche produit</span>
                          ) : (
                            <span className="text-xs text-[#0E2A33]/45">{d.file}</span>
                          )}
                        </div>
                        <h3 className={`mt-3.5 font-display font-bold text-[#0E2A33] ${feat ? 'text-xl md:text-[28px]' : 'text-xl'}`}>{d.title}</h3>
                        <p className="mt-2 max-w-[440px] text-sm leading-relaxed text-[#0E2A33]/75">{d.text}</p>
                      </>
                    );

                    if (d.product) {
                      return (
                        <div key={d.id} id={d.id} className={cardCls}>
                          <a href={href} download={d.dl} aria-label={`Télécharger ${d.title} (PDF)`} className={mockCls}>
                            {img}
                          </a>
                          <div className="flex flex-1 flex-col p-7">
                            {head}
                            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
                              <a href={href} download={d.dl} className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E2A33] underline-offset-4 hover:underline">
                                Télécharger le PDF
                                {dlIcon(14)}
                              </a>
                              <Link
                                to="/goutte-eau-extrudee"
                                className="group/prod inline-flex items-center gap-2.5 rounded-full bg-[#E2FD48] px-[22px] py-3 text-sm font-bold text-[#0E2A33] transition-[background-color,transform] duration-150 hover:-translate-y-0.5 hover:bg-[#D4ED3F]"
                              >
                                Voir la page produit
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-150 group-hover/prod:translate-x-1">
                                  <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <a key={d.id} id={d.id} href={href} download={d.dl} aria-label={`Télécharger ${d.title} (PDF)`} className={cardCls}>
                        <div className={mockCls}>{img}</div>
                        <div className={`flex flex-1 flex-col p-7 ${feat ? 'md:justify-center md:p-10' : ''}`}>
                          {head}
                          <div className={`mt-auto flex items-center justify-between gap-4 pt-6 ${feat ? 'md:mt-8 md:pt-0' : ''}`}>
                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E2A33]">
                              Télécharger le PDF
                              {dlIcon(14)}
                            </span>
                            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0E2A33]/20 transition-colors duration-150 group-hover:border-[#E2FD48] group-hover:bg-[#E2FD48]">
                              {dlIcon(16)}
                            </span>
                          </div>
                        </div>
                      </a>
                    );
                  });
                })()}
              </div>
            </div>
          </section>

          {/* CTA section */}
          <section className="py-16 md:py-24 bg-[#071318] text-center border-t border-white/5">
            <div className="max-w-3xl mx-auto px-6">
              <div className="mb-16">
              <h2 className={`${DS.H2} text-white`}>Votre pièce n'entre dans aucun domaine&nbsp;?</h2>
              <p className={`${DS.LEAD_DARK} mt-6 mx-auto`}>Envoyez vos plans ou une simple esquisse&nbsp;: PLIALU étudie votre pièce sur mesure et vous répond sous 48 h.</p>
              </div>
              <button onClick={goContactForm} className={DS.BTN_PRIMARY}>
                Présenter mon projet
              </button>
            </div>
          </section>
        </div>
  );
}
