import React from 'react';
import type { PageKey } from '../seo/seoConfig';

export function RessourceChoixMetalPage(props: {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageKey>>;
  goContactForm: () => void;
}) {
  const { setCurrentPage, goContactForm } = props;
  return (
        <div className="animate-fade-up bg-white" style={{ backgroundColor: '#FFFFFF' }}>
          {/* HERO ARTICLE */}
          <section className="pt-32 md:pt-40 pb-12 bg-white" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="max-w-5xl mx-auto px-6">
              <div className="w-full">
                <button
                  type="button"
                  onClick={() => setCurrentPage('home')}
                  className="flex items-center gap-2 text-sm font-semibold text-[#0E2A33] hover:text-[#E2FD48] cursor-pointer mb-8 uppercase tracking-widest"
                >
                  <span>← Retour aux ressources</span>
                </button>
                <h1 className="text-4xl md:text-5xl font-black text-[#0E2A33] leading-tight mt-20 text-center max-w-3xl mx-auto">
                  Choisir le bon métal pour une façade extérieure
                </h1>
                <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto text-center">
                  Aluminium, acier ou inox&nbsp;— chaque métal réagit différemment aux contraintes climatiques, aux normes et aux exigences
                  esthétiques d&apos;un projet de façade. Ce guide vous aide à choisir en fonction de votre contexte, avant même d&apos;appeler un
                  fabricant.
                </p>
                <div className="w-full h-[500px] rounded-2xl mt-8 mb-6 relative overflow-hidden mx-auto">
                  <img
                    src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773674033/Article1-hero-1200px_fmli5z.webp"
                    srcSet="
                      https://res.cloudinary.com/dyiup6v5x/image/upload/v1773674033/Article1-hero-800px_ocbjuj.webp 800w,
                      https://res.cloudinary.com/dyiup6v5x/image/upload/v1773674033/Article1-hero-1200px_fmli5z.webp 1200w,
                      https://res.cloudinary.com/dyiup6v5x/image/upload/v1773674033/Article1-hero-1600px_uh1kd0.webp 1600w
                    "
                    sizes="(max-width: 768px) 800px, (max-width: 1200px) 1200px, 1600px"
                    alt="Façade aluminium thermolaqué anthracite — réalisation PLIALU Rhône-Alpes"
                    className="w-full h-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </section>

          {/* CORPS DE L'ARTICLE */}
          <section className="pt-8 pb-20 bg-white" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="max-w-3xl mx-auto px-6 text-gray-700 leading-relaxed space-y-12">
              {/* Section 1 */}
              <div className="pt-4 mt-8 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
                  Pourquoi le choix du substrat est déterminant
                </h2>
                <p className="text-base mb-12">
                  Le substrat (matériau de base) d&apos;une façade détermine le poids sur l&apos;ossature secondaire, la liberté de formes
                  obtenue au pliage et la durabilité globale de l&apos;enveloppe. Un métal trop lourd peut surdimensionner les fixations,
                  alors qu&apos;un matériau mal adapté au climat accélère la corrosion et les désordres esthétiques. Un mauvais choix en phase
                  d&apos;étude se traduit souvent par un surcoût en phase chantier&nbsp;: renforts ajoutés, reprises de calepinage ou retours usine
                  imprévus. Les tolérances de pliage
                  <button
                    onClick={() => setCurrentPage('home')}
                    className="underline underline-offset-4 decoration-[#6B7280] hover:decoration-[#0E2A33] font-semibold text-[#0E2A33] ml-1"
                  >
                    (précision géométrique du façonnage)
                  </button>
                  varient elles aussi selon la dureté du substrat choisi.
                </p>
              </div>

              {/* Section 2 */}
              <div className="pt-8 mt-24 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
                  Aluminium, acier galvanisé, inox&nbsp;: comparatif technique
                </h2>
                <p className="text-base mb-12">
                  Aluminium, acier galvanisé et inox 316L couvrent à eux trois la grande majorité des projets de façade. L&apos;aluminium
                  s&apos;impose pour les enveloppes légères et très dessinées, l&apos;acier galvanisé pour les structures plus lourdes et
                  économiques, et l&apos;inox 316L pour les environnements agressifs (zones marines ou sites industriels exposés). Comprendre
                  leurs différences permet d&apos;adapter le bon métal à chaque contexte plutôt que de tout traiter de la même façon.
                </p>
                <div className="overflow-x-auto min-w-full">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#0E2A33] text-white">
                        <th className="py-3 px-3 text-left">Critère</th>
                        <th className="py-3 px-3 text-left">Aluminium</th>
                        <th className="py-3 px-3 text-left">Acier galvanisé</th>
                        <th className="py-3 px-3 text-left">Inox 316L</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-50">
                        <td className="py-4 px-6 font-medium text-[#0E2A33]">Densité</td>
                        <td className="py-4 px-6">2,7 g/cm³</td>
                        <td className="py-4 px-6">7,8 g/cm³</td>
                        <td className="py-4 px-6">7,9 g/cm³</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-6 font-medium text-[#0E2A33]">Résistance naturelle à la corrosion</td>
                        <td className="py-4 px-6">Oui</td>
                        <td className="py-4 px-6">Non (nécessite galvanisation)</td>
                        <td className="py-4 px-6">Excellente</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-4 px-6 font-medium text-[#0E2A33]">Pliage sur mesure</td>
                        <td className="py-4 px-6">Facile</td>
                        <td className="py-4 px-6">Possible jusqu&apos;à 3&nbsp;mm</td>
                        <td className="py-4 px-6">Complexe</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-6 font-medium text-[#0E2A33]">Zone littorale</td>
                        <td className="py-4 px-6">Avec traitement Seaside</td>
                        <td className="py-4 px-6">Déconseillé</td>
                        <td className="py-4 px-6">Recommandé</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-4 px-6 font-medium text-[#0E2A33]">Coût matière</td>
                        <td className="py-4 px-6">Moyen</td>
                        <td className="py-4 px-6">Faible</td>
                        <td className="py-4 px-6">Élevé</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-6 font-medium text-[#0E2A33]">Durée de vie estimée</td>
                        <td className="py-4 px-6">30-40 ans</td>
                        <td className="py-4 px-6">20-25 ans</td>
                        <td className="py-4 px-6">40+ ans</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 3 */}
              <div className="pt-8 mt-24 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
                  3 contextes, 3 choix différents
                </h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 border-t-4 border-[#E2FD48] p-8 shadow-sm relative">
                    <div className="w-10 h-10 rounded-full bg-[#E2FD48] flex items-center justify-center text-[#0E2A33] font-black text-sm absolute -top-5 left-6">
                      01
                    </div>
                    <h3 className="text-base font-bold text-[#0E2A33]">Façade urbaine</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold">Matériau&nbsp;:</span> Aluminium thermolaqué
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      <span className="font-semibold">Pourquoi&nbsp;:</span> Légèreté, liberté de formes et large choix de coloris RAL pour
                      s&apos;adapter aux chartes architecturales.
                    </p>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 border-t-4 border-[#E2FD48] p-8 shadow-sm relative">
                    <div className="w-10 h-10 rounded-full bg-[#E2FD48] flex items-center justify-center text-[#0E2A33] font-black text-sm absolute -top-5 left-6">
                      02
                    </div>
                    <h3 className="text-base font-bold text-[#0E2A33]">Façade maritime</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold">Matériau&nbsp;:</span> Aluminium traitement Seaside ou inox 316L
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      <span className="font-semibold">Pourquoi&nbsp;:</span> Résistance à la corrosion filiforme en zone littorale et
                      tenue longue durée face aux embruns salins.
                    </p>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 border-t-4 border-[#E2FD48] p-8 shadow-sm relative">
                    <div className="w-10 h-10 rounded-full bg-[#E2FD48] flex items-center justify-center text-[#0E2A33] font-black text-sm absolute -top-5 left-6">
                      03
                    </div>
                    <h3 className="text-base font-bold text-[#0E2A33]">Structure industrielle</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold">Matériau&nbsp;:</span> Acier galvanisé prélaqué (nuance S320GD)
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      <span className="font-semibold">Pourquoi&nbsp;:</span> Rigidité, coût maîtrisé et adaptation aux grandes portées des
                      bâtiments logistiques.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="pt-8 mt-24 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
                  Ce que ça change sur le traitement de surface
                </h2>
                <p className="text-base mb-12">
                  Le substrat choisi conditionne directement le process de thermolaquage (application d&apos;une poudre polymérisée pour
                  protéger et teinter la pièce). L&apos;aluminium accepte les épaisseurs les plus fines, autour de 45&nbsp;microns, tandis que
                  l&apos;acier exige une préparation plus lourde pour éviter la corrosion sous film. La
                  <button
                    onClick={() => setCurrentPage('home')}
                    className="underline underline-offset-4 decoration-[#6B7280] hover:decoration-[#0E2A33] font-semibold text-[#0E2A33] mx-1"
                  >
                    certification QUALICOAT
                  </button>
                  (label européen de qualité du thermolaquage) impose des protocoles différents selon le métal de base, un process
                  industriel que vous pouvez observer en détail sur notre{' '}
                  <button
                    onClick={() => setCurrentPage('expertises')}
                    className="underline underline-offset-4 decoration-[#6B7280] hover:decoration-[#0E2A33] font-semibold text-[#0E2A33]"
                  >
                    page Expertises
                  </button>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* PHOTO PRODUIT PLIALU */}
          <section className="bg-white pb-12" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-4xl mx-auto mt-12">
                <img
                  src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773674033/Article1-1200px_fq9vgq.webp"
                  srcSet="
                    https://res.cloudinary.com/dyiup6v5x/image/upload/v1773674033/Article1-800px_rrm7j2.webp 800w,
                    https://res.cloudinary.com/dyiup6v5x/image/upload/v1773674033/Article1-1200px_fq9vgq.webp 1200w,
                    https://res.cloudinary.com/dyiup6v5x/image/upload/v1773674033/Article1-1600px_aj9jzf.webp 1600w
                  "
                  sizes="(max-width: 768px) 800px, (max-width: 1200px) 1200px, 1600px"
                  alt="Pièces métalliques pliées sur mesure en atelier — façonnage PLIALU"
                  loading="lazy"
                  className="w-full h-64 object-cover rounded-2xl mt-12"
                />
              </div>
            </div>
          </section>

          {/* SECTION CONTACT BAS DE PAGE */}
          <section className="py-24 bg-[#071318] text-center border-t border-white/5">
            <div className="max-w-3xl mx-auto px-6 space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-white">
                Votre métal est choisi. Place au façonnage.
              </h2>
              <p className="text-base md:text-lg text-white/50">
                Nos techniciens optimisent vos profils et vos coûts dès réception des plans.
              </p>
              <button
                onClick={goContactForm}
                className="px-10 py-4 md:px-12 md:py-5 bg-[#E2FD48] text-[#0E2A33] text-sm font-extrabold rounded-full transition-all shadow-xl hover:shadow-[#E2FD48]/20 hover:-translate-y-1"
              >
                Demander un chiffrage
              </button>
            </div>
          </section>
        </div>
  );
}
