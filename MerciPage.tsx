import React from 'react';

interface MerciPageProps {
  onBackHome: () => void;
}

const MerciPage: React.FC<MerciPageProps> = ({ onBackHome }) => {
  return (
    <div className="animate-fade-up min-h-screen flex flex-col items-center justify-center px-6 py-24 section--dark" style={{ background: 'linear-gradient(to bottom, #071318 0%, #0b1e26 100%)' }}>
      <div className="max-w-xl mx-auto text-center space-y-8">
        <span className="inline-block text-[10px] font-extrabold tracking-[0.4em] text-[#E2FD48] uppercase">
          Demande envoyée
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[1.1] font-black text-white uppercase">
          Merci !
        </h1>
        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
          Votre demande de devis a bien été transmise.
        </p>
        <p className="text-base md:text-lg text-white/70 leading-relaxed">
          Notre bureau d’études technique (Façonnage & Pliage) analyse vos plans et vous répondra sous 48h.
        </p>
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 px-10 py-4 bg-[#E2FD48] text-[#0E2A33] text-sm font-extrabold rounded-full hover:bg-[#d4ed3f] transition-all tracking-tight shadow-[0_20px_40px_rgba(226,253,72,0.2)]"
        >
          Retour à l’accueil
          <iconify-icon icon="lucide:arrow-right" width="18"></iconify-icon>
        </button>
      </div>
    </div>
  );
};

export default MerciPage;
