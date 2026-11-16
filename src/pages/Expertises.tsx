import React from 'react';
import { Link } from 'react-router';
import { ArrowDown, Play } from 'lucide-react';
import * as DS from '../components/ds/ds';
import ConsentEmbed from '../components/ConsentEmbed';
import ScrollCue from '../components/ScrollCue';
import { expertisesDetails, processCardDescriptions } from '../data/expertises';

export function ExpertisesPage(props: {
  goContactForm: () => void;
  hoveredStep: number | null;
  setHoveredStep: React.Dispatch<React.SetStateAction<number | null>>;
  isSommaireSticky: boolean;
  expertisesHeroRef: React.RefObject<HTMLElement | null>;
  sommaireRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { goContactForm, hoveredStep, setHoveredStep, isSommaireSticky, expertisesHeroRef, sommaireRef } = props;
  return (
        <div className="animate-fade-in">
          {/* Hero Expertises (contient le sommaire en bas, au-dessus de la ligne de flottaison) */}
          <section ref={expertisesHeroRef} className={`relative bg-white ${DS.HERO_TOP} pb-0 min-h-[100svh] flex flex-col`}>
            <div className="flex-1 flex flex-col max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-4xl">
                <div className="mb-16">
                <span className={`block mb-4 ${DS.EYEBROW_LIGHT}`}>
                  PROCESS INDUSTRIEL INTÉGRÉ
                </span>
                <h1 className={`${DS.H1} text-[#0E2A33]`}>
                  FABRICATION DE PIÈCES MÉTALLIQUES SUR MESURE
                </h1>
                <p className={`${DS.LEAD_LIGHT} mt-6`}>
                  De l'étude technique (DXF/DWG) au thermolaquage industriel, jusqu'au pliage, notre chaîne intégrée de fabrication de pièces métalliques sur mesure garantit précision, conformité et performance chantier.
                </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <a
                    href="#bureau-etudes"
                    onClick={(e) => { e.preventDefault(); document.getElementById('bureau-etudes')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className={`${DS.BTN_SECONDARY_LIGHT} w-full sm:w-auto`}
                  >
                    Découvrir notre process
                    <ArrowDown aria-hidden="true" size={18} />
                  </a>
                  <a
                    href="#video-complete"
                    onClick={(e) => { e.preventDefault(); document.getElementById('video-complete')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className={`${DS.BTN_SECONDARY_LIGHT} w-full sm:w-auto`}
                  >
                    Voir la vidéo complète
                    <Play aria-hidden="true" size={18} />
                  </a>
                </div>
              </div>
            </div>
            <ScrollCue tone="light" />
          </section>

          {/* Mini Sommaire : sticky sous le header */}
          <div
            id="expertises-sommaire"
            ref={sommaireRef}
            className={`hidden md:block sticky top-16 z-30 scroll-mt-24 shrink-0 ${
              isSommaireSticky
                ? 'bg-white/70 backdrop-blur-md border-t border-[#0E2A33]/[0.12]'
                : 'bg-white border-t border-[#0E2A33]/[0.12]'
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
          <section id="video-complete" className="section--dark py-24 md:py-32 scroll-mt-24" style={{ background: '#071318' }}>
            <div className="max-w-6xl mx-auto px-6">
              <div className="relative rounded-[20px] overflow-hidden border border-white/10 bg-black/40 aspect-video">
                <ConsentEmbed kind="vimeo" tone="dark">
                  <iframe
                    src="https://player.vimeo.com/video/1172884207?title=0&byline=0&portrait=0&dnt=1"
                    title="Vidéo complète du process PLIALU"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </ConsentEmbed>
              </div>
            </div>
          </section>

          {/* Section Chiffres clés */}
          <section className="py-16 md:py-24 text-white border-b border-white/5" style={{ background: 'linear-gradient(to bottom, #071318 0%, #0b1e26 100%)' }}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-16 md:gap-8 text-center">
                <div className="flex-1 relative md:after:content-[''] md:after:absolute md:after:-right-4 md:after:top-1/2 md:after:-translate-y-1/2 md:after:h-[60%] md:after:w-px md:after:bg-white/[0.12] last:after:hidden">
                  <div className={`${DS.STAT_NUMBER} text-[#E2FD48] mb-3`}>
                    <strong>7 000 m²</strong>
                  </div>
                  <p className="text-[9px] font-extrabold tracking-widest text-white/50 uppercase">Atelier de production intégré</p>
                </div>
                <div className="flex-1 relative md:after:content-[''] md:after:absolute md:after:-right-4 md:after:top-1/2 md:after:-translate-y-1/2 md:after:h-[60%] md:after:w-px md:after:bg-white/[0.12] last:after:hidden">
                  <div className={`${DS.STAT_NUMBER} text-[#E2FD48] mb-3`}>
                    <strong>4 m</strong>
                  </div>
                  <p className="text-[9px] font-extrabold tracking-widest text-white/50 uppercase">Longueur maximale</p>
                </div>
                <div className="flex-1 relative md:after:content-[''] md:after:absolute md:after:-right-4 md:after:top-1/2 md:after:-translate-y-1/2 md:after:h-[60%] md:after:w-px md:after:bg-white/[0.12] last:after:hidden">
                  <div className={`${DS.STAT_NUMBER} text-[#E2FD48] mb-3 text-balance`}>
                    <strong>3 lignes intégrées</strong>
                  </div>
                  <p className="text-[9px] font-extrabold tracking-widest text-white/50 uppercase">Déroulage, Thermolaquage, Production</p>
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
                          <span className={`block mb-4 ${DS.EYEBROW_LIGHT}`}>
                            {exp.tag}
                          </span>
                          {exp.id === 'thermolaquage-plat' ? (
                            <div className="flex flex-wrap items-center gap-4">
                              <h2 className={`${DS.H2} text-[#0E2A33]`}>
                                Thermolaquage
                              </h2>
                              <Link
                                to="/a-propos#infinimetal"
                                aria-label="En savoir plus sur Infinimetal"
                                className="flex items-center gap-3 px-5 py-2 bg-gray-50 rounded-full border border-[#0E2A33]/[0.12] shadow-sm mt-1 cursor-pointer hover:border-[#E2FD48]/50 transition-colors"
                              >
                                <img
                                  src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773322881/INFINI_Noir_ompn2i.png"
                                  alt="Logo Infinimetal"
                                  className="h-7 w-auto object-contain opacity-80"
                                />
                              </Link>
                            </div>
                          ) : (
                            <h2 className={`${DS.H2} text-[#0E2A33]`}>
                              {exp.id === 'bureau-etudes' ? 'Bureau des méthodes' : exp.id === 'assemblage-finitions' ? 'Soudure & Assemblage' : exp.title}
                            </h2>
                          )}
                        </div>
                        {exp.id === 'bureau-etudes' ? (
                          <p className={`${DS.LEAD_LIGHT} mt-6`}>
                            En collaboration avec les équipes commerciales et de production, nos techniciens analysent vos plans et cahiers des charges, avec optimisation des formats, validation des contraintes techniques pour une gamme de production sur mesure adaptée à chaque dossier, du plus simple au plus complexe
                          </p>
                        ) : exp.id === 'deroulage-mise-format' ? (
                          <>
                            <p className={`${DS.LEAD_LIGHT} mt-6`}>
                              Déroulage de bobines : redressage - découpe de formats à plat et optimisation par dossier. Une étape clé de la fabrication et de la maîtrise des coûts
                            </p>
                          </>
                        ) : exp.id === 'thermolaquage-plat' ? (
                          <>
                            <p className={`${DS.LEAD_LIGHT} mt-6`}>
                              Deux lignes de production certifiées Qualicoat via notre marque{' '}
                              <Link to="/a-propos#infinimetal" className="cursor-pointer text-[#0E2A33] font-bold hover:underline transition-colors">
                                Infinimetal
                              </Link>
                              {' '}pour une flexibilité dans le choix de la gamme de production : nous travaillons à partir de feuilles d'aluminium prélaquées ou bien nous laquons après façonnage.
                            </p>
                          </>
                        ) : exp.id === 'pliage-automatise' ? (
                          <>
                            <p className={`${DS.LEAD_LIGHT} mt-6`}>
                              Du pliage traditionnel sur presse plieuse à CNC ou grâce à notre ligne de production automatisée : découpe, poinçonnage, panneautage, nous maîtrisons le pliage de A à Z
                            </p>
                          </>
                        ) : (
                          <p className={`${DS.LEAD_LIGHT} mt-6`}>
                            {exp.text}
                          </p>
                        )}
                        {exp.materials && (
                          <div className="pt-6 border-t border-[#0E2A33]/10 flex flex-col gap-2">
                            <span className="text-[9px] font-bold tracking-[0.2em] text-[#0E2A33]/40 uppercase">DOMAINES D'APPLICATION</span>
                            <p className="text-sm font-bold text-[#0E2A33]/60 italic">{exp.materials}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className={`relative overflow-hidden rounded-[20px] shadow-lg ${exp.id === 'thermolaquage-plat' ? 'h-[400px] md:h-[600px]' : 'h-[320px] md:h-[500px]'} ${idx % 2 !== 0 ? 'lg:order-1' : ''} group bg-zinc-50`}>
                        {exp.id === 'bureau-etudes' ? (
                          <img
                            src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773074223/BE-1200px_nzpfpj.webp"
                            srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773074223/BE-800px_wa43jv.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1773074223/BE-1200px_nzpfpj.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1773074223/BE-1600px_x6mpih.webp 1600w"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            alt="Ingénieur bureau d'études analysant des plans CAO pour la fabrication de pièces métalliques sur mesure"
                            loading="lazy"
                            decoding="async"
                            className={`w-full h-full object-cover ${DS.CARD_IMG_ZOOM}`}
                          />
                        ) : exp.id === 'deroulage-mise-format' ? (
                          <img
                            srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773075246/De%CC%81roulage-800px_qz2nnx.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1773075246/De%CC%81roulage-1200px_e0hd8r.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1773075246/De%CC%81roulage-1600px_plmy5l.webp 1600w"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773075246/De%CC%81roulage-1200px_e0hd8r.webp"
                            alt="Stockage de bobines de métal industrielles lourdes dans l'atelier Plialu pour l'étape de déroulage et préparation matière"
                            loading="lazy"
                            className={`w-full h-full object-cover ${DS.CARD_IMG_ZOOM}`}
                          />
                        ) : exp.id === 'thermolaquage-plat' ? (
                          <img
                            src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1780322264/Thermolaquage-800px_rgjdmf.webp"
                            srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/v1780322264/Thermolaquage-800px_rgjdmf.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1780322264/Thermolaquage-1200px_hu9ira.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1780322264/Thermolaquage-1600px_vautk7.webp 1600w"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
                            alt="Chaîne de thermolaquage industrielle certifiée Qualicoat"
                            className={`w-full h-full object-cover ${DS.CARD_IMG_ZOOM}`}
                            loading="lazy"
                          />
                        ) : exp.id === 'assemblage-finitions' ? (
                          <img
                            src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1780324806/Asssemblage-800px_fceub5.webp"
                            srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/v1780324806/Asssemblage-800px_fceub5.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1780324806/Assemblage-1200px_de0amf.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1780324806/Assemblage-1600px_uif1my.webp 1600w"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            alt="Atelier d'assemblage et préparation des pièces métalliques avant livraison"
                            loading="lazy"
                            className={`w-full h-full object-cover ${DS.CARD_IMG_ZOOM}`}
                          />
                        ) : exp.id === 'logistique-expedition' ? (
                          <img
                            src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1780325091/Logistique-800px_a0giss.webp"
                            srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/v1780325091/Logistique-800px_a0giss.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1780325092/Logistique-1200px_evnw9s.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1780325092/Logistique-1600px_lxwlh0.webp 1600w"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            alt="Préparation et expédition sécurisée des commandes en logistique"
                            loading="lazy"
                            className={`w-full h-full object-cover ${DS.CARD_IMG_ZOOM}`}
                          />
                        ) : exp.id === 'pliage-automatise' ? (
                          <img
                            srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773149127/Pliage-800px_x24kz6.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1773149127/Pliage-1200px_bl5tzv.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1773149127/Pliage-1600px_yxsdqe.webp 1600w"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773149127/Pliage-1200px_bl5tzv.webp"
                            alt="Pliage aluminium sur presse plieuse Amada"
                            loading="lazy"
                            className={`w-full h-full object-cover ${DS.CARD_IMG_ZOOM}`}
                          />
                        ) : (
                          <img
                            src={exp.img}
                            className={`w-full h-full object-cover ${DS.CARD_IMG_ZOOM}`}
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
          <section className="py-16 md:py-24 bg-[#071318] text-center border-t border-white/5">
            <div className="max-w-3xl mx-auto px-6">
              <div className="mb-16">
              <h2 className={`${DS.H2} text-white`}>Vos contraintes techniques ont une réponse ici.</h2>
              <p className={`${DS.LEAD_DARK} mt-6 mx-auto`}>Chargés d'affaires disponibles pour analyser vos plans DXF et optimiser vos coûts avant production.</p>
              </div>
              <button onClick={goContactForm} className={DS.BTN_PRIMARY}>
                Envoyer des plans
              </button>
            </div>
          </section>
        </div>
  );
}
