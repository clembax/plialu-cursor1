import React, { useEffect, useRef, useState } from 'react';
import * as DS from './ds/ds';
import { FORMSUBMIT_URL } from '../config/forms';

/* -------------------------------------------------------------------------- */
/*  Page produit : Goutte d'eau extrudée (URL /goutte-eau-extrudee)           */
/*  Rend uniquement le contenu de la page. Header, pied de page et bandeau    */
/*  cookies restent gérés par App.tsx.                                         */
/* -------------------------------------------------------------------------- */

/* Même boîte que le formulaire Contact. Les demandes sont identifiées par le
   champ intention. */

const PDF_URL = '/documents/Fiche_Goutte_eau_extrudee.pdf';
const PDF_DOWNLOAD_NAME = 'Fiche_Goutte_eau_extrudee_PLIALU.pdf';
const RAL_URL = '/documents/Catalogue_RAL.pdf';

/* ------------------------------- Images ----------------------------------- */
const CLD = 'https://res.cloudinary.com/dyiup6v5x/image/upload';
type Img = { v: string; file: string; t?: string };
const IMG = {
  profil: { v: 'v1794245866', file: 'profil_piyucu.webp', t: 'c_crop,x_0,y_233,w_2247,h_2025' },
  profilHero: { v: 'v1794245866', file: 'profil_piyucu.webp', t: 'c_crop,x_0,y_233,w_2247,h_2025/a_hflip' },
  pose: { v: 'v1794238459', file: 'Generated_Image_October_07_2026_-_5_34PM_qno64i.webp' },
  angleSortant: { v: 'v1794245864', file: 'angle_sortant_ptazks.webp', t: 'c_crop,x_323,y_301,w_1726,h_2114' },
  angleRentrant: { v: 'v1794245863', file: 'angle_rentrant_q1hv5o.webp', t: 'c_crop,x_255,y_869,w_2066,h_839' },
  plan: { v: 'v1794238460', file: '9f79f125-cfb1-4963-881e-63f61e75de7a_sscxit.webp' },
  avec: { v: 'v1794235010', file: '9cd7d856-180e-4fc2-bf46-7c3f938dfa8f_dj4zga.webp' },
  sans: { v: 'v1794238126', file: 'Generated_Image_November_09_2026_-_3_31PM_1_nkaa7q.webp' },
  mockup: { v: 'v1794240588', file: 'Fiche_Goutte_eau_mockup_k6behd.webp' },
} satisfies Record<string, Img>;
const LOGO_INFINIMETAL_NOIR = `${CLD}/f_auto,q_auto,w_240/v1780588809/infini_noir_f4v6lv.png`;

const cld = (i: Img, w: number) => `${CLD}/${i.t ? `${i.t}/` : ''}f_auto,q_auto,c_limit,w_${w}/${i.v}/${i.file}`;
const srcSetOf = (i: Img) => `${cld(i, 800)} 800w, ${cld(i, 1200)} 1200w, ${cld(i, 1600)} 1600w`;

/* ------------------------------ Analytics --------------------------------- */
const track = (name: string, params: Record<string, unknown>) => {
  try {
    (window as any).gtag?.('event', name, params);
  } catch {
    /* l'analytics ne doit jamais bloquer la page */
  }
};

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* -------------------------------- Données --------------------------------- */
const SPEC_ROWS = [
  { k: 'Matière', v: 'Aluminium extrudé' },
  { k: 'Épaisseur', v: '15/10' },
  { k: 'Dimensions', v: '45 × 22 mm' },
  { k: 'Longueur', v: '3 m' },
  { k: 'Perçage', v: 'Ø6, entraxe 560 mm, à 100 mm des extrémités' },
  { k: "Joint d'étanchéité", v: 'Collé sur le profil en atelier' },
  { k: 'Finitions', v: 'Brute, anodisée, laquée' },
  { k: 'Accessoires', v: 'Éclisses, angles monoblocs, bouchons' },
];

const PDF_CONTENT = [
  'Sans et avec profil',
  'Plan de coupe et caractéristiques',
  'Mise en œuvre et angles',
  'Accessoires et finitions',
];

const QTY_ITEMS = [
  { key: 'profils', name: "Profils goutte d'eau", hint: 'Longueur 3 m' },
  { key: 'angles_sortants', name: 'Angles sortants', hint: 'Monoblocs, façonnés en atelier' },
  { key: 'angles_rentrants', name: 'Angles rentrants', hint: 'Monoblocs, façonnés en atelier' },
  { key: 'eclisses', name: 'Éclisses de jonction', hint: 'Une par raccord entre deux longueurs' },
  { key: 'bouchons', name: 'Bouchons', hint: 'Droits et gauches, disponibles sur demande' },
] as const;
type QtyKey = (typeof QTY_ITEMS)[number]['key'];

const FINISHES = [
  { id: 'brut', name: 'Brute', desc: 'Aluminium non traité' },
  { id: 'anodise', name: 'Anodisée', desc: 'Aspect satiné mat' },
  { id: 'laque', name: 'Laquée', desc: 'Teinte RAL au choix' },
] as const;
type FinishId = (typeof FINISHES)[number]['id'];

