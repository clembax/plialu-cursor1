import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import type { PageKey } from '../seo/seoConfig';

export function RessourcesPage(props: {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageKey>>;
  goContactForm: () => void;
}) {
  const { setCurrentPage, goContactForm } = props;
  return (
        <div className="animate-fade-up">
          {/* Hero Ressources */}
          <section className="bg-white pt-48 md:pt-56 pb-20 min-h-[70vh] flex flex-col justify-center">
            <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-4xl space-y-8">
                <span className="text-[10px] font-extrabold tracking-[0.4em] text-zinc-400 uppercase block">
                  RESSOURCES TECHNIQUES
                </span>
                <h1 className="text-4xl md:text-6xl tracking-tighter leading-[1.1] font-black uppercase text-[#0E2A33]">
                  Centre de ressources PLIALU
                </h1>
                <p className="text-base md:text-lg text-[#0E2A33]/70 max-w-2xl leading-relaxed font-medium">
                  Dossiers techniques et guides pratiques pour éclairer vos choix de matériaux, sécuriser vos décisions de conception et
                  fiabiliser vos chantiers en enveloppe et habillage métallique.
                </p>
                <a
                  href="#dossiers"
                  onClick={(e) => { e.preventDefault(); document.getElementById('dossiers')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="inline-flex items-center gap-2 w-full sm:w-auto px-12 py-4 bg-[#0E2A33] text-white text-sm font-extrabold rounded-full transition-all shadow-lg hover:shadow-2xl"
                >
                  Accéder aux dossiers complets
                  <ArrowDown aria-hidden="true" size={18} />
                </a>
              </div>
            </div>
          </section>

          {/* Cards des 3 dossiers principaux */}
          <section id="dossiers" className="py-24 bg-[#F3F6F7] border-t border-zinc-200 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-16 max-w-3xl">
                <span className="text-[10px] font-extrabold tracking-[0.3em] text-[#0E2A33]/40 uppercase mb-4 block">
                  DOSSIERS TECHNIQUES
                </span>
                <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
                  3 articles pour structurer vos choix techniques
                </h2>
                <p className="text-base md:text-lg text-[#0E2A33]/70 leading-relaxed font-medium">
                  Chaque ressource reprend en détail les notions clés évoquées sur la page d’accueil : choix des alliages, contraintes
                  de façades aluminium et performances du thermolaquage QUALICOAT en environnement réel.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    id: 'ressource-1',
                    tag: 'CHOIX DES MATÉRIAUX',
                    title: "Choisir le bon métal pour une façade extérieure",
                    excerpt:
                      "Comprendre les différences de comportement, de tenue à la corrosion et de maintenance pour choisir la bonne matière en habillage de façade.",
                    readingTime: '5 minutes de lecture'
                  },
                  {
                    id: 'ressource-2',
                    tag: 'CONCEPTION FAÇADE',
                    title: "Pliage aluminium pour façade : limites et tolérances",
                    excerpt:
                      "Découvrez comment maîtriser le pliage aluminium pour façade en anticipant la dilatation thermique, le choix des alliages et le thermolaquage QUALICOAT.",
                    readingTime: '5 minutes de lecture'
                  },
                  {
                    id: 'ressource-3',
                    tag: 'DURABILITÉ & QUALICOAT',
                    title: "Thermolaquage certifié Qualicoat : garanties",
                    excerpt:
                      "La durabilité d'une façade ne dépend pas que du métal. Découvrez pourquoi le thermolaquage certifié Qualicoat après façonnage est le seul rempart contre la corrosion.",
                    readingTime: '5 minutes de lecture',
                    showQualicoatLogo: true
                  }
                ].map((article) => (
                  <article
                    key={article.id}
                    className="group bg-white rounded-[24px] p-8 flex flex-col border border-zinc-100 shadow-sm transition-all duration-200 ease-out hover:border-2 hover:border-[#E2FD48] hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                    onClick={() => setCurrentPage('home')}
                  >
                    <span className="text-[9px] font-black tracking-[0.3em] text-[#0E2A33]/40 uppercase mb-3">
                      {article.tag}
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-[#0E2A33] tracking-tight mb-4">
                      {article.title}
                    </h3>
                    <p className="text-[#0E2A33]/60 text-sm md:text-base leading-relaxed mb-8">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto pt-6 border-t border-zinc-50 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-[#0E2A33]/30 uppercase">
                        {article.readingTime}
                      </span>
                      <div className="flex items-center gap-2 text-[#0E2A33]/30 group-hover:text-[#0E2A33] transition-colors">
                        <span className="text-[10px] font-bold tracking-[0.18em] uppercase">Lire l’article</span>
                        <ArrowRight aria-hidden="true" size={18} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section className="py-24 bg-[#071318] text-center border-t border-white/5">
            <div className="max-w-3xl mx-auto px-6 space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-white">Passer à la fabrication.</h2>
              <p className="text-base md:text-lg text-white/50">Nos techniciens prennent le relais — avec ou sans plans finalisés.</p>
              <button onClick={goContactForm} className="px-10 py-4 md:px-12 md:py-5 bg-[#E2FD48] text-[#0E2A33] text-sm font-extrabold rounded-full transition-all shadow-xl hover:shadow-[#E2FD48]/20 hover:-translate-y-1">
                Transmettre un dossier
              </button>
            </div>
          </section>
        </div>
  );
}
