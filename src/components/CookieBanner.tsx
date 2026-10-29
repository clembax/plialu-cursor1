import React, { useEffect, useState } from 'react';
import * as DS from './ds/ds';

interface CookieBannerProps {
  onOpenPrivacy?: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacy }) => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      status: 'accepted',
      date: new Date().toISOString(),
      version: '1.0'
    }));
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      status: 'rejected',
      date: new Date().toISOString(),
      version: '1.0'
    }));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[45] bg-[#0E2A33] border-t border-white/10 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex-1">
            <p className="text-sm text-white/80 leading-relaxed">
              Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre{' '}
              <button
                onClick={onOpenPrivacy}
                className="text-[#E2FD48] hover:underline transition-colors font-medium"
              >
                politique de confidentialité
              </button>
              .
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={handleReject}
              className="inline-flex items-center rounded-full px-5 py-2 text-xs leading-4 font-semibold bg-transparent border border-white text-white hover:bg-white hover:text-[#0E2A33] hover:border-transparent transition-colors duration-150"
            >
              Refuser
            </button>
            <button
              onClick={handleAccept}
              className={`${DS.BTN_COMPACT} whitespace-nowrap`}
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
