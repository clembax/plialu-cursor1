import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getProjectImageAlt, getProjectImages, type Project, type ProjectImage } from './projects';

type PortfolioSheetProps = {
  project: Project;
  index: number;
  total: number;
  previous: Project;
  next: Project;
  onClose: () => void;
  onSelect: (id: string) => void;
  onContact: () => void;
};

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isPortrait = (image: ProjectImage) =>
  Boolean(image.width && image.height && image.height / image.width > 1.2);

const SheetPhoto: React.FC<{ image: ProjectImage; alt: string; eager: boolean }> = ({ image, alt, eager }) => {
  const [loaded, setLoaded] = useState(false);
  const markLoaded = () => setLoaded(true);
  const portrait = isPortrait(image);
  const frame = portrait
    ? 'flex justify-center rounded-2xl bg-[#0E2A33]'
    : 'rounded-2xl bg-[#0E2A33]';
  const photo = portrait
    ? 'max-h-[85vh] w-auto max-w-full object-contain rounded-2xl'
    : 'h-auto w-full rounded-2xl';

  return (
    <div className={frame}>
      <img
        ref={(node) => {
          if (node?.complete && node.naturalWidth > 0) markLoaded();
        }}
        src={image.src}
        srcSet={image.srcset}
        sizes="(max-width: 1024px) 100vw, 62vw"
        width={image.width}
        height={image.height}
        alt={alt}
        decoding="async"
        loading={eager ? 'eager' : 'lazy'}
        onLoad={markLoaded}
        style={{ transition: 'opacity 300ms' }}
        className={`${photo} ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

const PortfolioSheet: React.FC<PortfolioSheetProps> = ({
  project,
  index,
  total,
  previous,
  next,
  onClose,
  onSelect,
  onContact,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const onSelectRef = useRef(onSelect);
  const previousIdRef = useRef(previous.id);
  const nextIdRef = useRef(next.id);
  const reduceMotion = useRef(prefersReducedMotion()).current;
  const [shown, setShown] = useState(reduceMotion);
  const images = getProjectImages(project);
  const number = String(index + 1).padStart(2, '0');

  onCloseRef.current = onClose;
  onSelectRef.current = onSelect;
  previousIdRef.current = previous.id;
  nextIdRef.current = next.id;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onSelectRef.current(previousIdRef.current);
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onSelectRef.current(nextIdRef.current);
        return;
      }
      if (event.key !== 'Tab') return;
      const root = dialogRef.current;
      if (!root) return;
      const focusable = [...root.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
        .filter((element) => !element.hasAttribute('disabled'));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === root)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === root)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (!event.shiftKey && !root.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
      tabIndex={-1}
      className={`fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-[#071318] focus:outline-none motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${shown ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
      style={{ transition: reduceMotion ? undefined : 'opacity 250ms, transform 250ms' }}
    >
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-28 md:pt-32">
        <div className="mb-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-white"
          >
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="m11 18-6-6 6-6" />
            </svg>
            Retour aux réalisations
          </button>
          <button
            type="button"
            aria-label="Fermer"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-3xl font-light text-white"
          >
            ×
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-[minmax(0,1.63fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
          <div className="order-2 flex flex-col gap-4 lg:order-1">
            {images.map((image, imageIndex) => (
              <SheetPhoto
                key={image.src}
                image={image}
                alt={getProjectImageAlt(project, imageIndex)}
                eager={imageIndex === 0}
              />
            ))}
          </div>

          <aside className="relative order-1 mb-10 self-start lg:sticky lg:top-28 lg:order-2 lg:mb-0">
            <span aria-hidden="true" className="pointer-events-none absolute -left-2 -top-8 select-none text-[10rem] font-black leading-none text-white/5">
              {number}
            </span>
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-widest text-[#E2FD48]">{project.tag}</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tighter text-white md:text-5xl">{project.name}</h2>
              <p className="mt-3 text-base text-white/70">{project.city} · {project.year}</p>
              <dl className="mt-8">
                <div className="flex items-baseline justify-between gap-6 border-t border-white/10 py-3 text-sm">
                  <dt className="text-white/50">Système</dt>
                  <dd className="text-right text-white">{project.system}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 border-t border-white/10 py-3 text-sm">
                  <dt className="text-white/50">Matériau</dt>
                  <dd className="text-right text-white">{project.material}</dd>
                </div>
                {project.finish && (
                  <div className="flex items-baseline justify-between gap-6 border-t border-white/10 py-3 text-sm">
                    <dt className="text-white/50">Teinte</dt>
                    <dd className="text-right text-white">{project.finish}</dd>
                  </div>
                )}
              </dl>
              <button
                type="button"
                onClick={onContact}
                className="mt-8 px-10 py-4 text-sm font-extrabold text-[#0E2A33] rounded-full bg-[#E2FD48] shadow-xl transition-all hover:-translate-y-1 hover:shadow-[#E2FD48]/20 md:px-12 md:py-5"
              >
                Demander un devis
              </button>
              <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <button type="button" onClick={() => onSelect(previous.id)} className="min-h-[44px] text-left">
                  <span className="block text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/50">Projet précédent</span>
                  <span className="mt-1 block text-sm font-bold text-white">{previous.name}</span>
                </button>
                <button type="button" onClick={() => onSelect(next.id)} className="min-h-[44px] text-right">
                  <span className="block text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/50">Projet suivant</span>
                  <span className="mt-1 block text-sm font-bold text-white">{next.name}</span>
                </button>
              </div>
              <p className="mt-4 text-center text-xs font-bold tabular-nums tracking-widest text-white/50">
                {number} / {total}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default PortfolioSheet;
