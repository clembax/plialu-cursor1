import { Link } from 'react-router';
import React from 'react';

export function RessourcePliagePage(props: {
  goContactForm: () => void;
}) {
  const { goContactForm } = props;
  return (
        <div className="animate-fade-up bg-white" style={{ backgroundColor: '#FFFFFF' }}>
          {/* HERO ARTICLE */}
          <section className="pt-32 md:pt-40 pb-12 bg-white" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="max-w-5xl mx-auto px-6">
              <div className="w-full">
                <Link to="/"
                  
                  className="flex items-center gap-2 text-sm font-semibold text-[#0E2A33] hover:text-[#E2FD48] cursor-pointer mb-8 uppercase tracking-widest"
                >
                  <span>← RETOUR AUX RESSOURCES</span>
                </Link>

                <h1 className="text-4xl md:text-5xl font-black text-[#0E2A33] leading-tight mt-20 max-w-3xl mx-auto text-center text-balance">
                  Pliage aluminium : limites et tolérances
                </h1>

                <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto text-center">
                  Épaisseur, rayon de pliage, angle cible — trois paramètres qui déterminent si une pièce aluminium sera précise,
                  durable, ou à refaire. Ce guide vous explique ce que votre fabricant doit maîtriser avant même de démarrer la
                  production.
                </p>

                <img
                  src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773679861/Article2hero-1600px_ny59xx.webp"
                  srcSet="
                    https://res.cloudinary.com/dyiup6v5x/image/upload/v1773679860/Article2hero-800px_wpy72f.webp 800w,
                    https://res.cloudinary.com/dyiup6v5x/image/upload/v1773679860/Article2hero-1200px_k7lnyr.webp 1200w,
                    https://res.cloudinary.com/dyiup6v5x/image/upload/v1773679861/Article2hero-1600px_ny59xx.webp 1600w
                  "
                  sizes="100vw"
                  alt="Presse plieuse CNC en action — Atelier PLIALU"
                  className="w-full h-[500px] object-cover rounded-2xl mt-8"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          {/* CORPS DE L'ARTICLE */}
          <section className="pt-8 pb-20 bg-white" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="max-w-3xl mx-auto px-6 text-gray-700 leading-relaxed space-y-12">
              {/* Section 1 */}
              <div className="pt-8 mt-8 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33] text-balance">
                  Pourquoi l&apos;aluminium est le métal de référence en pliage
                </h2>
                <p className="text-base mb-12">
                  L&apos;aluminium combine légèreté (2,7 g/cm³ — 3 fois plus léger que l&apos;acier), malléabilité et résistance naturelle à la
                  corrosion. Ces propriétés en font le substrat (matériau de base) privilégié pour le façonnage de précision en enveloppe
                  du bâtiment. Attention&nbsp;: toutes les nuances d&apos;aluminium ne se comportent pas de la même façon au pliage — la nuance
                  1050 est plus souple, la 5754 plus rigide et résistante en milieu marin. Le choix de la nuance dépend aussi du contexte
                  du projet — un sujet que nous détaillons dans notre{' '}
                  <Link to="/"
                    
                    className="underline underline-offset-4 decoration-[#6B7280] hover:decoration-[#0E2A33] font-semibold text-[#0E2A33]"
                  >
                    guide sur le choix du métal de façade
                  </Link>
                  .
                </p>
              </div>

              {/* Section 2 */}
              <div className="pt-8 mt-20 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33] text-balance">
                  Les 3 paramètres techniques d&apos;un pliage réussi
                </h2>
                <p className="text-base mb-12">
                  Pour obtenir une pièce conforme aux plans, trois paramètres doivent être maîtrisés simultanément. L&apos;épaisseur de la tôle
                  détermine la rigidité de la pièce finale et les capacités machines nécessaires. Le rayon intérieur de pliage est la
                  distance minimale entre les deux faces pliées — en dessous d&apos;un seuil critique, la face externe de l&apos;angle se craquelle.
                  L&apos;angle de pliage cible, enfin, doit tenir compte du retour élastique (springback)&nbsp;: phénomène par lequel la tôle reprend
                  légèrement sa forme initiale une fois la pression de la presse relâchée. Une presse plieuse CNC (Commande Numérique par
                  Calculateur) compense automatiquement ce retour élastique en sur-pliant légèrement la pièce avant relâchement.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse mt-6 text-sm">
                    <thead>
                      <tr className="bg-[#0E2A33] text-white">
                        <th className="px-6 py-4 text-left">Épaisseur</th>
                        <th className="px-6 py-4 text-left">Rayon mini intérieur</th>
                        <th className="px-6 py-4 text-left">Angle mini réalisable</th>
                        <th className="px-6 py-4 text-left">Usage typique</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">1 mm</td>
                        <td className="px-6 py-4">1,5 mm</td>
                        <td className="px-6 py-4">15°</td>
                        <td className="px-6 py-4">Habillage léger, sous-faces</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">1,5 mm</td>
                        <td className="px-6 py-4">2 mm</td>
                        <td className="px-6 py-4">25°</td>
                        <td className="px-6 py-4">Bardage, cassettes façade</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">2 mm</td>
                        <td className="px-6 py-4">3 mm</td>
                        <td className="px-6 py-4">30°</td>
                        <td className="px-6 py-4">Profils structurels, cadres</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">3 mm</td>
                        <td className="px-6 py-4">4,5 mm</td>
                        <td className="px-6 py-4">45°</td>
                        <td className="px-6 py-4">Pièces techniques, renforts</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">4-5 mm</td>
                        <td className="px-6 py-4">6 mm</td>
                        <td className="px-6 py-4">60°</td>
                        <td className="px-6 py-4">Éléments porteurs lourds</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-sm text-gray-400 italic mt-3">
                    * Valeurs indicatives — nous consulter pour votre projet.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="pt-8 mt-20 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33] text-balance">
                  Tolérance ±0,3 mm : ce que ça change sur chantier
                </h2>
                <p className="text-base mb-12">
                  La tolérance de pliage (précision géométrique du façonnage) de ±0,3&nbsp;mm obtenue par presse plieuse CNC (Commande
                  Numérique par Calculateur) garantit la régularité des joints entre cassettes, l&apos;étanchéité à l&apos;air et à l&apos;eau
                  de l&apos;enveloppe, et l&apos;absence de reprises en pose. Sans cette précision, les désaffleurs (décalages visibles entre deux
                  pièces adjacentes) compromettent l&apos;aspect final et génèrent des retouches coûteuses sur chantier. C&apos;est pourquoi nos
                  presses plieuses CNC sont étalonnées quotidiennement et chaque série fait l&apos;objet d&apos;un contrôle dimensionnel avant
                  expédition.
                </p>
              </div>

              {/* Section 4 */}
              <div className="pt-8 mt-20 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33] text-balance">
                  3 limites techniques à anticiper en phase d&apos;étude
                </h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 border-t-4 border-[#E2FD48] p-8 shadow-sm relative">
                    <div className="w-10 h-10 rounded-full bg-[#E2FD48] flex items-center justify-center text-[#0E2A33] font-black text-sm absolute -top-5 left-6">
                      01
                    </div>
                    <h3 className="text-base font-bold text-[#0E2A33]">Épaisseur maximale</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Au-delà de 4&nbsp;mm, le pliage aluminium exige des presses de très haute capacité. Au-delà de 6&nbsp;mm, on bascule sur
                      de l&apos;usinage (fraisage) plutôt que du pliage — un process différent, un délai et un coût différents.
                    </p>
                  </div>

                  <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 border-t-4 border-[#E2FD48] p-8 shadow-sm relative">
                    <div className="w-10 h-10 rounded-full bg-[#E2FD48] flex items-center justify-center text-[#0E2A33] font-black text-sm absolute -top-5 left-6">
                      02
                    </div>
                    <h3 className="text-base font-bold text-[#0E2A33]">Rayon trop serré</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Un rayon intérieur inférieur à l&apos;épaisseur de la tôle génère des micro-craquelures sur la face externe, invisibles
                      à l&apos;œil nu mais fragilisant la tenue du revêtement sur le long terme.
                    </p>
                  </div>

                  <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 border-t-4 border-[#E2FD48] p-8 shadow-sm relative">
                    <div className="w-10 h-10 rounded-full bg-[#E2FD48] flex items-center justify-center text-[#0E2A33] font-black text-sm absolute -top-5 left-6">
                      03
                    </div>
                    <h3 className="text-base font-bold text-[#0E2A33]">Retour élastique</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Quand la presse relâche la pression, la tôle reprend légèrement sa forme initiale — c&apos;est le springback.
                      Si ce phénomène n&apos;est pas intégré dans la programmation CNC, l&apos;angle final ne correspond pas aux plans.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="pt-8 mt-20 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33] text-balance">
                  Comment la qualité du pliage conditionne le thermolaquage
                </h2>
                <p className="text-base mb-12">
                  Une surface craquelée ou géométriquement imprécise ne permet pas une accroche homogène de la poudre polymérisée.
                  Résultat&nbsp;: décollements locaux, taches d&apos;oxydation sous revêtement, et impossibilité d&apos;obtenir la certification
                  QUALICOAT (label européen de qualité du thermolaquage) sur la pièce concernée. Découvrez{' '}
                  <Link to="/"
                    
                    className="underline underline-offset-4 decoration-[#6B7280] hover:decoration-[#0E2A33] font-semibold text-[#0E2A33]"
                  >
                    les protocoles exacts que la certification QUALICOAT impose sur la préparation de surface
                  </Link>
                  , et comment s&apos;inscrit{' '}
                  <Link to="/expertises"
                    
                    className="underline underline-offset-4 decoration-[#6B7280] hover:decoration-[#0E2A33] font-semibold text-[#0E2A33]"
                  >
                    notre process de thermolaquage intégré en atelier
                  </Link>
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
                  src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1773679861/Article2-1600px_kkmsjf.webp"
                  srcSet="
                    https://res.cloudinary.com/dyiup6v5x/image/upload/v1773679860/Article2-800px_gjokka.webp 800w,
                    https://res.cloudinary.com/dyiup6v5x/image/upload/v1773679861/Article2-1200px_u1bj5c.webp 1200w,
                    https://res.cloudinary.com/dyiup6v5x/image/upload/v1773679861/Article2-1600px_kkmsjf.webp 1600w
                  "
                  sizes="100vw"
                  alt="Pièces aluminium pliées — Atelier PLIALU, Rhône-Alpes"
                  className="w-full h-64 object-cover rounded-2xl mt-12"
                  loading="lazy"
                />
                <p className="text-sm text-gray-400 text-center mt-2">
                  Pièces aluminium pliées — Atelier PLIALU, Rhône-Alpes
                </p>
              </div>
            </div>
          </section>

          {/* SECTION CONTACT BAS DE PAGE */}
          <section className="py-24 bg-[#071318] text-center border-t border-white/5">
            <div className="max-w-3xl mx-auto px-6 space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-white text-balance">
                ±0,3 mm garanti. Sur votre prochaine commande aussi.
              </h2>
              <p className="text-base md:text-lg text-white/50">
                Presse plieuse CNC étalonnée quotidiennement. Contrôle dimensionnel systématique avant expédition.
              </p>
              <button
                onClick={goContactForm}
                className="px-10 py-4 md:px-12 md:py-5 bg-[#E2FD48] text-[#0E2A33] text-sm font-extrabold rounded-full transition-all shadow-xl hover:shadow-[#E2FD48]/20 hover:-translate-y-1"
              >
                Soumettre mes plans
              </button>
            </div>
          </section>
        </div>
  );
}
