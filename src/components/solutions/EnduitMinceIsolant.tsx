import React, { useEffect, useRef, useState } from 'react';
import { iteProfiles, schemaImages } from '../../config/schemaConfig';

interface EnduitMinceIsolantProps {
  setCurrentPage: (page: any) => void;
}

const EnduitMinceIsolant: React.FC<EnduitMinceIsolantProps> = ({ setCurrentPage }) => {
  const [activeProfile, setActiveProfile] = useState<number | null>(null);
  const [zoomedImage, setZoomedImage] = useState<null | { src: string; srcSet: string; alt: string }>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [cardOpacities, setCardOpacities] = useState<number[]>(iteProfiles.map(() => 1));

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const schemaRef = useRef<HTMLDivElement | null>(null);

  const handleCardClick = (id: number, fromSchema = false) => {
    setActiveProfile(prev => {
      const next = prev === id ? null : id;

      if (fromSchema && next !== null) {
        const index = iteProfiles.findIndex(p => p.id === id);
        cardRefs.current[index]?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }

      if (!fromSchema && next !== null) {
        if (window.innerWidth < 768) {
          setTimeout(() => {
            schemaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }

      return next;
    });
  };

  const activeConfig = iteProfiles.find(p => p.id === activeProfile);

  const schemaStyle: React.CSSProperties = activeConfig
    ? {
        transform: `translate(${activeConfig.zoom.x}%, ${activeConfig.zoom.y}%) scale(${activeConfig.zoom.scale})`,
        transformOrigin: activeConfig.zoom.transformOrigin,
        transition: 'transform 0.7s ease-in-out, transform-origin 0s',
      }
    : {
        transform: 'translate(0%, 0%) scale(1)',
        transformOrigin: 'center center',
      transition: 'transform 0.7s ease-in-out, transform-origin 0s',
      };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateOpacities = () => {
      const viewportCenter = window.innerHeight / 2;
      const maxDistance = window.innerHeight / 2;

      const nextOpacities = iteProfiles.map((profile, index) => {
        if (profile.id === activeProfile) return 1;

        const card = cardRefs.current[index];
        if (!card) return 1;

        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        return Math.max(0.35, 1 - Math.abs(cardCenter - viewportCenter) / maxDistance);
      });

      setCardOpacities(nextOpacities);
    };

    updateOpacities();
    window.addEventListener('scroll', updateOpacities);
    window.addEventListener('resize', updateOpacities);

    return () => {
      window.removeEventListener('scroll', updateOpacities);
      window.removeEventListener('resize', updateOpacities);
    };
  }, [activeProfile]);

  useEffect(() => {
    if (!zoomedImage) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomedImage(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [zoomedImage]);

  return (
    <main className="min-h-screen flex flex-col pt-0 pb-0 bg-[#071318]">
      <div className="relative bg-[#071318] overflow-hidden pt-32 md:pt-40">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0e2a33]/40 to-[#071318]"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Retour */}
        <button
          onClick={() => setCurrentPage('solutions')}
          className="text-[#E2FD48] hover:opacity-70 transition-opacity font-medium text-xs uppercase tracking-widest flex items-center gap-2 mb-14"
        >
          &larr; RETOUR AUX SOLUTIONS
        </button>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Enduit Mince sur Isolant
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Système complet de profils aluminium et accessoires de mise en œuvre pour ITE sous enduit. PLIALU fabrique les pièces métalliques et fournit l'ensemble des accessoires — un seul interlocuteur pour tout le système.
          </p>
        </div>

        {/* Main 2-column layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left column — profile cards (40%) */}
          <div className="w-full lg:w-[40%] flex flex-col gap-3">
            {iteProfiles.map((profile, index) => {
              const isActive = activeProfile === profile.id;
              return (
                <div
                  key={profile.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  onClick={() => handleCardClick(profile.id)}
                  style={{ transitionDelay: mounted ? `${index * 80}ms` : '0ms', opacity: isActive ? 1 : cardOpacities[index] }}
                  className={`border rounded-xl cursor-pointer p-4 transition-transform duration-200 ${
                    mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-20px]'
                  } ${
                    isActive
                      ? 'bg-white/8 backdrop-blur-sm border border-[#E2FD48]/50 rounded-xl shadow-[0_0_20px_rgba(226,253,72,0.15)]'
                      : 'bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:scale-[1.02] hover:shadow-lg'
                  }`}
                >
                  {/* Card header row */}
                  <div className="flex items-center gap-4">
                    {/* Profile image — white bg, square, object-contain */}
                    {!isActive && (
                      <div
                        className="flex-shrink-0 bg-white p-1.5 rounded-xl overflow-hidden transition-all duration-300 w-16 h-16"
                      >
                        <img
                          src={profile.images.medium}
                          srcSet={`${profile.images.small} 800w, ${profile.images.medium} 1200w, ${profile.images.large} 1600w`}
                          sizes="(max-width: 640px) 64px, 80px"
                          alt={profile.nom}
                          loading="lazy"
                          className="w-full h-full object-contain bg-white rounded-lg"
                        />
                      </div>
                    )}

                    {/* Name + origine */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-semibold text-sm transition-colors duration-300 ${
                          isActive ? 'text-[#E2FD48]' : 'text-white'
                        }`}
                      >
                        {profile.nom}
                      </p>
                    </div>

                    {/* Chevron */}
                    <span className="text-white/50 text-xl font-light transition-all duration-200">
                      {isActive ? '−' : '+'}
                    </span>
                  </div>

                  {/* Expanded description — fade in */}
                  {isActive && (
                    <div
                      className="mt-3 pt-3 border-t border-white/10 animate-fade-in"
                    >
                      <div className="relative group mb-4" onClick={(e) => { e.stopPropagation(); setLightboxImage(profile.images.large); }}>
                        <img
                          src={profile.images.medium}
                          srcSet={`${profile.images.small} 800w, ${profile.images.medium} 1200w, ${profile.images.large} 1600w`}
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          alt={profile.nom}
                          loading="lazy"
                          className="w-full max-h-52 object-contain bg-white rounded-lg cursor-pointer"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {profile.description}
                      </p>
                      {profile.utilite && (
                        <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                          <span className="text-[#E2FD48] font-medium">Utilité : </span>
                          {profile.utilite}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right column — interactive schema (60%) */}
          <div className="w-full lg:w-[60%] lg:sticky lg:top-32" ref={schemaRef}>
            <div className="relative overflow-hidden rounded-2xl bg-[#0E2A33] border border-white/10">
              {/* Transform wrapper — image + hotspot move together */}
              <div className="relative" style={schemaStyle}>
                <img
                  src={schemaImages.medium}
                  srcSet={`${schemaImages.small} 1100w, ${schemaImages.medium} 1500w, ${schemaImages.large} 2000w`}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  alt="Schéma ITE — Enduit Mince sur Isolant"
                  loading="lazy"
                  className="w-full h-auto block"
                />

                {/* Hotspot badges — positioned relative to image content */}
                {iteProfiles.map(profile => {
                  const isActive = activeProfile === profile.id;
                  return (
                    <div
                      key={profile.id}
                      className="absolute"
                      style={{
                        top: profile.hotspot.top,
                        left: profile.hotspot.left,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div
                        onClick={() => handleCardClick(profile.id, true)}
                        className={`cursor-pointer transition-all duration-300 rounded-full flex items-center justify-center shadow-lg ${
                          isActive
                            ? 'bg-[#E2FD48] text-[#0E2A33] border-2 border-[#E2FD48] opacity-100 w-8 h-8 text-sm font-bold scale-110'
                            : `bg-[#0E2A33] text-[#E2FD48] border-2 border-[#E2FD48] ${
                                activeProfile ? 'opacity-40' : 'opacity-100'
                              } w-7 h-7 text-xs ${!activeProfile ? 'animate-pulse' : ''}`
                        }`}
                      >
                        {profile.id}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
            <p className="text-white/30 text-xs text-center mt-3 tracking-widest uppercase">Coupe technique — ITE sous enduit</p>
          </div>
        </div>

        </div>
      </div>

      {/* CTA */}
      <section className="mt-20 py-24 bg-[#F0F4F6]">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-fade-up">
          <span className="text-sm font-extrabold tracking-widest uppercase mb-8 inline-block text-gray-500">
            VOTRE PROJET ITE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-[#0E2A33] tracking-tighter font-extrabold mb-10 leading-[1.1]">
            Un projet ITE ?
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium text-gray-600">
            Nos équipes dimensionnent les profils et accessoires adaptés à votre chantier.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage('contact')}
              className="w-full sm:w-auto bg-[#0E2A33] text-white rounded-full px-8 py-4 text-sm font-extrabold transition-all shadow-lg hover:shadow-2xl"
            >
              Demander un chiffrage
            </button>
          </div>
        </div>
      </section>

      {lightboxImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl font-light"
          >
            ×
          </button>
          <img
            src={lightboxImage}
            alt="Aperçu profil"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {zoomedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 animate-fade-in"
          onClick={() => setZoomedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              aria-label="Fermer"
              onClick={() => setZoomedImage(null)}
              className="absolute -top-12 right-0 md:-top-14 p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <iconify-icon icon="lucide:x" width="22"></iconify-icon>
            </button>
            <img
              src={zoomedImage.src}
              srcSet={zoomedImage.srcSet}
              sizes="100vw"
              alt={zoomedImage.alt}
              loading="lazy"
              className="w-full max-h-[85vh] object-contain rounded-2xl bg-white"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default EnduitMinceIsolant;