const plural = (n: number, one: string, many: string) => `${n} ${n > 1 ? many : one}`;

/* ------------------------------ Styles communs ---------------------------- */
const GRADIENT_DARK = 'bg-[linear-gradient(180deg,#071318_0%,#0B1E26_100%)]';
const INPUT =
  'w-full min-h-[50px] rounded-xl border bg-white px-4 py-3.5 font-sans text-[15px] text-[#0E2A33] placeholder:text-[#0E2A33]/40 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#0E2A33]';
const inputBorder = (hasError: boolean) => (hasError ? 'border-[#B4232A]' : 'border-[#0E2A33]/[0.22]');
const STEP_BTN =
  'flex h-11 w-11 items-center justify-center rounded-full border border-[#0E2A33]/20 bg-white text-xl font-semibold text-[#0E2A33] transition-colors duration-150 hover:border-[#0E2A33] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E2A33]';
const NO_SPINNER =
  '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);

/* ----------------------------- Champ de formulaire ------------------------ */
const Field: React.FC<{
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id, label, required, error, className, children }) => (
  <div className={className}>
    <label htmlFor={id} className="mb-2 block text-[13px] font-bold text-[#0E2A33]">
      {label} {required && <b className="font-bold text-[#B4232A]" aria-hidden="true">*</b>}
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} role="alert" className="mt-2 text-[13px] font-semibold text-[#B4232A]">
        {error}
      </p>
    )}
  </div>
);

/* ========================================================================== */
type Props = { setCurrentPage: (page: any) => void };

