import React, { useEffect, useState } from 'react';

/* Indicateur de scroll des heros plein écran.
   Chevron fin et large, non cliquable, qui descend doucement en boucle.
   Disparaît en fondu dès le premier scroll. Immobile si "réduire les animations". */

type Props = { tone?: 'dark' | 'light' };

export const ScrollCue: React.FC<Props> = ({ tone = 'dark' }) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 transition-opacity duration-500 ${
        hidden ? 'opacity-0' : 'opacity-100'
      } ${tone === 'dark' ? 'text-white/60' : 'text-[#0E2A33]/50'}`}
    >
      <style>{`
        @keyframes plialuScrollCue { 0%, 100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(7px); opacity: .7; } }
        .plialu-scroll-cue { animation: plialuScrollCue 3.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .plialu-scroll-cue { animation: none; } }
      `}</style>
      <svg className="plialu-scroll-cue" width="40" height="14" viewBox="0 0 40 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 1.5 20 12.5 39 1.5" />
      </svg>
    </span>
  );
};

export default ScrollCue;
