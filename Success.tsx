import React from 'react';
import * as DS from './src/components/ds/ds';

interface SuccessProps {
  onBackHome: () => void;
}

const Success: React.FC<SuccessProps> = ({ onBackHome }) => {
  return (
    <div className="animate-fade-up min-h-screen flex flex-col justify-center section--dark" style={{ background: 'linear-gradient(to bottom, #071318 0%, #0b1e26 100%)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl text-center space-y-8">
          <span className="inline-block text-[10px] font-extrabold tracking-[0.4em] text-[#E2FD48] uppercase">
            Demande envoyée
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[1.1] font-black text-white uppercase">
            Merci !
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
            Votre demande a bien été prise en compte. Nous vous recontacterons dans les plus brefs délais.
          </p>
          <button
            type="button"
            onClick={onBackHome}
            className={DS.BTN_PRIMARY}
          >
            Retour à l’accueil
            <iconify-icon icon="lucide:arrow-right" width="18"></iconify-icon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
