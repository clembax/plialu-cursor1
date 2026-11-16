import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight, Clock, Mail, MapPin, Phone, Play } from 'lucide-react';
import * as DS from '../components/ds/ds';
import ScrollCue from '../components/ScrollCue';
import PortfolioGrid from '../../PortfolioGrid';
import { PROJECTS } from '../../projects';
import { expertisesDetails, processCardDescriptions } from '../data/expertises';
import { homeProjects } from '../data/homeProjects';
import { RAL_APERCU } from '../data/ral';

export function HomePage(props: {
  goContactForm: () => void;
  openProject: (id: string) => void;
  teaserVideoRef: React.RefObject<HTMLVideoElement | null>;
  portfolioYearMin: number;
  portfolioYearMax: number;
}) {
  const { goContactForm, openProject, teaserVideoRef, portfolioYearMin, portfolioYearMax } = props;
  return (
        <>
          {/* 1. HERO SECTION (DARK) */}
          <section className="relative w-full overflow-hidden" style={{ minHeight: '100svh' }}>
            <div className="absolute inset-0 z-0">
              <picture>
                <source media="(max-width: 800px)" srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/v1771414327/Hero-800px_emwjxr.webp" />
                <source media="(max-width: 1200px)" srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/v1771414327/Hero-1200px_vuuw2q.webp" />
                <img src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1771414327/Hero-1600px_zpvubh.webp" className="w-full h-full object-cover" loading="eager" alt="L'expertise métallique industrielle PLIALU" />
              </picture>
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0e2a33]/70 to-[#071318]/90"></div>
              <div className="absolute inset-x-0 bottom-0 h-full z-20 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(7, 19, 24, 0) 0%, rgba(7, 19, 24, 0.10) 60%, rgba(7, 19, 24, 0.55) 85%, #071318 100%)' }}></div>
            </div>
            <div className={`relative z-30 w-full max-w-7xl mx-auto px-6 ${DS.HERO_TOP} pb-16`}>
              <div className="max-w-7xl animate-fade-up">
                <div className="mb-16">
                  <h1 className={`${DS.H1} text-white`}>
                    <span className="block">SOLUTIONS MÉTALLIQUES <span className="whitespace-nowrap">SUR-MESURE</span></span>
                    <span className="block">pour l'enveloppe du bâtiment</span>
                  </h1>
                  <p className={`${DS.LEAD_DARK} mt-6`}>
                    PLIALU conçoit, plie et thermolaque sur mesure les pièces en aluminium et en acier de l'enveloppe du bâtiment, dans son usine intégrée près de Lyon. Qualité, coûts et délais sont maîtrisés de bout en bout, pour chaque projet.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button onClick={goContactForm} className={`${DS.BTN_PRIMARY} w-full sm:w-auto`}>Demander un devis</button>
                  <Link to="/expertises" className={`${DS.BTN_SECONDARY_DARK} w-full sm:w-auto group`}>
                    Découvrir nos expertises
                    <ArrowRight aria-hidden="true" size="1em" className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
            <ScrollCue tone="dark" />
          </section>

          <div className="bg-[#071318]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="mt-0 grid grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.5fr] border-t border-b border-white/[0.12] max-lg:[&>*:nth-last-child(-n+2)]:border-b-0">
                <div className="py-7 pr-4 lg:px-8 lg:first:pl-0 lg:last:pr-0 border-b border-white/[0.08] lg:border-b-0 lg:border-r">
                  <span className={`${DS.STAT_NUMBER} text-white`}>20 <span className="text-lg font-semibold text-white/50 tracking-normal">ans</span></span>
                  <p className="mt-2.5 text-[13px] leading-snug text-white/50">d'expertise en façonnage métallique</p>
                </div>
                <div className="py-7 pr-4 lg:px-8 lg:first:pl-0 lg:last:pr-0 border-b border-white/[0.08] lg:border-b-0 lg:border-r">
                  <span className={`${DS.STAT_NUMBER} text-white`}>7 000 <span className="text-lg font-semibold text-white/50 tracking-normal">m²</span></span>
                  <p className="mt-2.5 text-[13px] leading-snug text-white/50">d'ateliers de production</p>
                </div>
                <div className="py-7 pr-4 lg:px-8 lg:first:pl-0 lg:last:pr-0 border-white/[0.08] max-lg:border-b-0 lg:border-r">
                  <span className={`${DS.STAT_NUMBER} text-white`}>3 <span className="text-lg font-semibold text-white/50 tracking-normal">lignes intégrées</span></span>
                  <p className="mt-2.5 text-[13px] leading-snug text-white/50">Déroulage, thermolaquage, production</p>
                </div>
                <div className="py-7 pr-4 lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <div className="flex gap-4 items-center">
                    <img src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1771500844/logo_qf_kzo395.png" alt="Logo Qualicoat" className="w-16 h-auto brightness-0 invert" />
                    <div>
                      <p className={DS.EYEBROW_DARK}>Qualicoat certifié</p>
                      <p className="text-[13px] text-white/50 mt-1.5">Thermolaquage conforme aux exigences internationales</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. NOS EXPERTISES (DARK) */}
          <section id="expertise" className="pt-16 md:pt-20 pb-12 md:pb-16 section--dark" style={{ background: 'linear-gradient(180deg, #071318 0%, #0D2630 80%, #0C242D 100%)' }}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-20 items-center">
                <div>
                  <div className="mb-16">
                    <span className={`block mb-4 ${DS.EYEBROW_DARK}`}>PROCESS INTÉGRÉ</span>
                    <h2 className={`${DS.H2} text-white`}>Trois métiers sous le même toit</h2>
                    <p className={`${DS.LEAD_DARK} mt-6`}>
                    Chez PLIALU, le déroulage, le pliage et le thermolaquage se font dans la même usine, à Civrieux près de Lyon. Du bureau des méthodes à la livraison, avec un thermolaquage certifié Qualicoat et un pliage jusqu'à 4 m, chaque étape est réalisée en interne, sans sous-traitant entre deux opérations.
                    </p>
                  </div>
                  <Link to="/expertises" className={DS.ACTION_DARK}>
                    Découvrir nos expertises
                    <ArrowRight aria-hidden="true" size="1em" className={DS.ACTION_ARROW} />
                  </Link>
                </div>
                <div className="relative aspect-square md:aspect-video lg:aspect-square overflow-hidden rounded-[20px] border border-white/10 bg-[#071318] group">
                  <img
                    src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1771508868/Expertise-1200_rb2ubu.webp"
                    className={`w-full h-full object-cover ${DS.CARD_IMG_ZOOM}`}
                    alt="Opérateur réalisant la fabrication de pièces métalliques sur mesure sur presse plieuse"
                    loading="lazy"
                  />
                </div>
              </div>
              <ol className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-5 xl:gap-4 list-none p-0">
                {expertisesDetails.map((exp, idx) => {
                  const name = exp.id === 'bureau-etudes'
                    ? 'Bureau des méthodes'
                    : exp.id === 'assemblage-finitions'
                      ? 'Soudure & Assemblage'
                      : exp.title;
                  return (
                    <li key={exp.id} className="min-w-0">
                      <Link
                        to={`/expertises#${exp.id}`}
                        className={`group relative flex min-h-[168px] h-full w-full flex-col text-left ${DS.CARD_DARK} p-5 transition-colors duration-150 hover:border-[#E2FD48]/50 hover:bg-white/[0.06]`}
                      >
                        <div className="flex items-start justify-between">
                          <span className="font-display text-4xl font-semibold leading-none tracking-[-0.04em] text-[#E2FD48]">{String(idx + 1).padStart(2, '0')}</span>
                          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-150 group-hover:border-[#E2FD48] group-hover:bg-[#E2FD48] group-hover:text-[#0E2A33]">
                            <ArrowUpRight aria-hidden="true" size={14} />
                          </span>
                        </div>
                        <div className="mt-7">
                          <span className="font-display text-xl font-bold leading-tight text-white block min-h-[2.5em]">{name}</span>
                          <span className="mt-2 block text-xs leading-relaxed text-white/50">{processCardDescriptions[idx]}</span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>

          {/* Section dédiée : vidéo Teaser (loop, muette, lecture au scroll) */}
          <section
            id="teaser-video"
            className="relative pt-12 md:pt-16 pb-24 md:pb-32 section--dark"
            style={{ background: 'linear-gradient(180deg, #0C242D 0%, #071318 100%)' }}
          >
            <div className="relative max-w-7xl mx-auto px-6 z-10">
              <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-16 items-center">
                {/* Colonne gauche : vidéo teaser */}
                <div className="w-full">
                  <Link
                    to="/expertises#video-complete"
                    className="group block w-full text-left focus:outline-none"
                  >
                    <div className="relative rounded-[20px] overflow-hidden border border-white/10 bg-black/40 aspect-video cursor-pointer">
                      {/* Overlay de survol */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/70 bg-black/60">
                            <Play aria-hidden="true" size={22} className="text-white" />
                          </span>
                          <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/50">
                            Lire le teaser
                          </span>
                        </div>
                      </div>

                      {/* Vidéo */}
                      <video
                        ref={teaserVideoRef}
                        className={`absolute inset-0 w-full h-full object-cover ${DS.CARD_IMG_ZOOM}`}
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
                  </Link>
                </div>

                {/* Colonne droite : texte d'accroche */}
                <div>
                  <p className={`${DS.EYEBROW_DARK} mb-4`}>Visite d'usine</p>
                  <h2 className={`${DS.H2} text-white lg:w-[calc(100%+8px)]`}>L'usine PLIALU en vidéo</h2>
                  <p className={`${DS.BODY_DARK} mt-6`}>
                    Deux minutes pour voir nos lignes de déroulage, pliage et thermolaquage.
                  </p>
                  <Link
                    to="/expertises"
                    className={`${DS.BTN_PRIMARY} mt-8`}
                  >
                    Voir la visite complète
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Section Solutions */}
          <section id="solutions" className={`${DS.SECTION} bg-white`}>
            <div className={DS.CONTAINER}>
              <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div className="max-w-3xl">
                  <p className={`mb-4 ${DS.EYEBROW_LIGHT}`}>NOS SOLUTIONS</p>
                  <h2 className={`${DS.H2} text-[#0E2A33]`}>Six domaines d'application pour l'enveloppe du bâtiment</h2>
                  <p className={`${DS.LEAD_LIGHT} mt-6`}>Enduit, bardage, ravalement, précadres, étanchéité et MOB&nbsp;: pliés et laqués par PLIALU près de Lyon.</p>
                </div>
                <Link to="/solutions" className={`${DS.BTN_SECONDARY_LIGHT} shrink-0 self-start md:self-auto`}>
                  Toutes nos solutions
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </div>

              {(() => {
                const CLD = 'https://res.cloudinary.com/dyiup6v5x/image/upload';
                const arrow = (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                );
                const tuiles = [
                  { n: '01', anchor: 'enduit-mince', title: 'Enduit mince sur isolant', img: 'v1794308485/Solutions_enduit_mince_ITE_nhj3ul.webp', alt: 'Enduit mince sur isolant\u00A0: façade ITE avec tableaux et bavettes de fenêtres en aluminium laqué' },
                  { n: '02', anchor: 'bardage', title: 'Bardage, cassettes & clins', img: 'v1794305547/Image_site_bardage_eam6np.webp', alt: 'Bardage en cassettes de façade aluminium\u00A0: joint en croix et fixations' },
                  { n: '03', anchor: 'ravalement', title: 'Ravalement de façade', img: 'v1794235010/9cd7d856-180e-4fc2-bf46-7c3f938dfa8f_dj4zga.webp', alt: "Ravalement de façade\u00A0: nez de dalle équipé d'une goutte d'eau extrudée en aluminium" },
                  { n: '04', anchor: 'precadres', title: 'Précadres, portes ou fenêtres', img: 'v1794305764/20201001_141101_resized_bddixg.webp', alt: "Précadre aluminium monobloc soudé dans l'atelier PLIALU, vue de dessus" },
                  { n: '05', anchor: 'etancheite', title: 'Étanchéité', img: 'v1794308485/Solutions_etancheite_couvertine_nofleh.webp', alt: 'Étanchéité de toiture-terrasse\u00A0: couvertine aluminium posée sur acrotère avec son support' },
                  { n: '06', anchor: 'mob-fob', title: 'MOB, FOB & murs-rideaux', img: 'v1772021847/Welink-1200px_mu1jnb.webp', alt: 'Murs-rideaux et façade métallique du bâtiment WeLink à Lyon 7' },
                ];
                return (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Carte Goutte d'eau extrudée */}
                    <Link
                      to="/goutte-eau-extrudee"
                      className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#0E2A33_0%,#071318_100%)] text-left text-white md:col-span-2"
                    >
                      <div className="relative z-10 flex flex-1 flex-col justify-between gap-7 p-9 md:w-[56%]">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="rounded-full bg-[#E2FD48] px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#0E2A33]">Fiche produit</span>
                          <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-white/55">Ravalement de façade</span>
                        </div>
                        <div>
                          <h3 className="mb-3 font-display text-[26px] font-bold leading-tight tracking-tight">Goutte d'eau extrudée</h3>
                          <p className="max-w-[300px] text-[15px] leading-relaxed text-white/70">Finition de nez de dalle en aluminium extrudé, laquée dans nos ateliers et livrée en 3 mètres.</p>
                        </div>
                        <span className={`${DS.ACTION_DARK}`}>
                          Voir la fiche produit
                          <span className={DS.ACTION_ARROW}>{arrow}</span>
                        </span>
                      </div>
                      <img
                        src={`${CLD}/c_crop,x_0,y_233,w_2247,h_2025/a_hflip/f_auto,q_auto,c_limit,w_1000/v1794245866/profil_piyucu.webp`}
                        srcSet={`${CLD}/c_crop,x_0,y_233,w_2247,h_2025/a_hflip/f_auto,q_auto,c_limit,w_500/v1794245866/profil_piyucu.webp 500w, ${CLD}/c_crop,x_0,y_233,w_2247,h_2025/a_hflip/f_auto,q_auto,c_limit,w_1000/v1794245866/profil_piyucu.webp 1000w`}
                        sizes="(max-width: 768px) 100vw, 360px"
                        alt="Profil goutte d'eau extrudée en aluminium laqué, rendu 3D"
                        loading="lazy"
                        className="h-[220px] w-full object-contain object-right transition-transform duration-700 ease-out group-hover:scale-[1.04] md:absolute md:right-0 md:top-1/2 md:h-[88%] md:w-[58%] md:-translate-y-1/2"
                      />
                    </Link>

                    {/* 6 domaines : photo + titre, le détail est sur la page Solutions */}
                    {tuiles.map((t) => (
                      <Link
                        key={t.n}
                        to={`/solutions#${t.anchor}`}
                        className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[20px] bg-[#0E2A33] text-left text-white"
                      >
                        <img
                          src={`${CLD}/f_auto,q_auto,c_limit,w_800/${t.img}`}
                          srcSet={`${CLD}/f_auto,q_auto,c_limit,w_400/${t.img} 400w, ${CLD}/f_auto,q_auto,c_limit,w_800/${t.img} 800w, ${CLD}/f_auto,q_auto,c_limit,w_1200/${t.img} 1200w`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                          alt={t.alt}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,24,0)_30%,rgba(7,19,24,0.88)_100%)]" aria-hidden="true" />
                        <div className="relative p-[22px]">
                          <span className="block font-display text-xs font-bold tracking-[0.1em] text-[#E2FD48]">{t.n}</span>
                          <span className="mt-2 flex items-end justify-between gap-3">
                            <h3 className="font-display text-lg font-bold leading-snug text-white">{t.title}</h3>
                            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-white/35 transition-colors duration-200 group-hover:border-[#E2FD48] group-hover:bg-[#E2FD48] group-hover:text-[#0E2A33]">
                              {arrow}
                            </span>
                          </span>
                        </div>
                      </Link>
                    ))}

                    {/* Aperçu Tôles prélaquées (renvoie à la carte complète de la page Solutions) */}
                    <Link
                      to="/solutions#toles-prelaquees"
                      className="group grid grid-cols-1 items-center gap-6 rounded-[20px] bg-[linear-gradient(135deg,#0E2A33_0%,#071318_100%)] p-7 text-left text-white md:col-span-2 md:grid-cols-[1.6fr_1fr] md:gap-10 md:px-10 md:py-9 lg:col-span-4"
                    >
                      <div>
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <h3 className="font-display text-[22px] font-bold tracking-tight">Tôles prélaquées</h3>
                          <span className="rounded-full border border-[#E2FD48]/35 px-3 py-1.5 text-[11px] font-bold text-[#E2FD48]">Usine intégrée</span>
                        </div>
                        <p className="text-[15px] leading-relaxed text-white/70">Tôles aluminium prélaquées au format, certifiées Qualicoat et filmées.</p>
                        <div className="mt-5 flex flex-wrap gap-2" role="img" aria-label="Aperçu de teintes RAL disponibles">
                          {RAL_APERCU.map((c) => (
                            <i key={c} className="block h-10 w-10 rounded-[10px] border border-white/[0.12]" style={{ background: c }} />
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-6 md:items-end">
                        <img src="https://res.cloudinary.com/dyiup6v5x/image/upload/f_auto,q_auto,w_520/v1780589052/infini_blanc_zvlnn3.png" alt="Logo Infinimetal Laquage Solutions" loading="lazy" className="h-auto w-40 md:w-[200px]" />
                        <span className={DS.ACTION_DARK}>
                          Voir les tôles prélaquées
                          <span className={DS.ACTION_ARROW}>{arrow}</span>
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })()}
            </div>
          </section>

          {/* 4. RÉALISATIONS (DARK) */}
          <section id="projects" className="relative z-10 py-24 md:py-32 section--dark" style={{ background: 'linear-gradient(to bottom, #0b1e26 0%, #071318 100%)' }}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="max-w-2xl">
                  <span className={`block mb-4 ${DS.EYEBROW_DARK}`}>PORTFOLIO COLLABORATIONS</span>
                  <h2 className={`${DS.H2} text-white`}>Façades en aluminium réalisées avec nos clients</h2>
                </div>
                <p className="text-[10px] font-extrabold tracking-[0.4em] text-white/50 uppercase">
                  {PROJECTS.length} réalisations · {portfolioYearMin} à {portfolioYearMax}
                </p>
              </div>
              <PortfolioGrid projects={homeProjects} onOpen={openProject} context="home" />
              <div className="mt-12 flex justify-center">
                <Link
                  to="/portfolio"
                  className={DS.BTN_PRIMARY}
                >
                  Voir les projets
                </Link>
              </div>
            </div>
          </section>

          {/* 6. À PROPOS (DARK) */}
          <section id="propos" className="py-24 md:py-32 section--dark overflow-hidden" style={{ background: 'linear-gradient(to bottom, #071318 0%, #0b1e26 100%)' }}>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="group relative rounded-[20px] overflow-hidden aspect-[4/3] border border-white/10 bg-[#071318] order-2 lg:order-1 shadow-2xl">
                  <img
                    src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1771522416/APROPOS-1200px_wkguv2.webp"
                    className={`w-full h-full object-cover opacity-80 ${DS.CARD_IMG_ZOOM}`}
                    alt="Vue extérieure de l'usine Plialu, entreprise de métallurgie et façonnage en Rhône-Alpes"
                    loading="lazy"
                  />
                </div>
                <div className="order-1 lg:order-2">
                  <div className="mb-16">
                  <span className={`block mb-4 ${DS.EYEBROW_DARK}`}>À PROPOS</span>
                  <h2 className={`${DS.H2} text-white`}>Votre partenaire en pliage et thermolaquage</h2>
                  <p className={`${DS.LEAD_DARK} mt-6`}>
                    PLIALU fabrique les pièces pliées et laquées des façadiers, des entreprises de MOB et des entreprises du bâtiment. Depuis <strong>son usine près de Lyon</strong>, elle accompagne vos chantiers en <strong>Auvergne-Rhône-Alpes</strong>, partout en France, en Belgique et en Suisse, avec 7 000 m² dédiés au pliage et au thermolaquage sur mesure.
                  </p>
                  </div>
                  <Link to="/a-propos" className={DS.ACTION_DARK}>EN SAVOIR PLUS <ArrowRight aria-hidden="true" size="1em" className={DS.ACTION_ARROW} /></Link>
                </div>
              </div>
            </div>
          </section>

          {/* 7. CONTACT (LIGHT) */}
          <section id="contact" className="bg-[#F3F6F7] py-24 md:py-32 section--light">
            <div className="relative z-10 max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
                <div>
                  <p className={`${DS.EYEBROW_LIGHT} mb-4`}>Contact</p>
                  <h2 className={`${DS.H2} text-[#0E2A33]`}>Un projet pour l'enveloppe du bâtiment&nbsp;?</h2>
                  <p className={`${DS.LEAD_LIGHT} mt-6`}>Plans, métrés ou simple question&nbsp;: l'équipe PLIALU vous répond sous 48 h, avec vos contraintes de chantier en tête.</p>
                  <div className="flex flex-wrap gap-4 mt-10">
                    <button onClick={goContactForm} className={DS.BTN_PRIMARY}>Demander un devis</button>
                    <a href="tel:0478089370" className={DS.BTN_SECONDARY_LIGHT}>
                      <Phone aria-hidden="true" size={16} />
                      Appeler un expert
                    </a>
                  </div>
                </div>
                <div className="grid gap-3">
                  <div className="flex items-start gap-4 rounded-[20px] bg-white px-6 py-[22px]">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#F3F6F7] text-[#0E2A33]">
                      <Phone aria-hidden="true" size={18} />
                    </div>
                    <div>
                      <p className={DS.EYEBROW_LIGHT}>Téléphone</p>
                      <p className="mt-1.5 text-base font-bold leading-snug text-[#0E2A33]"><a href="tel:0478089370">04 78 08 93 70</a></p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-[20px] bg-white px-6 py-[22px]">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#F3F6F7] text-[#0E2A33]">
                      <Mail aria-hidden="true" size={18} />
                    </div>
                    <div>
                      <p className={DS.EYEBROW_LIGHT}>E-mail</p>
                      <p className="mt-1.5 text-base font-bold leading-snug text-[#0E2A33]"><a href="mailto:commercial@plialu.fr">commercial@plialu.fr</a></p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-[20px] bg-white px-6 py-[22px]">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#F3F6F7] text-[#0E2A33]">
                      <MapPin aria-hidden="true" size={18} />
                    </div>
                    <div>
                      <p className={DS.EYEBROW_LIGHT}>Adresse</p>
                      <p className="mt-1.5 text-base font-bold leading-snug text-[#0E2A33]">Technoparc Saône Vallée Ouest, 150, Route Copernic, 01390 Civrieux</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-[20px] bg-white px-6 py-[22px]">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#F3F6F7] text-[#0E2A33]">
                      <Clock aria-hidden="true" size={18} />
                    </div>
                    <div>
                      <p className={DS.EYEBROW_LIGHT}>Horaires</p>
                      <p className="mt-1.5 text-base font-bold leading-snug text-[#0E2A33]">Du lundi au jeudi de 7h30 à 16h30, le vendredi de 7h30 à 12h.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
  );
}
