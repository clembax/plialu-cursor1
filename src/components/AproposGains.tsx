import React, { useState } from 'react';
import * as DS from './ds/ds';

/* Section "Ce que vous y gagnez" de la page À propos.
   4 engagements : survol ou clic sur un onglet = la photo et le détail changent à droite. */

const CLD = 'https://res.cloudinary.com/dyiup6v5x/image/upload';

const ICONS = {
  delais: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  ),
  mesure: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </svg>
  ),
  reactivite: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  qualite: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="9" r="6" />
      <path d="M8.5 14L7 22l5-3 5 3-1.5-8" />
    </svg>
  ),
};

const ENGAGEMENTS = [
  {
    id: 'delais',
    tab: 'Délais maîtrisés',
    short: 'Engagements tenus, même sur les séries courtes.',
    title: 'Tout est fabriqué sous le même toit',
    text: "Déroulage, thermolaquage, pliage et assemblage se font dans nos ateliers. Aucune étape ne dépend d'un sous-traitant : pas de délai caché entre deux prestataires.",
    chips: ['Process intégré', 'Sans sous-traitance'],
    img: { v: 'v1773075246', s800: 'De%CC%81roulage-800px_qz2nnx.webp', s1200: 'De%CC%81roulage-1200px_e0hd8r.webp', s1600: 'De%CC%81roulage-1600px_plmy5l.webp' },
    alt: "Bobines de métal stockées dans l'atelier PLIALU avant déroulage, façonnage métallique intégré en Rhône-Alpes",
  },
  {
    id: 'mesure',
    tab: 'Pièces sur mesure',
    short: 'Chaque référence fabriquée selon vos plans et tolérances.',
    title: 'Vos plans, vos tolérances',
    text: "Le bureau d'études relit vos plans, conseille la matière et optimise les tolérances avant fabrication. Pièces standard ou sur mesure, selon votre projet.",
    chips: ["Bureau d'études intégré", 'Standard et sur-mesure'],
    img: { v: 'v1773149127', s800: 'Pliage-800px_x24kz6.webp', s1200: 'Pliage-1200px_bl5tzv.webp', s1600: 'Pliage-1600px_yxsdqe.webp' },
    alt: 'Pliage de pièces métalliques sur mesure sur presse plieuse Amada dans l\'atelier PLIALU',
  },
  {
    id: 'reactivite',
    tab: 'Réactivité technique',
    short: 'Un interlocuteur qui connaît votre dossier de bout en bout.',
    title: 'Vous expliquez votre projet une seule fois',
    text: 'Un technicien suit votre dossier de la conception à la livraison. Il connaît vos contraintes de chantier et vous répond directement.',
    chips: ['Interlocuteur unique', 'Réponse sous 48 h'],
    img: { v: 'v1773074223', s800: 'BE-800px_wa43jv.webp', s1200: 'BE-1200px_nzpfpj.webp', s1600: 'BE-1600px_x6mpih.webp' },
    alt: "Technicien du bureau d'études PLIALU analysant des plans de pièces métalliques",
  },
  {
    id: 'qualite',
    tab: 'Traçabilité totale',
    short: 'Norme Qualicoat, contrôle qualité à chaque étape de production.',
    title: 'Qualicoat sur nos deux lignes',
    text: 'Thermolaquage certifié Qualicoat, appliqué sur nos deux lignes Infinimetal, avec contrôle qualité et traçabilité à chaque étape de production.',
    chips: ['Certifié Qualicoat', '2 lignes de thermolaquage'],
    img: { v: 'v1780322264', s800: 'Thermolaquage-800px_rgjdmf.webp', s1200: 'Thermolaquage-1200px_hu9ira.webp', s1600: 'Thermolaquage-1600px_vautk7.webp' },
    alt: 'Ligne de thermolaquage certifiée Qualicoat dans les ateliers PLIALU',
  },
] as const;

export const AproposGains: React.FC = () => {
  const [active, setActive] = useState(0);
  const cur = ENGAGEMENTS[active];

  return (
    <section className={`${DS.SECTION} section--dark`} style={{ background: 'linear-gradient(to bottom, #071318 0%, #0b1e26 100%)' }}>
      <div className={DS.CONTAINER}>
        <div className="mb-14 max-w-3xl">
          <p className={`${DS.EYEBROW_DARK} mb-4`}>Ce que vous y gagnez</p>
          <h2 className={`${DS.H2} text-white`}>Un seul interlocuteur, de l'étude à la livraison</h2>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div className="flex flex-col gap-2.5" role="tablist" aria-label="Nos engagements">
            {ENGAGEMENTS.map((e, i) => {
              const on = i === active;
              return (
                <button
                  key={e.id}
                  type="button"
                  role="tab"
                  id={`gain-tab-${e.id}`}
                  aria-selected={on}
                  aria-controls="gain-panel"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`flex w-full items-start gap-[18px] rounded-[20px] border px-6 py-[22px] text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E2FD48] ${
                    on ? 'border-[#E2FD48]/55 bg-white/[0.06]' : 'border-white/[0.08] bg-transparent hover:border-white/50 hover:bg-white/[0.04]'
                  }`}
                >
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#E2FD48]/[0.08] text-[#E2FD48]">
                    {ICONS[e.id]}
                  </span>
                  <span>
                    <span className="block font-display text-xl font-bold tracking-[-0.02em] text-white">{e.tab}</span>
                    <span className="mt-1.5 block text-sm leading-[1.55] text-white/50">{e.short}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="gain-panel"
            role="tabpanel"
            aria-labelledby={`gain-tab-${cur.id}`}
            className="relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[20px] bg-[#0E2A33] lg:min-h-[560px]"
          >
            {ENGAGEMENTS.map((e, i) => (
              <img
                key={e.id}
                src={`${CLD}/${e.img.v}/${e.img.s1200}`}
                srcSet={`${CLD}/${e.img.v}/${e.img.s800} 800w, ${CLD}/${e.img.v}/${e.img.s1200} 1200w, ${CLD}/${e.img.v}/${e.img.s1600} 1600w`}
                sizes="(max-width: 1024px) 100vw, 680px"
                alt={i === active ? e.alt : ''}
                aria-hidden={i !== active}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${i === active ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,24,0.05)_25%,rgba(7,19,24,0.92)_78%)]" aria-hidden="true" />
            <div className="relative p-7 md:p-9" aria-live="polite">
              <p className={`${DS.EYEBROW_DARK} mb-4`}>{cur.tab}</p>
              <h3 className="mb-3.5 max-w-[520px] font-display text-[26px] font-bold leading-[1.1] tracking-[-0.03em] text-white md:text-[30px]">{cur.title}</h3>
              <p className="mb-6 max-w-[520px] text-base leading-[1.65] text-white/[0.78]">{cur.text}</p>
              <div className="flex flex-wrap gap-2">
                {cur.chips.map((c) => (
                  <span key={c} className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/10 px-3.5 py-2 text-xs font-bold text-white">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E2FD48" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AproposGains;
