import { Children, useEffect, useRef, useState, type ReactNode } from 'react';

type MobileCarouselProps = {
  children: ReactNode;
  label: string;
  className: string;
  tone?: 'light' | 'dark';
};

const withBreakpoint = (className: string) =>
  className
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((cls) => (/^[a-z0-9-]+:/.test(cls) ? cls : `md:${cls}`))
    .join(' ');

export function MobileCarousel({ children, label, className, tone = 'light' }: MobileCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const count = items.length;
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let frame = 0;
    const update = () => {
      const slides = [...scroller.children] as HTMLElement[];
      if (!slides.length) return;
      const origin = scroller.getBoundingClientRect().left;
      let nearest = 0;
      let best = Number.POSITIVE_INFINITY;
      slides.forEach((slide, slideIndex) => {
        const delta = Math.abs(slide.getBoundingClientRect().left - origin);
        if (delta < best) {
          best = delta;
          nearest = slideIndex;
        }
      });
      setIndex((current) => (current === nearest ? current : nearest));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener('scroll', onScroll);
    };
  }, [count]);

  const counterColor = tone === 'dark' ? 'text-white/50' : 'text-[#0E2A33]/55';

  return (
    <div>
      <div
        ref={scrollerRef}
        role="region"
        aria-roledescription="carrousel"
        aria-label={label}
        className={[
          'no-scrollbar max-md:flex max-md:items-stretch max-md:gap-4 max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:-mx-6 max-md:scroll-px-6 max-md:px-6 max-md:pb-2',
          reduceMotion ? '' : 'max-md:scroll-smooth',
          withBreakpoint(className),
        ].filter(Boolean).join(' ')}
      >
        {items.map((child, itemIndex) => (
          <div key={itemIndex} className="max-md:flex max-md:w-[85%] max-md:flex-none max-md:snap-start max-md:flex-col md:contents">
            {child}
          </div>
        ))}
      </div>
      <p className={`mt-4 text-xs md:hidden ${counterColor}`} aria-live="polite">
        {index + 1} / {count}
      </p>
    </div>
  );
}
