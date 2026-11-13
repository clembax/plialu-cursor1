import React, { useState } from 'react';
import * as DS from './ds/ds';
import { useConsent } from '../consent';

interface ConsentEmbedProps {
  kind: 'vimeo' | 'maps';
  tone: 'dark' | 'light';
  onOpenCookiePolicy: () => void;
  children: React.ReactNode;
}

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Plialu+Technoparc+Saône+Vallée+150+route+Copernic+01390+Civrieux';

const ConsentEmbed: React.FC<ConsentEmbedProps> = ({ kind, tone, onOpenCookiePolicy, children }) => {
  const consent = useConsent();
  const [revealed, setRevealed] = useState(false);

  if (consent === 'accepted' || revealed) {
    return <>{children}</>;
  }

  const dark = tone === 'dark';

  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 overflow-y-auto rounded-[inherit] px-5 py-5 text-center"
      style={{ background: dark ? '#0E2A33' : '#F3F6F7', color: dark ? '#ffffff' : '#0E2A33' }}
    >
      <p className="max-w-md text-sm leading-relaxed">
        {kind === 'vimeo'
          ? "Cette vidéo est hébergée par Vimeo. L'afficher transmet votre adresse IP à Vimeo et peut déposer des traceurs."
          : "Cette carte est fournie par Google Maps. L'afficher transmet votre adresse IP à Google et peut déposer des traceurs."}
      </p>
      <button type="button" className={DS.BTN_COMPACT} onClick={() => setRevealed(true)}>
        {kind === 'vimeo' ? 'Afficher la vidéo' : 'Afficher la carte'}
      </button>
      {kind === 'maps' && (
        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-2">
          Ouvrir dans Google Maps
        </a>
      )}
      <button
        type="button"
        onClick={onOpenCookiePolicy}
        className="text-xs underline underline-offset-2 opacity-60 transition-opacity hover:opacity-100"
      >
        politique de cookies
      </button>
    </div>
  );
};

export default ConsentEmbed;
