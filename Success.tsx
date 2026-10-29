import React from 'react';
import * as DS from './src/components/ds/ds';

interface SuccessProps {
  onBackHome: () => void;
}

const Success: React.FC<SuccessProps> = ({ onBackHome }) => {
  return (
    <div className="animate-fade-up min-h-screen flex flex-col justify-center section--dark" style={{ background: 'linear-gradient(to bottom, #071318 0%, #0b1e26 100%)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl text-center">
          <div className="mb-16">
          <span className={`inline-block mb-4 ${DS.EYEBROW_DARK}`}>
            Demande envoyée
          </span>
          <h1 className={`${DS.H1_DETAIL} text-white`}>
            Merci !
          </h1>
          <p className={`${DS.LEAD_DARK} mt-6 mx-auto`}>
            Votre demande a bien été prise en compte. Nous vous recontacterons dans les plus brefs délais.
          </p>
          </div>
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
