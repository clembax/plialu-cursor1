import React, { useEffect, useState } from 'react';
import { getConsent, isAnalyticsLoaded, loadAnalytics, setConsent, withdrawAnalytics } from '../consent';

interface CookieBannerProps {
  onOpenCookiePolicy: () => void;
}

const CHOICE_BUTTON =
  'inline-flex w-full items-center justify-center rounded-full border border-white bg-transparent px-5 py-2 text-xs font-semibold leading-4 text-white transition-colors duration-150 hover:border-transparent hover:bg-white hover:text-[#0E2A33]';

const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenCookiePolicy }) => {
  const [showBanner, setShowBanner] = useState(() => getConsent() === null);

  useEffect(() => {
    const open = () => setShowBanner(true);
    window.addEventListener('plialu:open-cookies', open);
    return () => window.removeEventListener('plialu:open-cookies', open);
  }, []);

  const handleAccept = () => {
    setConsent('accepted');
    loadAnalytics();
    setShowBanner(false);
  };

  const handleReject = () => {
    if (isAnalyticsLoaded()) {
      withdrawAnalytics();
      setConsent('rejected');
      window.location.reload();
      return;
    }
    setConsent('rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      className="fixed bottom-0 left-0 right-0 z-[60] border-t border-white/10 bg-[#0E2A33] px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex-1 text-sm leading-relaxed text-white/80">
          Nous utilisons Google Analytics pour mesurer l'audience du site. Accepter active aussi l'affichage direct de la vidéo Vimeo et de la carte Google Maps. Refuser n'empêche pas de consulter le site : ces deux contenus restent disponibles sur demande. Plus d'informations dans notre{' '}
          <button
            type="button"
            onClick={onOpenCookiePolicy}
            className="font-medium text-[#E2FD48] underline underline-offset-2 transition-colors hover:text-white"
          >
            politique de cookies
          </button>
          .
        </p>
        <div className="grid w-full shrink-0 grid-cols-2 gap-3 sm:w-64">
          <button type="button" onClick={handleReject} className={CHOICE_BUTTON}>
            Refuser
          </button>
          <button type="button" onClick={handleAccept} className={CHOICE_BUTTON}>
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
