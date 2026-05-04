import React, { useEffect, useRef, useState } from 'react';
import { etancheiteProfiles, etancheiteSchemaImages } from '../config/schemaConfig';

interface EtancheiteProps {
  setCurrentPage: (page: any) => void;
}

const Etancheite: React.FC<EtancheiteProps> = ({ setCurrentPage }) => {
  const [activeProfile, setActiveProfile] = useState<number | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [cardOpacities, setCardOpacities] = useState<number[]>(etancheiteProfiles.map(() => 1));
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const schemaRef = useRef<HTMLDivElement | null>(null);

  const handleCardClick = (id: number, fromSchema = false) => {
    setActiveProfile(prev => {
      const next = prev === id ? null : id;
      if (fromSchema && next !== null) {
        const index = etancheiteProfiles.findIndex(p => p.id === id);
        cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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

  const activeConfig = etancheiteProfiles.find(p => p.id === activeProfile);
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

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const updateOpacities = () => {
      const viewportCenter = window.innerHeight / 2;
      const maxDistance = window.innerHeight / 2;
      const nextOpacities = etancheiteProfiles.map((profile, index) => {
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

  return (
    <main className="min-h-screen flex flex-col pt-0 pb-0 bg-[#071318]">
      <div className="relative bg-[#071318] overflow-hidden pt-32 md:pt-40">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0e2a33]/40 to-[#071318]"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <button
            onClick={() => setCurrentPage('solutions')}
            className="text-[#E2FD48] hover:opacity-70 transition-opacity font-medium text-xs uppercase tracking-widest flex items-center gap-2 mb-14"
          >
            &larr; RETOUR AUX SOLUTIONS
          </button>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Solutions pour l'étanchéité
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Couvertines, supports extrudés et éclisses de jonction fabriqués sur mesure. Étanchéité des acrotères et toits plats garantie sans soudure sur chantier — un seul interlocuteur pour tout le système.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-[40%] flex flex-col gap-3">
              {etancheiteProfiles.map((profile, index) => {
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
                    <div className="flex items-center gap-4">
                      {!isActive && (
                        <div className="flex-shrink-0 bg-white p-1.5 rounded-xl overflow-hidden transition-all duration-300 w-16 h-16">
                          <img
                            src={profile.images.medium}
                            alt={profile.nom}
                            loading="lazy"
                            className="w-full h-full object-contain bg-white rounded-lg"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold text-sm transition-colors duration-300 ${isActive ? 'text-[#E2FD48]' : 'text-white'}`}>
                          {profile.nom}
                        </p>
                      </div>
                      <span className="text-white/50 text-xl font-light transition-all duration-200">
                        {isActive ? '−' : '+'}
                      </span>
                    </div>
                    {isActive && (
                      <div className="mt-3 pt-3 border-t border-white/10 animate-fade-in">
                        <div className="relative group mb-4" onClick={(e) => { e.stopPropagation(); setLightboxImage(profile.images.large); }}>
                          <img
                            src={profile.images.medium}
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
                        <p className="text-gray-300 text-sm leading-relaxed">{profile.description}</p>
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
            <div className="w-full lg:w-[60%] lg:sticky lg:top-32" ref={schemaRef}>
              <div className="relative overflow-hidden rounded-2xl bg-[#0E2A33] border border-white/10">
                <div className="relative" style={schemaStyle}>
                  <img
                    src={etancheiteSchemaImages.medium}
                    srcSet={`${etancheiteSchemaImages.small} 800w, ${etancheiteSchemaImages.medium} 1200w, ${etancheiteSchemaImages.large} 1600w`}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    alt="Schéma étanchéité — Couvertines et acrotères toit plat"
                    loading="lazy"
                    className="w-full h-auto block"
                  />
                  {etancheiteProfiles.map(profile => {
                    const isActive = activeProfile === profile.id;
                    return (
                      <div
                        key={profile.id}
                        className="absolute"
                        style={{ top: profile.hotspot.top, left: profile.hotspot.left, transform: 'translate(-50%, -50%)' }}
                      >
                        <div
                          onClick={() => handleCardClick(profile.id, true)}
                          className={`cursor-pointer transition-all duration-300 rounded-full flex items-center justify-center shadow-lg ${
                            isActive
                              ? 'bg-[#E2FD48] text-[#0E2A33] border-2 border-[#E2FD48] opacity-100 w-8 h-8 text-sm font-bold scale-110'
                              : `bg-[#0E2A33] text-[#E2FD48] border-2 border-[#E2FD48] ${activeProfile ? 'opacity-40' : 'opacity-100'} w-7 h-7 text-xs ${!activeProfile ? 'animate-pulse' : ''}`
                          }`}
                        >
                          {profile.id}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="text-white/30 text-xs text-center mt-3 tracking-widest uppercase">Coupe technique — Étanchéité toit plat</p>
            </div>
          </div>
        </div>
      </div>
      <section className="mt-20 py-24 bg-[#F0F4F6]">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-fade-up">
          <span className="text-sm font-extrabold tracking-widest uppercase mb-8 inline-block text-gray-500">
            VOTRE PROJET ÉTANCHÉITÉ
          </span>
          <h2 className="mb-10 text-3xl md:text-4xl lg:text-5xl tracking-tighter font-extrabold leading-tight text-[#0E2A33]">
            Un projet étanchéité ?
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium text-gray-600">
            Nos équipes dimensionnent couvertines et accessoires d'étanchéité adaptés à votre chantier.
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
    </main>
  );
};

export default Etancheite;