export const GoutteEauExtrudee: React.FC<Props> = ({ setCurrentPage }) => {
  const [split, setSplit] = useState(50);

  const [touched, setTouched] = useState(false);
  const [demo, setDemo] = useState(false);
  const cmpRef = useRef<HTMLDivElement>(null);
  const demoTimers = useRef<number[]>([]);

  /* Démo automatique du curseur à l'arrivée sur le bloc (une seule fois) */
  useEffect(() => {
    const el = cmpRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        setDemo(true);
        const steps: [number, number][] = [[400, 25], [1500, 75], [2600, 50]];
        steps.forEach(([t, v]) => demoTimers.current.push(window.setTimeout(() => setSplit(v), t)));
        demoTimers.current.push(window.setTimeout(() => setDemo(false), 3400));
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      demoTimers.current.forEach(clearTimeout);
    };
  }, []);

  const stopDemo = () => {
    demoTimers.current.forEach(clearTimeout);
    demoTimers.current = [];
    setDemo(false);
    setTouched(true);
  };
  const [qty, setQty] = useState<Record<QtyKey, number>>({
    profils: 0,
    angles_sortants: 0,
    angles_rentrants: 0,
    eclisses: 0,
    bouchons: 0,
  });
  const [finish, setFinish] = useState<FinishId>('brut');
  const [ral, setRal] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const sendingRef = useRef(false);

  const setQtyValue = (key: QtyKey, raw: number | string) => {
    const n = typeof raw === 'number' ? raw : parseInt(raw, 10);
    setQty((q) => ({ ...q, [key]: Number.isNaN(n) || n < 0 ? 0 : n }));
  };

  /* Récapitulatif */
  const recapLines: string[] = [];
  if (qty.profils > 0) recapLines.push(`${plural(qty.profils, 'profil de 3 m', 'profils de 3 m')}, soit ${qty.profils * 3} m linéaires`);
  if (qty.angles_sortants > 0) recapLines.push(plural(qty.angles_sortants, 'angle sortant', 'angles sortants'));
  if (qty.angles_rentrants > 0) recapLines.push(plural(qty.angles_rentrants, 'angle rentrant', 'angles rentrants'));
  if (qty.eclisses > 0) recapLines.push(plural(qty.eclisses, 'éclisse de jonction', 'éclisses de jonction'));
  if (qty.bouchons > 0) recapLines.push(plural(qty.bouchons, 'bouchon', 'bouchons'));
  const ralClean = ral.trim();
  const finishLabel =
    finish === 'brut' ? 'Brute' : finish === 'anodise' ? 'Anodisée' : `Laquée ${ralClean || '(RAL à préciser)'}`;
  const recapText = [...recapLines, `Finition : ${finishLabel}`].join(' · ');
  const barText =
    (qty.profils > 0 ? `${plural(qty.profils, 'profil', 'profils')} · ${qty.profils * 3} m` : 'Aucun profil') +
    ` · ${finishLabel}`;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? '').trim();
    const next: Record<string, string> = {};
    if (qty.profils < 1) next.profils = 'Ajoutez au moins un profil pour envoyer la demande.';
    if (finish === 'laque' && !ralClean) next.ral = 'Indiquez la teinte RAL souhaitée.';
    if (!get('company')) next.company = 'Indiquez votre société.';
    if (!get('name')) next.name = 'Indiquez votre prénom et votre nom.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get('email'))) next.email = 'Indiquez un email professionnel valide.';
    if (!get('phone')) next.phone = 'Indiquez un numéro de téléphone.';
    if (!get('postal_code')) next.postal_code = 'Indiquez le code postal du chantier ou de livraison.';

    const firstKey = Object.keys(next)[0];
    if (firstKey) {
      e.preventDefault();
      setErrors(next);
      document.getElementById(`cmd-${firstKey}`)?.focus();
      return;
    }
    if (sendingRef.current) {
      e.preventDefault();
      return;
    }
    setErrors({});
    track('generate_lead', {
      form_id: 'commande_goutte_eau',
      profils: qty.profils,
      finition: finish,
      transport_type: 'beacon',
    });
    sendingRef.current = true;
    setSending(true);
  };

  return (
    <main>
      {/* ============================ 1. HERO ============================ */}
      <section className={`${GRADIENT_DARK} relative overflow-hidden text-white pt-28 md:pt-32`}>
        <div className={DS.CONTAINER}>
          <nav aria-label="Fil d'Ariane" className="mb-6 flex flex-wrap gap-2.5 text-[13px] text-white/50">
            <button
              type="button"
              onClick={() => setCurrentPage('solutions-temporaire')}
              className="font-semibold text-white/80 transition-colors duration-150 hover:text-white"
            >
              Solutions
            </button>
            <span aria-hidden="true">›</span>
            <span>Ravalement de façade</span>
            <span aria-hidden="true">›</span>
            <span aria-current="page" className="font-semibold text-white">
              Goutte d'eau extrudée
            </span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div>
              <div className="mb-7 flex flex-wrap items-center gap-3.5">
                <span className={DS.EYEBROW_DARK}>Solutions pour le ravalement de façade</span>
              </div>
              <h1 className={`${DS.H1_DETAIL} mb-6 text-white`}>
                <span className="block">Goutte d'eau</span>
                <span className="block">extrudée</span>
              </h1>
              <p className={`${DS.LEAD_DARK} mb-11`}>
                Finition de nez de dalle, laquée en interne, livrée en 3 mètres.
              </p>
              <div className="grid w-full gap-3.5 sm:w-fit xl:grid-cols-2">
                <button type="button" onClick={() => scrollToId('commande')} className={`${DS.BTN_PRIMARY} w-full justify-center`}>
                  Faire une demande de commande
                </button>
                <button type="button" onClick={() => scrollToId('fiche-technique')} className={`${DS.BTN_SECONDARY_DARK} w-full justify-center`}>
                  Télécharger la fiche technique
                </button>
              </div>
            </div>

            <div className="relative lg:h-[min(520px,calc(100vh-200px))]">
              <img
                src={cld(IMG.profilHero, 1200)}
                srcSet={srcSetOf(IMG.profilHero)}
                sizes="100vw"
                alt="Rendu 3D du profil goutte d'eau extrudée, crochet de retour et perçage visibles"
                className="block h-[300px] w-[calc(50%+50vw)] max-w-none object-contain object-right sm:h-[420px] lg:hidden"
              />
              <img
                src={cld(IMG.profilHero, 1200)}
                srcSet={srcSetOf(IMG.profilHero)}
                sizes="50vw"
                alt=""
                aria-hidden="true"
                className="absolute inset-y-0 left-0 hidden h-full w-[calc(50vw+80px)] max-w-none object-contain object-right lg:block"
              />
            </div>
          </div>

          <div className="h-24 lg:h-28" aria-hidden="true" />
        </div>
      </section>

      {/* ======================= 2. SANS / AVEC ======================== */}
      <section className={`${DS.SECTION} bg-white`}>
        <div className={DS.CONTAINER}>
          <div className="mb-14 max-w-3xl">
            <p className={`${DS.EYEBROW_LIGHT} mb-4`}>Pourquoi une goutte d'eau</p>
            <h2 className={`${DS.H2} mb-6 text-[#0E2A33]`}>Rejet d'eau pour nez de dalle</h2>
            <p className={DS.LEAD_LIGHT}>
              Le profil écarte l'eau de ruissellement de la façade. Il limite les salissures et les coulures, et retarde la dégradation des ouvrages.
            </p>
          </div>

          {/* Comparateur à curseur (à partir de md) */}
          <div className="hidden md:block">
            <div
              ref={cmpRef}
              onPointerDown={stopDemo}
              className="relative aspect-video select-none overflow-hidden rounded-[20px] bg-[#B9C6CB] [&:has(input:focus-visible)]:outline [&:has(input:focus-visible)]:outline-2 [&:has(input:focus-visible)]:outline-offset-4 [&:has(input:focus-visible)]:outline-[#0E2A33]"
            >
              <img
                src={cld(IMG.avec, 1200)}
                srcSet={srcSetOf(IMG.avec)}
                sizes="(max-width: 1280px) 100vw, 1232px"
                alt="Nez de dalle équipé du profil : l'eau est écartée de la façade"
                loading="lazy"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <img
                src={cld(IMG.sans, 1200)}
                srcSet={srcSetOf(IMG.sans)}
                sizes="(max-width: 1280px) 100vw, 1232px"
                alt="Illustration du même nez de dalle sans profil : l'eau ruisselle"
                loading="lazy"
                draggable={false}
                className={`absolute inset-0 h-full w-full object-cover ${demo ? 'transition-[clip-path] duration-1000 ease-in-out' : ''}`}
                style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
              />

              <span
                className={`absolute left-5 top-5 flex items-center gap-2 rounded-full bg-[#071318]/85 px-4 py-2.5 text-sm font-bold text-white transition-opacity duration-300 ${split < 18 ? 'opacity-0' : 'opacity-100'}`}
              >
                Sans profil <span className="text-xs font-semibold text-white/55">Illustration</span>
              </span>
              <span
                className={`absolute right-5 top-5 rounded-full bg-[#E2FD48] px-4 py-2.5 text-sm font-bold text-[#0E2A33] transition-opacity duration-300 ${split > 82 ? 'opacity-0' : 'opacity-100'}`}
              >
                Avec profil
              </span>

              <div
                className={`pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-[#E2FD48] shadow-[0_0_0_1px_rgba(14,42,51,0.35),0_0_24px_rgba(226,253,72,0.55)] ${demo ? 'transition-[left] duration-1000 ease-in-out' : ''}`}
                style={{ left: `${split}%` }}
              >
                <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                  {!touched && <span className="absolute inset-0 animate-ping rounded-full bg-[#E2FD48]/60" aria-hidden="true" />}
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#E2FD48] text-[#0E2A33] shadow-[0_8px_28px_rgba(7,19,24,0.45)] ring-4 ring-[#0E2A33]">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
                    </svg>
                  </span>
                </span>
                <span
                  className={`absolute left-1/2 top-[calc(50%+52px)] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#0E2A33] px-4 py-2 text-[13px] font-bold text-white shadow-[0_8px_24px_rgba(7,19,24,0.35)] transition-opacity duration-300 ${touched ? 'opacity-0' : 'opacity-100'}`}
                >
                  Glissez pour comparer
                </span>
              </div>

              <label htmlFor="cmp-range" className="sr-only">
                Comparer sans et avec goutte d'eau
              </label>
              <input
                id="cmp-range"
                type="range"
                min={0}
                max={100}
                value={split}
                onChange={(e) => {
                  if (!touched) stopDemo();
                  setSplit(Number(e.target.value));
                }}
                className="absolute inset-0 m-0 h-full w-full cursor-ew-resize opacity-0"
              />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-6">
              <p className={DS.BODY_LIGHT}>
                <b className="text-[#0E2A33]">Sans profil.</b> L'eau ruisselle sur le nez de dalle.
              </p>
              <p className={DS.BODY_LIGHT}>
                <b className="text-[#0E2A33]">Avec profil.</b> L'eau est écartée de la façade.
              </p>
            </div>
          </div>

          {/* Deux photos empilées (mobile) */}
          <div className="grid gap-8 md:hidden">
            <figure className="m-0">
              <img
                src={cld(IMG.sans, 800)}
                srcSet={srcSetOf(IMG.sans)}
                sizes="100vw"
                alt="Illustration du nez de dalle sans profil : l'eau ruisselle"
                loading="lazy"
                className="block aspect-[4/3] w-full rounded-[20px] object-cover"
              />
              <figcaption className="mt-4">
                <span className="block font-display text-xl font-bold text-[#0E2A33]">Sans profil</span>
                <span className={`${DS.BODY_LIGHT} mt-1 block`}>L'eau ruisselle sur le nez de dalle.</span>
                <span className="mt-1.5 block text-xs text-[#0E2A33]/[0.62]">Illustration</span>
              </figcaption>
            </figure>
            <figure className="m-0">
              <img
                src={cld(IMG.avec, 800)}
                srcSet={srcSetOf(IMG.avec)}
                sizes="100vw"
                alt="Nez de dalle équipé du profil : l'eau est écartée de la façade"
                loading="lazy"
                className="block aspect-[4/3] w-full rounded-[20px] object-cover"
              />
              <figcaption className="mt-4">
                <span className="block font-display text-xl font-bold text-[#0E2A33]">Avec profil</span>
                <span className={`${DS.BODY_LIGHT} mt-1 block`}>L'eau est écartée de la façade.</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ========================= 3. SYSTEME ========================== */}
      <section className={`${DS.SECTION} ${GRADIENT_DARK} text-white`}>
        <div className={DS.CONTAINER}>
          <div className="mb-12 max-w-3xl">
            <p className={`${DS.EYEBROW_DARK} mb-4`}>Le système</p>
            <h2 className={`${DS.H2} mb-6 text-white`}>Un système complet</h2>
            <p className={DS.LEAD_DARK}>Accessoires préfabriqués en atelier.</p>
          </div>

          <figure className="relative mb-6 overflow-hidden rounded-[20px] bg-[#13252E]">
            <img
              src={cld(IMG.pose, 1600)}
              srcSet={srcSetOf(IMG.pose)}
              sizes="(max-width: 1280px) 100vw, 1232px"
              alt="Profil fixé sur un nez de dalle avec son joint d'étanchéité"
              loading="lazy"
              className="block aspect-[4/3] w-full object-cover object-center md:aspect-[16/9]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/2 bg-gradient-to-t from-[#071318]/75 to-transparent md:block" aria-hidden="true" />
            <figcaption className="px-6 py-5 text-[15px] leading-normal text-white/80 md:absolute md:bottom-7 md:left-8 md:max-w-md md:p-0 md:text-white">
              Profil fixé sur nez de dalle, avec son joint d'étanchéité.
            </figcaption>
          </figure>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { img: IMG.profil, alt: "Profil goutte d'eau de 3 m", title: 'Profil de 3 m', text: "Aluminium extrudé 15/10, pré-percé. Joint d'étanchéité collé en atelier.", bleed: true },
              { img: IMG.angleSortant, alt: 'Angle sortant monobloc', title: 'Angle sortant', text: 'Monobloc, façonné en atelier.', bleed: false },
              { img: IMG.angleRentrant, alt: 'Angle rentrant monobloc', title: 'Angle rentrant', text: 'Monobloc, façonné en atelier.', bleed: false },
            ].map((c) => (
              <article key={c.title} className={`${DS.CARD_DARK} flex flex-col overflow-hidden p-5 pb-7`}>
                <div className={`mb-5 flex aspect-[4/3] items-center ${c.bleed ? '-ml-5 justify-start' : 'justify-center'}`}>
                  <img
                    src={cld(c.img, 800)}
                    srcSet={srcSetOf(c.img)}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                    alt={c.alt}
                    loading="lazy"
                    className={`h-full w-full object-contain ${c.bleed ? 'object-left' : ''}`}
                  />
                </div>
                <h3 className={`${DS.H3} mb-2 text-white`}>{c.title}</h3>
                <p className={DS.BODY_DARK}>{c.text}</p>
              </article>
            ))}

            <article className={`${DS.CARD_DARK} flex flex-col p-5 pb-7`}>
              <p className={`${DS.EYEBROW_DARK} mb-6`}>Accessoires</p>
              <div className="grid gap-6">
                <div>
                  <h3 className={`${DS.H3} mb-2 text-white`}>Éclisse de jonction</h3>
                  <p className={DS.BODY_DARK}>S'emboîte dans le profil et raccorde deux longueurs.</p>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <h3 className={`${DS.H3} mb-2 text-white`}>Bouchons</h3>
                  <p className={DS.BODY_DARK}>Droits et gauches, disponibles sur demande.</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ================== 4. CARACTERISTIQUES ======================== */}
      <section className={`${DS.SECTION} bg-white`}>
        <div className={DS.CONTAINER}>
          <p className={`${DS.EYEBROW_LIGHT} mb-4`}>Données techniques</p>
          <h2 className={`${DS.H2} mb-16 text-[#0E2A33]`}>Caractéristiques techniques</h2>
          <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <figure className="m-0 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[20px] border border-[#0E2A33]/[0.12] bg-white">
              <img
                src={cld(IMG.plan, 1200)}
                srcSet={srcSetOf(IMG.plan)}
                sizes="(max-width: 1024px) 100vw, 640px"
                alt="Plan de coupe coté du profil : 45 mm de haut, 22 mm de profondeur, joint, éclisse de jonction, trous Ø6"
                loading="lazy"
                className="block h-full w-full scale-[1.7] object-contain"
              />
            </figure>
            <dl className="m-0 border-t border-[#0E2A33]/[0.12]">
              {SPEC_ROWS.map((r) => (
                <div key={r.k} className="grid grid-cols-[1fr_1.2fr] gap-6 border-b border-[#0E2A33]/[0.12] py-[18px]">
                  <dt className="text-sm font-semibold text-[#0E2A33]/[0.62]">{r.k}</dt>
                  <dd className="m-0 font-display text-base font-bold text-[#0E2A33]">{r.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ======================= 5. FINITIONS ========================== */}
      <section className={`${DS.SECTION} bg-[#F3F6F7]`}>
        <div className={DS.CONTAINER}>
          <p className={`${DS.EYEBROW_LIGHT} mb-4`}>Finitions</p>
          <h2 className={`${DS.H2} mb-16 text-[#0E2A33]`}>Brut, anodisé ou laqué</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-[20px] bg-white p-5 pb-8">
              <div className="mb-6 h-40 rounded-[20px] bg-[#D5DADC]" role="img" aria-label="Pastille aluminium brut" />
              <h3 className={`${DS.H3} mb-2.5 px-2 text-[#0E2A33]`}>Brute</h3>
              <p className={`${DS.BODY_LIGHT} px-2`}>Aluminium non traité.</p>
            </article>
            <article className="rounded-[20px] bg-white p-5 pb-8">
              <div className="mb-6 h-40 rounded-[20px] bg-[#A8AEB1]" role="img" aria-label="Pastille aluminium anodisé" />
              <h3 className={`${DS.H3} mb-2.5 px-2 text-[#0E2A33]`}>Anodisée</h3>
              <p className={`${DS.BODY_LIGHT} px-2`}>Aluminium traité, aspect satiné mat.</p>
            </article>
            <article className="rounded-[20px] bg-white p-5 pb-8">
              <div className="relative mb-6 h-40 rounded-[20px] bg-[#383E42]" role="img" aria-label="Pastille laquée, exemple RAL 7016">
                <span className="absolute bottom-3.5 left-4 text-[11px] font-bold text-white/80">ex. RAL 7016</span>
              </div>
              <div className="mb-2.5 flex items-center justify-between gap-3 px-2">
                <h3 className={`${DS.H3} text-[#0E2A33]`}>Laquée</h3>
                <img src={LOGO_INFINIMETAL_NOIR} alt="Logo Infinimetal" loading="lazy" className="h-auto w-[120px] mix-blend-multiply" />
              </div>
              <p className={`${DS.BODY_LIGHT} mb-4 px-2`}>Thermolaquage réalisé dans nos ateliers. Teinte RAL au choix.</p>
              <a
                href={RAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-2 inline-flex items-center gap-2 text-sm font-bold text-[#0E2A33] underline underline-offset-4"
              >
                Voir le nuancier RAL
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* ====================== 6. FICHE TECHNIQUE ===================== */}
      <section id="fiche-technique" className={`${DS.SECTION} ${GRADIENT_DARK} scroll-mt-24 overflow-hidden text-white`}>
        <div className={DS.CONTAINER}>
          <div className="grid items-center gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <a
              href={PDF_URL}
              download={PDF_DOWNLOAD_NAME}
              onClick={() => track('download_fiche_goutte_eau', { file_name: PDF_DOWNLOAD_NAME, location: 'mockup' })}
              aria-label="Télécharger la fiche technique, PDF de 3 pages"
              className="block overflow-hidden rounded-[20px] shadow-[0_24px_60px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_36px_80px_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <img
                src={cld(IMG.mockup, 1200)}
                srcSet={srcSetOf(IMG.mockup)}
                sizes="(max-width: 1024px) 100vw, 720px"
                alt="Les trois pages de la fiche technique Goutte d'eau extrudée posées sur une table"
                loading="lazy"
                className="block h-auto w-full"
              />
            </a>

            <div>
              <p className={`${DS.EYEBROW_DARK} mb-4`}>Fiche technique</p>
              <h2 className={`${DS.H2} mb-8 text-white`}>Toute la fiche, en PDF</h2>
              <ul className="mb-6 grid list-none gap-3 p-0">
                {PDF_CONTENT.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[15px] font-semibold text-white/80">
                    <span className="h-2 w-2 flex-none rounded-sm bg-[#E2FD48]" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mb-8 text-sm text-white/50">PDF · 3 pages · 0,2 Mo</p>
              <div className="flex flex-col items-start gap-3.5">
                <a
                  href={PDF_URL}
                  download={PDF_DOWNLOAD_NAME}
                  onClick={() => track('download_fiche_goutte_eau', { file_name: PDF_DOWNLOAD_NAME, location: 'bouton' })}
                  className={DS.BTN_PRIMARY}
                >
                  <DownloadIcon />
                  Télécharger la fiche technique
                </a>
                <a href={RAL_URL} target="_blank" rel="noopener noreferrer" className={`${DS.LINK_DARK} pl-1 underline underline-offset-4`}>
                  Voir le nuancier RAL
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================== 7. DEMANDE DE COMMANDE ===================== */}
      <section id="commande" className={`${DS.SECTION} scroll-mt-24 bg-white`}>
        <div className={DS.CONTAINER}>
          <div className="mb-12 max-w-3xl">
            <p className={`${DS.EYEBROW_LIGHT} mb-4`}>Commande</p>
            <h2 className={`${DS.H2} mb-6 text-[#0E2A33]`}>Demande de commande</h2>
            <p className={DS.LEAD_LIGHT}>
              Indiquez vos quantités et votre finition. Nous vous confirmons le prix et le délai sous 48 h.
            </p>
          </div>

          <div className="grid items-start gap-14 lg:grid-cols-[3fr_2fr]">
            <form
              action={FORMSUBMIT_URL}
              method="POST"
              encType="multipart/form-data"
              acceptCharset="UTF-8"
              noValidate
              onSubmit={onSubmit}
            >
              <input type="hidden" name="_next" value="https://plialu.fr/merci" />
              <input type="hidden" name="_subject" value="Nouvelle demande de commande Goutte d'eau" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
              <input type="hidden" name="intention" value="Commande Goutte d'eau" />
              <input type="hidden" name="domaine" value="Ravalement de façade" />
              <input type="hidden" name="recapitulatif" value={recapText} />
              <input type="hidden" name="metres_lineaires" value={qty.profils * 3} />
              <input type="hidden" name="finition" value={finish} />

              {/* Bloc 1 : quantités */}
              <fieldset className="m-0 min-w-0 border-0 border-t border-[#0E2A33]/[0.12] px-0 py-8">
                <legend className="float-left mb-5 flex w-full items-baseline gap-3.5 p-0 font-display text-xl font-bold text-[#0E2A33]">
                  <span className="text-xs font-extrabold tracking-[0.1em] text-[#0E2A33]/[0.62]">01</span>
                  Quantités
                </legend>
                <div className="clear-both">
                  {QTY_ITEMS.map((it) => {
                    const hint =
                      it.key === 'profils' && qty.profils > 0
                        ? `Longueur 3 m, soit ${qty.profils * 3} m linéaires`
                        : it.hint;
                    return (
                      <div
                        key={it.key}
                        className="flex flex-col items-start justify-between gap-4 border-b border-[#0E2A33]/[0.08] py-4 sm:flex-row sm:items-center sm:gap-5"
                      >
                        <div>
                          <div className="text-base font-bold text-[#0E2A33]">{it.name}</div>
                          <div className="mt-[3px] text-[13px] text-[#0E2A33]/[0.62]">{hint}</div>
                        </div>
                        <div className="flex flex-none items-center gap-1.5">
                          <button
                            type="button"
                            aria-label={`Retirer : ${it.name}`}
                            onClick={() => setQtyValue(it.key, qty[it.key] - 1)}
                            className={STEP_BTN}
                          >
                            −
                          </button>
                          <label htmlFor={`cmd-${it.key}`} className="sr-only">
                            {it.name}, quantité
                          </label>
                          <input
                            id={`cmd-${it.key}`}
                            name={`qte_${it.key}`}
                            type="number"
                            min={0}
                            inputMode="numeric"
                            value={qty[it.key]}
                            onChange={(e) => setQtyValue(it.key, e.target.value)}
                            className={`h-11 w-16 rounded-xl border border-[#0E2A33]/20 bg-white text-center font-display text-[17px] font-bold text-[#0E2A33] focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#0E2A33] ${NO_SPINNER}`}
                          />
                          <button
                            type="button"
                            aria-label={`Ajouter : ${it.name}`}
                            onClick={() => setQtyValue(it.key, qty[it.key] + 1)}
                            className={STEP_BTN}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {errors.profils && (
                    <p role="alert" className="mt-3.5 text-[13px] font-semibold text-[#B4232A]">
                      {errors.profils}
                    </p>
                  )}
                </div>
              </fieldset>

              {/* Bloc 2 : finition */}
              <fieldset className="m-0 min-w-0 border-0 border-t border-[#0E2A33]/[0.12] px-0 py-8">
                <legend className="float-left mb-5 flex w-full items-baseline gap-3.5 p-0 font-display text-xl font-bold text-[#0E2A33]">
                  <span className="text-xs font-extrabold tracking-[0.1em] text-[#0E2A33]/[0.62]">02</span>
                  Finition
                </legend>
                <div className="clear-both grid gap-3 md:grid-cols-3">
                  {FINISHES.map((f) => {
                    const on = finish === f.id;
                    return (
                      <label
                        key={f.id}
                        className={`block cursor-pointer rounded-[20px] transition-colors duration-150 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#0E2A33] ${
                          on
                            ? 'border-2 border-[#0E2A33] bg-[#F3F6F7] px-[19px] py-[17px]'
                            : 'border border-[#0E2A33]/20 bg-white px-5 py-[18px]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="finition_choix"
                          value={f.id}
                          checked={on}
                          onChange={() => setFinish(f.id)}
                          className="sr-only"
                        />
                        <span className="block font-display text-base font-bold text-[#0E2A33]">{f.name}</span>
                        <span className="mt-1 block text-xs text-[#0E2A33]/[0.62]">{f.desc}</span>
                      </label>
                    );
                  })}
                </div>
                {finish === 'laque' && (
                  <div className="mt-5 max-w-sm">
                    <Field id="cmd-ral" label="Teinte RAL" required error={errors.ral}>
                      <input
                        id="cmd-ral"
                        name="teinte_ral"
                        type="text"
                        placeholder="ex. RAL 7016"
                        value={ral}
                        onChange={(e) => setRal(e.target.value)}
                        aria-invalid={!!errors.ral}
                        aria-describedby={errors.ral ? 'cmd-ral-error' : undefined}
                        className={`${INPUT} ${inputBorder(!!errors.ral)}`}
                      />
                    </Field>
                    <a
                      href={RAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-block text-[13px] font-bold text-[#0E2A33] underline underline-offset-4"
                    >
                      Voir le nuancier RAL
                    </a>
                  </div>
                )}
              </fieldset>

              {/* Bloc 3 : coordonnées */}
              <fieldset className="m-0 min-w-0 border-0 border-t border-[#0E2A33]/[0.12] px-0 py-8">
                <legend className="float-left mb-5 flex w-full items-baseline gap-3.5 p-0 font-display text-xl font-bold text-[#0E2A33]">
                  <span className="text-xs font-extrabold tracking-[0.1em] text-[#0E2A33]/[0.62]">03</span>
                  Coordonnées
                </legend>
                <div className="clear-both grid gap-x-6 gap-y-5 sm:grid-cols-2">
                  <Field id="cmd-company" label="Société" required error={errors.company}>
                    <input id="cmd-company" name="company" type="text" autoComplete="organization" aria-invalid={!!errors.company} aria-describedby={errors.company ? 'cmd-company-error' : undefined} className={`${INPUT} ${inputBorder(!!errors.company)}`} />
                  </Field>
                  <Field id="cmd-name" label="Prénom et nom" required error={errors.name}>
                    <input id="cmd-name" name="name" type="text" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'cmd-name-error' : undefined} className={`${INPUT} ${inputBorder(!!errors.name)}`} />
                  </Field>
                  <Field id="cmd-email" label="Email professionnel" required error={errors.email}>
                    <input id="cmd-email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'cmd-email-error' : undefined} className={`${INPUT} ${inputBorder(!!errors.email)}`} />
                  </Field>
                  <Field id="cmd-phone" label="Téléphone" required error={errors.phone}>
                    <input id="cmd-phone" name="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'cmd-phone-error' : undefined} className={`${INPUT} ${inputBorder(!!errors.phone)}`} />
                  </Field>
                  <Field id="cmd-postal_code" label="Code postal du chantier ou de livraison" required error={errors.postal_code}>
                    <input id="cmd-postal_code" name="postal_code" type="text" inputMode="numeric" autoComplete="postal-code" aria-invalid={!!errors.postal_code} aria-describedby={errors.postal_code ? 'cmd-postal_code-error' : undefined} className={`${INPUT} ${inputBorder(!!errors.postal_code)}`} />
                  </Field>
                  <Field id="cmd-reference" label="Référence chantier">
                    <input id="cmd-reference" name="reference_chantier" type="text" className={`${INPUT} ${inputBorder(false)}`} />
                  </Field>
                  <Field id="cmd-message" label="Message" className="sm:col-span-2">
                    <textarea id="cmd-message" name="message" className={`${INPUT} ${inputBorder(false)} min-h-[120px] resize-y`} />
                  </Field>
                </div>
              </fieldset>

              <div className="pt-2">
                <button type="submit" disabled={sending} className={`${DS.BTN_PRIMARY} w-full max-w-[420px] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0`}>
                  {sending ? 'Envoi en cours…' : 'Envoyer ma demande de commande'}
                </button>
                {errors.form && (
                  <p role="alert" className="mt-3.5 text-[13px] font-semibold text-[#B4232A]">
                    {errors.form}
                  </p>
                )}
                <p className="mt-3.5 text-[13px] text-[#0E2A33]/[0.62]">
                  Sans engagement. Prix et délai confirmés par notre équipe.
                </p>
                <p className="mt-2.5 max-w-[560px] text-xs leading-relaxed text-[#0E2A33]/[0.62]">
                  Vos coordonnées servent uniquement à traiter cette demande.{' '}
                  <button
                    type="button"
                    onClick={() => setCurrentPage('politique-confidentialite')}
                    className="text-[#0E2A33]/75 underline underline-offset-2 hover:text-[#0E2A33]"
                  >
                    Politique de confidentialité
                  </button>
                  .
                </p>
              </div>

              {/* Barre récapitulative collante (mobile) */}
              <div className="sticky bottom-3 z-10 mt-6 flex items-center justify-between gap-3 rounded-[20px] bg-[#0E2A33] py-3.5 pl-5 pr-3.5 text-white shadow-[0_16px_40px_rgba(7,19,24,0.35)] lg:hidden">
                <div className="min-w-0">
                  <span className="block font-display text-[10px] font-bold uppercase tracking-[0.3em] text-[#E2FD48]">Votre demande</span>
                  <span className="mt-[3px] block truncate text-[13px] font-semibold">{barText}</span>
                </div>
                <button type="submit" disabled={sending} className="flex-none rounded-full bg-[#E2FD48] px-4 py-3 text-xs font-extrabold text-[#0E2A33] disabled:cursor-not-allowed disabled:opacity-60">
                  {sending ? 'Envoi en cours…' : 'Envoyer'}
                </button>
              </div>
            </form>

            {/* Récapitulatif (desktop) */}
            <aside
              aria-label="Récapitulatif de la demande"
              className={`hidden rounded-[20px] ${GRADIENT_DARK} p-8 text-white lg:sticky lg:top-36 lg:block`}
            >
              <p className={`${DS.EYEBROW_DARK} mb-2`}>Récapitulatif</p>
              <p className="mb-[18px] font-display text-xl font-bold">Votre demande</p>
              {recapLines.length > 0 ? (
                <ul className="m-0 list-none p-0">
                  {recapLines.map((l) => (
                    <li key={l} className="flex gap-3 border-b border-white/10 py-3 text-[15px] leading-[1.45]">
                      <span className="mt-[7px] h-2 w-2 flex-none rounded-sm bg-[#E2FD48]" aria-hidden="true" />
                      {l}
                    </li>
                  ))}
                  <li className="flex gap-3 py-3 text-[15px] leading-[1.45]">
                    <span className="mt-[7px] h-2 w-2 flex-none rounded-sm bg-[#E2FD48]" aria-hidden="true" />
                    Finition : {finishLabel}
                  </li>
                </ul>
              ) : (
                <p className={DS.BODY_DARK}>Indiquez vos quantités : le récapitulatif se remplit ici.</p>
              )}
              <p className="mt-6 border-t border-white/10 pt-[18px] text-[13px] leading-relaxed text-white/50">
                Ni devis ni commande ferme : nous revenons vers vous avec le prix et le délai.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GoutteEauExtrudee;
