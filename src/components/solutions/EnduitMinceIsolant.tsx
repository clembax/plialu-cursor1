import React, { useEffect, useState } from 'react';
import { iteProfiles, schemaImages } from '../../config/schemaConfig';

interface EnduitMinceIsolantProps {
  setCurrentPage: (page: any) => void;
}

const EnduitMinceIsolant: React.FC<EnduitMinceIsolantProps> = ({ setCurrentPage }) => {
  const [activeProfile, setActiveProfile] = useState<number | null>(null);
  const [zoomedImage, setZoomedImage] = useState<null | { src: string; srcSet: string; alt: string }>(null);

  const handleCardClick = (id: number) => {
    setActiveProfile(prev => prev === id ? null : id);
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
            {iteProfiles.map(profile => {
              const isActive = activeProfile === profile.id;
              return (
                <div
                  key={profile.id}
                  onClick={() => handleCardClick(profile.id)}
                  className={`border rounded-xl cursor-pointer transition-all duration-300 p-4 ${
                    isActive
                      ? 'bg-white/8 backdrop-blur-sm border border-[#E2FD48]/50 rounded-xl'
                      : 'bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl'
                  }`}
                >
                  {/* Card header row */}
                  <div className="flex items-center gap-4">
                    {/* Profile image — white bg, square, object-contain */}
                    <div
                      className={`flex-shrink-0 bg-white p-1.5 rounded-xl overflow-hidden transition-all duration-300 ${
                        isActive ? 'w-20 h-20' : 'w-16 h-16'
                      } ${isActive ? 'cursor-zoom-in' : ''}`}
                      onClick={(e) => {
                        if (!isActive) return;
                        e.stopPropagation();
                        setZoomedImage({
                          src: profile.images.large,
                          srcSet: `${profile.images.small} 800w, ${profile.images.medium} 1200w, ${profile.images.large} 1600w`,
                          alt: profile.nom,
                        });
                      }}
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

                    {/* Name + origine */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-semibold text-sm transition-colors duration-300 ${
                          isActive ? 'text-[#E2FD48]' : 'text-white'
                        }`}
                      >
                        {profile.nom}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{profile.origine}</p>
                    </div>

                    {/* Chevron */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={`flex-shrink-0 text-gray-500 transition-transform duration-300 ${
                        isActive ? 'rotate-180' : ''
                      }`}
                    >
                      <path
                        d="M4 6l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Expanded description — fade in */}
                  {isActive && (
                    <div
                      className="mt-3 pt-3 border-t border-white/10 animate-fade-in"
                    >
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {profile.description}
                      </p>
                      {profile.utilite && (
                        <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                          <span className="text-[#E2FD48] font-medium">Utilite : </span>
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
          <div className="w-full lg:w-[60%] lg:sticky lg:top-32">
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

                {/* Hotspot badge — positioned relative to image content */}
                {activeConfig && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      top: activeConfig.hotspot.top,
                      left: activeConfig.hotspot.left,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0E2A33] border-2 border-[#E2FD48] flex items-center justify-center text-[#E2FD48] font-bold text-sm shadow-lg">
                      {activeConfig.id}
                    </div>
                  </div>
                )}
              </div>

              {/* Idle hint */}
              {!activeProfile && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
                  <p className="text-gray-500 text-xs tracking-widest uppercase">
                    Sélectionnez un profil pour zoomer
                  </p>
                </div>
              )}
            </div>
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
