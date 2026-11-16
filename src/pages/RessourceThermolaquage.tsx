import { Link } from 'react-router';
import React from 'react';

export function RessourceThermolaquagePage(props: {
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
                  <span>← Retour aux ressources</span>
                </Link>

                <h1 className="text-4xl md:text-5xl font-black text-[#0E2A33] leading-tight mt-20 max-w-3xl mx-auto text-center">
                  Thermolaquage certifié Qualicoat : garanties
                </h1>

                <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto text-center">
                  La durabilité d'une façade métallique ne se joue pas uniquement sur le choix de l'alliage. C'est le traitement de
                  surface qui détermine la résistance réelle du système dans le temps — face aux UV, à l'humidité et aux cycles
                  thermiques. QUALICOAT est la certification internationale qui valide cette performance. PLIALU l'applique sur
                  l'intégralité de sa production thermolaquée, avec une particularité process décisive : le laquage intervient après le
                  façonnage, jamais avant. La performance d'un traitement de surface se décide en phase d'études, pas sur chantier — cet
                  article détaille ce qu'un prescripteur doit exiger et pourquoi.
                </p>

                <div className="relative mt-8">
                  <img
                    srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/f_auto,q_auto,w_800/v1774283296/PLIALU_Juin24_245_G_Perret_vsy4ar.jpg 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/f_auto,q_auto,w_1200/v1774283296/PLIALU_Juin24_245_G_Perret_vsy4ar.jpg 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/f_auto,q_auto,w_1600/v1774283296/PLIALU_Juin24_245_G_Perret_vsy4ar.jpg 1600w"
                    sizes="100vw"
                    src="https://res.cloudinary.com/dyiup6v5x/image/upload/f_auto,q_auto,w_1200/v1774283296/PLIALU_Juin24_245_G_Perret_vsy4ar.jpg"
                    alt="RAL et teintes thermolaquage certifié QUALICOAT"
                    className="w-full h-[500px] object-cover rounded-2xl"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
                    <img
                      src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1771500844/logo_qf_kzo395.png"
                      alt="Certification QUALICOAT"
                      className="h-8 w-auto"
                      loading="lazy"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-400 text-center mt-2">Nuancier RAL — Atelier PLIALU, Rhône-Alpes</p>
              </div>
            </div>
          </section>

          {/* CORPS DE L'ARTICLE */}
          <section className="pt-8 pb-20 bg-white" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="max-w-3xl mx-auto px-6 text-gray-700 leading-relaxed space-y-12">
              <div className="pt-8 mt-8 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">Pourquoi la certification QUALICOAT change tout</h2>
                <p className="text-base mb-6">
                  QUALICOAT est un label de qualité délivré par une association internationale indépendante, basée en Suisse, qui certifie
                  les laqueurs industriels sur aluminium et alliages légers. Le périmètre de certification ne se limite pas à un contrôle
                  visuel de la teinte ou de l'aspect de surface. QUALICOAT impose une validation multidimensionnelle des propriétés
                  physico-chimiques du complexe métal-peinture : adhérence, épaisseur de couche, résistance à la corrosion, stabilité
                  colorimétrique sous exposition UV, et résistance mécanique aux chocs et à l'abrasion.
                </p>
                <p className="text-base mb-6">
                  Chaque laqueur certifié est audité régulièrement. Les paramètres de process — températures de cuisson, durées de
                  polymérisation, concentrations des bains chimiques — sont tracés et contrôlés. Ce niveau d'exigence garantit aux
                  prescripteurs une reproductibilité industrielle du résultat, indépendamment du lot de production ou de la période de
                  fabrication.
                </p>
                <p className="text-base mb-12">
                  Un profilé thermolaqué certifié QUALICOAT n'est pas simplement peint. Il est traité selon un protocole normé dont chaque
                  étape est mesurée, enregistrée et vérifiable.
                </p>
              </div>

              <div className="pt-8 mt-20 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">Post-laquage vs pré-laquage : l'argument PLIALU</h2>
                <p className="text-base mb-6">
                  Dans l'industrie du façonnage métallique, deux approches coexistent pour le laquage des pièces de façade.
                </p>
                <p className="text-base mb-6">
                  Le pré-laquage en bobine (coil coating) consiste à laquer la tôle en continu avant les opérations de découpe et de
                  pliage. C'est un process adapté aux éléments plans de grande série. Ses limites apparaissent dès qu'il y a façonnage.
                  Chaque pli génère des micro-fissures dans le film de peinture sur les arêtes vives et les angles serrés. Les tranches de
                  découpe restent nues — métal brut exposé à l'atmosphère — et constituent des points d'amorce de corrosion. Sur des
                  éléments de façade exposés aux intempéries pendant 20 ou 30 ans, ces défauts ne sont pas cosmétiques : ils sont
                  fonctionnels.
                </p>
                <p className="text-base mb-12">
                  Le post-laquage — la méthode intégrée dans le process PLIALU — inverse la logique. La tôle est d'abord découpée,
                  poinçonnée, pliée et assemblée. Ce n'est qu'une fois la pièce dans sa géométrie définitive que le traitement de surface
                  intervient. Le résultat est un enrobage intégral de la pièce finie : arêtes vives, retours de pli, intérieur des
                  perçages et tranches de découpe sont couverts de manière homogène. La couche de peinture polymérise (durcit par réaction
                  chimique sous chaleur) sur une géométrie stabilisée — aucune contrainte mécanique ultérieure ne vient solliciter le film.
                </p>
                <p className="text-base mb-12">
                  Pour un prescripteur, la différence est nette : le post-laquage supprime les deux faiblesses intrinsèques du pré-laquage
                  sur pièces façonnées et garantit une protection complète sur 100 % de la surface exposée.
                </p>
                <img
                  srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/v1774283604/Postlaquage-800px_azmopo.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1774283603/Postlaquage-1200px_cwuvqo.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1774283604/Postlaquage-1600px_rpy0k2.webp 1600w"
                  sizes="100vw"
                  src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1774283603/Postlaquage-1200px_cwuvqo.webp"
                  alt="Poudrage électrostatique post-laquage thermolaquage certifié QUALICOAT — atelier PLIALU"
                  className="w-full h-[420px] object-cover rounded-2xl"
                  loading="lazy"
                />
                <p className="text-sm text-gray-400 text-center mt-2">
                  Poudrage électrostatique sur pièces façonnées — Atelier PLIALU, Rhône-Alpes
                </p>
              </div>

              <div className="pt-8 mt-20 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">Le processus QUALICOAT : ingénierie de surface</h2>
                <p className="text-base mb-6">
                  Le thermolaquage certifié QUALICOAT est une séquence industrielle en trois phases, où chaque étape conditionne la
                  performance de la suivante.
                </p>
                <p className="text-base mb-2">
                  <strong>Prétraitement chimique</strong>
                </p>
                <p className="text-base mb-6">
                  La surface de l'aluminium est d'abord dégraissée puis dérochée (dissolution de la couche d'oxyde naturel et des
                  impuretés métalliques). Ces deux étapes exposent un substrat propre et réactif. Vient ensuite la conversion chimique
                  Chrome-free : des sels de titane ou de zirconium créent une couche nanométrique entre le substrat et la laque, qui
                  renforce l'adhérence et constitue une barrière anticorrosion supplémentaire.
                </p>
                <p className="text-base mb-2">
                  <strong>Poudrage électrostatique</strong>
                </p>
                <p className="text-base mb-6">
                  La peinture poudre sèche (sans solvant liquide) est projetée par pistolet électrostatique. Les particules chargées se
                  déposent de manière uniforme sur toutes les géométries — retours, angles, cavités. L'épaisseur minimale exigée par
                  QUALICOAT est de 60 microns. Les excédents sont recyclés, et l'absence de solvant rend le procédé peu émissif en COV
                  (Composés Organiques Volatils).
                </p>
                <p className="text-base mb-2">
                  <strong>Polymérisation et réticulation thermique</strong>
                </p>
                <p className="text-base mb-12">
                  La pièce est cuite entre 180 °C et 200 °C pendant une durée contrôlée. La poudre fond, s'étale en film continu, puis
                  polymérise : les chaînes moléculaires se réticulent (créent des liaisons chimiques croisées irréversibles) pour former un
                  revêtement durci et stable. QUALICOAT impose des fenêtres de cuisson strictes pour garantir l'équilibre entre dureté de
                  surface et souplesse résiduelle — nécessaire pour encaisser les dilatations thermiques en façade.
                </p>
              </div>

              <div className="pt-8 mt-20 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">Les protocoles de validation</h2>
                <p className="text-base mb-6">
                  La certification QUALICOAT repose sur des tests normalisés réalisés sur chaque lot de production. Ces protocoles qualifient
                  le comportement physico-chimique du système complet substrat-conversion-peinture.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse mt-6 text-sm">
                    <thead>
                      <tr className="bg-[#0E2A33] text-white">
                        <th className="px-6 py-4 text-left">Test</th>
                        <th className="px-6 py-4 text-left">Ce qu'il garantit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">Test de quadrillage ISO 2409</td>
                        <td className="px-6 py-4">
                          Un quadrillage est incisé dans le film, puis un ruban adhésif normalisé est arraché. La classification Grade 0 est
                          obligatoire : aucun éclat, aucun détachement. Valide l'adhérence entre conversion et laque.
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">Mesure de brillance ISO 2813</td>
                        <td className="px-6 py-4">
                          Contrôle de la rétention de brillance sous UV avec des tolérances strictes par rapport à l'échantillon initial. Une
                          perte excessive signale une dégradation prématurée du liant polymère.
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">Vieillissement accéléré et brouillard salin</td>
                        <td className="px-6 py-4">
                          Exposition en atmosphère corrosive simulant plusieurs années d'intempéries. Valide la tenue du système dans le temps
                          en environnement urbain ou industriel.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <img
                  srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/v1774284080/Thermolaquage-800px_mitqzm.webp 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1774284080/Thermolaquage-1200px_lyexrk.webp 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/v1774284081/Thermolaquage-1600px_pke4oc.webp 1600w"
                  sizes="100vw"
                  src="https://res.cloudinary.com/dyiup6v5x/image/upload/v1774284080/Thermolaquage-1200px_lyexrk.webp"
                  alt="Test de quadrillage ISO 2409 — protocole de validation thermolaquage certifié QUALICOAT atelier PLIALU"
                  className="w-full h-[420px] object-cover rounded-2xl mt-10"
                  loading="lazy"
                />
                <p className="text-sm text-gray-400 text-center mt-2">
                  Test de quadrillage ISO 2409 — Contrôle qualité PLIALU, Rhône-Alpes
                </p>
              </div>

              <div className="pt-8 mt-20 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">Classes de poudres : durabilité UV</h2>
                <p className="text-base mb-6">
                  Le choix de la classe de poudre détermine la stabilité colorimétrique (maintien de la teinte RAL d'origine) et la
                  rétention de brillance sur la durée d'exposition aux UV. C'est un paramètre à intégrer dès la rédaction du CCTP (Cahier
                  des Clauses Techniques Particulières, document contractuel qui définit les exigences techniques du marché) — pas en fin de
                  projet lorsque les arbitrages budgétaires ont déjà été faits.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse mt-6 text-sm">
                    <thead>
                      <tr className="bg-[#0E2A33] text-white">
                        <th className="px-6 py-4 text-left">Classe</th>
                        <th className="px-6 py-4 text-left">Durabilité UV</th>
                        <th className="px-6 py-4 text-left">Usage recommandé</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">Classe 1</td>
                        <td className="px-6 py-4">
                          Poudres standards, testées 1 an d'exposition naturelle (ISO 2810, protocole Florida).
                        </td>
                        <td className="px-6 py-4">
                          Projets courants, éléments peu exposés aux UV directs : façades nord, éléments protégés par des débords.
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">Classe 2</td>
                        <td className="px-6 py-4">
                          Poudres Super Durables, testées 3 ans. Rétention de brillance et stabilité colorimétrique nettement supérieures.
                        </td>
                        <td className="px-6 py-4">
                          Façades exposées, orientations sud et ouest, bâtiments tertiaires, ERP, équipements publics. Recommandé par défaut
                          pour tout élément de façade visible.
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium text-[#0E2A33]">Classe 3</td>
                        <td className="px-6 py-4">
                          Poudres Ultra Durables, niveau d'exigence maximal. Performances validées pour les conditions d'exposition les plus
                          sévères.
                        </td>
                        <td className="px-6 py-4">
                          Environnements extrêmes : altitude, zones industrielles à forte concentration de polluants atmosphériques.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-8 mt-20 border-t border-gray-100">
                <h2 className="mt-0 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">Ce qu'un prescripteur doit exiger</h2>
                <p className="text-base mb-6">Quatre points à verrouiller dans le cahier des charges.</p>
                <p className="text-base mb-6">
                  <strong>Exiger des poudres de Classe 2 minimum sur toutes les façades sollicitées par les UV.</strong> La Classe 1 peut
                  montrer une dérive colorimétrique visible après quelques années sur une orientation sud ou ouest fortement exposée. Le
                  surcoût de la Classe 2 est marginal rapporté à la durée de vie du bâtiment.
                </p>
                <p className="text-base mb-6">
                  <strong>Privilégier systématiquement le post-laquage après façonnage pour les éléments exposés.</strong> Le pré-laquage est
                  un compromis acceptable sur des pièces planes non découpées. Dès qu'il y a pliage, perçage ou assemblage, le post-laquage
                  est le seul process qui garantit un enrobage intégral sans zone de fragilité.
                </p>
                <p className="text-base mb-6">
                  <strong>Vérifier la traçabilité des certificats du laqueur.</strong> Un laqueur certifié QUALICOAT doit fournir, pour
                  chaque lot, les paramètres de cuisson, les résultats des tests d'adhérence ISO 2409 et les contrôles d'épaisseur de
                  couche. Si ces données ne sont pas disponibles sur demande, la certification n'a aucune valeur opérationnelle.
                </p>
                <p className="text-base mb-12">
                  <strong>Associer le choix du métal et de la référence RAL au traitement de surface dès la phase d'études.</strong>{' '}
                  L'alliage, l'épaisseur, la teinte RAL, la classe de poudre et le process de laquage forment un système. Spécifier l'un
                  sans l'autre revient à dimensionner une structure sans connaître les charges.
                </p>
              </div>
            </div>
          </section>

          {/* PHOTO PRODUIT PLIALU */}
          <section className="bg-white pb-12" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-4xl mx-auto mt-12">
                <img
                  srcSet="https://res.cloudinary.com/dyiup6v5x/image/upload/f_auto,q_auto,w_800/v1774284198/PLIALU_Juin24_280_G_Perret_kcw5mi.jpg 800w, https://res.cloudinary.com/dyiup6v5x/image/upload/f_auto,q_auto,w_1200/v1774284198/PLIALU_Juin24_280_G_Perret_kcw5mi.jpg 1200w, https://res.cloudinary.com/dyiup6v5x/image/upload/f_auto,q_auto,w_1600/v1774284198/PLIALU_Juin24_280_G_Perret_kcw5mi.jpg 1600w"
                  sizes="100vw"
                  src="https://res.cloudinary.com/dyiup6v5x/image/upload/f_auto,q_auto,w_1200/v1774284198/PLIALU_Juin24_280_G_Perret_kcw5mi.jpg"
                  alt="Contrôle qualité thermolaquage certifié QUALICOAT — mesure épaisseur et certificat laqueur PLIALU"
                  className="w-full h-64 object-cover rounded-2xl mt-12"
                  loading="lazy"
                />
                <p className="text-sm text-gray-400 text-center mt-2">
                  Contrôle d'épaisseur de couche et traçabilité par lot — Atelier PLIALU, Rhône-Alpes
                </p>
              </div>
            </div>
          </section>

          {/* SECTION CONTACT BAS DE PAGE */}
          <section className="py-24 bg-[#071318] text-center border-t border-white/5">
            <div className="max-w-3xl mx-auto px-6 space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-white">
                Votre prochain projet. Thermolaquage certifié QUALICOAT inclus.
              </h2>
              <p className="text-base md:text-lg text-white/50">
                Post-laquage après façonnage, traçabilité par lot, certificats disponibles sur demande.
              </p>
              <button
                onClick={goContactForm}
                className="px-10 py-4 md:px-12 md:py-5 bg-[#E2FD48] text-[#0E2A33] text-sm font-extrabold rounded-full transition-all shadow-xl hover:shadow-[#E2FD48]/20 hover:-translate-y-1"
              >
                Demander un devis
              </button>
            </div>
          </section>
        </div>
  );
}
