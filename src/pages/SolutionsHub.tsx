import React from 'react';
import * as DS from '../components/ds/ds';
import type { PageKey } from '../seo/seoConfig';

export function SolutionsHubPage(props: {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageKey>>;
  goContactForm: () => void;
}) {
  const { setCurrentPage, goContactForm } = props;
  return (
        <div className="animate-fade-up">
          {/* Hero Solutions */}
          <section className="bg-white pt-48 md:pt-56 pb-20 min-h-[70vh] flex flex-col justify-center">
            <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-4xl">
                <span className={`block mb-4 ${DS.EYEBROW_LIGHT}`}>CATALOGUE B2B</span>
                <h1 className={`${DS.H1} text-[#0E2A33]`}>
                  Solutions métalliques enveloppe du bâtiment
                </h1>
                <p className={`${DS.LEAD_LIGHT} mt-6`}>
                  Enduit mince sur isolant, ravalement de façade, bardages et cassettes, précadres, tôles prélaquées. Découvrez nos gammes aluminium et acier pour l'enveloppe du bâtiment.
                </p>
              </div>
            </div>
          </section>

          {/* --- BENTO GRID : 6 FAMILLES DE PRODUITS --- */}
          <section className="py-24 md:py-32 section--dark bg-gradient-to-b from-[#071318] to-[#0b1e26]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-16">
                <h2 className={`${DS.H2} text-white`}>Nos Solutions Enveloppe</h2>
                <p className={`${DS.LEAD_DARK} mt-6`}>
                  Découvrez nos expertises en façonnage métallique sur mesure pour l'habillage technique de façades.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Carte 1: Bardage */}
                <div
                  className="group relative flex flex-col overflow-hidden rounded-[20px] bg-white/[0.03] border border-white/10 h-[400px] cursor-pointer transition-colors duration-300 hover:border-[#E2FD48]"
                  onClick={() => setCurrentPage('home')}
                >
                  <div className="relative w-full aspect-video bg-[#071318] border border-white/10 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(226,253,72,0.35),transparent_60%)]" />
                    <span className="relative text-white/50 text-sm font-semibold">
                      Visualisation 3D en cours
                    </span>
                  </div>

                  <div className="mt-auto p-6 w-full flex flex-col">
                    <h3 className={`${DS.H3} text-white`}>
                      Bardages &amp; Cassettes
                    </h3>
                    <p className="mt-2 text-white/[0.78] leading-[1.65]">
                      Systèmes de fixation invisible et habillages grandes dimensions.
                    </p>
                  </div>
                </div>

                {/* Carte 2: ITE (image réelle conservée) */}
                <div
                  className="group relative flex flex-col overflow-hidden rounded-[20px] bg-white/[0.03] border border-white/10 h-[400px] cursor-pointer transition-colors duration-300 hover:border-[#E2FD48]"
                  onClick={() => setCurrentPage('home')}
                >
                  <div className="relative w-full aspect-video bg-[#071318] overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773850275/enduitminceisolant-1200px_ibn4ly.webp"
                      srcSet="
                        https://res.cloudinary.com/dyiup6v5x/image/upload/v1773850274/enduitminceisolant-800px_poxwkk.webp 800w,
                        https://res.cloudinary.com/dyiup6v5x/image/upload/v1773850275/enduitminceisolant-1200px_ibn4ly.webp 1200w,
                        https://res.cloudinary.com/dyiup6v5x/image/upload/v1773850275/enduitminceisolant-1600px_y0zenz.webp 1600w
                      "
                      sizes="(max-width: 768px) 800px, (max-width: 1200px) 1200px, 1600px"
                      alt="Enduit mince sur isolant : PLIALU"
                      className={`absolute inset-0 w-full h-full object-cover ${DS.CARD_IMG_ZOOM}`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A33] via-[#0E2A33]/40 to-transparent opacity-90" />
                  </div>

                  <div className="mt-auto p-6 w-full flex flex-col">
                    <h3 className={`${DS.H3} text-white`}>
                      Enduit mince sur isolant
                    </h3>
                    <p className="mt-2 text-white/[0.78] leading-[1.65]">
                      Profils de départ, d&apos;angle et d&apos;arrêt pour systèmes ITE.
                    </p>
                  </div>
                </div>

                {/* Carte 3: Précadres */}
                <div
                  className="group relative flex flex-col overflow-hidden rounded-[20px] bg-white/[0.03] border border-white/10 h-[400px] cursor-pointer transition-colors duration-300 hover:border-[#E2FD48]"
                  onClick={() => setCurrentPage('home')}
                >
                  <div className="relative w-full aspect-video bg-[#071318] border border-white/10 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(226,253,72,0.35),transparent_60%)]" />
                    <span className="relative text-white/50 text-sm font-semibold">
                      Visualisation 3D en cours
                    </span>
                  </div>

                  <div className="mt-auto p-6 w-full flex flex-col">
                    <h3 className={`${DS.H3} text-white`}>
                      Précadres
                    </h3>
                    <p className="mt-2 text-white/[0.78] leading-[1.65]">
                      Encadrements de baies soudés ou en kit pour une finition étanche et esthétique.
                    </p>
                  </div>
                </div>

                {/* Carte 4: Tôles prélaquées */}
                <div
                  className="group relative flex flex-col overflow-hidden rounded-[20px] bg-white/[0.03] border border-white/10 h-[400px] cursor-pointer transition-colors duration-300 hover:border-[#E2FD48]"
                  onClick={() => setCurrentPage('home')}
                >
                  <div className="relative w-full aspect-video bg-[#071318] border border-white/10 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(226,253,72,0.35),transparent_60%)]" />
                    <span className="relative text-white/50 text-sm font-semibold">
                      Visualisation 3D en cours
                    </span>
                  </div>

                  <div className="mt-auto p-6 w-full flex flex-col">
                    <div className="flex items-center justify-between">
                      <h3 className={`${DS.H3} text-white`}>
                        Tôles prélaquées
                      </h3>
                      <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-[#0E2A33]/[0.12] shadow-sm w-fit">
                        <img
                          src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773322881/INFINI_Noir_ompn2i.png"
                          alt="Logo Infinimetal"
                          className="h-5 w-auto object-contain opacity-80"
                        />
                      </div>
                    </div>
                    <p className="mt-2 text-white/[0.78] leading-[1.65]">
                      Vente de tôles prélaquées, RAL standards, déroulage sur mesure ou dimensions standards.
                    </p>
                  </div>
                </div>

                {/* Carte 5: Ravalement de façade */}
                <div
                  className="group relative flex flex-col overflow-hidden rounded-[20px] bg-white/[0.03] border border-white/10 h-[400px] cursor-pointer transition-colors duration-300 hover:border-[#E2FD48]"
                  onClick={() => setCurrentPage('home')}
                >
                  <div className="relative w-full aspect-video bg-[#071318] border border-white/10 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(226,253,72,0.35),transparent_60%)]" />
                    <span className="relative text-white/50 text-sm font-semibold">
                      Visualisation 3D en cours
                    </span>
                  </div>

                  <div className="mt-auto p-6 w-full flex flex-col">
                    <h3 className={`${DS.H3} text-white`}>
                      Ravalement de façade
                    </h3>
                    <p className="mt-2 text-white/[0.78] leading-[1.65]">
                      Profils de finition, nez de dalles et goutte d'eau pour la rénovation des bâtiments.
                    </p>
                  </div>
                </div>

                {/* Carte 6: Solutions pour l&apos;étanchéité */}
                <div
                  className="group relative flex flex-col overflow-hidden rounded-[20px] bg-white/[0.03] border border-white/10 h-[400px] cursor-pointer transition-colors duration-300 hover:border-[#E2FD48]"
                  onClick={() => setCurrentPage('home')}
                >
                  <div className="relative w-full aspect-video overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/dyiup6v5x/image/upload/f_auto,q_auto,w_800/v1777883039/plan-page-e%CC%81tanche%CC%81ite%CC%81-800px_kabn0m.webp"
                      srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/f_auto,q_auto,w_800/v1777883039/plan-page-e%CC%81tanche%CC%81ite%CC%81-800px_kabn0m.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/f_auto,q_auto,w_1200/v1777883039/plan-page-e%CC%81tanche%CC%81ite%CC%81-1200_g2nc7h.webp 1200w"
                      sizes="(max-width: 1024px) 100vw, 400px"
                      alt="Schéma étanchéité toit plat : couvertines aluminium PLIALU"
                      loading="lazy"
                      className={`w-full h-full object-cover object-center ${DS.CARD_IMG_ZOOM}`}
                    />
                  </div>

                  <div className="mt-auto p-6 w-full flex flex-col">
                    <h3 className={`${DS.H3} text-white`}>
                      Solutions pour l&apos;étanchéité
                    </h3>
                    <p className="mt-2 text-white/[0.78] leading-[1.65]">
                      Modèle d&apos;étanchéité sur toit plat
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section conversion vers le contact */}
          <section className="py-16 md:py-24 bg-[#071318] text-center border-t border-white/5">
            <div className="max-w-3xl mx-auto px-6">
              <div className="mb-16">
              <h2 className={`${DS.H2} text-white`}>Du profilé à la pose : tout se fabrique ici.</h2>
              <p className={`${DS.LEAD_DARK} mt-6 mx-auto`}>Profilés aluminium, accessoires ITE, thermolaquage post-façonnage. Un seul interlocuteur pour tout le système.</p>
              </div>
              <button
                onClick={goContactForm}
                className={DS.BTN_PRIMARY}
              >
                Chiffrer mon projet
              </button>
            </div>
          </section>
        </div>
  );
}
